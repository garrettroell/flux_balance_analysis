import { TriangleDownIcon, TriangleUpIcon } from '@chakra-ui/icons';
import {
  chakra,
  Modal,
  ModalOverlay,
  Table,
  Tbody,
  Td,
  Th,
  Thead,
  useToast,
  Tr,
  useDisclosure,
  Button,
  HStack,
  useColorMode,
  Text,
  Select,
} from '@chakra-ui/react';
import { useContext, useMemo, useState } from 'react';
import {
  useGlobalFilter,
  usePagination,
  useSortBy,
  useTable,
} from 'react-table';
import EditReactionModal from '../modals/EditReactionModal';
import EditMetaboliteModal from '../modals/EditMetaboliteModal';
import { GlobalFilter } from './GlobalFilter';
import { ModelDataContext } from '../App';

const RenderDataTable = ({ content }) => {
  const [modelData, setModelData] = useContext(ModelDataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentData, setCurrentData] = useState({});
  const toast = useToast();
  const { colorMode } = useColorMode();
  const hoverColor = colorMode === 'light' ? 'purple.500' : 'orange.100';

  let isEditable = false;
  let DATA = [];
  switch (content) {
    case 'reactions':
      isEditable = true;
      DATA = modelData.reactions;
      break;
    case 'metabolites':
      isEditable = true;
      DATA = modelData.metabolites;
      break;
    case 'results':
      isEditable = false;
      DATA = modelData.results;
      break;
    default:
  }

  let COLUMNS = [];
  if (DATA.length > 0) {
    // console.log(DATA);
    const jsonKeys = Object.keys(DATA[0]);
    COLUMNS = jsonKeys.map(key => {
      return {
        Header: key,
        Footer: key,
        accessor: key,
      };
    });
  }
  const columns = useMemo(() => COLUMNS, [modelData]);
  const data = useMemo(() => DATA, [modelData]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    page,
    nextPage,
    canNextPage,
    previousPage,
    canPreviousPage,
    pageOptions,
    gotoPage,
    setPageSize,
    prepareRow,
    state,
    setGlobalFilter,
  } = useTable({ columns, data }, useGlobalFilter, useSortBy, usePagination);

  const { globalFilter, pageIndex, pageSize } = state;

  return (
    <>
      <HStack spacing="auto" my="20px">
        {/* <GlobalFilter
          filter={globalFilter}
          setFilter={setGlobalFilter}
          content={content}
        /> */}
        <Select
          value={pageSize}
          onChange={e => setPageSize(Number(e.target.value))}
          maxWidth="300px"
          focusBorderColor="purple.600"
        >
          {[10, 100, 1000].map(pageSize => (
            <option key={pageSize} value={pageSize}>
              Show {pageSize} {content}
            </option>
          ))}
        </Select>
      </HStack>
      <Table
        {...getTableProps()}
        variant="simple"
        display="inline-block"
        overflowX="scroll"
        mb="20px"
        mx="auto"
      >
        <Thead>
          {headerGroups.map(headerGroup => (
            <Tr {...headerGroup.getHeaderGroupProps()}>
              {headerGroup.headers.map(column => (
                <Th
                  {...column.getHeaderProps(column.getSortByToggleProps())}
                  isNumeric={column.isNumeric}
                >
                  {column.render('Header')}
                  <chakra.span pl="4">
                    {column.isSorted ? (
                      column.isSortedDesc ? (
                        <TriangleDownIcon aria-label="sorted descending" />
                      ) : (
                        <TriangleUpIcon aria-label="sorted ascending" />
                      )
                    ) : null}
                  </chakra.span>
                </Th>
              ))}
            </Tr>
          ))}
        </Thead>
        <Tbody {...getTableBodyProps()}>
          {page.map(row => {
            prepareRow(row);
            return (
              <Tr
                {...row.getRowProps()}
                onClick={() => {
                  if (isEditable) {
                    setCurrentData(row.original);
                    onOpen();
                  } else {
                    toast({
                      title: 'This table is read only',
                      description: `Use the Reactions or Metabolites tabs to edit`,
                      status: 'info',
                      duration: 5000,
                      isClosable: true,
                    });
                  }
                }}
                cursor={isEditable ? 'pointer' : 'default'}
              >
                {row.cells.map(cell => (
                  <Td
                    {...cell.getCellProps()}
                    isNumeric={cell.column.isNumeric}
                  >
                    {cell.render('Cell')}
                  </Td>
                ))}
              </Tr>
            );
          })}
        </Tbody>
      </Table>
      <HStack mb="85px" px="20px" spacing="auto">
        <HStack spacing="20px">
          <Button
            _hover={{ color: hoverColor }}
            boxShadow="xl"
            variant="outline"
            onClick={() => {
              gotoPage(0);
            }}
            disabled={!canPreviousPage}
          >
            First
          </Button>
          <Button
            _hover={{ color: hoverColor }}
            boxShadow="xl"
            variant="outline"
            onClick={() => {
              previousPage();
            }}
            disabled={!canPreviousPage}
          >
            Previous
          </Button>
        </HStack>
        <Text>
          Viewing page {pageIndex + 1} of {pageOptions.length}
        </Text>
        <HStack spacing="20px">
          <Button
            _hover={{ color: hoverColor }}
            boxShadow="xl"
            variant="outline"
            onClick={() => {
              nextPage();
            }}
            disabled={!canNextPage}
          >
            Next
          </Button>
          <Button
            _hover={{ color: hoverColor }}
            boxShadow="xl"
            variant="outline"
            onClick={() => {
              gotoPage(pageOptions.length - 1);
            }}
            disabled={!canNextPage}
          >
            Last
          </Button>
        </HStack>
      </HStack>

      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        {content === 'reactions' ? (
          <EditReactionModal
            onClose={() => onClose()}
            currentData={currentData}
          />
        ) : null}
        {content === 'metabolites' ? (
          <EditMetaboliteModal
            onClose={() => onClose()}
            currentData={currentData}
          />
        ) : null}
      </Modal>
    </>
  );
};

export default RenderDataTable;

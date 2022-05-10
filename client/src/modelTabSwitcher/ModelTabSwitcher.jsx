import {
  HStack,
  Modal,
  ModalOverlay,
  Tab,
  TabList,
  Tabs,
  useDisclosure,
  useToast,
  Spinner,
  Center,
  useColorMode,
} from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useState, useEffect, useRef } from 'react';
import { ModelDataContext } from '../App';
import UploadModelModal from '../modals/UploadModelModal';

const ModelTabSwitcher = () => {
  const [modelData, setModelData] = useContext(ModelDataContext);
  console.log(modelData);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentTable, setCurrentTable] = useState('ecoli');
  const toast = useToast();
  const toastIdRef = useRef();
  const { colorMode } = useColorMode();
  const hoverColor = colorMode === 'light' ? 'purple.500' : 'orange.100';

  useEffect(() => {
    let modelName = '';

    const fetchModelData = async (reactionUrl, metaboliteUrl) => {
      const reactionPromise = await axios(reactionUrl);
      const metabolitePromise = await axios(metaboliteUrl);

      Promise.all([reactionPromise, metabolitePromise]).then(values => {
        console.log(values);
        // toast.close(toastIdRef.current);
        toast.closeAll();
        toast({
          title: modelName + ' loaded',
          // description: 'See solution in results tab',
          status: 'success',
          duration: 1500,
          isClosable: true,
        });
        setModelData({
          ...modelData,
          name: modelName,
          reactions: Object.values(JSON.parse(values[0].data)),
          metabolites: Object.values(JSON.parse(values[1].data)),
          results: {},
          currentModel: currentTable,
        });
      });
    };

    if (currentTable === 'ecoli') {
      setModelData({
        ...modelData,
        name: modelData.name ? modelData.name + ' (Model Expired)' : '',
      });
      toast.closeAll();
      toastIdRef.current = toast({
        title: 'Getting E. coli core data',
        description: (
          <Center py="10px">
            <Spinner textAlign="center" />
          </Center>
        ),
        status: 'info',
        duration: null,
        isClosable: true,
      });
      modelName = 'E.coli core';
      fetchModelData(
        'https://fba-server.garrettroell.com/ecoli_reactions_T',
        'https://fba-server.garrettroell.com/ecoli_metabolites_T'
        // 'https://browser-fba.herokuapp.com/ecoli_reactions_T',
        // 'https://browser-fba.herokuapp.com/ecoli_metabolites_T'
      );
    }

    // Yeast case
    if (currentTable === 'yeast') {
      setModelData({
        ...modelData,
        name: modelData.name + ' (Model Expired)',
      });
      toast.closeAll();
      toastIdRef.current = toast({
        title: 'Getting S.cerevisiae core data',
        description: (
          <Center py="10px">
            <Spinner textAlign="center" />
          </Center>
        ),
        status: 'info',
        duration: null,
        isClosable: true,
      });
      modelName = 'S.cerevisiae';
      fetchModelData(
        'https://fba-server.garrettroell.com/scerevisiae_reactions_T',
        'https://fba-server.garrettroell.com/scerevisiae_metabolites_T'
        // 'https://browser-fba.herokuapp.com/scerevisiae_reactions_T',
        // 'https://browser-fba.herokuapp.com/scerevisiae_metabolites_T'
      );
    }

    if (currentTable === 'custom') {
      onOpen();
      // console.log('running the custom');
    }
  }, [currentTable]);

  return (
    <>
      <Tabs
        variant="unstyled"
        outline="1px"
        colorScheme="purple"
        defaultIndex={0}
        boxShadow="sm"
      >
        <TabList>
          <Tab
            // _selected={{ color: 'white', bg: 'purple.600' }}
            color={modelData.currentModel === 'ecoli' ? 'white' : null}
            bg={modelData.currentModel === 'ecoli' ? 'purple.600' : null}
            borderLeftRadius="5px"
            borderWidth="1px"
            _hover={{ color: hoverColor }}
            onClick={() => {
              setCurrentTable('ecoli');
            }}
          >
            E. coli
          </Tab>
          <Tab
            // _selected={{ color: 'white', bg: 'purple.600' }}
            color={modelData.currentModel === 'yeast' ? 'white' : null}
            bg={modelData.currentModel === 'yeast' ? 'purple.600' : null}
            borderTopWidth="1px"
            borderBottomWidth="1px"
            _hover={{ color: hoverColor }}
            onClick={() => setCurrentTable('yeast')}
          >
            S. cerevisiae
          </Tab>
          <Tab
            // _selected={{ color: 'white', bg: 'purple.600' }}
            color={modelData.currentModel === 'custom' ? 'white' : null}
            bg={modelData.currentModel === 'custom' ? 'purple.600' : null}
            borderRightRadius="5px"
            borderWidth="1px"
            _hover={{ color: hoverColor }}
            onClick={() => {
              // setCurrentTable('custom');
              onOpen();
            }}
          >
            Custom
          </Tab>
        </TabList>
      </Tabs>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <UploadModelModal onClose={() => onClose()} />
      </Modal>
    </>
  );
};

export default ModelTabSwitcher;

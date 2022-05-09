import {
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { ModelDataContext } from '../App';
import RenderDataTable from './RenderDataTable';

const MultiDataTable = () => {
  const [modelData] = useContext(ModelDataContext);
  return (
    <Tabs isFitted variant="enclosed" colorScheme="purple">
      <TabList>
        <Tab _selected={{ color: 'white', bg: 'purple.600' }}>
          <Text fontWeight="bold">Reactions</Text>
        </Tab>
        <Tab _selected={{ color: 'white', bg: 'purple.600' }}>
          <Text fontWeight="bold">Metabolites</Text>
        </Tab>
        <Tab _selected={{ color: 'white', bg: 'purple.600' }}>
          <Text fontWeight="bold">Results</Text>
        </Tab>
      </TabList>

      <TabPanels>
        <TabPanel>
          <>
            {Object.keys(modelData.reactions).length > 0 ? (
              <RenderDataTable content={'reactions'} />
            ) : (
              <Text pb="200px">Reaction data is being fetched from server</Text>
            )}
          </>
        </TabPanel>
        <TabPanel>
          <>
            {Object.keys(modelData.metabolites).length > 0 ? (
              <RenderDataTable content={'metabolites'} />
            ) : (
              <Text pb="200px">
                Metabolite data is being fetched from server
              </Text>
            )}
          </>
        </TabPanel>
        <TabPanel>
          <>
            {Object.keys(modelData.results).length > 0 ? (
              <RenderDataTable content={'results'} />
            ) : (
              <Text pb="200px">
                Data will be displayed after you press the 'find optimal fluxes'
                button and a solution is found
              </Text>
            )}
          </>
        </TabPanel>
      </TabPanels>
    </Tabs>
  );
};

export default MultiDataTable;

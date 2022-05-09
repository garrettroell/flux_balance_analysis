import {
  Box,
  Heading,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
  VStack,
} from '@chakra-ui/react';
import Footer from '../allPages/Footer';
import NavBar from '../allPages/Navbar';
import { useContext } from 'react';
import MultiDataTable from '../dataTable/MultiDataTable';
import AddMetaboliteButton from '../buttons/AddMetaboliteButton';
import AddReactionButton from '../buttons/AddReactionButton';
import ModelTabSwitcher from '../modelTabSwitcher/ModelTabSwitcher';
import gradientBackgroundStyle from '../theme/gradientBackgroundStyle';
import OptimizeFluxesButton from '../buttons/OptimizeFluxesButton';
import { ModelDataContext } from '../App';
import ExportModelButton from '../buttons/ExportModelButton';

const HomePage = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const [modelData, setModelData] = useContext(ModelDataContext);
  const { colorMode } = useColorMode();
  
  return (
    <Box sx={gradientBackgroundStyle(colorMode)}>
      <NavBar />
      <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px" pt="30px">
        <Stack direction="column">
          <Heading fontSize="xl" mt="30px">
            Welcome
          </Heading>
          <Text mb="25px">
            This tool allows you to run genome scale models in the browser.
            Behind the scenes, this site uses a python server to run the cobrapy
            package.
          </Text>
          <Heading fontSize="xl" mt="30px">
            Instructions
          </Heading>
          <Text mb="50px">
            Add reactions and metabolites using the control panel below. Edit an
            existing reaction or metabolite by clicking on it in the table
            below. Use the 'find optimal fluxes' to button to find the fluxes
            that maximize the objective value.
          </Text>
          <Stack
            mb="75px"
            // py="30px"
            direction={isLargerThan845 ? 'row' : 'column'}
            spacing="30px"
            borderWidth="1px"
            borderRadius="10px"
            p="30px"
            boxShadow="sm"
          >
            <VStack
              spacing="15px"
              justify="center"
              // borderRadius="5px"
              // borderWidth="1px"
              padding="10px"
            >
              <Heading fontSize="xl" textAlign="center">
                Current Model: {modelData.name}
              </Heading>
              <ModelTabSwitcher />
            </VStack>
            <VStack spacing="30px">
              <Box textAlign="center">
                <AddReactionButton />
              </Box>
              <Box textAlign="center">
                <AddMetaboliteButton />
              </Box>
            </VStack>
            <VStack spacing="30px">
              <OptimizeFluxesButton />
              <ExportModelButton />
            </VStack>
          </Stack>
          <MultiDataTable />
        </Stack>
        <Footer />
      </Box>
    </Box>
  );
};

export default HomePage;

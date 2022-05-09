import {
  Box,
  Heading,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import gradientBackgroundStyle from '../theme/gradientBackgroundStyle';
import Footer from '../allPages/Footer';
import NavBar from '../allPages/Navbar';

const BackgroundPage = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();

  return (
    <Box sx={gradientBackgroundStyle(colorMode)}>
      <NavBar />
      <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px" pt="30px">
        <Heading mb={isLargerThan845 ? '50px' : '25px'}>Background</Heading>
        <Stack direction={isLargerThan845 ? 'row' : 'column'}>
          <Stack
            direction="column"
            w={isLargerThan845 ? '47.5%' : '100%'}
            spacing="0px"
          >
            <Text fontWeight="extrabold">What is flux balance analysis?</Text>
            <Text>
              Flux Balance Analysis (FBA) is an analytical tool that allows
              synthetic biologists to analyze
            </Text>
            <Text fontWeight="extrabold" pt="20px">
              What is a genome scale model?
            </Text>
            <Text>Genome scale models (GSMs or GEMs) are</Text>
            <Text fontWeight="extrabold" pt="20px">
              What information can flux balance analysis provide?
            </Text>
            <Text>
              Flux Balance Analysis is an analytical tool that allows synthetic
              biologists to analyze
            </Text>
            <Text fontWeight="extrabold" pt="20px">
              What information can flux balance analysis provide?
            </Text>
            <Text>
              Flux Balance Analysis is an analytical tool that allows synthetic
              biologists to analyze
            </Text>
          </Stack>
          <Spacer w={isLargerThan845 ? '5%' : '100%'} />
          <Stack direction="column" w={isLargerThan845 ? '30%' : '75%'}>
            {/* <Text>
              This tool allows you to run genome scale models in the browser.
              Behind the scenes, this site uses a python server to run the
              cobrapy package.
            </Text> */}
          </Stack>
        </Stack>
        <Footer />
      </Box>
    </Box>
  );
};

export default BackgroundPage;

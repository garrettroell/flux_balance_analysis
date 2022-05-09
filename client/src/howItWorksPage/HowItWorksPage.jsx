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

const HowItWorksPage = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();

  return (
    <Box sx={gradientBackgroundStyle(colorMode)}>
      <NavBar />
      <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px" pt="30px">
        <Heading mb={isLargerThan845 ? '50px' : '25px'}>How it works</Heading>
        <Stack direction={isLargerThan845 ? 'row' : 'column'}>
          <Stack direction="column" w={isLargerThan845 < 845 ? '47.5%' : '100%'}>
            <Text>
              This tool allows you to run genome scale models in the browser.
              Behind the scenes, this site uses a python server to run the
              cobrapy package.
            </Text>
          </Stack>
          <Spacer w={isLargerThan845 ? '5%' : '100%'} />
          <Stack direction="column" w={isLargerThan845 < 845 ? '47.5%' : '100%'}>
            <Text>
              This tool allows you to run genome scale models in the browser.
              Behind the scenes, this site uses a python server to run the
              cobrapy package.
            </Text>
          </Stack>
        </Stack>
        <Footer />
      </Box>
    </Box>
  );
};

export default HowItWorksPage;

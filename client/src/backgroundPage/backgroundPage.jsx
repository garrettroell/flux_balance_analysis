import {
  Box,
  Heading,
  Image,
  Spacer,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import gradientBackgroundStyle from '../theme/gradientBackgroundStyle';
import Footer from '../allPages/Footer';
import NavBar from '../allPages/Navbar';
import FluxMapImage from '../assets/fluxMap.svg';

const BackgroundPage = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();

  return (
    <Box sx={gradientBackgroundStyle(colorMode)}>
      <NavBar />
      <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px" pt={isLargerThan845 ? '75px' : '40px'}>
        <Stack direction={isLargerThan845 ? 'row' : 'column'}>
          <Stack direction="column" w='100%'>
            <Heading mb={isLargerThan845 ? '50px' : '25px'}>Background</Heading>
            <Text fontWeight="extrabold">What is flux balance analysis?</Text>
            <Text>
              Flux Balance Analysis (FBA) is an analytical tool that allows
              synthetic biologists to analyze metabolic networks
            </Text>
            <Text fontWeight="extrabold" pt="20px">
              What is a genome scale model?
            </Text>
            <Text>
              Genome scale models are metabolic models that encorporate all the 
              enzyme mediated reactions that occur in a given organism.
            </Text>
            <Text fontWeight="extrabold" pt="20px">
              What information can flux balance analysis provide?
            </Text>
            <Text>
              It can provide the maximum theoretical yield of a product, the 
              metabolite exchange fluxes, and the maximum growth rate of an organism
            </Text>
          </Stack>
          <Spacer w={isLargerThan845 ? '5%' : ''} />
          <Stack direction="column" align="center" w="100%">
            <Image
              w="65%"
              borderRadius="5px"
              src={FluxMapImage}
              alt="Example flux map"
            />
          </Stack>
        </Stack>
        <Footer />
      </Box>
    </Box>
  );
};

export default BackgroundPage;
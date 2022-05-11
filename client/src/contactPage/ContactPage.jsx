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
import GarrettFace from '../assets/garrett.png'

const ContactPage = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();

  return (
    <Box sx={gradientBackgroundStyle(colorMode)}>
      <NavBar />
      <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px" pt={isLargerThan845 ? '75px' : '40px'}>
        
        <Stack direction={isLargerThan845 ? 'row' : 'column'}>
          <Stack direction="column" w='100%'>
            <Heading mb='30px'>Contact</Heading>
            <Text>
              This tool was made by Garrett Roell in the Yinjie Tang lab at
              Washington university in St. Louis.
              <br />
              <br />
              Garrett can be reached at garrettroell@garrettroell.com
            </Text>
          </Stack>
          <Spacer w={isLargerThan845 ? '5%' : ''} />
          <Stack direction="column" align="center" w="100%">
            <Image
              w="50%"
              borderRadius="5px"
              src={GarrettFace}
              alt="Garrett Roell"
            />
          </Stack>
        </Stack>
        <Footer />
      </Box>
    </Box>
  );
};

export default ContactPage;

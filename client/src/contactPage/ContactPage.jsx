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

const ContactPage = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();

  return (
    <Box sx={gradientBackgroundStyle(colorMode)}>
      <NavBar />
      <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px" pt="30px">
        <Heading mb={isLargerThan845 ? '50px' : '25px'}>Contact</Heading>
        <Stack direction={isLargerThan845 ? 'row' : 'column'}>
          <Stack direction="column" w={isLargerThan845 ? '47.5%' : '100%'}>
            <Text>
              This tool was made by Garrett Roell in the Yinjie Tang lab at
              Washington university in St. Louis.
              <br />
              <br />
              Garrett can be reached at garrettroell@wustl.edu.
            </Text>
          </Stack>
          <Spacer w={isLargerThan845 ? '5%' : '100%'} />
          <Stack direction="column" w={isLargerThan845 ? '30%' : '75%'}>
            <Image
              borderRadius="5px"
              src="https://storage.googleapis.com/wagtail-site-media/original_images/garrett_face.png"
              alt="Garrett Roell"
            />
            This tool allows you to run genome scale models in the browser.
            Behind the scenes, this site uses a python server to run the cobrapy
            package.
            <Text textAlign="center">Garrett Roell</Text>
          </Stack>
        </Stack>
        <Footer />
      </Box>
    </Box>
  );
};

export default ContactPage;

import { ExternalLinkIcon } from '@chakra-ui/icons';
import {
  Box,
  Heading,
  Link,
  Stack,
  Text,
  useColorMode,
  useMediaQuery,
} from '@chakra-ui/react';
import gradientBackgroundStyle from '../theme/gradientBackgroundStyle';
import Footer from '../allPages/Footer';
import NavBar from '../allPages/Navbar';

const LicensePage = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();

  return (
    <Box sx={gradientBackgroundStyle(colorMode)}>
      <NavBar />
      <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px" pt={isLargerThan845 ? '75px' : '40px'}>
        <Stack direction="column">
          <Heading>License</Heading>
          <Text py="30px">
            The code in this project is open source. Feel free to copy and
            modify the code in any way you'd like. It is licensed under the GNU
            general public license version 2. Find the code here:{' '}
            <Link href="https://github.com/garrettroell/flux_balance_analysis" isExternal>
              https://github.com/garrettroell/flux_balance_analysis
              <ExternalLinkIcon mx="2px" />
            </Link>
          </Text>
        </Stack>
        <Footer />
      </Box>
    </Box>
  );
};

export default LicensePage;

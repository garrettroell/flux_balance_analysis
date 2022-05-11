import { Box, Button, Heading, HStack, Link, useMediaQuery } from '@chakra-ui/react';
import { FiGithub } from 'react-icons/fi';

const Footer = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const currentYear = new Date().getFullYear()

  return (
    <>
      <Box
        bg="purple.700"
        position="absolute"
        left="0"
        bottom="0"
        width="100%"
        zIndex="2"
      >
        <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px">
          <HStack spacing="auto" py={isLargerThan845 ? '20px' : '10px'}>
            <HStack spacing="40px">
              {/* <Heading fontSize="16px" color="white"> */}
                <Link 
                  href='https://garrettroell.com' 
                  fontSize={isLargerThan845 ? 'xl' : 'md'}
                  color="white"
                  // _hover={{color: '#F5C14D'}}
                  isExternal>
                  Garrett Roell {currentYear}
                </Link>
              {/* </Heading> */}
              <Link color="white" fontSize={isLargerThan845 ? 'xl' : 'md'} href="/">
                Home
              </Link>
              <Link color="white" fontSize={isLargerThan845 ? 'xl' : 'md'} href="/background">
                Background
              </Link>
            </HStack>
            <HStack spacing="40px">
              <Link color="white" fontSize={isLargerThan845 ? 'xl' : 'md'} href="/contact">
                Contact
              </Link>
              <Link color="white" fontSize={isLargerThan845 ? 'xl' : 'md'} href="/license">
                License
              </Link>
              <Link href='https://github.com/garrettroell/flux_balance_analysis' isExternal>
                <Button variant="outline">
                  <FiGithub color="white"/>
                </Button>
              </Link>
            </HStack>
          </HStack>
        </Box>
        
      </Box>
    </>
  );
};

export default Footer;

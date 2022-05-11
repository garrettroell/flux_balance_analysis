import { HamburgerIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Heading,
  HStack,
  Icon,
  IconButton,
  Link,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Modal,
  ModalOverlay,
  Text,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { FaMicroscope } from 'react-icons/fa';
// import { Switch } from 'react-router-dom';
import { ModelDataContext } from '../App';
import UploadModelModal from '../modals/UploadModelModal';
import ColorModeSwitcher from './ColorModeSwitcher';
import HelpModeSwitcher from './HelpModeSwitcher';

const NavBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();
  const [modelData, setModelData] = useContext(ModelDataContext);

  console.log('helpMode', modelData.helpMode);
  return (
    <>
      <Box
        bg={colorMode === 'light' ? 'purple.700' : 'gray.900'}
        position="fixed"
        width="100%"
        zIndex="100"
      >
        <Box maxWidth={isLargerThan845 ? '1024px' : '575px'} mx="auto" px="20px">
          <HStack spacing="auto" py="10px">
          
            {/* <HStack _hover={{ color: 'purple' }}> */}
              <Link href="/" fontSize="0px" _hover={{ color: '#FEEBC855' }}>
                
                <Heading color="white" fontWeight="bold" fontSize={isLargerThan845 ? '4xl' : 'xl'} _hover={{ color: '#FEEBC8' }}>
                  Flux Balance Analysis
                  {/* <Icon color="white" w={9.5} h={9.5} mt="2px" as={FaMicroscope} /> Flux Balance Analysis */}
                </Heading>
              </Link>
            {/* </HStack> */}
            <HStack spacing="20px">
              <Button
                variant="outline"
                boxShadow="xl"
                color="white"
                // _hover={{ color: 'purple.400' }} //can modify to have different color when light
                onClick={onOpen}
              >
                Upload model
              </Button>
              <Modal
                isOpen={isOpen}
                onClose={onClose}
                isCentered
                motionPreset="slideInBottom"
              >
                <ModalOverlay />
                <UploadModelModal
                  modelData={modelData}
                  setModelData={setModelData}
                  onClose={() => onClose()}
                />
              </Modal>
              {/* <HelpModeSwitcher /> */}
              {/* <Text>T</Text> */}
              <ColorModeSwitcher />
              <Menu>
                <MenuButton
                  as={IconButton}
                  aria-label="Options"
                  icon={<HamburgerIcon />}
                  size="md"
                  color="white"
                  variant={colorMode === 'light' ? 'outline' : null}
                />
                <MenuList>
                  <MenuItem>
                    <Link
                      w="100%"
                      href="/background"
                      style={{ textDecoration: 'none' }}
                    >
                      Background
                    </Link>
                  </MenuItem>
                  {/* <MenuItem>
                    <Link
                      w="100%"
                      href="/how-it-works"
                      style={{ textDecoration: 'none' }}
                    >
                      How it works
                    </Link>
                  </MenuItem> */}
                  <MenuItem>
                    <Link
                      w="100%"
                      href="/contact"
                      style={{ textDecoration: 'none' }}
                    >
                      Contact
                    </Link>
                  </MenuItem>
                  <MenuItem>
                    <Link
                      w="100%"
                      href="/license"
                      style={{ textDecoration: 'none' }}
                    >
                      License
                    </Link>
                  </MenuItem>
                </MenuList>
              </Menu>
            </HStack>
          </HStack>
        </Box>
      </Box>
      <Box minHeight="70px"></Box>
    </>
  );
};

export default NavBar;

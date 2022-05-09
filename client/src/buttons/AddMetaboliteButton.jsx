import {
  Button,
  Modal,
  ModalOverlay,
  useColorMode,
  useDisclosure,
  useMediaQuery,
} from '@chakra-ui/react';
import { useContext } from 'react';
import { ModelDataContext } from '../App';
import AddMetaboliteModal from '../modals/AddMetaboliteModal';

const AddMetaboliteButton = () => {
  const [modelData, setModelData] = useContext(ModelDataContext);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const { colorMode } = useColorMode();
  const hoverColor = colorMode === 'light' ? 'purple.500' : 'orange.100';

  return (
    <>
      <Button
        _hover={{ color: hoverColor }}
        fontSize="lg"
        px={isLargerThan845 ? '40px' : '30px'}
        py={isLargerThan845 ? '30px' : '25px'}
        boxShadow="sm"
        variant="outline"
        onClick={onOpen}
        minWidth={isLargerThan845 ? '260px' : '300px'}
      >
        Add Metabolite
      </Button>
      <Modal
        isOpen={isOpen}
        onClose={onClose}
        isCentered
        motionPreset="slideInBottom"
      >
        <ModalOverlay />
        <AddMetaboliteModal
          modelData={modelData}
          setModelData={setModelData}
          onClose={() => onClose()}
        />
      </Modal>
    </>
  );
};

export default AddMetaboliteButton;

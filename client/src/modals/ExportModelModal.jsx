import {
  Button,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Radio,
  RadioGroup,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { useContext, useState } from 'react';
import { ModelDataContext } from '../App';

const ExportModelModal = ({ onClose }) => {
  const [modelData, setModelData] = useContext(ModelDataContext);
  const toast = useToast();
  const [exportType, setexportType] = useState('SBML');

  return (
    <ModalContent>
      <ModalHeader>Export '{modelData.name}' as:</ModalHeader>
      <ModalCloseButton />
      <ModalBody>
        <RadioGroup defaultValue="SBML">
          <Stack spacing={5} direction="column" px="40px">
            <Radio
              colorScheme="purple"
              value="SBML"
              onChange={() => setexportType('SBML')}
            >
              SBML
            </Radio>
            <Radio
              colorScheme="purple"
              value="JSON"
              onChange={() => setexportType('JSON')}
            >
              JSON
            </Radio>
            <Radio
              colorScheme="purple"
              value="Excel"
              onChange={() => setexportType('Excel')}
            >
              Excel
            </Radio>
          </Stack>
        </RadioGroup>
      </ModalBody>
      <ModalFooter>
        <Button
          colorScheme="purple"
          mr={3}
          onClick={() => {
            console.log('The requested file is ', exportType);
            onClose();
            toast({
              title: `Model successfully exported as ${modelData.name}.${exportType}`,
              // description: `Model exported as ${exportType}`,
              status: 'success',
              duration: 1500,
              isClosable: true,
            });
          }}
        >
          Export Model
        </Button>
        <Button colorScheme="purple" mr={3} onClick={onClose} variant="outline">
          Close
        </Button>
      </ModalFooter>
    </ModalContent>
  );
};

export default ExportModelModal;

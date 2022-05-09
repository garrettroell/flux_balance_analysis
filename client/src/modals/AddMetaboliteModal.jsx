import {
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  useToast,
} from '@chakra-ui/react';
import { Field, Form, Formik } from 'formik';
import { useContext } from 'react';
import { ModelDataContext } from '../App';

const AddMetaboliteModal = ({ onClose }) => {
  const [modelData, setModelData] = useContext(ModelDataContext);
  const toast = useToast();

  const validate = values => {
    let errors = {};

    if (!values.id) {
      errors.id = 'Required';
    }
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.formula) {
      errors.formula = 'Required';
    }
    if (!values.compartment) {
      errors.compartment = 'Required';
    }
    if (!/^[A-Z0-9]*$/.test(values.formula)) {
      errors.formula = 'Only capital letters and numbers allowed in formula';
    }
    const metIdList = modelData.metabolites.map(met => met.id);
    if (metIdList.includes(values.id)) {
      errors.id = 'Metabolite id already in model';
    }
    return errors;
  };

  return (
    <ModalContent>
      <Formik
        initialValues={{
          id: '',
          name: '',
          formula: '',
          compartment: '',
        }}
        validate={validate}
        onSubmit={(values, actions) => {
          setModelData({
            ...modelData,
            metabolites: [values, ...modelData.metabolites],
          });
          onClose();
          toast({
            title: 'Metabolite successfully added',
            description: `${values.name} is now in model with id: ${values.id}`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }}
      >
        {props => (
          <Form>
            <ModalHeader>Add a metabolite</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <Field name="id">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.id && form.touched.id}>
                      <FormLabel htmlFor="id">Metabolite ID</FormLabel>
                      <Input {...field} id="id" placeholder="ex: atp_c" />
                      <FormErrorMessage>{form.errors.id}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="name">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.name && form.touched.name}
                    >
                      <FormLabel htmlFor="name">Metabolite Name</FormLabel>
                      <Input {...field} id="name" placeholder="ex: ATP" />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="formula">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.formula && form.touched.formula}
                    >
                      <FormLabel htmlFor="formula">Formula</FormLabel>
                      <Input
                        {...field}
                        id="formula"
                        placeholder="ex: C10H12N5O13P3"
                      />
                      <FormErrorMessage>{form.errors.formula}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="compartment">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.compartment && form.touched.compartment
                      }
                    >
                      <FormLabel htmlFor="compartment">Compartment</FormLabel>
                      <Input {...field} id="compartment" placeholder="ex: c" />
                      <FormErrorMessage>
                        {form.errors.compartment}
                      </FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
              </Stack>
            </ModalBody>
            <ModalFooter>
              <Button type="submit" colorScheme="purple" mr={3}>
                Add Metabolite
              </Button>
              <Button
                colorScheme="purple"
                mr={3}
                onClick={onClose}
                variant="outline"
              >
                Close
              </Button>
            </ModalFooter>
          </Form>
        )}
      </Formik>
    </ModalContent>
  );
};

export default AddMetaboliteModal;

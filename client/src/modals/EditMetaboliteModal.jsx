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

const EditMetaboliteModal = ({ onClose, currentData }) => {
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
    if (values.id !== currentData.id && metIdList.includes(values.id)) {
      errors.id = 'Metabolite id already in model';
    }
    return errors;
  };

  return (
    <ModalContent>
      <Formik
        initialValues={{
          id: currentData.id,
          name: currentData.name,
          formula: currentData.formula,
          compartment: currentData.compartment,
        }}
        validate={validate}
        onSubmit={(values, actions) => {
          setModelData({
            ...modelData,
            metabolites: modelData.metabolites.map(row => {
              if (currentData.id !== row.id) {
                return row;
              } else {
                return {
                  id: values.id,
                  name: values.name,
                  formula: values.formula,
                  compartment: values.compartment,
                };
              }
            }),
          });
          onClose();
          toast({
            title: 'Reaction successfully editted',
            description: `Changes to ${values.name} have been saved`,
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }}
      >
        {props => (
          <Form>
            <ModalHeader>Edit metabolite</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <Field name="id">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.id && form.touched.id}>
                      <FormLabel htmlFor="id">Metabolite ID</FormLabel>
                      <Input {...field} id="id" placeholder="ex: ATPS4r" />
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
                      <Input
                        {...field}
                        id="name"
                        placeholder="ex: ATP synthase (four protons for one ATP)"
                      />
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
              <Button
                // type="submit"
                colorScheme="red"
                mr={3}
                onClick={e => {
                  setModelData({
                    ...modelData,
                    metabolites: modelData.metabolites.filter(
                      row => currentData.id !== row.id
                    ),
                  });
                  onClose();
                  toast({
                    title: 'Metabolite deleted',
                    description: `${currentData.id} has been removed from model`,
                    status: 'error', // error toast looks better than warning
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                Delete Metabolite
              </Button>
              <Button type="submit" colorScheme="purple" mr={3}>
                Save Changes
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

export default EditMetaboliteModal;

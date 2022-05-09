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

const EditReactionModal = ({ onClose, currentData }) => {
  const [modelData, setModelData] = useContext(ModelDataContext);
  const toast = useToast();

  // https://stackoverflow.com/questions/175739/built-in-way-in-javascript-to-check-if-a-string-is-a-valid-number
  function isNumeric(str) {
    if (typeof str != 'string') return false; // we only process strings!
    return (
      !isNaN(str) && // use type coercion to parse the _entirety_ of the string (`parseFloat` alone does not do this)...
      !isNaN(parseFloat(str))
    ); // ...and ensure strings of whitespace fail
  }

  const validate = values => {
    let errors = {};

    if (!values.id) {
      errors.id = 'Required';
    }
    if (!values.name) {
      errors.name = 'Required';
    }
    if (!values.string) {
      errors.string = 'Required';
    }
    if (values.lower !== 0 && !values.lower) {
      errors.lower = 'Required';
    }
    if (values.upper !== 0 && !values.upper) {
      errors.upper = 'Required';
    }
    if (values.objective !== 0 && !values.objective) {
      errors.objective = 'Required';
    }

    const rxnIdList = modelData.reactions.map(rxn => rxn.id);
    if (values.id !== currentData.id && rxnIdList.includes(values.id)) {
      errors.id = 'Reaction id already in model';
    }
    // Check that all items in reaction string are either metabolite id, plus sign, arrow, or number
    const metIdList = modelData.metabolites.map(met => met.id);
    const validTokenList = ['+', '<=>', '-->', '<--', '', ...metIdList];
    const rxnTokenList = values.string.split(' ');
    const invalidTokenList = rxnTokenList.filter(
      token => !validTokenList.includes(token) && !isNumeric(token)
    );
    if (invalidTokenList.length > 0) {
      errors.string = `All items must be a metabolite id, plus sign, arrow, or number. Invalid item(s):
       ${invalidTokenList.join(', ')}`;
      console.log('invalid tokens:', invalidTokenList);
    }
    return errors;
  };

  return (
    <ModalContent>
      <Formik
        initialValues={{
          id: currentData.id,
          name: currentData.name,
          string: currentData.reaction,
          upper: currentData['upper bound'],
          lower: currentData['lower bound'],
          objective: currentData['objective value'],
        }}
        validate={validate}
        onSubmit={(values, actions) => {
          setModelData({
            ...modelData,
            reactions: modelData.reactions.map(row => {
              if (currentData.id !== row.id) {
                return row;
              } else {
                return {
                  id: values.id,
                  name: values.name,
                  reaction: values.string,
                  'upper bound': values.upper,
                  'lower bound': values.lower,
                  'objective value': values.objective,
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
            <ModalHeader>Edit reaction</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Stack>
                <Field name="id">
                  {({ field, form }) => (
                    <FormControl isInvalid={form.errors.id && form.touched.id}>
                      <FormLabel htmlFor="id">Reaction ID</FormLabel>
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
                      <FormLabel htmlFor="name">Reaction Name</FormLabel>
                      <Input
                        {...field}
                        id="name"
                        placeholder="ex: ATP synthase (four protons for one ATP)"
                      />
                      <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="string">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.string && form.touched.string}
                    >
                      <FormLabel htmlFor="string">Reaction String</FormLabel>
                      <Input
                        {...field}
                        id="string"
                        placeholder="ex: adp_c + 4.0 h_e + pi_c <=> atp_c + h2o_c + 3.0 h_c"
                      />
                      <FormErrorMessage>{form.errors.string}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="lower">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.lower && form.touched.lower}
                    >
                      <FormLabel htmlFor="lower">Lower bound</FormLabel>
                      <Input
                        {...field}
                        id="lower"
                        placeholder="ex: -1000"
                        type="number"
                      />
                      <FormErrorMessage>{form.errors.lower}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="upper">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={form.errors.upper && form.touched.upper}
                    >
                      <FormLabel htmlFor="upper">Upper bound</FormLabel>
                      <Input
                        {...field}
                        id="upper"
                        placeholder="ex: 1000"
                        type="number"
                      />
                      <FormErrorMessage>{form.errors.upper}</FormErrorMessage>
                    </FormControl>
                  )}
                </Field>
                <Field name="objective">
                  {({ field, form }) => (
                    <FormControl
                      isInvalid={
                        form.errors.objective && form.touched.objective
                      }
                    >
                      <FormLabel htmlFor="objective">Objective value</FormLabel>
                      <Input
                        {...field}
                        id="objective"
                        placeholder="ex: 0.0"
                        type="number"
                      />
                      <FormErrorMessage>
                        {form.errors.objective}
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
                    reactions: modelData.reactions.filter(
                      row => currentData.id !== row.id
                    ),
                  });
                  onClose();
                  toast({
                    title: 'Reaction deleted',
                    description: `${currentData.id} has been removed from model`,
                    status: 'error', // error toast looks better than warning
                    duration: 5000,
                    isClosable: true,
                  });
                }}
              >
                Delete Reaction
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

export default EditReactionModal;

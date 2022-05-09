import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Link,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Stack,
  Text,
  useColorMode,
  useToast,
} from '@chakra-ui/react';
import { useDropzone } from 'react-dropzone';
import { Field, Form, Formik } from 'formik';
import { ModelDataContext } from '../App';
import { useContext, useEffect, useRef, useState } from 'react';
import axios from 'axios';

const UploadModelModal = ({ onClose }) => {
  const [modelData, setModelData] = useContext(ModelDataContext);
  const { acceptedFiles, getRootProps, getInputProps, open } = useDropzone({
    maxFiles: 1,
    accept: 'application/json, text/xml',
  });
  const { colorMode } = useColorMode();
  const toast = useToast();
  const toastIdRef = useRef();
  const [fileText, setFileText] = useState('');
  const [modelName, setModelName] = useState('');
  const [fileError, setFileError] = useState('');

  const validate = values => {
    let errors = {};

    if (!values.name) {
      errors.name = 'Required';
    }
    if (acceptedFiles.length === 0) {
      errors.file = 'File is required';
      setFileError('File is required');
    } else {
      setFileError('');
    }
    return errors;
  };

  const files = acceptedFiles.map(file => (
    <Box
      textAlign="center"
      w="100%"
      fontWeight="bold"
      mt="20px"
      mb="10px"
      key={file.path}
    >
      {file.path}
    </Box>
  ));

  useEffect(() => {
    if (fileText !== '') {
      axios({
        method: 'post',
        url: 'https://browser-fba.herokuapp.com/upload_model',
        data: { fileText: fileText },
      })
        .then(res => {
          console.log(res);
          toast.closeAll();
          toast({
            title: `${modelName} model loaded`,
            // description: 'See solution in results tab',
            status: 'success',
            duration: 1500,
            isClosable: true,
          });
          setModelData({
            ...modelData,
            name: modelName,
            reactions: Object.values(JSON.parse(res.data.reactions)),
            metabolites: Object.values(JSON.parse(res.data.metabolites)),
            results: {},
            currentModel: 'custom',
          });
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, [fileText]);

  function handleFile(e) {
    const content = e.target.result;
    setFileText(content);
  }

  return (
    <Box {...getRootProps({ className: 'dropzone' })}>
      <Input {...getInputProps()} />
      <ModalContent>
        <Formik
          initialValues={{
            name: '',
          }}
          validateOnChange={false}
          validateOnBlur={false}
          validate={validate}
          onSubmit={(values, actions) => {
            let fileData = new FileReader();
            fileData.onloadend = handleFile;
            fileData.readAsText(acceptedFiles[0]);

            toast.closeAll();
            toastIdRef.current = toast({
              title: 'File accepted',
              description: `Sending ${acceptedFiles[0].path} to server`,
              status: 'info',
              duration: null,
              isClosable: true,
            });
            setModelName(values.name);
            onClose();
          }}
        >
          {props => (
            <Form>
              <ModalHeader>Upload a model</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Stack>
                  <Field name="name">
                    {({ field, form }) => (
                      <FormControl
                        isInvalid={form.errors.name && form.touched.name}
                      >
                        <FormLabel htmlFor="name">Model Name</FormLabel>
                        <Input
                          {...field}
                          id="name"
                          placeholder="ex: E. coli core metabolism"
                        />
                        <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                      </FormControl>
                    )}
                  </Field>
                  <Box textAlign="center">
                    <Button
                      maxW="75%"
                      mt="20px"
                      // variant="outline"
                      boxShadow="xl"
                      bgColor={colorMode === 'light' ? 'gray.200' : 'gray.600'}
                      onClick={open}
                    >
                      Choose file to upload
                    </Button>
                    {/* <Text mt="35px">
                      Or drag and drop the file anywhere in this window
                    </Text> */}
                    <Text mt="20px">
                      This tool accepts .json and .xml files
                      <br />
                      <br />
                      Models can be found here:
                    </Text>
                    <Link to="/">BiGG link here</Link>
                    {acceptedFiles.length === 0 ? (
                      <Text mt="20px" color="red">
                        {fileError}
                        {/* File is required */}
                      </Text>
                    ) : null}

                    {files ? files : null}
                  </Box>
                </Stack>
              </ModalBody>
              <ModalFooter>
                {/* <Box onPress={setSubmitPressed(true)}> */}
                <Button type="submit" colorScheme="purple" mr={3}>
                  Upload Model
                </Button>
                {/* </Box> */}
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
    </Box>
  );
};

export default UploadModelModal;

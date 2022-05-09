import { Box, Button, Center, Spinner, useMediaQuery, useToast } from '@chakra-ui/react';
import axios from 'axios';
import { useContext, useRef } from 'react';
import { ModelDataContext } from '../App';

const OptimizeFluxesButton = () => {
  const [isLargerThan845] = useMediaQuery('(min-width: 845px)')
  const toast = useToast();
  const toastIdRef = useRef();
  const [modelData, setModelData] = useContext(ModelDataContext);

  function getOptimalFluxes() {
    let jsonData = {};
    toastIdRef.current = toast({
      title: 'Running optimization.',
      description: (
        <Center py="10px">
          <Spinner textAlign="center" />
        </Center>
      ),
      status: 'info',
      duration: null,
      isClosable: true,
    });
    axios({
      method: 'post',
      url: 'https://browser-fba.herokuapp.com/optimize_model',
      // url: 'http://localhost:8000/optimize_model',
      data: {
        reactionData: modelData.reactions,
        metaboliteData: modelData.metabolites,
      },
    })
      .then(res => {
        toast.close(toastIdRef.current);
        jsonData = Object.values(JSON.parse(res.data));
        if (res.status === 200) {
          toast({
            title: 'Solution found.',
            description: 'See solution in results tab',
            status: 'success',
            duration: 5000,
            isClosable: true,
          });
        }
        setModelData({
          ...modelData,
          results: jsonData,
        });
      })
      .catch(error => {
        console.log(error);
        toast.close(toastIdRef.current);
        toast({
          title: 'An error occured.',
          description: 'Refresh your browser for full model reset',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      });
  }

  return (
    <Box textAlign="center" onClick={getOptimalFluxes}>
      <Button
        bg="orange.400"
        color="white"
        _hover={{
          background: 'orange.300',
        }}
        fontSize="xl"
        px={isLargerThan845 ? '40px' : '30px'}
        py={isLargerThan845 ? '30px' : '25px'}
        minWidth={isLargerThan845 ? '260px' : '300px'}
        boxShadow="sm"
      >
        Find optimal fluxes
      </Button>
    </Box>
  );
};

export default OptimizeFluxesButton;

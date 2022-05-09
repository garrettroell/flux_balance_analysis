import { IconButton, useToast, useColorMode } from '@chakra-ui/react';
import { useContext } from 'react';
import { FaQuestion } from 'react-icons/fa';
import { ModelDataContext } from '../App';

const HelpModeSwitcher = props => {
  const toast = useToast();
  const [modelData, setModelData] = useContext(ModelDataContext);
  const { colorMode } = useColorMode();
  const SwitchIcon = FaQuestion;
  const text = modelData.helpMode
    ? 'Switch help mode off'
    : 'Switch help mode on';
  const toastTitle = modelData.helpMode
    ? 'Help mode has been turned off'
    : 'Help mode has been turned on';

  return (
    <IconButton
      size="md"
      fontSize="lg"
      aria-label={text}
      // bg="white"
      // color="purple.700"
      variant={modelData.helpMode ? 'solid' : 'null'}
      // variant={modelData.helpMode === 'light' ? 'null' : 'ghost'}
      // color="current"
      marginLeft="2"
      onClick={() => {
        setModelData({
          ...modelData,
          helpMode: !modelData.helpMode,
        });
        toast.closeAll();
        toast({
          title: toastTitle,
          status: 'info', // error toast looks better than warning
          duration: 1500,
          isClosable: true,
        });
      }}
      icon={
        <SwitchIcon
          color={
            modelData.helpMode & (colorMode === 'light') ? 'black' : 'white'
          }
        />
      }
      {...props}
    />
  );
};

export default HelpModeSwitcher;

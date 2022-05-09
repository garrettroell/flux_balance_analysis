import { extendTheme } from "@chakra-ui/react";
import ThemeColors from "./ThemeColors";

function VaxFinderTheme() {
  return extendTheme({
    colors: ThemeColors(),
    fonts: {
      heading: "Poppins",
      body: "Open Sans",
    },
    // config: {
    //   initialColorMode: 'dark',
    // },
  });
}
export default VaxFinderTheme;

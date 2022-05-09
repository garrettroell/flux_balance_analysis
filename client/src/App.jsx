import React, { createContext, useState } from "react";
import { ChakraProvider } from "@chakra-ui/react";
import ReactDOM from 'react-dom'
import Fonts from "./theme/Fonts";
import GenomeScaleTheme from "./theme/GenomeScaleTheme";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "react-query";
import HowItWorksPage from "./howItWorksPage/HowItWorksPage";
import HomePage from "./homePage/HomePage";
import ContactPage from "./contactPage/ContactPage";
import LicensePage from "./licensePage/LicensePage";
import BackgroundPage from "./backgroundPage/backgroundPage";

const queryClient = new QueryClient();
export const ModelDataContext = createContext();

function App() {
  const [count, setCount] = useState(0)
  console.log('running app')

  return (
    <>
    <Fonts />
      <React.StrictMode>
      <ChakraProvider theme={GenomeScaleTheme()}>
        <QueryClientProvider client={queryClient}>
          <ModelDataContext.Provider
            value={useState({
              name: "",
              reactions: {},
              metabolites: {},
              results: {},
              currentModel: "ecoli",
              helpMode: true,
            })}
          >
            <BrowserRouter>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/contact" element={<ContactPage />} />
                <Route path="/license" element={<LicensePage />} />
                <Route path="/background" element={<BackgroundPage />} />
                <Route path="/how-it-works" element={<HowItWorksPage />} />
              </Routes>
            </BrowserRouter>
          </ModelDataContext.Provider>
        </QueryClientProvider>
      </ChakraProvider>
    </React.StrictMode>
  </>
  )
}

export default App
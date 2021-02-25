import * as React from "react";
import { ChakraProvider, Box, VStack, Grid, theme } from "@chakra-ui/react";
import { ColorModeSwitcher } from "./ColorModeSwitcher";
import { Dashboard } from "./components/Dashboard";
import { Logo } from "./Logo";
import { DAppProvider } from "./hooks/useDApp";


export const App = () => (
  <DAppProvider appName="Another app name">
    <ChakraProvider theme={theme}>
      <Box fontSize="xl">
        <Grid minH="100vh" p={3}>
          <ColorModeSwitcher justifySelf="flex-end" />
          <VStack spacing={8}>
            <Logo w={100} h={100} />
            <Dashboard />
          </VStack>
        </Grid>
      </Box>
    </ChakraProvider>
  </DAppProvider>
);

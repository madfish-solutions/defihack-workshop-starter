import React from "react";
import { Button, VStack } from "@chakra-ui/react";

// import { useReady, useConnect, useAccountPkh } from "../hooks/useDApp";

// const DEFAULT_CONTRACT_ADDRESS = "KT1HB8XJVrWwdPzDZKVMVnE5rRxcekwqEopj";
// const DEFAULT_NETWORK = "edo2net"; // backup network, in case that one goes down: { rpc: "https://edonet.smartpy.io/", name: "edo2net" }

export function Dashboard() {

  return (
    <VStack spacing="6" alignItems="flex-start">
      <Button colorScheme="teal" variant="outline">
        Connect to Temple Wallet
      </Button>
    </VStack>
  );
}

import React, { useState } from "react";
import { Button, Divider, VStack } from "@chakra-ui/react";

import { useReady, useConnect, useAccountPkh } from "../hooks/useDApp";
import { AccountInfo } from "./AccountInfo";
import { GenericInput } from "./GenericInput";
import { AtSignIcon } from "@chakra-ui/icons";
import { validateContractAddress } from "../utils";
import { StorageInfo } from "./StorageInfo";
import { BalanceInfo } from "./BalanceInfo";
import { Transfer } from "./Transfer";

const DEFAULT_CONTRACT_ADDRESS = "KT1R2DVgCq978oc3B39yFA9YNq6K4PYQeKXg";
// const DEFAULT_NETWORK = "edo2net"; // backup network, in case that one goes down: { rpc: "https://edonet.smartpy.io/", name: "edo2net" }

export function Dashboard() {
  const ready = useReady();
  const connect = useConnect();
  const pkh = useAccountPkh();

  const handleConnect = React.useCallback(async () => {
    try {
      await connect(
        {
          rpc: "https://edonet.smartpy.io",
          name: "edo2net",
        },
        { forcePermission: true }
      );
    } catch (e) {
      alert(e.message);
    }
  }, [connect]);

  const [contractAddress, setContractAddress] = useState<string>(
    DEFAULT_CONTRACT_ADDRESS
  );
  const [tokenId, setTokenId] = useState<string>("0");

  return (
    <VStack spacing="6" alignItems="flex-start">
      {!ready && !pkh ? (
        <Button colorScheme="teal" variant="outline" onClick={handleConnect}>
          Connect to Temple Wallet
        </Button>
      ) : (
        <>
          <AccountInfo account={pkh!} handleReconnect={handleConnect} />
          <Divider />
          <GenericInput
            icon={<AtSignIcon w="4" h="4" />}
            inputProps={{
              isInvalid: !validateContractAddress(contractAddress),
              value: contractAddress,
              onChange: (e) => setContractAddress(e.target.value),
            }}
            title="Contract address"
          />
          <GenericInput
            icon={<AtSignIcon w="4" h="4" />}
            inputProps={{
              value: tokenId,
              onChange: (e) => setTokenId(e.target.value),
            }}
            title="Token ID"
          />
          <StorageInfo contractAddress={contractAddress} />
          <BalanceInfo
            contractAddress={contractAddress}
            tokenId={tokenId}
            pkh={pkh!}
          />
          <Transfer
            contractAddress={contractAddress}
            tokenId={tokenId}
            pkh={pkh!}
          />
        </>
      )}
    </VStack>
  );
}

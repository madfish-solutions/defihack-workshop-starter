import { Text, Box, Input, InputGroup, InputRightElement, Button } from "@chakra-ui/react";
import React, { useCallback, useState } from "react";
import { useTezos } from "../hooks/useDApp";
import { Preloader } from "./Preloader";

function prepareTransferParams(
  from: string,
  to: string,
  token_id: string,
  amount: string
) {
  return [
    {
      from_: from,
      txs: [{ to_: to, token_id: token_id, amount }],
    },
  ];
}

export const Transfer: React.FC<{
  contractAddress: string;
  tokenId: string;
  pkh: string;
}> = ({ contractAddress, tokenId, pkh }) => {
  const Tezos = useTezos()!;
  const [amount, setAmount] = useState("100");
  const [to, setTo] = useState<string>("tz1huGodLQWq9gKTZJ7D2Z9GeymHBJNnXvtd");
  const [fetching, setFetching] = useState(false);

  const handleClick = useCallback(async () => {
    setFetching(true);
    try {
      const contract = await Tezos.wallet.at(contractAddress);
      const op = await contract.methods
        .transfer(prepareTransferParams(pkh, to, tokenId, amount))
        .send();

      await op.confirmation(1);
    } catch (e) {
      console.error(e);
    } finally {
      setFetching(false);
    }
  }, [setFetching, contractAddress, Tezos.wallet, amount, tokenId, pkh, to]);

  return (
    <Box w="full">
      <Text size="sm" align="left" marginBottom="2">
        Transfer token:
      </Text>
      {!fetching ? (
        <>
          <Input
            placeholder="tz1huGodLQWq9gKTZJ7D2Z9GeymHBJNnXvtd"
            value={to}
            onChange={(e: any) => setTo(e.target.value)}
            marginBottom="4"
          />
          <InputGroup>
            <InputRightElement width="7rem">
              <Button size="sm" onClick={handleClick}>
                Transfer
              </Button>
            </InputRightElement>
            <Input type="number" onChange={e => setAmount(e.target.value)} value={amount}/>
          </InputGroup>
        </>
      ) : (
        <Preloader alignSelf="center" mx="auto" d="block" />
      )}
    </Box>
  );
};

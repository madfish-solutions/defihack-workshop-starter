import { Button, Code, Text } from '@chakra-ui/react';
import React from 'react';


export const AccountInfo: React.FC<{
  account: string;
  handleReconnect: (...args: any[]) => void;
}> = ({ account, handleReconnect }) => (
  <>
    <Text>Your account: <Code size="1">{account}</Code></Text>
    <Button onClick={handleReconnect} alignSelf="center">Reconnect</Button>
  </>
);
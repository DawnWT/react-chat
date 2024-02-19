import React from 'react';
import { Box } from '@panda/jsx';

interface PrivateMessageProps {
  userName: string;
  message: string;
  onClick?: () => void;
}

export const PrivateMessage: React.FC<PrivateMessageProps> = ({ userName, message, onClick }) => {
  return (
    <Box
      maxWidth="300px"
      height="50px"
      borderRadius="4px"
      overflow="hidden"
      borderWidth="1px"
      borderColor="white"
      borderStyle="solid"
      color="white"
      padding="4px"
      onClick={onClick}
    >
      {userName}
      <br />
      {message}
    </Box>
  );
};

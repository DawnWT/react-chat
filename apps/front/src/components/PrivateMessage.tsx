import React from 'react';
import { css } from '@panda/css';
import { Box } from '@panda/jsx';

interface PrivateMessageProps {
  userName: string;
  message: string;
  onClick?: () => void;
  onDelete?: () => void;
}

export const PrivateMessage: React.FC<PrivateMessageProps> = ({ userName, message, onClick, onDelete }) => {
  return (
    <Box
      display="flex"
      justifyContent="space-between"
      alignItems="center"
      maxWidth="100vh"
      height="60px"
      borderRadius="4px"
      overflow="hidden"
      color="white"
      padding="4px"
      margin="8px"
      css={{
        '&:hover': {
          backgroundColor: '#3c3c3c',
          cursor: 'pointer',
        },
      }}
    >
      <div
        onClick={onClick}
        className={css({
          display: 'flex',
          flexDirection: 'column',
          flex: 7,
        })}
      >
        <span>{userName}</span>
        <span
          className={css({
            fontSize: '14px',
            color: 'gray',
          })}
        >{message.length > 20 ? message.slice(0, 20) + '...' : message}</span>
      </div>
      <span
       onClick={onDelete}
        className={css({
          display: 'flex',
          flex: 1,
          justifyContent: 'center',
          fontSize: '20px',
          color: 'gray',
        })}
      >X
      </span>
    </Box>
  );
};

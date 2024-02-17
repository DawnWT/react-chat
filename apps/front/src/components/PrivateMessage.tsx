import { Card, CardActionArea, CardContent, Grid, Typography } from '@mui/material'
import React from 'react'

interface PrivateMessageProps {
  firstName: string
  lastName: string
  message: string
}

export const PrivateMessage: React.FC<PrivateMessageProps> = ({ firstName, lastName, message }) => {
  return (
    <Card sx={{ maxWidth: 300, height: 50 }}>
      <CardActionArea>
        <CardContent>
          <Grid container direction="column" sx={{ height: '100%' }}>
            <Typography variant="h6" component="div" sx={{ fontSize: '14px', fontWeight: 'bold' }}>
              {firstName} {lastName}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ fontSize: '10px' }}>
              {message.length > 40 ? message.substring(0, 40) + '...' : message}
            </Typography>
          </Grid>
        </CardContent>
      </CardActionArea>
    </Card>
  )
}

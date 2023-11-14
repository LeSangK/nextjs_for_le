import { Box, Button, List, ListItem, ListItemText, TextField } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoState } from '../state/atoms/todoState';
import CloseIcon from '@mui/icons-material/Close';
import { css } from '@emotion/react';

function sendNotification(title: string, options?: NotificationOptions) {
  if (Notification.permission === 'granted') {
    new Notification(title, options);
  }
}

export default function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    if (Notification.permission !== 'granted' && Notification.permission !== 'denied') {
      Notification.requestPermission();
    }
  }, []);

  const handleAddTodo = () => {
    if (inputValue !== '') {
      setTodos([...todos, inputValue]);
      setInputValue('');
    }
  };

  const handleDeleteTodo = (index: number) => {
    const newTodos = [...todos];
    newTodos.splice(index, 1);
    setTodos(newTodos);
  };

  const handleSendNotification = () => {
    sendNotification('Hello!', { body: 'This is a sample notification.' });
  };

  return (
    <Box>
      <div>
        <button onClick={handleSendNotification}>Send Notification</button>
      </div>
      <h1 className="title">Todo App</h1>
      <Box
        css={css`
          width: 50%;
        `}
      >
        <Box
          css={css`
            display: flex;
            height: 30px;
          `}
          className="inputContainer"
        >
          <TextField
            type="text"
            value={inputValue}
            css={css`
              width: 100%;
            `}
            variant="outlined"
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Enter a task"
            InputProps={{
              style: {
                height: '100%',
              },
            }}
          />
          <Button
            css={css`
              margin-left: 5px;
            `}
            variant="outlined"
            onClick={handleAddTodo}
          >
            Add
          </Button>
        </Box>
        <List>
          {todos.map((todo, index) => (
            <ListItem key={index}>
              <ListItemText>{todo}</ListItemText>
              <Button onClick={() => handleDeleteTodo(index)}>
                <CloseIcon />
              </Button>
            </ListItem>
          ))}
        </List>
      </Box>
    </Box>
  );
}

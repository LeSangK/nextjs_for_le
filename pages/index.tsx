import React, { useState } from 'react';
import { useRecoilState } from 'recoil';
import { todoState } from '../state/atoms/todoState';

export default function Home() {
  const [todos, setTodos] = useRecoilState(todoState);
  const [inputValue, setInputValue] = useState('');

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

  return (
    <div className="app">
      <h1 className="title">Todo App</h1>
      <div className="inputContainer">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          placeholder="Enter a task"
          className="textInput"
        />
        <button className="addButton" onClick={handleAddTodo}>
          Add
        </button>
      </div>
      <ul className="todosList">
        {todos.map((todo, index) => (
          <li className="todoItem" key={index}>
            {todo}
            <button className="deleteButton" onClick={() => handleDeleteTodo(index)}>
              X
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

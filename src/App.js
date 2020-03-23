import React, {useState} from 'react';
import logo from './logo.svg';
import './App.css';

const Todo = (props) => (
  <div className="m-8 bg-gray-200 shadow-md p-2 rounded-lg flex">
    <div>
      <p className="text-2xl font-black text-gray-900">{props.title}</p>
      <p className="text-gray-600"><strong>Due:</strong> {props.due}</p>
    </div>
    <button
      className="text-red-500 hover:text-red-800"
      onClick={
        () => props.handleDelete(props.title)
      }
    >
      <svg class="h-8 w-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor" xmlns="http://www.w3.org/2000/svg">
        <path fill-rule="evenodd" clip-rule="evenodd" d="M4.29289 4.29289C4.68342 3.90237 5.31658 3.90237 5.70711 4.29289L10 8.58579L14.2929 4.29289C14.6834 3.90237 15.3166 3.90237 15.7071 4.29289C16.0976 4.68342 16.0976 5.31658 15.7071 5.70711L11.4142 10L15.7071 14.2929C16.0976 14.6834 16.0976 15.3166 15.7071 15.7071C15.3166 16.0976 14.6834 16.0976 14.2929 15.7071L10 11.4142L5.70711 15.7071C5.31658 16.0976 4.68342 16.0976 4.29289 15.7071C3.90237 15.3166 3.90237 14.6834 4.29289 14.2929L8.58579 10L4.29289 5.70711C3.90237 5.31658 3.90237 4.68342 4.29289 4.29289Z" fill="#4A5568"/>
      </svg>
    </button>
  </div>
)

function App() {

  let initValue = JSON.parse(window.localStorage.getItem('todos')) || []

  const [todos, setTodos] = useState(initValue)
  const [input, setInput] = useState("")
  const [dueDate, setDueDate] = useState("")

  function handleNewTodo() {
    if (input != "") {
      let newList = todos.concat({title: input, dueDate: dueDate})
      setTodos(newList)
      window.localStorage.setItem('todos', JSON.stringify(newList))
      setInput('')
      setDueDate('')
    }
  }

  function handleDelete(name) {
    let newList = todos.filter(item => item.title != name)
    setTodos(newList)
    window.localStorage.setItem('todos', JSON.stringify(newList))
  }

  return (
    <div>
      <h1 className="pt-8 text-5xl font-bold text-center">Todo List</h1>
      <div className="bg-gray-200 m-2 p-4 rounded-lg">
        <input
          className="mr-2 p-1 rounded"
          type="text"
          placeholder="new todo"
          value={input}
          onChange={e => setInput(e.target.value)}
        />
        <input
          className="mr-2 p-1 rounded"
          type="text"
          placeholder="due date"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
        <button
          className="rounded bg-gray-600 hover:bg-gray-500 text-white px-2 py-1"
          onClick={ () => handleNewTodo()}
        >
          Add Todo
        </button>
      </div>
      {
        todos.map(todo => (
          <Todo title={todo.title} due={todo.dueDate} handleDelete={handleDelete} />
        ))
      }
    </div>
  );
}

export default App;

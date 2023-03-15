import { addDoc, collection } from 'firebase/firestore';
import { useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { db } from './firebase';
import Todo from './Todo';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0]`,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100`,
  count: `text-center p-2`,
};

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create todo
  const createTask = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a Task!');
      return;
    }
    await addDoc(collection(db, 'tasks'), {
      task: input,
      completed: false,
    });
    setInput('');
  };

  return (
    <div className={style.bg}>
      <div className={style.container}>
        <h3 className={style.heading}>Todo App</h3>
        <form onSubmit={createTask} className={style.form}>
          <input
            className={style.input}
            type='text'
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder='Add Todo'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
            />
          ))}
        </ul>
        <div className='flex justify-center pt-2'>
          {todos.length < 1 ? "Please add some tasks!" : (
            <p className={style.count}>{`You have ${todos.length} todos`}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

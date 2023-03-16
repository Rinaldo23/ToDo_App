import { addDoc, collection, deleteDoc, doc, onSnapshot, query, updateDoc } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { AiOutlinePlus } from 'react-icons/ai';
import { db } from './firebase';
import Todo from './Todo';

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-b from-[#2F80ED] `,
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-2xl shadow-xl p-4`,
  heading: `text-3xl font-bold text-center text-gray-800 p-2`,
  form: `flex justify-between`,
  input: `border px-6 w-full text-xl rounded-2xl`,
  button: `border p-4 ml-2 bg-purple-500 text-slate-100 rounded-2xl hover:bg-blue-400`,
  count: `text-center p-2`,
};

function App() {

  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState('');

  // Create a task and add to fireStore
  const createTask = async (e) => {
    e.preventDefault(e);
    if (input === '') {
      alert('Please enter a Task!');
      return;
    }
    await addDoc(collection(db, 'tasks'), {
      task: input,
      completed: false
    });
    setInput('');
  };

  // Delete todo
  const deleteTask = async (todo) => {
    await deleteDoc(doc(db, 'tasks', todo.id));
  };

  // Read tasks from firebase/fireStore
  useEffect(() => {
    const q = query(collection(db, 'tasks'));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      let todosArr = [];
      querySnapshot.forEach((doc) => {
        todosArr.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todosArr);
    });
    return () => unsubscribe();
  }, []);


  // Update todo in firebase
  const updateTask = async (todo) => {
    await updateDoc(doc(db, 'tasks', todo.id), {
      completed: !todo.completed,
    });
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
            placeholder='Add a task'
          />
          <button className={style.button}>
            <AiOutlinePlus size={30} />
          </button>
        </form>
        <ul>
          {todos?.map((todo, index) => (
            <Todo
              key={index}
              todo={todo}
              deleteTask={deleteTask}
              updateTask={updateTask}
            />
          ))}
        </ul>
        <div className='flex justify-center pt-2'>
          {todos.length < 1 ? "You have no tasks!!" : (
            <p className={style.count}>{`You have ${todos.length} todos`}</p>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;

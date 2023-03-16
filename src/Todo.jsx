import React from 'react';
import { FaRegTrashAlt } from 'react-icons/fa';

const style = {
    li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
    liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
    row: `flex`,
    text: `ml-2 cursor-pointer`,
    textComplete: `ml-2 cursor-pointer line-through`,
    button: `cursor-pointer flex items-center`,
};

const task = ({ todo, deleteTask, updateTask }) => {
    return (
        <li className={todo.completed ? style.liComplete : style.li}>
            <div className={style.row}>
                <input onChange={() => updateTask(todo)} type='checkbox' checked={todo.completed ? 'checked' : ''} />
                <p onClick={() => updateTask(todo)} className={todo.completed ? style.textComplete : style.text}>
                    {todo.task}
                </p>
            </div>
            <button onClick={() => deleteTask(todo)}>{<FaRegTrashAlt />}</button>
        </li>
    );
};

export default task;
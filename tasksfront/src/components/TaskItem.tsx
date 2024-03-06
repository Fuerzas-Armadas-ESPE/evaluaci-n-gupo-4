import { useState } from "react";
import { useTasks } from "../context/useTasks";
import { Task } from "../interface/task.interface";
import { IoCheckmarkDone, IoTrash, IoPencil, IoCheckmarkCircleOutline  } from "react-icons/io5";

interface Props {
  task: Task;
}

function TaskItem({ task }: Props) {
  const { deleteTask, updateTask } = useTasks();
  
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);

  const handleEdit = () => {
    setIsEditing(true);
  }

  const handleSave = () => {
    updateTask(task._id, { title, description });
    setIsEditing(false);
  }

  return (
    <div className="bg-gray-900 p-2 my-2 flex justify-between hover:bg-gray-900 hover:cursor-pointer">
      <div>
        {isEditing ? (
          <>
            <input className="text-black" value={title} onChange={(e) => setTitle(e.target.value)} />
            <input className="text-black" value={description} onChange={(e) => setDescription(e.target.value)} />
          </>
        ) : (
          <>
            <h3 className="font-bold">{task.title}</h3>
            <p className="text-slate-400">{task.description}</p>
          </>
        )}
      </div>
      <div className="flex gap-x-2">
        <button
          onClick={() => {
            if (!window.confirm("¿Estás segura de que quieres eliminarlo?")) return;
            deleteTask(task._id);
          }}
        >
          <IoTrash className="hover:text-red-500" />
        </button>
        <button onClick={() => updateTask(task._id, { done: !task.done })}>
          {task.done ? (
            <IoCheckmarkDone className="hover:text-green-500" />
          ) : (
            <IoCheckmarkDone className="text-green-500" />
          )}
        </button>
        {isEditing ? (
          <button onClick={handleSave}>
            <IoCheckmarkCircleOutline className="hover:text-blue-500" />
          </button>
        ) : (
          <button onClick={handleEdit}>
            <IoPencil className="hover:text-blue-500" />
          </button>
        )}
      </div>
    </div>
  );
}

export default TaskItem;
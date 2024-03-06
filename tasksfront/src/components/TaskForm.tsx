import { ChangeEvent, FormEvent, useEffect, useState } from "react";
import { Task } from "../interface/task.interface";
import { useTasks } from "../context/useTasks";

interface TaskFormProps {
  taskToEdit?: Task;
  handleUpdateTask?: (task: Task) => void;
}

function TaskForm({ taskToEdit, handleUpdateTask }: TaskFormProps) {
  const [task, setTask] = useState({
    title: "",
    description: "",
    done: false,
  });
  const { createTask } = useTasks();

  useEffect(() => {
    if (taskToEdit) {
      setTask({
        title: taskToEdit.title,
        description: taskToEdit.description || "",
        done: taskToEdit.done || false,
      });
    } else {
      setTask({
        title: "",
        description: "",
        done: false,
      });
    }
  }, [taskToEdit]);

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setTask({ ...task, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (taskToEdit && handleUpdateTask) {
      handleUpdateTask({ ...taskToEdit, ...task });
    } else {
      await createTask(taskToEdit || task as Task);
    }
    setTask({ title: "", description: "", done: false });
  };

  // Resto del código...
// Resto del código...
return (
<div className="flex justify-center">
<form className="w-full max-w-sm" onSubmit={handleSubmit}>
    <div className="mb-4">
    <label className="block text-white-700 text-sm font-bold mb-2">
        Curso
      </label>
      <input
        name="title"
        type="text"
        placeholder="Escribir un curso"
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
      />
    </div>
    <div className="mb-4">
    <label className="block text-white-700 text-sm font-bold mb-2">
        Tema
      </label>
      
      <textarea
        name="description"
        rows={3}
        onChange={handleChange}
        className="border-2 border-gray-700 p-2 rounded-lg bg-zinc-800 block w-full my-2"
        placeholder="Escribir un tema"
      ></textarea>
    </div>
    <div className="flex items-center justify-around">
    <button type="submit" className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">
      Guardar
    </button>
    <div style={{ display: "flex", justifyContent: "space-between" }}>
      <label className="inline-flex items-center gap-x-2">
        <span>Hecho</span>
        <input
          type="checkbox"
          value={task.done ? 1 : 0}
          onChange={() =>
            setTask({
              ...task,
              done: !task.done,
            })
          }
          className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
        />
      </label>
    </div>
    </div>
  </form>
  </div>
);
}

export default TaskForm;

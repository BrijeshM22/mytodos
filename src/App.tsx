import React, { useEffect, useState } from "react";
import { DragDropContext, DropResult } from "react-beautiful-dnd";

import "./App.css";
import InputField from "./components/InputField";
import TodoList from "./components/TodoList";
import { Todo } from "./model";

const App: React.FC = () => {
  const [todo, setTodo] = useState<string>("");
  const [todos, setTodos] = useState<Todo[]>([]);
  const [WIPTodos, setWIPTodos] = useState<Todo[]>([]);
  const [completedTodos, setcompletedTodos] = useState<Todo[]>([]);

  useEffect(() => {
    let todolist = localStorage.getItem("LocalTodos");
    if (todolist) {
      const storedList = JSON.parse(todolist);
      setTodos(storedList);
    }
    let WIPlist = localStorage.getItem("LocalWIPTodos");
    if (WIPlist) {
      const Progresslist = JSON.parse(WIPlist);
      setWIPTodos(Progresslist);
    }
    let Completedlist = localStorage.getItem("LocalCompletedTodos");
    if (Completedlist) {
      const completelist = JSON.parse(Completedlist);
      setcompletedTodos(completelist);
    }
  }, []);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTask = { id: Date.now(), todo, isCompleted: false };
      setTodos([...todos, newTask]);
      localStorage.setItem("LocalTodos", JSON.stringify([...todos, newTask]));
      setTodo("");
    }
  };

  const onDragEnd = (result: DropResult) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    )
      return;

    let add,
      active = todos,
      progress = WIPTodos,
      complete = completedTodos;

    if (source.droppableId === "TodosList") {
      add = active[source.index];
      active.splice(source.index, 1);
    } else if (source.droppableId === "TodosWIP") {
      add = progress[source.index];
      progress.splice(source.index, 1);
    } else {
      add = complete[source.index];
      complete.splice(source.index, 1);
    }

    if (destination.droppableId === "TodosList") {
      active.splice(destination.index, 0, add);
    } else if (destination.droppableId === "TodosWIP") {
      progress.splice(destination.index, 0, add);
    } else {
      complete.splice(destination.index, 0, add);
    }

    setTodos(active);
    setWIPTodos(progress);
    setcompletedTodos(complete);

    localStorage.setItem("LocalTodos", JSON.stringify([...todos, setTodos]));
    localStorage.setItem(
      "LocalWIPTodos",
      JSON.stringify([...WIPTodos, setWIPTodos])
    );
    localStorage.setItem(
      "LocalCompletedTodos",
      JSON.stringify([...completedTodos, setcompletedTodos])
    );
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <div className="App">
        <span className="heading">To-do list</span>
        <InputField todo={todo} setTodo={setTodo} handleAdd={handleAdd} />
        <TodoList
          todos={todos}
          setTodos={setTodos}
          WIPTodos={WIPTodos}
          setWIPTodos={setWIPTodos}
          completedTodos={completedTodos}
          setCompletedTodos={setcompletedTodos}
        />
      </div>
    </DragDropContext>
  );
};

export default App;

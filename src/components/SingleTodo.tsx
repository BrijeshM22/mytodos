import React, { useState, useRef, useEffect } from "react";
import { Todo } from "../model";
import { AiFillEdit } from "react-icons/ai";
import { MdDone, MdDelete } from "react-icons/md";
import "./styles.css";
import { Draggable } from "react-beautiful-dnd";

type Props = {
  index: number;
  todo: Todo;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  localname: string;
};

const SingleTodo = ({ index, todo, todos, setTodos, localname }: Props) => {
  const [edit, setEdit] = useState<boolean>(false);
  const [editTodo, setEditTodo] = useState<string>(todo.todo);

  const handleDone = (id: number) => {
    setTodos(
      todos
        .filter((todo) => {
          return todo !== null;
        })
        .map((todo) =>
          todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
        )
    );
    localStorage.setItem(
      localname,
      JSON.stringify(
        todos
          .filter((todo) => {
            return todo !== null;
          })
          .map((todo) =>
            todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
          )
      )
    );
  };

  const handleDelete = (id: number) => {
    setTodos(
      todos
        .filter((todo) => {
          return todo !== null;
        })
        .filter((todo) => todo.id !== id)
    );

    localStorage.setItem(
      localname,
      JSON.stringify(
        todos
          .filter((todo) => {
            return todo !== null;
          })
          .filter((todo) => todo.id !== id)
      )
    );
  };

  const handleEdit = (e: React.FormEvent, id: number) => {
    e.preventDefault();
    setTodos(
      todos
        .filter((todo) => {
          return todo !== null;
        })
        .map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
    );

    localStorage.setItem(
      localname,
      JSON.stringify(
        todos
          .filter((todo) => {
            return todo !== null;
          })
          .map((todo) => (todo.id === id ? { ...todo, todo: editTodo } : todo))
      )
    );

    setEdit(false);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, [edit]);

  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <Draggable draggableId={todo.id.toString()} index={index}>
      {(provided, snapshot) => (
        <form
          className={`todos__single ${snapshot.isDragging ? "drag" : ""}`}
          onSubmit={(e) => handleEdit(e, todo.id)}
          onBlur={(e) => handleEdit(e, todo.id)}
          {...provided.draggableProps}
          {...provided.dragHandleProps}
          ref={provided.innerRef}
        >
          {edit ? (
            <input
              ref={inputRef}
              value={editTodo}
              onChange={(e) => setEditTodo(e.target.value)}
              className="todos__single--text editmode"
            />
          ) : todo.isCompleted ? (
            <s
              className="todos__single--text"
              onClick={() => handleDone(todo.id)}
            >
              {todo.todo}
            </s>
          ) : (
            <span
              className="todos__single--text"
              onClick={() => handleDone(todo.id)}
            >
              {todo.todo}
            </span>
          )}
          <div>
            <span
              className="icon"
              onClick={(e) => {
                handleEdit(e, todo.id);
                setEdit(!edit);
              }}
            >
              {!edit ? <AiFillEdit /> : <MdDone />}
            </span>
            <span className="icon" onClick={() => handleDelete(todo.id)}>
              <MdDelete />
            </span>
            {/* <span className="icon" onClick={() => handleDone(todo.id)}>
              <MdDone />
            </span> */}
          </div>
        </form>
      )}
    </Draggable>
  );
};

export default SingleTodo;

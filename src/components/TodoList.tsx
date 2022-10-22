import React, { useState, useEffect, useRef } from "react";
import "./styles.css";
import { Todo } from "../model";
import SingleTodo from "./SingleTodo";
import { Droppable } from "react-beautiful-dnd";
import { BsPlusLg } from "react-icons/bs";
// import InputField from "./InputField";
import SubInputField from "./SubInputField";

interface Props {
  todo: string;
  setTodo: React.Dispatch<React.SetStateAction<string>>;
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  WIPTodos: Todo[];
  setWIPTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
  completedTodos: Todo[];
  setCompletedTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}
const TodoList: React.FC<Props> = ({
  todo,
  setTodo,
  todos,
  setTodos,
  WIPTodos,
  setWIPTodos,
  completedTodos,
  setCompletedTodos,
}) => {
  const handleAddTodo = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTask = { id: Date.now(), todo, isCompleted: false };
      setTodos([...todos, newTask]);
      localStorage.setItem("LocalTodos", JSON.stringify([...todos, newTask]));
      setTodo("");
      setShowBox(false);
    } else {
      setShowBox(true);
    }
  };

  const handleAddWIP = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTask = { id: Date.now(), todo, isCompleted: false };
      setWIPTodos([...WIPTodos, newTask]);
      localStorage.setItem(
        "LocalWIPTodos",
        JSON.stringify([...WIPTodos, newTask])
      );
      setTodo("");
      setShowBoxWIP(false);
    } else {
      setShowBoxWIP(true);
    }
  };

  const handleAddCompleted = (e: React.FormEvent) => {
    e.preventDefault();
    if (todo) {
      const newTask = { id: Date.now(), todo, isCompleted: false };
      setCompletedTodos([...completedTodos, newTask]);
      localStorage.setItem(
        "LocalCompletedTodos",
        JSON.stringify([...completedTodos, newTask])
      );
      setTodo("");
      setShowBoxComp(false);
    } else {
      setShowBoxComp(true);
    }
  };

  const [showBox, setShowBox] = useState<boolean>(false);
  const [showBoxWIP, setShowBoxWIP] = useState<boolean>(false);
  const [showBoxComp, setShowBoxComp] = useState<boolean>(false);

  const subinputRef = useRef<HTMLInputElement>(null);

  const handlePlus = () => {
    setShowBox(true);
    subinputRef.current?.focus();
  };

  useEffect(() => {
    subinputRef.current?.focus();
  }, [showBox]);

  return (
    <div className="container">
      <Droppable droppableId="TodosList">
        {(provided, snapshot) => (
          <div
            className={`todos tdos ${
              snapshot.isDraggingOver ? "dragactive" : ""
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">
              <span>To do</span>
            </span>
            {todos
              ?.filter((todo) => {
                return todo !== null;
              })
              .map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={todos}
                  setTodos={setTodos}
                  localname="LocalTodos"
                />
              ))}
            {provided.placeholder}
            <div>
              {showBox ? (
                <SubInputField
                  todo={todo}
                  setTodo={setTodo}
                  handleAdd={handleAddTodo}
                  showBox={showBox}
                  setShowBox={setShowBox}
                />
              ) : (
                <div className="subPlusIcon">
                  <button onClick={handlePlus}>
                    <BsPlusLg />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosWIP">
        {(provided, snapshot) => (
          <div
            className={`todos WIP ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">
              <span>In Progress</span>
              {/* <button>
                <BsPlusLg />
              </button> */}
            </span>
            {WIPTodos?.filter((todo) => {
              return todo !== null;
            }).map((todo, index) => (
              <SingleTodo
                index={index}
                todo={todo}
                key={todo.id}
                todos={WIPTodos}
                setTodos={setWIPTodos}
                localname="LocalWIPTodos"
              />
            ))}
            {provided.placeholder}
            <div>
              {showBoxWIP ? (
                <SubInputField
                  todo={todo}
                  setTodo={setTodo}
                  handleAdd={handleAddWIP}
                  showBox={showBoxWIP}
                  setShowBox={setShowBoxWIP}
                />
              ) : (
                <div className="subPlusIcon">
                  <button onClick={() => setShowBoxWIP(!showBoxWIP)}>
                    <BsPlusLg />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
      <Droppable droppableId="TodosRemove">
        {(provided, snapshot) => (
          <div
            className={`todos remove ${
              snapshot.isDraggingOver ? "dragcomplete" : "remove"
            }`}
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            <span className="todos__heading">
              <span>Completed</span>
              {/* <button>
                <BsPlusLg />
              </button> */}
            </span>
            {completedTodos
              ?.filter((todo) => {
                return todo !== null;
              })
              .map((todo, index) => (
                <SingleTodo
                  index={index}
                  todo={todo}
                  key={todo.id}
                  todos={completedTodos}
                  setTodos={setCompletedTodos}
                  localname="LocalCompletedTodos"
                />
              ))}
            {provided.placeholder}
            <div>
              {showBoxComp ? (
                <SubInputField
                  todo={todo}
                  setTodo={setTodo}
                  handleAdd={handleAddCompleted}
                  showBox={showBoxComp}
                  setShowBox={setShowBoxComp}
                />
              ) : (
                <div className="subPlusIcon">
                  <button onClick={() => setShowBoxComp(!showBoxComp)}>
                    <BsPlusLg />
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default TodoList;

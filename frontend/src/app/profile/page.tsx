"use client";

import axios from "axios";
import { ITodo } from "@/types/types";
import { useEffect, useReducer, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const instance = axios.create({
  baseURL: "http://localhost:3001/api",
});

const config = {
  headers: {
    Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
  },
};

enum TODO_ACTION_TYPES {
  ADD = "ADD",
  DELETE = "DELETE",
  UPDATE = "UPDATE",
  GET_ALL = "GET_ALL",
}

interface todoActions {
  type: TODO_ACTION_TYPES;
  payload: ITodo[];
}

function reducer(state: ITodo[], action: todoActions): ITodo[] {
  // TODO: toggle complete, change title
  switch (action.type) {
    case "ADD":
      return action.payload.concat(state);
    case "DELETE":
      return state.filter((todo) => todo.id !== action.payload[0].id);
    case "UPDATE":
      return [];
    case "GET_ALL":
      return action.payload;
    default:
      return [];
  }
}

// TODO: check if user is auth-ed and if it's not his profile check for shared token (or smth)
function Profile() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const [input, setInput] = useState<string>("");
  function handleAddTodo() {
    instance
      .post("/todos", { title: input, createdAt: new Date() }, config)
      .then((r) => {
        dispatch({
          type: TODO_ACTION_TYPES.ADD,
          payload: [
            { id: r.data.id, title: r.data.title, createdAt: r.data.createdAt },
          ],
        });
        setInput("");
      })
      .catch((err) => {
        const response = JSON.parse(err.request.response);
        alert(response.message);
      });
  }
  function handleDeleteTodo(todo: ITodo) {
    instance
      .delete(`/todos/${todo.id}`, config)
      .then((r) =>
        dispatch({
          type: TODO_ACTION_TYPES.DELETE,
          payload: [todo],
        }),
      )
      .catch((err) => {
        const response = JSON.parse(err.request.response);
        alert(response.message);
      });
  }
  useEffect(() => {
    instance
      .get("/todos", config)
      .then((r) => {
        setIsLoaded(true);
        dispatch({ type: TODO_ACTION_TYPES.GET_ALL, payload: r.data });
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  return (
    <div className="ml-auto mr-auto mt-20 flex min-h-64 w-1/2 flex-col rounded-xl border-4 shadow-xl">
      <div className="mt-10 flex justify-center gap-10">
        <input
          type="text"
          className="border-b-2 focus:border-gray-500 focus:outline-none"
          placeholder="type a todo..."
          value={input}
          onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
            setInput(e.target.value)
          }
        />
        <button
          className="text-2xl transition-colors duration-500 hover:text-gray-300"
          onClick={handleAddTodo}
        >
          +
        </button>
      </div>
      {isLoaded ? (
        <ul className="mx-4 mb-4 mt-8 flex flex-col gap-3">
          {todos.map((todo) => (
            <div
              className="flex min-h-10 flex-row rounded-xl bg-gray-200"
              key={todo.id}
            >
              <li className="my-auto ml-10 cursor-pointer bg-transparent text-2xl">
                {todo.title}
              </li>
              <div className="my-auto ml-auto mr-10">
                <button
                  className="btn-action"
                  onClick={() => handleDeleteTodo(todo)}
                >
                  <FontAwesomeIcon icon={faTrash}></FontAwesomeIcon>
                </button>
              </div>
            </div>
          ))}
        </ul>
      ) : (
        <span className="m-auto">Loading...</span>
      )}
    </div>
  );
}

export default Profile;

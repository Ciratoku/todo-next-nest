"use client";

import axios from "axios";
import Button from "@/components/Button";
import { ITodo } from "@/types/types";
import { useEffect, useReducer, useState } from "react";
import { faTrash } from "@fortawesome/free-solid-svg-icons";
import useInput from "@/hooks/useInput";

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
  switch (action.type) {
    case "ADD":
      return action.payload.concat(state);
    case "DELETE":
      break;
    case "UPDATE":
      break;
    case "GET_ALL":
      return action.payload;
  }
  return [{ id: 1, title: "" }];
}

// TODO: check if user is auth-ed and if it's not his profile check for shared token (or smth)
function Profile() {
  const [todos, dispatch] = useReducer(reducer, []);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  const add = useInput("");
  function handleAddTodo() {
    instance
      .post("/todos", { title: add.value }, config)
      .then((r) => {
        console.log(r.data);
        dispatch({
          type: TODO_ACTION_TYPES.ADD,
          payload: [{ id: r.data.id, title: r.data.title }],
        });
      })
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
          {...add}
        />
        <button
          className="text-2xl transition-colors duration-500 hover:text-gray-300"
          onClick={handleAddTodo}
        >
          +
        </button>
      </div>
      {isLoaded ? (
        <ul className="mx-4 mb-4 mt-8 flex flex-col gap-3 rounded-md">
          {todos.map((todo) => (
            <div className="flex flex-row bg-gray-200" key={todo.id}>
              <li className="ml-10 cursor-pointer bg-transparent outline-none">
                {todo.title}
              </li>
              <div className="ml-auto mr-10 flex flex-row gap-2">
                <Button icon={faTrash} />
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

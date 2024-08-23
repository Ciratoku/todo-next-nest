"use client";

import axios from "axios";
import { ITodo } from "@/types/types";
import { useEffect, useState } from "react";

// TODO: check if user is auth-ed and if it's not his profile check for shared token (or smth)
function Profile() {
  const instance = axios.create({
    baseURL: "http://localhost:3001/api",
  });
  const config = {
    headers: {
      Authorization: `Bearer ${sessionStorage.getItem("jwt-token")}`,
    },
  };
  const [todos, setTodos] = useState<ITodo[]>([]);
  const [isLoaded, setIsLoaded] = useState<Boolean>(false);
  useEffect(() => {
    instance
      .get("/todos", config)
      .then((r) => {
        setIsLoaded(true);
        setTodos(r.data);
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
        />
        <button className="text-2xl">+</button>
      </div>
      {isLoaded ? (
        <ul className="mx-4 mt-8 flex flex-col rounded-md bg-gray-200">
          {todos.map((todo) => (
            <div className="flex flex-row" key={todo.id}>
              <li className="ml-10">{todo.title}</li>
              <div className="ml-auto mr-10 flex flex-row gap-2">
                <button>d</button>
                <button>e</button>
                <button>c</button>
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

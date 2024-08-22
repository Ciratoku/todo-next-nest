"use client";
import { useState } from "react";

function Auth() {
  function useInput(def: string) {
    const [value, setValue] = useState(def);
    return {
      value,
      onChange: (e: React.ChangeEvent<HTMLInputElement>) =>
        setValue(e.target.value),
    };
  }
  const email = useInput("");
  const pwd = useInput("");
  return (
    <div className="mt-40 flex justify-center">
      <form className="flex flex-col gap-4">
        <input type="text" className="input" placeholder="email" {...email} />
        <input
          type="password"
          className="input"
          placeholder="password"
          {...pwd}
        />
        <button className="mx-auto rounded-md bg-gray-100 p-1 text-gray-800 hover:bg-gray-200">
          Submit
        </button>
      </form>
    </div>
  );
}

export default Auth;

"use client";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/navigation";
import axios from "axios";

function Auth() {
  const router = useRouter();
  const email = useInput("");
  const pwd = useInput("");
  const handleSubmit = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    const type = (e.target as HTMLElement).innerText;
    const body = { email: email.value, password: pwd.value };
    axios
      .post("http://localhost:3001/api/users", body)
      .then((r) => console.log(r))
      .catch((err) => console.log(err));
  };
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
        <div className="flex justify-between">
          <button className="btn" onClick={(event) => handleSubmit(event)}>
            Login
          </button>
          <button className="btn" onClick={(event) => handleSubmit(event)}>
            Register
          </button>
        </div>
      </form>
    </div>
  );
}

export default Auth;

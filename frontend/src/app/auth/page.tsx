"use client";
import useInput from "@/hooks/useInput";
import { useRouter } from "next/navigation";

function Auth() {
  const router = useRouter();
  const handleSubmit = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    router.push("/profile/1");
  };
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
        <button
          className="mx-auto rounded-md bg-gray-100 p-1 text-gray-800 hover:bg-gray-200"
          onClick={(event) => handleSubmit(event)}
        >
          Submit
        </button>
      </form>
    </div>
  );
}

export default Auth;

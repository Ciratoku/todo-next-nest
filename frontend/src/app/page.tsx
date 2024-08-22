import Link from "next/link";

export default function Home() {
  return (
    <div className="flex flex-grow justify-center p-4">
      <Link href="/auth" className="my-56 text-4xl text-fuchsia-500">
        Register/Login
      </Link>
    </div>
  );
}

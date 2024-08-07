import Link from "next/link";

export default function Navigation() {
  return (
    <nav className="fixed top-0 left-0 right-0 bg-gray-800 text-white p-4 flex justify-between">
      <Link href="/a">
        <button className="bg-blue-500 p-2 rounded">Page A</button>
      </Link>
      <Link href="/b">
        <button className="bg-blue-500 p-2 rounded">Page B</button>
      </Link>
      <Link href="/c">
        <button className="bg-blue-500 p-2 rounded">Page C</button>
      </Link>
    </nav>
  );
}

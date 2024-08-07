import Link from 'next/link';
import ChatWidget from './ChatWidget';

const Page = ({ title, children, chatProps }) => {
  return (
    <div className="flex-1 w-full bg-blue-500 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl">{title}</h1>
      {children}
      <Link href="/">
        <button className="bg-blue-500 p-2 rounded">🏠</button>
      </Link>
      <ChatWidget {...chatProps} />
    </div>
  );
};

export default Page;

import Link from 'next/link';
import { Button } from "@/components/ui/button";
import ChatWidget from './ChatWidget';

const Page = ({ title, children, chatProps }) => {
  return (
    <div className="flex-1 w-full bg-blue-500 text-white p-4 flex flex-col items-center justify-center">
      <h1 className="text-3xl">{title}</h1>
      {children}
      <Link href="/">
        <Button className="bg-blue-500 p-2 rounded">🏠</Button>
      </Link>
      <ChatWidget {...chatProps} />
    </div>
  );
};

export default Page;

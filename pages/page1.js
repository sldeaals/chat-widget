import ChatWidget from '../components/ChatWidget';

const Page1 = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Page 1</h1>
      <p>This is Page 1 with a chat widget.</p>
      <ChatWidget />
    </div>
  );
};

export default Page1;

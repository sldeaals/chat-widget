import ChatWidget from '../components/ChatWidget';

const Home = () => {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold">Home Page</h1>
      <p>Welcome to the chat application.</p>
      <ChatWidget />
    </div>
  );
};

export default Home;

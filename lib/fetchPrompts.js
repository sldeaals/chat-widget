export const fetchPrompts = async (pageId) => {
  const promptsMock = {
    pageA: [
      "Hello, how can I assist you today?",
      "Can you provide more details?",
      "What specific issue are you facing?",
    ],
    pageB: [
      "Welcome to Page B. How can I help you?",
      "Do you need assistance with something specific?",
      "Feel free to ask any questions.",
    ],
    pageC: [
      "Greetings from Page C!",
      "What information are you looking for?",
      "How can we assist you today?",
    ],
  };

  try {
    /*const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/prompts?page=${pageId}`
    );
    const data = await response.json();
    return data.prompts || promptsMock[pageId];*/
    return promptsMock[pageId];
  } catch (e) {
    console.error(`Error fetching prompts for ${pageId}:`, e);
    return promptsMock[pageId];
  }
};

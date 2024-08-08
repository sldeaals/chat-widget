export const fetchMessages = async () => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/messages`);
    if (!response.ok) {
      throw new Error(`Failed to fetch messages: ${response.statusText}`);
    }
    return await response.json();
  } catch (error) {
    console.error("Error fetching messages:", error);
    return [];
  }
};

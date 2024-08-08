export const sendMessage = async (senderId, formData) => {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL;

  try {
    const response = await fetch(`${apiUrl}/messages`, {
      method: "POST",
      headers: {
        "x-sender-id": senderId,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error(`Failed to send message: ${response.statusText}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Error sending message:", error);
    throw error;
  }
};

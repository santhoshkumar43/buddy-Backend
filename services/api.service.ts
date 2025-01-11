import axios from "axios";

export async function fetchBotResponse(userMessage: string): Promise<string> {
  const payload = {
    contents: [
      {
        parts: [
          {
            text: `${userMessage}`,
          },
        ],
      },
    ],
  };

  try {
    const response = await axios.post(
      "https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyC-m-RJd8aZVRZeArNTbO09hYAImDcT4ks",
      payload,
      { headers: { "Content-Type": "application/json" } }
    );

    return (
      response.data.candidates[0].content.parts[0].text ||
      "No response from bot"
    );
  } catch (error) {
    console.error("Error fetching API data:", error);
    return `Failed to process your request. Please try again later.`;
  }
}

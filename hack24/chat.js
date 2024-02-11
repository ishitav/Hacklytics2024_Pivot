// pages/api/chat.js
import { Configuration, OpenAIApi } from "openai";

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    // Restrict to POST requests
    res.setHeader('Allow', ['POST']);
    return res.status(405).end(`Method ${req.method} Not Allowed`);
  }

  // Ensure the API key is loaded for each request to accommodate environments like serverless functions
  const configuration = new Configuration({
    apiKey: "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",
  });
  const openai = new OpenAIApi(configuration);

  const { message } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003", // Adjust the model as needed
      prompt: message,
      max_tokens: 150,
    });

    console.log("OpenAI response:", response.data); // Log the full response for debugging
    res.status(200).json({ reply: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("OpenAI API error:", error.response ? error.response.data : error); // Log more detailed error info
    res.status(500).json({ error: "Error processing your request", details: error.message });
  }
}

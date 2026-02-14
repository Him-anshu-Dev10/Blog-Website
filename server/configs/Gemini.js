import dotenv from "dotenv";
dotenv.config();

async function main(prompt) {
  try {
    console.log("Generating blog using OpenRouter...");

    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000",
          "X-Title": "Blog Generator",
        },
        body: JSON.stringify({
          model: "anthropic/claude-3-haiku",
          max_tokens: 3000,
          temperature: 0.7,
          messages: [
            {
              role: "user",
              content: prompt,
            },
          ],
        }),
      },
    );

    const data = await response.json();

    if (!response.ok) {
      console.log(data);
      throw new Error(data.error?.message || "OpenRouter failed");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter Error:", error.message);
    throw error;
  }
}

export default main;

import OpenAI from "openai";

const apiKey = import.meta.env.VITE_OPENAI_API_KEY;

if (!apiKey) {
  console.warn("OpenAI API key is missing. Please set VITE_OPENAI_API_KEY in your environment.");
}

const client = new OpenAI({
  apiKey,
  dangerouslyAllowBrowser: true, // Note: Exposes your API key in frontend, consider backend proxy
});

export async function generateResumePrompt(data) {
  const prompt = `
Create a professional resume summary from this data:
Name: ${data.name}
Education: ${data.education}
Internships: ${JSON.stringify(data.internships)}
Projects: ${JSON.stringify(data.projects)}

Output the resume summary in a clear, professional format.
Also, list extracted skill tags separately at the end.
`;

  try {
    const response = await client.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        {
          role: "system",
          content: "You are a helpful assistant that creates professional resume summaries.",
        },
        {
          role: "user",
          content: prompt,
        },
      ],
      // Optional: set max tokens and temperature for output control
      max_tokens: 500,
      temperature: 0.7,
    });

    return response.choices[0].message.content;
  } catch (error) {
    console.error("OpenAI API error:", error);
    throw new Error("Failed to generate resume summary. Please try again later.");
  }
}
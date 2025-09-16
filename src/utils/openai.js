import OpenAI from "openai";

const client = new OpenAI({
  apiKey: import.meta.env.VITE_OPENAI_API_KEY,
  dangerouslyAllowBrowser: true, // frontend only
});

//    export async function generateResumePrompt(data) {
//      const prompt = `
//      Create a professional resume summary from this data:
//      Name: ${data.name}
//      Education: ${data.education}
//      Internships: ${JSON.stringify(data.internships)}
//      Projects: ${JSON.stringify(data.projects)}

//      Output in resume format with professional language.
//      Also list extracted skill tags separately.
//      `;

//      const response = await client.chat.completions.create({
//        model: "gpt-3.5-turbo",
//        messages: [{ role: "user", content: prompt }],
//      });

//      return response.choices[0].message.content;
//    }
   
export async function generateResumePrompt(data) {
  const prompt = `
Create a professional resume summary from this data:
Name: ${data.name}
Education: ${data.education}
Internships: ${JSON.stringify(data.internships)}
Projects: ${JSON.stringify(data.projects)}
Output in resume format with professional language.
Also list extracted skill tags separately.
`;
  const response = await client.chat.completions.create({
    model: "gpt-3.5-turbo",
    messages: [{ role: "user", content: prompt }],
  });
  return response.choices[0].message.content;
}

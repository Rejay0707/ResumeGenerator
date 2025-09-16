// src/containers/ResumeAIContainer.jsx
import { useState } from "react";
import { generateResumePrompt } from "../utils/openai";

export default function useResumeAI() {
  const [loading, setLoading] = useState(false);
  const [resume, setResume] = useState("");

  const handleGenerateResume = async (formData) => {
    setLoading(true);
    try {
      const prompt = `
      Generate a professional resume in plain text for the following student details:

      Name: ${formData.name}
      Education: ${formData.education}
      Projects: ${formData.projects
        .map((p) => `${p.title}: ${p.description}`)
        .join("\n")}
      Internships: ${formData.internships
        .map((i) => `${i.company} - ${i.role}: ${i.description}`)
        .join("\n")}

      Format it nicely with sections: Education, Projects, Internships, Skills.
      Add relevant skill tags based on projects and internships.
      `;

      const result = await generateResumePrompt(prompt); // call OpenAI
      setResume(result);
    } catch (error) {
      console.error("Error generating resume:", error);
      setResume("Failed to generate resume. Try again.");
    } finally {
      setLoading(false);
    }
  };

  return { resume, loading, handleGenerateResume };
}

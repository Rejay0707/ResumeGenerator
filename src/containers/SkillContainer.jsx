import React, { useEffect, useState } from "react";
import {
  getUserSkills,
  addSkill,
  deleteSkill,
  getAISkillSuggestions,
} from "../services/skillApi";

import SkillForm from "../components/skills/SkillForm";
import SkillList from "../components/skills/SkillList";
import AISkillSuggestions from "../components/skills/AISkillSuggestions";
import { Box, Typography } from "@mui/material";

export default function SkillContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [skills, setSkills] = useState([]);
  const [aiSkills, setAiSkills] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({ name: "", level: "Beginner" });

  useEffect(() => {
    if (!userId) return;
    fetchSkills();
    fetchAISkills();
  }, [userId]);

  const fetchSkills = async () => {
    const res = await getUserSkills(userId);
    const normalized = res.data.map((item) => ({
      id: item.id,
      name: item.skill,
      level: item.level,
    }));
    setSkills(normalized);
  };

  const fetchAISkills = async () => {
    setLoadingAI(true);
    const res = await getAISkillSuggestions(userId);
    const normalized = res.data.skills.map((item) => ({
      name: item.skill,
      level: "Beginner",
    }));
    setAiSkills(normalized);
    setLoadingAI(false);
  };

  const handleAddSkill = async (skill) => {
    const payload = {
      skill: skill.name,
      level: skill.level,
      user_id: userId,
    };
    await addSkill(payload);
    fetchSkills();
    fetchAISkills();  // Refresh to remove added skill
  };

  const handleDeleteSkill = async (id) => {
    await deleteSkill(id);
    fetchSkills();
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2} color="black">
        Skills Tracker
      </Typography>

      {/* Added key to force re-render when formData changes */}
      <SkillForm
        key={JSON.stringify(formData)}  // Forces re-render on formData update
        formData={formData}
        setFormData={setFormData}
        onAdd={handleAddSkill}
      />

      <SkillList skills={skills} onDelete={handleDeleteSkill} />

      <AISkillSuggestions
        skills={aiSkills}
        loading={loadingAI}
        onSelect={(item) => {
          console.log("AI suggestion selected:", item);  // Debugging
          setFormData({ name: item.name, level: "Beginner" });  // Prefill name, set default level
        }}
      />
    </Box>
  );
}
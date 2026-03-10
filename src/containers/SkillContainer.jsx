

import React, { useEffect, useState } from "react";
import {
  getUserSkills,
  addSkill,
  deleteSkill,
   // You'll need to add this to your API
  getAISkillSuggestions,
} from "../services/skillApi";

import SkillForm from "../components/skills/SkillForm";
import SkillList from "../components/skills/SkillList";
import AISkillSuggestions from "../components/skills/AISkillSuggestions";
import TopSkills from "../components/skills/TopSkills";
import SkillsBySource from "../components/skills/SkillsBySource";
import { Box, Typography, Divider } from "@mui/material";

export default function SkillContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [skills, setSkills] = useState([]);
  const [aiSkills, setAiSkills] = useState([]);
  const [loadingAI, setLoadingAI] = useState(false);
  const [formData, setFormData] = useState({ 
    id: null, 
    name: "", 
    level: "Beginner" 
  });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!userId) return;
    fetchSkills();
    fetchAISkills();
  }, [userId]);

  const fetchSkills = async () => {
    const res = await getUserSkills(userId);
    // Keep original field names to match API response
    setSkills(res.data);
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
    try {
      const payload = {
        skill: skill.name,
        level: skill.level,
        user_id: userId,
      };
      await addSkill(payload);
      fetchSkills();
      fetchAISkills();
      
      setTimeout(() => {
        window.dispatchEvent(new Event("notificationCountUpdated"));
      }, 1500);
    } catch (error) {
      console.error("Failed to add skill:", error);
    }
  };

  // const handleUpdateSkill = async (skill) => {
  //   try {
  //     const payload = {
  //       skill: skill.name,
  //       level: skill.level,
  //     };
  //     await updateSkill(skill.id, payload); // Backend API needed
  //     fetchSkills();
  //     setFormData({ id: null, name: "", level: "Beginner" });
  //     setIsEditing(false);
  //   } catch (error) {
  //     console.error("Failed to update skill:", error);
  //   }
  // };

  const handleDeleteSkill = async (id) => {
    await deleteSkill(id);
    fetchSkills();
  };

  const handleEditClick = (skill) => {
    setFormData({ 
      id: skill.id, 
      name: skill.skill, 
      level: skill.level 
    });
    setIsEditing(true);
  };

  const handleCancelEdit = () => {
    setFormData({ id: null, name: "", level: "Beginner" });
    setIsEditing(false);
  };

  return (
    <Box>
      <Typography variant="h5" fontWeight="bold" mb={2} color="black">
        Skills Tracker
      </Typography>

      {/* Visual Tracking: Top Skills */}
      <TopSkills skills={skills} />

      {/* Add/Edit Form */}
      <SkillForm
        formData={formData}
        setFormData={setFormData}
        onAdd={handleAddSkill}
        // onUpdate={handleUpdateSkill}
        isEditing={isEditing}
        onCancel={handleCancelEdit}
      />

      {/* Visual Tracking: Skills by Source */}
      <SkillsBySource skills={skills} />

      <Divider sx={{ my: 3 }} />

      {/* All Skills List with Source Indicators */}
      <SkillList 
        skills={skills} 
        onDelete={handleDeleteSkill} 
        onEdit={handleEditClick}
      />

      <AISkillSuggestions
        skills={aiSkills}
        loading={loadingAI}
        onSelect={(item) => {
          setFormData({ name: item.name, level: "Beginner" });
        }}
      />
    </Box>
  );
}

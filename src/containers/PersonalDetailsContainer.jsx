import { useEffect, useState } from "react";
import { getPersonalDetails, savePersonalDetails } from "../services/personalDetailsApi";
import PersonalDetailsForm from "../components/PersonalDetailsForm";

export default function PersonalDetailsContainer() {
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;

  const [form, setForm] = useState({
    full_name: "",
    email: "",
    phone: "",
    github_url: "",
    linkedin_url: "",
  });

  useEffect(() => {
    if (!userId) return;
    getPersonalDetails(userId).then((res) => {
      if (res.data) setForm(res.data);
    });
  }, [userId]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async () => {
    await savePersonalDetails({ ...form, user_id: userId });
    alert("Personal details saved");
  };

  return (
    <PersonalDetailsForm
      form={form}
      onChange={handleChange}
      onSubmit={handleSubmit}
    />
  );
}

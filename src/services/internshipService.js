import axios from "axios";

const BASE_URL = "https://www.scratchprod.in/resume-generator-backend/api";

// 1. Get internships
export const getInternships = () => {
  return axios.get(`${BASE_URL}/new-internships`);
};

// 2. Apply internship
// 2. Apply internship
export const applyInternship = async (internshipId, studentId) => {
  try {
    const response = await axios.post(
      `${BASE_URL}/new-internships/${internshipId}/apply`,
      {
        student_id: studentId, // backend expects this key
      }
    );

    return response.data; // return clean data
  } catch (error) {
    console.error("Apply Internship Error:", error.response?.data || error);
    throw error; // let container handle UI errors
  }
};

// 3. Student applications
export const getMyApplications = (application_id, studentId) => {
  return axios.get(
    `${BASE_URL}/my-internship-applications/${application_id}/letter`,
    {
      params: { student_id: studentId },
    }
  );
};

// 4. Admin pending apps
export const getPendingApplications = () => {
  return axios.get(
    `${BASE_URL}/admin/internship-applications?status=pending`
  );
};

// 5. Approve / Reject
export const updateApplicationStatus = (id, status) => {
  return axios.patch(
    `${BASE_URL}/admin/internship-applications/${id}/status`,
    { status }
  );
};

// 6. Upload letter
export const uploadLetter = (id, file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios.post(
    `${BASE_URL}/admin/internship-applications/${id}/upload-letter`,
    formData
  );
};

// 7. Download letter
export const downloadLetter = (id, studentId) => {
  return `${BASE_URL}/download/letter/${id}?student_id=${studentId}`;
};
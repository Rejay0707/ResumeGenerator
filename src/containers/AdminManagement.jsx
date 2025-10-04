import { useState, useEffect } from "react";

// Mock API delay and data
const mockApiDelay = (ms) => new Promise((res) => setTimeout(res, ms));

const initialData = {
  parents: [
    {
      id: 1,
      name: "Parent One",
      email: "parent1@example.com",
      phone: "1234567890",
      studentLinked: "John Doe (1001)",
      address: "123 Maple Street, Springfield",
    },
    {
      id: 2,
      name: "Parent Two",
      email: "parent2@example.com",
      phone: "0987654321",
      studentLinked: "Jane Smith (1002)",
      address: "456 Oak Avenue, Springfield",
    },
    {
      id: 3,
      name: "Parent Three",
      email: "parent3@example.com",
      phone: "5551234567",
      studentLinked: "Emily Davis (1004)",
      address: "789 Pine Road, Springfield",
    },
  ],
  teachers: [
    {
      id: 1,
      name: "Teacher One",
      email: "teacher1@example.com",
      subjects: "Mathematics, Physics",
      classAssigned: "9A",
      phone: "1112223333",
      joiningDate: "2015-08-01",
    },
    {
      id: 2,
      name: "Teacher Two",
      email: "teacher2@example.com",
      subjects: "English Literature",
      classAssigned: "10B",
      phone: "4445556666",
      joiningDate: "2017-01-15",
    },
    {
      id: 3,
      name: "Teacher Three",
      email: "teacher3@example.com",
      subjects: "Biology, Chemistry",
      classAssigned: "8C",
      phone: "7778889999",
      joiningDate: "2019-09-10",
    },
  ],
  students: [
    {
      id: 1,
      admissionNo: "1001",
      name: "John Doe",
      fatherName: "Robert Doe",
      dob: "2012-05-15",
      classSec: "5A",
      gender: "Male",
      phone: "9876543210",
      email: "john.doe@school.edu",
    },
    {
      id: 2,
      admissionNo: "1002",
      name: "Jane Smith",
      fatherName: "Michael Smith",
      dob: "2011-08-22",
      classSec: "6B",
      gender: "Female",
      phone: "9876543211",
      email: "jane.smith@example.com",
    },
    {
      id: 3,
      admissionNo: "1003",
      name: "Alex Johnson (Long Name Test)",
      fatherName: "David Johnson",
      dob: "2013-03-10",
      classSec: "4C",
      gender: "Male",
      phone: "9876543212",
      email: "alex.johnson.longname@school.edu",
    },
    {
      id: 4,
      admissionNo: "1004",
      name: "Emily Davis",
      fatherName: "James Davis",
      dob: "2010-11-30",
      classSec: "7A",
      gender: "Female",
      phone: "9876543213",
      email: "emily.davis@academy.org",
    },
    {
      id: 5,
      admissionNo: "1005",
      name: "Michael Brown",
      fatherName: "William Brown",
      dob: "2014-07-18",
      classSec: "3B",
      gender: "Male",
      phone: "9876543214",
      email: "michael.brown@learningschool.com",
    },
    {
      id: 6,
      admissionNo: "1006",
      name: "Sophia Wilson (With Middle Initial)",
      fatherName: "Thomas Wilson Jr.",
      dob: "2012-12-05",
      classSec: "5C",
      gender: "Female",
      phone: "9876543215",
      email: "sophia.wilson.m@education.net",
    },
    {
      id: 7,
      admissionNo: "1007",
      name: "Ryan Garcia",
      fatherName: "Carlos Garcia",
      dob: "2011-02-14",
      classSec: "6A",
      gender: "Male",
      phone: "9876543216",
      email: "ryan.garcia@students.org",
    },
    {
      id: 8,
      admissionNo: "1008",
      name: "Olivia Martinez",
      fatherName: "Luis Martinez",
      dob: "2013-09-25",
      classSec: "4B",
      gender: "Female",
      phone: "9876543217",
      email: "olivia.martinez.longemail@verylongdomain.edu",
    },
    {
      id: 9,
      admissionNo: "1009",
      name: "Liam Anderson",
      fatherName: "Eric Anderson",
      dob: "2015-04-08",
      classSec: "2C",
      gender: "Male",
      phone: "9876543218",
      email: "liam.anderson@primaryschool.com",
    },
    {
      id: 10,
      admissionNo: "1010",
      name: "Ava Taylor (Test for Wrapping)",
      fatherName: "Christopher Taylor",
      dob: "2012-01-20",
      classSec: "5A",
      gender: "Female",
      phone: "9876543219",
      email: "ava.taylor.testwrapping@school.example",
    },
    {
      id: 11,
      admissionNo: "1011",
      name: "Noah White",
      fatherName: "Benjamin White",
      dob: "2014-06-12",
      classSec: "3A",
      gender: "Male",
      phone: "9876543220",
      email: "noah.white@basic.edu",
    },
  ],
  recruiters: [
    {
      id: 1,
      companyName: "Tech Solutions Inc.",
      email: "contact@techsolutions.com",
      contactPerson: "Alice Johnson",
      phone: "123-456-7890",
      industryType: "Information Technology",
      jobRoles: "Software Engineer, QA Analyst",
    },
    {
      id: 2,
      companyName: "Finance Corp.",
      email: "hr@financecorp.com",
      contactPerson: "Bob Smith",
      phone: "987-654-3210",
      industryType: "Finance",
      jobRoles: "Financial Analyst, Accountant",
    },
    {
      id: 3,
      companyName: "HealthCare Plus",
      email: "recruitment@healthcareplus.org",
      contactPerson: "Carol Lee",
      phone: "555-123-4567",
      industryType: "Healthcare",
      jobRoles: "Nurse, Medical Assistant",
    },
  ],
};


export default function useAdminManagement(entityType) {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Simulate fetching data
  useEffect(() => {
    setLoading(true);
    setError(null);
    mockApiDelay(500)
      .then(() => {
        setItems(initialData[entityType] || []);
      })
      .catch(() => setError("Failed to load data"))
      .finally(() => setLoading(false));
  }, [entityType]);

  const addItem = async (item) => {
    setLoading(true);
    setError(null);
    try {
      await mockApiDelay(300);
      setItems((prev) => [...prev, { ...item, id: Date.now() }]);
    } catch {
      setError("Failed to add item");
    } finally {
      setLoading(false);
    }
  };

  const updateItem = async (id, updatedItem) => {
    setLoading(true);
    setError(null);
    try {
      await mockApiDelay(300);
      setItems((prev) =>
        prev.map((item) =>
          item.id === id ? { ...item, ...updatedItem } : item
        )
      );
    } catch {
      setError("Failed to update item");
    } finally {
      setLoading(false);
    }
  };

  const deleteItem = async (id) => {
    setLoading(true);
    setError(null);
    try {
      await mockApiDelay(300);
      setItems((prev) => prev.filter((item) => item.id !== id));
    } catch {
      setError("Failed to delete item");
    } finally {
      setLoading(false);
    }
  };

  return { items, loading, error, addItem, updateItem, deleteItem };
}

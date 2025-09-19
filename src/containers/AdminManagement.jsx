import { useState, useEffect } from "react";

// Mock API delay and data
const mockApiDelay = (ms) => new Promise((res) => setTimeout(res, ms));

const initialData = {
  parents: [
    { id: 1, name: "Parent One", email: "parent1@example.com" },
    { id: 2, name: "Parent Two", email: "parent2@example.com" },
  ],
  teachers: [{ id: 1, name: "Teacher One", email: "teacher1@example.com" }],
  students: [{ id: 1, name: "Student One", email: "student1@example.com" }],
  recruiters: [
    { id: 1, name: "Recruiter One", email: "recruiter1@example.com" },
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

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchEntities, addEntity, updateEntity, deleteEntity } from "../features/adminSlice";

export default function useAdminManagement(entityType) {
  const dispatch = useDispatch();
  const { data, loading, error } = useSelector((state) => state.admin);

  useEffect(() => {
    if (entityType) {
      dispatch(fetchEntities(entityType));
    }
  }, [dispatch, entityType]);

  const addItem = (item) => dispatch(addEntity({ entityType, data: item }));
  const updateItem = (id, item) => dispatch(updateEntity({ entityType, id, data: item }));
  const deleteItem = (id) => dispatch(deleteEntity({ entityType, id }));

  return {
    items: data[entityType] || [],
    loading,
    error,
    addItem,
    updateItem,
    deleteItem,
  };
}


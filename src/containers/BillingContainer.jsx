import { useEffect, useState } from "react";
import {
  getPlans,
  createOrder,
  verifyPayment,
} from "../services/billingService";

export default function useBilling() {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    setLoading(true);
    try {
      const data = await getPlans();
      setPlans(data);
    } catch (err) {
      console.error("Failed to fetch plans", err);
    }
    setLoading(false);
  };

  const handleCreateOrder = async (planId, billingCycle) => {
    try {
      const order = await createOrder(planId, billingCycle);
      return order;
    } catch (err) {
      console.error(err);
    }
  };

  const handleVerifyPayment = async (planId, data) => {
    try {
      const res = await verifyPayment(planId, data);
      console.log(res);
      return res;
    } catch (err) {
      console.error(err);
    }
  };

  return {
    plans,
    loading,
    handleCreateOrder,
    handleVerifyPayment,
  };
}

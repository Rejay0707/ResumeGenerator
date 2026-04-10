import api from "./api";

// Get all plans
export const getPlans = async () => {
  const res = await api.get("/api/plans");
  return res.data.plans;
};

// Create payment order
export const createOrder = async (planId, billingCycle) => {
  const res = await api.post("/api/payment/create-order", {
    plan_id: planId,
    billing_cycle: billingCycle,
  });

  return res.data;
};

// Verify payment
export const verifyPayment = async (paymentData) => {
  const res = await api.post("/api/payment/verify", paymentData);
  console.log(res)
  return res.data;
};

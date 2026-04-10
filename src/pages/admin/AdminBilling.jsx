import React from "react";
import { Grid, Typography, Container } from "@mui/material";
import PlanCard from "../../components/PlanCard";
import useBilling from "../../containers/BillingContainer";
import { useSelector } from "react-redux";

export default function AdminBilling() {
  const { plans, handleCreateOrder, handleVerifyPayment } = useBilling();

  const { user } = useSelector((state) => state.auth);

  const handleSubscribe = async (planId) => {
    const order = await handleCreateOrder(planId, "monthly");

    if (!order) return;

    const options = {
      key: "rzp_test_5BmWVmaK6Ocgth",
      amount: order.amount,
      currency: "INR",
      name: "Subscription",
      order_id: order.order_id,

      handler: async function (response) {

  const verifyPayload = {
    user_id: user.id,
    plan_id: planId,
    billing_cycle: "monthly",
    razorpay_payment_id: response.razorpay_payment_id,
    razorpay_order_id: response.razorpay_order_id,
    razorpay_signature: response.razorpay_signature
  };
  console.log(verifyPayload)

  const res = await handleVerifyPayment(verifyPayload);

  console.log("Verification response:", res);
}
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  };

  return (
    <Container>
      <Typography variant="h4" fontWeight="bold" mb={4}>
        Billing & Subscription
      </Typography>

      <Grid container spacing={3}>
        {plans.map((plan) => (
          <Grid item xs={12} md={4} key={plan.id}>
            <PlanCard plan={plan} onSubscribe={handleSubscribe} />
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

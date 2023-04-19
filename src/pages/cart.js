import React from "react";
import Meta from "./../components/Meta";
import DashboardSection from "./../components/DashboardSection";
import { requireAuth } from "./../util/auth";
import DashboardItems from "../components/DashboardItems";
import TestForm from "../components/TestForm";

function CartPage(props) {
  console.log("CartPage props", props);
  return (
    <>
      <Meta title="Dashboard" />
      <TestForm />
      <DashboardItems />
    </>
  );
}

export default requireAuth(CartPage);

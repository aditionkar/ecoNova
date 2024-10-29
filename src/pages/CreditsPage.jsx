import React from "react";
import CarbonCredits from "../components/CarbonCredits";
import Goal from "../components/Goal";

function CreditsPage() {
  return (
    <>
      <div className="bg-green-50 ">
        <CarbonCredits />
        <Goal />
      </div>
    </>
  );
}

export default CreditsPage;

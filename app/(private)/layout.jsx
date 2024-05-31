import React from "react";
import Header from "../components/header";
import { UserButton } from "@clerk/nextjs";

function layout({ children }) {
  return (
    <div>
      <Header></Header>
      <div className="p-4">
        <UserButton></UserButton>
      </div>
      {children}
    </div>
  );
}

export default layout;

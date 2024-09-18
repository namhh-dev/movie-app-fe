import React from "react";
import Navbar from "../../navbar/Navbar";

const Layout = ({ children }) => {
  return (
    <div>
      <Navbar />
        <div className="min-h-[695px] h-full bg-[rgb(16,20,44)]">
          <div className="pt-28 px-2">{children}</div>
        </div>
    </div>
  );
};

export default Layout;

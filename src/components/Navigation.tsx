import React, { ReactElement } from "react";
import MemorizedSideBar from "./Sidebar";
import MemorizedMainNav from "./MainNav";

type Props = {
    children:ReactElement | ReactElement[];
};

const Navigations = ({ children } : Props) => {
  return (
    <div className="flex w-full h-[100vh]">
      <MemorizedMainNav />
      <div className="w-full h-full">
        <MemorizedSideBar />
        <div className=" pl-0 lg:pl-[240px] w-full h-auto bg-[#121212]">
          {children}
        </div>
      </div>
    </div>
  );
};

const MemorizedNavigations = React.memo(Navigations);

export default MemorizedNavigations;

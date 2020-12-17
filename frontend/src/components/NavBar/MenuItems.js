import React from "react";
import * as FaIcons from "react-icons/fa";

export const sidebarData = [
  {
    title: "Home",
    path: "/",
    icon: <FaIcons.FaHome />,
    cName: "nav-text",
  },
  {
    title: "Dashboard",
    path: "/dashboard",
    icon: <FaIcons.FaDashcube />,
    cName: "nav-text",
  },
  {
    title: "Locations",
    path: "/locations",
    icon: <FaIcons.FaLocationArrow />,
    cName: "nav-text",
  },
];

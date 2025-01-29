import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Dashboard",
    icon: IconLayoutDashboard,
    href: "/admin",
  },
  {
    navlabel: true,
    subheader: "Utilities",
  },
  {
    id: uniqueId(),
    title: "teams",
    icon: IconTypography,
    href: "/utilities/studentslist",
  },
  {
    id: uniqueId(),
    title: "mark",
    icon: IconCopy,
    href: "/utilities/marklist",
  },
  {
    navlabel: true,
    subheader: "Auth",
  },
  {
    id: uniqueId(),
    title: "Login",
    icon: IconLogin,
    href: "/signin",
  },
  
  {
    navlabel: true,
    subheader: "Extra",
  },
  // {
  //   id: uniqueId(),
  //   title: "Icons",
  //   icon: IconMoodHappy,
  //   href: "/icons",
  // },
  {
    id: uniqueId(),
    title: "updates",
    icon: IconAperture,
    href: "/updates",
  },
  {
    id: uniqueId(),
    title: "time",
    icon: IconAperture,
    href: "/time",
  },
];

export default Menuitems;

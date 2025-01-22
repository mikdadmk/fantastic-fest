import {
  IconAperture,
  IconCopy,
  IconLayoutDashboard,
  IconLogin,
  IconMoodHappy,
  IconTypography,
  IconUserPlus,
  IconPhoto,
  IconUser,
  IconUserCheck 
} from "@tabler/icons-react";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    navlabel: true,
    subheader: "Home",
  },

  {
    id: uniqueId(),
    title: "Home",
    icon: IconLayoutDashboard,
    href: "/",
  },
  {
    navlabel: true,
    subheader: "Gallery",
  },
  {
    id: uniqueId(),
    title: "gallery",
    icon:  IconPhoto,
    href: "/gallery",
  },
  {
    id: uniqueId(),
    title: "Top Performers",
    icon: IconUser,
    href: "/top-performers",
  },
  // {
  //   navlabel: true,
  //   subheader: "Auth",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Login",
  //   icon: IconLogin,
  //   href: "/authentication/login",
  // },
  // {
  //   id: uniqueId(),
  //   title: "Register",
  //   icon: IconUserPlus,
  //   href: "/authentication/register",
  // },
  {
    navlabel: true,
    subheader: "Extra",
  },
  {
    id: uniqueId(),
    title: "profilecheck",
    icon: IconUserCheck ,
    href: "/profilecheck",
  },
  {
    id: uniqueId(),
    title: "programmes",
    icon: IconAperture,
    href: "/programmes",
  },
  // {
  //   id: uniqueId(),
  //   title: "time",
  //   icon: IconAperture,
  //   href: "/time",
  // },
];

export default Menuitems;

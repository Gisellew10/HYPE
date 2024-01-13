export const loginDropdown = [
  {
    id: 1,
    title: "Student Login",
    path: "./student-login",
    cName: "homeSubmenu-item",
  },
  {
    id: 2,
    title: "Start up Login",
    path: "./startup-login",
    cName: "homeSubmenu-item",
  },
];

export const signUpDropdown = [
  {
    id: 1,
    title: "Student Sign Up",
    path: "./student-signup",
    cName: "homeSubmenu-item",
  },
  {
    id: 2,
    title: "Start up Sign Up",
    path: "./startup-signup",
    cName: "homeSubmenu-item",
  },
];

export const navItems = [
    {
      id: 1,
      title: "Home",
      path: "./",
      cName: "homeNav-item",
    },
    {
      id: 2,
      title: "Login",
      drop: loginDropdown,
      cName: "homeNav-dropitem",
    },
    {
      id: 3,
      title: "Sign Up",
      drop: signUpDropdown,
      cName: "homeNav-dropitem",
    },
  ];
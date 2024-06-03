import React from "react";
import { NavLink } from "react-router-dom";
import { useUserAuth } from "../context/AuthContext";

const NavLinks = () => {
  let { user } = useUserAuth();
  const links = [
    {
      label: "Naslovna",
      href: "/",
    },

    user && {
      label: "Postavi Blog",
      href: "/blogs",
    },

    !user && {
      label: "Prijavi se",
      href: "/signin",
    },

    !user && {
      label: "Kreiraj račun",
      href: "/signup",
    },

    user && {
      label: "Odjavi se",
      href: "/signout",
    },
  ]
    .filter((link) => link)
    .map(({ label, href }) => {
      return (
        <NavLink
          to={href}
          key={href}
          className="font-bold dark:text-white hover:text-blue-600"
        >
          <li>{label}</li>
        </NavLink>
      );
    });

  return (
    <ul className="max-w-2xl mx-auto flex justify-evenly py-4">{links}</ul>
  );
};

export default NavLinks;

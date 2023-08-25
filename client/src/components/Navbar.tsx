import React, { useState, useEffect } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Person, DarkMode, LightMode } from "@mui/icons-material";
import { UseAppSelector } from "../store";
import useTheme from "../hooks/useTheme";

function Navbar() {
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const [fullName, setFullName] = useState<string | null>(null);
  const open = Boolean(menu);
  const { user } = UseAppSelector((state) => state.user);

  const { theme, switchTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };

  useEffect(() => {
    if (user) {
      const { firstName, lastName } = user;
      setFullName(firstName + lastName);
    }
  }, [user]);
  return (
    <nav className="container py-5 px-5 ">
      <div className="flex justify-between">
        <h1 className="text-green-500 dark:text-green-400 text-2xl">
          Green Social
        </h1>
        <div>
          <span
            onClick={switchTheme}
            className="text-gray-400 mx-2 transition-all duration-200 hover:text-black dark:hover:text-white"
          >
            {theme === "light" ? <LightMode /> : <DarkMode />}
          </span>
          <Button
            color="success"
            aria-controls={open ? "basic-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
            onClick={handleClick}
          >
            <Person />
          </Button>
          <Menu
            anchorEl={menu}
            open={open}
            onClose={handleClose}
            MenuListProps={{
              "aria-labelledby": "basic-button",
            }}
          >
            <MenuItem>{fullName}</MenuItem>
            <MenuItem className="cursor-pointer" onClick={handleClose}>
              Profile Page
            </MenuItem>
          </Menu>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;

import React, { useState,  } from "react";
import { Button, Menu, MenuItem } from "@mui/material";
import { Person, DarkMode, LightMode } from "@mui/icons-material";
import useTheme from "../hooks/useTheme";
import { UseAppDispatch } from "../store";
import { Logout } from "../store/authSlice";
import { useNavigate } from "react-router-dom";

function Navbar() {
  const [menu, setMenu] = useState<null | HTMLElement>(null);
  const open = Boolean(menu);
  const dispatch = UseAppDispatch()
  const navigate = useNavigate();
  

  const { theme, switchTheme } = useTheme();

  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    setMenu(e.currentTarget);
  };

  const handleClose = () => {
    setMenu(null);
  };
   const handelLogout = ( ) => {
    dispatch(Logout)
    navigate('/')
   }
 
  return (
    <nav className="container py-5  ">
      <div className="flex justify-between">
        <h1 className="text-green-500 dark:text-green-400 text-2xl">
          Green Social
        </h1>
        <div>
          <Button>
            <span
              onClick={switchTheme}
              className="text-gray-400 mx-2 cursor-pointer transition-all duration-200 hover:text-black dark:hover:text-white"
            >
              {theme === "light" ? <LightMode /> : <DarkMode />}
            </span>
          </Button>
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
            <MenuItem onClick={handelLogout}>Log out</MenuItem>
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

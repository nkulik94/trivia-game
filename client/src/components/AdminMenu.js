import React, { useState } from "react";
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Drawer from '@mui/material/Drawer';
import AdminMenuList from "./AdminMenuList";

function AdminMenu() {
    const [showMenu, setMenu] = useState(false)

    return (
        <>
        <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
            onClick={() => setMenu(!showMenu)}
          >
            <MenuIcon />
          </IconButton>
          <Drawer
          open={showMenu}
          onClose={() => setMenu(false)}
          >
            <AdminMenuList onClickList={setMenu} />
          </Drawer>
          </>
    )
}

export default AdminMenu
import { AppBar, Toolbar, Typography  } from "@mui/material";
import RegisterDialog from './RegisterDialog';
import AddPermission from "./AddPermission";
import { useState } from "react";

const NabVar = () => {
  const [count, setCount] = useState(0);
  const handleSubmit = () => {
    setCount(count + 1);
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          Listado de permisos
        </Typography>
        {/* <RegisterDialog title="Nuevo permiso" onSubmit={handleSubmit}>
          <AddPermission />
        </RegisterDialog> */}
      </Toolbar>
    </AppBar>
  )
}

export default NabVar;
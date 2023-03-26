import React, { useState, useEffect } from "react";
import { getPermissions, addPermission, editPermission } from "../service/api";
import { format } from "date-fns";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Button,
  Modal,
  TextField,
  Grid,
  Paper,
} from "@mui/material";
// import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'
import '../App.css';

const PermissionList = () => {
  // Hooks
  const [permissions, setPermissions] = useState([]);
  const [openCreate, setOpenCreate] = useState(false);
  const [openEdit, setOpenEdit] = useState(false);
  const [permissionToEdit, setPermissionToEdit] = useState(null);


  // Get data
  const getData = async () => {
    let response = await getPermissions();
    setPermissions(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Create permission
  const addPermissionRequest = async (data) => {
    await addPermission(data);
    setOpenCreate(false);
    getData();
  };

  // Edit permission
  const editPermissionRequest = async (data) => {
    await editPermission(data);
    setOpenEdit(false);
    setPermissionToEdit(null);
    getData();
  };

  // Open the edit form
  const handleEditClick = (permission) => {
    setPermissionToEdit(permission);
    setOpenEdit(true);
  };

  return (
    <div>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>ID</TableCell>
            <TableCell>NOMBRE EMPLEADO</TableCell>
            <TableCell>APELLIDO EMPLEADO</TableCell>
            <TableCell>TIPO PERMISO</TableCell>
            <TableCell>FECHA PERMISO</TableCell>
            <TableCell>
              <Button variant="outlined" onClick={() => setOpenCreate(true)}>
                NUEVO
              </Button>
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {permissions.map((permission, index) => (
            <TableRow key={index}>
              <TableCell>{permission.id}</TableCell>
              <TableCell>{permission.nombreEmpleado}</TableCell>
              <TableCell>{permission.apellidoEmpleado}</TableCell>
              <TableCell>{permission.tipoPermiso.descripcion}</TableCell>
              <TableCell>
                {format(
                  new Date(permission.fechaPermiso),
                  "dd/MM/yyyy hh:mm:ss"
                )}
              </TableCell>
              <TableCell>
                 <Button onClick={()=> handleEditClick(permission)}>
                  EDITAR
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Modal open={openCreate} onClose={() => setOpenCreate(false)}>
        <CreatePermission onCreate={addPermissionRequest} />
      </Modal>
      {permissionToEdit && (
        <Modal open={openEdit} onClose={() => setOpenEdit(false)}>
          <EditPermission
            permission={permissionToEdit}
            onEdit={editPermissionRequest}
          />
        </Modal>
      )}
    </div>
  );
};

const CreatePermission = React.forwardRef(({ onCreate }, ref) => {
  const paperStyle = { padding: '30px 15px 40px', width: 250, margin: '15px auto', }

  const [data, setData] = useState({
    nombreEmpleado: "",
    apellidoEmpleado: "",
    permissionType: "",
  });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onCreate(data);
  };

  // Validation form
  const validationSchema = Yup.object().shape({
    nombreEmpleado: Yup.string().min(3, "Nombre demasiado corto").required("Required"),
    apellidoEmpleado: Yup.string().min(3, "Nombre demasiado corto").required("Required"),
    permissionType: Yup.string().required("Required"),
  }) 

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre empleado"
            name="nombreEmpleado"
            value={data.nombreEmpleado}
            onChange={handleChange}
            required
          />
          <TextField
            className="input-form"
            label="Apellido empleado"
            name="apellidoEmpleado"
            value={data.apellidoEmpleado}
            onChange={handleChange}
            required
          />
          <TextField
            className="input-form"
            label="Tipo permiso"
            name="permissionType"
            value={data.permissionType}
            onChange={handleChange}
            required
          />
          <Button type="submit">Crear</Button>
        </form>
      </Paper>
    </Grid>
  );
});

const EditPermission = React.forwardRef(({ permission, onEdit }, ref) => {
  const paperStyle = { padding: '30px 15px 40px', width: 250, margin: '15px auto', }

  const [data, setData] = useState({
    id: permission.id,
    nombreEmpleado: permission.nombreEmpleado,
    apellidoEmpleado: permission.apellidoEmpleado,
    permissionType: permission.tipoPermiso.descripcion
  });

  const handleChange = (event) => {
    setData({
      ...data,
      [event.target.name]: event.target.value,
    });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    onEdit(data);
  };

  // Validation form
  const validationSchema = Yup.object().shape({
    nombreEmpleado: Yup.string().min(3, "Nombre demasiado corto").required("Required"),
    apellidoEmpleado: Yup.string().min(3, "Nombre demasiado corto").required("Required"),
    permissionType: Yup.string().required("Required"),
  }) 

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Nombre empleado"
            name="nombreEmpleado"
            value={data.nombreEmpleado}
            onChange={handleChange}
            required
          />
          <TextField
            className="input-form"
            label="Apellido empleado"
            name="apellidoEmpleado"
            value={data.apellidoEmpleado}
            onChange={handleChange}
            required
          />
          <TextField
            className="input-form"
            label="Tipo permiso"
            name="permissionType"
            value={data.permissionType}
            onChange={handleChange}
            required
          />
          <Button type="submit">Actualizar</Button>
        </form>
      </Paper>
    </Grid>
  );
});

export default PermissionList;

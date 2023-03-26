import { useEffect, useState } from "react";
import { getPermissions } from "../service/api";
import { format } from "date-fns";
import {
  Button,
  styled,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@mui/material";
import EditPermission from "./EditPermission";
import RegisterDialog from "./RegisterDialog";

const StyledTable = styled(Table)`
  width: 90%;
  margin: 50px 50px 0 50px;
`;

const AllPermissions = () => {
  // Hooks
  const [permissions, setPermissions] = useState([]);

  // Handle new permission, when submit from a modal
  const handleNewPermission = (newRecord) => {
    setPermissions([...permissions, newRecord]);
  };

  // Data to pass a modal to edit
  const [selectedPermission, setSelectedPermission] = useState(null);

  // Get data
  const getData = async () => {
    let response = await getPermissions();
    setPermissions(response.data);
  };

  useEffect(() => {
    getData();
  }, []);

  // Render datatable
  return (
    <StyledTable>
      <TableHead>
        <TableRow>
          <TableCell>Id</TableCell>
          <TableCell>Nombre empleado</TableCell>
          <TableCell>Apellido empleado</TableCell>
          <TableCell>Tipo permiso</TableCell>
          <TableCell>Fecha permiso</TableCell>
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
              {format(new Date(permission.fechaPermiso), "dd/MM/yyyy hh:mm:ss")}
            </TableCell>
            <TableCell>
              <Button
                onClick={() => setSelectedPermission(permission)}
                variant="outlined"
              >
                {" "}
                Editar
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </StyledTable>
  );
};

export default AllPermissions;

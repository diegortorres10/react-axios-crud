import axios from "axios";

const apiBaseUrl = 'https://localhost:7043/api';

export const addPermission = async (data) => {
  try {
    return await axios.post(apiBaseUrl+ '/Permissions/RequestPermision', data);
  } catch (error) {
    console.log('Error al crear permiso', error);
  }
}

export const getPermissions = async () => {
  try {
    return await axios.get(apiBaseUrl+ '/Permissions/GetPermisions');
  } catch (error) {
    console.log('Error al obtener permisos', error);
  }
}

export const editPermission = async (data) => {
  try {
    return await axios.put(apiBaseUrl+ '/Permissions/ModifyPermision?permissionId=' + data.id , data);
  } catch (error) {
    console.log('Error al crear permiso', error);
  }
}
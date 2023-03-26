import React from 'react'
import { useState } from 'react'
import { Grid, Paper, Button, TextField } from '@mui/material'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import * as Yup from 'yup'

import { addPermission } from '../service/api';

const AddPermission = ({ onSubmit, onClose }) => {
  const paperStyle = { padding: '0 15px 40px 15px', width: 250, }
  const btnStyle = { marginTop: 10 }

  // Initial values
  const initialValues = {
    nombreEmpleado: '',
    apellidoEmpleado: '',
    permissionType: ''
  }

  // Hooks
  // const [permission, setPermission] = useState(initialValues);
  // const [newRecord, setNewRecord] = useState(null);

  // set data every chnge in form
  // const onValueChange = (e) => {
  //   setPermission({ ...permission, [e.target.name]: e.target.value });
  // }

  const submit = async (values, props) => {
    await addPermission(values);
    // setNewRecord(values);
    onSubmit();
    onClose();
  }

  const validationSchema = Yup.object().shape({
    nombreEmpleado: Yup.string().min(3, "Nombre demasiado corto").required("Required"),
    apellidoEmpleado: Yup.string().min(3, "Nombre demasiado corto").required("Required"),
    permissionType: Yup.string().required("Required"),
  }) 

  return (
    <Grid>
      <Paper elevation={0} style={paperStyle}>
        <Formik initialValues={initialValues} validationSchema={validationSchema} onSubmit={submit}>
          {(props) => (
            <Form noValidate>
              <Field as={TextField} name='nombreEmpleado' label='Nombre empleado' fullWidth
                error={props.errors.nombreEmpleado && props.touched.nombreEmpleado}
                helperText={<ErrorMessage name='nombreEmpleado' />} required />

              <Field as={TextField} name='apellidoEmpleado' label='Apellido empleado' fullWidth
                error={props.errors.apellidoEmpleado && props.touched.apellidoEmpleado}
                helperText={<ErrorMessage name='apellidoEmpleado' />} required />

              <Field as={TextField} name="permissionType" label='Tipo de permiso' fullWidth
                error={props.errors.permissionType && props.touched.permissionType}
                helperText={<ErrorMessage name='permissionType' />} required />

              <Button type='submit' style={btnStyle} variant='contained' color='primary'>Guardar</Button>
            </Form>
          )}
        </Formik>
      </Paper>
    </Grid>
  )
}

export default AddPermission;
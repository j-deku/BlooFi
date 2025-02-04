// PasswordResetPage.js
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Grid, Typography, Button, TextField, Link } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { StoreContext } from '../../context/StoreContext';

const useStyles = makeStyles((theme) => ({
  root: {
    height: '100vh',
    backgroundImage: 'linear-gradient(to bottom, #3a3d41, #22252a)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  formContainer: {
    backgroundColor: '#fff',
    padding: theme.spacing(4),
    borderRadius: theme.spacing(1),
    boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',
  },
  form: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
  textField: {
    marginBottom: theme.spacing(2),
  },
  button: {
    marginBottom: theme.spacing(2),
  },
}));

const PasswordReset = () => {
  const classes = useStyles();
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const {url} = useContext(StoreContext);
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });
  
  const handleFormSubmit = async (data) => {
    try {
      const response = await axios.post(`${url}/api/user/password-reset`, data);
      setSuccess(true);
    } catch (error) {
      setError(error.response.data.message);
    }
  };

  return (
    <Grid container className={classes.root}>
      <Grid item xs={12} sm={6} md={4} lg={4} xl={2}>
        <div className={classes.formContainer}>
          <Typography variant="h4" component="h1" align="center" gutterBottom>
            Reset Password
          </Typography>
          <form className={classes.form} onSubmit={handleSubmit(handleFormSubmit)}>
            <TextField
              className={classes.textField}
              label="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                  message: "Invalid email address",
                },
              })}
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            {error && (
              <Typography variant="body1" align="center" gutterBottom style={{ color: 'red' }}>
                {error}
              </Typography>
            )}
            {success && (
              <Typography variant="body1" align="center" gutterBottom style={{ color: 'green' }}>
                Password reset link sent to your email!
              </Typography>
            )}
            <Button className={classes.button} variant="contained" color="primary" type="submit">
              Send Password Reset Link
            </Button>
          </form>
        </div>
      </Grid>
    </Grid>
  );
};

export default PasswordReset;
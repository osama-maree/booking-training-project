import React from "react";
import {
  Button,
  TextField,
  Typography,
  Container,
  Grid,
  Avatar,
} from "@mui/material";
import LockOpenIcon from "@mui/icons-material/LockOpen";
import useLogin from "../hook/useLogin";
import useStyles from "../styles";
import { Navigate, useLocation } from "react-router-dom";
import { useAppSelector } from "../../../store";
import { initialStateType } from "../../../features/authSlice/authSlice";
const LoginForm: React.FC = () => {
  const { userType } = useAppSelector<initialStateType>((state) => state.auth);
  const { formik, isPending } = useLogin();
  const location = useLocation();
  const classes = useStyles();

  return (
    <>
      {userType ? (
        <Navigate
          to={userType === "Admin" ? "admin" : "/"}
          replace
          state={{ from: location.pathname }}
        />
      ) : (
        <Container component={"div"} maxWidth="xs" className={classes.root}>
          <Avatar className={classes.avatar}>
            <LockOpenIcon />
          </Avatar>

          <form onSubmit={formik.handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h5" textAlign="center" marginTop={4}>
                  Login
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="email"
                  name="userName"
                  label="Email Address"
                  variant="outlined"
                  value={formik.values.userName}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.userName && Boolean(formik.errors.userName)
                  }
                  helperText={formik.touched.userName && formik.errors.userName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  fullWidth
                  id="password"
                  name="password"
                  label="Password"
                  type="password"
                  variant="outlined"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  error={
                    formik.touched.password && Boolean(formik.errors.password)
                  }
                  helperText={formik.touched.password && formik.errors.password}
                />
              </Grid>
              <Grid item xs={12} marginBottom={2}>
                <Button
                  type="submit"
                  disabled={isPending}
                  variant="contained"
                  color="primary"
                  fullWidth
                >
                  Login
                </Button>
              </Grid>
            </Grid>
          </form>
        </Container>
      )}
    </>
  );
};

export default LoginForm;

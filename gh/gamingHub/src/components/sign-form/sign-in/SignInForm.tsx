import React from "react";
import { Form, Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import {
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
  Alert,
} from "@mui/material";
import { LoginCredentials, getLoginEndpoint } from "../../../utils";
import { GhDataApi } from "../../../utils/axiosConfig";
import { setLogin } from "../../../store/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router";

export const SignInForm: React.FC = () => {
  const { palette } = useTheme();
  const [isError, setIsError] = useState(false);
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValuesLogin: LoginCredentials = {
    email: "",
    password: "",
  };

  const loginSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email required"),
    password: yup.string().required("Password required"),
  });

  const onSubmit = (values: LoginCredentials): void => {
    GhDataApi.post(getLoginEndpoint(), values)
      .then((response) => {
        dispatch(setLogin({ user: response.data }));
        navigate("/home");
      })
      .catch(() => setIsError(true));
  };

  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValuesLogin}
      validationSchema={loginSchema}
    >
      {({ values, errors, touched, handleBlur, handleChange }) => (
        <Form>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="Email"
              onBlur={handleBlur}
              value={values.email}
              onChange={handleChange}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4", color: "black" }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              value={values.password}
              onChange={handleChange}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {isError ? (
            <Alert severity="error">
              Wrong login credentials, please try again
            </Alert>
          ) : null}
          <Box>
            <Button
              fullWidth
              type="submit"
              sx={{
                m: "2rem 0",
                p: "1rem",
                backgroundColor: "rgb(69, 166, 243)",
                color: "white",
                "&:hover": { color: palette.primary.main },
              }}
            >
              Wyslij
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

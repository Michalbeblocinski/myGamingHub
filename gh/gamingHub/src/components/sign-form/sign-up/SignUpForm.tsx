import React from "react";
import { Formik } from "formik";
import * as yup from "yup";
import { useState } from "react";
import {
  Alert,
  Box,
  Button,
  TextField,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { RegisterCredentials } from "../../../utils/types/forms";
import { GhDataApi } from "../../../utils/axiosConfig";
import { getRegistrationEndpoint } from "../../../utils";
import { useDispatch } from "react-redux";
import { setLogin } from "../../../store/authSlice";
import { useNavigate } from "react-router";

export const SignUpForm: React.FC = () => {
  const { palette } = useTheme();
  const isNonMobile = useMediaQuery("(min-width:700px)");
  const [isError, setIsError] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const initialValuesRegister = {
    name: "",
    email: "",
    password: "",
  };

  const registerSchema = yup.object().shape({
    email: yup.string().email("invalid email").required("required"),
    password: yup.string().required("required"),
    name: yup.string().required("required"),
  });

  const onSubmit = (values: RegisterCredentials) => {
    GhDataApi.post(getRegistrationEndpoint(), values)
      .then((response) => {
        const values = {
          _id: response.data._id,
          name: response.data.name,
          email: response.data.email,
          friends: [],
          resetToken: response.data.resetToken,
          userPicturePath: response.data.userPicturePath,
        };
        dispatch(setLogin({ user: values }));
        navigate("/home");
      })
      .catch(() => setIsError(true));
  };
  return (
    <Formik
      onSubmit={onSubmit}
      initialValues={initialValuesRegister}
      validationSchema={registerSchema}
    >
      {({
        values,
        errors,
        touched,
        handleBlur,
        handleChange,
        handleSubmit,
      }) => (
        <form onSubmit={handleSubmit}>
          <Box
            display="grid"
            gap="30px"
            gridTemplateColumns="repeat(4, minmax(0, 1fr))"
            sx={{
              "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
            }}
          >
            <TextField
              label="First Name"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.name}
              name="name"
              error={Boolean(touched.name) && Boolean(errors.name)}
              helperText={touched.name && errors.name}
              sx={{ gridColumn: "span 4" }}
            />

            <TextField
              label="Email"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email}
              name="email"
              error={Boolean(touched.email) && Boolean(errors.email)}
              helperText={touched.email && errors.email}
              sx={{ gridColumn: "span 4", color: "black" }}
            />

            <TextField
              label="Password"
              type="password"
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password}
              name="password"
              error={Boolean(touched.password) && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              sx={{ gridColumn: "span 4" }}
            />
          </Box>
          {isError ? (
            <Alert severity="error">
              Wrong register credentials, please try again
            </Alert>
          ) : null}
          {/* BUTTONS */}
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
        </form>
      )}
    </Formik>
  );
};

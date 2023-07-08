import React from "react";
import { useState } from "react";
import { SignInForm } from "./sign-in";
import { SignUpForm } from "./sign-up";
import { Box, Typography, useMediaQuery } from "@mui/material";
import LogoTransparent from "../../assets/logo_transparent.png";

export const SignForm: React.FC = () => {
  const isNonMobileScreens = useMediaQuery("(min-width: 700px)");
  const [isSignIn, setIsSignIn] = useState(true);

  const toggleForm = () => {
    setIsSignIn(!isSignIn);
  };

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        width: isNonMobileScreens ? "600px" : "100vw",
        minHeight: isNonMobileScreens ? "600px" : "100vh",
        paddingTop: "20px",
        paddingBottom: "20px",
        margin: isNonMobileScreens ? "calc(50vh - 320px) auto " : "0",
        alignItems: "center",
        justifyContent: "center",
        background: "#f3f2f2",
        color: "black",
        borderRadius: isNonMobileScreens ? "15px" : "0",
      }}
    >
      <img src={LogoTransparent} width={100} alt="Logo"></img>
      <Typography
        fontFamily="Orbitron"
        fontWeight="500"
        variant="h5"
        sx={{ mb: "1.5rem" }}
      >
        {isSignIn ? "Sign in to GamingHub" : "Sign up for GamingHub"}
      </Typography>
      {isSignIn ? <SignInForm /> : <SignUpForm />}
      {isSignIn ? (
        <Typography
          onClick={toggleForm}
          sx={{
            mt: "1rem",
            cursor: "pointer",
            "&:hover": {
              color: "rgb(69, 166, 243)",
            },
          }}
        >
          Do you want to sign up?
        </Typography>
      ) : (
        <Typography
          onClick={toggleForm}
          sx={{
            mt: "1rem",
            cursor: "pointer",
            "&:hover": {
              color: "rgb(69, 166, 243)",
            },
          }}
        >
          Do you want to sign in?
        </Typography>
      )}
    </Box>
  );
};

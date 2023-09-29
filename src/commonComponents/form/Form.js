import React, { useContext } from "react";
import { Box, Button, Grid } from "@mui/material";
import { NavLink, useNavigate } from "react-router-dom";
import { getStoredData, storeData } from "../CommonFunctions";
import Input from "../formElements/Input";
import { useForm } from "../formElements/Form-hook";
import { AuthContext } from "../AuthContext";
import "react-toastify/dist/ReactToastify.css";
import { toast, ToastContainer } from "react-toastify";
import loginLogo from "../../assets/login-logo.png";

import "./Form.css";

const Form = ({ signUp = false }) => {
  const auth = useContext(AuthContext);
  const navigate = useNavigate();
  const [formState, inputHandler] = useForm(
    {
      userName: {
        value: "",
        isValid: signUp ? true : false,
      },
      email: {
        value: "",
        isValid: false,
      },
      password: {
        value: "",
        isValid: false,
      }
    },
    false
  );

  const buttonLabel = signUp ? "Sign up" : "login";

  const handleButtonClick = (event) => {
    event.preventDefault();
    const users = getStoredData("users") || [];
    const user = signUp
      ? users.find((user) => user.email.value === formState.email.value)
      : users.find(
          (user) =>
            user.email.value === formState.email.value &&
            user.password.value === formState.password.value
        );
    if (user) {
      if (signUp) {
        toast.error("Entered email-adress is already in used.");
      } else {
        auth.setUserDetails(user);
        navigate("/dashboard");
      }
    } else {
      if (signUp) {
        toast(
          `Hello ${formState.username.value}!! You have Registered successfully!!`
        );
        storeData({ users: [...users, formState] });
        setTimeout(() => {
          navigate("/");
        }, 1000);
      } else {
        toast.error("Entered Invalid Email/Username or Password.");
      }
    }
  };

  return (
    <Grid container sx={{ height: "100vh", overflow: "hidden" }}>
      <Grid item sm={6}>
        <div className="left-content"></div>
      </Grid>
      <Grid item sm={6} sx={{ display: "flex" }}>
        <Box className="login-container">
          <div className="brand-details">
            <img src={loginLogo} alt="" className="logo" />
            <h1 className="welcome-text">Welcome</h1>
            {signUp ? (
              <p className="login-signup-para">
                Sign up to Labs Monitoring System!!
              </p>
            ) : (
              <p className="login-signup-para">
                Login to Labs Monitoring System
              </p>
            )}
          </div>

          <div className="login_reg_forms">
            <Input
              id="email"
              label="Email ID"
              type="email"
              validators="EMAIL"
              errorText="Please enter a valid email adress."
              onInput={inputHandler}
            />
            {signUp && (
              <Input
                id="username"
                label="Username"
                type="text"
                validators="USERNAME"
                errorText="Please enter a valid username."
                onInput={inputHandler}
              />
            )}
            <Input
              id="password"
              label="Password"
              type="password"
              validators="PASSWORD"
              errorText="Password should be alphanumeric."
              onInput={inputHandler}
            />
            <Button
              variant="contained"
              onClick={handleButtonClick}
              disabled={!formState.isValid}
              fullWidth
              sx={{ backgroundColor: "#4e2c90" }}
            >
              {buttonLabel}
            </Button>
            {signUp ? (
              <p>
                Signed up already? go back to{" "}
                <NavLink to="/">login page.</NavLink>
              </p>
            ) : (
              <p className="text-center">
                Not an existing user? Please{" "}
                <NavLink to={"/signup"}>sign up!!</NavLink>
              </p>
            )}
          </div>
          <ToastContainer autoClose={1000} />
        </Box>
      </Grid>
    </Grid>
  );
};

export default Form;

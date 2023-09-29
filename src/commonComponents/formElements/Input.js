import React, { useReducer, useEffect, useState } from "react";
import validate from "../Validator.js";
import { IconButton, InputAdornment, TextField } from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";

const inputReducer = (state, action) => {
  switch (action.type) {
    case "CHANGE":
      return {
        ...state,
        value: action.val,
        isValid: action.validators
          ? validate(action.val, action.validators)
          : true
      };
    case "BLUR": {
      return {
        ...state,
        isBlured: true
      };
    }
    default:
      return state;
  }
};

const Input = (props) => {
  const [showPassword, setShowPassword] = useState(false);
  const [inputState, dispatch] = useReducer(inputReducer, {
    value: props.val || "",
    isBlured: false,
    isValid: props.isValid || false
  });

  const { id, label, type, onInput, errorText } = props;
  const { value, isValid } = inputState;

  useEffect(() => {
    onInput(id, value, isValid);
  }, [id, value, isValid, onInput]);

  const changeHandler = (event) => {
    dispatch({
      type: "CHANGE",
      val: event.target.value,
      validators: props.validators
    });
  };

  const blurHandler = () => {
    dispatch({
      type: "BLUR"
    });
  };

  const errorMsg = !inputState.isValid && inputState.isBlured ? errorText : "";
  return (
    <div>
      <TextField
        id={id}
        label={label}
        type={showPassword ? "text" : type}
        value={value}
        fullWidth
        onChange={changeHandler}
        onBlur={blurHandler}
        sx={{ marginBottom: "16px" }}
        InputLabelProps={{
          shrink: true
        }}
        error={!inputState.isValid && inputState.isBlured}
        helperText={errorMsg}
        InputProps={
          id === "password"
            ? {
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? (
                        <VisibilityIcon />
                      ) : (
                        <VisibilityOffIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                )
              }
            : {}
        }
      />
    </div>
  );
};

export default Input;

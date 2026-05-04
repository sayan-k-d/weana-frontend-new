"use client";

import { forwardRef, useState } from "react";
import {
  IconButton,
  InputAdornment,
  TextField,
  TextFieldProps,
} from "@mui/material";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";

import { authFieldSx } from "../shared/fieldStyles";

type PasswordFieldProps = Omit<TextFieldProps, "type">;

const PasswordField = forwardRef<HTMLDivElement, PasswordFieldProps>(
  function PasswordField(props, ref) {
    const [show, setShow] = useState(false);

    return (
      <TextField
        {...props}
        ref={ref}
        type={show ? "text" : "password"}
        fullWidth
        sx={{ ...authFieldSx, ...props.sx }}
        slotProps={{
          input: {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  edge="end"
                  size="small"
                  aria-label={show ? "Hide password" : "Show password"}
                  onClick={() => setShow((v) => !v)}
                  sx={{ color: "#7F7B86" }}
                >
                  {show ? (
                    <VisibilityOffOutlinedIcon fontSize="small" />
                  ) : (
                    <VisibilityOutlinedIcon fontSize="small" />
                  )}
                </IconButton>
              </InputAdornment>
            ),
          },
        }}
      />
    );
  },
);

export default PasswordField;

import { InputBase, InputBaseProps } from "@mui/material";

// 1. Remove the Omit so 'sx' is allowed in the props
interface StyledInputProps extends InputBaseProps {
  multiline?: boolean;
  rows?: number;
}

export function StyledInput({
  multiline,
  rows,
  sx,
  ...props
}: StyledInputProps) {
  return (
    <InputBase
      multiline={multiline}
      rows={rows}
      {...props}
      sx={[
        {
          width: "100%",
          bgcolor: "#F2F1F5",
          borderRadius: "8px",
          px: 1.6,
          py: multiline ? 1.2 : 0,
          height: multiline ? "auto" : 50,
          fontSize: 13.5,
          color: "#1E1A28",
          border: "1px solid transparent",
          transition: "border-color 0.15s, background 0.15s",
          alignItems: multiline ? "flex-start" : "center",
          "& input, & textarea": {
            fontSize: 13.5,
            color: "#1E1A28",
            "&::placeholder": { color: "#B0AEC0", opacity: 1 },
          },
          "&.Mui-focused": {
            bgcolor: "#FFFFFF",
            border: "1px solid #6B3FA0",
          },
        },
        // 2. Spread or include the 'sx' prop here so external styles are applied
        ...(Array.isArray(sx) ? sx : [sx]),
      ]}
    />
  );
}

import { Box, Stack, StackProps, Tooltip, Typography } from "@mui/material";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface FormFieldProps {
  label: string;
  required?: boolean;
  info?: string;
  direction?: StackProps["direction"];
  alignItem?: string | null;
  children: React.ReactNode;
}

export function FormField({
  label,
  required,
  info,
  direction,
  alignItem = null,
  children,
}: FormFieldProps) {
  return (
    <Stack
      direction={direction ?? "row"}
      spacing={1.5} // Space between label and input
      sx={{
        alignItems: alignItem ?? "center", // Vertically center the label with the input
      }}
    >
      {/* Label Container */}
      <Stack
        direction={direction ?? "column"}
        spacing={0.5}
        sx={{
          alignItems: "center",
          // width: 100, // Fixed width ensures inputs align vertically
          flexShrink: 0,
        }}
      >
        <Typography
          sx={{
            fontSize: 13,
            fontWeight: 600,
            color: "#3D3A4A",
            whiteSpace: "nowrap",
          }}
        >
          {label}
        </Typography>
        {required && (
          <Typography sx={{ fontSize: 13, color: "#E05252", fontWeight: 600 }}>
            *
          </Typography>
        )}
        {info && (
          <Tooltip title={info} placement="top" arrow>
            <InfoOutlinedIcon
              sx={{
                fontSize: 14,
                color: "#BBBAC5",
                cursor: "pointer",
                ml: 0.3,
              }}
            />
          </Tooltip>
        )}
      </Stack>

      {/* Input Field Container */}
      <Box sx={{ flexGrow: 1, width: 1 }}>{children}</Box>
    </Stack>
  );
}

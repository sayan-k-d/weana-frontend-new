import { Paper, PaperProps } from "@mui/material";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/system";
import { whiteCardStyles } from "@/lib/utils";

type WhiteCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
} & Omit<PaperProps, "sx">;

export default function WhiteCard({ children, sx, ...rest }: WhiteCardProps) {
  return (
    <Paper
      elevation={0}
      sx={{ ...whiteCardStyles(), ...(sx as object) }}
      {...rest}
    >
      {children}
    </Paper>
  );
}

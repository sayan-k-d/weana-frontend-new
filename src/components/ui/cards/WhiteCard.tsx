import { Paper, PaperProps } from "@mui/material";
import { ReactNode } from "react";
import { SxProps, Theme } from "@mui/system";
import { whiteCardStyles } from "@/lib/utils";

type WhiteCardProps = {
  children: ReactNode;
  sx?: SxProps<Theme>;
} & PaperProps;

export default function WhiteCard({ children, sx, ...rest }: WhiteCardProps) {
  return (
    <Paper elevation={0} sx={{ ...whiteCardStyles(), ...sx }} {...rest}>
      {children}
    </Paper>
  );
}

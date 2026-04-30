"use client";

import { Box, Button, Stack, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordField from "../../shared/PasswordField";
import {
  authLabelSx,
  authPrimaryButtonSx,
} from "../../shared/fieldStyles";
import {
  resetPasswordSchema,
  type ResetPasswordValues,
} from "../../shared/schemas";

export default function ResetPasswordForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ResetPasswordValues>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: { password: "", confirmPassword: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async () => {
    // Mocked submit — would call set-password API in real implementation.
    await new Promise((r) => setTimeout(r, 300));
    router.push("/login");
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        <Box>
          <Typography
            component="label"
            htmlFor="reset-new-password"
            sx={authLabelSx}
          >
            New Password
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordField
                {...field}
                id="reset-new-password"
                placeholder="Enter New Password"
                autoComplete="new-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
        </Box>

        <Box>
          <Typography
            component="label"
            htmlFor="reset-confirm-password"
            sx={authLabelSx}
          >
            Confirm Password
          </Typography>
          <Controller
            name="confirmPassword"
            control={control}
            render={({ field }) => (
              <PasswordField
                {...field}
                id="reset-confirm-password"
                placeholder="Enter Confirm Password"
                autoComplete="new-password"
                error={Boolean(errors.confirmPassword)}
                helperText={errors.confirmPassword?.message}
              />
            )}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ ...authPrimaryButtonSx, mt: 0.5 }}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

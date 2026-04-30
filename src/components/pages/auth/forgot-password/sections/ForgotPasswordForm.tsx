"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import {
  authFieldSx,
  authLabelSx,
  authPrimaryButtonSx,
} from "../../shared/fieldStyles";
import {
  forgotPasswordSchema,
  type ForgotPasswordValues,
} from "../../shared/schemas";

export default function ForgotPasswordForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<ForgotPasswordValues>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: { email: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async () => {
    // Mocked submit — would call password-reset API in real implementation.
    await new Promise((r) => setTimeout(r, 300));
    router.push("/reset-password");
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={2.5}>
        <Box>
          <Typography component="label" htmlFor="forgot-email" sx={authLabelSx}>
            Email
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="forgot-email"
                placeholder="Email"
                fullWidth
                autoComplete="email"
                error={Boolean(errors.email)}
                helperText={errors.email?.message}
                sx={authFieldSx}
              />
            )}
          />
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={authPrimaryButtonSx}
        >
          Submit
        </Button>
      </Stack>
    </Box>
  );
}

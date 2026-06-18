"use client";

import { Box, Button, Stack, TextField, Typography } from "@mui/material";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import PasswordField from "../../shared/PasswordField";
import {
  authFieldSx,
  authLabelSx,
  authPrimaryButtonSx,
} from "../../shared/fieldStyles";
import { loginSchema, type LoginValues } from "../../shared/schemas";

export default function LoginForm() {
  const router = useRouter();
  const {
    control,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginValues>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  });

  const onSubmit = handleSubmit(async () => {
    // Mocked submit — replace with real auth later.
    await new Promise((r) => setTimeout(r, 300));
    router.push("/BusinessAdminDashboard");
  });

  return (
    <Box component="form" onSubmit={onSubmit} noValidate>
      <Stack spacing={2}>
        <Box>
          <Typography component="label" htmlFor="login-email" sx={authLabelSx}>
            Email
          </Typography>
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                {...field}
                id="login-email"
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

        <Box>
          <Typography
            component="label"
            htmlFor="login-password"
            sx={authLabelSx}
          >
            Password
          </Typography>
          <Controller
            name="password"
            control={control}
            render={({ field }) => (
              <PasswordField
                {...field}
                id="login-password"
                placeholder="Password"
                autoComplete="current-password"
                error={Boolean(errors.password)}
                helperText={errors.password?.message}
              />
            )}
          />
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 1 }}>
            <Typography
              component={Link}
              href="/forgot-password"
              sx={{
                color: "#512B7A",
                fontSize: 12.5,
                fontWeight: 600,
                textDecoration: "none",
                "&:hover": { textDecoration: "underline" },
              }}
            >
              Forgot Password?
            </Typography>
          </Box>
        </Box>

        <Button
          type="submit"
          variant="contained"
          fullWidth
          disabled={isSubmitting}
          sx={{ ...authPrimaryButtonSx, mt: 0.5 }}
        >
          Log in
        </Button>
      </Stack>
    </Box>
  );
}

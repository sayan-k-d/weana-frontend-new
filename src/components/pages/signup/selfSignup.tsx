"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import {
  Typography,
  TextField,
  Button,
  Avatar,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import Stack from "@mui/material/Stack";
import Box from "@mui/material/Box";
import { styled, keyframes } from "@mui/material/styles";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import EmailOutlinedIcon from "@mui/icons-material/EmailOutlined";
import PhoneOutlinedIcon from "@mui/icons-material/PhoneOutlined";
import AddIcon from "@mui/icons-material/Add";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import AppleIcon from "@mui/icons-material/Apple";
import VisibilityOutlinedIcon from "@mui/icons-material/VisibilityOutlined";
import VisibilityOffOutlinedIcon from "@mui/icons-material/VisibilityOffOutlined";
import CheckIcon from "@mui/icons-material/Check";
import EmailIcon from "@mui/icons-material/Email";
import PhoneIcon from "@mui/icons-material/Phone";
import Image from "next/image";
import { useRegisterMutation } from "@/services/baseApi";
import { enqueueSnackbar } from "notistack";

// ─── Animations ───────────────────────────────────────────────────────────────
const fadeSlide = keyframes`
  from { opacity: 0; transform: translateX(20px); }
  to   { opacity: 1; transform: translateX(0); }
`;
const popIn = keyframes`
  0%   { opacity: 0; transform: scale(0.7); }
  70%  { transform: scale(1.06); }
  100% { opacity: 1; transform: scale(1); }
`;
const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50%       { transform: translateY(-6px); }
`;
const wiggle = keyframes`
  0%, 100% { transform: rotate(0deg); }
  25%       { transform: rotate(8deg); }
  75%       { transform: rotate(-8deg); }
`;

// ─── Types ────────────────────────────────────────────────────────────────────
interface FormData {
  type: "self" | "team";
  name: string;
  job_title: string;
  company: string;
  email: string;
  mobile: string;
  password: string;
  additional_email: string;
  recommended_links: { title: string; value: string; type: string }[];
}
type ScreenState = "wizard" | "verify" | "success";

// ─── Styled ───────────────────────────────────────────────────────────────────
const PageWrapper = styled(Box)({
  minHeight: "100vh",
  width: "100%",
  background: "#DDD8EC",
  display: "flex",
  flexDirection: "column",
});

const TopBar = styled(Box)({
  width: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "space-between",
  padding: "22px 40px",
});

const PillTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 999,
    background: "#FFFFFF",
    fontSize: 15,
    color: "#1A1A3E",
    "& fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "2px solid rgba(123,94,167,0.35)" },
    "& input": {
      padding: "15px 28px",
      "&::placeholder": { color: "#C8C5DC", opacity: 1 },
    },
    boxShadow: "0 2px 16px rgba(100,90,180,0.06)",
  },
});

const RoundedTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: 12,
    background: "#FFFFFF",
    fontSize: 14,
    color: "#1A1A3E",
    "& fieldset": { border: "none" },
    "&.Mui-focused fieldset": { border: "2px solid rgba(123,94,167,0.35)" },
    "& input": {
      padding: "14px 20px",
      "&::placeholder": { color: "#C8C5DC", opacity: 1 },
    },
    boxShadow: "0 1px 8px rgba(100,90,180,0.06)",
  },
});

// ── OTP box: large, white, purple border ──
const OtpBox = styled(TextField)({
  width: 68,
  "& .MuiOutlinedInput-root": {
    borderRadius: 14,
    background: "#FFFFFF",
    height: 72,
    "& fieldset": { borderColor: "#7B5EA7", borderWidth: 2 },
    "&:hover fieldset": { borderColor: "#6B4E97" },
    "&.Mui-focused fieldset": { borderColor: "#7B5EA7", borderWidth: 2 },
    "& input": {
      textAlign: "center",
      fontSize: 26,
      fontWeight: 700,
      color: "#1A1A3E",
      padding: "0",
      caretColor: "#7B5EA7",
    },
  },
});

const BackBtn = styled(Button)({
  borderRadius: 999,
  padding: "11px 26px",
  fontSize: 14,
  fontWeight: 500,
  textTransform: "none",
  color: "#444",
  background: "#FFFFFF",
  border: "none",
  boxShadow: "0 2px 12px rgba(100,90,180,0.10)",
  "&:hover": { background: "#F5F3FC" },
});

const ContinueBtn = styled(Button)({
  borderRadius: 999,
  padding: "11px 26px",
  fontSize: 14,
  fontWeight: 600,
  textTransform: "none",
  color: "#FFFFFF",
  background: "#E8453C",
  boxShadow: "none",
  "&:hover": {
    background: "#C93530",
    boxShadow: "0 4px 16px rgba(232,69,60,0.28)",
  },
  "&:disabled": { background: "#F0B0AE", color: "#fff" },
});

const SocialBtn = styled(Button)({
  borderRadius: 999,
  padding: "12px 20px",
  fontSize: 13.5,
  fontWeight: 500,
  textTransform: "none",
  color: "#2D2D4E",
  border: "1.5px solid #E8E6F0",
  background: "#FFFFFF",
  justifyContent: "center",
  gap: 10,
  "&:hover": { background: "#FAFAFA", borderColor: "#C8C4DC" },
});

// ─── Step Indicator ───────────────────────────────────────────────────────────
const TOTAL_STEPS = 5;

const StepIndicator = ({ current }: { current: number }) => (
  <Stack sx={{ flexDirection: "row", alignItems: "center" }}>
    {Array.from({ length: TOTAL_STEPS }).map((_, i) => {
      const stepNum = i + 1;
      const isActive = stepNum === current;
      const isDone = stepNum < current;

      return (
        <Stack key={i} sx={{ flexDirection: "row", alignItems: "center" }}>
          <Box
            sx={{
              width: 28,
              height: 28,
              borderRadius: "50%",
              background: isActive || isDone ? "#7B5EA7" : "#E2E3E8",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
              transition: "background 0.3s ease",
              zIndex: 1,
            }}
          >
            <Typography
              sx={{
                fontSize: 11,
                fontWeight: 700,
                lineHeight: 1,
                color: "#FFFFFF",
              }}
            >
              {stepNum}
            </Typography>
          </Box>

          {i < TOTAL_STEPS - 1 && (
            <Box
              sx={{
                width: 88,
                height: 2,
                mx: 1.5,
                background: isDone ? "#7B5EA7" : "#E2E3E8",
                transition: "background 0.3s ease",
              }}
            />
          )}
        </Stack>
      );
    })}
  </Stack>
);

// ─── Card Preview ─────────────────────────────────────────────────────────────
const CardPreview = ({ form }: { form: FormData }) => {
  const initials =
    form.name
      ?.split(" ")
      .map((w) => w[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "JS";
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 2,
        p: 4,
      }}
    >
      <Box
        sx={{
          width: 240,
          borderRadius: "40px",
          overflow: "hidden",
          boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
          position: "relative",
        }}
      >
        <Box
          sx={{
            height: 120,
            background:
              "radial-gradient(31.1% 69.48% at 79.65% 38.31%, #FFB9B0 0%, #F05B47 100%)",
            position: "relative",
          }}
        >
          <Avatar
            sx={{
              width: 65,
              height: 65,
              background: "#F05B47",
              border: "3px solid #fff",
              fontSize: 20,
              fontWeight: 500,
              color: "#fff",
              marginLeft: "15px",
              position: "absolute",
              bottom: -40,
              boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
            }}
          >
            {initials}
          </Avatar>
        </Box>
        <Box
          sx={{ pt: 7, pb: 4, px: 3, textAlign: "left", background: "#fff" }}
        >
          <Typography
            sx={{ fontWeight: 500, fontSize: 12, color: "#000", mb: "7px" }}
          >
            {form.name || "John Smith"}
          </Typography>
          <Typography sx={{ fontSize: 9, color: "#828282", mb: "4px" }}>
            {form.job_title || "Job Title"}
          </Typography>
          <Typography sx={{ fontSize: 9, color: "#828282", mb: 5 }}>
            {form.company || "Company Name"}
          </Typography>
          <Button
            fullWidth
            sx={{
              background: "#F05B47",
              color: "#fff",
              borderRadius: "100px",
              textTransform: "none",
              fontWeight: 700,
              py: 1.2,
              mb: 3,
            }}
          >
            Save Contact
          </Button>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {[
              {
                icon: <EmailIcon sx={{ fontSize: 18, color: "#fff" }} />,
                label: form.email || "Email",
              },
              {
                icon: <PhoneIcon sx={{ fontSize: 18, color: "#fff" }} />,
                label: form.mobile || "Phone",
              },
            ].map(({ icon, label }) => (
              <Box
                key={label}
                sx={{ display: "flex", alignItems: "center", gap: 2 }}
              >
                <Box
                  sx={{
                    width: 36,
                    height: 36,
                    borderRadius: "12px",
                    background: "#F05B47",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {icon}
                </Box>
                <Typography
                  sx={{ fontSize: 14, fontWeight: 600, color: "#333" }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
      <Typography
        sx={{ fontSize: 12, color: "#888", fontWeight: 500, marginTop: "39px" }}
      >
        Card Live Preview
      </Typography>
    </Box>
  );
};

// ─── Icons ────────────────────────────────────────────────────────────────────
const GoogleIcon = () => (
  <Box
    component="svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    sx={{ flexShrink: 0 }}
  >
    <path
      d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z"
      fill="#4285F4"
    />
    <path
      d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z"
      fill="#34A853"
    />
    <path
      d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z"
      fill="#FBBC05"
    />
    <path
      d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z"
      fill="#EA4335"
    />
  </Box>
);

const MicrosoftIcon = () => (
  <Box
    component="svg"
    width={18}
    height={18}
    viewBox="0 0 18 18"
    sx={{ flexShrink: 0 }}
  >
    <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022" />
    <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7FBA00" />
    <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00A4EF" />
    <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900" />
  </Box>
);

const LinkedInIcon = () => (
  <Box
    sx={{
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "#0077B5",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box component="svg" width={18} height={18} viewBox="0 0 24 24" fill="#fff">
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </Box>
  </Box>
);

const WebsiteIcon = () => (
  <Box
    sx={{
      width: 32,
      height: 32,
      borderRadius: 8,
      background: "#4361EE",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
    }}
  >
    <Box
      component="svg"
      width={18}
      height={18}
      viewBox="0 0 24 24"
      fill="none"
      stroke="#fff"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="12" cy="12" r="10" />
      <line x1="2" y1="12" x2="22" y2="12" />
      <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
    </Box>
  </Box>
);

const FieldRow = ({
  label,
  optional = false,
  children,
}: {
  label: string;
  optional?: boolean;
  children: React.ReactNode;
}) => (
  <Box sx={{ mb: 2.5 }}>
    <Stack
      sx={{
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        mb: 1,
      }}
    >
      <Typography
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#1A1A3E",
        }}
      >
        {label}
      </Typography>

      {optional && (
        <Typography
          sx={{
            fontSize: 12,
            color: "#AAAACC",
          }}
        >
          Optional
        </Typography>
      )}
    </Stack>

    {children}
  </Box>
);

// ─── OTP Verification Screen ──────────────────────────────────────────────────
const OTP_LENGTH = 6;

const VerifyEmailScreen = ({
  onVerified,
  onRestart,
}: {
  onVerified: () => void;
  onRestart: () => void;
}) => {
  const [otp, setOtp] = useState<string[]>(Array(OTP_LENGTH).fill(""));
  const [loading, setLoading] = useState(false);
  const [resent, setResent] = useState(false);
  const inputRefs = useRef<(HTMLInputElement | null)[]>([]);

  const handleChange = (index: number, value: string) => {
    const digit = value.replace(/\D/g, "").slice(-1);
    const newOtp = [...otp];
    newOtp[index] = digit;
    setOtp(newOtp);
    if (digit && index < OTP_LENGTH - 1) inputRefs.current[index + 1]?.focus();
  };

  const handleKeyDown = (index: number, e: React.KeyboardEvent) => {
    if (e.key === "Backspace" && !otp[index] && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowLeft" && index > 0)
      inputRefs.current[index - 1]?.focus();
    if (e.key === "ArrowRight" && index < OTP_LENGTH - 1)
      inputRefs.current[index + 1]?.focus();
  };

  const handlePaste = (e: React.ClipboardEvent) => {
    e.preventDefault();
    const pasted = e.clipboardData
      .getData("text")
      .replace(/\D/g, "")
      .slice(0, OTP_LENGTH);
    const newOtp = [...otp];
    pasted.split("").forEach((char, i) => {
      newOtp[i] = char;
    });
    setOtp(newOtp);
    inputRefs.current[Math.min(pasted.length, OTP_LENGTH - 1)]?.focus();
  };

  const handleVerify = async () => {
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1200));
    setLoading(false);
    onVerified();
  };

  const handleResend = async () => {
    setResent(true);
    await new Promise((r) => setTimeout(r, 800));
    setTimeout(() => setResent(false), 3000);
  };

  const isComplete = otp.every((d) => d !== "");

  return (
    <Box
      sx={{
        flex: 1,
        display: "flex",
        alignItems: "center",
        pl: { xs: "6%", sm: "28%" },
        pr: { xs: "6%", sm: "8%" },
        pb: "80px",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 500,
          animation: `${fadeSlide} 0.32s ease both`,
        }}
      >
        <Typography
          sx={{
            fontSize: 32,
            fontWeight: 700,
            color: "#1A1A3E",
            mb: 1.5,
            letterSpacing: -0.3,
          }}
        >
          Check your email
        </Typography>
        <Typography
          sx={{ fontSize: 13.5, color: "#AAAAAA", lineHeight: 1.6, mb: 4 }}
        >
          We sent a verification code
          <br />
          Check your email then enter the verification code below
        </Typography>

        <Typography
          sx={{ fontSize: 13, fontWeight: 600, color: "#1A1A3E", mb: 2 }}
        >
          Verification Code
        </Typography>

        {/* 6 OTP boxes */}
        <Stack
          sx={{
            flexDirection: "row",
            gap: 1.2,
            mb: 4,
          }}
          onPaste={handlePaste}
        >
          {Array.from({ length: OTP_LENGTH }).map((_, i) => (
            <OtpBox
              key={i}
              value={otp[i]}
              onChange={(e) => handleChange(i, e.target.value)}
              onKeyDown={(e) => handleKeyDown(i, e)}
              inputRef={(el: HTMLInputElement | null) => {
                inputRefs.current[i] = el;
              }}
              // inputProps={{ maxLength: 1, inputMode: 'numeric' as const }}
              autoFocus={i === 0}
            />
          ))}
        </Stack>

        {/* Verify button — full width, pill, coral */}
        <Button
          fullWidth
          onClick={handleVerify}
          disabled={!isComplete || loading}
          sx={{
            background: "#E8453C",
            color: "#fff",
            borderRadius: 999,
            py: 1.7,
            fontSize: 15,
            fontWeight: 600,
            textTransform: "none",
            boxShadow: "none",
            mb: 3,
            "&:hover": {
              background: "#C93530",
              boxShadow: "0 4px 20px rgba(232,69,60,0.28)",
            },
            "&:disabled": { background: "#F0B0AE", color: "#fff" },
          }}
        >
          {loading ? "Verifying…" : "Verify Email"}
        </Button>

        {/* Resend */}
        <Box sx={{ textAlign: "center", mb: 3 }}>
          <Typography sx={{ fontSize: 13, color: "#AAAAAA", mb: 0.5 }}>
            {`Didn't receive your code?`}
          </Typography>
          <Button
            onClick={handleResend}
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: resent ? "#22C55E" : "#4ECDC4",
              textTransform: "none",
              p: 0,
              "&:hover": { background: "transparent" },
            }}
          >
            {resent ? "Code sent!" : "Request Again"}
          </Button>
        </Box>

        {/* OR divider */}
        <Divider
          sx={{ mb: 3, "&::before, &::after": { borderColor: "#C8C4DC" } }}
        >
          <Typography
            sx={{ fontSize: 12, color: "#BBBBCC", px: 1.5, fontWeight: 500 }}
          >
            OR
          </Typography>
        </Divider>

        {/* Restart with new email */}
        <Box sx={{ textAlign: "center" }}>
          <Button
            onClick={onRestart}
            sx={{
              fontSize: 13,
              fontWeight: 600,
              color: "#4ECDC4",
              textTransform: "none",
              p: 0,
              "&:hover": { background: "transparent", color: "#3AB5AC" },
            }}
          >
            Restart with new email
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

// ─── Success Screen ───────────────────────────────────────────────────────────
const SuccessScreen = ({ onLogin }: { onLogin: () => void }) => (
  <Box
    sx={{
      flex: 1,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      p: 3,
    }}
  >
    <Box
      sx={{
        background: "#F5F3FA",
        borderRadius: 6,
        width: "100%",
        maxWidth: 460,
        p: "48px 40px",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        textAlign: "center",
        boxShadow: "0 20px 60px rgba(100,90,180,0.12)",
        animation: `${popIn} 0.5s ease both`,
      }}
    >
      <Box sx={{ position: "relative", width: 220, height: 220, mb: 3 }}>
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 160,
            height: 160,
            borderRadius: "50%",
            background: "rgba(180,170,220,0.3)",
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: "10%",
            left: "50%",
            transform: "translateX(-50%)",
            animation: `${float} 3s ease-in-out infinite`,
          }}
        >
          <Box component="svg" width={110} height={140} viewBox="0 0 110 140">
            <rect
              x="44"
              y="2"
              width="22"
              height="22"
              rx="4"
              fill="none"
              stroke="#4361EE"
              strokeWidth="3"
            />
            <rect x="48" y="10" width="14" height="18" rx="2" fill="#A5B8F0" />
            <rect
              x="8"
              y="20"
              width="94"
              height="110"
              rx="12"
              fill="url(#bg2)"
              stroke="#4361EE"
              strokeWidth="2"
            />
            <circle cx="55" cy="68" r="22" fill="rgba(67,97,238,0.15)" />
            <circle
              cx="55"
              cy="60"
              r="10"
              fill="none"
              stroke="#4361EE"
              strokeWidth="2.5"
            />
            <path
              d="M30 100 Q55 80 80 100"
              fill="none"
              stroke="#4361EE"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
            <rect
              x="28"
              y="108"
              width="54"
              height="5"
              rx="2.5"
              fill="#A5B8F0"
              opacity="0.7"
            />
            <rect
              x="36"
              y="118"
              width="38"
              height="4"
              rx="2"
              fill="#A5B8F0"
              opacity="0.4"
            />
            <defs>
              <linearGradient id="bg2" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="#7EB3F5" />
                <stop offset="100%" stopColor="#4361EE" stopOpacity="0.7" />
              </linearGradient>
            </defs>
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            bottom: 20,
            right: 20,
            width: 52,
            height: 52,
            borderRadius: "50%",
            background: "#22C55E",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            boxShadow: "0 4px 16px rgba(34,197,94,0.4)",
            animation: `${popIn} 0.5s 0.3s ease both`,
            border: "3px solid #F5F3FA",
          }}
        >
          <CheckIcon sx={{ color: "#fff", fontSize: 26 }} />
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 36,
            left: 10,
            animation: `${wiggle} 3s ease-in-out infinite`,
          }}
        >
          <Box component="svg" width={24} height={20} viewBox="0 0 24 20">
            <path
              d="M2 10 Q6 2 12 10 Q18 18 22 10"
              fill="none"
              stroke="#E8453C"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 80,
            right: 4,
            animation: `${wiggle} 4s ease-in-out infinite 0.5s`,
          }}
        >
          <Box component="svg" width={28} height={16} viewBox="0 0 28 16">
            <path
              d="M2 8 Q7 1 14 8 Q21 15 26 8"
              fill="none"
              stroke="#4ECDC4"
              strokeWidth="2.5"
              strokeLinecap="round"
            />
          </Box>
        </Box>
        <Box
          sx={{
            position: "absolute",
            top: 100,
            left: 16,
            width: 7,
            height: 7,
            borderRadius: "50%",
            background: "#E8453C",
            animation: `${float} 2.5s ease-in-out infinite`,
          }}
        />
        <Box
          sx={{
            position: "absolute",
            top: 80,
            right: 14,
            width: 9,
            height: 9,
            borderRadius: "50%",
            background: "#22C55E",
            animation: `${float} 3.5s ease-in-out infinite 0.5s`,
          }}
        />
      </Box>
      <Typography
        sx={{ fontSize: 18, fontWeight: 700, color: "#1A1A3E", mb: 0.5 }}
      >
        Account created successfully!
      </Typography>
      <Typography sx={{ fontSize: 15, color: "#666", mb: 4 }}>
        You are all set to explore
      </Typography>
      <Button
        onClick={onLogin}
        endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
        sx={{
          borderRadius: 999,
          px: 4,
          py: 1.4,
          background: "#E8453C",
          color: "#fff",
          fontSize: 14,
          fontWeight: 600,
          textTransform: "none",
          boxShadow: "none",
          "&:hover": { background: "#C93530" },
        }}
      >
        Click here to Login
      </Button>
    </Box>
  </Box>
);

// ─── Validation ───────────────────────────────────────────────────────────────
const isValid = (step: number, form: FormData): boolean => {
  if (step === 1) return form.name.trim().length > 0;
  if (step === 2)
    return form.job_title.trim().length > 0 && form.company.trim().length > 0;
  if (step === 3) return true;
  if (step === 4)
    return (
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email) && form.password.length >= 8
    );
  return false;
};

// ─── Step field components ────────────────────────────────────────────────────
const Step2Fields = ({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (k: keyof FormData, v: string) => void;
}) => (
  <Box key="s2" sx={{ animation: `${fadeSlide} 0.32s ease both` }}>
    <Typography
      sx={{ fontSize: 28, fontWeight: 500, color: "#000", mb: "11px" }}
    >
      Where do you work?
    </Typography>
    <Typography sx={{ fontSize: 14, color: "#888", lineHeight: 1.6, mb: 4 }}>
      Add job title and company to your digital business card
    </Typography>
    <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1A1A3E", mb: 1 }}>
      Job Title
    </Typography>
    <RoundedTextField
      fullWidth
      autoFocus
      placeholder="Enter job title"
      value={form.job_title}
      onChange={(e) => onChange("job_title", e.target.value)}
      sx={{ mb: 2.5 }}
    />
    <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1A1A3E", mb: 1 }}>
      Company
    </Typography>
    <RoundedTextField
      fullWidth
      placeholder="Enter company name"
      value={form.company}
      onChange={(e) => onChange("company", e.target.value)}
    />
  </Box>
);

const Step3Fields = ({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (k: keyof FormData, v: string) => void;
}) => (
  <Box key="s3" sx={{ animation: `${fadeSlide} 0.32s ease both` }}>
    <Typography
      sx={{ fontSize: 28, fontWeight: 500, color: "#000", mb: "11px" }}
    >
      Additional Info
    </Typography>
    <Typography sx={{ fontSize: 14, color: "#888", lineHeight: 1.6, mb: 3.5 }}>
      {`Let's add some more info to your card. You can add contact info, social
      media, payment links and more`}
    </Typography>
    <FieldRow label="Email" optional>
      <RoundedTextField
        fullWidth
        autoFocus
        placeholder="Enter your email"
        type="email"
        value={form.email}
        onChange={(e) => onChange("email", e.target.value)}
      />
    </FieldRow>
    <FieldRow label="Phone Number" optional>
      <RoundedTextField
        fullWidth
        placeholder="Enter your phone number"
        type="tel"
        value={form.mobile}
        onChange={(e) => onChange("mobile", e.target.value)}
      />
    </FieldRow>
    <Box>
      <Stack
        sx={{
          flexDirection: "row",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 1.5,
        }}
      >
        <Typography sx={{ fontSize: 13, fontWeight: 600, color: "#1A1A3E" }}>
          Recommended Links
        </Typography>

        <Typography sx={{ fontSize: 12, color: "#AAAACC" }}>
          Optional
        </Typography>
      </Stack>

      <Stack
        sx={{
          flexDirection: "row",
          gap: 1.5,
          mb: 1.5,
        }}
      >
        {[
          { icon: <LinkedInIcon />, label: "Linkedin" },
          { icon: <WebsiteIcon />, label: "Website" },
        ].map(({ icon, label }) => (
          <Box
            key={label}
            sx={{
              flex: 1,
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              background: "#FFFFFF",
              borderRadius: 2,
              p: "12px 14px",
              cursor: "pointer",
              boxShadow: "0 1px 8px rgba(100,90,180,0.06)",
              transition: "box-shadow 0.2s ease",
              "&:hover": {
                boxShadow: "0 4px 16px rgba(100,90,180,0.12)",
              },
            }}
          >
            <Stack
              sx={{
                flexDirection: "row",
                alignItems: "center",
                gap: 1.5,
              }}
            >
              {icon}

              <Typography
                sx={{ fontSize: 13, fontWeight: 500, color: "#1A1A3E" }}
              >
                {label}
              </Typography>
            </Stack>

            <Box
              sx={{
                width: 24,
                height: 24,
                borderRadius: "50%",
                border: "1.5px solid #D0CEEA",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <AddIcon sx={{ fontSize: 14, color: "#AAAACC" }} />
            </Box>
          </Box>
        ))}
      </Stack>
      <Button
        startIcon={<AddIcon sx={{ fontSize: 15 }} />}
        sx={{
          fontSize: 13,
          fontWeight: 600,
          color: "#4ECDC4",
          textTransform: "none",
          p: 0,
          "&:hover": { background: "transparent", color: "#3AB5AC" },
        }}
      >
        Add additional links
      </Button>
    </Box>
  </Box>
);

const Step4Fields = ({
  form,
  onChange,
}: {
  form: FormData;
  onChange: (k: keyof FormData, v: string) => void;
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const handleGoogleSignup = async () => {
    const payload = JSON.stringify({
      flow: "signup", // or "login"
      name: form.name,
      job_title: form.job_title,
      company: form.company,
      mobile: form.mobile,
      additional_email: form.additional_email,
      recommended_links: form.recommended_links,
      provider: "google",
    });
    const res = await fetch(
      process.env.NEXT_PUBLIC_API_URL + "auth/signup-session",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: payload,
      },
    );

    const data = await res.json();
    const sessionId = data.sessionId;
    localStorage.setItem("signup_session_id", sessionId);
    const base = `${process.env.NEXT_PUBLIC_KEYCLOAK_URL}/realms/${process.env.NEXT_PUBLIC_KEYCLOAK_REALM}/protocol/openid-connect/auth`;
    const state = btoa(
      JSON.stringify({
        sessionId,
        provider: "google",
        flow: "signup",
      }),
    );

    const params = new URLSearchParams({
      client_id: process.env.NEXT_PUBLIC_KEYCLOAK_BACKEND_CLIENT_ID!,
      redirect_uri: process.env.NEXT_PUBLIC_KEYCLOAK_REDIRECT_URI!,
      response_type: "code",
      scope: "openid",
      kc_idp_hint: "google",
      state,
    });

    const url = `${base}?${params.toString()}`;
    window.location.href = url;
    // const googleAuthUrl = `${process.env.NEXT_PUBLIC_GOOGLE_AUTH_URL}?client_id=${process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID}&redirect_uri=${process.env.NEXT_PUBLIC_GOOGLE_REDIRECT_URI}&response_type=code&scope=openid email profile&state=${encodeURIComponent(state)}`;
    // window.location.href = googleAuthUrl;
  };
  return (
    <Box key="s4" sx={{ animation: `${fadeSlide} 0.32s ease both` }}>
      <Typography
        sx={{ fontSize: 28, fontWeight: 500, color: "#000", mb: "11px" }}
      >
        Complete sign up
      </Typography>
      <Typography sx={{ fontSize: 14, color: "#888", lineHeight: 1.6, mb: 3 }}>
        Well done, your digital business card is looking great. Access your card
        by completing the sign up below. Welcome to Weana!
      </Typography>
      <Stack
        sx={{
          gap: 1.2,
          mb: 2.5,
        }}
      >
        {[
          {
            icon: <GoogleIcon />,
            label: "Continue with Google",
            onClick: handleGoogleSignup,
          },
          {
            icon: <MicrosoftIcon />,
            label: "Continue with Microsoft",
            onClick: () => console.log("Microsoft login clicked"),
          },
          {
            icon: <LockOutlinedIcon sx={{ fontSize: 17, color: "#888" }} />,
            label: "Continue with SSO",
            onClick: () => console.log("SSO login clicked"),
          },
          {
            icon: <AppleIcon sx={{ fontSize: 18, color: "#1A1A3E" }} />,
            label: "Continue with Apple",
            onClick: () => console.log("Apple login clicked"),
          },
        ].map(({ icon, label, onClick }) => (
          <SocialBtn key={label} fullWidth startIcon={icon} onClick={onClick}>
            {label}
          </SocialBtn>
        ))}
      </Stack>
      <Divider
        sx={{ mb: 2.5, "&::before, &::after": { borderColor: "#E0DEF0" } }}
      >
        <Typography
          sx={{ fontSize: 12, color: "#BBBBCC", px: 1, fontWeight: 500 }}
        >
          OR
        </Typography>
      </Divider>
      <FieldRow label="Email">
        <RoundedTextField
          fullWidth
          autoFocus
          placeholder="Enter your email"
          type="email"
          value={form.email}
          onChange={(e) => onChange("email", e.target.value)}
        />
      </FieldRow>
      <FieldRow label="Password">
        <RoundedTextField
          fullWidth
          placeholder="Password"
          type={showPassword ? "text" : "password"}
          value={form.password}
          onChange={(e) => onChange("password", e.target.value)}
          slotProps={{
            input: {
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    onClick={() => setShowPassword((p) => !p)}
                    size="small"
                    sx={{ color: "#BBBBCC", mr: 0.5 }}
                  >
                    {showPassword ? (
                      <VisibilityOffOutlinedIcon sx={{ fontSize: 18 }} />
                    ) : (
                      <VisibilityOutlinedIcon sx={{ fontSize: 18 }} />
                    )}
                  </IconButton>
                </InputAdornment>
              ),
            },
          }}
        />
      </FieldRow>
      <Typography
        sx={{ fontSize: 11.5, color: "#AAAACC", mt: -1, lineHeight: 1.6 }}
      >
        {`By signing up, you agree to Weana's`}{" "}
        <Box
          component="span"
          sx={{
            color: "#7B5EA7",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Terms of Service
        </Box>{" "}
        and{" "}
        <Box
          component="span"
          sx={{
            color: "#7B5EA7",
            cursor: "pointer",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          Privacy Policy
        </Box>
      </Typography>
    </Box>
  );
};

// ─── Main Component ───────────────────────────────────────────────────────────
interface MyselfSignUpViewProps {
  onBack: () => void;
}

export default function MyselfSignUpView({ onBack }: MyselfSignUpViewProps) {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const [screen, setScreen] = useState<ScreenState>("wizard");
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormData>({
    type: "self",
    name: "",
    job_title: "",
    company: "",
    email: "",
    mobile: "",
    additional_email: "",
    password: "",
    recommended_links: [],
  });
  const [register, { isLoading }] = useRegisterMutation();
  const [errors, setErrors] = useState<Record<string, string>>({});

  const onChange = (key: keyof FormData, value: string) =>
    setForm((prev) => ({ ...prev, [key]: value }));

  const canContinue = isValid(currentStep, form);

  const handleBack = () => {
    if (currentStep === 1) onBack();
    else setCurrentStep((s) => s - 1);
  };
  const selfSignUp = async () => {
    try {
      setLoading(true);

      const payload: any = { ...form, type: "self" };

      if (!payload.mobile) delete payload.mobile;
      if (!payload.additional_email) delete payload.additional_email;
      if (!payload.recommended_links) delete payload.recommended_links;

      const res = await register(payload).unwrap();

      enqueueSnackbar(res?.message || "OTP sent successfully", {
        variant: "success",
      });
    } catch (err: any) {
      if (err?.status === 400) {
        enqueueSnackbar(err?.data?.message || "Something went wrong", {
          variant: "error",
        });
      }

      if (err?.errors) {
        setErrors(err.errors);
      }
    } finally {
      setLoading(false);
    }
  };
  const handleContinue = async () => {
    if (!canContinue) return;
    if (currentStep < TOTAL_STEPS - 1) {
      setCurrentStep((s) => s + 1);
    } else if (currentStep === TOTAL_STEPS) {
      // setLoading(true);
      // TODO: dispatch RTK Query register mutation
      // await new Promise((r) => setTimeout(r, 1000));
      // setLoading(false);
      setCurrentStep(TOTAL_STEPS);
      setScreen("verify"); // ← go to OTP screen
    } else if (currentStep === TOTAL_STEPS - 1) {
      await selfSignUp();
      // setCurrentStep((s) => s + 1);
    }
  };

  const topBar = (showStepper = true) => (
    <TopBar>
      <Image
        src="/images/logo.png"
        alt="logo"
        width={100}
        height={20}
        priority
      />

      {showStepper && (
        <Stack
          sx={{
            flexDirection: "row",
            alignItems: "center",
            gap: 3,
          }}
        >
          <StepIndicator
            current={screen === "verify" ? TOTAL_STEPS : currentStep}
          />

          <Typography
            sx={{
              fontSize: 12,
              color: "#4F4F4F",
              fontWeight: 500,
              whiteSpace: "nowrap",
            }}
          >
            {screen === "verify" ? TOTAL_STEPS : currentStep} of {TOTAL_STEPS}
          </Typography>
        </Stack>
      )}
    </TopBar>
  );

  // ── Success ──
  if (screen === "success")
    return (
      <PageWrapper>
        {topBar(false)}
        <SuccessScreen onLogin={() => router.push("/login")} />
      </PageWrapper>
    );

  // ── OTP Verify ──
  if (screen === "verify")
    return (
      <PageWrapper>
        {topBar(true)}
        <VerifyEmailScreen
          onVerified={() => setScreen("success")}
          onRestart={() => {
            setScreen("wizard");
            setCurrentStep(4);
          }}
        />
      </PageWrapper>
    );

  // ── Wizard steps 1–4 ──
  return (
    <PageWrapper
      onKeyDown={(e) => e.key === "Enter" && canContinue && handleContinue()}
    >
      {topBar(true)}

      {/* Step 1 — offset right, single column */}
      {currentStep === 1 && (
        <Box
          sx={{
            flex: 1,
            display: "flex",
            alignItems: "center",
            pl: { xs: "6%", sm: "30%" },
            pr: { xs: "6%", sm: "8%" },
            pb: "80px",
          }}
        >
          <Box
            key="step1"
            sx={{
              width: "100%",
              maxWidth: 490,
              animation: `${fadeSlide} 0.32s ease both`,
            }}
          >
            <Typography
              sx={{ fontSize: 28, fontWeight: 500, color: "#000", mb: "11px" }}
            >
              {`Let's get started`}
            </Typography>
            <Typography
              sx={{
                fontSize: 12,
                fontWeight: 500,
                color: "#818181",
                lineHeight: "100%",
                mb: "43px",
              }}
            >
              {`Create your Weana digital business card in 3 simple steps. Let's
              start with your name`}
            </Typography>
            <Typography
              sx={{
                fontSize: 13,
                fontWeight: 500,
                color: "#1E1E3E",
                mb: "8px",
              }}
            >
              Full Name
            </Typography>
            <PillTextField
              fullWidth
              autoFocus
              value={form.name}
              onChange={(e) => onChange("name", e.target.value)}
            />
            <Box
              sx={{
                display: "flex",
                justifyContent: "flex-end",
                gap: 1.5,
                mt: 5,
              }}
            >
              <BackBtn
                onClick={handleBack}
                startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
              >
                Back
              </BackBtn>
              <ContinueBtn
                onClick={handleContinue}
                disabled={!canContinue}
                endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
              >
                Continue
              </ContinueBtn>
            </Box>
          </Box>
        </Box>
      )}

      {/* Steps 2–4 — two column with card preview */}
      {currentStep > 1 && (
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            alignItems: "center",
            px: { xs: "4%", sm: "8%" },
            pb: "100px",
            gap: 6,
          }}
        >
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <CardPreview form={form} />
          </Box>
          <Box sx={{ maxWidth: 500 }}>
            {currentStep === 2 && (
              <Step2Fields form={form} onChange={onChange} />
            )}
            {currentStep === 3 && (
              <Step3Fields form={form} onChange={onChange} />
            )}
            {currentStep === 4 && (
              <Step4Fields form={form} onChange={onChange} />
            )}
          </Box>
        </Box>
      )}

      {/* Nav buttons for steps 2–4 */}
      {currentStep > 1 && (
        <Box
          sx={{
            position: "fixed",
            bottom: 40,
            right: 60,
            display: "flex",
            gap: 1.5,
            zIndex: 10,
          }}
        >
          <BackBtn
            onClick={handleBack}
            startIcon={<ArrowBackIcon sx={{ fontSize: 15 }} />}
          >
            Back
          </BackBtn>
          <ContinueBtn
            onClick={handleContinue}
            disabled={!canContinue || loading}
            endIcon={<ArrowForwardIcon sx={{ fontSize: 15 }} />}
          >
            {loading
              ? "Creating account…"
              : currentStep === TOTAL_STEPS
                ? "Finish"
                : "Continue"}
            {currentStep} - {TOTAL_STEPS}
          </ContinueBtn>
        </Box>
      )}
    </PageWrapper>
  );
}

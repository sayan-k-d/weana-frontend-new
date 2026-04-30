'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Box,
  Typography,
  Radio,
  Stack,
  useTheme,
  useMediaQuery,
  Button,
  TextField,
  InputAdornment,
  IconButton,
  CircularProgress,
  Divider
} from '@mui/material';
import { styled, keyframes } from '@mui/material/styles';
import Image from 'next/image';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import AppleIcon from '@mui/icons-material/Apple';
import StarIcon from '@mui/icons-material/Star';
import StarHalfIcon from '@mui/icons-material/StarHalf';
import MyselfSignUpView from './selfSignup';
import { FormErrors, FormState } from '@/types';
import { useRegisterMutation } from '@/services/baseApi';
import { useSnackbar } from 'notistack';
import { useAuth } from '@/hooks/useAuth';

const fadeUp = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`;

const PageWrapper = styled(Box)({
  minHeight: '100vh',
  width: '100vw',
  display: 'flex',
  overflowX: 'hidden',
  background: '#FFFFFF',
});

const LeftPane = styled(Box)(({ theme }) => ({
  flex: '0 0 50%',
  width: '50%',
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'center',
  alignItems: 'center',
  position: 'relative',
  zIndex: 2,
  background: '#DDD4E5',
  padding: theme.spacing(4),
}));

const RightPane = styled(Box)(({ theme }) => ({
  flex: '0 0 50%',
  width: '50%',
  background: '#DDD4E5',
  position: 'relative',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  // On smaller tablets/mobile, you might want to hide this or stack it
  [theme.breakpoints.down('md')]: {
    display: 'none',
  },
}));

const FormContent = styled(Box)(({ theme }) => ({
  width: '100%',
  marginTop: "10%",
  // Dynamic width: large on 1280px+, scales down for small laptops
  maxWidth: '520px',
  [theme.breakpoints.down('lg')]: {
    maxWidth: '420px',
  },
  animation: `${fadeUp} 0.6s ease`,
}));

const OptionCard = styled(Box, {
  shouldForwardProp: (p) => p !== 'selected',
})<{ selected: boolean }>(({ selected }) => ({
  display: 'flex',
  alignItems: 'center',
  gap: 16,
  padding: '12px 20px',
  borderRadius: 16,
  border: selected ? '2px solid #2BC3EE' : '1px solid #E5E7EB',
  background: '#FFFFFF',
  cursor: 'pointer',
  transition: 'all 0.2s ease-in-out',
  '&:hover': {
    borderColor: '#2BC3EE',
    transform: 'translateY(-1px)',
  },
}));

const SocialButton = styled(Button)({
  borderRadius: 32,
  padding: '11px 16px',
  fontSize: 13.5,
  fontWeight: 500,
  textTransform: 'none',
  color: '#2D2D4E',
  border: '1.5px solid #EBEBEB',
  background: '#FFFBFB',
  justifyContent: 'center',
  gap: 10,
  letterSpacing: 0.1,
  '&:hover': {
    background: '#FAFAFA',
    borderColor: '#C8C8DC',
  },
});

const StyledTextField = styled(TextField)({
  '& .MuiOutlinedInput-root': {
    borderRadius: 10,
    background: '#FFFFFF',
    fontSize: 14,
    color: '#1A1A3E',
    '& fieldset': {
      borderColor: 'rgba(200,198,228,0.5)',
      borderWidth: 1.5,
    },
    '&:hover fieldset': {
      borderColor: '#9B99C8',
    },
    '&.Mui-focused fieldset': {
      borderColor: '#E8453C',
      borderWidth: 2,
    },
    '& input': {
      padding: '13px 16px',
      '&::placeholder': { color: '#BBBBCC', opacity: 1 },
    },
  },
});

const SignUpButton = styled(Button)({
  background: '#F05B47',
  color: '#fff',
  borderRadius: 32,
  padding: '13px',
  fontSize: 15,
  fontWeight: 600,
  textTransform: 'none',
  boxShadow: 'none',
  letterSpacing: 0.2,
  '&:hover': {
    background: '#C93530',
    boxShadow: '0 6px 20px rgba(232,69,60,0.32)',
  },
  '&:disabled': {
    background: '#f0a09c',
    color: '#fff',
  },
});

const ReviewPlatforms = () => (
  <Stack
    sx={{
      flexDirection: 'row',
      alignItems: 'center',
      gap: 1,
    }}
  >
    {/* App Store */}
    <Box component="svg" width={20} height={20} viewBox="0 0 20 20">
      <rect width="20" height="20" rx="5" fill="#0D96F6" />
      <path
        d="M10 4l1.5 3h3l-2.5 2 1 3L10 10.5 7 12l1-3L5.5 7h3z"
        fill="#fff"
      />
    </Box>

    {/* G2 */}
    <Box
      sx={{
        width: 22,
        height: 20,
        background: '#FF492C',
        borderRadius: 1,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        sx={{
          fontSize: 9,
          fontWeight: 800,
          color: '#fff',
          letterSpacing: -0.3,
        }}
      >
        G2
      </Typography>
    </Box>

    {/* Capterra-style arrow */}
    <Box component="svg" width={20} height={20} viewBox="0 0 20 20">
      <polygon points="10,2 18,10 10,18 2,10" fill="#55C5C8" />
      <polygon points="10,2 18,10 10,10" fill="#E54747" />
    </Box>

    {/* Star outline */}
    <StarIcon sx={{ fontSize: 18, color: '#F5A623' }} />
  </Stack>
);

const GoogleIcon = () => (
  <Box component="svg" width={18} height={18} viewBox="0 0 18 18" sx={{ flexShrink: 0 }}>
    <path d="M17.64 9.2c0-.637-.057-1.251-.164-1.84H9v3.481h4.844c-.209 1.125-.843 2.078-1.796 2.717v2.258h2.908c1.702-1.567 2.684-3.875 2.684-6.615z" fill="#4285F4" />
    <path d="M9 18c2.43 0 4.467-.806 5.956-2.184l-2.908-2.258c-.806.54-1.837.86-3.048.86-2.344 0-4.328-1.584-5.036-3.711H.957v2.332A8.997 8.997 0 0 0 9 18z" fill="#34A853" />
    <path d="M3.964 10.707A5.41 5.41 0 0 1 3.682 9c0-.593.102-1.17.282-1.707V4.961H.957A8.996 8.996 0 0 0 0 9c0 1.452.348 2.827.957 4.039l3.007-2.332z" fill="#FBBC05" />
    <path d="M9 3.58c1.321 0 2.508.454 3.44 1.345l2.582-2.58C13.463.891 11.426 0 9 0A8.997 8.997 0 0 0 .957 4.961L3.964 6.293C4.672 4.166 6.656 3.58 9 3.58z" fill="#EA4335" />
  </Box>
);

const MicrosoftIcon = () => (
  <Box component="svg" width={18} height={18} viewBox="0 0 18 18" sx={{ flexShrink: 0 }}>
    <rect x="0" y="0" width="8.5" height="8.5" fill="#F25022" />
    <rect x="9.5" y="0" width="8.5" height="8.5" fill="#7FBA00" />
    <rect x="0" y="9.5" width="8.5" height="8.5" fill="#00A4EF" />
    <rect x="9.5" y="9.5" width="8.5" height="8.5" fill="#FFB900" />
  </Box>
);

interface TeamSignUpViewProps {
  onBack: () => void;
}

export default function Signup() {
  const [accountType, setAccountType] = useState<'team' | 'self' | ''>('');
  const theme = useTheme();
  const isSmallLaptop = useMediaQuery(theme.breakpoints.down('lg'));
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState<FormState>({ type: '', email: '', password: '' });
  const [errors, setErrors] = useState<FormErrors>({});
  const [register, { isLoading }] = useRegisterMutation();
  const { enqueueSnackbar } = useSnackbar();
  const { login } = useAuth();
  const validate = (values: FormState): FormErrors => {
    const errors: FormErrors = {};

    if (!values.email) {
      errors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(values.email)) {
      errors.email = "Invalid email format";
    }

    if (!values.password) {
      errors.password = "Password is required";
    } else if (values.password.length < 6) {
      errors.password = "Password must be at least 6 characters";
    }

    return errors;
  };
  const teamSignUp = async () => {
    const validationErrors = validate(form);
    console.log("validationErrors", validationErrors);
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      try {
        setLoading(true);
        const res = await register(form).unwrap();

        console.log("SUCCESS:", res);
        enqueueSnackbar(res?.message || "OTP sent successfully", {
          variant: "success",
        });
      } catch (err: any) {
        console.log("ERROR:", err);
        if (err?.status == 400) {
          enqueueSnackbar(err?.data?.message || "Something went wrong", {
            variant: "error",
          });
        }
        // backend validation errors
        if (err?.errors) {
          setErrors(err.errors);
        } else {
          // alert(err?.message || "Something went wrong");
        }
      }
      finally {
        setLoading(false);
      }
      console.log("Valid form:", form);
    }
  }
  const handleSignUp = async () => {
    console.log("accountType", accountType);

    // setLoading(true);
    if (accountType == "team") {
      await teamSignUp();
    }
    // TODO: dispatch RTK Query register mutation
    // await new Promise((r) => setTimeout(r, 1200));

  };

  const handleSelection = (type: 'team' | 'self') => {
    setAccountType(type);
    setForm({ ...form, type: type })
  };

  const handleBack = () => {
    setAccountType('');
  };

  return (
    <PageWrapper>
      {accountType === '' ? (
        <LeftPane>
          {/* Logo - Adjusts position based on screen size */}
          <Box sx={{ position: 'absolute', top: { xs: 30, lg: 50 }, left: { xs: 30, lg: 60 } }}>
            <Image src="/images/logo.png" alt="logo" width={100} height={20} priority />
          </Box>

          <FormContent>
            <Typography
              variant="h1"
              sx={{
                // Fluid Typography: 45px on large, 32px on small laptops
                fontSize: { xs: '28px', md: '36px', lg: '45px' },
                fontWeight: 800,
                color: '#023652',
                lineHeight: "120%",
                mb: { xs: 2, lg: 4 },
                mt: { xs: 4, lg: 0 }
              }}
            >
              Weana helps you collect and share business info
            </Typography>

            <Typography sx={{
              fontSize: '14px',
              fontWeight: 600,
              color: '#555',
              mb: 2,
              mt: { xs: 4, lg: '105px' }
            }}>
              Who will be using Weana?
            </Typography>

            <Stack spacing={2}>
              <OptionCard selected={false} onClick={() => handleSelection('team')}>
                {/* <OptionCard selected={accountType === 'team'} onClick={() => { setAccountType('team'); setIsTeam(true); setIsSelf(false); }}> */}
                <Image src="/images/team.png" alt="team" width={isSmallLaptop ? 60 : 81} height={isSmallLaptop ? 60 : 81} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1A1A3E' }}>My Team</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#888', lineHeight: 1.4 }}>
                    Set up your team and start capturing leads.
                  </Typography>
                </Box>
                <Radio checked={false} sx={{ color: "#2BC3EE", '&.Mui-checked': { color: "#2BC3EE" } }} />
              </OptionCard>

              <OptionCard selected={false} onClick={() => handleSelection('self')}>
                <Image src="/images/single.png" alt="myself" width={isSmallLaptop ? 60 : 81} height={isSmallLaptop ? 60 : 81} />
                <Box sx={{ flex: 1 }}>
                  <Typography sx={{ fontSize: '14px', fontWeight: 700, color: '#1A1A3E' }}>Myself</Typography>
                  <Typography sx={{ fontSize: '12px', color: '#888', lineHeight: 1.4 }}>
                    Create a free digital business card.
                  </Typography>
                </Box>
                <Radio checked={false} sx={{ color: "#2BC3EE", '&.Mui-checked': { color: "#2BC3EE" } }} />
              </OptionCard>
            </Stack>

            <Typography sx={{ fontSize: '13px', color: '#023652', fontWeight: "500", textAlign: 'center', mt: 4 }}>
              Already use Weana?{' '}
              <Button onClick={() => { login('keycloak') }} style={{ color: '#2BC3EE', fontWeight: 600, textDecoration: 'none' }}>
                Login
              </Button>
            </Typography>
          </FormContent>
        </LeftPane>
      ) :
        accountType === 'self' ? <MyselfSignUpView onBack={handleBack} /> : (
          <LeftPane>
            <Box key={accountType} sx={{ animation: `${fadeUp} 0.4s ease` }}>
              <Button
                startIcon={<ArrowBackIcon sx={{ fontSize: 16 }} />}
                onClick={handleBack}
                sx={{
                  color: '#818181',
                  fontWeight: 400,
                  fontSize: 15,
                  textTransform: 'none',
                  p: 0,
                  mb: 4,
                  alignSelf: 'flex-start',
                  '&:hover': { background: 'transparent', color: '#818181' },
                }}
              >
                Back
              </Button>

              <Typography
                sx={{
                  fontSize: 38,
                  fontWeight: 800,
                  color: '#1A1A3E',
                  lineHeight: 1.2,
                  mb: 2,
                  letterSpacing: -0.5,
                }}
              >
                Sign up for Weana Teams
              </Typography>

              <Typography
                sx={{
                  fontSize: 15,
                  color: '#555',
                  lineHeight: 1.6,
                  mb: 2.5,
                  maxWidth: 480,
                }}
              >
                Join millions of professionals using Weana to capture more leads at events, conferences, and beyond
              </Typography>

              <Stack
                sx={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 4,
                }}
              >
                <Stack
                  sx={{
                    flexDirection: 'row',
                    gap: 0.3,
                  }}
                >
                  {[1, 2, 3, 4].map((i) => (
                    <StarIcon key={i} sx={{ fontSize: 18, color: '#35C4ED' }} />
                  ))}
                  <StarHalfIcon sx={{ fontSize: 18, color: '#35C4ED' }} />
                </Stack>

                <Typography sx={{ fontSize: 13, color: '#555' }}>
                  Based on{' '}
                  <Box component="span" sx={{ fontWeight: 700, color: '#1A1A3E' }}>
                    50,000+ reviews
                  </Box>{' '}
                  from
                </Typography>

                <ReviewPlatforms />
              </Stack>

              <Box sx={{ mb: 2.5 }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#1A1A3E',
                    mb: 0.8,
                  }}
                >
                  Email
                </Typography>

                <StyledTextField
                  fullWidth
                  placeholder="Email"
                  type="email"
                  value={form.email}
                  onChange={(e) =>
                    setForm({ ...form, email: e.target.value })
                  }
                  error={!!errors.email}
                  helperText={errors.email}
                />
              </Box>

              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{
                    fontSize: 13,
                    fontWeight: 600,
                    color: '#1A1A3E',
                    mb: 0.8,
                  }}
                >
                  Password
                </Typography>

                <StyledTextField
                  fullWidth
                  placeholder="Password"
                  type={showPassword ? 'text' : 'password'}
                  value={form.password}
                  onChange={(e) =>
                    setForm({ ...form, password: e.target.value })
                  }
                  error={!!errors.password}
                  helperText={errors.password}
                  slotProps={{
                    input: {
                      endAdornment: (
                        <InputAdornment position="end">
                          <IconButton
                            onClick={() => setShowPassword(!showPassword)}
                            edge="end"
                            size="small"
                            sx={{ color: '#BBBBCC', mr: 0.5 }}
                          >
                            {showPassword ? (
                              <VisibilityOffOutlinedIcon
                                sx={{ fontSize: 18, color: '#AAA9A9' }}
                              />
                            ) : (
                              <VisibilityOutlinedIcon
                                sx={{ fontSize: 18, color: '#AAA9A9' }}
                              />
                            )}
                          </IconButton>
                        </InputAdornment>
                      ),
                    },
                  }}
                />
              </Box>

              {/* Sign Up button */}
              <SignUpButton fullWidth onClick={handleSignUp} disabled={loading}>
                {loading
                  ? <CircularProgress size={20} sx={{ color: '#fff' }} />
                  : 'Sign Up'
                }
              </SignUpButton>

              {/* OR divider */}
              <Divider sx={{ my: 2.5, '&::before, &::after': { borderColor: '#E0DFF0' } }}>
                <Typography sx={{ fontSize: 12, color: '#BBBBCC', px: 1, fontWeight: 500 }}>OR</Typography>
              </Divider>

              {/* Social buttons */}
              <Stack spacing={1.2}>
                <SocialButton fullWidth startIcon={<GoogleIcon />}>
                  Continue with Google
                </SocialButton>
                <SocialButton fullWidth startIcon={<MicrosoftIcon />}>
                  Continue with Microsoft
                </SocialButton>
                <SocialButton
                  fullWidth
                  startIcon={<LockOutlinedIcon sx={{ fontSize: 17, color: '#888' }} />}
                >
                  Continue with SSO
                </SocialButton>
                <SocialButton
                  fullWidth
                  startIcon={<AppleIcon sx={{ fontSize: 18, color: '#1A1A3E' }} />}
                >
                  Continue with Apple
                </SocialButton>
              </Stack>

              {/* Login link */}
              <Typography sx={{ fontSize: 13, color: '#333333', fontWeight: 500, textAlign: 'center', mt: 3 }}>
                Already use Weana?{' '}
                <Button onClick={() => { login('keycloak') }} style={{ color: '#35C4ED', fontWeight: 500, textDecoration: 'none' }}>
                  Login
                </Button>
              </Typography>
            </Box>
          </LeftPane>
        )}

      {accountType !== 'self' && <RightPane>
        {/* Flower - Scaled using percentages to stay in corner */}
        <Box sx={{ position: 'absolute', top: '-100px', right: '-110px', width: '60%', maxWidth: '380px' }}>
          <Image src="/images/create_account_flower.png" alt="flower" width={380} height={380} layout="responsive" />
        </Box>

        {/* Hero Image - Responsive Container */}
        <Box sx={{ position: 'relative', zIndex: 1, width: '70%', maxWidth: '400px', mb: 15 }}>
          <Image
            src="/images/create_screen_img.png"
            alt="UI Preview"
            width={364}
            height={426}
            layout="responsive"
            style={{ filter: 'drop-shadow(0 20px 40px rgba(0,0,0,0.1))' }}
          />
        </Box>

        {/* Trusted By Section - Fluid spacing */}
        <Box
          sx={{
            position: 'absolute',
            bottom: 30,
            width: '100%',
            textAlign: 'center',
          }}
        >
          <Typography
            sx={{
              fontSize: '16px',
              color: '#023652',
              fontWeight: 600,
              mb: 2,
            }}
          >
            TRUSTED BY
          </Typography>

          <Stack
            sx={{
              flexDirection: 'column',
              gap: 2,
              alignItems: 'center',
            }}
          >
            <Stack
              sx={{
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Image src="/images/tesla_dark.png" alt="tesla" width={120} height={12} />
              <Image src="/images/hubSpot_dark.png" alt="hubspot" width={80} height={23} />
              <Image src="/images/jpMorgan_dark.png" alt="jpmorgan" width={80} height={16} />
            </Stack>

            <Stack
              sx={{
                flexDirection: 'row',
                gap: 4,
                alignItems: 'center',
              }}
            >
              <Image src="/images/hilton_dark.png" alt="hilton" width={80} height={30} />
              <Image src="/images/eagle_dark.png" alt="eagle" width={50} height={50} />
            </Stack>
          </Stack>
        </Box>
      </RightPane>
      }
    </PageWrapper >
  );
}
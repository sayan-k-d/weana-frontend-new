'use client';

import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Footer from '@/components/layout/Footer';
import MarketingHeader from '@/components/layout/MarketingHeader';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    background: '#fff',
    fontSize: 14,
    '& fieldset': { borderColor: '#E4E8EF' },
  },
  '& .MuiInputLabel-root': { fontSize: 14, color: '#5A6578' },
};

const faqData: { category: string; items: { q: string; a: string }[] }[] = [
  {
    category: 'Weana Products',
    items: [
      {
        q: 'What is included with my Weana smart card?',
        a: 'Each card includes NFC tap and QR code sharing, a digital profile you can update anytime, and access to the Weana app to manage your links and analytics.',
      },
      {
        q: 'Do I need an app to use my card?',
        a: 'Recipients can open your profile in the browser without installing anything. The Weana app is optional and recommended if you want to edit your profile on the go.',
      },
      {
        q: 'What materials are the cards made from?',
        a: 'We offer several finishes including PVC and premium metal options. Material details are listed on each product page before checkout.',
      },
      {
        q: 'Are Weana cards compatible with all phones?',
        a: 'NFC works with most modern smartphones. Older devices can still scan the QR code printed on your card.',
      },
      {
        q: 'Can I update my profile after purchase?',
        a: 'Yes. Log in to your Weana account to change links, contact details, and branding whenever you need.',
      },
      {
        q: 'How do I activate my card?',
        a: 'After delivery, sign in and follow the activation steps in your dashboard. The process usually takes under a minute.',
      },
      {
        q: 'Is there a warranty?',
        a: 'We cover manufacturing defects. See our terms for the full warranty period and claim process.',
      },
      {
        q: 'Can I order cards for my whole team?',
        a: 'Yes. Contact sales or use bulk ordering options where available for team and company deployments.',
      },
    ],
  },
  {
    category: 'Shipping',
    items: [
      {
        q: 'How long does delivery take?',
        a: 'Standard shipping typically takes a few business days depending on your region. Express options may be available at checkout.',
      },
      {
        q: 'Do you ship internationally?',
        a: 'We ship to many countries. Available destinations and fees are shown during checkout.',
      },
      {
        q: 'How can I track my order?',
        a: 'Once your order ships, you will receive an email with a tracking link. You can also view status in your account orders page.',
      },
    ],
  },
  {
    category: 'Custom Product',
    items: [
      {
        q: 'How does the custom design process work?',
        a: 'Choose a base product, upload or describe your artwork, and our team reviews it for print readiness. You will see a preview before production.',
      },
      {
        q: 'Which file formats do you accept?',
        a: 'We commonly accept PDF, SVG, and Adobe Illustrator (AI) files. High-resolution PNG can work for simpler layouts—check the upload guidelines in your order.',
      },
    ],
  },
  {
    category: 'Weana Profile',
    items: [
      {
        q: 'How do I update my public profile?',
        a: 'Sign in, open Profile settings, and save your changes. Updates are reflected instantly for anyone who scans your card.',
      },
      {
        q: 'Who do I contact for account issues?',
        a: 'Use the contact form on this page or email support. Include your registered email so we can help faster.',
      },
      {
        q: 'Can I transfer my profile to a new card?',
        a: 'In most cases, yes. Reach out to support with your old and new card details and we will guide you through the steps.',
      },
    ],
  },
];

export default function SupportPage() {
  return (
    <Box sx={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MarketingHeader />

      <Box sx={{ px: { xs: 2, md: 6 }, pt: { xs: 4, md: 5 }, pb: { xs: 2, md: 3 } }}>
        <Container maxWidth="xl">
          <Box sx={{ textAlign: 'center', maxWidth: 720, mx: 'auto' }}>
            <Typography sx={{ fontSize: { xs: 34, md: 48 }, fontWeight: 800, color: '#131E32', lineHeight: 1.15, mb: 1.5 }}>
              Help &amp; Support
            </Typography>
            <Typography sx={{ fontSize: { xs: 15, md: 17 }, color: '#7A8596', lineHeight: 1.5 }}>
              Answers to common questions and quick solutions
            </Typography>
          </Box>
        </Container>
      </Box>

      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 2, md: 4 } }}>
        <Container maxWidth="md">
          <Stack spacing={4}>
            {faqData.map((section) => (
              <Box key={section.category}>
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#7D4AC7', mb: 1.5 }}>{section.category}</Typography>
                <Box sx={{ borderTop: '1px solid #E8EDF3' }}>
                  {section.items.map((item) => (
                    <Accordion
                      key={item.q}
                      disableGutters
                      elevation={0}
                      sx={{
                        border: 'none',
                        borderBottom: '1px solid #E8EDF3',
                        '&:before': { display: 'none' },
                        background: 'transparent',
                      }}
                    >
                      <AccordionSummary
                        expandIcon={<ExpandMoreIcon sx={{ color: '#3A4457' }} />}
                        sx={{
                          px: 0,
                          py: 1,
                          minHeight: 52,
                          '& .MuiAccordionSummary-content': { my: 1 },
                        }}
                      >
                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1A2436', pr: 2 }}>{item.q}</Typography>
                      </AccordionSummary>
                      <AccordionDetails sx={{ px: 0, pt: 0, pb: 2.5 }}>
                        <Typography sx={{ fontSize: 14, color: '#5A6578', lineHeight: 1.6 }}>{item.a}</Typography>
                      </AccordionDetails>
                    </Accordion>
                  ))}
                </Box>
              </Box>
            ))}
          </Stack>
        </Container>
      </Box>

      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 5 }, pb: { xs: 5, md: 7 } }}>
        <Container maxWidth="xl">
          <Box
            sx={{
              border: '1px solid #E8EDF3',
              borderRadius: 2.5,
              p: { xs: 2.5, md: 4 },
              background: '#FAFBFC',
            }}
          >
            <Grid container spacing={{ xs: 3, md: 5 }}>
              <Grid size={{ xs: 12, md: 5 }}>
                <Typography sx={{ fontSize: { xs: 26, md: 32 }, fontWeight: 800, color: '#131E32', mb: 1 }}>
                  Let&apos;s get in touch
                </Typography>
                <Typography sx={{ fontSize: 15, color: '#7A8596', mb: 3, lineHeight: 1.5 }}>Don&apos;t be afraid to say hello with us!</Typography>

                <Stack spacing={2.5}>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(240, 91, 79, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <EmailOutlinedIcon sx={{ color: '#F05B4F', fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#131E32', mb: 0.3 }}>Email</Typography>
                      <Typography sx={{ fontSize: 14, color: '#5A6578' }}>support@weana.com</Typography>
                    </Box>
                  </Stack>
                  <Stack direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                    <Box
                      sx={{
                        width: 44,
                        height: 44,
                        borderRadius: 1.5,
                        bgcolor: 'rgba(240, 91, 79, 0.12)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        flexShrink: 0,
                      }}
                    >
                      <PhoneOutlinedIcon sx={{ color: '#F05B4F', fontSize: 22 }} />
                    </Box>
                    <Box>
                      <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#131E32', mb: 0.3 }}>Phone</Typography>
                      <Typography sx={{ fontSize: 14, color: '#5A6578' }}>+1 (555) 000-0000</Typography>
                    </Box>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1.2} sx={{ mt: 3 }}>
                  {[
                    { bg: '#1E5ADB', label: 'f' },
                    { bg: '#1DA1F2', label: 'X' },
                    { bg: '#E1268F', label: 'ig' },
                    { bg: '#0A66C2', label: 'in' },
                  ].map((s) => (
                    <Box
                      key={s.label}
                      sx={{
                        width: 36,
                        height: 36,
                        borderRadius: '50%',
                        bgcolor: s.bg,
                        color: '#fff',
                        fontSize: 12,
                        fontWeight: 700,
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                      }}
                    >
                      {s.label}
                    </Box>
                  ))}
                </Stack>
              </Grid>

              <Grid size={{ xs: 12, md: 7 }}>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#131E32', mb: 2.5 }}>Contact Us</Typography>
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Name" placeholder="Your name" sx={fieldSx} />
                  </Grid>
                  <Grid size={{ xs: 12, sm: 6 }}>
                    <TextField fullWidth label="Email" type="email" placeholder="Your email" sx={fieldSx} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <FormControl fullWidth sx={fieldSx}>
                      <InputLabel id="support-inquiry-label">What is your inquiry regarding?</InputLabel>
                      <Select labelId="support-inquiry-label" label="What is your inquiry regarding?" defaultValue="">
                        <MenuItem value="" disabled>
                          Select a topic
                        </MenuItem>
                        <MenuItem value="order">Order &amp; shipping</MenuItem>
                        <MenuItem value="product">Product question</MenuItem>
                        <MenuItem value="custom">Custom design</MenuItem>
                        <MenuItem value="account">Account &amp; profile</MenuItem>
                        <MenuItem value="other">Other</MenuItem>
                      </Select>
                    </FormControl>
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <TextField fullWidth label="Message" placeholder="How can we help?" multiline minRows={5} sx={fieldSx} />
                  </Grid>
                  <Grid size={{ xs: 12 }}>
                    <Button
                      fullWidth
                      sx={{
                        py: 1.35,
                        borderRadius: 2,
                        textTransform: 'none',
                        fontWeight: 800,
                        fontSize: 15,
                        color: '#fff',
                        background: '#F05B4F',
                        '&:hover': { background: '#E55145' },
                      }}
                    >
                      Send Message
                    </Button>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

'use client';

import { Box, Container, Stack, Typography } from '@mui/material';

const C = {
  coral: '#7B49B1',
  navy: '#1A1A3E',
  muted: '#888',
};

export default function SocialProof({ isHome = false }: { isHome?: boolean }) {
  const logos = ['TESLA', 'J.P.Morgan', 'salesforce', 'Disney', 'Hilton'];
  const loopedLogos = [...logos, ...logos, ...logos, ...logos];

  return (
    <Box
      sx={{
        background: isHome ? '#04030A' : '#fff',
        pt: 0,
        mt: { xs: 0, md: -6 },
        position: 'relative',
        zIndex: 4,
      }}
    >
      <Box
        sx={{
          background: '#fff',
          mt: 0,
          pt: { xs: 4, md: 5 },
          pb: { xs: 5, md: 7 },
          borderRadius: '140px 140px 0 0',
          overflow: 'hidden',
          '@keyframes socialFadeUp': {
            '0%': { opacity: 0, transform: 'translateY(20px)' },
            '100%': { opacity: 1, transform: 'translateY(0)' },
          },
        }}
      >
        <Container maxWidth="lg">
          {/* <Typography sx={{ textAlign: 'center', fontSize: { xs: 30, md: 48 }, fontWeight: 800, color: '#1B1525', pt: { xs: 7.5, md: 12 }, mb: { xs: 4, md: 6 }, lineHeight: 1.16, letterSpacing: '-0.02em', maxWidth: 980, mx: 'auto', animation: 'socialFadeUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both' }}> */}
          <Typography
            sx={{
              // 1. Remove display: flex, use block or inline-block
              display: 'block',
              textAlign: "center", // Centering text naturally
              fontSize: { xs: 30, md: 48 },
              fontWeight: 800,
              color: '#1B1525',
              pt: { xs: 7.5, md: 12 },
              mb: { xs: 4, md: 6 },
              lineHeight: 1.25, // Increased slightly for the pill height
              letterSpacing: '-0.02em',
              maxWidth: 1000, // Constrain width to force the wrap like the image
              mx: 'auto',
              animation: 'socialFadeUp 1.1s cubic-bezier(0.22, 1, 0.36, 1) both'
            }}
          >
            The Technology of choice for{' '}
            <Box
              component="span"
              sx={{
                color: '#fff',
                background: '#6F42B4',
                borderRadius: '12px',
                px: { xs: 1.1, md: 1.6 },
                py: { xs: 0.1, md: 0.2 },
                display: 'inline-flex', // Keeps the pill in line with text
                alignItems: 'center',
                verticalAlign: 'middle', // Aligns pill with text baseline
                mx: 0.5, // Small horizontal gap
                fontSize: '0.9em' // Slightly smaller than main text for aesthetics
              }}
            >
              2M+
            </Box>{' '}
            professionals worldwide.
          </Typography>
          <Box sx={{ overflow: 'hidden', width: '100%', py: 1, '@keyframes logoBreath': { '0%': { opacity: 0.7 }, '50%': { opacity: 1 }, '100%': { opacity: 0.7 } } }}>
            <Stack
              direction="row"
              spacing={{ xs: 3, md: 8 }}
              sx={{
                alignItems: 'center',
                width: 'max-content',
                minWidth: '100%',
                animation: 'social-logo-marquee 12s linear infinite',
                willChange: 'transform',
                transform: 'translate3d(0,0,0)',
                '@keyframes social-logo-marquee': {
                  '0%': { transform: 'translateX(0)' },
                  '100%': { transform: 'translateX(-25%)' },
                },
              }}
            >
              {loopedLogos.map((logo, index) => (
                <Typography key={`${logo}-${index}`} sx={{ fontSize: { xs: 18, md: 44 }, fontWeight: 600, color: '#9B97A9', letterSpacing: logo === 'TESLA' ? 1.5 : 0, whiteSpace: 'nowrap', lineHeight: 1, animation: `logoBreath ${3 + (index % 5) * 0.3}s ease-in-out infinite`, transition: 'transform 340ms ease, color 340ms ease', '&:hover': { transform: 'translateY(-3px)', color: '#7B49B1' } }}>
                  {logo}
                </Typography>
              ))}
            </Stack>
          </Box>
        </Container>
      </Box>
    </Box>
  );
}

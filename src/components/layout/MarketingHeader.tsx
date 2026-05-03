'use client';

import Link from 'next/link';
import Image from 'next/image';
import { Box, Button, Container, Stack, Typography } from '@mui/material';

export const MARKETING_NAV_LINKS = ['Features', 'Products', 'Resources', 'Pricing'];

type MarketingHeaderProps = {
  navLinks?: string[];
};

export default function MarketingHeader({ navLinks = MARKETING_NAV_LINKS }: MarketingHeaderProps) {
  return (
    <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 1.7, md: 2.2 }, borderBottom: '1px solid #F1F3F7' }}>
      <Container maxWidth="xl">
        <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between' }}>
          <Box component={Link} href="/" sx={{ display: 'inline-flex', alignItems: 'center' }}>
            <Image src="/images/logo.png" alt="Weana" width={78} height={18} priority />
          </Box>
          <Stack direction="row" spacing={3.2} sx={{ alignItems: 'center', display: { xs: 'none', md: 'flex' } }}>
            {navLinks.map((link) => (
              <Typography key={link} sx={{ fontSize: 13, color: '#3A4457', fontWeight: 500 }}>
                {link}
              </Typography>
            ))}
          </Stack>
          <Button
            component={Link}
            href="/login"
            sx={{
              minWidth: 0,
              borderRadius: 999,
              px: 2.5,
              py: 0.8,
              fontSize: 12,
              color: '#fff',
              background: '#7D4AC7',
              textTransform: 'none',
              fontWeight: 600,
              '&:hover': { background: '#6D3FB3' },
            }}
          >
            Login / Register
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}

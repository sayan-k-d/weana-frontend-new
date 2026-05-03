'use client';

import Link from 'next/link';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import MarketingHeader from '@/components/layout/MarketingHeader';

const bySlug: Record<string, { name: string; image: string; price: string; oldPrice: string; blurb: string }> = {
  'standard-card': {
    name: 'Standard Card',
    image: '/images/original_card.png',
    price: '$24',
    oldPrice: '$30',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
  'digital-card': {
    name: 'Digital Card',
    image: '/images/dot_card.png',
    price: '$29',
    oldPrice: '$36',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
  'mass-card': {
    name: 'Mass Card',
    image: '/images/premium_card.png',
    price: '$35',
    oldPrice: '$42',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
  'online-store': {
    name: 'Online Store',
    image: '/images/step_1.png',
    price: '$24',
    oldPrice: '$30',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
  card: {
    name: 'Card',
    image: '/images/step_2.png',
    price: '$29',
    oldPrice: '$36',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
  'nighter-new-v4': {
    name: 'Nighter New v4.0',
    image: '/images/step_3.png',
    price: '$35',
    oldPrice: '$42',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
  'starter-deck': {
    name: 'Starter Deck',
    image: '/images/cardImage1.png',
    price: '$24',
    oldPrice: '$30',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
  'team-deck': {
    name: 'Team Deck',
    image: '/images/cardImage2.png',
    price: '$29',
    oldPrice: '$36',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  },
};

export default function ProductDetail({ slug }: { slug: string }) {
  const product = bySlug[slug] ?? {
    name: slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()),
    image: '/images/original_card.png',
    price: '$24',
    oldPrice: '$30',
    blurb: 'NFC + QR enabled, built for modern professionals.',
  };

  return (
    <Box sx={{ background: '#fff', minHeight: '100vh' }}>
      <MarketingHeader />

      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 4 } }}>
        <Container maxWidth="xl">
          <Button component={Link} href="/productpage" sx={{ mb: 2, textTransform: 'none', color: '#7D4AC7', fontWeight: 600 }}>
            ← Back to shop
          </Button>
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ borderRadius: 2.5, background: 'linear-gradient(145deg,#F7F8FB 0%, #ECEFF6 100%)', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
                <Image src={product.image} alt={product.name} width={400} height={260} style={{ width: '100%', maxWidth: 400, height: 'auto', objectFit: 'contain' }} />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 800, color: '#131E32', mb: 1.5 }}>{product.name}</Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#101B2D' }}>{product.price}</Typography>
                <Typography sx={{ fontSize: 16, color: '#A6AFC0', textDecoration: 'line-through' }}>{product.oldPrice}</Typography>
              </Stack>
              <Typography sx={{ fontSize: 15, color: '#5A6578', lineHeight: 1.6, mb: 3 }}>{product.blurb}</Typography>
              <Stack direction="row" spacing={2}>
                <Button component={Link} href="/checkout" sx={{ borderRadius: 999, px: 3, py: 1, textTransform: 'none', fontWeight: 700, color: '#fff', background: '#F05B4F', '&:hover': { background: '#E55145' } }}>
                  Buy now
                </Button>
                <Button component={Link} href="/custom" variant="outlined" sx={{ borderRadius: 999, px: 3, py: 1, textTransform: 'none', fontWeight: 700, borderColor: '#7D4AC7', color: '#7D4AC7' }}>
                  Go custom
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

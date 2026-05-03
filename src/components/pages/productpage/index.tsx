'use client';

import Link from 'next/link';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import MarketingHeader from '@/components/layout/MarketingHeader';

const products = [
  { slug: 'standard-card', name: 'Standard Card', image: '/images/original_card.png', price: '$24', oldPrice: '$30' },
  { slug: 'digital-card', name: 'Digital Card', image: '/images/dot_card.png', price: '$29', oldPrice: '$36' },
  { slug: 'mass-card', name: 'Mass Card', image: '/images/premium_card.png', price: '$35', oldPrice: '$42' },
  { slug: 'online-store', name: 'Online Store', image: '/images/step_1.png', price: '$24', oldPrice: '$30' },
  { slug: 'card', name: 'Card', image: '/images/step_2.png', price: '$29', oldPrice: '$36' },
  { slug: 'nighter-new-v4', name: 'Nighter New v4.0', image: '/images/step_3.png', price: '$35', oldPrice: '$42' },
  { slug: 'starter-deck', name: 'Starter Deck', image: '/images/cardImage1.png', price: '$24', oldPrice: '$30' },
  { slug: 'team-deck', name: 'Team Deck', image: '/images/cardImage2.png', price: '$29', oldPrice: '$36' },
];

export default function ProductPage() {
  return (
    <Box sx={{ background: '#fff', minHeight: '100vh' }}>
      <MarketingHeader />

      <Box sx={{ px: { xs: 2, md: 6 }, pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 }, background: 'linear-gradient(180deg, #EAF5FF 0%, #D8EBFF 100%)' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3.5} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontSize: { xs: 38, md: 58 }, fontWeight: 800, color: '#152338', lineHeight: 1.1 }}>
                Switch to the Next
                <br />
                Generation
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Image src="/images/bnr_2.png" alt="Product hero" width={610} height={280} style={{ width: '100%', maxWidth: 560, height: 'auto' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 4, md: 5 } }}>
        <Container maxWidth="xl">
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: { xs: 2.2, md: 3 } }}>
            <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800, color: '#131E32' }}>Shop</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#7A8596' }}>From $24</Typography>
          </Stack>

          <Grid container spacing={2.2}>
            {products.map((product) => (
              <Grid key={product.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ border: '1px solid #EEF1F6', borderRadius: 2.3, p: 1.4, height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                  <Box sx={{ borderRadius: 1.8, background: 'linear-gradient(145deg,#F7F8FB 0%, #ECEFF6 100%)', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.4 }}>
                    <Image src={product.image} alt={product.name} width={190} height={112} style={{ width: '70%', height: 'auto', objectFit: 'contain' }} />
                  </Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#182437', mb: 0.4 }}>{product.name}</Typography>
                  <Typography sx={{ fontSize: 11.5, color: '#7C8799', lineHeight: 1.42, mb: 1.2 }}>
                    NFC + QR enabled, built for modern professionals.
                  </Typography>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center', mb: 1.1 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#101B2D' }}>{product.price}</Typography>
                    <Typography sx={{ fontSize: 12, color: '#A6AFC0', textDecoration: 'line-through' }}>{product.oldPrice}</Typography>
                  </Stack>
                  <Button
                    component={Link}
                    href={`/productpage/${product.slug}`}
                    sx={{ mt: 'auto', borderRadius: 999, height: 28, fontSize: 11, fontWeight: 700, textTransform: 'none', color: '#fff', background: '#F05B4F', '&:hover': { background: '#E55145' } }}
                  >
                    View details
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Box sx={{ px: { xs: 2, md: 6 }, pb: { xs: 5, md: 6 } }}>
        <Container maxWidth="xl">
          <Box sx={{ borderRadius: 2.5, overflow: 'hidden', background: 'linear-gradient(100deg, #BF8DFF 0%, #8E51E9 58%, #6C36CD 100%)', px: { xs: 2.5, md: 4 }, py: { xs: 2, md: 2.8 } }}>
            <Grid container spacing={2} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 4 }}>
                <Box component={Link} href="/custom" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                  <Image src="/images/custom_card.png" alt="Custom card" width={230} height={118} style={{ width: '100%', maxWidth: 230, height: 'auto' }} />
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 8 }}>
                <Typography sx={{ fontSize: { xs: 22, md: 34 }, fontWeight: 800, color: '#fff', lineHeight: 1.1, mb: 0.4 }}>Custom</Typography>
                <Typography sx={{ fontSize: { xs: 12, md: 15 }, color: 'rgba(255,255,255,0.9)', lineHeight: 1.42, maxWidth: 640 }}>
                  Design your own premium card with your brand colors and finish.
                </Typography>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

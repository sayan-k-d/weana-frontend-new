'use client';

import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import MarketingHeader from '@/components/layout/MarketingHeader';

const customProducts = [
  { name: 'Original Cards', price: 'USD 74', image: '/images/original_card.png' },
  { name: 'Premium Cards', price: 'USD 112', image: '/images/premium_card.png' },
  { name: 'Phone Cards', price: 'USD 66', image: '/images/dot_card.png' },
  { name: 'Stand', price: 'USD 122', image: '/images/cardImage1.png' },
];

export default function CustomPage() {
  return (
    <Box sx={{ background: '#fff', minHeight: '100vh' }}>
      <MarketingHeader />

      <Box sx={{ px: { xs: 2, md: 6 }, pt: { xs: 4, md: 5 }, pb: { xs: 3, md: 4 }, background: 'linear-gradient(180deg, #B5F0DF 0%, #AEEBDD 100%)' }}>
        <Container maxWidth="xl">
          <Grid container spacing={3.5} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontSize: { xs: 38, md: 58 }, fontWeight: 800, color: '#152338', lineHeight: 1.1 }}>
                A Design that Tells
                <br />
                Your Story.
                <br />
                Your Name, Your
                <br />
                Design.
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ display: 'flex', justifyContent: { xs: 'center', md: 'flex-end' } }}>
                <Image src="/images/custom_card.png" alt="create custom product" width={610} height={280} style={{ width: '100%', maxWidth: 560, height: 'auto' }} />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 4, md: 5 }, background: '#F7F8FA' }}>
        <Container maxWidth="xl">
          <Stack direction="row" sx={{ alignItems: 'center', justifyContent: 'space-between', mb: { xs: 2.2, md: 3 }, flexWrap: 'wrap', gap: 1 }}>
            <Typography sx={{ fontSize: { xs: 28, md: 34 }, fontWeight: 800, color: '#131E32' }}>Choose your custom product</Typography>
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#7A8596', display: { xs: 'none', sm: 'block' } }}>Home &gt; Custom</Typography>
          </Stack>

          <Grid container spacing={2.2}>
            {customProducts.map((product) => (
              <Grid key={product.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    border: '1px solid #EEF1F6',
                    borderRadius: 2.3,
                    p: 1.4,
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    background: '#fff',
                  }}
                >
                  <Box
                    sx={{
                      borderRadius: 1.8,
                      background: 'linear-gradient(145deg,#E8F8F3 0%, #DDF2F5 100%)',
                      minHeight: 150,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 1.4,
                    }}
                  >
                    <Image src={product.image} alt={product.name} width={190} height={112} style={{ width: '70%', height: 'auto', objectFit: 'contain' }} />
                  </Box>
                  <Stack direction="row" sx={{ alignItems: 'flex-start', justifyContent: 'space-between', mb: 0.4, gap: 1 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#182437' }}>{product.name}</Typography>
                    <Typography sx={{ fontSize: 12, fontWeight: 700, color: '#F05B4F', flexShrink: 0 }}>{product.price}</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 11.5, color: '#7C8799', lineHeight: 1.42, mb: 1.2 }}>
                    Prestige in Every Handshake. A uniquely finished smart card that suits your standards.
                  </Typography>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center', mb: 1.1 }}>
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#242730' }} />
                    <Box sx={{ width: 10, height: 10, borderRadius: '50%', background: '#BBC2CE' }} />
                  </Stack>
                  <Button
                    sx={{
                      mt: 'auto',
                      borderRadius: 999,
                      height: 28,
                      fontSize: 11,
                      fontWeight: 700,
                      textTransform: 'none',
                      color: '#fff',
                      background: '#F05B4F',
                      '&:hover': { background: '#E55145' },
                    }}
                  >
                    View details
                  </Button>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

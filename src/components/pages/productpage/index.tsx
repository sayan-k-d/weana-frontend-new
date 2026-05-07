'use client';

import Link from 'next/link';
import { useEffect, useMemo, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import MarketingHeader from '@/components/layout/MarketingHeader';
import type { ProductItem } from '@/lib/products';

export default function ProductPage() {
  const [products, setProducts] = useState<ProductItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const response = await fetch('/api/products', { cache: 'no-store' });
        if (!response.ok) throw new Error('Failed to load products');
        const data = (await response.json()) as ProductItem[];
        setProducts(data);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProducts();
  }, []);

  const startingPrice = useMemo(() => {
    if (!products.length) return '$24';
    const values = products
      .map((p) => Number(p.price.replace(/[^\d.]/g, '')))
      .filter((v) => !Number.isNaN(v));
    if (!values.length) return '$24';
    return `$${Math.min(...values).toFixed(2)}`;
  }, [products]);

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
            <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#7A8596' }}>From {startingPrice}</Typography>
          </Stack>

          {isLoading && (
            <Typography sx={{ fontSize: 14, color: '#7A8596', mb: 2 }}>Loading products...</Typography>
          )}

          {hasError && (
            <Typography sx={{ fontSize: 14, color: '#D14343', mb: 2 }}>
              Could not load products right now. Please try again.
            </Typography>
          )}

          <Grid container spacing={2.2}>
            {products.map((product) => (
              <Grid key={product.name} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box sx={{ border: '1px solid #EEF1F6', borderRadius: 2.3, p: 1.4, height: '100%', display: 'flex', flexDirection: 'column', background: '#fff' }}>
                  <Box sx={{ borderRadius: 1.8, background: 'linear-gradient(145deg,#F7F8FB 0%, #ECEFF6 100%)', minHeight: 150, display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1.4 }}>
                    <Box
                      component="img"
                      src={product.image}
                      alt={product.name}
                      sx={{ width: '70%', maxWidth: 190, height: 'auto', objectFit: 'contain' }}
                    />
                  </Box>
                  <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#182437', mb: 0.4 }}>{product.name}</Typography>
                  <Typography sx={{ fontSize: 11.5, color: '#7C8799', lineHeight: 1.42, mb: 1.2 }}>
                    {product.blurb}
                  </Typography>
                  <Stack direction="row" spacing={0.8} sx={{ alignItems: 'center', mb: 1.1 }}>
                    <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#101B2D' }}>{product.price}</Typography>
                    {!!product.oldPrice && (
                      <Typography sx={{ fontSize: 12, color: '#A6AFC0', textDecoration: 'line-through' }}>{product.oldPrice}</Typography>
                    )}
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

          {!isLoading && !products.length && !hasError && (
            <Typography sx={{ fontSize: 14, color: '#7A8596', mt: 2 }}>
              No products found.
            </Typography>
          )}
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

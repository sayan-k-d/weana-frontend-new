'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Box, Button, Container, Grid, Stack, Typography } from '@mui/material';
import Footer from '@/components/layout/Footer';
import MarketingHeader from '@/components/layout/MarketingHeader';
import type { ProductItem } from '@/lib/products';

export default function ProductDetail({ slug }: { slug: string }) {
  const [product, setProduct] = useState<ProductItem | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    const loadProduct = async () => {
      try {
        const response = await fetch(`/api/products?slug=${encodeURIComponent(slug)}`, {
          cache: 'no-store',
        });
        if (!response.ok) throw new Error('Failed to load product');
        const data = (await response.json()) as ProductItem[];
        setProduct(data[0] ?? null);
        setHasError(false);
      } catch {
        setHasError(true);
      } finally {
        setIsLoading(false);
      }
    };

    void loadProduct();
  }, [slug]);

  return (
    <Box sx={{ background: '#fff', minHeight: '100vh' }}>
      <MarketingHeader />

      <Box sx={{ px: { xs: 2, md: 6 }, py: { xs: 3, md: 4 } }}>
        <Container maxWidth="xl">
          <Button component={Link} href="/productpage" sx={{ mb: 2, textTransform: 'none', color: '#7D4AC7', fontWeight: 600 }}>
            ← Back to shop
          </Button>
          {isLoading && <Typography sx={{ fontSize: 14, color: '#7A8596' }}>Loading product...</Typography>}
          {hasError && !isLoading && (
            <Typography sx={{ fontSize: 14, color: '#D14343' }}>Could not load this product right now.</Typography>
          )}
          {!isLoading && !hasError && !product && (
            <Typography sx={{ fontSize: 14, color: '#7A8596' }}>Product not found.</Typography>
          )}
          {!isLoading && !hasError && product && (
          <Grid container spacing={4} sx={{ alignItems: 'center' }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <Box sx={{ borderRadius: 2.5, background: 'linear-gradient(145deg,#F7F8FB 0%, #ECEFF6 100%)', p: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: 280 }}>
                <Box
                  component="img"
                  src={product.image}
                  alt={product.name}
                  sx={{ width: '100%', maxWidth: 400, height: 'auto', objectFit: 'contain' }}
                />
              </Box>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <Typography sx={{ fontSize: { xs: 28, md: 36 }, fontWeight: 800, color: '#131E32', mb: 1.5 }}>{product.name}</Typography>
              <Stack direction="row" spacing={1} sx={{ alignItems: 'center', mb: 2 }}>
                <Typography sx={{ fontSize: 22, fontWeight: 800, color: '#101B2D' }}>{product.price}</Typography>
                {!!product.oldPrice && (
                  <Typography sx={{ fontSize: 16, color: '#A6AFC0', textDecoration: 'line-through' }}>{product.oldPrice}</Typography>
                )}
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
          )}
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

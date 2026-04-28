'use client';
import Link from 'next/link';
import {
    Box, Typography, Button, Stack, Container,
    Grid, Chip,
    Divider
} from '@mui/material';
import Image from 'next/image';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
    bg: '#F0EEF8',       // page background lavender
    bgLight: '#FAFAFA',
    coral: '#7B49B1',
    purple: '#7B5EA7',
    navy: '#1A1A3E',
    muted: '#888',
    border: 'rgba(180,178,210,0.3)',
    cardBg: '#F5F5F7',
};

export default function Footer() {
    const links = ['Features', 'Products', 'Resources', 'Pricing'];

    return (
        <Box sx={{ background: '#1A1D22', pt: { xs: 6, md: 7 }, pb: 0 }}>
            <Container maxWidth="lg">
                <Grid container spacing={{ xs: 4, md: 6 }} sx={{ mb: { xs: 4, md: 5 } }}>
                    <Grid size={{ xs: 12, md: 4 }}>
                        <Image src="/images/logo_white.png" alt="logo" width={183} height={35} priority />
                        <Typography sx={{ mt: 4, fontSize: { xs: 15, md: 14 }, color: 'rgba(255,255,255,0.9)', lineHeight: 1.45, maxWidth: 310 }}>
                            We are committed to delivering quality products and seamless experiences for customers. Our focus is on simplicity, reliability, and continuous improvement to meet your everyday needs.
                        </Typography>
                    </Grid>
                    <Grid size={{ xs: 12, md: 2 }}>
                        <Stack spacing={1.2} sx={{ mt: { xs: 0, md: 3 } }}>
                            {links.map((l) => (
                                <Typography key={l} component={Link} href="#" sx={{ fontSize: { xs: 15, md: 15 }, color: '#fff', textDecoration: 'none', fontWeight: 600 }}>
                                    {l}
                                </Typography>
                            ))}
                        </Stack>
                    </Grid>
                    <Grid size={{ xs: 12, md: 6 }}>
                        <Box sx={{ display: "grid", justifyContent: "end" }}>
                            <Typography sx={{ fontSize: { xs: 28, md: 20 }, color: '#fff', fontWeight: 700, mb: 1.2 }}>Subscribe to Newsletter</Typography>
                            <Box sx={{ display: 'flex', border: '1px solid #343843', borderRadius: 999, overflow: 'hidden', maxWidth: 440, minHeight: { xs: 44, md: 46 }, mb: 1.2 }}>
                                <Box component="input" placeholder="Enter your email" sx={{ flex: 1, border: 'none', outline: 'none', px: { xs: 2, md: 2.2 }, py: 1, fontSize: { xs: 15, md: 14 }, color: '#fff', background: 'transparent', '&::placeholder': { color: 'rgba(255,255,255,0.52)' } }} />
                                <Button sx={{ borderRadius: 0, px: { xs: 2.5, md: 3 }, background: '#6F42B4', color: '#fff', textTransform: 'none', fontSize: { xs: 15, md: 14 }, fontWeight: 700, '&:hover': { background: '#6035A2' } }}>
                                    Subscribe
                                </Button>
                            </Box>
                            <Box sx={{ display: "grid", justifyContent: "end" }}>
                                <Stack direction="row" spacing={1}>
                                    <Chip label="Google Play" sx={{ bgcolor: '#fff', color: '#13161B', borderRadius: 999, fontWeight: 700, height: 28, fontSize: 12 }} />
                                    <Chip label="App Store" sx={{ bgcolor: '#fff', color: '#13161B', borderRadius: 999, fontWeight: 700, height: 28, fontSize: 12 }} />
                                </Stack>
                            </Box>
                        </Box>
                    </Grid>
                </Grid>
            </Container>
            <Divider sx={{ color: 'rgba(255,255,255,0.14)' }} />
            <Container maxWidth="lg">
                <Box sx={{ pt: 2.2, pb: 2.2, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography sx={{ fontSize: { xs: 13, md: 12 }, color: 'rgba(255,255,255,0.92)', fontWeight: 500 }}>
                        Copyrights © 2026 - Weana
                    </Typography>
                    <Stack direction="row" spacing={3}>
                        {[{ name: 'Privacy Policy', link: "/privacy-policy" }, { name: 'Terms of Service', link: "/terms-of-services" }].map((l) => (
                            <Typography key={l.name} component={Link} href={l.link} sx={{ fontSize: { xs: 13, md: 12 }, color: 'rgba(255,255,255,0.9)', textDecoration: 'none' }}>{l.name}</Typography>
                        ))}
                    </Stack>
                    <Stack direction="row" spacing={1.1}>
                        {['f', 'ig', 'in'].map((s) => (
                            <Box key={s} sx={{ width: 28, height: 28, borderRadius: '50%', bgcolor: s === 'f' ? '#1E5ADB' : s === 'ig' ? '#E1268F' : '#0A66C2', color: '#fff', fontSize: 11, fontWeight: 700, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                {s}
                            </Box>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box >
    );
}
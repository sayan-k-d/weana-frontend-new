'use client';
import Link from 'next/link';
import {
    Box, Typography, Button, Stack, Container,
    Grid
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
    const cols = [
        { title: 'Our Apps', links: ['iOS App', 'Android App', 'Chrome Extension'] },
        { title: 'Features', links: ['Digital Cards', 'Lead Capture', 'Analytics', 'Team Management'] },
        { title: 'Pricing', links: ['Free Plan', 'Pro Plan', 'Teams', 'Enterprise'] },
        { title: 'Blog', links: ['Networking Tips', 'Case Studies', 'Product Updates'] },
    ];

    return (
        <Box sx={{ background: '#000', py: 8 }}>
            <Container maxWidth="xl">
                <Grid container spacing={6} sx={{ mb: 6 }}>
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Image src="/images/logo_white.png" alt="logo" width={100} height={20} priority />
                        <Typography sx={{ fontSize: 13, color: 'rgba(255,255,255,0.5)', lineHeight: 1.7, maxWidth: 200 }}>
                            The future of professional networking, digitised.
                        </Typography>
                    </Grid>
                    {cols.map((col) => (
                        <Grid key={col.title} size={{ xs: 6, md: 2 }}>
                            <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#fff', mb: 2 }}>{col.title}</Typography>
                            <Stack spacing={1.2}>
                                {col.links.map((l) => (
                                    <Typography key={l} component={Link} href="#" sx={{ fontSize: 12.5, color: 'rgba(255,255,255,0.5)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>
                                        {l}
                                    </Typography>
                                ))}
                            </Stack>
                        </Grid>
                    ))}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#fff', mb: 2 }}>Subscribe to Newsletter</Typography>
                        <Stack direction="row" spacing={1}>
                            <Box component="input" placeholder="Your email" sx={{ flex: 1, border: 'none', outline: 'none', background: 'rgba(255,255,255,0.08)', borderRadius: 8, px: 2, py: 1, fontSize: 12, color: '#fff', '&::placeholder': { color: 'rgba(255,255,255,0.3)' } }} />
                            <Button sx={{ background: C.coral, color: '#fff', borderRadius: 8, px: 2, fontSize: 12, fontWeight: 600, textTransform: 'none', minWidth: 'auto', '&:hover': { background: '#C93530' } }}>
                                Go
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <Box sx={{ borderTop: '1px solid rgba(255,255,255,0.1)', pt: 3, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
                    <Typography sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)' }}>© 2025 Weana. All rights reserved.</Typography>
                    <Stack direction="row" spacing={3}>
                        {['Privacy Policy', 'Terms of Service', 'Cookie Policy'].map((l) => (
                            <Typography key={l} component={Link} href="#" sx={{ fontSize: 12, color: 'rgba(255,255,255,0.4)', textDecoration: 'none', '&:hover': { color: '#fff' } }}>{l}</Typography>
                        ))}
                    </Stack>
                </Box>
            </Container>
        </Box>
    );
}
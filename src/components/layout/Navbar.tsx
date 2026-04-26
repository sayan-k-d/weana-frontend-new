'use client';
import Link from 'next/link';
import {
    Box, Typography, Button, Stack, Container,
} from '@mui/material';
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
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

export default function Navbar({ isHome = false }: { isHome?: boolean }) {
    const links = ['our apps', 'features', 'pricing', 'help'];
    return (
        <Box
            component="nav"
            sx={{
                position: 'sticky', top: isHome ? "20px" : "0px", zIndex: 100,
                background: isHome ? "transparent" : "linear-gradient(360deg, #CEB7E7 0%, #F5ECFF 100%)",
                backdropFilter: 'blur(12px)',
                // borderBottom: `1px solid ${C.border}`,
            }}
        >
            <Container maxWidth="lg">
                {/* <Stack direction="row" alignItems="center" justifyContent="space-between" py={1.5}> */}
                <Stack
                    direction="row"
                    sx={{
                        alignItems: "center",
                        justifyContent: "space-between",
                        py: 1.5,
                    }}
                >
                    {/* Logo */}
                    <Link href="/home" passHref>
                        <Box component="a" sx={{ display: 'inline-flex', alignItems: 'center' }}>
                            <Image src="/images/logo.png" alt="logo" width={100} height={20} priority />
                        </Box>
                    </Link>

                    {/* Nav links */}
                    <Stack direction="row" spacing={3.5}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        {links.map((l) => (
                            // <Link key={l} href={`/${l.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                            <Typography component={Link} href={`/${l.toLowerCase()}`} sx={{ fontSize: 13.5, color: '#555', fontWeight: 500, textDecoration: 'none', textTransform: "capitalize", '&:hover': { color: C.navy } }}>
                                {l}
                            </Typography>
                            // </Link>
                        ))}
                    </Stack>

                    {/* Actions */}
                    <Stack direction="row" spacing={1.5}
                        sx={{
                            alignItems: "center",
                        }}
                    >
                        <Box sx={{ width: 34, height: 34, borderRadius: '50%', border: `1.5px solid ${C.border}`, display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', '&:hover': { borderColor: C.purple } }}>
                            <ShoppingCartOutlinedIcon sx={{ fontSize: 17, color: '#555' }} />
                        </Box>
                        <Button
                            component={Link} href="/login"
                            sx={{ background: C.coral, color: '#fff', borderRadius: 999, px: 3, py: 1.3, fontSize: 14, fontWeight: 600, textTransform: 'none', }}
                        >
                            Login / Register
                        </Button>
                    </Stack>
                </Stack>
            </Container>
        </Box>
    );
}
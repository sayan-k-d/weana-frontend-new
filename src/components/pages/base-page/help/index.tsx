// src/components/pages/home/HelpCenterPage.tsx
'use client';
import { useState } from 'react';
import {
    Box, Container, Typography, Accordion, AccordionSummary,
    AccordionDetails, Grid, TextField, MenuItem, Button, Divider,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import FacebookIcon from '@mui/icons-material/Facebook';
import InstagramIcon from '@mui/icons-material/Instagram';
import LinkedInIcon from '@mui/icons-material/LinkedIn';

// ─── FAQ Data ────────────────────────────────────────────────────────────────
const faqCategories = [
    {
        category: 'Weana Products',
        color: '#7B49B1',
        items: [
            {
                question: 'What are Weana Products?',
                answer: 'A Weana product transfers your Weana profile information with an NFC tap or scannable QR code onto someone else\'s phone.\n\nYour Profile is highly customizable and includes a bio, social media links, payment info and other details that you can input to make it easy to share all those details with anyone in one swift action without the need for them to have third partyany apps installed.',
            },
            { question: 'What benefits do digital business cards offer?', answer: '' },
            { question: 'Do I need to download an app or pay a subscription to use Weana?', answer: '' },
            { question: 'Does the other person need a Weana product to receive my details?', answer: '' },
            { question: 'What material are the products made of?', answer: '' },
            { question: 'Can I link my profile to multiple products?', answer: '' },
            { question: 'If I order different or multiple products, can I connect them to different profiles?', answer: '' },
            { question: 'Can I link my product directly to my website without using my Weana profile?', answer: '' },
            { question: 'How compatible are the products with phones?', answer: '' },
        ],
    },
    {
        category: 'Shipping',
        color: '#7B49B1',
        items: [
            {
                question: 'How long does it take for my product to arrive?',
                answer: 'Your order will be shipped and delivered within 2 to 8 business days depending on product type, the destination, and shipping method chosen at checkout.\n\nEach shipping option will display the estimated number of business days that the carrier expects delivery to take and does not include fulfillment time.',
            },
            { question: 'Can I track my shipment?', answer: '' },
            { question: 'What should I do if I haven\'t received my order?', answer: '' },
        ],
    },
    {
        category: 'Custom Product',
        color: '#7B49B1',
        items: [
            {
                question: 'How can I customize my product?',
                answer: '1. Visit the Custom products page.\n2. Add text or upload your design in one of these file types: PDF, EPS, or AI.\n3. Select the quantity and place your order.',
            },
            { question: 'How can I configure my review card or stand?', answer: '' },
        ],
    },
    {
        category: 'Weana Profile',
        color: '#7B49B1',
        items: [
            {
                question: 'How often can I update my profile?',
                answer: 'You can update any details in your profile at any time and as often as you need.',
            },
            { question: 'What can I add to my profile?', answer: '' },
            { question: 'Support', answer: '' },
        ],
    },
];

const inquiryOptions = [
    'General Inquiry',
    'Order Support',
    'Product Question',
    'Billing',
    'Other',
];

// ─── Component ────────────────────────────────────────────────────────────────
export default function HelpCenterPage() {
    const [expanded, setExpanded] = useState<string | false>(false);
    const [form, setForm] = useState({ name: '', email: '', inquiry: '' });

    const handleChange = (panel: string) => (_: React.SyntheticEvent, isExpanded: boolean) => {
        setExpanded(isExpanded ? panel : false);
    };

    return (
        <Box sx={{ background: '#fff', minHeight: '100vh' }}>
            {/* ── Hero ── */}
            <Box sx={{ textAlign: 'center', pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}>
                <Typography variant="h1" sx={{ fontSize: { xs: 32, md: 44 }, fontWeight: 700, color: '#1A1A3E', mb: 1.5 }}>
                    Help & Support
                </Typography>
                <Typography sx={{ fontSize: 16, color: '#666' }}>
                    Answers to common questions and quick solutions.
                </Typography>
            </Box>

            {/* ── FAQ Sections ── */}
            <Container maxWidth="md" sx={{ pb: 8 }}>
                {faqCategories.map((cat) => (
                    <Box key={cat.category} sx={{ mb: 6 }}>
                        <Typography sx={{ fontSize: { xs: 20, md: 24 }, fontWeight: 700, color: cat.color, mb: 2 }}>
                            {cat.category}
                        </Typography>

                        {cat.items.map((item, i) => {
                            const panelId = `${cat.category}-${i}`;
                            const isOpen = expanded === panelId;
                            return (
                                <Accordion
                                    key={i}
                                    expanded={isOpen}
                                    onChange={handleChange(panelId)}
                                    disableGutters
                                    elevation={0}
                                    sx={{
                                        border: 'none',
                                        borderBottom: '1px solid #E8E8E8',
                                        '&:before': { display: 'none' },
                                        '&:last-of-type': { borderBottom: '1px solid #E8E8E8' },
                                    }}  
                                >
                                    <AccordionSummary
                                        expandIcon={isOpen ? <RemoveIcon sx={{ fontSize: 18, color: '#1A1A3E' }} /> : <AddIcon sx={{ fontSize: 18, color: '#1A1A3E' }} />}
                                        sx={{ px: 0, py: 1.5, '& .MuiAccordionSummary-content': { my: 0 } }}
                                    >
                                        <Typography sx={{ fontSize: 15, fontWeight: 600, color: '#1A1A3E' }}>
                                            {item.question}
                                        </Typography>
                                    </AccordionSummary>
                                    {item.answer && (
                                        <AccordionDetails sx={{ px: 0, pt: 0, pb: 2 }}>
                                            {item.answer.split('\n').map((line, l) => (
                                                <Typography key={l} sx={{ fontSize: 14, color: '#444', lineHeight: 1.8 }}>
                                                    {line}
                                                </Typography>
                                            ))}
                                        </AccordionDetails>
                                    )}
                                </Accordion>
                            );
                        })}
                    </Box>
                ))}

                {/* ── Contact Card ── */}
                <Box sx={{ border: '1px solid #E8E8E8', borderRadius: 3, p: { xs: 3, md: 5 }, mt: 6 }}>
                    <Grid container spacing={5}>
                        {/* Left */}
                        <Grid size={{ xs: 12, md: 5 }}>
                            <Typography sx={{ fontSize: 12, color: '#888', mb: 1 }}>Home &rsaquo; Contact</Typography>
                            <Typography variant="h2" sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 700, color: '#1A1A3E', mb: 1 }}>
                                Let&apos;s get in touch
                            </Typography>
                            <Typography sx={{ fontSize: 14, color: '#666', mb: 3 }}>
                                Don&apos;t be afraid to say hello with us!
                            </Typography>

                            <Box sx={{ display: 'flex', gap: 2, mb: 3, flexWrap: 'wrap' }}>
                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, background: '#FFF5F5', borderRadius: 2, px: 2, py: 1.5, minWidth: 140 }}>
                                    <Box sx={{ background: '#E74C3C', borderRadius: 1.5, p: 0.8, display: 'flex' }}>
                                        <EmailIcon sx={{ fontSize: 16, color: '#fff' }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: 11, color: '#888' }}>Email</Typography>
                                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#1A1A3E' }}>sko@gmail.com</Typography>
                                    </Box>
                                </Box>

                                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, background: '#F5FFF8', borderRadius: 2, px: 2, py: 1.5, minWidth: 140 }}>
                                    <Box sx={{ background: '#27AE60', borderRadius: 1.5, p: 0.8, display: 'flex' }}>
                                        <PhoneIcon sx={{ fontSize: 16, color: '#fff' }} />
                                    </Box>
                                    <Box>
                                        <Typography sx={{ fontSize: 11, color: '#888' }}>Phone</Typography>
                                        <Typography sx={{ fontSize: 12, fontWeight: 600, color: '#1A1A3E' }}>+10 545 619 90</Typography>
                                    </Box>
                                </Box>
                            </Box>

                            <Typography sx={{ fontSize: 13, color: '#888', mb: 1 }}>Follow us on</Typography>
                            <Box sx={{ display: 'flex', gap: 1 }}>
                                {[
                                    { icon: <FacebookIcon sx={{ fontSize: 16 }} />, bg: '#1877F2' },
                                    { icon: <InstagramIcon sx={{ fontSize: 16 }} />, bg: '#E1306C' },
                                    { icon: <LinkedInIcon sx={{ fontSize: 16 }} />, bg: '#0A66C2' },
                                ].map((s, i) => (
                                    <Box key={i} sx={{ background: s.bg, borderRadius: '50%', width: 30, height: 30, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', cursor: 'pointer' }}>
                                        {s.icon}
                                    </Box>
                                ))}
                            </Box>
                        </Grid>

                        {/* Right — Contact Form */}
                        <Grid size={{ xs: 12, md: 7 }}>
                            <Typography variant="h3" sx={{ fontSize: 20, fontWeight: 700, mb: 2.5 }}>
                                Contact <Box component="span" sx={{ color: '#E74C3C' }}>Us</Box>
                            </Typography>

                            <Grid container spacing={2} sx={{ mb: 2 }}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Name <Box component="span" sx={{ color: 'red' }}>*</Box></Typography>
                                    <TextField
                                        fullWidth size="small" placeholder="Enter your name"
                                        value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>Email <Box component="span" sx={{ color: 'red' }}>*</Box></Typography>
                                    <TextField
                                        fullWidth size="small" placeholder="Enter your email" type="email"
                                        value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })}
                                        sx={{ '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                                    />
                                </Grid>
                            </Grid>

                            <Typography sx={{ fontSize: 13, fontWeight: 600, mb: 0.5 }}>What is your inquiry regarding?</Typography>
                            <TextField
                                select fullWidth size="small" placeholder="Please select"
                                value={form.inquiry} onChange={(e) => setForm({ ...form, inquiry: e.target.value })}
                                sx={{ mb: 3, '& .MuiOutlinedInput-root': { borderRadius: 2, fontSize: 13 } }}
                            >
                                <MenuItem value="" disabled><em>Please select</em></MenuItem>
                                {inquiryOptions.map((o) => <MenuItem key={o} value={o}>{o}</MenuItem>)}
                            </TextField>

                            <Button
                                fullWidth
                                sx={{
                                    background: '#E74C3C', color: '#fff', borderRadius: 8, py: 1.4,
                                    fontSize: 14, fontWeight: 600, textTransform: 'none',
                                    '&:hover': { background: '#C0392B' },
                                }}
                            >
                                Submit
                            </Button>
                        </Grid>
                    </Grid>
                </Box>
            </Container>
        </Box>
    );
}
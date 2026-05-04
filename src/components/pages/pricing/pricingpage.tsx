'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
    Box, Typography, Button, Container, Stack,
    Grid, Switch, Accordion, AccordionSummary,
    AccordionDetails, Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import SocialProof from '../base-page/section/carousel';
import Image from 'next/image';

// ─── Design tokens ────────────────────────────────────────────────────────────
const C = {
    bg: '#F0EEF8',
    navy: '#1A1A3E',
    purple: '#7B5EA7',
    coral: '#E8453C',
    muted: '#888',
    border: 'rgba(180,178,210,0.25)',
};

// ─── Styled toggle ────────────────────────────────────────────────────────────
const BillingToggle = styled(Box)({
    display: 'inline-flex',
    alignItems: 'center',
    background: '#E7E7E7',
    borderRadius: 999,
    padding: '20px',
    gap: 4,
    height: "55px"
});

const ToggleBtn = styled(Button, {
    shouldForwardProp: (p) => p !== 'active',
})<{ active?: boolean }>(({ active }) => ({
    borderRadius: 999,
    padding: '12px',
    fontSize: 16,
    fontWeight: 600,
    textTransform: 'none',
    background: active ? '#fff' : 'transparent',
    // color: active ? C.navy : C.muted,
    color: "#000",
    boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
    minWidth: 0,
    '&:hover': { background: active ? '#fff' : 'rgba(255,255,255,0.5)' },
}));


// ─── Pricing plans data ───────────────────────────────────────────────────────
const plans = [
    {
        name: 'Personal',
        badge: '1 user',
        price: { monthly: null, yearly: null },
        label: 'Free',
        priceLabel: 'Free',
        desc: 'Best for personal connections',
        cta: 'Get started for free',
        ctaVariant: 'outline' as const,
        color: C.purple,
        background: "#EEEEEE",
        features: [
            '1 free digital business card',
            'Email signature generator',
            'QR & badge scanning',
            'Card & badge scanner',
            'Virtual backgrounds',
        ],
    },
    {
        name: 'Professional',
        badge: '2 user',
        price: { monthly: 6, yearly: 5 },
        priceLabel: '$6',
        priceSub: '/month',
        desc: 'Networks with a branded card',
        cta: 'Sign up',
        background: "linear-gradient(180deg, #E7E7E7 0%, #CADBFF 100%)",
        ctaVariant: 'filled' as const,
        color: C.purple,
        highlight: true,
        features: [
            '16 digital business cards',
            'Unlimited card sharing',
            'Additional card designs',
            'Custom colors & additional fonts',
            'Card & badge scanner',
            'Branding for QR codes',
        ],
    },
    {
        name: 'Business',
        badge: '5-9 min users',
        price: { monthly: 5, yearly: 4 },
        priceLabel: '$5',
        priceSub: '/user / month',
        desc: 'Certify your brand name here',
        cta: 'View pricing',
        ctaVariant: 'outline' as const,
        background: "linear-gradient(180deg, #E7E7E7 0%, #D6AFFF 100%)",
        color: '#E8453C',
        features: [
            'Cards for your whole team',
            'Templates for sub-teams',
            'Universal contact scanner',
            'Team email signatures',
        ],
    },
    {
        name: 'Enterprise',
        badge: '10+ users',
        price: { monthly: null, yearly: null },
        priceLabel: 'Custom',
        desc: 'Unify your brand everywhere',
        cta: 'Contact Us',
        ctaVariant: 'outline' as const,
        background: "linear-gradient(180deg, #E7E7E7 0%, #F9D1AF 100%)",
        color: C.navy,
        features: [
            'Unlimited digital business cards',
            'Cards for your whole company',
            'Templates for departments',
            'Universal contact scanner',
            'Upload custom fonts',
        ],
    },
];

// ─── Feature comparison data ──────────────────────────────────────────────────
type CellVal = boolean | string;
interface FeatureRow { label: string; personal: CellVal; professional: CellVal; business: CellVal; enterprise: CellVal; }

const featureRows: FeatureRow[] = [
    { label: 'Number of users', personal: '1', professional: '1', business: '5+', enterprise: '10+' },
    { label: 'Number of cards', personal: '4', professional: '16', business: 'Unlimited', enterprise: 'Unlimited' },
    { label: 'Unlimited card sharing', personal: true, professional: true, business: true, enterprise: true },
    { label: 'Customisable virtual backgrounds', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Multiple email signature styles', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Business card scans / month', personal: '5', professional: '20', business: 'Unlimited', enterprise: 'Unlimited' },
    { label: 'Customer support', personal: true, professional: true, business: true, enterprise: true },
    { label: 'Analytics', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Additional card designs', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Embedded videos', personal: false, professional: false, business: true, enterprise: true },
    { label: 'Custom colors', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Badges', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Branded QR code', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Personalised card link', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Add notes and tags to contacts', personal: false, professional: true, business: true, enterprise: true },
    { label: 'Contact Enrichment', personal: false, professional: false, business: true, enterprise: true },
    { label: 'Sync with Google and Outlook', personal: false, professional: false, business: true, enterprise: true },
    { label: 'Weana Events', personal: false, professional: false, business: true, enterprise: true },
    { label: 'Additional Font Choices', personal: false, professional: false, business: true, enterprise: true },
    { label: 'Create powerful card templates', personal: false, professional: false, business: true, enterprise: true },
    { label: 'Automated email signature integrations', personal: false, professional: false, business: true, enterprise: true },
    { label: 'Custom email signature disclaimers', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Corporate virtual backgrounds', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Salesforce and Hubspot integration', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Corporate directory', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Custom contact exchange form', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Contact capture consent form', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Administrative Dashboard', personal: false, professional: false, business: false, enterprise: true },
    { label: 'SOC 2 Report', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Direct SSO integrations', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Onboarding session', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Verified Digital Business Cards', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Zoom and phone technical support', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Multiple display support', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Invoice billing option', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Upload Custom Fonts', personal: false, professional: false, business: false, enterprise: true },
    { label: 'Brand Partner Program', personal: false, professional: false, business: false, enterprise: true },
];

const planCols: (keyof FeatureRow)[] = ['personal', 'professional', 'business', 'enterprise'];
const planColColors = [C.purple, C.purple, C.coral, C.navy];
const planColLabels = ['Personal', 'Professional', 'Business', 'Enterprise'];
const planColCtaLabels = ['Get started for free', 'Sign Up', 'View Pricing', 'Contact Us'];

// ─── Cell renderer ────────────────────────────────────────────────────────────
const Cell = ({ value }: { value: CellVal }) => {
    if (typeof value === 'string') return (
        <Typography sx={{ fontSize: 13, color: C.navy, fontWeight: 500, textAlign: 'center' }}>{value}</Typography>
    );
    return value
        ? <CheckCircleIcon sx={{ fontSize: 18, color: '#22C55E', display: 'block', mx: 'auto' }} />
        : <CancelIcon sx={{ fontSize: 18, color: '#EF4444', display: 'block', mx: 'auto' }} />;
};

// ─── FAQ data ─────────────────────────────────────────────────────────────────
const faqs = [
    { q: 'What are Weana Products?', a: 'A Weana product transfers your Weana profile information with an NFC tap or scannable QR code into someone else\'s phone. Your Profile is highly customisable and includes a bio, social media links, payment info and other details that you can input to make it easy to share all those details with anyone in one swift action without the need for them to have third party apps installed.' },
    { q: 'What benefits do digital business cards offer?', a: 'Digital business cards are eco-friendly, always up to date, and instantly shareable. They eliminate the need for physical printing and allow you to include rich media like videos, links, and payment options.' },
    { q: 'Do I need to download an app or pay a subscription to use Weana?', a: 'No app download is required to receive someone\'s Weana card. The card recipient can view and save your information directly in their phone\'s browser. A subscription is only needed to create and manage your own digital card.' },
    { q: 'Does the other person need a Weana product to receive my details?', a: 'No. Anyone with a smartphone can receive your Weana profile via NFC tap, QR code scan, or a shared link — no app or account required on their end.' },
    { q: 'What material are the products made of?', a: 'Weana physical products are made from premium PVC or metal, depending on the product tier. Our Premium Card uses a uniquely finished metal that gives a luxury feel in every handshake.' },
    { q: 'Can I link my profile to multiple products?', a: 'Yes. You can link your Weana profile to multiple NFC cards, QR codes, and other products simultaneously. Any update to your profile reflects across all linked products instantly.' },
    { q: 'If I order different or multiple products, can I connect them to different profiles?', a: 'Yes. Each product can be linked to a different Weana profile, making it easy for professionals who manage multiple roles or brands to switch between personas.' },
    { q: 'Can I link my product directly to my website without using my Weana profile?', a: 'Yes. You can configure your Weana product to redirect directly to any URL of your choice, including your personal website, LinkedIn, or any other destination.' },
    { q: 'How compatible are the products with phones?', a: 'Weana NFC products work with all modern NFC-enabled smartphones including iPhone XS and later, and most Android phones from 2019 onwards. QR codes work with any smartphone camera.' },
];

// ─── Pricing Hero ─────────────────────────────────────────────────────────────
function PricingHero({ billing, setBilling }: { billing: 'monthly' | 'yearly'; setBilling: (b: 'monthly' | 'yearly') => void }) {
    return (
        <Box sx={{ background: '#fff', pt: 6, pb: 2 }}>
            <Container maxWidth="lg">
                {/* Breadcrumb */}
                <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", mb: 3 }}>
                    <Typography component={Link} href="/home" sx={{ display: "flex", alignItems: "center", fontSize: 12, color: C.muted, textDecoration: 'none', gap: "4px", '&:hover': { color: C.purple } }}>
                        <Image src="/images/home_icon.png" alt="h" width={18} height={18} />
                        Home
                    </Typography>
                    <Typography sx={{ fontSize: 12, color: C.muted }}>›</Typography>
                    <Typography sx={{ fontSize: 12, color: C.purple, fontWeight: 600 }}>Pricing</Typography>
                </Stack>

                {/* Headline */}
                <Typography sx={{ textAlign: 'center', fontSize: { xs: 28, md: 50 }, fontWeight: 900, color: "#120808", letterSpacing: -1, lineHeight: 1.2, mb: 1.5 }}>
                    Enhance your experience<br />with every plan.
                </Typography>
                <Typography sx={{ textAlign: 'center', fontSize: 20, color: "#5A5251", mb: 4 }}>
                    Choose a plan today and evolve it as your business grows
                </Typography>

                {/* Monthly / Yearly toggle */}
                <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
                    <BillingToggle>
                        <ToggleBtn active={billing === 'monthly'} onClick={() => setBilling('monthly')} style={{ padding: "4px 20px" }}>Monthly</ToggleBtn>
                        <ToggleBtn active={billing === 'yearly'} onClick={() => setBilling('yearly')} style={{ padding: "4px 20px" }}>
                            Yearly
                            <Chip label="-20%" size="small" sx={{ ml: 2, height: 18, fontSize: 9, fontWeight: 700, background: 'transparent', color: '#000', border: "1px solid #08AA44", '& .MuiChip-label': { px: 1 } }} />
                        </ToggleBtn>
                    </BillingToggle>
                </Box>
            </Container>
        </Box>
    );
}

// ─── Pricing Cards ────────────────────────────────────────────────────────────
function PricingCards({ billing }: { billing: 'monthly' | 'yearly' }) {
    return (
        <Box sx={{ background: '#fff', pb: 8 }}>
            <Container maxWidth="lg">
                <Grid container spacing={2.5} sx={{ alignItems: "stretch" }}>
                    {plans.map((plan, i) => (
                        <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan.name}>
                            <Box sx={{
                                // border: plan.highlight ? `2px solid ${C.purple}` : `1px solid ${C.border}`,
                                borderRadius: "12px",
                                p: 1.5,
                                height: '100%',
                                display: 'flex',
                                flexDirection: 'column',
                                background: plan.highlight ? '#FAFAFF' : '#fff',
                                position: 'relative',
                                boxShadow: "0px 4px 20px 0px #00000040",
                                // boxShadow: plan.highlight ? '0 4px 24px rgba(123,94,167,0.12)' : 'none',
                            }}>
                                {/* Badge */}
                                <Box sx={{ background: plan.background, height: "120px", display:"flex", flexDirection:"column", justifyContent:"space-between", mb: 1.5, p: 1 }}>
                                    <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
                                        <Chip label={plan.name} size="small" sx={{ background: "#9759DB", color: "#fff", fontWeight: 700, fontSize: 11, borderRadius: "20px", }} />
                                        <Typography sx={{ fontSize: 11, color: C.muted }}>{plan.badge}</Typography>
                                    </Stack>

                                    {/* Price */}
                                    {plan.priceLabel === 'Free' || plan.priceLabel === 'Custom' ? (
                                        <Typography sx={{ fontSize: "35px", fontWeight: 500, color: "#000", letterSpacing: "2%" }}>{plan.priceLabel}</Typography>
                                    ) : (
                                        <Stack direction="row" sx={{ alignItems: "baseline", mb: 0.5, display:"flex" }} spacing={0.5}>
                                            <Typography sx={{ fontSize: "35px", fontWeight: 500, color: "#000", letterSpacing: "2%" }}>
                                                {billing === 'yearly' && plan.price.yearly ? `$${plan.price.yearly}` : plan.priceLabel}
                                            </Typography>
                                            <Typography sx={{ fontSize: "15px", fontWeight: 400, color: "#5A5251", letterSpacing: "0px" }}>{plan.priceSub}</Typography>
                                        </Stack>
                                    )}
                                </Box>

                                <Typography sx={{ fontSize: 12, color: C.muted, mb: 2.5, lineHeight: 1.5 }}>{plan.desc}</Typography>

                                {/* CTA */}
                                <Button
                                    fullWidth
                                    sx={{
                                        borderRadius: 999,
                                        py: 1.1,
                                        fontSize: 13,
                                        fontWeight: 600,
                                        textTransform: 'none',
                                        mb: 2.5,
                                        background: plan.ctaVariant === 'filled' ? plan.color : 'transparent',
                                        color: plan.ctaVariant === 'filled' ? '#fff' : plan.color,
                                        border: plan.ctaVariant === 'outline' ? `1.5px solid ${plan.color}` : 'none',
                                        '&:hover': {
                                            background: plan.ctaVariant === 'filled' ? '#6B4E97' : plan.color + '12',
                                        },
                                    }}
                                >
                                    {plan.cta}
                                </Button>

                                {/* Divider */}
                                <Box sx={{ borderTop: `1px solid ${C.border}`, mb: 2 }} />

                                {/* Features */}
                                <Stack spacing={1} sx={{ flex: 1 }}>
                                    {plan.features.map((f) => (
                                        <Stack key={f} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
                                            <CheckCircleIcon sx={{ fontSize: 15, color: '#22C55E', mt: 0.3, flexShrink: 0 }} />
                                            <Typography sx={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>{f}</Typography>
                                        </Stack>
                                    ))}
                                </Stack>
                            </Box>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
}

// ─── Feature Comparison Table ─────────────────────────────────────────────────
function ComparisonTable() {
    return (
        <Box sx={{ background: '#fff', py: 10 }}>
            <Container maxWidth="lg">
                <Typography sx={{ textAlign: 'center', fontSize: { xs: 26, md: 36 }, fontWeight: 900, color: C.navy, letterSpacing: -0.5, mb: 1 }}>
                    Compare all features
                </Typography>
                <Typography sx={{ textAlign: 'center', fontSize: 14, color: C.muted, mb: 6 }}>
                    Find the plan that is right for you.
                </Typography>

                <Box sx={{ overflowX: 'auto' }}>
                    <Box sx={{ minWidth: 640 }}>
                        {/* Table header */}
                        <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', mb: 0 }}>
                            <Box sx={{ p: 2 }}>
                                <Typography sx={{ fontSize: 15, fontWeight: 800, color: C.navy }}>Features</Typography>
                            </Box>
                            {planColLabels.map((label, i) => (
                                <Box key={label} sx={{ p: 2, textAlign: 'center' }}>
                                    <Chip label={label} size="small" sx={{ background: planColColors[i] + '18', color: planColColors[i], fontWeight: 700, fontSize: 11, mb: 0.8, height: 22 }} />
                                    <br />
                                    <Button size="small" sx={{
                                        borderRadius: 999, fontSize: 10, fontWeight: 600, textTransform: 'none', mt: 0.5,
                                        background: planColColors[i], color: '#fff', px: 1.5, py: 0.4,
                                        '&:hover': { background: planColColors[i], opacity: 0.85 },
                                    }}>
                                        {planColCtaLabels[i]}
                                    </Button>
                                </Box>
                            ))}
                        </Box>

                        {/* Feature rows */}
                        {featureRows.map((row, idx) => (
                            <Box
                                key={row.label}
                                sx={{
                                    display: 'grid',
                                    gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
                                    background: idx % 2 === 0 ? '#F9F5FF' : '#fff',
                                    borderRadius: 2,
                                    '&:hover': { background: '#F0EEF8' },
                                    transition: 'background 0.15s',
                                }}
                            >
                                <Box sx={{ p: '10px 16px', display: 'flex', alignItems: 'center' }}>
                                    <Typography sx={{ fontSize: 13, color: C.navy }}>{row.label}</Typography>
                                </Box>
                                {planCols.map((col) => (
                                    <Box key={col} sx={{ p: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                                        <Cell value={row[col] as CellVal} />
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                </Box>
            </Container>
        </Box>
    );
}

// ─── FAQ ──────────────────────────────────────────────────────────────────────
const StyledAccordion = styled(Accordion)({
    boxShadow: 'none',
    borderBottom: `1px solid rgba(180,178,210,0.25)`,
    // borderRadius: '12px !important',
    // marginBottom: 12,
    '&:before': { display: 'none' },
    '&.Mui-expanded': { margin: '0 0 12px' },
});

function FAQ() {
    const [expanded, setExpanded] = useState<number | false>(0);

    return (
        <Box sx={{ background: "transparent", py: 10 }}>
            <Container maxWidth="md">
                <Typography sx={{ textAlign: 'center', fontSize: { xs: 26, md: 36 }, fontWeight: 900, color: C.navy, letterSpacing: -0.5, mb: 6 }}>
                    Frequently Asked Questions
                </Typography>

                {faqs.map((faq, i) => (
                    <StyledAccordion
                        key={i}
                        expanded={expanded === i}
                        onChange={() => setExpanded(expanded === i ? false : i)}
                    >
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon sx={{ color: C.purple }} />}
                            sx={{ px: 3, py: 0.5, '& .MuiAccordionSummary-content': { my: 1.5 } }}
                        >
                            <Typography sx={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{faq.q}</Typography>
                        </AccordionSummary>
                        <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
                            <Typography sx={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75 }}>{faq.a}</Typography>
                        </AccordionDetails>
                    </StyledAccordion>
                ))}
            </Container>
        </Box>
    );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function PricingPage() {
    const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

    return (
        <Box>
            <PricingHero billing={billing} setBilling={setBilling} />
            <PricingCards billing={billing} />
            <SocialProof isHome={false} />
            <ComparisonTable />
            <FAQ />
        </Box>
    );
}
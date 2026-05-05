// 'use client';

// import { useState } from 'react';
// import Link from 'next/link';
// import {
//     Box, Typography, Button, Container, Stack,
//     Grid, Switch, Accordion, AccordionSummary,
//     AccordionDetails, Chip,
// } from '@mui/material';
// import { styled } from '@mui/material/styles';
// import CheckCircleIcon from '@mui/icons-material/CheckCircle';
// import CancelIcon from '@mui/icons-material/Cancel';
// import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
// import SocialProof from '../section/home/carousel';
// import Image from 'next/image';

// // ─── Design tokens ────────────────────────────────────────────────────────────
// const C = {
//     bg: '#F0EEF8',
//     navy: '#1A1A3E',
//     purple: '#7B5EA7',
//     coral: '#E8453C',
//     muted: '#888',
//     border: 'rgba(180,178,210,0.25)',
// };

// // ─── Styled toggle ────────────────────────────────────────────────────────────
// const BillingToggle = styled(Box)({
//     display: 'inline-flex',
//     alignItems: 'center',
//     background: '#E7E7E7',
//     borderRadius: 999,
//     padding: '20px',
//     gap: 4,
//     height: "55px"
// });

// const ToggleBtn = styled(Button, {
//     shouldForwardProp: (p) => p !== 'active',
// })<{ active?: boolean }>(({ active }) => ({
//     borderRadius: 999,
//     padding: '12px',
//     fontSize: 16,
//     fontWeight: 600,
//     textTransform: 'none',
//     background: active ? '#fff' : 'transparent',
//     // color: active ? C.navy : C.muted,
//     color: "#000",
//     boxShadow: active ? '0 1px 4px rgba(0,0,0,0.08)' : 'none',
//     minWidth: 0,
//     '&:hover': { background: active ? '#fff' : 'rgba(255,255,255,0.5)' },
// }));


// // ─── Pricing plans data ───────────────────────────────────────────────────────
// const plans = [
//     {
//         name: 'Personal',
//         badge: '1 user',
//         price: { monthly: null, yearly: null },
//         label: 'Free',
//         priceLabel: 'Free',
//         desc: 'Best for personal connections',
//         cta: 'Get started for free',
//         ctaVariant: 'outline' as const,
//         color: C.purple,
//         background: "#EEEEEE",
//         features: [
//             '1 free digital business card',
//             'Email signature generator',
//             'QR & badge scanning',
//             'Card & badge scanner',
//             'Virtual backgrounds',
//         ],
//     },
//     {
//         name: 'Professional',
//         badge: '2 user',
//         price: { monthly: 6, yearly: 5 },
//         priceLabel: '$6',
//         priceSub: '/month',
//         desc: 'Networks with a branded card',
//         cta: 'Sign up',
//         background: "linear-gradient(180deg, #E7E7E7 0%, #CADBFF 100%)",
//         ctaVariant: 'filled' as const,
//         color: C.purple,
//         highlight: true,
//         features: [
//             '16 digital business cards',
//             'Unlimited card sharing',
//             'Additional card designs',
//             'Custom colors & additional fonts',
//             'Card & badge scanner',
//             'Branding for QR codes',
//         ],
//     },
//     {
//         name: 'Business',
//         badge: '5-9 min users',
//         price: { monthly: 5, yearly: 4 },
//         priceLabel: '$5',
//         priceSub: '/user / month',
//         desc: 'Certify your brand name here',
//         cta: 'View pricing',
//         ctaVariant: 'outline' as const,
//         background: "linear-gradient(180deg, #E7E7E7 0%, #D6AFFF 100%)",
//         color: '#E8453C',
//         features: [
//             'Cards for your whole team',
//             'Templates for sub-teams',
//             'Universal contact scanner',
//             'Team email signatures',
//         ],
//     },
//     {
//         name: 'Enterprise',
//         badge: '10+ users',
//         price: { monthly: null, yearly: null },
//         priceLabel: 'Custom',
//         desc: 'Unify your brand everywhere',
//         cta: 'Contact Us',
//         ctaVariant: 'outline' as const,
//         background: "linear-gradient(180deg, #E7E7E7 0%, #F9D1AF 100%)",
//         color: C.navy,
//         features: [
//             'Unlimited digital business cards',
//             'Cards for your whole company',
//             'Templates for departments',
//             'Universal contact scanner',
//             'Upload custom fonts',
//         ],
//     },
// ];

// // ─── Feature comparison data ──────────────────────────────────────────────────
// type CellVal = boolean | string;
// interface FeatureRow { label: string; personal: CellVal; professional: CellVal; business: CellVal; enterprise: CellVal; }

// const featureRows: FeatureRow[] = [
//     { label: 'Number of users', personal: '1', professional: '1', business: '5+', enterprise: '10+' },
//     { label: 'Number of cards', personal: '4', professional: '16', business: 'Unlimited', enterprise: 'Unlimited' },
//     { label: 'Unlimited card sharing', personal: true, professional: true, business: true, enterprise: true },
//     { label: 'Customisable virtual backgrounds', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Multiple email signature styles', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Business card scans / month', personal: '5', professional: '20', business: 'Unlimited', enterprise: 'Unlimited' },
//     { label: 'Customer support', personal: true, professional: true, business: true, enterprise: true },
//     { label: 'Analytics', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Additional card designs', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Embedded videos', personal: false, professional: false, business: true, enterprise: true },
//     { label: 'Custom colors', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Badges', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Branded QR code', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Personalised card link', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Add notes and tags to contacts', personal: false, professional: true, business: true, enterprise: true },
//     { label: 'Contact Enrichment', personal: false, professional: false, business: true, enterprise: true },
//     { label: 'Sync with Google and Outlook', personal: false, professional: false, business: true, enterprise: true },
//     { label: 'Weana Events', personal: false, professional: false, business: true, enterprise: true },
//     { label: 'Additional Font Choices', personal: false, professional: false, business: true, enterprise: true },
//     { label: 'Create powerful card templates', personal: false, professional: false, business: true, enterprise: true },
//     { label: 'Automated email signature integrations', personal: false, professional: false, business: true, enterprise: true },
//     { label: 'Custom email signature disclaimers', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Corporate virtual backgrounds', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Salesforce and Hubspot integration', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Corporate directory', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Custom contact exchange form', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Contact capture consent form', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Administrative Dashboard', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'SOC 2 Report', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Direct SSO integrations', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Onboarding session', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Verified Digital Business Cards', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Zoom and phone technical support', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Multiple display support', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Invoice billing option', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Upload Custom Fonts', personal: false, professional: false, business: false, enterprise: true },
//     { label: 'Brand Partner Program', personal: false, professional: false, business: false, enterprise: true },
// ];

// const planCols: (keyof FeatureRow)[] = ['personal', 'professional', 'business', 'enterprise'];
// const planColColors = [C.purple, C.purple, C.coral, C.navy];
// const planColLabels = ['Personal', 'Professional', 'Business', 'Enterprise'];
// const planColCtaLabels = ['Get started for free', 'Sign Up', 'View Pricing', 'Contact Us'];

// // ─── Cell renderer ────────────────────────────────────────────────────────────
// const Cell = ({ value }: { value: CellVal }) => {
//     if (typeof value === 'string') return (
//         <Typography sx={{ fontSize: 13, color: C.navy, fontWeight: 500, textAlign: 'center' }}>{value}</Typography>
//     );
//     return value
//         ? <CheckCircleIcon sx={{ fontSize: 18, color: '#22C55E', display: 'block', mx: 'auto' }} />
//         : <CancelIcon sx={{ fontSize: 18, color: '#EF4444', display: 'block', mx: 'auto' }} />;
// };

// // ─── FAQ data ─────────────────────────────────────────────────────────────────
// const faqs = [
//     { q: 'What are Weana Products?', a: 'A Weana product transfers your Weana profile information with an NFC tap or scannable QR code into someone else\'s phone. Your Profile is highly customisable and includes a bio, social media links, payment info and other details that you can input to make it easy to share all those details with anyone in one swift action without the need for them to have third party apps installed.' },
//     { q: 'What benefits do digital business cards offer?', a: 'Digital business cards are eco-friendly, always up to date, and instantly shareable. They eliminate the need for physical printing and allow you to include rich media like videos, links, and payment options.' },
//     { q: 'Do I need to download an app or pay a subscription to use Weana?', a: 'No app download is required to receive someone\'s Weana card. The card recipient can view and save your information directly in their phone\'s browser. A subscription is only needed to create and manage your own digital card.' },
//     { q: 'Does the other person need a Weana product to receive my details?', a: 'No. Anyone with a smartphone can receive your Weana profile via NFC tap, QR code scan, or a shared link — no app or account required on their end.' },
//     { q: 'What material are the products made of?', a: 'Weana physical products are made from premium PVC or metal, depending on the product tier. Our Premium Card uses a uniquely finished metal that gives a luxury feel in every handshake.' },
//     { q: 'Can I link my profile to multiple products?', a: 'Yes. You can link your Weana profile to multiple NFC cards, QR codes, and other products simultaneously. Any update to your profile reflects across all linked products instantly.' },
//     { q: 'If I order different or multiple products, can I connect them to different profiles?', a: 'Yes. Each product can be linked to a different Weana profile, making it easy for professionals who manage multiple roles or brands to switch between personas.' },
//     { q: 'Can I link my product directly to my website without using my Weana profile?', a: 'Yes. You can configure your Weana product to redirect directly to any URL of your choice, including your personal website, LinkedIn, or any other destination.' },
//     { q: 'How compatible are the products with phones?', a: 'Weana NFC products work with all modern NFC-enabled smartphones including iPhone XS and later, and most Android phones from 2019 onwards. QR codes work with any smartphone camera.' },
// ];

// // ─── Pricing Hero ─────────────────────────────────────────────────────────────
// function PricingHero({ billing, setBilling }: { billing: 'monthly' | 'yearly'; setBilling: (b: 'monthly' | 'yearly') => void }) {
//     return (
//         <Box sx={{ background: '#fff', pt: 6, pb: 2 }}>
//             <Container maxWidth="lg">
//                 {/* Breadcrumb */}
//                 <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "center", mb: 3 }}>
//                     <Typography component={Link} href="/home" sx={{ display: "flex", alignItems: "center", fontSize: 12, color: C.muted, textDecoration: 'none', gap: "4px", '&:hover': { color: C.purple } }}>
//                         <Image src="/images/home_icon.png" alt="h" width={18} height={18} />
//                         Home
//                     </Typography>
//                     <Typography sx={{ fontSize: 12, color: C.muted }}>›</Typography>
//                     <Typography sx={{ fontSize: 12, color: C.purple, fontWeight: 600 }}>Pricing</Typography>
//                 </Stack>

//                 {/* Headline */}
//                 <Typography sx={{ textAlign: 'center', fontSize: { xs: 28, md: 50 }, fontWeight: 900, color: "#120808", letterSpacing: -1, lineHeight: 1.2, mb: 1.5 }}>
//                     Enhance your experience<br />with every plan.
//                 </Typography>
//                 <Typography sx={{ textAlign: 'center', fontSize: 20, color: "#5A5251", mb: 4 }}>
//                     Choose a plan today and evolve it as your business grows
//                 </Typography>

//                 {/* Monthly / Yearly toggle */}
//                 <Box sx={{ display: 'flex', justifyContent: 'center', mb: 5 }}>
//                     <BillingToggle>
//                         <ToggleBtn active={billing === 'monthly'} onClick={() => setBilling('monthly')} style={{ padding: "4px 20px" }}>Monthly</ToggleBtn>
//                         <ToggleBtn active={billing === 'yearly'} onClick={() => setBilling('yearly')} style={{ padding: "4px 20px" }}>
//                             Yearly
//                             <Chip label="-20%" size="small" sx={{ ml: 2, height: 18, fontSize: 9, fontWeight: 700, background: 'transparent', color: '#000', border: "1px solid #08AA44", '& .MuiChip-label': { px: 1 } }} />
//                         </ToggleBtn>
//                     </BillingToggle>
//                 </Box>
//             </Container>
//         </Box>
//     );
// }

// // ─── Pricing Cards ────────────────────────────────────────────────────────────
// function PricingCards({ billing }: { billing: 'monthly' | 'yearly' }) {
//     return (
//         <Box sx={{ background: '#fff', pb: 8 }}>
//             <Container maxWidth="lg">
//                 <Grid container spacing={2.5} sx={{ alignItems: "stretch" }}>
//                     {plans.map((plan, i) => (
//                         <Grid size={{ xs: 12, sm: 6, md: 3 }} key={plan.name}>
//                             <Box sx={{
//                                 // border: plan.highlight ? `2px solid ${C.purple}` : `1px solid ${C.border}`,
//                                 borderRadius: "12px",
//                                 p: 1.5,
//                                 height: '100%',
//                                 display: 'flex',
//                                 flexDirection: 'column',
//                                 background: plan.highlight ? '#FAFAFF' : '#fff',
//                                 position: 'relative',
//                                 boxShadow: "0px 4px 20px 0px #00000040",
//                                 // boxShadow: plan.highlight ? '0 4px 24px rgba(123,94,167,0.12)' : 'none',
//                             }}>
//                                 {/* Badge */}
//                                 <Box sx={{ background: plan.background, height: "120px", display:"flex", flexDirection:"column", justifyContent:"space-between", mb: 1.5, p: 1 }}>
//                                     <Stack direction="row" sx={{ justifyContent: "space-between", alignItems: "center" }}>
//                                         <Chip label={plan.name} size="small" sx={{ background: "#9759DB", color: "#fff", fontWeight: 700, fontSize: 11, borderRadius: "20px", }} />
//                                         <Typography sx={{ fontSize: 11, color: C.muted }}>{plan.badge}</Typography>
//                                     </Stack>

//                                     {/* Price */}
//                                     {plan.priceLabel === 'Free' || plan.priceLabel === 'Custom' ? (
//                                         <Typography sx={{ fontSize: "35px", fontWeight: 500, color: "#000", letterSpacing: "2%" }}>{plan.priceLabel}</Typography>
//                                     ) : (
//                                         <Stack direction="row" sx={{ alignItems: "baseline", mb: 0.5, display:"flex" }} spacing={0.5}>
//                                             <Typography sx={{ fontSize: "35px", fontWeight: 500, color: "#000", letterSpacing: "2%" }}>
//                                                 {billing === 'yearly' && plan.price.yearly ? `$${plan.price.yearly}` : plan.priceLabel}
//                                             </Typography>
//                                             <Typography sx={{ fontSize: "15px", fontWeight: 400, color: "#5A5251", letterSpacing: "0px" }}>{plan.priceSub}</Typography>
//                                         </Stack>
//                                     )}
//                                 </Box>

//                                 <Typography sx={{ fontSize: 12, color: C.muted, mb: 2.5, lineHeight: 1.5 }}>{plan.desc}</Typography>

//                                 {/* CTA */}
//                                 <Button
//                                     fullWidth
//                                     sx={{
//                                         borderRadius: 999,
//                                         py: 1.1,
//                                         fontSize: 13,
//                                         fontWeight: 600,
//                                         textTransform: 'none',
//                                         mb: 2.5,
//                                         background: plan.ctaVariant === 'filled' ? plan.color : 'transparent',
//                                         color: plan.ctaVariant === 'filled' ? '#fff' : plan.color,
//                                         border: plan.ctaVariant === 'outline' ? `1.5px solid ${plan.color}` : 'none',
//                                         '&:hover': {
//                                             background: plan.ctaVariant === 'filled' ? '#6B4E97' : plan.color + '12',
//                                         },
//                                     }}
//                                 >
//                                     {plan.cta}
//                                 </Button>

//                                 {/* Divider */}
//                                 <Box sx={{ borderTop: `1px solid ${C.border}`, mb: 2 }} />

//                                 {/* Features */}
//                                 <Stack spacing={1} sx={{ flex: 1 }}>
//                                     {plan.features.map((f) => (
//                                         <Stack key={f} direction="row" spacing={1} sx={{ alignItems: "flex-start" }}>
//                                             <CheckCircleIcon sx={{ fontSize: 15, color: '#22C55E', mt: 0.3, flexShrink: 0 }} />
//                                             <Typography sx={{ fontSize: 12, color: '#444', lineHeight: 1.5 }}>{f}</Typography>
//                                         </Stack>
//                                     ))}
//                                 </Stack>
//                             </Box>
//                         </Grid>
//                     ))}
//                 </Grid>
//             </Container>
//         </Box>
//     );
// }

// // ─── Feature Comparison Table ─────────────────────────────────────────────────
// function ComparisonTable() {
//     return (
//         <Box sx={{ background: '#fff', py: 10 }}>
//             <Container maxWidth="lg">
//                 <Typography sx={{ textAlign: 'center', fontSize: { xs: 26, md: 36 }, fontWeight: 900, color: C.navy, letterSpacing: -0.5, mb: 1 }}>
//                     Compare all features
//                 </Typography>
//                 <Typography sx={{ textAlign: 'center', fontSize: 14, color: C.muted, mb: 6 }}>
//                     Find the plan that is right for you.
//                 </Typography>

//                 <Box sx={{ overflowX: 'auto' }}>
//                     <Box sx={{ minWidth: 640 }}>
//                         {/* Table header */}
//                         <Box sx={{ display: 'grid', gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr', mb: 0 }}>
//                             <Box sx={{ p: 2 }}>
//                                 <Typography sx={{ fontSize: 15, fontWeight: 800, color: C.navy }}>Features</Typography>
//                             </Box>
//                             {planColLabels.map((label, i) => (
//                                 <Box key={label} sx={{ p: 2, textAlign: 'center' }}>
//                                     <Chip label={label} size="small" sx={{ background: planColColors[i] + '18', color: planColColors[i], fontWeight: 700, fontSize: 11, mb: 0.8, height: 22 }} />
//                                     <br />
//                                     <Button size="small" sx={{
//                                         borderRadius: 999, fontSize: 10, fontWeight: 600, textTransform: 'none', mt: 0.5,
//                                         background: planColColors[i], color: '#fff', px: 1.5, py: 0.4,
//                                         '&:hover': { background: planColColors[i], opacity: 0.85 },
//                                     }}>
//                                         {planColCtaLabels[i]}
//                                     </Button>
//                                 </Box>
//                             ))}
//                         </Box>

//                         {/* Feature rows */}
//                         {featureRows.map((row, idx) => (
//                             <Box
//                                 key={row.label}
//                                 sx={{
//                                     display: 'grid',
//                                     gridTemplateColumns: '2fr 1fr 1fr 1fr 1fr',
//                                     background: idx % 2 === 0 ? '#F9F5FF' : '#fff',
//                                     borderRadius: 2,
//                                     '&:hover': { background: '#F0EEF8' },
//                                     transition: 'background 0.15s',
//                                 }}
//                             >
//                                 <Box sx={{ p: '10px 16px', display: 'flex', alignItems: 'center' }}>
//                                     <Typography sx={{ fontSize: 13, color: C.navy }}>{row.label}</Typography>
//                                 </Box>
//                                 {planCols.map((col) => (
//                                     <Box key={col} sx={{ p: '10px 16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
//                                         <Cell value={row[col] as CellVal} />
//                                     </Box>
//                                 ))}
//                             </Box>
//                         ))}
//                     </Box>
//                 </Box>
//             </Container>
//         </Box>
//     );
// }

// // ─── FAQ ──────────────────────────────────────────────────────────────────────
// const StyledAccordion = styled(Accordion)({
//     boxShadow: 'none',
//     borderBottom: `1px solid rgba(180,178,210,0.25)`,
//     // borderRadius: '12px !important',
//     // marginBottom: 12,
//     '&:before': { display: 'none' },
//     '&.Mui-expanded': { margin: '0 0 12px' },
// });

// function FAQ() {
//     const [expanded, setExpanded] = useState<number | false>(0);

//     return (
//         <Box sx={{ background: "transparent", py: 10 }}>
//             <Container maxWidth="md">
//                 <Typography sx={{ textAlign: 'center', fontSize: { xs: 26, md: 36 }, fontWeight: 900, color: C.navy, letterSpacing: -0.5, mb: 6 }}>
//                     Frequently Asked Questions
//                 </Typography>

//                 {faqs.map((faq, i) => (
//                     <StyledAccordion
//                         key={i}
//                         expanded={expanded === i}
//                         onChange={() => setExpanded(expanded === i ? false : i)}
//                     >
//                         <AccordionSummary
//                             expandIcon={<ExpandMoreIcon sx={{ color: C.purple }} />}
//                             sx={{ px: 3, py: 0.5, '& .MuiAccordionSummary-content': { my: 1.5 } }}
//                         >
//                             <Typography sx={{ fontSize: 14, fontWeight: 600, color: C.navy }}>{faq.q}</Typography>
//                         </AccordionSummary>
//                         <AccordionDetails sx={{ px: 3, pb: 2.5 }}>
//                             <Typography sx={{ fontSize: 13.5, color: C.muted, lineHeight: 1.75 }}>{faq.a}</Typography>
//                         </AccordionDetails>
//                     </StyledAccordion>
//                 ))}
//             </Container>
//         </Box>
//     );
// }

// // ─── Page ─────────────────────────────────────────────────────────────────────
// export default function PricingPage() {
//     const [billing, setBilling] = useState<'monthly' | 'yearly'>('monthly');

//     return (
//         <Box>
//             <PricingHero billing={billing} setBilling={setBilling} />
//             <PricingCards billing={billing} />
//             <SocialProof isHome={false} />
//             <ComparisonTable />
//             <FAQ />
//         </Box>
//     );
// }


'use client'

import * as React from 'react'
import {
    Box, Container, Button, Stack, Typography, Chip,
    ToggleButtonGroup, ToggleButton, Paper, Grid, Divider, Table, TableBody,
    TableCell, TableContainer, TableHead, TableRow, Accordion, AccordionSummary,
    AccordionDetails, useMediaQuery
} from '@mui/material'
import { styled, useTheme } from '@mui/material/styles'
import CheckIcon from '@mui/icons-material/Check'
import TaskAltOutlinedIcon from '@mui/icons-material/TaskAltOutlined';
import CloseIcon from '@mui/icons-material/Close'
import Person2OutlinedIcon from '@mui/icons-material/Person2Outlined';
import GroupOutlinedIcon from '@mui/icons-material/GroupOutlined'
import ApartmentOutlinedIcon from '@mui/icons-material/ApartmentOutlined'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown'
import NavigateNextIcon from '@mui/icons-material/NavigateNext'
import SocialProof from '../../features/carousel'
import Image from 'next/image'
import Link from 'next/link'

const BADGE_GRADIENT = 'linear-gradient(90deg, #b197fc 0%, #9775fa 100%)'
const CORAL_GRADIENT = 'linear-gradient(90deg, #ff6f61 0%, #ff4f5e 100%)'
const BTN_LIGHT_PURPLE = '#c5b6ff'

const PlanBadge = ({ children }: any) => (
    <Chip
        label={children}
        size="small"
        sx={{
            background: BADGE_GRADIENT,
            color: '#fff',
            fontWeight: 700,
            fontSize: 11,
            height: 26,
            px: 1,
            borderRadius: 999,
        }}
    />
)

const CoralButton = styled(Button)({
    background: "#7B49B1",
    color: '#fff',
    borderRadius: 999,
    fontWeight: 700,
    padding: '10px 18px',
    boxShadow: '0 4px 12px rgba(255,90,95,0.25)',
    '&:hover': { background: CORAL_GRADIENT, filter: 'brightness(1.05)' },
})

const OutlineWhiteButton = styled(Button)({
    background: '#fff',
    color: '#1E1E1E',
    borderRadius: "30px",
    fontWeight: 700,
    padding: '10px 18px',
    border: "1px solid #00000033",
    boxShadow: "0px 4px 4px 0px #00000040",
    '&:hover': { background: '#f9fafb', border: '1px solid #e5e7eb' },
})

const plans = [
    {
        key: 'free', badge: 'Personal', userLabel: '1 User', userIcon: Person2OutlinedIcon,
        title: 'Free', price: null, billing: null,
        tagline: 'Best for personal connections',
        cta: 'Get started for free', ctaStyle: 'outline',
        listTitle: 'With Personal, get:',
        features: [
            '4 free digital business cards',
            'Email signature generator',
            'QR & widget sharing',
            { text: 'Card & badge scanner', note: '(5 scans/month)' },
            'Virtual backgrounds',
        ],
        bg: '#EEEEEE',
    },
    {
        key: 'pro', badge: 'Professional', userLabel: '1 User', userIcon: Person2OutlinedIcon,
        title: null, price: '$6', priceSuffix: '/ month', billing: '$72 billed yearly',
        tagline: 'Network with a branded card',
        cta: 'Sign up', ctaStyle: 'filled',
        listTitle: 'With Professional, unlock:',
        features: [
            '16 digital business cards',
            'Additional card designs',
            'Custom colors & additional fonts',
            { text: 'Card & badge scanner', note: '(20 scans/month)' },
            'Branding for QR codes',
        ],
        bg: 'linear-gradient(180deg, #E7E7E7 0%, #CADBFF 100%)',
    },
    {
        key: 'business', badge: 'Business', userLabel: '5-100 user', userIcon: GroupOutlinedIcon,
        title: null, price: '$5', priceSuffix: 'per user / month', billing: '$60 per user / year',
        tagline: 'Unify your brand everywhere',
        cta: 'View pricing', ctaStyle: 'filled',
        listTitle: 'With Business, grow with:',
        features: [
            'Unlimited digital business cards',
            'Cards for your whole team',
            'Templates for sub-teams',
            { text: 'Universal contact scanner', note: '(Unlimited scans)' },
            'Team email signatures',
        ],
        bg: 'linear-gradient(180deg, #E7E7E7 0%, #D6AFFF 100%)',
    },
    {
        key: 'custom', badge: 'Business', userLabel: '101+ users', userIcon: ApartmentOutlinedIcon,
        title: 'Custom', price: null, billing: null,
        tagline: 'Unify your brand everywhere',
        cta: 'Contact Us', ctaStyle: 'filled',
        listTitle: 'With Enterprise, scale with:',
        features: [
            'Unlimited digital business cards',
            'Cards for your whole company',
            'Templates for departments',
            { text: 'Universal contact scanner', note: '(Unlimited scans)' },
            'Upload custom fonts',
        ],
        bg: 'linear-gradient(180deg, #E7E7E7 0%, #F9D1AF 100%)',
    },
]

const compareFeatures = [
    { name: 'Number of users', values: ['1', '1', '5+', '101+'] },
    { name: 'Number of cards', values: ['4', '16', 'Unlimited', 'Unlimited'] },
    { name: 'Unlimited card sharing', values: [true, true, true, true] },
    { name: 'Customizable virtual backgrounds', values: [false, true, true, true] },
    { name: 'Multiple email signature styles', values: [true, true, true, true] },
    { name: 'Business card scans / month', values: ['5', '20', 'Unlimited', 'Unlimited'] },
    { name: 'Customer support', values: [true, true, true, true] },
    { name: 'Analytics', values: [false, true, true, true] },
    { name: 'Additional card designs', values: [false, true, true, true] },
    { name: 'Embedded videos', values: [false, true, true, true] },
    { name: 'Custom colors', values: [false, true, true, true] },
    { name: 'Badges', values: [false, true, true, true] },
    { name: 'Branded QR code', values: [false, true, true, true] },
    { name: 'Personalized card link', values: [false, true, true, true] },
    { name: 'Add notes and tags to contacts', values: [false, true, true, true] },
    { name: 'Contact Enrichment', values: [false, true, true, true] },
    { name: 'Sync with Google and Outlook', values: [false, true, true, true] },
    { name: 'Weana Events', values: [false, true, true, true] },
    { name: 'Additional Font Choices', values: [false, true, true, true] },
    { name: 'Create powerful card templates', values: [false, false, true, true] },
    { name: 'Automated email signature integrations', values: [false, false, true, true] },
    { name: 'Custom email signature disclaimers', values: [false, false, true, true] },
    { name: 'Corporate virtual backgrounds', values: [false, false, true, true] },
    { name: 'Salesforce and Hubspot integration', values: [false, false, true, true] },
    { name: 'Corporate directory', values: [false, false, true, true] },
    { name: 'Custom contact exchange form', values: [false, false, true, true] },
    { name: 'Contact capture consent form', values: [false, false, true, true] },
    { name: 'Administrative Dashboard', values: [false, false, true, true] },
    { name: 'SOC 2 Report', values: [false, false, true, true] },
    { name: 'Direct SSO integrations', values: [false, false, true, true] },
    { name: 'Onboarding session', values: [false, false, false, true] },
    { name: 'Verified Digital Business Cards', values: [false, false, false, true] },
    { name: 'Zoom and phone technical support', values: [false, false, false, true] },
    { name: 'Multiple division support', values: [false, false, false, true] },
    { name: 'Invoice billing option', values: [false, false, false, true] },
    { name: 'Upload Custom Fonts', values: [false, false, false, true] },
    { name: 'Brand Partner Program', values: [false, false, false, true] },
]

const faqs = [
    {
        q: 'What are Weana products?',
        a: `A Weana product transfers your Weana profile information with an NFC tap or scannable QR code onto someone else's phone.\nYour Profile is highly customizable and includes a bio, social media links, payment info and other details that you can input to make it easy to share all those details with anyone in one swift action without the need for them to have third party any apps installed.`,
    },
    { q: 'What benefits do digital business cards offer?', a: 'Digital business cards are always up-to-date, eco-friendly, shareable with a tap, and come with rich analytics so you can track engagement and grow your network efficiently.' },
    { q: 'Do I need to download an app or pay a subscription to use Weana?', a: 'No. Weana works right from the browser and a free plan is available. Premium features are optionally available via subscription.' },
    { q: 'Does the other person need a Weana product to receive my details?', a: 'No. Anyone with a modern smartphone can receive your information via NFC tap or QR code — no app or Weana account required.' },
    { q: 'What material are the products made of?', a: 'Our cards and tags are made from premium PVC, metal and bamboo variants depending on the product line you choose.' },
    { q: 'Can I link my profile to multiple products?', a: 'Absolutely. A single Weana profile can be linked to as many physical products as you like.' },
    { q: 'If I order different or multiple products, can I connect them to different profiles?', a: 'Yes. Each product can be mapped to a unique profile from your dashboard.' },
    { q: 'Can I link my product directly to my website without using my Weana profile?', a: 'Yes. Any Weana product can be configured to redirect to a custom URL directly.' },
    { q: 'How compatible are the products with phones?', a: 'Weana products work with virtually every modern iOS and Android device that supports NFC or a camera for QR scanning.' },
]

const YesCell = () => (
    <Box sx={{
        width: 24, height: 24, borderRadius: '50%', bgcolor: '#00B327',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mx: 'auto'
    }}>
        <CheckIcon sx={{ color: '#fff', fontSize: 16 }} />
    </Box>
)
const NoCell = () => (
    <Box sx={{
        width: 24, height: 24, borderRadius: '50%', bgcolor: '#D00B0B',
        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', mx: 'auto'
    }}>
        <CloseIcon sx={{ color: '#fff', fontSize: 16 }} />
    </Box>
)

function PricingPage() {
    const [billing, setBilling] = React.useState('yearly')
    const [expanded, setExpanded] = React.useState(0)
    const theme = useTheme()
    const isMd = useMediaQuery(theme.breakpoints.up('md'))

    return (
        <Box sx={{ bgcolor: '#fff', color: 'text.primary' }}>

            {/* HERO */}
            <Container maxWidth="lg" sx={{ pt: 8, pb: 6, textAlign: 'center' }}>
                <Stack direction="row" spacing={1} sx={{ color: '#6b7280', fontSize: 14, mb: 3, justifyContent: "center", alignItems: "center" }}>
                    <Box sx={{ display: "flex", alignItems: "center", gap: "4px", boxShadow: "0px 3px 0px 0px #0000000D", border: "1px solid #F2F2F2", borderRadius: "100px", p: "6px 16px" }}>
                        <Image src="/images/home_icon.png" alt="h" width={18} height={18} />
                        <Typography component={Link} href="/" sx={{ fontSize: 15, color: '#5A5251', textDecoration: 'none' }}>Home</Typography>
                        <NavigateNextIcon sx={{ fontSize: 15, color: '#5A5251' }} />
                        <Typography sx={{ fontSize: 15, color: '#5A5251' }}>Pricing</Typography>
                    </Box>
                </Stack>
                <Typography component="h1" sx={{ fontSize: { xs: 40, md: 68 }, fontWeight: 800, lineHeight: 1.05, letterSpacing: '-0.02em' }}>
                    Enhance your experience<br />with every plan.
                </Typography>
                <Typography sx={{ mt: 2.5, color: '#6b7280', fontSize: 17 }}>
                    Choose a plan today and evolve it as your business grows
                </Typography>

                <Box sx={{ mt: 4, display: 'inline-flex' }}>
                    <ToggleButtonGroup
                        value={billing}
                        exclusive
                        onChange={(_, v) => v && setBilling(v)}
                        sx={{
                            bgcolor: '#E7E7E7',
                            borderRadius: 999, p: 0.5,
                            boxShadow: '0 1px 3px rgba(0,0,0,0.05)', border: '1px solid #e5e7eb',
                            '& .MuiToggleButton-root': {
                                border: 0, borderRadius: '999px !important', px: 3.5, py: 1,
                                textTransform: 'none', fontWeight: 500, color: '#6b7280',
                                '&.Mui-selected': { bgcolor: '#fff', color: '#111827' },
                                '&.Mui-selected:hover': { bgcolor: '#fff' },
                            },
                        }}
                    >
                        <ToggleButton value="monthly">Monthly</ToggleButton>
                        <ToggleButton value="yearly">
                            Yearly
                            <Chip label="-25%" size="small" sx={{ ml: 1, background: 'transparent', color: '#000', border: "1px solid #08AA44", fontWeight: 700, fontSize: 11, height: 20 }} />
                        </ToggleButton>
                    </ToggleButtonGroup>
                </Box>
            </Container>

            {/* PRICING CARDS */}
            <Container maxWidth="lg" sx={{ pb: 12 }}>
                <Grid container spacing={2.5}>
                    {plans.map((p) => {
                        const UIcon = p.userIcon
                        return (
                            <Grid size={{ xs: 12, sm: 6, lg: 3 }} key={p.key}>
                                <Paper elevation={0} sx={{
                                    borderRadius: "12px", p: 1,
                                    minHeight: 520, display: 'flex', flexDirection: 'column',
                                    border: '1px solid rgba(255,255,255,0.6)',
                                    boxShadow: "0px 4px 20px 0px #00000040",
                                }}>
                                    <Box sx={{
                                        background: p.bg,
                                        p: 1,
                                        borderRadius: "8px",
                                        display: "flex",
                                        flexDirection: "column",
                                        justifyContent: "space-between",
                                    }}>
                                        <Stack direction="row" sx={{ mb: 4, justifyContent: "space-between", alignItems: "center" }}>
                                            <PlanBadge>{p.badge}</PlanBadge>
                                            <Stack direction="row" spacing={0.75} sx={{ color: '#000', fontSize: 13, alignItems: "center" }}>
                                                <UIcon sx={{ fontSize: 18 }} />
                                                <Typography sx={{ fontSize: 13 }}>{p.userLabel}</Typography>
                                            </Stack>
                                        </Stack>

                                        <Box sx={{ minHeight: 90, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                                            {p.title && (
                                                <Typography sx={{ fontSize: 35, fontWeight: "bold", lineHeight: 1, letterSpacing: '-0.02em' }}>{p.title}</Typography>
                                            )}
                                            {p.price && (
                                                <Stack direction="row" sx={{ alignItems: "flex-end" }} spacing={1}>
                                                    <Typography sx={{ fontSize: 35, fontWeight: "bold", lineHeight: 1 }}>{p.price}</Typography>
                                                    <Typography sx={{ color: '#5A5251', fontSize: 15, fontWeight: 400, pb: 0.5, maxWidth: 90, lineHeight: 1.2 }}>{p.priceSuffix}</Typography>
                                                </Stack>
                                            )}
                                            {p.billing && (
                                                <Typography sx={{ fontSize: 15, fontWeight: 400, color: '#5A5251', mt: 0.5 }}>{p.billing}</Typography>
                                            )}
                                        </Box>
                                    </Box>

                                    <Typography sx={{ fontSize: 15, fontWeight: 400, color: '#5A5251', mb: 2 }}>{p.tagline}</Typography>

                                    {p.ctaStyle === 'outline' ? (
                                        <OutlineWhiteButton fullWidth>{p.cta}</OutlineWhiteButton>
                                    ) : (
                                        <CoralButton fullWidth>{p.cta}</CoralButton>
                                    )}

                                    <Divider sx={{ my: 3, borderColor: 'rgba(255,255,255,0.7)' }} />

                                    <Typography sx={{ fontSize: 16, fontWeight: "bold", color:"#000", mb: 1.5 }}>{p.listTitle}</Typography>
                                    <Stack spacing={1.2}>
                                        {p.features.map((f, i) => (
                                            <Stack direction="row" spacing={1.2} sx={{ alignItems: "flex-start" }} key={i}>
                                                <TaskAltOutlinedIcon sx={{ color: '#7c5cff', fontSize: 18, mt: '2px' }} />
                                                <Typography sx={{ fontSize: 13, fontWeight:"regular", color: '#000' }}>
                                                    {typeof f === 'string' ? f : (<>
                                                        {f.text} <Box component="span" sx={{ color: '#898989', fontSize: 11 }}>{f.note}</Box>
                                                    </>)}
                                                </Typography>
                                            </Stack>
                                        ))}
                                    </Stack>
                                </Paper>
                            </Grid>
                        )
                    })}
                </Grid>
            </Container>

            {/* 2M+ BANNER */}
            <Container maxWidth="lg" sx={{ pt: 10, pb: 6 }}>
                <SocialProof isHome={false} />
            </Container>


            {/* COMPARE TABLE */}
            <Container maxWidth="lg" sx={{ pt: 10, pb: 6 }}>
                <Box sx={{ textAlign: 'center', mb: 5 }}>
                    <Typography sx={{ fontSize: { xs: 32, md: 52 }, fontWeight: 800, letterSpacing: '-0.02em' }}>Compare all features</Typography>
                    <Typography sx={{ color: '#6b7280', mt: 1 }}>Find the plan that is right for you</Typography>
                </Box>

                <TableContainer>
                    <Table sx={{ '& td, & th': { border: 0 } }}>
                        <TableHead>
                            <TableRow>
                                <TableCell sx={{ py: 3 }}>
                                    <Typography sx={{ fontSize: 28, fontWeight: 800 }}>Features</Typography>
                                </TableCell>
                                {plans.map((p) => (
                                    <TableCell key={p.key} align="center" sx={{ py: 3, minWidth: 170 }}>
                                        <Stack spacing={1.2} sx={{ alignItems: "center" }}>
                                            <PlanBadge>{p.badge}</PlanBadge>
                                            {p.ctaStyle === 'outline' ? (
                                                <OutlineWhiteButton sx={{ width: 150 }}>{p.cta}</OutlineWhiteButton>
                                            ) : (
                                                <CoralButton sx={{ width: 150 }}>{p.cta}</CoralButton>
                                            )}
                                        </Stack>
                                    </TableCell>
                                ))}
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {compareFeatures.map((row, idx) => (
                                <TableRow key={idx} sx={{ bgcolor: idx % 2 === 0 ? '#f9fafb' : '#fff' }}>
                                    <TableCell sx={{ py: 1.5, fontSize: 14.5, color: '#1f2937' }}>{row.name}</TableCell>
                                    {row.values.map((v, i) => (
                                        <TableCell key={i} align="center" sx={{ py: 1.5 }}>
                                            {v === true ? <YesCell /> : v === false ? <NoCell /> : <Typography sx={{ fontSize: 14, color: '#374151' }}>{v}</Typography>}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Container>

            {/* FAQ */}
            <Container maxWidth="md" sx={{ pt: 10, pb: 12 }}>
                <Typography sx={{ textAlign: 'center', fontSize: { xs: 32, md: 52 }, fontWeight: 800, letterSpacing: '-0.02em', mb: 5 }}>
                    Frequently Asked Questions
                </Typography>
                <Box sx={{ borderTop: '1px solid #e5e7eb', borderBottom: '1px solid #e5e7eb' }}>
                    {faqs.map((f, i) => (
                        <Accordion
                            key={i}
                            expanded={expanded === i}
                            onChange={() => setExpanded(expanded === i ? -1 : i)}
                            disableGutters
                            elevation={0}
                            square
                            sx={{
                                bgcolor: 'transparent',
                                borderBottom: i === faqs.length - 1 ? 0 : '1px solid #e5e7eb',
                                '&:before': { display: 'none' },
                            }}
                        >
                            <AccordionSummary expandIcon={<Image src="/images/expandLess.png" alt="icon" width="19" height="9" />} sx={{ py: 1 }}>
                                <Typography sx={{ fontSize: 17, fontWeight: 600 }}>{f.q}</Typography>
                            </AccordionSummary>
                            <AccordionDetails>
                                <Typography sx={{ fontSize: 15, color: '#4b5563', whiteSpace: 'pre-line', lineHeight: 1.7 }}>{f.a}</Typography>
                            </AccordionDetails>
                        </Accordion>
                    ))}
                </Box>
            </Container>
        </Box >
    )
}

export default PricingPage

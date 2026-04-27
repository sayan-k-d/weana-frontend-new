// src/components/pages/home/TermsOfServicePage.tsx
'use client';
import { Box, Container, Typography, Divider } from '@mui/material';

const sections = [
    {
        title: 'Overview',
        isH2: true,
        paragraphs: [
            'This website is operated by Weana. Throughout the site, the terms "we", "us" and "our" refer to Weana. Weana offers this website, including all information, tools and Services available from this site to you, the user, conditioned upon your acceptance of all terms, conditions, policies and notices stated here.',
            'By visiting our site and/or purchasing something from us, you engage in our "Service" and agree to be bound by the following terms and conditions ("Terms of Service", "Terms"), including those additional terms and conditions and policies referenced here in and/or available by hyperlink. These Terms of Service apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.',
            'Please read these Terms of Service carefully before accessing or using our website. By accessing or using any part of the site, you agree to be bound by these Terms of Service. If you do not agree to all the terms and conditions of this agreement, then you may not access the website or use any Services. If these Terms of Service are considered an offer, acceptance is expressly limited to these Terms of Service.',
            'Any new features or tools which are added to the current store shall also be subject to the Terms of Service. You can review the most current version of the Terms of Service at any time on this page. We reserve the right to update, change or replace any part of these Terms of Service by posting updates and/or changes to our website. It is your responsibility to check this page periodically for changes. Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.',
            'Our store is built using WooCommerce and hosted on WP Engine. They provide us with the online platform that allows us to sell our products and Services to you.',
        ],
    },
    {
        title: 'Section 1 - Online Store Terms',
        isH2: false,
        paragraphs: [
            'By agreeing to these Terms of Service, you represent that you are at least the age of majority in your state or province of residence, or that you are the age of majority in your state or province of residence and you have given us your consent to allow any of your minor dependents to use this site.',
            'You may not use our products for any illegal or unauthorized purpose nor may you, in the use of the Service, violate any laws in your jurisdiction (including but not limited to copyright laws). You must not transmit any worms or viruses or any code of a destructive nature.',
            'A breach or violation of any of the Terms will result in an immediate termination of your Services.',
        ],
    },
];

export default function TermsOfServicePage() {
    return (
        <Box sx={{ background: '#fff', minHeight: '100vh' }}>
            {/* Hero */}
            <Box sx={{ textAlign: 'center', pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}>
                <Typography
                    sx={{ fontSize: { xs: 32, md: 50 }, fontWeight: 600, color: '#1E1E1E', mb: 1.5 }}
                >
                    Terms of Service
                </Typography>
                <Typography sx={{ fontSize: 20, color: '#5A5251', mx: 'auto' }}>
                    By using our services, you agree to these terms and conditions
                </Typography>
            </Box>

            {/* Content */}
            <Container maxWidth="md" sx={{ pb: 12 }}>
                {sections.map((section, i) => (
                    <Box key={i} sx={{ mb: 5 }}>
                        <Typography
                            variant={section.isH2 ? 'h2' : 'h3'}
                            // sx={{ fontSize: { xs: 20, md: 35 }, fontWeight: 500, color: '#512B7A', mb: 2 }}
                            sx={{
                                fontSize: section.isH2 ? { xs: 22, md: 28 } : { xs: 16, md: 18 },
                                fontWeight: section.isH2 ? 500 : 400,
                                color: section.isH2 ? "#512B7A" : '#1A1A3E',
                                mb: 2,
                            }}
                        >
                            {section.title}
                        </Typography>
                        {
                            section.paragraphs.map((para, j) => (
                                <Typography
                                    key={j}
                                    sx={{ fontSize: 15, color: '#333', lineHeight: 1.8, mb: 2 }}
                                >
                                    {para}
                                </Typography>
                            ))
                        }
                    </Box>
                ))
                }
            </Container >
        </Box >
    );
}
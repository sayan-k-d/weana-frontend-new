// src/components/pages/home/PrivacyPolicyPage.tsx
'use client';
import { Box, Container, Typography, Divider } from '@mui/material';

const sections = [
    {
        title: 'Changes to This Privacy Policy',
        content:
            'We may update this Privacy Policy from time to time, including to reflect changes to our practices or for other operational, legal, or regulatory reasons. We will post the revised Privacy Policy on the Site, update the "Last updated" date and take any other steps required by applicable law.',
    },
    {
        title: 'How We Collect and Use Your Personal Information',
        content:
            'To provide the Services, we collect and have collected personal information about you from a variety of sources, as set out below. The information that we collect and use varies depending on how you interact with us. In addition to the specific uses set out below, we may use information we collect about you to communicate with you, provide the Services, comply with any applicable legal obligations, enforce any applicable terms of service, and to protect or defend the Services, our rights, and the rights of our users or others.',
        subsections: [
            {
                title: 'What Personal Information We Collect',
                content:
                    'The types of personal information we obtain about you depends on how you interact with our Site and use our Services. When we use the term "personal information", we are referring to information that identifies, relates to, describes or can be associated with you. The following sections describe the categories and specific types of personal information we collect.',
            },
        ],
    },
];

export default function PrivacyPolicyPage() {
    return (
        <Box sx={{ background: '#fff' }}>
            {/* Hero */}
            <Box sx={{ textAlign: 'center', pt: { xs: 8, md: 12 }, pb: { xs: 4, md: 6 } }}>
                <Typography
                    sx={{ fontSize: { xs: 32, md: 50 }, fontWeight: 600, color: '#1E1E1E', mb: 1.5 }}
                >
                    Privacy Policy
                </Typography>
                <Typography sx={{ fontSize: 20, color: '#5A5251', mx: 'auto' }}>
                    Protecting your data while providing a better experience for you
                </Typography>
            </Box>

            {/* Content */}
            <Container maxWidth="lg" sx={{ pb: 12 }}>
                {/* Last updated */}
                <Typography
                    sx={{ fontSize: 25, fontWeight: 500, color: '#F05B47', mb: 1.4 }}
                >
                    Last updated: 26 April 2024
                </Typography>

                {/* Intro paragraph */}
                <Typography sx={{ fontSize: 18, fontWeight: "400", color: '#5A5251', lineHeight: 1.8, mb: 6 }}>
                    This Privacy Policy describes how Weana (the "Site", "we", "us", or "our") collects, uses,
                    and discloses your personal information when you visit, use our services, or make a purchase
                    from Weana.co (the "Site") or otherwise communicate with us (collectively, the "Services").
                    For purposes of this Privacy Policy, "you" and "your" means you as the user of the Services,
                    whether you are a customer, website visitor, or another individual whose information we have
                    collected pursuant to this Privacy Policy. Please read this Privacy Policy carefully. By using
                    and accessing any of the Services, you agree to the collection, use, and disclosure of your
                    information as described in this Privacy Policy. If you do not agree to this Privacy Policy,
                    please do not use or access any of the Services.
                </Typography>

                {/* Sections */}
                {sections.map((section, i) => (
                    <Box key={i} sx={{ mb: 6 }}>
                        <Typography
                            variant="h2"
                            sx={{ fontSize: { xs: 20, md: 35 }, fontWeight: 500, color: '#512B7A', mb: 2 }}
                        >
                            {section.title}
                        </Typography>
                        <Typography sx={{ fontSize: 18, fontWeight: "400", color: '#5A5251', lineHeight: 1.8 }}>
                            {section.content}
                        </Typography>

                        {section.subsections?.map((sub, j) => (
                            <Box key={j} sx={{ mt: 3 }}>
                                <Typography sx={{ fontSize: 20, fontWeight: 500, color: '#000000', mb: 1 }}>
                                    {sub.title}
                                </Typography>
                                <Typography sx={{ fontSize: 18, fontWeight: 400, color: '#5A5251', lineHeight: 1.8 }}>
                                    {sub.content}
                                </Typography>
                            </Box>
                        ))}
                    </Box>
                ))}

            </Container>
        </Box>
    );
}
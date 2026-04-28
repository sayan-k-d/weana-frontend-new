'use client';

import Link from 'next/link';
import {
  Box, Typography, Button, Stack, Container,
  Grid, Chip,
  Avatar, CircularProgress,
} from '@mui/material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import PhoneOutlinedIcon from '@mui/icons-material/PhoneOutlined';
import EmailOutlinedIcon from '@mui/icons-material/EmailOutlined';
import LanguageOutlinedIcon from '@mui/icons-material/LanguageOutlined';
import SecurityOutlinedIcon from '@mui/icons-material/SecurityOutlined';
import DevicesOutlinedIcon from '@mui/icons-material/DevicesOutlined';
import CloudDoneOutlinedIcon from '@mui/icons-material/CloudDoneOutlined';
import BlockOutlinedIcon from '@mui/icons-material/BlockOutlined';
import MarkEmailUnreadOutlinedIcon from '@mui/icons-material/MarkEmailUnreadOutlined';
import EventRepeatOutlinedIcon from '@mui/icons-material/EventRepeatOutlined';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import Navbar from '../features/nav';
import Footer from '../features/footer';
import SocialProof from '../features/carousel';

const C = {
  bg: '#F0EEF8',
  bgLight: '#FAFAFA',
  coral: '#7B49B1',
  purple: '#7B5EA7',
  navy: '#1A1A3E',
  muted: '#888',
  border: 'rgba(180,178,210,0.3)',
  cardBg: '#F5F5F7',
};

type HeroContent = {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
};

const defaultHeroContent: HeroContent = {
  title: 'The Future of\nDigital Business\nCards is Here',
  subtitle: 'Elevate the way you connect',
  buttonText: 'Get Started for Free',
  buttonLink: '/register',
};

function RevealSection({ children, delay = 0 }: { children: React.ReactNode; delay?: number }) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsVisible(entry.isIntersecting);
      },
      { threshold: 0.05, rootMargin: '0px 0px -5% 0px' },
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <Box
      ref={ref}
      sx={{
        opacity: isVisible ? 1 : 0,
        transform: isVisible ? 'translateY(0) scale(1)' : 'translateY(36px) scale(0.985)',
        transition: `opacity 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms, transform 1200ms cubic-bezier(0.22, 1, 0.36, 1) ${delay}ms`,
        willChange: 'opacity, transform',
      }}
    >
      {children}
    </Box>
  );
}

function Hero() {
  const [heroReady, setHeroReady] = useState(false);
  const [heroContent, setHeroContent] = useState<HeroContent>(defaultHeroContent);

  useEffect(() => {
    let isMounted = true;

    const loadHeroContent = async () => {
      try {
        const response = await fetch('/api/home-content', { cache: 'no-store' });
        if (!response.ok || !isMounted) return;

        const data = await response.json();
        if (!data || !isMounted) return;

        const apiTitle = typeof data.title === 'string' ? data.title.trim() : '';
        const apiSubtitle = typeof data.subtitle === 'string' ? data.subtitle.trim() : '';
        const apiButtonText = typeof data.buttonText === 'string' ? data.buttonText.trim() : '';
        const apiButtonLink = typeof data.buttonLink === 'string' ? data.buttonLink.trim() : '';

        setHeroContent({
          title: apiTitle || defaultHeroContent.title,
          subtitle: apiSubtitle || defaultHeroContent.subtitle,
          buttonText: apiButtonText || defaultHeroContent.buttonText,
          buttonLink: apiButtonLink || defaultHeroContent.buttonLink,
        });
      } catch {
        // Keep default hero content when API is unavailable.
      } finally {
        if (isMounted) setHeroReady(true);
      }
    };

    loadHeroContent();
    return () => {
      isMounted = false;
    };
  }, []);

  const titleLines = heroContent.title.split('\n');

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: 620, md: 740 },
        overflow: 'hidden',
        bgcolor: '#04030A',
        '@keyframes heroFadeUp': {
          '0%': { opacity: 0, transform: 'translateY(24px)' },
          '100%': { opacity: 1, transform: 'translateY(0)' },
        },
        '@keyframes heroVideoFloat': {
          '0%': { transform: 'scale(1.02) translate(7.8%, 9.1%)' },
          '50%': { transform: 'scale(1.03) translate(8%, 8.6%)' },
          '100%': { transform: 'scale(1.02) translate(7.8%, 9.1%)' },
        },
      }}
    >
      <Box
        component="video"
        src="/images/banner_video.mp4"
        autoPlay
        muted
        loop
        playsInline
        sx={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          objectFit: 'contain',
          objectPosition: 'right bottom',
          transform: 'scale(1.02) translate(7.8%, 9.1%)',
          transformOrigin: 'right bottom',
          zIndex: 0,
          animation: 'heroVideoFloat 9s ease-in-out infinite',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(90deg, rgba(3,2,8,0.86) 0%, rgba(3,2,8,0.58) 42%, rgba(3,2,8,0.28) 100%)',
          zIndex: 1,
        }}
      />

      <Box sx={{ position: 'relative', zIndex: 2 }}>
        <Navbar isHome={true} />
        <Container maxWidth="lg" sx={{ mt: { xs: 8, md: 16 }, pb: { xs: 10, md: 14 } }}>
          {!heroReady ? (
            <Box
              sx={{
                minHeight: { xs: 280, md: 360 },
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                py: { xs: 6, md: 8 },
              }}
            >
              <CircularProgress size={44} thickness={4} sx={{ color: '#A67FD4' }} />
            </Box>
          ) : (
            <Grid container spacing={6} sx={{ alignItems: 'center' }}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ fontSize: { xs: 52, md: 74 }, fontWeight: 900, color: '#FFFFFF', lineHeight: 1.06, letterSpacing: -1.8, mb: 2, animation: 'heroFadeUp 1.35s cubic-bezier(0.22, 1, 0.36, 1) both' }}>
                  {titleLines.map((line, index) => (
                    <Box key={`${line}-${index}`} component="span" sx={{ display: 'block' }}>
                      {line}
                    </Box>
                  ))}
                </Typography>
                <Typography sx={{ fontSize: { xs: 16, md: 33 }, color: 'rgba(255,255,255,0.86)', mb: 3.5, lineHeight: 1.35, animation: 'heroFadeUp 1.5s cubic-bezier(0.22, 1, 0.36, 1) both', animationDelay: '120ms' }}>
                  {heroContent.subtitle}
                </Typography>
                <Button
                  component={Link}
                  href={heroContent.buttonLink}
                  sx={{
                    background: '#7B49B1',
                    color: '#fff',
                    borderRadius: 999,
                    px: 3.2,
                    py: 1.1,
                    fontSize: 15,
                    fontWeight: 700,
                    textTransform: 'none',
                    animation: 'heroFadeUp 1.65s cubic-bezier(0.22, 1, 0.36, 1) both',
                    animationDelay: '180ms',
                    transition: 'transform 360ms ease, box-shadow 360ms ease, background 320ms ease',
                    '&:hover': { background: '#6B3EA0', transform: 'translateY(-2px)', boxShadow: '0 14px 28px rgba(123,73,177,0.35)' },
                  }}
                >
                  {heroContent.buttonText}
                </Button>
              </Grid>
            </Grid>
          )}
        </Container>
      </Box>
    </Box>
  );
}

const steps = [
  {
    num: '01', title: 'Setup Your Profile',
    desc: 'Create your Weana digital business card in minutes. Add your photo, contact details, social links and more.',
    cta: 'Start free trial',
    visual: 'profile',
  },
  {
    num: '02', title: 'Collect Leads',
    desc: 'Share your card at events. Visitors can save their contact info directly to your leads dashboard.',
    cta: 'Start free trial',
    visual: 'leads',
  },
  {
    num: '03', title: 'Just Like That',
    desc: 'Manage all your leads from one place. Export, follow up, and convert prospects into customers.',
    cta: 'Start free trial',
    visual: 'done',
  },
];

const StepVisual = ({ type }: { type: string }) => {
  if (type === 'profile') return (
    <Image src="/images/step_1.png" alt="logo" width={686} height={512} priority />
  );

  if (type === 'leads') return (
    <Image src="/images/step_2.png" alt="logo" width={686} height={512} priority />
  );

  return (
    <Image src="/images/step_3.png" alt="logo" width={686} height={512} priority />
  );
};

function HowItWorks() {
  const howCards = [
    {
      title: 'Create',
      desc: 'Design a professional virtual business card in minutes. Customize your colors, add contact details, and update them anytime.',
      image: '/images/step_1.png',
    },
    {
      title: 'Share',
      desc: 'Connect with anyone in seconds. Use your QR code, NFC business card, or Apple Wallet pass to share your contact info.',
      image: '/images/step_2.png',
    },
    {
      title: 'Capture & Sync',
      desc: 'Never forget a face. Add notes and follow-up reminders to every new connection, then sync them to your CRM.',
      image: '/images/step_3.png',
    },
  ];

  return (
    <Box sx={{ background: '#fff', pb: { xs: 6, md: 9 } }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: { xs: 4, md: 5 } }}>
          <Typography sx={{ fontSize: { xs: 32, md: 56 }, fontWeight: 800, color: '#171321', letterSpacing: '-0.02em', lineHeight: 1.15, mb: 1.8 }}>
            How your digital business card works
          </Typography>
          <Typography sx={{ fontSize: { xs: 18, md: 20 }, color: '#4E4A58', lineHeight: 1.55, maxWidth: 760, mx: 'auto' }}>
            Create an electronic business card that works on iPhone and Android.
            <br />
            Build your profile in seconds and share it via your QR code, Apple Wallet
            <br />
            or NFC.
          </Typography>
        </Box>

        <Grid container spacing={3} sx={{ px: '7rem' }}>
          {howCards.map((card, index) => (
            <Grid key={card.title} size={{ xs: 12, md: 4 }}>
              <Box
                sx={{
                  border: '1px solid #E7E4EE',
                  borderRadius: 3,
                  pt: 1.6,
                  px: 1.6,
                  pb: 1.1,
                  height: '100%',
                  minHeight: 390,
                  width: { xs: '100%', md: '92%' },
                  mx: 'auto',
                  background: '#fff',
                  boxShadow: '0 1px 2px rgba(23, 19, 33, 0.04)',
                  transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease, border-color 360ms ease',
                  animation: 'howCardIn 1.2s cubic-bezier(0.22, 1, 0.36, 1) both',
                  animationDelay: `${index * 140}ms`,
                  '@keyframes howCardIn': {
                    '0%': { opacity: 0, transform: 'translateY(24px)' },
                    '100%': { opacity: 1, transform: 'translateY(0)' },
                  },
                  '&:hover': {
                    transform: 'translateY(-10px)',
                    boxShadow: '0 18px 36px rgba(39, 25, 73, 0.12)',
                    borderColor: '#D8CFF0',
                  },
                }}
              >
                <Box
                  sx={{
                    background: '#F4EEFF',
                    borderRadius: 2,
                    height: 195,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    overflow: 'hidden',
                    mb: 1.6,
                  }}
                >
                  <Image src={card.image} alt={card.title} width={360} height={220} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </Box>
                <Typography sx={{ fontSize: 24, fontWeight: 700, color: '#1F1A2B', mb: 0.8 }}>{card.title}</Typography>
                <Typography sx={{ fontSize: 12, color: '#55525F', lineHeight: 1.5 }}>{card.desc}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

const cards = [
  { id: 1, src: '/images/cardImage1.png', rotate: '-10deg', translateY: '16px' },
  { id: 2, src: '/images/cardImage2.png', rotate: '-7deg', translateY: '8px' },
  { id: 3, src: '/images/cardImage3.png', rotate: '-4deg', translateY: '0px' },
  { id: 4, src: '/images/cardImage4.png', rotate: '0deg', translateY: '-3px' },
  { id: 5, src: '/images/cardImage5.png', rotate: '4deg', translateY: '0px' },
  { id: 6, src: '/images/cardImage6.png', rotate: '7deg', translateY: '8px' },
  { id: 7, src: '/images/cardImage7.png', rotate: '10deg', translateY: '16px' },
];

function ChosenBy() {
  const [activeCardId, setActiveCardId] = useState<number | null>(null);
  const activeIndex = cards.findIndex((card) => card.id === activeCardId);
  const canSwapRight = activeIndex >= 0 && activeIndex < cards.length - 1;

  return (
    <Box sx={{ background: '#fff', py: 15, overflow: 'hidden' }}>
      <Container maxWidth="xl">
        <Typography sx={{ textAlign: 'center', fontSize: { xs: 24, md: 40 }, fontWeight: 800, color: '#000', mb: 12, maxWidth: 850, mx: 'auto', lineHeight: 1.2 }}>
          Chosen by employees at some{' '}
          <Box component="img" src="/images/profile_images.png" sx={{ display: 'inline-block', verticalAlign: 'middle', height: { xs: 30, md: 50 }, mx: 1 }} />
          {' '}of the most recognized brands worldwide
        </Typography>
        <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', mt: 7, px: { xs: 2, md: 4 } }}>
          {cards.map((card, index) => {
            const isHovered = activeCardId === card.id;
            const isRightNeighbor = canSwapRight && index === activeIndex + 1;
            const swapX = 174;
            const baseTransform = `translate3d(0, ${card.translateY}, 0) rotate(${card.rotate}) scale(1)`;
            const hoverTransform = `translate3d(${swapX}px, -9%, 0) rotate(0deg) scale(1.05)`;
            const rightNeighborTransform = `translate3d(-${swapX}px, ${card.translateY}, 0) rotate(${card.rotate}) scale(1)`;

            return (
              <Box
                key={card.id}
                onMouseEnter={() => setActiveCardId(card.id)}
                onMouseLeave={() => setActiveCardId(null)}
                sx={{
                  transformOrigin: 'center center',
                  marginLeft: index === 0 ? 0 : { xs: '-126px', md: '-184px' },
                  transform: isHovered ? hoverTransform : isRightNeighbor ? rightNeighborTransform : baseTransform,
                  transition: 'transform 0.62s cubic-bezier(0.22, 1, 0.36, 1)',
                  zIndex: isHovered ? 99 : index,
                  willChange: 'transform',
                  backfaceVisibility: 'hidden',
                  cursor: 'pointer',
                }}
              >
                <Box component="img" src={card.src} sx={{ width: { xs: 206, md: 350 }, height: 'auto', borderRadius: '24px' }} />
              </Box>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
}

function TeamCTA() {
  const stats = [
    {
      value: '60%',
      text: "of qualified leads met at events never make it to a company's CRM.",
      icon: <BlockOutlinedIcon sx={{ fontSize: 34, color: '#6F42B4' }} />,
    },
    {
      value: '8/10',
      text: 'of buyers choose the first vendor to follow-up with them after an event.',
      icon: <MarkEmailUnreadOutlinedIcon sx={{ fontSize: 34, color: '#6F42B4' }} />,
    },
    {
      value: '9 days',
      text: 'is the average time it takes teams to follow-up with their leads after a show.',
      icon: <EventRepeatOutlinedIcon sx={{ fontSize: 34, color: '#6F42B4' }} />,
    },
    {
      value: '40-50%',
      text: 'of collected event leads are unusable due to incomplete or poorly formatted data.',
      icon: <DescriptionOutlinedIcon sx={{ fontSize: 34, color: '#6F42B4' }} />,
    },
  ];

  return (
    <Box sx={{ background: '#FFF', mt: 10, py: { xs: 7, md: 10 } }}>
      <Container maxWidth="xl">
        <Box sx={{ maxWidth: 1240, mx: 'auto' }}>
          <Typography sx={{ textAlign: 'center', fontSize: { xs: 34, md: 48 }, fontWeight: 900, color: '#171321', lineHeight: 1.08, mb: 1.4 }}>
            In-person GTM is broken...
          </Typography>
          <Typography sx={{ textAlign: 'center', fontSize: { xs: 16, md: 24 }, color: '#2E2A39', lineHeight: 1.35, mb: 4.2, maxWidth: 930, mx: 'auto' }}>
            Companies spend big on events, but lack a system that turns those moments into measurable revenue.
          </Typography>

          <Grid container spacing={2.2}>
            {stats.map((item) => (
              <Grid key={item.value} size={{ xs: 12, sm: 6, md: 3 }}>
                <Box
                  sx={{
                    background: '#fff',
                    borderRadius: 2.6,
                    border: '1px solid #EAE7F1',
                    boxShadow: '0 3px 10px rgba(34, 26, 53, 0.10)',
                    p: { xs: 2.2, md: 2.4 },
                    minHeight: 226,
                    display: 'flex',
                    flexDirection: 'column',
                  }}
                >
                  <Typography sx={{ fontSize: { xs: 40, md: 46 }, fontWeight: 900, color: '#6F42B4', lineHeight: 1, mb: 0.8 }}>
                    {item.value}
                  </Typography>
                  <Typography sx={{ fontSize: 14, color: '#373243', lineHeight: 1.4, mb: 1.6 }}>
                    {item.text}
                  </Typography>
                  <Box sx={{ mt: 'auto' }}>{item.icon}</Box>
                </Box>
              </Grid>
            ))}
          </Grid>

          <Typography sx={{ textAlign: 'center', mt: 3.2, fontSize: { xs: 16, md: 24 }, color: '#2C2737', lineHeight: 1.3 }}>
            These stats are based on hundreds of real customer conversations and online verified sources
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}

const BusinessCardPreview = ({ name, title, location, showLock = false }: {
  name: string; title: string; location: string; showLock?: boolean;
}) => (
  <Box sx={{ position: 'relative', display: 'inline-block' }}>
    <Box sx={{ position: 'absolute', top: 16, left: -20, width: 220, height: 130, background: 'linear-gradient(135deg, #C4A0E8, #9B6FD0)', borderRadius: 16, boxShadow: '0 4px 16px rgba(0,0,0,0.10)', transform: 'rotate(-4deg)' }} />
    <Box sx={{ position: 'relative', zIndex: 1, width: 240, height: 140, background: 'linear-gradient(135deg, #A78FD8 0%, #7B5EA7 40%, #9B8FE8 100%)', borderRadius: 16, boxShadow: '0 8px 32px rgba(123,94,167,0.3)', overflow: 'hidden', p: 2 }}>
      <Typography sx={{ position: 'absolute', bottom: 8, right: 12, fontSize: 9, fontWeight: 800, color: 'rgba(255,255,255,0.5)', lineHeight: 1 }}>we{'\n'}ana</Typography>
      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
        <Box sx={{ width: 44, height: 44, borderRadius: '50%', background: 'linear-gradient(135deg, #E8D5A0, #C4A070)', border: '2px solid rgba(255,255,255,0.5)', flexShrink: 0, overflow: 'hidden', display: 'flex', alignItems: 'flex-end', justifyContent: 'center' }}>
          <Box sx={{ width: 28, height: 36, background: 'linear-gradient(180deg, #D4956A, #C07050)', borderRadius: '50% 50% 0 0' }} />
        </Box>
        <Box>
          <Typography sx={{ fontSize: 13, fontWeight: 800, color: '#fff', lineHeight: 1.2 }}>{name}</Typography>
          <Typography sx={{ fontSize: 10, color: 'rgba(255,255,255,0.75)', lineHeight: 1.3 }}>{title}</Typography>
          <Typography sx={{ fontSize: 9, color: 'rgba(255,255,255,0.6)' }}>{location}</Typography>
        </Box>
      </Box>
      <Stack spacing={0.6} sx={{ mt: 1.5 }}>
        {[PhoneOutlinedIcon, EmailOutlinedIcon, LanguageOutlinedIcon].map((Icon, i) => (
          <Box key={i} sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Box sx={{ width: 16, height: 16, borderRadius: '50%', background: 'rgba(255,255,255,0.25)', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
              <Icon sx={{ fontSize: 9, color: '#fff' }} />
            </Box>
            <Box sx={{ height: 4, width: ['80px', '100px', '60px'][i], background: 'rgba(255,255,255,0.3)', borderRadius: 2 }} />
          </Box>
        ))}
      </Stack>
    </Box>

    {showLock && (
      <Box sx={{ position: 'absolute', bottom: -16, right: -16, zIndex: 2, width: 52, height: 52, borderRadius: '50%', background: C.purple, display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 16px rgba(123,94,167,0.4)', border: '3px solid #fff' }}>
        <LockOutlinedIcon sx={{ fontSize: 22, color: '#fff' }} />
      </Box>
    )}
  </Box>
);

function WhyProfessionals() {
  return (
    <Box sx={{ background: '#fff', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 6 }}>
          <Typography sx={{ fontSize: { xs: 28, md: 42 }, fontWeight: 900, color: C.navy, letterSpacing: -1, mb: 3, lineHeight: 1.15 }}>
            Why Professionals Love Working With Us
          </Typography>
          <Button sx={{ background: '#6F42B4', color: '#fff', borderRadius: 999, px: 3.5, py: 1, fontSize: 14, fontWeight: 700, textTransform: 'none', '&:hover': { background: '#6035a2' } }}>
            Create my free card
          </Button>
        </Box>

        <Grid container spacing={2.2} sx={{ px: '7rem', maxWidth: '1360px', mx: 'auto' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2.5}>
              <Box sx={{ background: '#F6F6F8', borderRadius: 5, p: { xs: 3, md: 4 }, minHeight: 580, width: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 18px 34px rgba(23,19,33,0.12)' } }}>
                <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: '#171321', mb: 1.2, lineHeight: 1.14, letterSpacing: '-0.02em' }}>Consistency, Crafted to Perfection</Typography>
                <Typography sx={{ fontSize: 14, color: '#57535F', lineHeight: 1.55, mb: 3.2, maxWidth: '92%' }}>
                  Your logo. Your colors. Your voice. Seamlessly aligned across every profile.
                </Typography>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: 310 }}>
                  <Image src="/images/cardExp1.png" alt="consistency" width={430} height={322} style={{ objectFit: 'contain' }} />
                </Box>
              </Box>

              <Box sx={{ background: '#F6F6F8', borderRadius: 5, p: { xs: 3, md: 4 }, minHeight: 390, width: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 18px 34px rgba(23,19,33,0.12)' } }}>
                <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: '#171321', mb: 1.2, lineHeight: 1.14, letterSpacing: '-0.02em' }}>Crafted to support growth at every stage</Typography>
                <Typography sx={{ fontSize: 14, color: '#57535F', mb: 3, lineHeight: 1.55 }}>Streamline employee onboarding and maintain full cost control. With Weana, your technology evolves as your organization grows.</Typography>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                  <Image src="/images/cardExp2.png" alt="support" width={470} height={220} />
                </Box>
              </Box>
            </Stack>
          </Grid>

          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={2.5}>
              <Box sx={{ background: '#F6F6F8', borderRadius: 5, p: { xs: 3, md: 4 }, minHeight: 352, width: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 18px 34px rgba(23,19,33,0.12)' } }}>
                <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: '#171321', mb: 1.2, lineHeight: 1.14, letterSpacing: '-0.02em' }}>Instant CRM integration. <br /> Zero complexity</Typography>
                <Typography sx={{ fontSize: 14, color: '#57535F', mb: 3, lineHeight: 1.55 }}>Generate new leads while centralizing all your contacts in one place. With Weana, your contact data syncs seamlessly to your chosen CRM.</Typography>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                  <Image src="/images/crm.png" alt="crm" width={300} height={132} />
                </Box>
              </Box>

              <Box sx={{ background: '#F6F6F8', borderRadius: 5, p: { xs: 3, md: 4 }, minHeight: 460, width: '100%', display: 'flex', flexDirection: 'column', transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease', '&:hover': { transform: 'translateY(-8px)', boxShadow: '0 18px 34px rgba(23,19,33,0.12)' } }}>
                <Typography sx={{ fontSize: { xs: 24, md: 30 }, fontWeight: 800, color: '#171321', mb: 1.2, lineHeight: 1.14, letterSpacing: '-0.02em' }}>Centralized control with refined administrative oversight.</Typography>
                <Typography sx={{ fontSize: 14, color: '#57535F', mb: 3, lineHeight: 1.55 }}>
                  Weana enables scalable user management through a centralized admin console.
                </Typography>
                <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'center' }}>
                  <Image src="/images/cardExp3.png" alt="admin" width={470} height={310} />
                </Box>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function Gallery() {
  const floatingAvatars = [
    { src: '/images/profile_1.png', top: '30%', left: '5%', size: 100 },
    { src: '/images/profile_2.png', top: '55%', left: '12%', size: 100 },
    { src: '/images/profile_3.png', top: '75%', left: '2%', size: 100 },
    { src: '/images/profile_4.png', top: '30%', left: '25%', size: 100 },
    { src: '/images/profile_5.png', top: '75%', left: '28%', size: 100 },
    { src: '/images/profile_6.png', top: '30%', right: '2%', size: 100 },
    { src: '/images/profile_7.png', top: '55%', right: '12%', size: 100 },
    { src: '/images/profile_8.png', top: '75%', right: '2%', size: 100 },
    { src: '/images/profile_9.png', top: '30%', right: '25%', size: 100 },
    { src: '/images/profile_10.png', top: '75%', right: '28%', size: 100 },
  ];

  return (
    <Box sx={{ background: '#F9F4FF', p: '38px 31px', borderRadius: '122px', position: 'relative' }}>
      <Box sx={{ background: '#F6EEFF', py: 15, borderRadius: '120px', position: 'relative' }}>
        <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 2 }}>
          <Box sx={{ textAlign: 'center', mb: 4 }}>
            <Typography sx={{ fontSize: { xs: 32, md: 52 }, fontWeight: 900, color: '#000', lineHeight: 1.1, mb: 2, maxWidth: 800, mx: 'auto' }}>
              Visual gallery of different card styles and use cases.
            </Typography>
            <Typography sx={{ color: '#000', fontSize: 16, mb: 4 }}>Make every first impression unforgettable with Weana.</Typography>
            <Button sx={{ background: '#7B5EA7', color: '#fff', borderRadius: '999px', px: 4, py: 1.5, textTransform: 'none', fontWeight: 600, '&:hover': { background: '#6B4E97' } }}>
              Create my free card
            </Button>
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 8, position: 'relative', height: 450, '@keyframes galleryFloat': { '0%': { transform: 'translateY(0px)' }, '50%': { transform: 'translateY(-8px)' }, '100%': { transform: 'translateY(0px)' } } }}>
            {['ava.png', 'william.png', 'daniel.png', 'amelia.png'].map((img, i) => (
              <Box
                key={i}
                component="img"
                src={`/images/${img}`}
                sx={{
                  width: 320,
                  borderRadius: '32px',
                  position: 'absolute',
                  transform: `translateX(${i * 25}px) rotate(${i * 2}deg)`,
                  zIndex: 100 - i,
                  border: '1px solid rgba(255,255,255,0.1)',
                  transition: 'transform 420ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 420ms ease',
                  animation: `galleryFloat ${3 + i * 0.25}s ease-in-out infinite`,
                  '&:hover': {
                    transform: `translateX(${i * 25}px) rotate(${i * 2}deg) translateY(-10px) scale(1.02)`,
                    boxShadow: '0 20px 34px rgba(23,19,33,0.18)',
                  },
                }}
              />
            ))}
          </Box>
        </Container>

        {floatingAvatars.map((avatar, index) => (
          <Avatar
            key={index}
            src={avatar.src}
            sx={{
              width: avatar.size,
              height: avatar.size,
              position: 'absolute',
              top: avatar.top,
              left: avatar.left,
              right: avatar.right,
              zIndex: 1,
              animation: `float ${3 + (index % 2)}s ease-in-out infinite alternate`,
              '@keyframes float': {
                '0%': { transform: 'translateY(0px)' },
                '100%': { transform: 'translateY(-15px)' },
              },
            }}
          />
        ))}
      </Box>
    </Box>
  );
}

function PlatformHighlights() {
  const items = [
    {
      title: 'Trusted & secure',
      desc: 'Rated 4.8/5 by over 15000+ professionals using the best digital business card platform',
      icon: <SecurityOutlinedIcon sx={{ fontSize: 24, color: '#6F42B4' }} />,
    },
    {
      title: 'iOS & Android ready',
      desc: 'Works on all smartphones. Share directly to Apple Wallet or Google Wallet with one scan',
      icon: <DevicesOutlinedIcon sx={{ fontSize: 24, color: '#6F42B4' }} />,
    },
    {
      title: 'Create in minutes',
      desc: 'Design your free digital business card right now and start sharing immediately',
      icon: <CloudDoneOutlinedIcon sx={{ fontSize: 24, color: '#6F42B4' }} />,
    },
    {
      title: '100% eco-friendly',
      desc: 'Reduce your carbon footprint and stop wasting money on reprinting paper business cards',
      icon: <LanguageOutlinedIcon sx={{ fontSize: 24, color: '#6F42B4' }} />,
    },
  ];

  return (
    <Box sx={{ background: '#fff', py: { xs: 6, md: 9 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={2.2} sx={{ maxWidth: 1160, mx: 'auto' }}>
          {items.map((item) => (
            <Grid key={item.title} size={{ xs: 12, md: 6 }}>
              <Box
                sx={{
                  borderRadius: 3.2,
                  p: { xs: 2, md: 2.5 },
                  minHeight: { xs: 140, md: 152 },
                  background: 'linear-gradient(180deg, #F4E9FF 0%, #FFFFFF 100%)',
                  border: '1px solid #EFE7FF',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  textAlign: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 10px rgba(52, 35, 90, 0.08)',
                  transition: 'transform 300ms cubic-bezier(0.22, 1, 0.36, 1), box-shadow 300ms ease',
                  '&:hover': {
                    transform: 'translateY(-5px)',
                    boxShadow: '0 10px 18px rgba(63, 38, 108, 0.12)',
                  },
                }}
              >
                <Box sx={{ width: 34, height: 34, borderRadius: '50%', background: '#F2E8FF', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 1 }}>
                  <Box sx={{ transform: 'scale(0.86)' }}>{item.icon}</Box>
                </Box>
                <Typography sx={{ fontSize: { xs: 17, md: 21 }, fontWeight: 800, color: '#171321', mb: 0.35, lineHeight: 1.2 }}>
                  {item.title}
                </Typography>
                <Typography sx={{ fontSize: 12, color: '#6B6678', lineHeight: 1.35, maxWidth: 320 }}>
                  {item.desc}
                </Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function ConnectionsOrganized() {
  return (
    <Box sx={{ background: '#fff', pt: { xs: 7, md: 10 }, pb: { xs: 2, md: 3 } }}>
      <Container maxWidth="xl">
        <Box sx={{ textAlign: 'center', mb: 5 }}>
          <Typography sx={{ fontSize: { xs: 36, md: 56 }, fontWeight: 900, color: '#171321', lineHeight: 1.08, mb: 1.6 }}>
            Every connection organized instantly
          </Typography>
          <Typography sx={{ fontSize: { xs: 16, md: 28 }, color: '#332E3D', lineHeight: 1.35, maxWidth: 980, mx: 'auto', mb: 2.8 }}>
            Replace paper with the #1 virtual business card app
            <br />
            Turn meetings into lasting relationships with features built for real-world networking
          </Typography>
          <Button sx={{ background: '#6F42B4', color: '#fff', borderRadius: 999, px: 4, py: 1.1, textTransform: 'none', fontWeight: 700, '&:hover': { background: '#6035a2' } }}>
            Read more
          </Button>
        </Box>

        <Grid container spacing={2.4} sx={{ maxWidth: 1160, mx: 'auto', alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ background: '#F8F8F9', borderRadius: 4, p: { xs: 2.5, md: 3.2 }, minHeight: { xs: 470, md: 500 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: { xs: 26, md: 34 }, fontWeight: 800, color: '#171321', mb: 1 }}>Digital Business Card</Typography>
              <Typography sx={{ fontSize: 14, color: '#57535F', lineHeight: 1.55, mb: 2.5, maxWidth: 520 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
              </Typography>
              <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'flex-end', mt: 'auto', pt: 1 }}>
                <Image src="/images/cardExp1.png" alt="digital-business-card" width={500} height={350} style={{ width: '88%', height: 'auto', objectFit: 'contain' }} />
              </Box>
            </Box>
          </Grid>
          <Grid size={{ xs: 12, md: 6 }}>
            <Box sx={{ background: '#F8F8F9', borderRadius: 4, p: { xs: 2.5, md: 3.2 }, minHeight: { xs: 470, md: 500 }, height: '100%', display: 'flex', flexDirection: 'column' }}>
              <Typography sx={{ fontSize: { xs: 26, md: 34 }, fontWeight: 800, color: '#171321', mb: 1 }}>Business Contacts Manager</Typography>
              <Typography sx={{ fontSize: 14, color: '#57535F', lineHeight: 1.55, mb: 2.5, maxWidth: 520 }}>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
              </Typography>
              <Box sx={{ display: 'grid', gap: 1.3, mt: 'auto', pt: 1 }}>
                {['Olivia Reed', 'Ava Thompson', 'Mia Anderson'].map((name, idx) => (
                  <Box key={name} sx={{ background: '#fff', border: '1px solid #EEEAF5', borderRadius: 999, px: 2, py: 1.1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.2 }}>
                      <Box component="img" src={`/images/profile_${idx + 1}.png`} sx={{ width: 34, height: 34, borderRadius: '50%' }} />
                      <Typography sx={{ fontSize: 15, color: '#2A2634', fontWeight: 600 }}>{name}</Typography>
                    </Box>
                    <Box sx={{ width: 20, height: 20, borderRadius: '50%', background: '#F2ECFF', color: '#6F42B4', fontSize: 12, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>i</Box>
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

function EventFeatures() {
  const blocks = [
    { title: 'Card and Badge Scanning', image: '/images/cardExp2.png' },
    { title: 'Events and Exhibition', image: '/images/cardExp3.png' },
    { title: 'Lead Capture', image: '/images/step_1.png' },
    { title: 'AI Enrichment', image: '/images/cardExp1.png' },
  ];

  return (
    <Box sx={{ background: '#fff', pt: { xs: 1, md: 1.5 }, pb: { xs: 6, md: 8 } }}>
      <Container maxWidth="xl">
        <Grid container spacing={2.4} sx={{ maxWidth: 1160, mx: 'auto' }}>
          {blocks.map((b) => (
            <Grid key={b.title} size={{ xs: 12, md: 6 }}>
              <Box sx={{ background: '#F8F8F9', borderRadius: 4, p: { xs: 2.4, md: 3 }, minHeight: 420 }}>
                <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 800, color: '#171321', mb: 1 }}>{b.title}</Typography>
                <Typography sx={{ fontSize: 14, color: '#57535F', lineHeight: 1.55, mb: 2.2, maxWidth: 520 }}>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'center', mt: 1 }}>
                  <Image src={b.image} alt={b.title} width={420} height={250} style={{ objectFit: 'contain' }} />
                </Box>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

function SustainabilityCalculator() {
  const statCards = [
    { title: 'Total costs saved per year by switching from paper to digital:', value: '$38,620' },
    { title: 'Trees saved per year:', value: '50 Trees' },
    { title: 'Carbon emissions reduced per year:', value: '3,040 Lb of CO2' },
  ];

  return (
    <Box sx={{ background: '#fff', py: { xs: 7, md: 11 } }}>
      <Container maxWidth="xl">
        <Typography sx={{ textAlign: 'center', fontSize: { xs: 28, md: 44 }, fontWeight: 900, color: '#171321', mb: 4, lineHeight: 1.12, letterSpacing: '-0.02em' }}>
          Save money and the environment
        </Typography>

        <Grid container spacing={3} sx={{ maxWidth: 1220, mx: 'auto', alignItems: 'stretch' }}>
          <Grid size={{ xs: 12, md: 7 }}>
            <Grid container spacing={2}>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#222', mb: 0.75 }}>How many employees work at your company?</Typography>
                <Box component="select" sx={{ width: '100%', border: '1px solid #E8E5EE', borderRadius: 2, px: 1.4, py: 1, fontSize: 14 }}>
                  <option>1000</option>
                  <option>500</option>
                  <option>250</option>
                </Box>
              </Grid>
              <Grid size={{ xs: 12, md: 6 }}>
                <Typography sx={{ fontSize: 13, fontWeight: 700, color: '#222', mb: 0.75 }}>How many employees work at your company?</Typography>
                <Box component="select" sx={{ width: '100%', border: '1px solid #E8E5EE', borderRadius: 2, px: 1.4, py: 1, fontSize: 14 }}>
                  <option>1000</option>
                  <option>500</option>
                  <option>250</option>
                </Box>
              </Grid>
            </Grid>
            <Typography sx={{ textAlign: 'center', mt: 3.5, mb: 0.75, fontSize: { xs: 18, md: 26 }, fontWeight: 800, color: '#171321', lineHeight: 1.2 }}>
              How much does each paper business card cost?
            </Typography>
            <Typography sx={{ textAlign: 'center', fontSize: 12, color: '#333', mb: 2.2 }}>
              *industry average per paper card is between $0.25 and $0.50
            </Typography>
            <Box sx={{ px: { xs: 0, md: 1.5 }, mb: 3 }}>
              <Box sx={{ height: 6, borderRadius: 99, background: '#ECE8F5', position: 'relative' }}>
                <Box sx={{ width: '28%', height: 6, borderRadius: 99, background: '#6F42B4' }} />
                <Box sx={{ position: 'absolute', left: '25%', top: -5, width: 16, height: 16, borderRadius: '50%', background: '#6F42B4' }} />
              </Box>
              <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1, fontSize: 12, color: '#4B4656' }}>
                {['$0.20', '$0.40', '$0.60', '$0.80', '$1'].map((v) => <Typography key={v} sx={{ fontSize: 12 }}>{v}</Typography>)}
              </Box>
            </Box>
            <Typography sx={{ fontSize: { xs: 20, md: 28 }, fontWeight: 800, color: '#171321', mb: 1, lineHeight: 1.2 }}>Email me a copy of these results</Typography>
            <Box sx={{ display: 'flex', border: '1px solid #E7E2F2', borderRadius: 999, overflow: 'hidden', minHeight: 50 }}>
              <Box component="input" placeholder="Enter your email" sx={{ flex: 1, border: 'none', outline: 'none', px: 2, py: 1.35, fontSize: 14 }} />
              <Button sx={{ borderRadius: 0, px: 3, py: 1.1, fontSize: 14, background: '#6F42B4', color: '#fff', textTransform: 'none', fontWeight: 700, '&:hover': { background: '#6035A2' } }}>
                Email results
              </Button>
            </Box>
          </Grid>

          <Grid size={{ xs: 12, md: 5 }}>
            <Stack spacing={2.2}>
              {statCards.map((card) => (
                <Box key={card.title} sx={{ borderRadius: 3, p: { xs: 2, md: 2.4 }, minHeight: { xs: 118, md: 136 }, display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(180deg,#F4E9FF 0%, #FFFFFF 100%)', border: '1px solid #E9DDFB' }}>
                  <Typography sx={{ fontSize: 14, color: '#5E5870', mb: 0.6, lineHeight: 1.3 }}>{card.title}</Typography>
                  <Typography sx={{ fontSize: { xs: 30, md: 40 }, fontWeight: 900, color: '#171321', lineHeight: 1 }}>
                    {card.value}
                  </Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default function Home2Page() {
  return (
    <Box sx={{ background: '#fff', height: '100vh', overflowX: 'hidden', overflowY: 'auto' }}>
      <Hero />
      <SocialProof isHome={true} />
      <RevealSection delay={60}>
        <HowItWorks />
      </RevealSection>
      <RevealSection delay={90}>
        <WhyProfessionals />
      </RevealSection>
      <RevealSection delay={120}>
        <ChosenBy />
      </RevealSection>
      <RevealSection delay={130}>
        <PlatformHighlights />
      </RevealSection>
      <RevealSection delay={135}>
        <ConnectionsOrganized />
      </RevealSection>
      <RevealSection delay={138}>
        <EventFeatures />
      </RevealSection>
      <RevealSection delay={139}>
        <SustainabilityCalculator />
      </RevealSection>
      <RevealSection delay={140}>
        <Gallery />
      </RevealSection>
      <RevealSection delay={160}>
        <TeamCTA />
      </RevealSection>
      <RevealSection delay={180}>
        <Footer />
      </RevealSection>
    </Box>
  );
}

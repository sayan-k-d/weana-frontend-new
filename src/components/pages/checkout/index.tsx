'use client';

import Link from 'next/link';
import { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  Grid,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import Image from 'next/image';
import Footer from '@/components/layout/Footer';
import MarketingHeader from '@/components/layout/MarketingHeader';

const fieldSx = {
  '& .MuiOutlinedInput-root': {
    borderRadius: 1.5,
    background: '#fff',
    fontSize: 14,
    '& fieldset': { borderColor: '#E4E8EF' },
    '&:hover fieldset': { borderColor: '#D0D6E0' },
  },
  '& .MuiInputLabel-root': { fontSize: 14, color: '#5A6578' },
};

const orderLines = [
  { title: 'Original Card', detail: 'Graphic Purple x1', price: 'USD 47', image: '/images/original_card.png' },
  { title: 'Phone Card', detail: 'Red x1', price: 'USD 41', image: '/images/dot_card.png' },
];

function AddressFields({ idPrefix }: { idPrefix: string }) {
  return (
    <Grid container spacing={2}>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField id={`${idPrefix}-first`} fullWidth label="First Name *" placeholder="Enter first name" sx={fieldSx} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField id={`${idPrefix}-last`} fullWidth label="Last Name *" placeholder="Enter last name" sx={fieldSx} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField id={`${idPrefix}-phone`} fullWidth label="Phone *" placeholder="Enter phone number" sx={fieldSx} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField id={`${idPrefix}-city`} fullWidth label="Town / City *" placeholder="Enter city" sx={fieldSx} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField id={`${idPrefix}-zip`} fullWidth label="Postcode / Zip *" placeholder="Enter postcode" sx={fieldSx} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth sx={fieldSx}>
          <InputLabel id={`${idPrefix}-state-label`}>State / County *</InputLabel>
          <Select labelId={`${idPrefix}-state-label`} id={`${idPrefix}-state`} label="State / County *" defaultValue="">
            <MenuItem value="" disabled>
              Select state
            </MenuItem>
            <MenuItem value="1">State option 1</MenuItem>
            <MenuItem value="2">State option 2</MenuItem>
          </Select>
        </FormControl>
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <TextField id={`${idPrefix}-street`} fullWidth label="House No. / Street Name" placeholder="Enter address" sx={fieldSx} />
      </Grid>
      <Grid size={{ xs: 12, sm: 6 }}>
        <FormControl fullWidth sx={fieldSx}>
          <InputLabel id={`${idPrefix}-country-label`}>Country *</InputLabel>
          <Select labelId={`${idPrefix}-country-label`} id={`${idPrefix}-country`} label="Country *" defaultValue="">
            <MenuItem value="" disabled>
              Select country
            </MenuItem>
            <MenuItem value="kw">Kuwait</MenuItem>
            <MenuItem value="ae">United Arab Emirates</MenuItem>
            <MenuItem value="us">United States</MenuItem>
          </Select>
        </FormControl>
      </Grid>
    </Grid>
  );
}

export default function CheckoutPage() {
  const [sameBilling, setSameBilling] = useState(false);

  return (
    <Box sx={{ background: '#fff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <MarketingHeader />

      <Box sx={{ flex: 1, px: { xs: 2, md: 6 }, py: { xs: 3, md: 4 } }}>
        <Container maxWidth="xl">
          <Stack direction="row" spacing={0.75} sx={{ alignItems: 'center', mb: 0.75 }}>
            <Box
              component="span"
              sx={{
                width: 18,
                height: 18,
                borderRadius: '50%',
                background: 'linear-gradient(135deg, #FF8A4C 0%, #F05B4F 100%)',
                display: 'inline-flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Box sx={{ width: 6, height: 6, borderRadius: '50%', bgcolor: '#fff' }} />
            </Box>
            <Typography component={Link} href="/" sx={{ fontSize: 13, color: '#7A8596', textDecoration: 'none', fontWeight: 500 }}>
              Home
            </Typography>
            <Typography sx={{ fontSize: 13, color: '#7A8596' }}>{'>'}</Typography>
            <Typography sx={{ fontSize: 13, color: '#7A8596', fontWeight: 500 }}>Checkout</Typography>
          </Stack>

          <Typography sx={{ fontSize: { xs: 32, md: 40 }, fontWeight: 800, color: '#131E32', mb: { xs: 2.5, md: 3 } }}>Checkout</Typography>

          <Grid container spacing={{ xs: 3, md: 4 }} sx={{ alignItems: 'flex-start' }}>
            <Grid size={{ xs: 12, md: 7 }}>
              <Box
                sx={{
                  border: '1px solid #E8EDF3',
                  borderRadius: 2.5,
                  p: { xs: 2.2, md: 3 },
                  background: '#FAFBFC',
                }}
              >
                <Typography sx={{ fontSize: 14, fontWeight: 600, color: '#131E32', mb: 1.5 }}>Email *</Typography>
                <TextField fullWidth type="email" placeholder="Enter your email" sx={{ ...fieldSx, mb: 3 }} />

                <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#131E32', mb: 2 }}>Shipping Address</Typography>
                <AddressFields idPrefix="ship" />

                <FormControlLabel
                  sx={{ mt: 2.5, mb: sameBilling ? 0 : 2.5, alignItems: 'flex-start', ml: -0.5 }}
                  control={
                    <Checkbox
                      checked={sameBilling}
                      onChange={(_, v) => setSameBilling(v)}
                      sx={{ color: '#7D4AC7', '&.Mui-checked': { color: '#7D4AC7' }, pt: 0.3 }}
                    />
                  }
                  label={
                    <Typography sx={{ fontSize: 14, color: '#3A4457', lineHeight: 1.4 }}>Use the same address for billing</Typography>
                  }
                />

                {!sameBilling && (
                  <>
                    <Typography sx={{ fontSize: 17, fontWeight: 800, color: '#131E32', mb: 2, mt: 1 }}>Billing Address</Typography>
                    <AddressFields idPrefix="bill" />
                  </>
                )}
              </Box>
            </Grid>

            <Grid size={{ xs: 12, md: 5 }}>
              <Box
                sx={{
                  border: '1px solid #E8EDF3',
                  borderRadius: 2.5,
                  p: { xs: 2.2, md: 2.8 },
                  background: '#F4F6F9',
                }}
              >
                <Typography sx={{ fontSize: 18, fontWeight: 800, color: '#131E32', mb: 2 }}>Order Summery</Typography>

                <Stack spacing={2} sx={{ mb: 2 }}>
                  {orderLines.map((line) => (
                    <Stack key={line.title} direction="row" spacing={1.5} sx={{ alignItems: 'flex-start' }}>
                      <Box
                        sx={{
                          width: 64,
                          height: 64,
                          borderRadius: 1.2,
                          bgcolor: '#fff',
                          border: '1px solid #E8EDF3',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexShrink: 0,
                        }}
                      >
                        <Image src={line.image} alt={line.title} width={48} height={32} style={{ objectFit: 'contain' }} />
                      </Box>
                      <Box sx={{ flex: 1, minWidth: 0 }}>
                        <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#131E32' }}>{line.title}</Typography>
                        <Typography sx={{ fontSize: 12.5, color: '#7A8596', mt: 0.25 }}>{line.detail}</Typography>
                      </Box>
                      <Typography sx={{ fontSize: 14, fontWeight: 700, color: '#131E32', flexShrink: 0 }}>{line.price}</Typography>
                    </Stack>
                  ))}
                </Stack>

                <Stack spacing={1.1} sx={{ py: 2, borderTop: '1px solid #DDE2EA', borderBottom: '1px solid #DDE2EA', mb: 2 }}>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 13, color: '#5A6578' }}>Total Items</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#131E32' }}>02 Items</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 13, color: '#5A6578' }}>Sub total</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#131E32' }}>USD 181</Typography>
                  </Stack>
                  <Stack direction="row" sx={{ justifyContent: 'space-between' }}>
                    <Typography sx={{ fontSize: 13, color: '#5A6578' }}>Discount</Typography>
                    <Typography sx={{ fontSize: 13, fontWeight: 600, color: '#2E9D5C' }}>USD 0</Typography>
                  </Stack>
                  <Typography sx={{ fontSize: 12, color: '#7A8596', lineHeight: 1.45 }}>Shipping Charge: Shipping costs are calculated during checkout.</Typography>
                  <Stack direction="row" sx={{ justifyContent: 'space-between', pt: 0.5 }}>
                    <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#131E32' }}>Final Payment</Typography>
                    <Typography sx={{ fontSize: 15, fontWeight: 800, color: '#131E32' }}>USD 183</Typography>
                  </Stack>
                </Stack>

                <Stack direction="row" spacing={1} sx={{ mb: 3 }}>
                  <TextField fullWidth placeholder="Enter promo code" size="small" sx={{ ...fieldSx, flex: 1 }} />
                  <Button
                    sx={{
                      px: 2.5,
                      borderRadius: 2,
                      textTransform: 'none',
                      fontWeight: 700,
                      fontSize: 13,
                      color: '#fff',
                      background: '#F05B4F',
                      whiteSpace: 'nowrap',
                      '&:hover': { background: '#E55145' },
                    }}
                  >
                    Apply
                  </Button>
                </Stack>

                <Typography sx={{ fontSize: 16, fontWeight: 800, color: '#131E32', mb: 1.5 }}>Payment Method</Typography>
                <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1, mb: 2 }}>
                  {['tap', 'VISA', 'Mastercard', 'KNET'].map((label) => (
                    <Box
                      key={label}
                      sx={{
                        px: 1.4,
                        py: 0.6,
                        borderRadius: 1,
                        border: '1px solid #DDE2EA',
                        background: '#fff',
                        fontSize: 11,
                        fontWeight: 700,
                        color: '#3A4457',
                      }}
                    >
                      {label}
                    </Box>
                  ))}
                </Stack>

                <Button
                  fullWidth
                  sx={{
                    py: 1.4,
                    borderRadius: 2,
                    textTransform: 'none',
                    fontWeight: 800,
                    fontSize: 15,
                    color: '#fff',
                    background: '#F05B4F',
                    '&:hover': { background: '#E55145' },
                  }}
                >
                  Place Order
                </Button>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      <Footer />
    </Box>
  );
}

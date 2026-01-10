import React, { useState } from 'react';
import { Box, Button, TextField, Stack } from '@mui/material';
import WhatsAppIcon from '@mui/icons-material/WhatsApp';
import EmailIcon from '@mui/icons-material/Email';

function Contact() {
  const [form, setForm] = useState({
    name: '',
    contact: '',
    message: ''
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const isValid = form.name && form.contact && form.message;

  const sendWhatsApp = () => {
    if (!isValid) return;
    const phone = '6003167454'; // replace with your number
    const text = `New Portfolio Inquiry 🚀
Name: ${form.name}
Contact: ${form.contact}
Message:
${form.message}`;
    window.open(`https://wa.me/${phone}?text=${encodeURIComponent(text)}`, '_blank');
  };

  const sendGmail = () => {
    if (!isValid) return;

    const to = 'manavsaikiya@gmail.com';
    const subject = encodeURIComponent('Portfolio Inquiry');
    const body = encodeURIComponent(
      `Name: ${form.name}\nContact: ${form.contact}\n\n${form.message}`
    );

    // Opens Gmail compose in browser
    window.open(
      `https://mail.google.com/mail/?view=cm&fs=1&to=${to}&su=${subject}&body=${body}`,
      '_blank'
    );
  };

  return (
    <footer
      id="contact"
      style={{ padding: '40px 20px', color: 'inherit' }}
    >
      <Box sx={{ maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ textAlign: 'center', marginBottom: '8px' }}>Contact Me</h2>
        <p style={{ textAlign: 'center', marginBottom: '32px', opacity: 0.7 }}>
          Got a project waiting to be realized? Let's collaborate!
        </p>

        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2}
          justifyContent="center"
          marginBottom={2}
        >
          <TextField
            name="name"
            label="Name"
            value={form.name}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'gray' } }}
            InputProps={{
              style: {
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '8px'
              }
            }}
            sx={{ flex: 1 }}
          />

          <TextField
            name="contact"
            label="Email / Phone"
            value={form.contact}
            onChange={handleChange}
            InputLabelProps={{ style: { color: 'gray' } }}
            InputProps={{
              style: {
                color: 'black',
                backgroundColor: 'white',
                borderRadius: '8px'
              }
            }}
            sx={{ flex: 1 }}
          />
        </Stack>

        <TextField
          name="message"
          label="Message"
          value={form.message}
          onChange={handleChange}
          multiline
          rows={4}
          fullWidth
          InputLabelProps={{ style: { color: 'gray' } }}
          InputProps={{
            style: {
              color: 'black',
              backgroundColor: 'white',
              borderRadius: '8px',
              padding: '10px'
            }
          }}
          sx={{ marginBottom: 2 }}
        />

        <Stack
          direction={{ xs: 'column', sm: 'row' }}
          spacing={2}
          justifyContent="center"
        >
          {/* WhatsApp Button */}
          <Button
            variant="contained"
            startIcon={<WhatsAppIcon />}
            onClick={sendWhatsApp}
            disabled={!isValid}
            sx={{
              flex: 1,
              backgroundColor: 'white',
              color: '#25d366',
              borderRadius: '8px',
              fontWeight: 'bold',
              pointerEvents: isValid ? 'auto' : 'none',
              '&.Mui-disabled': {
                backgroundColor: 'white',
                color: '#25d366',
              },
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            WhatsApp
          </Button>

          {/* Gmail Button */}
          <Button
            variant="contained"
            startIcon={<EmailIcon />}
            onClick={sendGmail}
            disabled={!isValid}
            sx={{
              flex: 1,
              backgroundColor: 'white',
              color: '#000000',
              borderRadius: '8px',
              fontWeight: 'bold',
              pointerEvents: isValid ? 'auto' : 'none',
              '&.Mui-disabled': {
                backgroundColor: 'white',
                color: '#000000',
              },
              '&:hover': { backgroundColor: '#f0f0f0' }
            }}
          >
            Gmail
          </Button>
        </Stack>
      </Box>
    </footer>
  );
}

export default Contact;

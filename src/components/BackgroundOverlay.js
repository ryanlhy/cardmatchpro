import React, { useState } from 'react';
import Box from '@mui/material/Box';
import { Container } from '@mui/material';

const BackgroundOverlay = () => {
  const [showBackground, setShowBackground] = useState(true);
  
  return (
    <Container maxWidth="md">
          <Box sx={{mx:'auto'}}>

      {showBackground && (
        // <div style={{
          //   backgroundImage: `url(https://images.pokemontcg.io/base1/4_hires.png)`,
          //   backgroundSize: 'cover',
          //   backgroundRepeat: 'no-repeat',
          //   opacity: 0.5,
          //   position: 'fixed',
          //   top: 0,
          //   left: 0,
          //   right: 0,
          //   bottom: 0,
          // }}>
          //   {/* wrap your page contents here */}
          // </div>
          <Box
          component="img"
          sx={{
            // height: 233,
            // width: 350,
            maxHeight: { xs: 500, md: 1000 },
            maxWidth: { xs: 500, md: 1000 },
            backgroundSize: 'cover',
            backgroundRepeat: 'no-repeat',
            opacity: 0.2,
            position: 'absolute',
            // display: 'flex',
            // alignItems: 'center',
            // height: '100vh',
            // top: '80%',
            // left: '20%',
            mx: 'auto',
            zIndex: -1,
          }}
          alt="The house from the offer."
          src="https://images.pokemontcg.io/base1/4_hires.png"
          />
          )}
          </Box>
          </Container>
  
  );
};

export default BackgroundOverlay;

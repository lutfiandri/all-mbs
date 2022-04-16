import { Box, useMediaQuery } from '@chakra-ui/react';
import { QrReader } from 'react-qr-reader';

export function QRCodeReader({ setData }) {
  // const [isMobile] = useMediaQuery('(max-width: 800px)');

  // https://goqr.me/#
  return (
    <Box mx={4} my={4} borderRadius={24} overflow="hidden">
      <QrReader
        constraints={{ facingMode: 'environment' }}
        scanDelay={100}
        onResult={(result, error) => {
          if (!!result) {
            setData(result?.text);
          }
        }}
        style={{ width: '100%' }}
        videoContainerStyle={{
          width: '100%',
          margin: '0 auto',
          // transform: isMobile ? '' : 'rotateY(180deg)',
        }}
        videoStyle={{
          height: '100%',
          width: '100%',
          objectFit: 'cover',
        }}
      />
    </Box>
  );
}

import { ChakraProvider } from '@chakra-ui/react';
import theme from '../styles/theme';
import { store } from '../redux/store';
import { Provider } from 'react-redux';
import '../utils/firebase';
import '../styles/date-picker.css';

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <Component {...pageProps} />
      </ChakraProvider>
    </Provider>
  );
}

export default MyApp;

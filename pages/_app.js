import '../styles/globals.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Provider } from 'react-redux';
import { store } from '../app/store';
import { SSRProvider } from 'react-bootstrap';

function MyApp({ Component, pageProps }) {

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <Provider store={store}>
      <SSRProvider>
        {getLayout(<Component {...pageProps} />)}
      </SSRProvider>
    </Provider>
  )
}

export default MyApp

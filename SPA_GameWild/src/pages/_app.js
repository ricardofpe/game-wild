import RootLayout from '../app/layout'; 
import '../app/globals.css';
function MyApp({ Component, pageProps }) {
  return (
    <RootLayout>
      <Component {...pageProps} />
    </RootLayout>
  );
}

export default MyApp;

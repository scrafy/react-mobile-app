import useStore from 'src/redux/store';
import React from 'react';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }) => {

  const store = useStore();

  return (

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );

};

export async function getServerSideProps(ctx: any) {

  return { props: {} };
}


export default App;


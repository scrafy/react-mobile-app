import React from 'react';
import useStore from 'src/redux/store';
import { Provider } from 'react-redux';

const App = ({ Component, pageProps }) => {

  const store = useStore()

  return (

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );

};

App.getInitialProps = async (ctx: any) => {

  return {};

}

export default App;


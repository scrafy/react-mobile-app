import React from 'react';
import useStore from 'src/redux/store';
import { Provider } from 'react-redux';
const { decode } = require('url-encode-decode');
import { IState } from 'src/infraestructure/interfaces';

const App = ({ Component, pageProps }) => {

  const store = useStore()

  return (

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );

};

export default App;


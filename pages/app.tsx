import React from 'react';
import useStore from 'src/redux/store';
import { Provider } from 'react-redux';
import { UnitOfWorkService } from 'src/infraestructure/unitsofwork';


const App = ({ Component, pageProps }) => {

  const store = useStore(pageProps.initialState)

  return (

    <Provider store={store}>
      <Component {...pageProps} />
    </Provider>
  );

};

App.getInitialProps = async (ctx) => {

  if (!ctx.req) {
    const initialState: any = new UnitOfWorkService().getLocalStorageService().loadState() || {};
    return { initialState };
  }

}

export default App;


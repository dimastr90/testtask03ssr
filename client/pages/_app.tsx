import getConfig from 'next/config'
import '../styles/globals.css'
import 'react-toastify/dist/ReactToastify.css';
import 'react-calendar/dist/Calendar.css';
import ApolloClient from "apollo-boost";
import {ApolloProvider} from 'react-apollo';
import {Provider} from "react-redux";
import {store} from "../src/redux/store";

const {publicRuntimeConfig} = getConfig();

const {graphqlUri} = publicRuntimeConfig;

const client = new ApolloClient({
    uri: graphqlUri
});

function MyApp({Component, pageProps}) {
    return <Provider store={store}>
        <ApolloProvider client={client}>
            <Component {...pageProps} />
        </ApolloProvider>
    </Provider>
}

export default MyApp;
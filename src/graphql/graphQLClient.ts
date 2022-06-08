import {GraphQLClient} from 'graphql-request';
import Config from 'react-native-config';

const graphQLClient = new GraphQLClient(Config.API_URL);

export default graphQLClient;

const withImages = require('next-images');
module.exports = withImages({
        publicRuntimeConfig: {
            // Will be available on both server and client
            graphqlUri : 'http://localhost:5001/graphql'
        }
    }
);

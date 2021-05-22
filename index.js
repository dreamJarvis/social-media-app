const {ApolloServer} = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');


const server = new ApolloServer({
    typeDefs,
    resolvers
});

mongoose.connect(   
    MONGODB, 
    {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(() => {
        console.log('connected to mongodb...');
        return server.listen({port: 5000})
    })
    .then((res) => {
        console.log(`server running at ${res.url}`);
    });
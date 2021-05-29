const {ApolloServer, PubSub} = require('apollo-server');
const mongoose = require('mongoose');

const { MONGODB } = require('./config.js');
const typeDefs = require('./graphql/typeDefs.js');
const resolvers = require('./graphql/resolvers/index.js');

const pubsub = new PubSub(); //** for subscriptions

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: ({ req }) => ({ req, pubsub })   //TODO: what does this does ??
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
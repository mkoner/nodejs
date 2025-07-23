export const typeDefs = `#graphql
    type Game {
    id: ID!,
    title: String!,
    platform: [String!]!,
    }
    type Review {
    id: ID!,
    rating: Int!,
    comment: String,
    }
    type Author {
    id: ID!,
    name: String!, 
    }
    type Query {
    games: [Game],
    game(id: ID!): Game,
    reviews: [Review],
    review(id: ID!): Review,
    authors: [Author],
    author(id: ID!): Author,
    }
    `



// int, float, string, boolean, ID =>different scalar types
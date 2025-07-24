export const typeDefs = `#graphql
    type Game {
    id: ID!,
    title: String!,
    platform: [String!]!,
    reviews: [Review!],
    }
    type Review {
    id: ID!,
    rating: Int!,
    comment: String,
    game: Game!,
    author: Author!,
    }
    type Author {
    id: ID!,
    name: String!, 
    reviews: [Review!],
    }
    type Query {
    games: [Game],
    game(id: ID!): Game,
    reviews: [Review],
    review(id: ID!): Review,
    authors: [Author],
    author(id: ID!): Author,
    }
    type Mutation {
        deleteGame(id: ID!): Game,
        addGame(game: GameInput!): Game
    }
    input GameInput {
        title: String!,
        platform: [String!]!
    }
    `



// int, float, string, boolean, ID =>different scalar types
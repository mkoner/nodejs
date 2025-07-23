import { reviews, games, authors } from './data.js';

export const resolvers = {
    Query: {
        games: () => games,
        reviews: () => reviews,
        authors: () => authors,
        game: (_, { id }) => games.find(game => game.id === id),
        review: (_, { id }) => reviews.find(review => review.id === id),
        author: (_, { id }) => authors.find(author => author.id === id),
    },
    Game: {
        reviews: (game) => reviews.filter(review => review.game_id === game.id),
    },
    Author: {
        reviews: (author) => reviews.filter(review => review.author_id === author.id),
    },
    Review: {
        // game(review) {
        //     return games.find(game => game.id === review.game_id);
        // },
        // author(review) {
        //     return authors.find(author => author.id === review.author_id);
        // },
        game: (review) => games.find(game => game.id === review.game_id),
        author: (review) => authors.find(author => author.id === review.author_id),
    },
}

/*
In Apollo Server, a GraphQL resolver function typically receives four arguments,
in the following order:
(parent, args, context, info) => { ... }
1. parent
The result returned from the resolver of the parent field.
Useful when resolving nested fields.

*/
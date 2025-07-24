import data from './data.js';

export const resolvers = {
    Query: {
        games: () => data.games,
        reviews: () => data.reviews,
        authors: () => data.authors,
        game: (_, { id }) => data.games.find(game => game.id === id),
        review: (_, { id }) => data.reviews.find(review => review.id === id),
        author: (_, { id }) => data.authors.find(author => author.id === id),
    },
    Game: {
        reviews: (game) => data.reviews.filter(review => review.game_id === game.id),
    },
    Author: {
        reviews: (author) => data.reviews.filter(review => review.author_id === author.id),
    },
    Review: {
        // game(review) {
        //     return games.find(game => game.id === review.game_id);
        // },
        // author(review) {
        //     return authors.find(author => author.id === review.author_id);
        // },
        game: (review) => data.games.find(game => game.id === review.game_id),
        author: (review) => data.authors.find(author => author.id === review.author_id),
    },
    Mutation: {
        deleteGame: (_, { id }) => {
            const game = data.games.find(game => game.id === id);
            if (!game) {
                throw new Error('Game not found');
            }
            data.games = data.games.filter(game => game.id !== id);
            data.reviews = data.reviews.filter(review => review.game_id !== id);
            return game;
        },
        addGame: (_, { game }) => {
            const newGame = {
                id: String(data.games.length + 1),
                ...game,
            };
            games.push(newGame);
            return newGame;
        },
        updateGame: (_, { game }) => {
            const existingGame = data.games.find(g => g.id === game.id);
            if (!existingGame) {
                throw new Error('Game not found');
            }
            Object.assign(existingGame, game);
            return existingGame;
        },
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
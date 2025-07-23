import { reviews, games, authors } from './data.js';

export const resolvers = {
    Query: {
        games: () => games,
        reviews: () => reviews,
        authors: () => authors,
        game: (_, { id }) => games.find(game => game.id === id),
        review: (_, { id }) => reviews.find(review => review.id === id),
        author: (_, { id }) => authors.find(author => author.id === id),
    }
}
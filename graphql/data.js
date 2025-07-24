let games = [
  {
    id: '1',
    title: 'The Legend of Zelda: Breath of the Wild',
    platform: ['Nintendo Switch', 'Wii U'],
  },
  {
    id: '2',
    title: 'God of War',
    platform: ['PlayStation 4', 'PlayStation 5'],
  },
  {
    id: '3',
    title: 'Halo Infinite',
    platform: ['Xbox One', 'Xbox Series X/S', 'PC'],
  },
];

let authors = [
  {
    id: '1',
    name: 'Alice Johnson',
  },
  {
    id: '2',
    name: 'Bob Smith',
  },
  {
    id: '3',
    name: 'Charlie Brown',
  },
];

let reviews = [
  {
    id: '1',
    rating: 10,
    comment: 'Absolutely amazing game!',
    game_id: '1',
    author_id: '1',
  },
  {
    id: '2',
    rating: 8,
    comment: 'Very fun but could use more content.',
    game_id: '2',
    author_id: '2',
  },
  {
    id: '3',
    rating: 9,
    comment: 'Great graphics and story.',
    game_id: '3',
    author_id: '3',
  },
  {
    id: '4',
    rating: 7,
    comment: 'Good but a bit repetitive.',
    game_id: '1',
    author_id: '2',
  },
  {
    id: '5',
    rating: 9,
    comment: 'Best multiplayer experience!',
    game_id: '3',
    author_id: '1',
  },
];

export default {
  games, 
  authors,
  reviews,
}

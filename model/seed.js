// model/seed.js - Seed database with sample data
require('dotenv').config();
const mongoose = require('mongoose');
const connectDB = require('./db');
const User = require('./User');
const Game = require('./Game');
const LibraryEntry = require('./LibraryEntry');

const seedDatabase = async () => {
  try {
    await connectDB();

    // Clear existing data
    await User.deleteMany({});
    await Game.deleteMany({});
    await LibraryEntry.deleteMany({});
    console.log('✓ Cleared existing data');

    // ===== SAMPLE USERS =====
    const users = await User.create([
      {
        username: 'gaminglead',
        email: 'joshua@backlog-hero.local',
        password: 'password123',
        displayName: 'Kane Joshua Ibanez',
        bio: 'Hardcore RPG enthusiast. Always chasing 100% completion.',
        avatar: 'https://ui-avatars.com/api/?name=Kane+Joshua+Ibanez&background=5383E8&color=fff',
        favoriteGames: ['Elden Ring', 'Baldurs Gate 3', 'Dark Souls 3'],
      },
      {
        username: 'demo1',
        email: 'demo1@backlog-hero.local',
        password: 'password123',
        displayName: 'Demo Player 1',
        bio: 'Speedrunning for fun. Racing against time daily.',
        avatar: 'https://ui-avatars.com/api/?name=Demo+Player+1&background=50D6B4&color=fff',
        favoriteGames: ['Portal 2', 'Half-Life 2'],
      },
      {
        username: 'demo2',
        email: 'demo2@backlog-hero.local',
        password: 'password123',
        displayName: 'Demo Player 2',
        bio: 'Casual gamer who loves story-driven games.',
        avatar: 'https://ui-avatars.com/api/?name=Demo+Player+2&background=E85383&color=fff',
        favoriteGames: ['The Last of Us', 'Life is Strange'],
      },
      {
        username: 'demo3',
        email: 'demo3@backlog-hero.local',
        password: 'password123',
        displayName: 'Demo Player 3',
        bio: 'Indie game lover. Supporting small devs.',
        avatar: 'https://ui-avatars.com/api/?name=Demo+Player+3&background=FEBC2E&color=fff',
        favoriteGames: ['Hollow Knight', 'Celeste', 'Stardew Valley'],
      },
      {
        username: 'demo4',
        email: 'demo4@backlog-hero.local',
        password: 'password123',
        displayName: 'Demo Player 4',
        bio: 'Competitive gamer. Always grinding ranked.',
        avatar: 'https://ui-avatars.com/api/?name=Demo+Player+4&background=28C840&color=fff',
        favoriteGames: ['League of Legends', 'Valorant', 'Counter-Strike 2'],
      },
    ]);
    console.log(`✓ Created ${users.length} sample users`);

    // ===== SAMPLE GAMES =====
    const games = await Game.create([
      {
        name: 'Elden Ring',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co4jni.jpg',
        rating: 96,
        genres: ['Action RPG', 'Fantasy'],
        platforms: ['PlayStation 5', 'Xbox Series X', 'PC'],
        releaseDate: new Date('2022-02-25'),
        summary: 'A collaboration between FromSoftware and George R.R. Martin. Rise as the Elden Lord.',
      },
      {
        name: 'Baldurs Gate 3',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co670h.jpg',
        rating: 96,
        genres: ['RPG', 'Fantasy'],
        platforms: ['PlayStation 5', 'PC'],
        releaseDate: new Date('2023-08-03'),
        summary: 'A story of fellowship and betrayal, love and loss, victory and ruin.',
      },
      {
        name: 'The Legend of Zelda: Breath of the Wild',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3p2d.jpg',
        rating: 97,
        genres: ['Action Adventure', 'Open World'],
        platforms: ['Nintendo Switch', 'Wii U'],
        releaseDate: new Date('2017-03-03'),
        summary: 'Embark on a new adventure and discover what awaits in the vast lands of Hyrule.',
      },
      {
        name: 'Dark Souls 3',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1vcf.jpg',
        rating: 89,
        genres: ['Action RPG', 'Fantasy'],
        platforms: ['PlayStation 4', 'Xbox One', 'PC'],
        releaseDate: new Date('2016-04-12'),
        summary: 'Return to the world of dark fantasy. Cursed to immortality. Destined to die.',
      },
      {
        name: 'Hollow Knight',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rgi.jpg',
        rating: 88,
        genres: ['Metroidvania', 'Indie'],
        platforms: ['Nintendo Switch', 'PC', 'PlayStation 4', 'Xbox One'],
        releaseDate: new Date('2017-02-24'),
        summary: 'A 2D souls-like platformer in a beautiful insect world.',
      },
      {
        name: 'Celeste',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co3byy.jpg',
        rating: 87,
        genres: ['Platformer', 'Indie'],
        platforms: ['Nintendo Switch', 'PC', 'PlayStation 4', 'Xbox One'],
        releaseDate: new Date('2018-01-25'),
        summary: 'Help Madeline survive her journey up the mountain Celeste, in this challenging platformer.',
      },
      {
        name: 'Portal 2',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/co1rs4.jpg',
        rating: 95,
        genres: ['Puzzle', 'First-Person'],
        platforms: ['PC', 'PlayStation 3', 'Xbox 360'],
        releaseDate: new Date('2011-04-19'),
        summary: 'Wake up in Aperture Science and reunite with GLaDOS. Escape with portals.',
      },
      {
        name: 'Stardew Valley',
        coverUrl: 'https://images.igdb.com/igdb/image/upload/t_cover_big/xrpmydnu9rpxvxfjkiu7.jpg',
        rating: 92,
        genres: ['Simulation', 'Indie', 'RPG'],
        platforms: ['PC', 'Nintendo Switch', 'PlayStation 4', 'Xbox One', 'Mobile'],
        releaseDate: new Date('2016-02-28'),
        summary: 'You\'ve inherited your grandfather\'s old farm plot in Stardew Valley.',
      },
    ]);
    console.log(`✓ Created ${games.length} sample games`);

    // ===== SAMPLE LIBRARY ENTRIES =====
    const libraryEntries = await LibraryEntry.create([
      // gaminglead's library
      {
        userId: users[0]._id,
        gameId: games[0]._id, // Elden Ring
        status: 'completed',
        rating: 5,
        playtime: 180,
      },
      {
        userId: users[0]._id,
        gameId: games[1]._id, // BG3
        status: 'playing',
        rating: 5,
        playtime: 120,
      },
      {
        userId: users[0]._id,
        gameId: games[3]._id, // DS3
        status: 'completed',
        rating: 5,
        playtime: 140,
      },
      // demo1's library
      {
        userId: users[1]._id,
        gameId: games[6]._id, // Portal 2
        status: 'completed',
        rating: 5,
        playtime: 45,
      },
      {
        userId: users[1]._id,
        gameId: games[0]._id, // Elden Ring
        status: 'backlog',
        rating: null,
        playtime: 0,
      },
      // demo2's library
      {
        userId: users[2]._id,
        gameId: games[2]._id, // BOTW
        status: 'completed',
        rating: 5,
        playtime: 160,
      },
      {
        userId: users[2]._id,
        gameId: games[1]._id, // BG3
        status: 'playing',
        rating: 4,
        playtime: 85,
      },
      // demo3's library
      {
        userId: users[3]._id,
        gameId: games[4]._id, // Hollow Knight
        status: 'playing',
        rating: 4,
        playtime: 95,
      },
      {
        userId: users[3]._id,
        gameId: games[5]._id, // Celeste
        status: 'completed',
        rating: 5,
        playtime: 42,
      },
      {
        userId: users[3]._id,
        gameId: games[7]._id, // Stardew Valley
        status: 'playing',
        rating: 5,
        playtime: 200,
      },
      // demo4's library
      {
        userId: users[4]._id,
        gameId: games[0]._id, // Elden Ring
        status: 'backlog',
        rating: null,
        playtime: 0,
      },
      {
        userId: users[4]._id,
        gameId: games[2]._id, // BOTW
        status: 'completed',
        rating: 5,
        playtime: 150,
      },
      // Add more entries to generate achievements for friends
      // Demo player 1 - add more games for completion milestone
      {
        userId: users[1]._id,
        gameId: games[2]._id, // BOTW
        status: 'completed',
        rating: 5,
        playtime: 95,
      },
      {
        userId: users[1]._id,
        gameId: games[1]._id, // BG3
        status: 'completed',
        rating: 5,
        playtime: 110,
      },
      {
        userId: users[1]._id,
        gameId: games[3]._id, // DS3
        status: 'completed',
        rating: 5,
        playtime: 115,
      },
      {
        userId: users[1]._id,
        gameId: games[4]._id, // Hollow Knight
        status: 'completed',
        rating: 5,
        playtime: 32,
      },
      {
        userId: users[1]._id,
        gameId: games[5]._id, // Celeste
        status: 'completed',
        rating: 5,
        playtime: 8,
      },
      // Demo player 2 - add more for achievements
      {
        userId: users[2]._id,
        gameId: games[6]._id, // Portal 2
        status: 'completed',
        rating: 5,
        playtime: 12,
      },
      {
        userId: users[2]._id,
        gameId: games[5]._id, // Celeste
        status: 'completed',
        rating: 4,
        playtime: 36,
      },
      {
        userId: users[2]._id,
        gameId: games[0]._id, // Elden Ring
        status: 'playing',
        rating: 4,
        playtime: 95,
      },
      // Demo player 3 - add for high playtime
      {
        userId: users[3]._id,
        gameId: games[0]._id, // Elden Ring
        status: 'completed',
        rating: 5,
        playtime: 175,
      },
      {
        userId: users[3]._id,
        gameId: games[2]._id, // BOTW
        status: 'playing',
        rating: 5,
        playtime: 110,
      },
      {
        userId: users[3]._id,
        gameId: games[6]._id, // Portal 2
        status: 'completed',
        rating: 5,
        playtime: 38,
      },
      // Demo player 4 - add more completions
      {
        userId: users[4]._id,
        gameId: games[6]._id, // Portal 2
        status: 'completed',
        rating: 5,
        playtime: 40,
      },
      {
        userId: users[4]._id,
        gameId: games[3]._id, // DS3
        status: 'completed',
        rating: 5,
        playtime: 130,
      },
      {
        userId: users[4]._id,
        gameId: games[1]._id, // BG3
        status: 'playing',
        rating: 4,
        playtime: 85,
      },
    ]);
    console.log(`✓ Created ${libraryEntries.length} sample library entries`);

    // ===== ADD FRIEND RELATIONSHIPS =====
    // Make user[0] (gaminglead/Kane) friends with everyone else
    await User.findByIdAndUpdate(
      users[0]._id,
      {
        $set: {
          friends: [users[1]._id, users[2]._id, users[3]._id, users[4]._id],
        },
      }
    );
    console.log(`✓ Added friends to ${users[0].displayName}`);

    console.log('\n✓ Database seeded successfully!');
    console.log('Sample user: gaminglead (joshua@backlog-hero.local) / password123');
    process.exit(0);
  } catch (err) {
    console.error('✗ Seed error:', err);
    process.exit(1);
  }
};

seedDatabase();

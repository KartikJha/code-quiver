import { Injectable, Logger, OnModuleInit } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from '../models/user.schema';
import { TVShow } from '../models/tvshow.schema';
import { Movie } from '../models/movie.schema';

@Injectable()
export class SeedService implements OnModuleInit {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(TVShow.name) private tvShowModel: Model<TVShow>,
    @InjectModel(Movie.name) private movieModel: Model<Movie>,
  ) {}

  async onModuleInit() {
    await this.seedDatabase();
  }

  async seedDatabase() {
    try {
      this.logger.log('Seeding the database...');

      // Clear existing data (optional)
      await this.userModel.deleteMany({});
      await this.tvShowModel.deleteMany({});
      await this.movieModel.deleteMany({});

      // Create mock data
      try {
        await this.userModel.create([
          {
            username: 'user1',
            email: 'user1@example.com',
            password: 'password1',
            preferences: {
              favoriteGenres: ['Action', 'Drama'],
              dislikedGenres: ['Romance'],
            },
          },
          {
            username: 'user2',
            email: 'user2@example.com',
            password: 'password2',
            preferences: {
              favoriteGenres: ['Action', 'Comedy'],
              dislikedGenres: ['Horror'],
            },
          },
          {
            username: 'user3',
            email: 'user3@example.com',
            password: 'password3',
            preferences: {
              favoriteGenres: ['Drama', 'Romance'],
              dislikedGenres: ['SciFi'],
            },
          },
          {
            username: 'user4',
            email: 'user4@example.com',
            password: 'password4',
            preferences: {
              favoriteGenres: ['SciFi', 'Fantasy'],
              dislikedGenres: ['Romance'],
            },
          },
          {
            username: 'user5',
            email: 'user5@example.com',
            password: 'password5',
            preferences: {
              favoriteGenres: ['Animation', 'Adventure'],
              dislikedGenres: ['Romance'],
            },
          },
          {
            username: 'user6',
            email: 'user6@example.com',
            password: 'password6',
            preferences: {
              favoriteGenres: ['Crime', 'Thriller'],
              dislikedGenres: ['Comedy'],
            },
          },
        ]);
      } catch (error) {
        console.log('error seeding user');
      }

      try {
        await this.tvShowModel.create([
          {
            title: 'Breaking Bad',
            description:
              'A high school chemistry teacher turned methamphetamine producer partners with a former student to create a lucrative meth lab.',
            genres: ['Crime', 'Drama', 'Thriller'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Pilot',
                releaseDate: '2008-01-20T00:00:00Z',
                director: 'Vince Gilligan',
                actors: ['Bryan Cranston', 'Aaron Paul'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: "Cat's in the Bag...",
                releaseDate: '2008-01-27T00:00:00Z',
                director: 'Adam Bernstein',
                actors: ['Bryan Cranston', 'Aaron Paul'],
              },
            ],
          },
          {
            title: 'Game of Thrones',
            description:
              'Nine noble families fight for control over the lands of Westeros, while an ancient enemy returns after being dormant for millennia.',
            genres: ['Action', 'Adventure', 'Drama'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Winter Is Coming',
                releaseDate: '2011-04-17T00:00:00Z',
                director: 'Tim Van Patten',
                actors: ['Emilia Clarke', 'Peter Dinklage'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'The Kingsroad',
                releaseDate: '2011-04-24T00:00:00Z',
                director: 'Tim Van Patten',
                actors: ['Emilia Clarke', 'Peter Dinklage'],
              },
            ],
          },
          {
            title: 'Stranger Things',
            description:
              'When a young boy disappears, his mother, a police chief, and his friends must confront terrifying supernatural forces in order to get him back.',
            genres: ['Drama', 'Fantasy', 'Horror'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Chapter One: The Vanishing of Will Byers',
                releaseDate: '2016-07-15T00:00:00Z',
                director: 'The Duffer Brothers',
                actors: ['Winona Ryder', 'David Harbour'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Chapter Two: The Weirdo on Maple Street',
                releaseDate: '2016-07-15T00:00:00Z',
                director: 'The Duffer Brothers',
                actors: ['Winona Ryder', 'David Harbour'],
              },
            ],
          },
          {
            title: 'The Office',
            description:
              'A mockumentary on a group of typical office workers, where the workday consists of ego clashes, inappropriate behavior, and tedium.',
            genres: ['Comedy'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Pilot',
                releaseDate: '2005-03-24T00:00:00Z',
                director: 'Ken Kwapis',
                actors: ['Steve Carell', 'Rainn Wilson'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Diversity Day',
                releaseDate: '2005-03-29T00:00:00Z',
                director: 'Ken Whittingham',
                actors: ['Steve Carell', 'Rainn Wilson'],
              },
            ],
          },
          {
            title: 'Friends',
            description:
              'Follows the personal and professional lives of six twenty to thirty-something-year-old friends living in Manhattan.',
            genres: ['Comedy', 'Romance'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'The One Where Monica Gets a Roommate',
                releaseDate: '1994-09-22T00:00:00Z',
                director: 'James Burrows',
                actors: ['Jennifer Aniston', 'Courteney Cox'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'The One with the Sonogram at the End',
                releaseDate: '1994-09-29T00:00:00Z',
                director: 'James Burrows',
                actors: ['Jennifer Aniston', 'Courteney Cox'],
              },
            ],
          },
          {
            title: 'The Mandalorian',
            description:
              'The travels of a lone bounty hunter in the outer reaches of the galaxy, far from the authority of the New Republic.',
            genres: ['Action', 'Adventure', 'Fantasy'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Chapter 1: The Mandalorian',
                releaseDate: '2019-11-12T00:00:00Z',
                director: 'Dave Filoni',
                actors: ['Pedro Pascal', 'Carl Weathers'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Chapter 2: The Child',
                releaseDate: '2019-11-15T00:00:00Z',
                director: 'Rick Famuyiwa',
                actors: ['Pedro Pascal', 'Carl Weathers'],
              },
            ],
          },
          {
            title: 'The Simpsons',
            description:
              'The satiric adventures of a working-class family in the misfit city of Springfield.',
            genres: ['Animation', 'Comedy'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Simpsons Roasting on an Open Fire',
                releaseDate: '1989-12-17T00:00:00Z',
                director: 'David Silverman',
                actors: ['Dan Castellaneta', 'Nancy Cartwright'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Bart the Genius',
                releaseDate: '1990-01-14T00:00:00Z',
                director: 'David Silverman',
                actors: ['Dan Castellaneta', 'Nancy Cartwright'],
              },
            ],
          },
          {
            title: 'Sherlock',
            description:
              'A modern update finds the famous sleuth and his doctor partner solving crime in 21st century London.',
            genres: ['Crime', 'Drama', 'Mystery'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'A Study in Pink',
                releaseDate: '2010-07-25T00:00:00Z',
                director: 'Paul McGuigan',
                actors: ['Benedict Cumberbatch', 'Martin Freeman'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'The Blind Banker',
                releaseDate: '2010-08-01T00:00:00Z',
                director: 'Euros Lyn',
                actors: ['Benedict Cumberbatch', 'Martin Freeman'],
              },
            ],
          },
          {
            title: 'The Crown',
            description:
              "Follows the political rivalries and romance of Queen Elizabeth II's reign and the events that shaped the second half of the twentieth century.",
            genres: ['Biography', 'Drama', 'History'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Wolferton Splash',
                releaseDate: '2016-11-04T00:00:00Z',
                director: 'Stephen Daldry',
                actors: ['Claire Foy', 'Matt Smith'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'Hyde Park Corner',
                releaseDate: '2016-11-04T00:00:00Z',
                director: 'Philip Martin',
                actors: ['Claire Foy', 'Matt Smith'],
              },
            ],
          },
          {
            title: 'The Big Bang Theory',
            description:
              'A woman who moves into an apartment across the hall from two brilliant but socially awkward physicists shows them how little they know about life outside of the lab.',
            genres: ['Comedy', 'Romance'],
            episodes: [
              {
                episodeNumber: 1,
                seasonNumber: 1,
                title: 'Pilot',
                releaseDate: '2007-09-24T00:00:00Z',
                director: 'James Burrows',
                actors: ['Johnny Galecki', 'Jim Parsons'],
              },
              {
                episodeNumber: 2,
                seasonNumber: 1,
                title: 'The Big Bran Hypothesis',
                releaseDate: '2007-10-01T00:00:00Z',
                director: 'Mark Cendrowski',
                actors: ['Johnny Galecki', 'Jim Parsons'],
              },
            ],
          },
        ]);
      } catch (error) {
        console.error('Error in seeding tv shows');
      }

      try {
        await this.movieModel.create([
          {
            title: 'Inception',
            description:
              'A thief who steals corporate secrets through the use of dream-sharing technology is given the inverse task of planting an idea into the mind of a CEO.',
            genres: ['Action', 'SciFi'],
            releaseDate: '2010-07-16T00:00:00Z',
            director: 'Christopher Nolan',
            actors: [
              'Leonardo DiCaprio',
              'Joseph Gordon-Levitt',
              'Elliot Page',
            ],
          },
          {
            title: 'The Godfather',
            description:
              'The aging patriarch of an organized crime dynasty transfers control of his clandestine empire to his reluctant son.',
            genres: ['Drama', 'Crime'],
            releaseDate: '1972-03-24T00:00:00Z',
            director: 'Francis Ford Coppola',
            actors: ['Marlon Brando', 'Al Pacino', 'James Caan'],
          },
          {
            title: 'The Dark Knight',
            description:
              'When the menace known as the Joker emerges from his mysterious past, he wreaks havoc and chaos on the people of Gotham.',
            genres: ['Action', 'Drama'],
            releaseDate: '2008-07-18T00:00:00Z',
            director: 'Christopher Nolan',
            actors: ['Christian Bale', 'Heath Ledger', 'Aaron Eckhart'],
          },
          {
            title: 'Pulp Fiction',
            description:
              'The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.',
            genres: ['Drama', 'Crime'],
            releaseDate: '1994-10-14T00:00:00Z',
            director: 'Quentin Tarantino',
            actors: ['John Travolta', 'Uma Thurman', 'Samuel L. Jackson'],
          },
          {
            title: 'The Shawshank Redemption',
            description:
              'Two imprisoned men bond over a number of years, finding solace and eventual redemption through acts of common decency.',
            genres: ['Drama'],
            releaseDate: '1994-09-22T00:00:00Z',
            director: 'Frank Darabont',
            actors: ['Tim Robbins', 'Morgan Freeman', 'Bob Gunton'],
          },
          {
            title: 'Forrest Gump',
            description:
              'The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal, and other historical events unfold from the perspective of an Alabama man with an IQ of 75.',
            genres: ['Drama', 'Romance'],
            releaseDate: '1994-07-06T00:00:00Z',
            director: 'Robert Zemeckis',
            actors: ['Tom Hanks', 'Robin Wright', 'Gary Sinise'],
          },
          {
            title: 'The Matrix',
            description:
              'A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.',
            genres: ['Action', 'SciFi'],
            releaseDate: '1999-03-31T00:00:00Z',
            director: 'Lana Wachowski, Lilly Wachowski',
            actors: ['Keanu Reeves', 'Laurence Fishburne', 'Carrie-Anne Moss'],
          },
          {
            title: 'Fight Club',
            description:
              'An insomniac office worker and a devil-may-care soap maker form an underground fight club that evolves into much more.',
            genres: ['Drama'],
            releaseDate: '1999-10-15T00:00:00Z',
            director: 'David Fincher',
            actors: ['Brad Pitt', 'Edward Norton', 'Meat Loaf'],
          },
          {
            title: 'The Lord of the Rings: The Fellowship of the Ring',
            description:
              'A meek Hobbit from the Shire and eight companions set out on a journey to destroy the powerful One Ring and save Middle-earth from the Dark Lord Sauron.',
            genres: ['Action', 'Adventure', 'Drama'],
            releaseDate: '2001-12-19T00:00:00Z',
            director: 'Peter Jackson',
            actors: ['Elijah Wood', 'Ian McKellen', 'Orlando Bloom'],
          },
          {
            title: 'The Lion King',
            description:
              'Lion prince Simba and his father are targeted by his bitter uncle, who wants to ascend the throne himself.',
            genres: ['Animation', 'Adventure', 'Drama'],
            releaseDate: '1994-06-24T00:00:00Z',
            director: 'Roger Allers, Rob Minkoff',
            actors: ['Matthew Broderick', 'Jeremy Irons', 'James Earl Jones'],
          },
        ]);
      } catch (error) {
        console.error('error seeding movies', error);
      }

      this.logger.log('Database seeded successfully');
    } catch (error) {
      this.logger.error('Error seeding database:', error);
    }
  }
}

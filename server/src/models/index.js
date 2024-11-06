import { Sequelize } from 'sequelize';
import { sequelize } from '../config/connectDatabase';

// Import các models
import Movie from './Movie';
import Season from './Season';
import Episode from './Episode';
import Genre from './Genre';
import Tag from './Tag';
import MovieGenre from './MovieGenre';
import MovieTag from './MovieTag';
import Actor from './Actor';
import MovieCast from './MovieCast';

const models = {
  Movie,
  Season,
  Episode,
  Genre,
  Tag,
  MovieGenre,
  MovieTag,
  Actor,
  MovieCast
};

const initAssociations = () => {
  // Movie - Season Associations
  models.Movie.hasMany(models.Season, {
    foreignKey: 'movie_id',
    as: 'seasons'
  });
  models.Season.belongsTo(models.Movie, {
    foreignKey: 'movie_id',
    as: 'movie'
  });

  // Season - Episode Associations
  models.Season.hasMany(models.Episode, {
    foreignKey: 'season_id',
    as: 'episodes'
  });
  models.Episode.belongsTo(models.Season, {
    foreignKey: 'season_id',
    as: 'season'
  });

  // Movie - Genre Associations
  models.Movie.belongsToMany(models.Genre, {
    through: models.MovieGenre,
    foreignKey: 'movie_id',
    otherKey: 'genre_id',
    as: 'genres'
  });
  models.Genre.belongsToMany(models.Movie, {
    through: models.MovieGenre,
    foreignKey: 'genre_id',
    otherKey: 'movie_id',
    as: 'movies'
  });

  // Movie - Tag Associations
  models.Movie.belongsToMany(models.Tag, {
    through: models.MovieTag,
    foreignKey: 'movie_id',
    otherKey: 'tag_id',
    as: 'tags'
  });
  models.Tag.belongsToMany(models.Movie, {
    through: models.MovieTag,
    foreignKey: 'tag_id',
    otherKey: 'movie_id',
    as: 'movies'
  });

  // Movie - Actor Associations
  models.Movie.belongsToMany(models.Actor, {
    through: models.MovieCast,
    foreignKey: 'movie_id',
    otherKey: 'actor_id',
    as: 'actors'
  });
  models.Actor.belongsToMany(models.Movie, {
    through: models.MovieCast,
    foreignKey: 'actor_id',
    otherKey: 'movie_id',
    as: 'movies'
  });
};

// Khởi tạo associations
initAssociations();

// Export tất cả models
export default models;
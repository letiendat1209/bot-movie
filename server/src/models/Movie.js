import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

import Season from "./Season";
import Genre from "./Genre";
import Tag from "./Tag";
import MovieGenre from "./MovieGenre";
import MovieTag from "./MovieTag";

const Movie = sequelize.define(
  "Movie",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Tiêu đề không được để trống",
        },
        len: {
          args: [2, 255],
          msg: "Tiêu đề phải có độ dài từ 2 đến 255 ký tự",
        },
      },
    },
    description: {
      type: DataTypes.TEXT,
      validate: {
        len: {
          args: [10, 5000],
          msg: "Mô tả phải có độ dài từ 10 đến 5000 ký tự",
        },
      },
    },
    thumbnail: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Thumbnail phải là một URL hợp lệ",
        },
      },
    },
    poster: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Poster phải là một URL hợp lệ",
        },
      },
    },
    trailer_url: {
      type: DataTypes.STRING,
      validate: {
        isUrl: {
          msg: "Trailer URL phải là một URL hợp lệ",
        },
      },
    },
    release_date: {
      type: DataTypes.DATE,
      validate: {
        isDate: {
          msg: "Ngày phát hành không hợp lệ",
        },
        isNotFuture(value) {
          if (value > new Date()) {
            throw new Error("Ngày phát hành không thể là ngày trong tương lai");
          }
        },
      },
    },
    duration: {
      type: DataTypes.INTEGER,
      validate: {
        min: {
          args: [1],
          msg: "Thời lượng phải lớn hơn 0",
        },
        max: {
          args: [1000],
          msg: "Thời lượng không thể vượt quá 1000 phút",
        },
      },
    },
    rating: {
      type: DataTypes.FLOAT,
      validate: {
        min: {
          args: [0],
          msg: "Đánh giá không thể nhỏ hơn 0",
        },
        max: {
          args: [10],
          msg: "Đánh giá không thể lớn hơn 10",
        },
      },
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    updated_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
    is_series: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
    upvote: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Số lượt upvote không thể âm",
        },
      },
    },
    type: {
      type: DataTypes.STRING,
      validate: {
        isIn: {
          args: [["movie", "series", "anime", "English 1-1"]],
          msg: "Loại phim phải là 'movie' hoặc 'series'",
        },
      },
    },
    total_views: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      validate: {
        min: {
          args: [0],
          msg: "Số lượt xem không thể âm",
        },
      },
    },
  },
  {
    sequelize,
    modelName: "Movie",
    tableName: "Movies",
    timestamps: false,
    // Thêm hooks để tự động cập nhật updated_at
    hooks: {
      beforeUpdate: (movie) => {
        movie.updated_at = new Date();
      },
    },
  }
);

// Quan hệ giữa các bảng
// Movie.hasMany(Season, { foreignKey: "movie_id" });
// Season.belongsTo(Movie, { foreignKey: "movie_id" });

// Movie.belongsToMany(Genre, { through: MovieGenre, foreignKey: "movie_id"});
// Genre.belongsToMany(Movie, { through: MovieGenre, foreignKey: "genre_id"});

// Movie.belongsToMany(Tag, { through: MovieTag, foreignKey: "movie_id"});
// Tag.belongsToMany(Movie, { through: MovieTag, foreignKey: "tag_id"});

export default Movie;

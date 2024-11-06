import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const MovieGenre = sequelize.define(
  "MovieGenre",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Movies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    genre_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Genres",
        key: "id",
      },
    },
  },
  {
    sequelize,
    modelName: "MovieGenre",
    tableName: "MovieGenres",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default MovieGenre;

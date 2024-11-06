import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const MovieCast = sequelize.define(
  "MovieCast",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "movies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    actor_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "actors",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    role: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    character_name: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "MovieCast",
    tableName: "MovieCasts",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default MovieCast;

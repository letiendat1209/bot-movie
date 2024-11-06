import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const MovieTag = sequelize.define(
  "MovieTag",
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
    tag_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Tags",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
  },
  {
    sequelize,
    modelName: "MovieTag",
    tableName: "MovieTags",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default MovieTag;

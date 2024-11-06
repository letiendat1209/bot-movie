import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const Genre = sequelize.define(
  "Genre",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "Genre",
    tableName: "genres",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default Genre;

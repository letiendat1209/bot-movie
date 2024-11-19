import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const Favorite = sequelize.define(
  "Favorite",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "User",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    },
    movie_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "movies",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    },

    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "Favorite",
    tableName: "Favorites",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default Favorite;

import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const Flashcard = sequelize.define(
  "Flashcard",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    deck_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Deck",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
      allowNull: true,
    },
    english: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    vietnamese: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    example: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Flashcard",
    tableName: "Flashcards",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default Flashcard;

import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const SentencePair = sequelize.define(
  "SentencePair",
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
    episode_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Episode",
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
    notes: {
      type: DataTypes.TEXT,
      allowNull: true,
    },
    diff_level: {
      type: DataTypes.ENUM("easy", "medium", "hard"),
      defaultValue: "medium",
      allowNull: true,
    },
    saved_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
    tags: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.ENUM("saved", "reviewed"),
      defaultValue: "active",
      allowNull: false,
    },
  },
  {
    sequelize,
    modelName: "SentencePair",
    tableName: "Sentence_pairs",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default SentencePair;

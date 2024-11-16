import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const Subtitle = sequelize.define(
  "Subtitle",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
    },
    episode_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "Episode",
        key: "id",
      },
      onUpdate: "CASCADE",
      onDelete: "SET NULL",
    },
    eng_sub_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    vie_sub_url: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    tableName: "subtitles",
    timestamps: false,
    underscored: true,
  }
);

export default Subtitle;

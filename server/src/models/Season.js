import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";
import Episode from "./Episode";

const Season = sequelize.define(
  "Season",
  {
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true,
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
    season_number: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    air_date: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    poster_path: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: false,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    tableName: "seasons",
    timestamps: false,
    underscored: true,
  }
);
// Quan hệ giữa Season và Episode
Season.hasMany(Episode, { foreignKey: "season_id" });
Episode.belongsTo(Season, { foreignKey: "season_id" });

export default Season;

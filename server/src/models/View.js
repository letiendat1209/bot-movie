import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const View = sequelize.define(
  "View",
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
    movies_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "movies",
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
    duration_watched: {
      type: DataTypes.INTEGER,
      allowNull: true,
    },
    viewer_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      allowNull: false,
    },
    process: {
      type: DataTypes.FLOAT,
      allowNull: true,
    },
    ip_address: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    platform: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    device_info: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    quantity: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    is_completed: {
      type: DataTypes.TINYINT,
      allowNull: true,
    },
    watch_session_id: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    created_at: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
    },
  },
  {
    sequelize,
    modelName: "View",
    tableName: "Views",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default View;

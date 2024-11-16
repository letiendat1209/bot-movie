import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const Images = sequelize.define(
  "Images",
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    title: {
        type: DataTypes.STRING, 
        allowNull: true, 
      },
    description: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    type: {
      type: DataTypes.ENUM(
        "slider",
        "poster",
        "thumbnail",
        "background",
        "avatar"
      ),
      defaultValue: "thumbnail",
    },
  },
  {
    tableName: "images",
    timestamps: true, // Sequelize sẽ tự động thêm created_at và updated_at
    underscored: true, // Tự động chuyển camelCase thành snake_case
  }
);

export default Images;

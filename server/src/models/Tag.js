import { DataTypes } from "sequelize";
import { sequelize } from "../config/connectDatabase";

const Tag = sequelize.define(
  "Tag",
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
    slug: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {
    sequelize,
    modelName: "Tag",
    tableName: "Tags",
    timestamps: false, // Nếu không cần sequelize tự quản lý timestamps
  }
);

export default Tag;

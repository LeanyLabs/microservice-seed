import { DataTypes } from 'sequelize';
import { sequelize } from './sequelize';

export const Comment = sequelize.define('Comment', {
  text: {
    type: DataTypes.STRING,
  },
});

/*
 * @Description:数据表创建
 * @Author: LCL
 * @Date: 2023-05-10
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-10
 */
import { Sequelize, DataTypes, Model } from 'sequelize';
import config from '../config/dbInfo.js';

const sequelize = new Sequelize(
  config.database,
  config.username,
  config.password,
  {
    host: config.host,
    port: config.port,
    dialect: config.dialect,
  },
);

try {
  await sequelize.authenticate();
  console.log('Connection has been established successfully.');
} catch (error) {
  console.error('Unable to connect to the database:', error);
}

// 定义用户模型
class User extends Model {}

User.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户主键Id',
    },
    username: {
      type: DataTypes.STRING(50),
      allowNull: false,
      comment: '用户昵称',
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '登录密码',
    },
  },
  {
    sequelize,
    modelName: 'user',
    tableName: 'my_user',
    timestamps: false,
  },
);

await User.sync({ alter: true });

export default User;

/*
 * @Description:数据表创建
 * @Author: LCL
 * @Date: 2023-05-10
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-16
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
  }
);

(async () => {
  try {
    await sequelize.authenticate();
    console.log('Connection has been established successfully.');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
})();

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
    userId: {
      type: DataTypes.INTEGER(10),
      allowNull: false,
      comment: '用户ID',
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
  }
);

// 定义身份详细信息
class PersonDetail extends Model {}

PersonDetail.init(
  {
    id: {
      type: DataTypes.INTEGER(10).UNSIGNED,
      primaryKey: true,
      autoIncrement: true,
      comment: '用户主键Id',
    },
    person_name: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '姓名',
    },
    sex: {
      type: DataTypes.ENUM(['男', '女']),
      allowNull: false,
      comment: '性别',
    },
    phone: {
      type: DataTypes.STRING,
      allowNull: false,
      comment: '电话号码',
    },
    address: {
      type: DataTypes.STRING,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    country: {
      type: DataTypes.STRING,
    },
    city: {
      type: DataTypes.STRING,
    },
    fullAddress: {
      type: DataTypes.STRING,
      get() {
        return `${this.getDataValue('country')}${this.getDataValue(
          'city'
        )}${this.getDataValue('address')}`;
      },
    },
  },
  {
    sequelize,
    modelName: 'person',
    tableName: 'my_person',
    timestamps: false,
  }
);

User.hasOne(PersonDetail, { foreignKey: 'userId' });
(async () => {
  await User.sync({ alter: true });
  await PersonDetail.sync({ force: false, alter: true });
})();

export { User, PersonDetail };

/*
 * @Description:
 * @Author: LCL
 * @Date: 2023-05-10
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-12
 */
import { User, PersonDetail } from '../model/custom.js';

class UserService {
  static async registerUser(user) {
    try {
      return User.create(user);
    } catch (err) {
      throw new Error(err);
    }
  }

  static async getUserByUserId(userId) {
    return User.findOne({
      where: {
        userId: userId,
      },
    });
  }

  static async deleteUserByUserId(userId) {
    try {
      return User.destroy({
        where: {
          userId: userId,
        },
      });
    } catch (err) {
      throw new Error(err);
    }
  }

  static async updateUserNameById(userId, userName) {
    const user = await this.getUserByUserId(userId);

    if (user !== null) {
      return user.update({ username: userName });
    } else {
      throw new Error('用户不存在');
    }
  }
}

export default UserService;

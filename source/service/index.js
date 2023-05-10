/*
 * @Description:
 * @Author: LCL
 * @Date: 2023-05-10
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-10
 */
import User from '../model/custom.js';

class UserService {
  static async registerUser(user) {
    try {
      return User.create(user);
    } catch (err) {
      throw new Error(err);
    }
  }
}

export default UserService;

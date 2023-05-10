/*
 * @Description:
 * @Author: LCL
 * @Date: 2023-05-10
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-10
 */
import UserService from '../service/index.js';

const registererUser = async (ctx) => {
  const user = ctx.request.body;
  console.log(user);
  try {
    const data = await UserService.registerUser(user);
    ctx.response.status = 200;
    ctx.type = 'json';
    ctx.body = {
      data: data.toJSON(),
      errorCode: '0',
      errorMsg: 'success',
    };
  } catch (err) {
    ctx.status = 500;
    console.log('ererer', err);
  }
};

const deleteUser = async (ctx) => {};

const login = async (ctx) => {};

const findUserById = async (ctx) => {};

export default {
  registererUser,
  deleteUser,
  login,
  findUserById,
};

/*
 * @Description:
 * @Author: LCL
 * @Date: 2023-05-10
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-12
 */
import UserService from '../service/index.js';

const registererUser = async (ctx) => {
  const user = ctx.request.body;
  try {
    const userId = await UserService.getUserByUserId(user.userId);
    console.log('userId', userId);
    if (userId) {
      ctx.body = {
        data: null,
        errorCode: '40001',
        errorMsg: '当前用户已存在',
      };
    } else {
      const data = await UserService.registerUser(user);
      ctx.response.status = 200;
      ctx.type = 'json';
      ctx.body = {
        data: data.toJSON(),
        errorCode: '0',
        errorMsg: 'success',
      };
    }
  } catch (err) {
    ctx.status = 500;
    console.log('error', err);
    ctx.body = {
      data: err,
      errorCode: '500',
      errorMsg: '还有必填项未填',
    };
  }
};

const deleteUser = async (ctx) => {
  const user = ctx.request.body;
  const userId = await UserService.getUserByUserId(user.userId);
  if (!userId) {
    ctx.body = {
      data: null,
      errorCode: '500',
      errorMsg: '用户不存在',
    };
  } else {
    const data = await UserService.deleteUserByUserId(userId);
    ctx.body = {
      data: data.toJSON(),
      errorCode: '0',
      errorMsg: '删除成功',
    };
  }
};

const login = async (ctx) => {};

const findUserById = async (ctx) => {
  const user = ctx.request.body;
  const data = await UserService.getUserByUserId(user.userId);
  ctx.body = {
    data: data.toJSON(),
    errorCode: '0',
    errorMsg: 'success',
  };
};

const updateUser = async (ctx) => {
  const { userId, userName } = ctx.request.body;
  console.log('user', userId);
  try {
    const data = await UserService.updateUserNameById(userId, userName);
    ctx.body = {
      data: data,
      errorCode: '0',
      errorMsg: 'success',
    };
  } catch (err) {
    console.log(err);
    ctx.body = {
      errorCode: '0',
      errorMsg: err.message,
    };
  }
};

export default {
  registererUser,
  deleteUser,
  login,
  findUserById,
  updateUser,
};

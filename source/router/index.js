/*
 * @Description:
 * @Author: LCL
 * @Date: 2023-05-10
 * @LastEditors: LCL
 * @LastEditTime: 2023-05-12
 */
import Router from 'koa-router';
import controller from '../controller/index.js';

const router = new Router();

router.post('/api/register', controller.registererUser);

router.post('/api/login', controller.login);

router.delete('/api/delete', controller.deleteUser);

router.post('/api/updateUserName', controller.updateUser);

export default router;

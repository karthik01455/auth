const {Users} = require('../../database/models');
const userService = require('../../src/services/users');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const redisUtil= require('../../src/utils/redis');
 
describe('User Service', () => {
  describe('createUser', () => {
    it('should create User when it is called', async() => {
      const userName = 'test';
      const password = 'test';
      jest.spyOn(Users, 'create').mockResolvedValue({
        userName,
        password
      });
      jest.spyOn(bcrypt, 'hash').mockResolvedValue('salt');
      const result = await userService.createUser(userName, password);
      expect(result).toEqual({
        userName,
        password
      });
    });
    describe('login', () => {
      it('should login when it is called', async() => {
        const userName = 'test';
        const password = 'test';
        jest.spyOn(Users, 'findOne').mockResolvedValue({
          userName,
          password
        });
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        jest.spyOn(redisUtil.redisClient, 'set').mockResolvedValue('OK');
        jest.spyOn(jwt,'sign').mockReturnValue('token');
        const result = await userService.login(userName, password);
        expect(result).toEqual('token');
      });
    });
    describe('login', () => {
      it('should throw error when userName is not present', async() => {
        const userName = 'test';
        const password = 'test';
        jest.spyOn(Users, 'findOne').mockResolvedValue();
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(true);
        jest.spyOn(redisUtil.redisClient, 'set').mockResolvedValue('OK');
        jest.spyOn(jwt,'sign').mockReturnValue('token');
        await expect(userService.login(userName, password)).rejects.toThrow('Invalid UserName');
      });
    });
    describe('login', () => {
      it('should throw error when userName is present and password is wrong', async() => {
        const userName = 'test';
        const password = 'test';
        jest.spyOn(Users, 'findOne').mockResolvedValue({
          userName,
          password
        });
        jest.spyOn(bcrypt, 'compare').mockResolvedValue(false);
        jest.spyOn(redisUtil.redisClient, 'set').mockResolvedValue('OK');
        jest.spyOn(jwt,'sign').mockReturnValue('token');
        await expect(userService.login(userName, password)).rejects.toThrow('Invalid Password');
      });
    });
  });
  describe('validateToken', () => {
    it('should return userName when token is valid', async() => {
      const userName = 'test';
      jest.spyOn(redisUtil.redisClient, 'get').mockResolvedValue(userName);
      const result = await userService.validateToken('token');
      expect(result).toEqual(userName);
    });

    it('should throw error when token is invalid', async() => {
      jest.spyOn(redisUtil.redisClient, 'get').mockResolvedValue();
      await expect(userService.validateToken('token')).rejects.toThrow('Invalid Token');
    }
    );
  });
});

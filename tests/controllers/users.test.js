const userController = require('../../src/controllers/users');
const userService = require('../../src/services/users');

describe('userController', () => {
  describe('createUser', () => {
    it('should create User when it is called', () => {
      const mockReq = {
        body: {
          userName: 'test',
          password:'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(userService, 'createUser').mockResolvedValue({
        userName: 'test',
        password:'test'
      });
      return userController.createUser(mockReq, mockRes).then(() => {
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.send).toHaveBeenCalledWith({
          userName: 'test',
          password:'test'
        });
      }
      );
    });
    it('should return 400 when service throws error', () => {
      const mockReq = {
        body: {
          userName: 'test',
          password:'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(userService, 'createUser').mockRejectedValue('error');
      return userController.createUser(mockReq, mockRes).then(() => {
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith('error');
      }
      );
    }
    );
  });
  describe('login', () => {
    it('should login service when it is called', () => {
      const mockReq = {
        body: {
          userName: 'test',
          password:'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(userService, 'login').mockResolvedValue({
        token: 'token'
      });
      return userController.login(mockReq, mockRes).then(() => {
        expect(mockRes.status).toHaveBeenCalledWith(201);
        expect(mockRes.send).toHaveBeenCalledWith({
          token: 'token'
        });
      }
      );
    });
    it('should return 400 when service throws error', () => {
      const mockReq = {
        body: {
          userName: 'test',
          password:'test'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(userService, 'login').mockRejectedValue('error');
      return userController.login(mockReq, mockRes).then(() => {
        expect(mockRes.status).toHaveBeenCalledWith(400);
        expect(mockRes.send).toHaveBeenCalledWith('error');
      }
      );
    });
  });
  describe('validateToken', () => {
    it('should call validateToken service when it is called', () => {
      const mockReq = {
        headers: {
          authorizartion: 'token'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(userService, 'validateToken').mockResolvedValue({
        userName: 'test'
      });
      return userController.validateToken(mockReq, mockRes).then(() => {
        expect(mockRes.status).toHaveBeenCalledWith(200);
        expect(mockRes.send).toHaveBeenCalledWith({
          userName: 'test',
        });
      }
      );
    });
    it('should return 403 when token is not valid', () => {
      const mockReq = {
        headers: {
          authorizartion: 'token'
        }
      };
      const mockRes = {
        status: jest.fn().mockReturnThis(),
        send: jest.fn()
      };
      jest.spyOn(userService, 'validateToken').mockRejectedValue('error');
    
      return userController.validateToken(mockReq, mockRes).then(() => {
        expect(mockRes.status).toHaveBeenCalledWith(403);
        expect(mockRes.send).toHaveBeenCalledWith('error');
      }
      );
    });
  });
});
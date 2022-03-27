import { Router } from 'express';
import express from 'express';
import {
  AuthenticatedUser,
  Login,
  Logout,
  Register,
  UpdateInfo,
  UpdatePassword,
} from './controllers/auth.controller';
import { Upload } from './controllers/image.controller';
import { Permissions } from './controllers/permission.controller';
import {
  CreateProduct,
  DeleteProduct,
  GetProduct,
  Products,
  UpdateProduct,
} from './controllers/product.controller';
import {
  CreateRole,
  DeleteRole,
  GetRole,
  Roles,
  UpdateRole,
} from './controllers/role.controller';
import {
  CreateUser,
  DeleteUser,
  GetUser,
  UpdateUser,
  Users,
} from './controllers/user.controller';
import { AuthMiddleware } from './middleware/auth.middleware';
import { Chart, Export, Orders } from './controllers/order.controller';
import { PermissionMiddleware } from './middleware/permission.middleware';

export const routes = (router: Router) => {
  // Auth routes
  router.post('/api/register', Register);
  router.post('/api/login', Login);
  router.get('/api/user', AuthMiddleware, AuthenticatedUser);
  router.post('/api/logout', AuthMiddleware, Logout);
  router.put('/api/user/info', AuthMiddleware, UpdateInfo);
  router.put('/api/user/password', AuthMiddleware, UpdatePassword);

  // Users routes
  router.get(
    '/api/users',
    AuthMiddleware,
    PermissionMiddleware('users'),
    Users
  );
  router.post(
    '/api/users',
    AuthMiddleware,
    PermissionMiddleware('users'),
    CreateUser
  );
  router.get(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    GetUser
  );
  router.put(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    UpdateUser
  );
  router.delete(
    '/api/users/:id',
    AuthMiddleware,
    PermissionMiddleware('users'),
    DeleteUser
  );

  // Permissions routes
  router.get(
    '/api/permissions',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    Permissions
  );
  // Roles routes
  router.get(
    '/api/roles',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    Roles
  );
  router.post(
    '/api/roles',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    CreateRole
  );
  router.get(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    GetRole
  );
  router.put(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    UpdateRole
  );
  router.delete(
    '/api/roles/:id',
    AuthMiddleware,
    PermissionMiddleware('roles'),
    DeleteRole
  );

  // Product route
  router.get(
    '/api/products',
    AuthMiddleware,
    PermissionMiddleware('products'),
    Products
  );
  router.post(
    '/api/products',
    AuthMiddleware,
    PermissionMiddleware('products'),
    CreateProduct
  );
  router.get(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    GetProduct
  );
  router.put(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    UpdateProduct
  );
  router.delete(
    '/api/products/:id',
    AuthMiddleware,
    PermissionMiddleware('products'),
    DeleteProduct
  );

  // Image

  router.post('/api/upload', AuthMiddleware, Upload);
  router.use('/api/uploads', express.static('./uploads'));

  // Orders Route
  router.get(
    '/api/orders',
    AuthMiddleware,
    PermissionMiddleware('orders'),
    Orders
  );
  router.post(
    '/api/export',
    AuthMiddleware,
    PermissionMiddleware('orders'),
    Export
  );
  router.get(
    '/api/chart',
    AuthMiddleware,
    PermissionMiddleware('orders'),
    Chart
  );
};

export const CORS = {
  allowedOrigins: ['http://localhost:3000'],
  methods: ['GET', 'POST', 'DELETE', 'PATCH', 'PUT'],
};

export enum Role {
  SUPERADMIN_ROLE = 'super_admin',
  ADMIN_ROLE = 'admin',
  USER_ROLE = 'user',
}

export const errorCodes = {
  BACKENDERROR011: 'FAILED User Service Fn-findOneWithEmail',
  BACKENDERROR012: 'FAILED User Service Fn-create',
  BACKENDERROR013: 'FAILED User Service Fn-findAll',
  BACKENDERROR014: 'FAILED User Service Fn-findOne',
  BACKENDERROR015: 'FAILED User Service Fn-remove',
  BACKENDERROR016: 'FAILED User Service Fn-update',
  BACKENDERROR017: 'User not found',
  BACKENDERROR018: 'FAILED Auth Service Fn-validateUser',
  BACKENDERROR019: 'Invalid Password',
  BACKENDERROR020: 'Insufficient role permission',
  BACKENDERROR021: 'User not authenticated',
  BACKENDERROR022: 'Contact number should not be empty',
  BACKENDERROR023: 'Username must be valid email',
  BACKENDERROR024: 'Password must be string',
  BACKENDERROR025: 'Email must be valid email format',
  BACKENDERROR026: 'Role must be valid string value',
  BACKENDERROR027: 'Email is already registered with us',
  BACKENDERROR028: 'Role must not be empty',
  BACKENDERROR029: 'FAILED Auth Service Fn-validateUser',
  BACKENDERROR030: 'FAILED Auth Service Fn-login',
  BACKENDERROR040: 'Username must be between 1 and 50 characters',
  BACKENDERROR041: 'Password must be between 1 and 255 characters',
  BACKENDERROR042: 'Email address must be between 1 and 100 characters',
  BACKENDERROR043: 'Contact number must be String',
  BACKENDERROR044: 'Role must be between 1 and 50 characters',
  BACKENDERROR045: 'Medicine RackNumber must be string',
  BACKENDERROR046: 'Medicine RackNumber must be between 1 and 100 characters',
  BACKENDERROR049: 'Invalid file path type',
};

export const successAction = (statusCode: number, data: any, message = 'Success') => {
  return { statusCode, data, message };
};

export const failAction = (statusCode: number, errorMessage: string, message = 'Fail') => {
  return { statusCode, errorMessage, message };
};

export const MESSAGE = {
  SOMETHING_WENT_WRONG: 'Something went wrong',
  TOKEN_REQUIRED: 'Auth token is requried.',
  TOKEN_EXPIRED: 'Session expired, please login again.',
  LOGIN: 'Login successfully',
  USER_NOT_FOUND: 'user not found',
  INTERNET_SERVER_ERROR: 'Internet server error',
  VALIDATION_ERROR: 'Validation error. Please check your params and try again.',

  alreadyExist: (labal: string) => {
    return `${labal} alreadyExist`;
  },
  Invalidlogin: 'Invalid login credentials. Please check and try again.',
  add: (labal: string) => {
    return `${labal} added successfully.`;
  },
  fetch: (labal: string) => {
    return `${labal} fetched successfully.`;
  },
  update: (labal: string) => {
    return `${labal} updated successfully.`;
  },
  delete: (labal: string) => {
    return `${labal} deleted successfully.`;
  },
  notExist: (labal: string) => {
    return `${labal} not exist.`;
  },
  errorLog: (functionName: string, controllerName: string, err: any) => {
    return `${functionName} ${controllerName} Error @ ${err}`;
  },
};

export const STATUS_CODE = {
  SUCCESS: 200,
  NOT_CREATED: 404,
  BAD_REQUEST: 400,
  SERVER_ERROR: 501,
  FORBIDDEN: 203,
  NOT_FOUND: 204,
  NOT_ALLOWED: 205,
  TOKEN_EXPIRED: 401,
  EMAIL_OR_USER_EXIST: 207,
  WRONGE_PASSWORD: 208,
  ACCOUNT_DEACTIVATED: 209,
  AUTH_TOKEN_REQUIRED: 499,
  UNAUTHORIZED: 403,
};

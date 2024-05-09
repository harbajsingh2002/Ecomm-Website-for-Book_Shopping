"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.STATUS_CODE = exports.MESSAGE = exports.failAction = exports.successAction = void 0;
const successAction = (statusCode, data, message = 'Success') => {
    return { statusCode, data, message };
};
exports.successAction = successAction;
const failAction = (statusCode, errorMessage, message = 'Fail') => {
    return { statusCode, errorMessage, message };
};
exports.failAction = failAction;
exports.MESSAGE = {
    SOMETHING_WENT_WRONG: 'Something went wrong',
    TOKEN_REQUIRED: 'Auth token is requried.',
    TOKEN_EXPIRED: 'Session expired, please login again.',
    LOGIN: 'Login successfully',
    USER_NOT_FOUND: 'user not found',
    INTERNET_SERVER_ERROR: 'Internet server error',
    // ALREADY_EXIST: 'already Exist',
    VALIDATION_ERROR: 'Validation error. Please check your params and try again.',
    alreadyExist: (labal) => {
        return `${labal} alreadyExist`;
    },
    Invalidlogin: 'Invalid login credentials. Please check and try again.',
    add: (labal) => {
        return `${labal} added successfully.`;
    },
    fetch: (labal) => {
        return `${labal} fetched successfully.`;
    },
    update: (labal) => {
        return `${labal} updated successfully.`;
    },
    delete: (labal) => {
        return `${labal} deleted successfully.`;
    },
    notExist: (labal) => {
        return `${labal} not exist.`;
    },
    errorLog: (functionName, controllerName, err) => {
        return `${functionName} ${controllerName} Error @ ${err}`;
    },
};
exports.STATUS_CODE = {
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

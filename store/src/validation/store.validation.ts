import joi from 'joi';

//
const listing = joi.object({
  limit: joi.number().required(),
  page: joi.number().required(),
  sortBy: joi.string().required(),
  sort: joi.number().required(),
  searchBy: joi.string().optional(),
  keyword: joi.string().optional(),
});

const store = joi.object({
  storeName: joi.string().min(5).max(20).optional().messages({ 'any.required': 'Name is a required' }),
  address: joi.string().max(30).required(),
  email: joi.string().email().lowercase().required().description('email should be unique'),
  password: joi.string().min(6).required(),
  contact: joi.number().integer().min(100000000).max(9999999999).required(),
  description: joi.string().min(10).max(100).required(),
});

const loginStore = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
});
const user = joi.object({
  name: joi.string().optional(),
  age: joi.string().optional(),
  email: joi.string().email().optional(),
  password: joi.string().optional(),
});

const validationMiddleware = async (req: any, res: any, next: any, schema: string) => {
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  if (schema == 'listing') {
    var { error } = listing.validate(req.query, option);
  }

  if (schema == 'store') {
    var { error } = store.validate(req.body, option);
  }

  if (schema == 'user') {
    var { error } = user.validate(req.body, option);
  }

  if (schema == 'loginStore') {
    var { error } = loginStore.validate(req.body, option);
  }

  if (error) {
    res.status(400).json({ validationError: error.details[0].message });
  } else {
    next();
  }
};

export default validationMiddleware;

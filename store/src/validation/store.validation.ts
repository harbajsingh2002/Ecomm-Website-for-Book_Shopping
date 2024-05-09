import joi from 'joi';

// listing validation
const listing = joi.object({
  limit: joi.number().required(),
  page: joi.number().required(),
  sortBy: joi.string().required(),
  sort: joi.number().required(),
  searchBy: joi.string().optional(),
  keyword: joi.string().optional(),
});

//Store validation
const store = joi.object({
  storeName: joi.string().min(5).max(20).optional().messages({ 'any.required': 'Name is a required' }),
  address: joi.string().max(30).required(),
  email: joi.string().email().lowercase().required().description('email should be unique'),
  password: joi.string().min(6).required(),
  contact: joi.number().integer().min(100000000).max(9999999999).required(),
  description: joi.string().min(10).max(100).required(),
  productId: joi.string().required(),
});

// Login validation
const loginStore = joi.object({
  email: joi.string().email().lowercase().required(),
  password: joi.string().min(6).required(),
});

//user validation
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

  let validationError = null;

  if (schema === 'listing') {
    const { error: listingError } = listing.validate(req.query, option);
    validationError = listingError;
  }

  if (schema === 'store') {
    const { error: storeError } = store.validate(req.body, option);
    validationError = storeError;
  }

  if (schema === 'user') {
    const { error: userError } = user.validate(req.body, option);
    validationError = userError;
  }

  if (schema === 'loginStore') {
    const { error: loginStoreError } = loginStore.validate(req.body, option);
    validationError = loginStoreError;
  }

  if (validationError) {
    res.status(400).json({ validationError: validationError.details[0].message });
  } else {
    next();
  }
};

export default validationMiddleware;

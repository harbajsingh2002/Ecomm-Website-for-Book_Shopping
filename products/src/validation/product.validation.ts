import joi from 'joi';

const listing = joi.object({
  limit: joi.number().required(),
  page: joi.number().required(),
  sortBy: joi.string().required(),
  sort: joi.number().required(),
  searchBy: joi.string().optional(),
  keyword: joi.string().optional(),
});

const product = joi.object({
  title: joi.string().required(),
  author: joi.string().required(),
  description: joi.string().required(),
  category: joi.string().required(),
  price: joi.string().required(),
  image: joi.string().required(),
});

const validationMiddleware = async (req: any, res: any, next: any, schema: string) => {
  const option = {
    abortEarly: false,
    allowUnknown: false,
  };

  if (schema == 'listing') {
    var { error } = listing.validate(req.query, option);
  }

  if (schema == 'product') {
    var { error } = product.validate(req.body, option);
  }

  if (error) {
    res.status(400).json({ validationError: error.details[0].message });
  } else {
    next();
  }
};

export default validationMiddleware;

const validationHandler = (schema) => async (req, res, next) => {
  try {
    await schema.validate(req.body, {abortEarly: false});
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
};

module.exports = validationHandler;

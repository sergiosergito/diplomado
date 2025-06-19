function validate(schema, target = "body") {
  return (req, res, next) => {
    const data = req[target];
    // 1 step
    if (!data || Object.keys(data).length === 0) {
      return res.status(400).json({ message: "No data found" });
    }
    // 2 step, validate against shecma with options using joi
    const { error, value } = schema.validate(data, {
      abortEarly: false,
      stripUnknown: true,
    });
    // 3 step, if errors, return error code
    if (error) {
      return res.status(400).json({
        message: `Error de validacion en ${target}`,
        errores: error.details.map((err) => err.message),
      });
    }
    // 4 step, replace original object with cleaned data
    req[target] = value;
    next();
  };
}

export default validate;

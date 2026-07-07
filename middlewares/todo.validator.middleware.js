const todoValidator = (schema) => {
    return (req, res, next) => {
        const { error, data } = schema.safeParse(req.body);

        if (error) {
            return res.status(400).json({
                success: false,
                message: error.errors[0].message,
            });
        }

        req.body = data;
        next();
    };
};

export default todoValidator;
           
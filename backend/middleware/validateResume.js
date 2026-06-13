const validateResume = (req, res, next) => {
    const {
        title,
        firstName,
        lastName,
        email,
        phone
    } = req.body;

    if (
        !title ||
        !firstName ||
        !lastName ||
        !email ||
        !phone
    ) {
        return res.status(400).json({
            message: "All required fields must be provided"
        });
    }

    next();
};

module.exports = validateResume;
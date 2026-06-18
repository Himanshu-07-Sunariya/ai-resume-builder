const validateResume = (req, res, next) => {
    const { title } = req.body;

    if (!title) {
        return res.status(400).json({
            message: "Resume title is required"
        });
    }

    next();
};

module.exports = validateResume;
const { ApiError } = require("../utils");
const { ZodError } = require("zod");

const handleGlobalError = (err, req, res, next) => {
    console.error(err);
    if (err instanceof ApiError) {
        return res.status(err.statusCode).json({ error: err.message });
    } else if (err instanceof ZodError) {
        return res.status(400).json({ error: err.errors });
    }

    return res.status(500).json({ error: "Internal server error" });
}

module.exports = { handleGlobalError };

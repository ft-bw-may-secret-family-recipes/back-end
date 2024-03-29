require("dotenv").config();

exports.PORT = process.env.PORT || "6000";
exports.NODE_ENV = process.env.NODE_ENV || "development";

exports.DATABASE_URL = process.env.DATABASE_URL;
exports.DEV_DATABASE_URL = process.env.DEV_DATABASE_URL;
exports.TESTING_DATABASE_URL = process.env.TESTING_DATABASE_URL;

exports.BCRYPT_ROUNDS = parseInt(process.env.BCRYPT_ROUNDS) || 8;
exports.JWT_SECRET = process.env.JWT_SECRET || "SET your .env variables";

exports.SEED_PASSWORD = process.env.SEED_PASSWORD;

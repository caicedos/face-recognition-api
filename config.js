const dotenv = require('dotenv');

dotenv.config();

module.exports = {
    clarifaiKey: process.env.CLARIFAI_API,
    port: process.env.PORT
};
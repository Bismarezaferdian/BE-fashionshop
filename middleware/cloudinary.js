const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "websitemuid",
  api_key: "526323179734738",
  api_secret: "9WJUmLHJLjW-pbIhMgCEjIeotCQ",
  secure: true,
});

module.exports = cloudinary;

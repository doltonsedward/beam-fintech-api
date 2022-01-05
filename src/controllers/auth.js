const { User } = require("../../models");
const Joi = require("joi");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
  const schema = Joi.object({
    email: Joi.string().email().min(6).required(),
    password: Joi.string().min(6).required(),
  });

  const { error } = schema.validate(req.body);

  if (error) {
    return res.status(400).send({
      error: { message: error.details[0].message },
    });
  }

  try {
    const userExist = await User.findOne({
      where: {
        email: req.body.email,
      },
      attributes: {
        exclude: ["createdAt", "updatedAt"],
      },
    });

    if (!userExist) {
      return res.status(400).send({
        status: "failed",
        message: "Email or password are incorrect",
      });
    }

    const isPassValid = await bcrypt.compare(
      req.body.password,
      userExist.password
    );
    if (!isPassValid) {
      return res.status(400).send({
        status: "failed",
        message: "Email or password are incorrect",
      });
    }

    // create jwt token, and add id, role to token. expiresIn for expires date of token
    const token = jwt.sign(
      { id: userExist.id, name: userExist.name },
      process.env.TOKEN_KEY,
      { expiresIn: "1d" }
    );
    res.status(200).send({
      status: "success",
      user: {
        token,
      },
    });
  } catch (error) {
    res.status(500).send({
      status: "failed",
      message: "Internal server error",
    });
  }
};

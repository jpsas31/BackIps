const express = require("express");
const {
  getAdminMessage,
  getProtectedMessage,
  getPublicMessage,
} = require("../controllers/messages.controller");
const { checkJwt } = require("../middleware/check-jwt.middleware");

const messagesRouter = express.Router();

messagesRouter.get("/public",   (req, res) => {
  const message = getPublicMessage();

  res.status(200).json(message);
});

messagesRouter.get("/protected", checkJwt, (req, res) => {
  const message = getProtectedMessage();

  res.status(200).json(message);
});

module.exports = { messagesRouter };

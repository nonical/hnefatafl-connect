const express = require("express");
const helmet = require("helmet");
const morgan = require("morgan");
const knex = require("knex")({
  client: "pg",
  connection: process.env.POSTGRES,
});

const app = express();

app.set("trust proxy", "uniquelocal");

app.use(helmet());
app.use(morgan("common"));
app.use(express.json());

app.get("/invites/:keyword", async (req, res, next) => {
  try {
    const keyword = req.params.keyword;
    const query = await knex("invites").where("keyword", keyword).select();

    if (query.length == 0) {
      res.status(404);
      throw new Error("Invalid invite code");
    }

    res.json(query);
  } catch (err) {
    next(err);
  }
});

app.post("/invites", async (req, res, next) => {
  try {
    await knex("invites").insert({
      ip: req.ip,
      keyword: req.body.keyword,
    });

    res.json({ message: "Invite saved" });
  } catch (err) {
    next(err);
  }
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;

  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? undefined : err.stack,
  });
});

app.listen(process.env.PORT);

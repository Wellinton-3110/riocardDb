const express = require("express");
const bodyParser = require("body-parser");
const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient({
  datasources: {
    db: {
      url: process.env.DATABASE_URL,
    },
  },
});

const app = express();
const cors = require("cors");
const port = 3000;

app.use(cors());
app.use(bodyParser.json());

app.get("/usuarios", async (req, res) => {
  const data = await prisma.user.findMany();
  return res.json(data);
});

app.post("/usuarios", async (req, res) => {
  const body = req.body;
  const user = await prisma.user.create({
    data: {
      nome: body.nome,
      email: body.email,
      login: body.login,
      senha: body.senha,
    },
  });
  return res.json(user);
});

app.delete("/usuarios/:id", async (req, res) => {
  const userID = Number(req.params.id);
  const deleteUser = await prisma.user.delete({
    where: {
      id: userID,
    },
  });
  return res.json(deleteUser);
});

app.listen(port);

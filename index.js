const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const app = express();

app.use(express.json());
app.use(cors());
app.use(express.static("build"));
morgan.token("body", (req, res) => {
  return JSON.stringify(req.body);
});
app.use(
  morgan(":method :url :status :req[content-length] - :response-time ms :body")
);

let persons = [
  {
    name: "Arto Hellas",
    number: "040-123456",
    id: 1,
  },
  {
    name: "Ada Lovelace",
    number: "39-44-5323523",
    id: 2,
  },
  {
    name: "Dan Abramov",
    number: "12-43-234345",
    id: 3,
  },
  {
    name: "Mary Poppendieck",
    number: "39-23-6423122",
    id: 4,
  },
];

app.get("/", (req, res) => {
  res.send("<h1>Phonebook backend</h1>");
});
app.get("/api/persons", (req, res) => {
  res.json(persons);
});
app.get("/info", (req, res) => {
  const date = new Date();
  res.send(
    `<p>Phonebook has info for ${persons.length} people </p> <p>${date}</p>`
  );
});
app.get("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  const person = persons.find((person) => person.id === id);
  if (person) {
    res.json(person);
  } else {
    res.status(400).end();
  }
});
app.delete("/api/persons/:id", (req, res) => {
  const id = Number(req.params.id);
  if (persons.find((person) => person.id === id)) {
    persons = persons.filter((person) => person.id !== id);
    res.status(204).end();
  } else {
    res.status(404).end();
  }
});
const generateId = () => {
  return Math.round(Math.random() * 1000000000);
};
app.post("/api/persons", (req, res) => {
  const body = req.body;
  if (
    body.name === "" ||
    body.name == undefined ||
    body.number === "" ||
    body.number === undefined
  ) {
    res.status(400).json({
      error: "name or number missing",
    });
  } else if (
    persons.find(
      (person) => person.name.toLowerCase() === body.name.toLowerCase()
    )
  ) {
    res.status(400).json({
      error: "name must be unique",
    });
  } else {
    const person = {
      name: body.name,
      number: body.number,
      id: generateId(),
    };
    persons = [...persons, person];
    res.json(person);
  }
});

const PORT = process.env.PORT || 3001;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

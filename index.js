const express = require("express");

const server = express();

server.use(express.json());

let requestCounter = 0;
const projects = [];

server.use((req, res, next) => {
  requestCounter++;
  console.log(`Quantity of requests:${requestCounter}`);
  return next();
});

function checkIdIsAvailable(req, res, next) {
  const { id } = req.body;
  const project = projects.find(prj => prj.id == id);
  if (project) {
    return res
      .status(400)
      .json({ error: `Id: ${id} already exists. Try again with new id.` });
  }
  return next();
}

function checkIdExists(req, res, next) {
  const { id } = req.params;
  const project = projects.find(prj => prj.id == id);
  if (!project) {
    return res.status(400).json({ error: `Id: ${id} does not exists.` });
  }
  req.project = project;
  return next();
}

server.get("/projects", (req, res) => {
  res.json(projects);
});

server.post("/projects", checkIdIsAvailable, (req, res) => {
  const { id, title, tasks } = req.body;
  projects.push({ id, title, tasks });
  res.json(projects);
});

server.put("/projects/:id", checkIdExists, (req, res) => {
  const { title } = req.body;
  const project = req.project;
  project.title = title;
  res.json(project);
});

server.delete("/projects/:id", checkIdExists, (req, res) => {
  const project = req.project;
  const index = projects.indexOf(project);
  if (index > -1) {
    projects.splice(index, 1);
  }
  return res.status(200).send();
});

server.post("/projects/:id/tasks", checkIdExists, (req, res) => {
  const project = req.project;
  const { title } = req.body;
  project.tasks.push(title);
  return res.json(project);
});

server.listen(3000);

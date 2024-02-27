const express = require("express");
const app = express();

const port = 5000;

const users = require("./MOCK_DATA.json");

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

// Routes

// Get all users
app.get("/users", (req, res) => {
  return res.json(users);
});

// Get user by ID
app.get("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const user = users.find((user) => user.id === id);

  return res.json(user);
});

// Create new user
app.post("/users", (req, res) => {
  const body = req.body;
  users.push({
    id: body.id,
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender
  });
  return res.json({ users });
});

// Update user (PUT)
app.put("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const body = req.body;
    users[userIndex] = {
      id,
      first_name: body.first_name,
      last_name: body.last_name,
      email: body.email,
      gender: body.gender
    };
    return res.json({ status: "User updated successfully" });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Edit user (PATCH)
app.patch("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  const userIndex = users.findIndex((user) => user.id === id);

  if (userIndex !== -1) {
    const body = req.body;
    // Update only the provided fields
    users[userIndex] = { ...users[userIndex], ...body };
    return res.json({ status: "User updated successfully" });
  } else {
    return res.status(404).json({ error: "User not found" });
  }
});

// Delete user
app.delete("/users/:id", (req, res) => {
  const id = Number(req.params.id);
  users = users.filter((user) => user.id !== id);
  return res.json({ status: "User deleted successfully" });
});

app.listen(port, () => {
  console.log(`Server is running on port number ${port}`);
});

// Initial Sanity Check: 
console.log("Nodemon is functional.");

const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

////////// Fake DB //////////
let users = [
    { id: shortid.generate(), name: "Son Goku", bio: "Earth's Greatest Defender" },
    { id: shortid.generate(), name: "Vegeta", bio: "Prince of all Saiyans" },
    { id: shortid.generate(), name: "Raditz", bio: "Goku's older brother"}
];

////////// Helper Functions //////////
const UserActions = {
    getAll() {
        return users;
    },
    getById(id) {
        return users.find(user => user.id === id);
    },
    createNew(user) {

    },
    delete(id) {

    },
    update(id, changes) {

    },
};

////////// User Endpoints //////////
// GET all users (TESTED)
server.get("/api/users", (req, res) => {
    const users = UserActions.getAll()
    if (users) {
        res.status(200).json(users)
    } else {
        res.status(500).json({ errorMessage: "The users information could not be retrieved." })
    }
});

// GET user by ID (TESTED)
server.get("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const user = UserActions.getById(id);
    if (user) {
        res.status(200).json(user)
    } else if (!user) {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    } else {
        res.status(500).json({ errorMessage: "The user information could not be retrieved." })
    }
});



////////// Catch-All Endpoint //////////
server.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "The requested information could not be retrieved." });
});

////////// Server Start //////////
server.listen(5000, () => {
    console.log("listening on port 5000")
})
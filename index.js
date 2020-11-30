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
        const newUser = {
            id: shortid.generate(),
            ...user
        };
        users.push(newUser);
        return newUser;
    },
    delete(id) {
        const user = users.find(user => user.id === id);
        if (user) {
            users = users.filter(u => u.id !== id)
        }
        return user;
    },
    update(id, changes) {
        const user = users.find(user => user.id === id)
        if (!user) {
            return null;
        } else {
            const updatedUser = { id, ...changes } 
            users = users.map(u => {
                if (u.id === u) return updatedUser
                return u;
            })
            return updatedUser;
        }
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

// POST new user (TESTED)
server.post("/api/users", (req, res) => {
    const userFromClient = req.body;

    if(!userFromClient.name || !userFromClient.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else if (!userFromClient) {
        res.status(500).json({ errorMessage: "There was an error while saving the user to the database" })
    } else {
        const newlyCreatedUser = UserActions.createNew(userFromClient);
        res.status(201).json(newlyCreatedUser)
    }
})

// DELETE a user (TESTED)
server.delete("/api/users/:id", (req, res) => {
    const { id } = req.params;
    const deletedUser = UserActions.delete(id);
    if (deletedUser) {
        res.status(200).json({ message: deletedUser.name + " has been removed."})
    } else if (!deletedUser) {
        res.status(500).json({ errorMessage: "The user could not be removed" })
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

// PUT an update to a user
server.put("/api/users/:id", (req, res) => {
    const userChanges = req.body;
    const { id } = req.params;

    const replacedUser = UserActions.update(id, userChanges)

    if (replacedUser) {
        res.status(200).json({ message: replacedUser })
    } else if (!replacedUser) {
        res.status(500).json({ errorMessage: "The user information could not be modified." })
    } else if (!replacedUser.name || !replacedUser.bio) {
        res.status(400).json({ errorMessage: "Please provide name and bio for the user." })
    } else {
        res.status(404).json({ message: "The user with the specified ID does not exist." })
    }
})

////////// Catch-All Endpoint //////////
server.use("*", (req, res) => {
    res.status(404).json({ errorMessage: "The requested information could not be retrieved." });
});

////////// Server Start //////////
server.listen(5000, () => {
    console.log("listening on port 5000")
})
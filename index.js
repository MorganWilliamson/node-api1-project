// Initial Sanity Check: 
console.log("Nodemon is functional.");

const express = require("express");
const shortid = require("shortid");

const server = express();

server.use(express.json());

let users = [
    { id: shortid.generate(), name: "Son Goku", bio: "Earth's Greatest Defender" },
    { id: shortid.generate(), name: "Vegeta", bio: "Prince of all Saiyans" },
    { id: shortid.generate(), name: "Raditz", bio: "Goku's older brother"}
];


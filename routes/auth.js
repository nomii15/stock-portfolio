const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");
const keys = require("../config/keys");
const User = mongoose.model("users");
const Validator = require("validator");
const validateRegisterInput = require("../validation/auth/register");
const validateLoginInput = require("../validation/auth/login");
const crypto = require("crypto");

module.exports = (app) => {
    app.post("/api/register", async (req, res) => {

    });

    app.post("/api/login", async (req, res) => {
        
    });

    app.post("/api/logout", async (req, res) => {
        
    });

    app.get("/api/get-current-user", async (req, res) => {
        
    })
}
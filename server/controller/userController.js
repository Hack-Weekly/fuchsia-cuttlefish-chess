const {closePool, openPool, openClient } = require("./client");
const { User } = require("../models/user");
const { query } = require("express");
/**
 * 
 * @param {User} User 
 */


//Some reason client and pool work on diffenent language. Need to look into it its for a specific sublanguage.
const pool = openPool();
const client = openClient();
const signin = (user) => {
    

    const query = {
        name: "signin-user",
        text: "SELECT userId, username, password FROM users WHERE username = $1, password = $2",
        values: [user.getUsername(), user.getPassword()]
    }
    

    pool.query(query, (err, res) => {
            if(err) {
                console.error(err);
                return;
            }
            else {
                const data = res.rows[0];
                return new User(data.userId, data.username);
            }
    });
} 

const signup = (user) => {
    const query = {
        text: "INSERT INTO users(username, password) VALUES ($1, $2)",
        values: [user.getUsername(), user.getPassword()]
    }

    console.log(query)
    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        } else {
            if(signin(user, client)) {
                console.error("User already exists")
            }
            return res.User;

        }
    })
}

const deleteUser = (username, password) => {
    const query = {
        name: "delete-user",
        text: "DELETE FROM users WHERE username = $1, password = $2",
        values: [User.getUsername(), User.getPassword()]
    }

    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        } else {
            const data = res.rows[0];
            return new User(data.userId, data.username);
        }
    })
}

const selectUser = async (userId) => {
    console.log("Message")
    const query = {
        text: "SELECT * FROM users WHERE userId = $1",
        values: [userId]
    }

    try {
        const res = await pool.query(query);
        if(res.rows.length == 0) {
            console.error("No user found");
            return;
        }
        else {
            console.log("Breakpoint")
            const user = new User(res.rows[0].userid, res.rows[0].username, "");
            return user;
        }
    } catch (error) {
        console.error(error)
        return;
    }
}

const selectAllUsers = async () => {
    console.log("Route select all");
    var query = {
        text: "SELECT * FROM users"
    }

    try {
        const res = await pool.query("SELECT * FROM users");
        const users = [];
        
        res.rows.map(row => {
            const user = new User(row.userid, row.username, "");
            users.push(user);
        });

        if (users.length > 0) {
            const test = users[0];
            console.log(test.getUsername())
            console.log(test.toJSON());
        } else {
            console.log("No uses found.");
        }
        return users;
    } catch (error) {
        console.error(error);
        throw error;
    }
}

module.exports = {signin, signup, deleteUser, selectUser, selectAllUsers}
const {closePool, openPool } = require("./client");
const { User } = require("../models/user");
const { query } = require("express");
/**
 * 
 * @param {User} User 
 */

const pool = openPool();
const signin = (user, pool) => {
    

    const query = {
        name: "signin-user",
        text: "SELECT userId, username, password FROM user WHERE username = $1, password = $2",
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

const signup = (user, pool) => {

    return new Promise((resolve, reject) => {
        const query = {
            name: "signup-user",
            text: "INSERT INTO user(username, password) VALUES ($1, $2)",
            values: [user.getUsername(), user.getPassword()]
        }

        pool.query(query, (err, res) => {
            if (err) {
                console.error(err);
                reject(err);
            } else {
                signin(user).then(user => {
                    if (err) {
                        console.error(err);
                        reject(err)
                    } else {
                        signin(user).then(user => {
                            resolve(user)
                        })
                    }
                })
            }
        })
    })
    /*
    const query = {
        name: "signup-user",
        text: "INSERT INTO user(username, password) VALUES ($1, $2)",
        values: [user.getUsername(), user.getPassword()]
    }

    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        } else {
            const user = signin(user, pool);
            return user;
        }
    })
    */

}

const deleteUser = (username, password) => {
    const query = {
        name: "delete-user",
        text: "DELETE FROM user WHERE username = $1, password = $2",
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

const selectUser = () => {
    const query = {
        name: "select-user",
        text: "SELECT * FROM user WHERE userId = $1",
        values: [User.getUserId()]
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

const selectAllUsers = () => {
    var query = {
        text: "SELECT * FROM user"
    }

    pool.query(query, (err, res) => {
        if (err) {
            console.error(err);
            return;
        } else {
            const users = res.rows.map(row => new User(row.userId, row.username, row.password));
            return users;
        }
    })
}

module.exports = {signin, signup, deleteUser, selectUser, selectAllUsers}
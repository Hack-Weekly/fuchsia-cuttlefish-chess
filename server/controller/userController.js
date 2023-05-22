import { closePool } from "./client";
import User from "../models/user";
import { query } from "express";
/**
 * 
 * @param {User} User 
 */
export const signin = (User, pool) => {
    

    const query = {
        name: "signin-user",
        text: "SELECT userId, username, password FROM user WHERE username = $1, password = $2",
        values: [User.getUsername(), User.getPassword()]
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

export const signup = (User, pool) => {

    const query = {
        name: "signup-user",
        text: "INSERT INTO user(username, password) VALUES ($1, $2)",
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

export const deleteUser = (username, password) => {
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

export const selectUser = () => {
    const query = {
        name: "select-user",
        text: "SELECT * FROM user",
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

export const selectAllUsers = () => {
    const users = [];
    const query = "SELECT * FROM users";


}

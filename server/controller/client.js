const fs = require('fs');
const { Pool, Client } = require('pg');




const openPool = () => {

    try {
        const data = fs.readFileSync('../sec.json', 'utf8');
        const secrets = JSON.parse(data);
        const user = secrets.user;
        const host = secrets.host;
        const database = secrets.database;
        const password = secrets.password;
        const port = secrets.port;

        const client = new Pool({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port,
            ssl: {
                //CHANGE THIS WHEN CONFIGURING SECURITY
                rejectUnauthorized: false
            }
            });
        
        console.log( `user: ${user}\nhost: ${host}\ndatabase: ${database}\nport: ${port}` );
        return client;
    } catch (error) {
        console.error('Error parsing secrets:', error);
        return null;
    }
}

const openClient = () => {

    try {
        const data = fs.readFileSync('../sec.json', 'utf8');
        const secrets = JSON.parse(data);
        const user = secrets.user;
        const host = secrets.host;
        const database = secrets.database;
        const password = secrets.password;
        const port = secrets.port;

        const client = new Client({
            user: user,
            host: host,
            database: database,
            password: password,
            port: port,
            ssl: {
                //CHANGE THIS WHEN CONFIGURING SECURITY
                rejectUnauthorized: false
            }
            });
        
        console.log( `user: ${user}\nhost: ${host}\ndatabase: ${database}\nport: ${port}` );
        return client;
    } catch (error) {
        console.error('Error parsing secrets:', error);
        return null;
    }
}

const closePool = (client) => {
    client.end();
};
const closeClient = (client) => {
    client.end();
};

module.exports = {openPool, closePool, openClient, closeClient};
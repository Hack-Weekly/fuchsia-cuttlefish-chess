const fs = require('fs');
const {Pool} = require('pg');




openPool = () => {
    fs.readFile('../sec.json', 'utf8', (error, data) => {
        if(error) {
            console.error('Error loading secrets: ', error);
            return null;
        }
    
        try {
            const secrets = JSON.parse(data);
            const user = secrets.user;
            const host = secrets.host;
            const database = secrets.database;
            const password = secrets.password;
            const port = secrets.port;
    
            const pool = new Pool({
                user: user,
                host: host,
                database: database,
                password: password,
                port: port
              });
          
              console.log( `user: ${user}\nhost: ${host}\ndatabase: ${database}\nport: ${port}` );
        } catch (error) {
            console.error('Error parsing secrets:', error);
            return null;
        }
    })
}

closePool = (pool) => {
    pool.end();
};
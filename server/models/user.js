
/**
 * @private userId
 * @private username
 * @private password
 * @constructor constructor
 * @constructor
 */
class User {
    #userId
    #username
    #password
    
    //Apparently javascript doesn't support multiple constructors when I asked for improvements to my code in gpt
    //This allows for passing all permutations of users such as only id, username and password, etc.
    constructor(userIdOrUsername, usernameOrPassword, password) {
        if (typeof userIdOrUsername === 'number') {
            // If the first argument is a number, assume it's a userId
            this.setUserId(userIdOrUsername);
            if (usernameOrPassword && password) {
                // If there are two more arguments, assume they're username and password
                this.setUsername(usernameOrPassword);
                this.setPassword(password);
            }
        } else {
            // If the first argument is not a number, assume it's a username
            this.setUsername(userIdOrUsername);
            if (usernameOrPassword) {
                // If there's another argument, assume it's a password
                this.setPassword(usernameOrPassword);
            }
        }
    }

    getUserId() {
        return this.#userId;
    }

    setUserId(userId) {
        this.#userId = userId;
    }
    
    getUsername() {
        return this.#username;
    }

    setUsername(username) {
        this.#username = username;
    }

    getPassword() {
        return this.#password;
    }

    setPassword(password) {
        this.#password = password;
    }
}

module.exports = {User}
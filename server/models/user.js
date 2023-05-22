
/**
 * @private userId
 * @private username
 * @private password
 * @constructor constructor
 * @constructor
 */
export default class User {
    #userId
    #username
    #password
    
    constructor(userId) {
        this.setUserId(userId);
    }

    constructor(username) {
        this.setUsername(username);
    }

    constructor(username, password) {
        this.setUsername(username);
        this.setPassword(password);
    }

    constructor(userId, username, password) {
        this.setUserId(userId);
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
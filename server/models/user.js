
/**
 * Class is for any 
 */
class User {
    #userId
    #username
    #password
    
    //Changed this to a more simple constructor that will just pass a blank string for password where its not needed
    constructor(userid, username, password) {
        this.setUserId(userid);
        this.setUsername(username);
        this.setPassword(password);
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

    toJSON() {
        const jsonObj = {
            userId: this.getUserId(),
            username: this.getUsername()
        };
        if (this.getPassword()) {
            jsonObj.password = this.getPassword();
        }

        return jsonObj;
    }
}

module.exports = {User}
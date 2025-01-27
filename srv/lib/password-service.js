const crypto = require('crypto');

class PasswordService {
    constructor() {
        this.saltRounds = 10;
    }

    hashPassword(password) {
        const salt = crypto.randomBytes(16).toString('hex');
        const hash = crypto.pbkdf2Sync(password, salt, 1000, 64, 'sha512').toString('hex');
        return `${salt}:${hash}`;
    }
}

const passwordService = new PasswordService();
module.exports = { passwordService };
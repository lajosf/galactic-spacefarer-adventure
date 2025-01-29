const cds = require('@sap/cds');
const LOG = cds.log('mail-service');

class MailService {
    async sendWelcomeEmail() {
        LOG.info('We would like to congratulate on starting your adventurous journey among stars!');
    }
}

const mailService = new MailService();
module.exports = { mailService };
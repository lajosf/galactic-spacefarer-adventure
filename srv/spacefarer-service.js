const cds = require('@sap/cds');
const { passwordService } = require('./lib/password-service');

const LOG = cds.log('spacefarer-service');

/**
 * Implementation for Galactic Spacefarer Service
 */
class SpacefarerService extends cds.ApplicationService {
    async init() {
        await super.init();

        this.after(['READ', 'CREATE', 'UPDATE', 'DELETE'], 'GalacticSpacefarers', async (data, req) => {
            LOG.info('Operation performed on GalacticSpacefarers', {
                user: req.user?.id,
                operation: req.event,
                data: data
            });
        });

        // Password hashing before CREATE
        this.before('CREATE', 'GalacticSpacefarers', async (req) => {
            if (req.data.password) {
                req.data.password = passwordService.hashPassword(req.data.password);
                LOG.debug('Password hashed for user:', req.data.email);
            }
        });

        // Remove password from response
        this.after(['READ', 'CREATE'], 'GalacticSpacefarers', (each) => {
            if (each.password) delete each.password;
        });
    }
}

module.exports = SpacefarerService;
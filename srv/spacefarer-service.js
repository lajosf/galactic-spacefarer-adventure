const cds = require('@sap/cds');
const { passwordService } = require('./lib/password-service');
const { setupSecurityMiddleware } = require('./middleware/security');

const LOG = cds.log('spacefarer-service');

/**
 * Implementation for Galactic Spacefarer Service
 */
class SpacefarerService extends cds.ApplicationService {
    async init() {
        const app = cds.app;

        // Initialize parent
        await super.init();

        // Setup security middleware
        setupSecurityMiddleware(app);

        // Password hashing before CREATE
        this.before('CREATE', 'GalacticSpacefarers', async (req) => {
            if (req.data.password) {
                req.data.password = passwordService.hashPassword(req.data.password);
                LOG.debug('Password hashed for user:', req.data.email);
            }
        });

        // Validate PATCH operation if user is not the admin
        this.before('PATCH', 'GalacticSpacefarers', async (req) => {
            const user = req.user;
            const isAdmin = user.roles && user.roles.admin === 1;
            if (!isAdmin) {
                // User with SpacefarerUser role can only update stardust and spacesuit
                const allowedFields = ['stardustCollection', 'spacesuitColor'];
                const systemFieldsToIgnore = ['ID', 'modifiedAt', 'createdAt'];

                const updateFields = Object.keys(req.data)
                    .filter(field => !systemFieldsToIgnore.includes(field));

                const invalidFields = updateFields.filter(field => {
                    return !allowedFields.includes(field);
                });

                if (invalidFields.length > 0) {
                    req.error({
                        code: 'FORBIDDEN_UPDATE',
                        message: `User with SpacefarerUser role can only update: ${allowedFields.join(', ')}`,
                        target: invalidFields[0]
                    });
                }
            }
        });

        // Register event handlers
        this.after(['READ', 'CREATE', 'PATCH', 'DELETE'], 'GalacticSpacefarers', async (data, req) => {
            LOG.info('Operation performed on GalacticSpacefarers', {
                user: req.user?.id,
                operation: req.event,
                data: data
            });
        });

        // Remove password from response
        this.after(['READ', 'CREATE'], 'GalacticSpacefarers', (each) => {
            if (each.password) delete each.password;
        });

        await super.init();
    }
}

module.exports = SpacefarerService;
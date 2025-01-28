const cds = require('@sap/cds');
const { passwordService } = require('./lib/password-service');
const { setupSecurityMiddleware } = require('./middleware/security');

const LOG = cds.log('spacefarer-service');

/**
 * Implementation for Galactic Spacefarer Service
 */
class SpacefarerService extends cds.ApplicationService {
    init() {
        const app = cds.app;
        setupSecurityMiddleware(app);

        // Password hashing before CREATE
        this.before('CREATE', 'GalacticSpacefarers', async (req) => {
            await this.validateStardustCollection(req);
            if (req.data.password) {
                req.data.password = passwordService.hashPassword(req.data.password);
                LOG.debug('Password hashed for user:', req.data.email);
            }
        });

        // Validate UPDATE operation
        this.before(['UPDATE'], 'GalacticSpacefarers', async (req) => {
            const user = req.user;
            const isAdmin = user.roles && user.roles.admin === 1;

            if (!isAdmin) {
                const allowedFields = ['stardustCollection', 'spacesuitColor'];
                const systemFieldsToIgnore = ['ID', 'modifiedAt', 'createdAt'];

                const updateFields = Object.keys(req.data);

                const invalidFields = updateFields.filter(field => {
                    return !allowedFields.includes(field) && !systemFieldsToIgnore.includes(field);
                });

                if (invalidFields.length > 0) {
                    return req.error(403, {
                        code: 'FORBIDDEN_UPDATE',
                        message: `User with SpacefarerUser role can only update: ${allowedFields.join(', ')}`,
                        target: invalidFields[0]
                    });
                }
            }

            if (req.data.stardustCollection !== undefined) {
                await this.validateStardustCollection(req);
            }
        });

        // Register event handlers
        this.after(['READ', 'CREATE', 'UPDATE', 'DELETE'], 'GalacticSpacefarers', async (data, req) => {
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

        return super.init();
    }

    async validateStardustCollection(req) {
        if (req.event === 'UPDATE') {
            const spacefarerId = req.params[0];
            const currentSpacefarer = await SELECT.one.from('GalacticSpacefarers')
                .where({ ID: spacefarerId });
                
            if (currentSpacefarer && req.data.stardustCollection < currentSpacefarer.stardustCollection) {
                return req.error({
                    code: 'CANNOT_DECREASE_STARDUST',
                    message: `Cannot decrease stardust collection from ${currentSpacefarer.stardustCollection} to ${req.data.stardustCollection}`,
                    status: 403
                });
            }
        }
    }
}

module.exports = SpacefarerService;
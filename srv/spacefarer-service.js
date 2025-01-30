const cds = require('@sap/cds');
const { passwordService } = require('./lib/password-service');
const { mailService } = require('./lib/mail-service');
const { setupSecurityMiddleware } = require('./middleware/security');
const rateLimit = require('express-rate-limit');

const LOG = cds.log('spacefarer-service');

// Configure express-rate-limit
cds.on('bootstrap', app => {
    app.set('trust proxy', 1);
    app.use(rateLimit({
        validate: { xForwardedForHeader: false }
    }));
});

/**
 * Implementation for Galactic Spacefarer Service
 */
class SpacefarerService extends cds.ApplicationService {
    async init() {
        const { GalacticSpacefarers } = this.entities;
        const app = cds.app;
        setupSecurityMiddleware(app);

        // Password hashing before CREATE
        this.before('CREATE', 'GalacticSpacefarers', async (req) => {
            if (req.data.password) {
                req.data.password = passwordService.hashPassword(req.data.password);
                LOG.debug('Password hashed for user:', req.data.email);
            }

            this.enhanceStardustCollection(req);

            this.enhanceWormholeNavigationSkill(req);
        });

        // Validate UPDATE operations
        this.before('UPDATE', 'GalacticSpacefarers', async (req) => {
            const user = req.user;
            if (!user) return req.error(403, 'Not authorized');

            // Skip validation for draft operations
            if (req.data.IsActiveEntity === false) {
                return;
            }

            // Validate user permissions
            if (!user.is('admin')) {
                const entity = await SELECT.from(GalacticSpacefarers)
                    .where({ ID: req.data.ID });

                if (entity.length > 0 && entity[0].email !== user.id) {
                    return req.error(403, 'Can only edit own records');
                }
            }

            // User cannot change password during UPDATE
            if (req.data.password) {
                return req.error(403, {
                    code: 'FORBIDDEN_UPDATE',
                    message: 'Password cannot be updated directly',
                    target: 'password'
                });
            }

            // Validate field values
            if (req.data.stardustCollection !== undefined) {
                await this.validateStardustCollection(req);
            }
            if (req.data.wormholeNavigationSkill !== undefined) {
                await this.validateWormholeNavigationSkill(req);
            }
        });

        this.after(['CREATE'], 'GalacticSpacefarers', async () => {
            mailService.sendWelcomeEmail();
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

    enhanceWormholeNavigationSkill(req) {
        if (req.data.wormholeNavigationSkill < 3) {
            req.data.wormholeNavigationSkill = 3;
        }
    }

    enhanceStardustCollection(req) {
        if (req.data.stardustCollection < 10) {
            req.data.stardustCollection = 10;
        }
    }

    async validateStardustCollection(req) {
        const spacefarerId = req.data.ID;
        const currentSpacefarer = await SELECT.from('GalacticSpacefarers')
            .where({ ID: spacefarerId });

        if (currentSpacefarer.length > 0 && req.data.stardustCollection < currentSpacefarer[0].stardustCollection) {
            return req.error(403, {
                code: 'CANNOT_DECREASE_STARDUST',
                message: `Cannot decrease stardust collection from ${currentSpacefarer[0].stardustCollection} to ${req.data.stardustCollection}`
            });
        }
    }

    async validateWormholeNavigationSkill(req) {
        const spacefarerId = req.data.ID;
        const currentSpacefarer = await SELECT.from('GalacticSpacefarers')
            .where({ ID: spacefarerId });

        if (currentSpacefarer.length > 0 && req.data.wormholeNavigationSkill < currentSpacefarer[0].wormholeNavigationSkill) {
            return req.error(403, {
                code: 'CANNOT_DECREASE_WHORMHOLE_NAVIGATION_SKILL',
                message: `Cannot decrease wormhole navigation skill from ${currentSpacefarer[0].wormholeNavigationSkill} to ${req.data.wormholeNavigationSkill}`
            });
        }
    }

}

module.exports = SpacefarerService;
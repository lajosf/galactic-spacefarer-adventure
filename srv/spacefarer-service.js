import cds from '@sap/cds';
import { passwordService } from './lib/password-service.js';

const LOG = cds.log('spacefarer-service');

/**
 * Implementation for Galactic Spacefarer Service
 */
export default class SpacefarerService extends cds.ApplicationService {
    async init() {
        await super.init();

        this.after(['READ', 'CREATE', 'UPDATE', 'DELETE'], 'GalacticSpacefarers', async (data, req) => {
            LOG.info('Operation performed on GalacticSpacefarers', {
                user: req?.user?.id,
                timestamp: new Date().toISOString(),
                action: req?.event,
                entity: 'GalacticSpacefarers'
            });
        });

        this.before('CREATE', 'GalacticSpacefarers', async (req) => {
            if (req.data.password) {
                req.data.password = passwordService.encryptPassword(req.data.password);
            }
        });

        this.after(['READ', 'CREATE'], 'GalacticSpacefarers', (each) => {
            if (each.password) delete each.password;
        });
    }
}
const cds = require('@sap/cds');
const { PATCH, expect } = cds.test('.').in(__dirname, '..');

describe('SpacefarerService', () => {
    const SERVICE_PATH = '/odata/v4/spacefarer';

    beforeAll(async () => {
        await cds.deploy(__dirname + '/../db/schema.cds').to('sqlite::memory:');
    });

    test('validate stardust collection', async () => {
        try {
            await PATCH(`${SERVICE_PATH}/GalacticSpacefarers(70416e33-224b-4970-a624-168662918af5)`, {
                stardustCollection: 1
            }, {
                auth: { username: 'junior@space.com', password: 'password' }
            });
            throw new Error('Should have rejected as stardust collection cannot be decreased');
        } catch (error) {
            expect(error.response.status).to.equal(403);
            expect(error.response.data.error).to.deep.include({
                message: 'Cannot decrease stardust collection from 10 to 1'
            });
        }
    });

    test('validate wormhole navigation skill', async () => {
        try {
            await PATCH(`${SERVICE_PATH}/GalacticSpacefarers(8116360c-74fa-431c-97a0-60e667c179e9)`, {
                wormholeNavigationSkill: 1
            }, {
                auth: { username: 'senior@space.com', password: 'password' }
            });
            throw new Error('Whormhole navigation skill cannot be decreased!');
        } catch (error) {
            expect(error.response.status).to.equal(403);
            expect(error.response.data.error).to.deep.include({
                message: 'Cannot decrease wormhole navigation skill from 7 to 1'
            });
        }
    });
});
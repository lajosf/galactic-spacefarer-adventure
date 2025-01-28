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
                code: 'CANNOT_DECREASE_STARDUST',
                message: 'Cannot decrease stardust collection from 10 to 1'
            });
        }
    });
});
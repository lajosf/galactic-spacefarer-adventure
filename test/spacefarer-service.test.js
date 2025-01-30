const cds = require('@sap/cds/lib');
const { default: axios } = require('axios');
const { POST, PATCH, GET, expect } = cds.test(__dirname + '../../');

describe('SpacefarerService', () => {
    const SERVICE_PATH = '/odata/v4/spacefarer';
    
    beforeAll(async () => {
        await cds.deploy(__dirname + '/../db/schema.cds').to('sqlite::memory:');
        axios.defaults.auth = { username: 'junior@space.com', password: 'password' };
    });

    describe('SpaceFarer Draft Choreography on updating his/her data', () => {
        const spacefarerId = '70416e33-224b-4970-a624-168662918af5'; // Junior Spacefarer ID
    
        test('should create a draft for modification', async () => {
            axios.defaults.auth = { username: 'junior@space.com', password: 'password' };
            const response = await POST(
                `${SERVICE_PATH}/GalacticSpacefarers(ID='${spacefarerId}',IsActiveEntity=true)/SpacefarerService.draftEdit`
            );
            expect(response.status).to.equal(201);
        });
    
        test('should modify the draft', async () => {
            const response = await PATCH(
                `${SERVICE_PATH}/GalacticSpacefarers(ID='${spacefarerId}',IsActiveEntity=false)`,
                { stardustCollection: 20 }
            );
            expect(response.status).to.equal(200);
        });
    
        it('should activate the modified draft', async () => {
            const response = await POST(
                `${SERVICE_PATH}/GalacticSpacefarers(ID='${spacefarerId}',IsActiveEntity=false)/SpacefarerService.draftActivate`
            );
            expect(response.status).to.equal(200);
            expect(response.data.stardustCollection).to.equal(20);
        });
    
        test('should get modified spacefarer', async () => {
            const response = await GET(
                `${SERVICE_PATH}/GalacticSpacefarers(ID='${spacefarerId}',IsActiveEntity=true)`
            );
            expect(response.status).to.equal(200);
            expect(response.data.stardustCollection).to.equal(20);
        });
        
    });
    
    /* TODO: introduced dradt mode make fail the below tests. We should handle draft mode in tests!  
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

    test('should reject user with SpacefarerUser role trying to update forbidden fields', async () => {
        try {
            await PATCH(`${SERVICE_PATH}/GalacticSpacefarers(297c7566-49a0-4d24-b175-46a0a1ad60a8)`, {
                name: 'My New Name'
            }, {
                auth: { username: 'junior@space.com', password: 'password' }
            });
            throw new Error('Should have rejected forbidden field update');
        } catch (error) {
            expect(error.response.status).to.equal(403);
        }
    });

     */

});
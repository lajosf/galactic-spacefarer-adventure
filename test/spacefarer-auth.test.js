const cds = require('@sap/cds');
const { GET, POST, DELETE } = cds.test('.').in(__dirname, '..');
const { expect } = require('chai');

describe('SpacefarerService - Authentication & Authorization', () => {
    const SERVICE_PATH = '/odata/v4/spacefarer';

    const createSpacefarerData = () => ({
        name: 'Friedrich Schiller',
        email: 'friedrich.schiller@space.com',
        password: 'password',
        stardustCollection: 1,
        wormholeNavigationSkill: 3,
        originPlanet: 'Earth',
        spacesuitColor: 'White',
        department_ID: '7dacdb28-0601-40f0-8c64-cd86732db1f0',
        position_ID: '40493cf4-e1af-4ca7-bbc1-941bd80bd97e'
    });

    beforeAll(async () => {
        await cds.deploy(__dirname + '/../db/schema.cds').to('sqlite::memory:');
    });

    beforeEach(() => {
        // Reset auth defaults before each test
        cds.test.auth = { username: 'admin@spacefarer.com', password: 'password' };
    });

    describe('Authorization Tests', () => {
        test('should allow admin to read spacefarers', async () => {
            const response = await GET(`${SERVICE_PATH}/GalacticSpacefarers`, {
                auth: { username: 'admin@spacefarer.com', password: 'password' }
            });
            expect(response.status).to.equal(200);
            expect(response.data.value).to.be.an('array');
        });

        test('should allow SpacefarerUser to read spacefarers', async () => {
            const response = await GET(`${SERVICE_PATH}/GalacticSpacefarers`, {
                auth: { username: 'junior@space.com', password: 'password' }
            });
            expect(response.status).to.equal(200);
            expect(response.data.value).to.be.an('array');
        });

        test('should allow admin to create spacefarer', async () => {
            const data = createSpacefarerData();
            const response = await POST(`${SERVICE_PATH}/GalacticSpacefarers`, data, {
                auth: { username: 'admin@spacefarer.com', password: 'password' }
            });
            expect(response.status).to.equal(201);
            expect(response.data).to.have.property('ID');
        });

        test('should reject SpacefarerUser trying to create spacefarer', async () => {
            const data = createSpacefarerData();
            try {
                await POST(`${SERVICE_PATH}/GalacticSpacefarers`, data, {
                    auth: { username: 'junior@space.com', password: 'password' }
                });
                throw new Error('Should have rejected SpacefarerUser');
            } catch (error) {
                expect(error.response.status).to.equal(403);
            }
        });

        test('should reject unauthenticated access', async () => {
            try {
                await GET(`${SERVICE_PATH}/GalacticSpacefarers`, { auth: false });
                throw new Error('Should have rejected unauthenticated access');
            } catch (error) {
                expect(error.response.status).to.equal(401);
            }
        });

        test('should reject user with invalid credentials', async () => {
            try {
                await GET(`${SERVICE_PATH}/GalacticSpacefarers`, {
                    auth: { username: 'invalid@spacefarer.com', password: 'wrong' }
                });
                throw new Error('Should have rejected invalid credentials');
            } catch (error) {
                expect(error.response.status).to.equal(401);
            }
        });

        test('should reject SpacefarerUser trying to delete spacefarer', async () => {
            const data = createSpacefarerData();
            const createResponse = await POST(`${SERVICE_PATH}/GalacticSpacefarers`, data, {
                auth: { username: 'admin@spacefarer.com', password: 'password' }
            });

            try {
                await DELETE(`${SERVICE_PATH}/GalacticSpacefarers(${createResponse.data.ID})`, {
                    auth: { username: 'junior@space.com', password: 'password' }
                });
                throw new Error('Should have rejected SpacefarerUser delete operation');
            } catch (error) {
                expect(error.response.status).to.equal(403);
            }
        });
    });
});
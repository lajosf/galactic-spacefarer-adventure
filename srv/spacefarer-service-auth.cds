using {
    SpacefarerService.GalacticSpacefarers,
    SpacefarerService.Departments,
    SpacefarerService.Positions
} from './spacefarer-service';

/**
 * Galactic Spacefarer Service authorizations
 */
annotate GalacticSpacefarers with @(restrict: [
    {
        grant: ['READ'],
        where: 'originPlanet = $user.originPlanet',
        to   : 'SpacefarerUser'
    },
    {
        grant: ['UPDATE'],
        where: 'email = $user.id', // Mocked auth user id is the email
        to   : 'SpacefarerUser'
    },
    {
        grant: ['READ', 'CREATE', 'PATCH', 'DELETE'],
        to   : 'admin'
    }
]);

// Draft mode enabling for Spacefarers
annotate GalacticSpacefarers with @odata.draft.enabled;
annotate Departments with @readonly;
annotate Positions with @readonly;

using {
    SpacefarerService.GalacticSpacefarers,
    SpacefarerService.Departments,
    SpacefarerService.Positions
} from './spacefarer-service';

annotate GalacticSpacefarers with @(restrict: [
    {
        grant: ['READ'],
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

annotate GalacticSpacefarers with @odata.draft.enabled;
annotate Departments with @readonly;
annotate Positions with @readonly;

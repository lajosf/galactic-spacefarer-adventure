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
        grant: [
            'READ',
            'CREATE',
            'UPDATE',
            'DELETE'
        ],
        to   : 'admin'
    }
]);

annotate Departments with @readonly;
annotate Positions with @readonly;

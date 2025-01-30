using com.aldi.challange as db from '../db/schema';

/**
 * Galactic Spacefarer Service
 */
service SpacefarerService {
    entity GalacticSpacefarers as projection on db.GalacticSpacefarers;
    entity Departments as projection on db.Departments;
    entity Positions as projection on db.Positions;
}
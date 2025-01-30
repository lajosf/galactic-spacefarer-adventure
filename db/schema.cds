namespace com.aldi.challange;

entity GalacticSpacefarers {
    key ID                      : UUID;
        name                    : String(100) @mandatory;
        password                : String(100);
        email                   : String(255) @mandatory;
        stardustCollection      : Integer @mandatory @assert.range: [0, 1000000];
        wormholeNavigationSkill : Integer @mandatory @assert.range: [0, 100];
        originPlanet            : String(100) @mandatory;
        spacesuitColor          : String(60) @mandatory;
        department              : Association to Departments;
        position                : Association to Positions;
        createdAt               : Timestamp @cds.on.insert: $now;
        modifiedAt              : Timestamp @cds.on.update: $now;
}

entity Departments {
    key ID                      : UUID;
        name                    : String(1000) @mandatory;
        description             : String(1000);
        location                : String(100) @mandatory;
        budget                  : Integer @assert.range: [0, null];
        galacticSpacefarers     : Association to many GalacticSpacefarers on galacticSpacefarers.department = $self
}

entity Positions {
    key ID                      : UUID;
        name                    : String(100) @mandatory;
        description             : String(1000);
        rank                    : Integer @mandatory @assert.range: [0, 10];
        salary                  : Integer @mandatory @assert.range: [0, null];
        galacticSpacefarers     : Association to many GalacticSpacefarers on galacticSpacefarers.position = $self
}
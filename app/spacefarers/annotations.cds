using SpacefarerService as service from '../../srv/spacefarer-service';
annotate service.GalacticSpacefarers with @(
    UI.FieldGroup #GeneratedGroup : {
        $Type : 'UI.FieldGroupType',
        Data : [
            {
                $Type : 'UI.DataField',
                Label : '{i18n>Name}',
                Value : name,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>CosmicNotificationEmail}',
                Value : email,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>StardustCollection}',
                Value : stardustCollection,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>WormholeNavigationSkill}',
                Value : wormholeNavigationSkill,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>OriginPlanet}',
                Value : originPlanet,
            },
            {
                $Type : 'UI.DataField',
                Label : '{i18n>SpacesuitColor1}',
                Value : spacesuitColor,
            },
        ],
    },
    UI.Facets : [
        {
            $Type : 'UI.ReferenceFacet',
            ID : 'GeneratedFacet1',
            Label : 'General Information',
            Target : '@UI.FieldGroup#GeneratedGroup',
        },
    ],
    UI.LineItem : [
        {
            $Type : 'UI.DataField',
            Label : 'name',
            Value : name,
        },
        {
            $Type : 'UI.DataField',
            Label : 'stardustCollection',
            Value : stardustCollection,
        },
        {
            $Type : 'UI.DataField',
            Value : spacesuitColor,
            Label : 'spacesuitColor',
        },
    ],
    UI.SelectionFields : [
        spacesuitColor,
        stardustCollection,
    ],
    UI.HeaderInfo : {
        Title : {
            $Type : 'UI.DataField',
            Value : name,
        },
        TypeName : '',
        TypeNamePlural : '',
        Description : {
            $Type : 'UI.DataField',
            Value : 'Spacefarer details',
        },
    },
);

annotate service.GalacticSpacefarers with {
    department @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Departments',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : department_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'description',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'location',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'budget',
            },
        ],
    }
};

annotate service.GalacticSpacefarers with {
    position @Common.ValueList : {
        $Type : 'Common.ValueListType',
        CollectionPath : 'Positions',
        Parameters : [
            {
                $Type : 'Common.ValueListParameterInOut',
                LocalDataProperty : position_ID,
                ValueListProperty : 'ID',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'name',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'description',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'rank',
            },
            {
                $Type : 'Common.ValueListParameterDisplayOnly',
                ValueListProperty : 'salary',
            },
        ],
    }
};

annotate service.GalacticSpacefarers with {
    spacesuitColor @Common.Label : '{i18n>SpacesuitColor}'
};

annotate service.GalacticSpacefarers with {
    stardustCollection @Common.Label : '{i18n>StardustCollection}'
};


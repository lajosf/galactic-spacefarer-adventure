sap.ui.define(['sap/fe/test/ObjectPage'], function(ObjectPage) {
    'use strict';

    var CustomPageDefinitions = {
        actions: {},
        assertions: {}
    };

    return new ObjectPage(
        {
            appId: 'com.aldi.challange.spacefarers',
            componentId: 'GalacticSpacefarersObjectPage',
            contextPath: '/GalacticSpacefarers'
        },
        CustomPageDefinitions
    );
});
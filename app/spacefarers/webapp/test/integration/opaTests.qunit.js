sap.ui.require(
    [
        'sap/fe/test/JourneyRunner',
        'com/aldi/challange/spacefarers/test/integration/FirstJourney',
        'com/aldi/challange/spacefarers/test/integration/pages/GalacticSpacefarersList',
        'com/aldi/challange/spacefarers/test/integration/pages/GalacticSpacefarersObjectPage'
    ],
    function(JourneyRunner, opaJourney, GalacticSpacefarersList, GalacticSpacefarersObjectPage) {
        'use strict';
        var JourneyRunner = new JourneyRunner({
            // start index.html in web folder
            launchUrl: sap.ui.require.toUrl('com/aldi/challange/spacefarers') + '/index.html'
        });

       
        JourneyRunner.run(
            {
                pages: { 
                    onTheGalacticSpacefarersList: GalacticSpacefarersList,
                    onTheGalacticSpacefarersObjectPage: GalacticSpacefarersObjectPage
                }
            },
            opaJourney.run
        );
    }
);
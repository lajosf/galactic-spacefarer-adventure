sap.ui.define([
    'sap/ui/test/opaQunit'
], function (opaTest) {
    'use strict';

    var Journey = {
        run: function() {
            QUnit.module('First journey');

            opaTest('Start application', function (Given, When, Then) {
                Given.iStartMyApp();

                Then.onTheGalacticSpacefarersList.iSeeThisPage();

            });


            opaTest('Navigate to ObjectPage', function (Given, When, Then) {
                // Note: this test will fail if the ListReport page doesn't show any data
                
                When.onTheGalacticSpacefarersList.onFilterBar().iExecuteSearch();
                
                Then.onTheGalacticSpacefarersList.onTable().iCheckRows();

                When.onTheGalacticSpacefarersList.onTable().iPressRow(0);
                Then.onTheGalacticSpacefarersObjectPage.iSeeThisPage();

            });

            opaTest('Teardown', function (Given) { 
                // Cleanup
                Given.iTearDownMyApp();
            });
        }
    };

    return Journey;
});
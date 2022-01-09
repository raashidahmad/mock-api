var fs = require('fs');
var overviewSchema = require('./modules/overview-summary-schema');
var agingReportSchema = require('./modules/aging-report-schema');

var database = {
    "serviceYears": [],
    "states": [],
    "services": [],
    "projects": [],
    "medicalGroups": [],
    "sites": [],
    "providers": [],
    "providerSpecialities": [],
    "dataImportDates": [],
    "projectReports": [],
    "pursuitReports": [],
    "chartReports": [],
    "sitePursuits": [],
    "siteCharts": [],
    "statuses": [],
    "subStatuses": [],
    "subSubStatuses": [],
    "pursuitStatuses": [],
    "chartStatuses": [],
    "serviceYearsForAging": [],
    "statesForAging": [],
    "servicesForAging": [],
    "projectsForAging": [],
    "medicalGroupsForAging": [],
    "sitesForAging": [],
    "providersForAging": [],
    "providerSpecialitiesForAging": [],
    "vendorsForAging": [],
    "dataImportDatesForAging": [],
    "pursuitGroupedStatusesForAging": [],
    "pursuitStatusesForAging": []
};

overviewSchema.createSchemaAndDataForOverview(database);
agingReportSchema.createSchemaAndDataForAgingReport(database);

var json = JSON.stringify(database);
fs.writeFile('src/api/database.json', json, 'utf8', (err) => {
    if (err) { console.error(err); return; };
    console.log("database.json created");

});
var faker = require('faker');
var helperLib = require('../helpers/helper');
var constants = require('../helpers/constants');

module.exports.createSchemaAndDataForOverview = function (database) {

    const LOOP_START = constants.LOOP_START;
    const LOOP_COUNTER_MEDICAL_GROUPS = constants.LOOP_COUNTER_MEDICAL_GROUPS;
    const LOOP_COUNTER_SERVICE_YEARS = constants.LOOP_COUNTER_SERVICE_YEARS;
    const LOOP_COUNTER_STATES = constants.LOOP_COUNTER_STATES;
    const LOOP_COUNTER_DATES = constants.LOOP_COUNTER_DATES;
    const LOOP_COUNTER_PROVIDERS = constants.LOOP_COUNTER_PROVIDERS;
    const LOOP_COUNTER_SPECIALITIES = constants.LOOP_COUNTER_SPECIALITIES;
    const LOOP_COUNTER_SERVICES = constants.LOOP_COUNTER_SERVICES;
    const LOOP_COUNTER_PROJECTS = constants.LOOP_COUNTER_PROJECTS;
    const LOOP_COUNTER_SITES = constants.LOOP_COUNTER_SITES;
    const LOOP_COUNTER_FIVE = constants.LOOP_COUNTER_FIVE;

    var helper = new helperLib();
    let dated = new Date();
    let currentYear = dated.getFullYear();
    let index = 1, projectId = 1, yearId = 1, serviceId = 1, medicalGroupId = 1, siteId = 1,
        providerId = 1, specialityId = 1;
    let states = [], sites = [], importDates = [];
    let statuses = [
        { "statusId": 1, "status": "Pursuable", "subStatuses": [] },
        { "statusId": 2, "status": "Completed", "subStatuses": [] },
        { "statusId": 3, "status": "Issued", "subStatuses": [] },
        { "statusId": 4, "status": "Closed", "subStatuses": [] }
    ];

    for (var date = 0; date <= LOOP_COUNTER_DATES; date++) {
        let state = faker.address.state();
        let stateCode = state.substring(0, 3).toUpperCase().concat((date+1));
        var fullDate = faker.date.past(2);
        var formattedDate = (fullDate.getMonth() + 1) + "/" + (fullDate.getDate()) + "/" + fullDate.getFullYear();

        database.dataImportDates.push({
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            importDate: formattedDate,
        });
        importDates.push(formattedDate);

        /**
         * Since this is mock data, we are creating mock codes for the states
         * keeping its length 3, to keep them unique as much possible
         */
        let newState = {
            code: stateCode,
            state: state,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            importDate: formattedDate
        };
        states.push(newState);
        database.states.push(newState);
    }

    let randomIndex = 0;
    for (var year = currentYear; year >= (currentYear - LOOP_COUNTER_SERVICE_YEARS); year--) {
        randomIndex = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES);
        let newState = states[randomIndex];

        database.serviceYears.push({
            id: yearId++,
            year: year,
            stateCode: newState.code,
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            importDate: importDates[randomIndex]
        });
    }

    for (var st = 0; st <= LOOP_COUNTER_STATES; st++) {
        /*
            Create multiple sites for a state
            Initially creating 5 sites for each state
        */
        let stateCode = states[st].code;
        for (var i = 0; i < LOOP_COUNTER_FIVE; i++) {
            let newSite = {
                siteId: siteId++,
                stateCode: stateCode,
                siteName: faker.address.streetName(),
                yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
                serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
                projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
                medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
                providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
                specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
                importDate: importDates[randomIndex]
            }
            database.sites.push(newSite);
            sites.push(newSite);
        }
    }

    for (var s = 0; s <= LOOP_COUNTER_SERVICES; s++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        database.services.push({
            serviceId: serviceId++,
            serviceName: faker.commerce.productName(),
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            importDate: importDates[randomIndex]
        });
    }

    for (var pr = 0; pr <= LOOP_COUNTER_PROJECTS; pr++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        database.projects.push({
            projectId: projectId++,
            projectName: faker.company.companyName(),
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            importDate: importDates[randomIndex]
        });
    }

    for (var mg = 0; mg <= LOOP_COUNTER_MEDICAL_GROUPS; mg++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        database.medicalGroups.push({
            medicalGroupId: medicalGroupId++,
            medicalGroup: faker.random.words(2),
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            importDate: importDates[randomIndex]
        });
    }

    for (var pr = 0; pr <= LOOP_COUNTER_PROVIDERS; pr++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        database.providers.push({
            providerId: providerId++,
            providerName: faker.name.firstName() + " " + faker.name.lastName(),
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            importDate: importDates[randomIndex]
        });
    }

    for (var sp = 0; sp <= LOOP_COUNTER_SPECIALITIES; sp++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        database.providerSpecialities.push({
            specialityId: specialityId++,
            speciality: faker.random.word(1).concat(' ', faker.hacker.adjective()),
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            importDate: importDates[randomIndex]
        });
    }

    /**
     * Generating data for table on overview tab
     * Definitions for the formulas deduced from the wireframe data
     * totalCount = Pursuable + Closed + Issued
     * totalCount = Available + Completed + Closed + Issued
     * Completion percentage = (complete / total * 100)
     * Available percentage = ((completed + closed) / total * 100)
     */
    sites.forEach((s) => {
        var completionPercent = helper.getRandomInRange(55, 95);
        var availablePercent = (100 - completionPercent);
        var pursuitCount = helper.getRandomInRange(4500, 5000);
        var pursuable = helper.getRandomInRange(3000, 4000);
        var closed = (pursuitCount - pursuable);
        var issued = helper.getRandomInRange(LOOP_START, (closed / 2));
        closed = closed - issued;
        var completed = parseInt((pursuable / 100) * completionPercent);
        var available = pursuable - completed;

        /**
         * Get random Ids for related data
         */
        let serviceId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES);
        let projectId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS);
        let medicalGroupId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS);
        let providerId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS);
        let specialityId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES);
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)];

        var sitePursuitSummary = {
            state: s.stateCode,
            siteId: s.siteId,
            site: s.siteName,
            siteName: s.siteName.concat(' ', '(', s.siteId, ')'),
            serviceId: serviceId,
            projectId: projectId,
            medicalGroupId: medicalGroupId,
            providerId: providerId,
            specialityId: specialityId,
            pursuitCount: pursuitCount,
            pursuable: pursuable,
            closed: closed,
            issued: issued,
            completed: completed,
            completedPercent: completionPercent,
            available: available,
            availablePercent: availablePercent,
            importDate: importDate
        };

        //data for charts
        var chartsCompletionPercent = helper.getRandomInRange(55, 95);
        var chartsAvailablePercent = (100 - chartsCompletionPercent);
        var chartsCount = helper.getRandomInRange(2500, 3000);
        var chartsPursuable = helper.getRandomInRange(1500, 2000);
        var chartsClosed = (chartsCount - chartsPursuable);
        var chartsIssued = helper.getRandomInRange(LOOP_START, (chartsClosed / 2));
        chartsClosed = chartsClosed - chartsIssued;
        var chartsCompleted = parseInt((chartsPursuable / 100) * chartsCompletionPercent);
        var chartsAvailable = chartsPursuable - chartsCompleted;

        var siteChartSummary = {
            state: s.stateCode,
            siteId: s.siteId,
            site: s.siteName,
            siteName: s.siteName.concat(' ', '(', s.siteId, ')'),
            serviceId: serviceId,
            projectId: projectId,
            medicalGroupId: medicalGroupId,
            providerId: providerId,
            specialityId: specialityId,
            chartsCount: chartsCount,
            pursuable: chartsPursuable,
            closed: chartsClosed,
            issued: chartsIssued,
            completed: chartsCompleted,
            completedPercent: chartsCompletionPercent,
            available: chartsAvailable,
            availablePercent: chartsAvailablePercent,
            importDate: importDate
        };
        /** Adding site summaries */
        database.sitePursuits.push(sitePursuitSummary);
        database.siteCharts.push(siteChartSummary);
    });

    /*
        Summary values for the projects
    */
    database.projectReports.push(
        { "report": "daysInProject", "title": "Days In Project", "value": 121 }
    );
    database.projectReports.push(
        { "report": "daysLeft", "title": "Days Left", "value": 35 }
    );
    database.projectReports.push(
        { "report": "projectCompletion", "title": "Project Completion", "value": 75.2 }
    );

    /**
     * Summary values for pursuits
     */
    database.pursuitReports.push(
        { "report": "totalPursuits", "title": "Total Pursuits", "value": 51678 }
    );
    database.pursuitReports.push(
        { "report": "pursuablePursuits", "title": "Pursuable Pursuits", "value": 40119 }
    );
    database.pursuitReports.push(
        { "report": "completedPursuits", "title": "Completed Pursuits", "value": 33208 }
    );
    database.pursuitReports.push(
        { "report": "availablePursuits", "title": "Available Pursuits", "value": 6911 }
    );
    database.pursuitReports.push(
        { "report": "initialTarget", "title": "Initial Target", "value": 31563 }
    );

    /**
     * Summary values for charts
     */
    database.chartReports.push(
        { "report": "totalCharts", "title": "Total Charts", "value": 20671 },
        { "report": "pursuableCharts", "title": "Pursuable Charts", "value": 16056 },
        { "report": "completedCharts", "title": "Completed Charts", "value": 13283 },
        { "report": "availableCharts", "title": "Available Charts", "value": 2764 },
        { "report": "initialTarget", "title": "Initial Target", "value": 12625 }
    );

    /*
    Creating data for statuses
    */
    let statusId = 1;
    statuses.forEach((s) => {
        let stateIndex = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES);
        let stateObj = states[stateIndex];
        let importDateIndex = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES);
        s.stateCode = stateObj.code;
        s.serviceYearId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS);
        s.serviceId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES);
        s.projectId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS);
        s.medicalGroupId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS);
        s.siteId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES);
        s.providerId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS);
        s.specialityId = helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES);
        s.importDate = importDates[importDateIndex];

        database.statuses.push(s);
        let subLimit = helper.getRandomInRange(3, 5);
        for (let i = 0; i < subLimit; i++) {
            let subStatus = {
                "subStatusId": statusId++,
                "parentId": s.statusId,
                "subStatus": faker.random.words(3),
                "subSubStatuses": []
            };

            let subSubLimit = helper.getRandomInRange(LOOP_START, 3);
            for (let j = 0; j < subSubLimit; j++) {
                let subSubStatus = {
                    "subSubStatusId": statusId++,
                    "parentId": subStatus.subStatusId,
                    "subSubStatus": faker.random.words(2),
                }
                subStatus.subSubStatuses.push(subSubStatus);
                database.subSubStatuses.push(subSubStatus);
            }
            database.subStatuses.push(subStatus);
            s.subStatuses.push(subStatus);
        }
    });

    /**
     * Creating status report for pursuits
     */
    let pursuitStatuses = JSON.parse(JSON.stringify(statuses));
    pursuitStatuses.forEach((s) => {
        let levelOneStatusValue = 1;
        let iteration = s.subStatuses.length;

        if (s.statusId == 1) {
            levelOneStatusValue = helper.getRandomInRange(15000, 16000);
        } else if (s.statusId == 2) {
            levelOneStatusValue = helper.getRandomInRange(2500, 3000);
        } else if (s.statusId == 3) {
            levelOneStatusValue = helper.getRandomInRange(2000, 2500);
        } else if (s.statusId == 4) {
            levelOneStatusValue = helper.getRandomInRange(1500, 2000);
        }

        let levelTwoAllocated = iteration == 1 ? levelOneStatusValue : parseInt((levelOneStatusValue / 2).toString());
        let levelTwoRemaining = levelTwoAllocated;
        s.value = levelOneStatusValue;

        for (var i = 0; i < iteration; i++) {
            let randomValue = 1;
            if (i == 0) {
                s.subStatuses[i].value = levelTwoAllocated;
            } else if (i > 0 && i < iteration - 1) {
                randomValue = parseInt(helper.getRandomInRange(LOOP_START, (levelTwoRemaining / 2)).toString());
                s.subStatuses[i].value = randomValue;
                levelTwoRemaining = levelTwoRemaining - randomValue;
            } else {
                s.subStatuses[i].value = levelTwoRemaining;
            }

            let internalIteration = s.subStatuses[i].subSubStatuses.length;
            let levelThreeAllocated = internalIteration == 1 ? s.subStatuses[i].value : parseInt((s.subStatuses[i].value / 2).toString());
            let levelThreeRemaining = levelThreeAllocated;

            for (var j = 0; j < internalIteration; j++) {
                if (j == 0) {
                    s.subStatuses[i].subSubStatuses[j].value = levelThreeAllocated;
                } else if (j > 0 && j < internalIteration - 1) {
                    let randomValue = parseInt(helper.getRandomInRange(LOOP_START, levelThreeRemaining / 2).toString());
                    s.subStatuses[i].subSubStatuses[j].value = randomValue;
                    levelThreeRemaining = levelThreeRemaining - randomValue;
                } else {
                    s.subStatuses[i].subSubStatuses[j].value = levelThreeRemaining;
                }
            }
        }
        database.pursuitStatuses.push(s);
    });

    /**
     * Creating statuses report for charts
     */
    let chartStatuses = JSON.parse(JSON.stringify(statuses));
    chartStatuses.forEach((s) => {
        let levelOneStatusValue = 1;
        let iteration = s.subStatuses.length;

        if (s.statusId == 1) {
            levelOneStatusValue = helper.getRandomInRange(15000, 16000);
        } else if (s.statusId == 2) {
            levelOneStatusValue = helper.getRandomInRange(2500, 3000);
        } else if (s.statusId == 3) {
            levelOneStatusValue = helper.getRandomInRange(2000, 2500);
        } else if (s.statusId == 4) {
            levelOneStatusValue = helper.getRandomInRange(1500, 2000);
        }

        let levelTwoAllocated = iteration == 1 ? levelOneStatusValue : parseInt((levelOneStatusValue / 2).toString());
        let levelTwoRemaining = levelTwoAllocated;
        s.value = levelOneStatusValue;

        for (var i = 0; i < iteration; i++) {
            let randomValue = 1;
            if (i == 0) {
                s.subStatuses[i].value = levelTwoAllocated;
            } else if (i > 0 && i < iteration - 1) {
                randomValue = parseInt(helper.getRandomInRange(LOOP_START, (levelTwoRemaining / 2)).toString());
                s.subStatuses[i].value = randomValue;
                levelTwoRemaining = levelTwoRemaining - randomValue;
            } else {
                s.subStatuses[i].value = levelTwoRemaining;
            }

            let internalIteration = s.subStatuses[i].subSubStatuses.length;
            let levelThreeAllocated = internalIteration == 1 ? s.subStatuses[i].value : parseInt((s.subStatuses[i].value / 2).toString());
            let levelThreeRemaining = levelThreeAllocated;

            for (var j = 0; j < internalIteration; j++) {
                if (j == 0) {
                    s.subStatuses[i].subSubStatuses[j].value = levelThreeAllocated;
                } else if (j > 0 && j < internalIteration - 1) {
                    let randomValue = parseInt(helper.getRandomInRange(LOOP_START, levelThreeRemaining / 2).toString());
                    s.subStatuses[i].subSubStatuses[j].value = randomValue;
                    levelThreeRemaining = levelThreeRemaining - randomValue;
                } else {
                    s.subStatuses[i].subSubStatuses[j].value = levelThreeRemaining;
                }
            }
        }
        database.chartStatuses.push(s);
    });

}
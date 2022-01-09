var faker = require('faker');
var helperLib = require('../helpers/helper');
var constants = require('../helpers/constants');

module.exports.createSchemaAndDataForAgingReport = function (database) {
    let helper = new helperLib();

    const STATUS_COUNTER = database.statuses.length;
    const LOOP_COUNTER_FIVE = constants.LOOP_COUNTER_FIVE;
    const LOOP_COUNTER_VENDORS = constants.LOOP_COUNTER_VENDORS;
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
    const LOOP_INDEX_ZERO = constants.LOOP_INDEX_ZERO;
    const LOOP_INDEX_FOUR = constants.LOOP_INDEX_FOUR;

    let states = database.states;
    let years = database.serviceYears;
    let importDates = database.dataImportDates;
    let services = database.services;
    let projects = database.projects;
    let medicalGroups = database.medicalGroups;
    let sites = database.sites;
    let providers = database.providers;
    let specialities = database.providerSpecialities;

    let groupedStatusId = 1, statusId = 1, vendorId = 1;
    for(var st = 0; st < STATUS_COUNTER; st++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;

        let newStatus = {
            statusId: groupedStatusId++,
            status: faker.random.words(2),
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            importDate: importDate,
            subStatuses: []
        }

        for(var sub = 0; sub <= LOOP_COUNTER_FIVE; sub++) {
            let subStatus = {
                statusId: statusId,
                groupedStatusId: newStatus.statusId, 
                subStatus: faker.random.words(3)
            };
            newStatus.subStatuses.push(subStatus);
            database.pursuitStatusesForAging.push({
                statusId: statusId++,
                groupedStatusId: groupedStatusId,
                status: faker.random.words(2),
                stateCode: stateCode,
                yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
                serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
                projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
                medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
                siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
                providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
                specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
                vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
                importDate: importDate
            });
        }
        database.pursuitGroupedStatusesForAging.push(newStatus);
    }

    for (var i = 0; i <= LOOP_COUNTER_DATES; i++) {
        let stateObj = states[i];
        let stateCode = stateObj.code;
        let state = stateObj.state;

        let importDate = importDates[i].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;

        database.dataImportDatesForAging.push({
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });

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
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        };
        database.statesForAging.push(newState);
    }

    for(var i = 0; i < years.length; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;
        let year = years[i];

        database.serviceYearsForAging.push({
            id: year.id,
            year: year.year,
            stateCode: stateCode,
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

    for(var i = 0; i < services.length; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;
        let service = services[i];

        database.servicesForAging.push({
            serviceId: service.serviceId,
            serviceName: service.serviceName,
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

    for(var i = 0; i < projects.length; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;
        let project = projects[i];

        database.projectsForAging.push({
            projectId: project.projectId,
            projectName: project.projectName,
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

    for(var i = 0; i < medicalGroups.length; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;
        let medicalGroup = medicalGroups[i];

        database.medicalGroupsForAging.push({
            medicalGroupId: medicalGroup.medicalGroupId,
            medicalGroup: medicalGroup.medicalGroup,
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

    for(var i = 0; i < sites.length; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;
        let site = sites[i];

        database.sitesForAging.push({
            siteId: site.siteId,
            siteName: site.siteName,
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

    for(var i = 0; i < providers.length; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;
        let provider = providers[i];

        database.providersForAging.push({
            providerId: provider.providerId,
            providerName: provider.providerName,
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

    for(var i = 0; i < specialities.length; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;
        let speciality = specialities[i];

        database.providerSpecialitiesForAging.push({
            specialityId: speciality.specialityId,
            speciality: speciality.speciality,
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            vendorId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_VENDORS),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

    for(var i = 0; i <= LOOP_COUNTER_VENDORS; i++) {
        let stateCode = states[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_STATES)].code;
        let importDate = importDates[helper.getRandomInRange(LOOP_START, LOOP_COUNTER_DATES)].importDate;
        let groupedStatusId = helper.getRandomInRange(LOOP_START, STATUS_COUNTER);
        let groupedStatus = database.pursuitGroupedStatusesForAging.filter(s => s.statusId == groupedStatusId)[0];
        let pursuitStatusId = groupedStatus.subStatuses[helper.getRandomInRange(LOOP_INDEX_ZERO, LOOP_INDEX_FOUR)].statusId;

        database.vendorsForAging.push({
            vendorId: vendorId++,
            vendor: faker.random.words(2).concat(' ', faker.random.word()),
            stateCode: stateCode,
            yearId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICE_YEARS),
            serviceId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SERVICES),
            projectId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROJECTS),
            medicalGroupId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_MEDICAL_GROUPS),
            siteId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SITES),
            providerId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_PROVIDERS),
            specialityId: helper.getRandomInRange(LOOP_START, LOOP_COUNTER_SPECIALITIES),
            groupedStatusId: groupedStatusId,
            pursuitStatusId: pursuitStatusId,
            importDate: importDate
        });
    }

}

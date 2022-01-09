var helperLib = require('./helpers/helper');
var constants = require('./helpers/constants');
var columns = require('./helpers/column-names');

module.exports = (req, res, next) => {
    res.header('X-Custom', 'Report');

    let db = require('./database.json');
    let helper = new helperLib();
    let results = [];
    let urlParams = [];
    let url = req.url;
    let queryStringParts = [];
    let reports = {
        "PURSUIT_REPORTS": "pursuitReports",
        "CHART_REPORTS": "chartReports",
    };

    let report = '';
    if (url.includes('?')) {
        queryStringParts = req.url.split('?');
        report = queryStringParts[0].substring(1);
        urlParams = new URLSearchParams(queryStringParts[1]);
    } else {
        report = req.url.substring(1);
    }
    
    const entries = urlParams.entries(); //returns an iterator of decoded [key,value] tuples
    let filterParams = helper.createParams(entries);

    let isCustomResponse = false;
    let records = [];
    let keys = [];
    let completed = 1;

    switch(report) {
        case reports.PURSUIT_REPORTS:
            isCustomResponse = true;
            records = helper.filterResults(db.sitePursuits, filterParams);
            keys = [columns.PURSUIT_COUNT, columns.PURSUABLE, columns.CLOSED, columns.ISSUED, columns.COMPLETED, 
                columns.COMPLETED_PERCENT, columns.AVAILABLE, columns.AVAILABLE_PERCENT];
            results = helper.getSumOfKeys(records, keys);
            completed = results[columns.COMPLETED];
            results[columns.INITIAL_TARGET] = parseInt(completed -  (completed * constants.FIVE_PERCENT));
            break;

        case reports.CHART_REPORTS:
            isCustomResponse = true;
            records = helper.filterResults(db.siteCharts, filterParams);
            keys = [columns.CHARTS_COUNT, columns.PURSUABLE, columns.CLOSED, columns.ISSUED, columns.COMPLETED, 
                columns.COMPLETED_PERCENT, columns.AVAILABLE, columns.AVAILABLE_PERCENT];
            results = helper.getSumOfKeys(records, keys);
            completed = results[columns.COMPLETED];
            results[columns.INITIAL_TARGET] = parseInt(completed -  (completed * constants.FIVE_PERCENT));
            break;
    }
    
    if (!isCustomResponse) {
        next();
    } else {
        res.send(results);
    }

}

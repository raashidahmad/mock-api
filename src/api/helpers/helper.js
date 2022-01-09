var moment = require('moment');
var constants = require('./constants');

module.exports = class Helper {

    getRandomInRange(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1) + min); //The maximum is inclusive and the minimum is inclusive
    }

    getSortOrderAsc(prop) {
        return function (a, b) {
            if (a[prop] > b[prop]) {
                return 1;
            } else if (a[prop] < b[prop]) {
                return -1;
            }
            return 0;
        }
    }

    getSortOrderDesc(prop) {
        return function (a, b) {
            if (b[prop] > a[prop]) {
                return 1;
            } else if (b[prop] < a[prop]) {
                return -1;
            }
            return 0;
        }
    }

    getDateAsWeeks(dated) {
        let weekString = '';
        let givenDate = moment(dated, "YYYY-MM-DD");
        var currentDate = moment().startOf('day');
        let weeks = Math.abs(moment.duration(givenDate.diff(currentDate)).asWeeks());
        if (weeks < 3) {
            weekString = constants.LESS_THAN_3_WEEKS;
        } else if (weeks > 3 && weeks < 10) {
            weekString = constants.THREE_TO_NINE_WEEKS;
        } else if (weeks > 9 && weeks < 16) {
            weekString = constants.TEN_TO_FIFTEEN_Weeks;
        } else if (weeks > 15 && weeks < 26) {
            weekString = constants.SIXTEEN_TO_TWENTY_FIVE_WEEKS;
        } else {
            weekString = constants.GREATER_THAN_TWENTY_FIVE_WEEKS;
        }
        return weekString;
    }

    filterResults(jsonArray, filterParams) {
        let matches = jsonArray;
        filterParams.forEach((p) => {
            const nums = p.value.map((i) => Number(i));
            matches = matches.filter((record) => nums.includes(record[p.key]));
        });
        return matches;
    }

    createParams(entries) {
        const result = [];
        for (const [key, value] of entries) {
            let findRecord = result.filter(r => r.key === key);
            if (findRecord.length == 0) {
                result.push({
                    "key": key,
                    "value": new Array(value)
                })
            } else {
                findRecord[0].value.push(value);
            }
        }
        return result;
    }

    getSumOfKeys(jsonArray, keys) {
        let result = {};
        keys.forEach(function (key) {
            if (!result[key]) {
                result[key] = 0;
            }
            jsonArray.forEach((entry) => {
                result[key] += parseInt(entry[key]);
            });
        });

        let keysWithValues = Object.keys(result);
        keysWithValues.forEach((kw) => {
            if (kw.includes(constants.PERCENT_KEYWORD)) {
                result[kw] = parseFloat(((result[kw] / (jsonArray.length * 100)) * 100).toFixed(2));
            }
        });
        return result;
    }

    /*paramsToObject(entries) {
        const result = [];
        for (const [key, value] of entries) { 
            if (!result[key]) {
                result[key] = new Array(value);
            } else {
                result[key].push(value);
            }
        }
        return result;
    }*/
}


import { Component } from '@angular/core';
import { Schema } from './schema/schema';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title: string = 'Indices 3.0 - Mock API Schema';
  schema: any = Schema.entities;

  constructor() {
    this.filterRecords();
  }

  json: any = [
      {
        "state": "LOU1",
        "siteId": 1,
        "site": "Madison Court",
        "siteName": "Madison Court (1)",
        "serviceId": 6,
        "projectId": 82,
        "medicalGroupId": 5,
        "providerId": 15,
        "specialityId": 50,
        "pursuitCount": 4721,
        "pursuable": 3634,
        "closed": 701,
        "issued": 386,
        "completed": 2253,
        "completedPercent": 62,
        "available": 1381,
        "availablePercent": 38,
        "importDate": "12/27/2021"
      },
      {
        "state": "LOU1",
        "siteId": 2,
        "site": "Spinka Burgs",
        "siteName": "Spinka Burgs (2)",
        "serviceId": 47,
        "projectId": 89,
        "medicalGroupId": 19,
        "providerId": 36,
        "specialityId": 17,
        "pursuitCount": 4591,
        "pursuable": 3286,
        "closed": 991,
        "issued": 314,
        "completed": 3055,
        "completedPercent": 93,
        "available": 231,
        "availablePercent": 7,
        "importDate": "3/28/2020"
      },
      {
        "state": "LOU1",
        "siteId": 3,
        "site": "Goodwin Parks",
        "siteName": "Goodwin Parks (3)",
        "serviceId": 37,
        "projectId": 90,
        "medicalGroupId": 16,
        "providerId": 16,
        "specialityId": 7,
        "pursuitCount": 4935,
        "pursuable": 3828,
        "closed": 609,
        "issued": 498,
        "completed": 3215,
        "completedPercent": 84,
        "available": 613,
        "availablePercent": 16,
        "importDate": "11/16/2021"
      },
      {
        "state": "LOU1",
        "siteId": 4,
        "site": "Ritchie Throughway",
        "siteName": "Ritchie Throughway (4)",
        "serviceId": 56,
        "projectId": 28,
        "medicalGroupId": 19,
        "providerId": 35,
        "specialityId": 42,
        "pursuitCount": 4530,
        "pursuable": 3335,
        "closed": 756,
        "issued": 439,
        "completed": 2567,
        "completedPercent": 77,
        "available": 768,
        "availablePercent": 23,
        "importDate": "1/5/2021"
      },
      {
        "state": "LOU1",
        "siteId": 5,
        "site": "Earline Mountain",
        "siteName": "Earline Mountain (5)",
        "serviceId": 48,
        "projectId": 65,
        "medicalGroupId": 19,
        "providerId": 6,
        "specialityId": 30,
        "pursuitCount": 4783,
        "pursuable": 3737,
        "closed": 668,
        "issued": 378,
        "completed": 2877,
        "completedPercent": 77,
        "available": 860,
        "availablePercent": 23,
        "importDate": "10/17/2021"
      },
      {
        "state": "UTA2",
        "siteId": 6,
        "site": "Broderick Land",
        "siteName": "Broderick Land (6)",
        "serviceId": 78,
        "projectId": 15,
        "medicalGroupId": 29,
        "providerId": 14,
        "specialityId": 11,
        "pursuitCount": 4994,
        "pursuable": 3493,
        "closed": 1074,
        "issued": 427,
        "completed": 3108,
        "completedPercent": 89,
        "available": 385,
        "availablePercent": 11,
        "importDate": "11/19/2020"
      },
      {
        "state": "UTA2",
        "siteId": 7,
        "site": "Ignacio Highway",
        "siteName": "Ignacio Highway (7)",
        "serviceId": 15,
        "projectId": 58,
        "medicalGroupId": 28,
        "providerId": 17,
        "specialityId": 36,
        "pursuitCount": 4734,
        "pursuable": 3046,
        "closed": 1099,
        "issued": 589,
        "completed": 1797,
        "completedPercent": 59,
        "available": 1249,
        "availablePercent": 41,
        "importDate": "12/27/2021"
      },
      {
        "state": "UTA2",
        "siteId": 8,
        "site": "Harmon Corner",
        "siteName": "Harmon Corner (8)",
        "serviceId": 52,
        "projectId": 63,
        "medicalGroupId": 12,
        "providerId": 47,
        "specialityId": 25,
        "pursuitCount": 4855,
        "pursuable": 3926,
        "closed": 642,
        "issued": 287,
        "completed": 3690,
        "completedPercent": 94,
        "available": 236,
        "availablePercent": 6,
        "importDate": "8/20/2021"
      },
      {
        "state": "UTA2",
        "siteId": 9,
        "site": "Devon Mission",
        "siteName": "Devon Mission (9)",
        "serviceId": 80,
        "projectId": 75,
        "medicalGroupId": 24,
        "providerId": 39,
        "specialityId": 28,
        "pursuitCount": 4921,
        "pursuable": 3935,
        "closed": 733,
        "issued": 253,
        "completed": 3266,
        "completedPercent": 83,
        "available": 669,
        "availablePercent": 17,
        "importDate": "8/20/2021"
      },
      {
        "state": "UTA2",
        "siteId": 10,
        "site": "Kassulke Mountains",
        "siteName": "Kassulke Mountains (10)",
        "serviceId": 67,
        "projectId": 27,
        "medicalGroupId": 30,
        "providerId": 49,
        "specialityId": 47,
        "pursuitCount": 4577,
        "pursuable": 3830,
        "closed": 387,
        "issued": 360,
        "completed": 3332,
        "completedPercent": 87,
        "available": 498,
        "availablePercent": 13,
        "importDate": "1/13/2021"
      }
  ];

  params: any = [ { key: 'siteId', value: [ 1, 2 ] }, { key: 'serviceId', value: [6] } ];

  filterRecords() : any {
    /*var matches = this.json;
    this.params.forEach((param: any) => {
      //console.log(param.value);
      matches = matches.filter((item: any) => param.value.includes(eval(item[param.key])));
  });*/
  //var matches = this.json.filter((item: any) => this.params[0].value.includes(item.siteId));
  //console.log(matches);
    /*var matches = this.json.filter((item: any) =>
    this.params.every((paramItem: any) =>
      item[paramItem.key] == paramItem.value));
    
    console.log(matches);*/

    var records = this.json;
    this.params.forEach((p: any) => {
      records = records.filter((record: any) => p.value.includes(record[p.key]));
    });

    console.log(records);
  }

}

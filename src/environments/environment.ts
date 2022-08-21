// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

//const API_BASE = "http://10.152.1.202:8080";
const API_BASE = "http://a17bd4950f19a40b18ffd9647a722e2e-1174112288.us-east-1.elb.amazonaws.com"; // lookup
const API_BASE_EA = "http://ab7c63455f57a43fabe15e7322039b62-695484959.us-east-1.elb.amazonaws.com"; // companyActivity
const API_BASE_SIR = "http://development.svc-calc-prestaciones.ecms.trabajo.gob.hn"; // saveSalaryEmployeeInfo
//const API_BASE_SIR = "http://ab7c63455f57a43fabe15e7322039b62-695484959.us-east-1.elb.amazonaws.com"; // saveSalaryEmployeeInfo

export const environment = {
  production: false,
  appVersion: 'v0.0.2',

  API: {
    LOOKUPS: `${API_BASE}/locations`,
    ECONOMIC_ACTIVITY: `${API_BASE_EA}`,
    SALARY_INFO_REQ: `${API_BASE_SIR}`
  },
  USERDATA_KEY: 'authf649fc9a5f55',
  isMockEnabled: true,
  apiUrl: 'api',
  appThemeName: 'Metronic',
  appPurchaseUrl: 'https://1.envato.market/EA4JP',
  appHTMLIntegration: 'https://preview.keenthemes.com/metronic8/stss-base-template-ui/documentation/base/helpers/flex-layouts.html',
  appPreviewUrl: 'https://preview.keenthemes.com/metronic8/angular/stss-base-template-ui/',
  appPreviewAngularUrl: 'https://preview.keenthemes.com/metronic8/angular/stss-base-template-ui',
  appPreviewDocsUrl: 'https://preview.keenthemes.com/metronic8/angular/docs',
  appPreviewChangelogUrl: 'https://preview.keenthemes.com/metronic8/angular/docs/changelog',
  appDemos: {
    'stss-base-template-ui': {
      'title': 'Demo 2',
      'description': 'SaaS Application',
      'published': true,
      'thumbnail': './assets/media/demos/stss-base-template-ui.png'
    },
  },
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

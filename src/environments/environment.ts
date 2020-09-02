// This file can be replaced during build by using the `fileReplacements` array.
// `ng build --prod` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  flaskRoot: 'http://18.212.116.201/flask',
  kibanaRoot: 'http://18.212.116.201:5602',
  reportingShortUrl: '/app/kibana#/dashboards?_g=()',
  jupyterRoot:'http://18.212.116.201/ds_notebook',
  defaultSpaceUrl:  '/app/kibana#/dashboards?_g=()',
  peteSpaceUrl: '/s/pete/app/kibana#/dashboards?_g=()',
  mlSpaceUrl:'/s/ankit/app/kibana#/dashboards?_g=()',
  // logo:'3QiLabs',
  // logo:'',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/dist/zone-error';  // Included with Angular CLI.

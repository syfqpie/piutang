// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
  appVersion: require('../../package.json').version,
  baseDomain: 'http://localhost:4200/',
  supabaseUrl: 'https://slgzkhfrhrkyxlswwpvo.supabase.co',
  supabaseKey: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNsZ3praGZyaHJreXhsc3d3cHZvIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzMxNjM3NzEsImV4cCI6MTk4ODczOTc3MX0.p24FjoUFXjfgex7oDJ5vBCoU-vu5DnDx_bSwDFVOx0c'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

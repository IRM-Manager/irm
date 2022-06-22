// This file can be replaced during build by using the `fileReplacements` array.
// `ng build` replaces `environment.ts` with `environment.prod.ts`.
// The list of file replacements can be found in `angular.json`.

export const environment = {
  production: false,
};

export const BaseUrl = {
  jwt_token: 'IRM_ACCESS',
  refresh_token: 'IRM_REFRESH',
  server: 'https://irmpaye.herokuapp.com/',
  login: 'user/api/v1/token/',
  refresh: 'user/api/v1/token/refresh/',
  list_state: 'refdata/api/v1/state/',
  get_list_lga: 'refdata/api/v1/lga/getlgbystate/?stateid=',
  list_year: 'refdata/api/v1/year/',
  get_profile: 'user/api/v1/userprofile/',
  add_ind_payer: 'user/api/v1/payer/?payer_group=individual',
  list_ind_payer: 'user/api/v1/payer/individualpayers/',
  add_com_payer: 'user/api/v1/payer/?payer_group=company',
  list_com_payer: 'user/api/v1/payer/companypayers/',
  get_payer_tin: 'user/api/v1/getpayertin/?tin=',
  delete_update_payer: 'user/api/v1/payer/', // not when deleting payer add / after the id
  list_user: 'user/api/v1/allusers/?page=',
  list_group: 'user/api/v1/allgroup/',
  list_department: 'user/api/v1/department/?page=1',
  list_location: 'user/api/v1/location/',
  edit_user: 'user/api/v1/profile/edit?id=',
  activate_deactivate: 'user/api/v1/changeuser/status/',
  change_password: 'user/api/v1/change_password/'
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

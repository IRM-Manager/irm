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
  server_image: 'https://irmpaye.herokuapp.com',
  login: 'user/api/v1/token/',
  refresh: 'user/api/v1/token/refresh/',
  list_state: 'refdata/api/v1/state/',
  get_list_lga: 'refdata/api/v1/lga/getlgbystate/?stateid=',
  list_year: 'refdata/api/v1/year/',
  get_profile: 'user/api/v1/userprofile/',
  add_ind_payer: 'user/api/v1/payer/?payer_group=individual',
  list_ind_payer: 'user/api/v1/payer/payers?payer_type=individual',
  add_com_payer: 'user/api/v1/payer/?payer_group=company',
  list_com_payer: 'user/api/v1/payer/payers?payer_type=company',
  list_all_payer: 'user/api/v1/payer/payers?payer_type=all',
  get_payer_tin: 'user/api/v1/payer/payerbytin/?tin=',
  delete_update_payer: 'user/api/v1/payer/', // not when deleting payer add / after the id
  list_user: 'user/api/v1/allusers/?page=',
  list_group: 'user/api/v1/allgroup/',
  list_department: 'user/api/v1/department/',
  list_location: 'user/api/v1/location/',
  edit_user: 'user/api/v1/profile/edit?id=',
  activate_deactivate: 'user/api/v1/changeuser/status/',
  change_password: 'user/api/v1/change_password/',
  register: 'user/api/v1/create/appuser/',
  reset_password: 'user/api/v1/resetpassword/?email=',
  get_user_department: 'user/api/v1/userbydepartment/?id=',
  get_user_location: 'user/api/v1/userbydepartment/?id=',
  // paye
  upload_payee: 'paye/api/v1/paye/upload/?',
  confirm_upload: 'paye/api/v1/paye/confirm_upload/?',
  list_registered_employees: 'paye/api/v1/paye/?',
  register_single_paye: 'paye/api/v1/paye/?',
  update_single_paye: 'paye/api/v1/paye/',
  delete_paye: 'paye/api/v1/paye/',
  create_payee_ass: 'assessment/api/v1/paye/?',
  list_payee_ass: 'assessment/api/v1/paye/?',
  verify_nin: 'user/api/v1/verify/individual/?',
  list_occupation: 'refdata/api/v1/occupation',
  list_payee: 'paye/api/v1/regpaye/',
  register_paye: 'paye/api/v1/regpaye/?',
  payee_gen_bill: 'bill/api/v1/paye/?',
  payee_delete_gen_bill: 'bill/api/v1/paye/',
  // direct
  list_direct: 'directassessment/api/v1/self/',
  generate_direct_bill: 'bill/api/v1/da/?',
  list_boj: 'directassessment/api/v1/boj/',
  delete_direct_bill: 'bill/api/v1/da/',
  // vehicle
  vehicle_upload_late: 'mla/api/v1/plateno/upload/',
  vehicle_confirm_upload: 'mla/api/v1/plateno/confirmupload/',
  vehicle_plate_type: 'mla/api/v1/plateno/getplatenobytype?type=',
  vehicle_plateno: 'mla/api/v1/plateno/',
  vehicle_create_plateno: 'mla/api/v1/plateno/?tin=',
  vehicle_plate_stat: 'mla/api/v1/plateno/getplatenostats',
  vehicle_plate_by_tin: 'mla/api/v1/plateno/getplatenobytin?tin=',
  vehicle_regtype: 'mla/api/v1/regtype/',
  list_vehicle: 'mla/api/v1/newvehicle/',
  vehicle_type: 'mla/api/v1/vehicletype',
  vehicle_gen_ass: 'assessment/api/v1/mla/',
  vehicle_gen_bill: 'bill/api/v1/vehicle/',
  vehicle_doc: 'mla/api/v1/vehicledoc/',
  vehicle_renew: 'mla/api/v1/newvehicle/renewal/',
  vehicle_view_ass: 'assessment/api/v1/mla/listassessmentbyvehicle/',
  vehicle_owner: 'mla/api/v1/vehiclechange/',
  vehicle_decide_change: 'mla/api/v1/vehiclechange/decidechange/',
  vehicle_by_plate: 'mla/api/v1/vehiclechange/getvehicleplates/',
  vehicle_owner_out: 'mla/api/v1/vehiclechange/ownershipchange/',
  vehiclenoassessment: 'assessment/api/v1/mla/listnonvehicleassessment/',
};

/*
 * For easier debugging in development mode, you can import the following file
 * to ignore zone related error stack frames such as `zone.run`, `zoneDelegate.invokeTask`.
 *
 * This import should be commented out in production mode because it will have a negative impact
 * on performance if an error is thrown.
 */
// import 'zone.js/plugins/zone-error';  // Included with Angular CLI.

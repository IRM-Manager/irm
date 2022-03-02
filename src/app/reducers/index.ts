import {ActionReducerMap, createFeatureSelector, createSelector } from '@ngrx/store';
import * as fromExample from './irm.reducers';


export interface AppState {
    example: fromExample.State;
}
  
export const reducers: ActionReducerMap<AppState, any> = {  
    example: fromExample.reducer
};
  
  // Example selectors
  export const selectExampleModule = createFeatureSelector<fromExample.State>('example');


  
  export const selectProfileState = createSelector(selectExampleModule, fromExample.selectProfileState);
//   export const selectOrderState = createSelector(selectExampleModule, fromExample.selectOrderState);
//   export const selectProductState = createSelector(selectExampleModule, fromExample.selectProductState);
//   export const selectReviewState = createSelector(selectExampleModule, fromExample.selectReviewState);
//   export const selectGalleryState = createSelector(selectExampleModule, fromExample.selectGalleryState);
//   export const selectContactState = createSelector(selectExampleModule, fromExample.selectContactState);
//   export const selectTransactionState = createSelector(selectExampleModule, fromExample.selectTransactionState);
//   export const selectNotificationState = createSelector(selectExampleModule, fromExample.selectNotificationState);
//   export const selectTaskState = createSelector(selectExampleModule, fromExample.selectTaskState);
//   export const selectAdmin_AgentState = createSelector(selectExampleModule, fromExample.selectAdmin_AgentState);
//   export const selectCouponState = createSelector(selectExampleModule, fromExample.selectCouponState);
//   export const selectSpecial_OrderState = createSelector(selectExampleModule, fromExample.selectSpecial_OrderState);
//   export const selectUserState = createSelector(selectExampleModule, fromExample.selectUserState);
  


  export const selectAllProfile = createSelector(selectProfileState, fromExample.selectAllProfile);
//   export const selectAllOrder = createSelector(selectOrderState, fromExample.selectAllOrder);
//   export const selectAllProduct = createSelector(selectProductState, fromExample.selectAllProduct);
//   export const selectAllReview = createSelector(selectReviewState, fromExample.selectAllReview);
//   export const selectAllGallery = createSelector(selectGalleryState, fromExample.selectAllGallery);
//   export const selectAllContact = createSelector(selectContactState, fromExample.selectAllContact);
//   export const selectAllNotification = createSelector(selectNotificationState, fromExample.selectAllNotification);
//   export const selectAllTransaction = createSelector(selectTransactionState, fromExample.selectAllTransaction);
//   export const selectAllTask = createSelector(selectTaskState, fromExample.selectAllTask);
//   export const selectAllAdmin_Agent = createSelector(selectAdmin_AgentState, fromExample.selectAllAdmin_Agent);
//   export const selectAllUser = createSelector(selectUserState, fromExample.selectAllUser);
//   export const selectAllCoupon = createSelector(selectCouponState, fromExample.selectAllCoupon);
//   export const selectAllSpecial_Order = createSelector(selectSpecial_OrderState, fromExample.selectAllSpecial_Order);

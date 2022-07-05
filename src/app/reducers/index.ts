import {
  ActionReducerMap,
  createFeatureSelector,
  createSelector,
} from '@ngrx/store';
import * as fromExample from './irm.reducers';

export interface AppState {
  example: fromExample.State;
}

export const reducers: ActionReducerMap<AppState, any> = {
  example: fromExample.reducer,
};

// Example selectors
export const selectExampleModule =
  createFeatureSelector<fromExample.State>('example');

export const selectProfileState = createSelector(
  selectExampleModule,
  fromExample.selectProfileState
);
export const selectStatesState = createSelector(
  selectExampleModule,
  fromExample.selectStatesState
);
export const selectYearState = createSelector(
  selectExampleModule,
  fromExample.selectYearState
);
export const selectIndPayerState = createSelector(
  selectExampleModule,
  fromExample.selectIndPayerState
);
export const selectComPayerState = createSelector(
  selectExampleModule,
  fromExample.selectComPayerState
);
export const selectPayeeState = createSelector(
  selectExampleModule,
  fromExample.selectPayeeState
);
export const selectUserState = createSelector(
  selectExampleModule,
  fromExample.selectUserState
);
export const selectGroupState = createSelector(
  selectExampleModule,
  fromExample.selectGroupState
);
export const selectDepartmentState = createSelector(
  selectExampleModule,
  fromExample.selectDepartmentState
);
export const selectLocationState = createSelector(
  selectExampleModule,
  fromExample.selectLocationState
);
export const selectOccupationState = createSelector(
  selectExampleModule,
  fromExample.selectOccupationState
);
//   export const selectSpecial_OrderState = createSelector(selectExampleModule, fromExample.selectSpecial_OrderState);
//   export const selectUserState = createSelector(selectExampleModule, fromExample.selectUserState);

export const selectAllProfile = createSelector(
  selectProfileState,
  fromExample.selectAllProfile
);
export const selectAllStates = createSelector(
  selectStatesState,
  fromExample.selectAllStates
);
export const selectAllYear = createSelector(
  selectYearState,
  fromExample.selectAllYear
);
export const selectAllIndPayer = createSelector(
  selectIndPayerState,
  fromExample.selectAllIndPayer
);
export const selectAllComPayer = createSelector(
  selectComPayerState,
  fromExample.selectAllComPayer
);
export const selectAllPayee = createSelector(
  selectPayeeState,
  fromExample.selectAllPayee
);
// export const selectAllNotification = createSelector(
//   selectUserState,
//   fromExample.selectAllUser
// );
export const selectAllGroup = createSelector(
  selectGroupState,
  fromExample.selectAllGroup
);
export const selectAllDepartment = createSelector(
  selectDepartmentState,
  fromExample.selectAllDepartment
);
export const selectAllOccupation = createSelector(
  selectOccupationState,
  fromExample.selectAllOccupation
);
export const selectAllUser = createSelector(
  selectUserState,
  fromExample.selectAllUser
);
export const selectAllLocation = createSelector(
  selectLocationState,
  fromExample.selectAllLocation
);
//   export const selectAllSpecial_Order = createSelector(selectSpecial_OrderState, fromExample.selectAllSpecial_Order);

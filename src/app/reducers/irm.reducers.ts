import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as KonpayActions from '../actions/irm.action';
import { Actions } from '../actions/irm.action';
import {
  ComPayer,
  IndPayer,
  Payee,
  Profile,
  States,
  Year,
  User,
  Group,
  Department,
  Locationn,
  Occupation,
  Vehicleitems,
} from '../dashboard/models/irm';

interface ProfileState extends EntityState<Profile> {
  total: number;
}

interface StatesState extends EntityState<States> {
  total: number;
}

interface YearState extends EntityState<Year> {
  total: number;
}

interface IndPayerState extends EntityState<IndPayer> {
  total: number;
}

interface ComPayerState extends EntityState<ComPayer> {
  total: number;
}

interface PayeeState extends EntityState<Payee> {
  total: number;
}

interface UserState extends EntityState<User> {
  total: number;
}

interface GroupState extends EntityState<Group> {
  total: number;
}

interface DepartmentState extends EntityState<Department> {
  total: number;
}

interface LocationState extends EntityState<Locationn> {
  total: number;
}

interface OccupationState extends EntityState<Occupation> {
  total: number;
}

interface VehicleitemsState extends EntityState<Vehicleitems> {
  total: number;
}

// interface Special_OrderState extends EntityState<Special_Order> {
//   total: number;
// }

export interface State {
  profile: ProfileState;
  states: StatesState;
  year: YearState;
  indpayer: IndPayerState;
  compayer: ComPayerState;
  payee: PayeeState;
  group: GroupState;
  department: DepartmentState;
  location: LocationState;
  occupation: OccupationState;
  user: UserState;
  vehicleitems: VehicleitemsState;
  // special_order: Special_OrderState;
}

const adapterProfile = createEntityAdapter<Profile>();
const adapterStates = createEntityAdapter<States>();
const adapterYear = createEntityAdapter<Year>();
const adapterIndPayer = createEntityAdapter<IndPayer>();
const adapterComPayer = createEntityAdapter<ComPayer>();
const adapterPayee = createEntityAdapter<Payee>();
const adapterGroup = createEntityAdapter<Group>();
const adapterDepartment = createEntityAdapter<Department>();
const adapterLocation = createEntityAdapter<Locationn>();
const adapterOccupation = createEntityAdapter<Occupation>();
const adapterUser = createEntityAdapter<User>();
const adapterVehicleitems = createEntityAdapter<Vehicleitems>();
// const adapterSpecial_Order = createEntityAdapter<Special_Order>();

const ProfileInitialState: ProfileState = adapterProfile.getInitialState({
  total: 0,
});
const StatesInitialState: StatesState = adapterStates.getInitialState({
  total: 0,
});
const YearInitialState: YearState = adapterYear.getInitialState({ total: 0 });
const IndPayerInitialState: IndPayerState = adapterIndPayer.getInitialState({
  total: 0,
});
const ComPayerInitialState: ComPayerState = adapterComPayer.getInitialState({
  total: 0,
});
const PayeeInitialState: PayeeState = adapterPayee.getInitialState({
  total: 0,
});
const GroupInitialState: GroupState = adapterGroup.getInitialState({
  total: 0,
});
const DepartmentInitialState: DepartmentState =
  adapterDepartment.getInitialState({ total: 0 });
const LocationInitialState: LocationState = adapterLocation.getInitialState({
  total: 0,
});
const OccupationInitialState: OccupationState =
  adapterOccupation.getInitialState({ total: 0 });
const UserInitialState: UserState = adapterUser.getInitialState({ total: 0 });
const VehicleitemsInitialState: VehicleitemsState =
  adapterVehicleitems.getInitialState({
    total: 0,
  });
// const Special_OrderInitialState: Special_OrderState = adapterSpecial_Order.getInitialState({ total: 0 });

const initialState = {
  profile: ProfileInitialState,
  states: StatesInitialState,
  year: YearInitialState,
  indpayer: IndPayerInitialState,
  compayer: ComPayerInitialState,
  payee: PayeeInitialState,
  group: GroupInitialState,
  department: DepartmentInitialState,
  location: LocationInitialState,
  occupation: OccupationInitialState,
  user: UserInitialState,
  vehicleitems: VehicleitemsInitialState,
  // special_order: Special_OrderInitialState,
};

export function reducer(state: State = initialState, action: Actions): State {
  switch (action.type) {
    // Profile
    case KonpayActions.ExampleActionTypes.GetProfile:
      return {
        ...state,
        profile: adapterProfile.addMany(action.Profilepayload, state.profile),
      };

    case KonpayActions.ExampleActionTypes2.GetProfile:
      return { ...state, profile: adapterProfile.removeOne(1, state.profile) };

    // Order
    case KonpayActions.ExampleActionTypes.GetStates:
      return {
        ...state,
        states: adapterStates.addMany(action.Statespayload, state.states),
      };

    case KonpayActions.ExampleActionTypes2.GetStates:
      return { ...state, states: adapterStates.removeOne(1, state.states) };

    // Year
    case KonpayActions.ExampleActionTypes.GetYear:
      return {
        ...state,
        year: adapterYear.addMany(action.Yearpayload, state.year),
      };

    case KonpayActions.ExampleActionTypes2.GetYear:
      return { ...state, year: adapterYear.removeOne(1, state.year) };

    // IndPayer
    case KonpayActions.ExampleActionTypes.GetIndPayer:
      return {
        ...state,
        indpayer: adapterIndPayer.addMany(
          action.IndPayerpayload,
          state.indpayer
        ),
      };

    case KonpayActions.ExampleActionTypes2.GetIndPayer:
      return {
        ...state,
        indpayer: adapterIndPayer.removeOne(1, state.indpayer),
      };

    // ComPayer
    case KonpayActions.ExampleActionTypes.GetComPayer:
      return {
        ...state,
        compayer: adapterComPayer.addMany(
          action.ComPayerpayload,
          state.compayer
        ),
      };

    case KonpayActions.ExampleActionTypes2.GetComPayer:
      return {
        ...state,
        compayer: adapterComPayer.removeOne(1, state.compayer),
      };

    // Payee
    case KonpayActions.ExampleActionTypes.GetPayee:
      return {
        ...state,
        payee: adapterPayee.addMany(action.Payeepayload, state.payee),
      };

    case KonpayActions.ExampleActionTypes2.GetPayee:
      return { ...state, payee: adapterPayee.removeOne(1, state.payee) };

    // Group
    case KonpayActions.ExampleActionTypes.GetGroup:
      return {
        ...state,
        group: adapterGroup.addMany(action.Grouppayload, state.group),
      };

    case KonpayActions.ExampleActionTypes2.GetGroup:
      return { ...state, group: adapterGroup.removeOne(1, state.group) };

    // Department
    case KonpayActions.ExampleActionTypes.GetDepartment:
      return {
        ...state,
        department: adapterDepartment.addMany(
          action.Departmentpayload,
          state.department
        ),
      };

    case KonpayActions.ExampleActionTypes2.GetDepartment:
      return {
        ...state,
        department: adapterDepartment.removeOne(1, state.department),
      };

    // Location
    case KonpayActions.ExampleActionTypes.GetLocation:
      return {
        ...state,
        location: adapterLocation.addMany(
          action.Locationpayload,
          state.location
        ),
      };

    case KonpayActions.ExampleActionTypes2.GetLocation:
      return {
        ...state,
        location: adapterLocation.removeOne(1, state.location),
      };

    // Admin_Agent
    case KonpayActions.ExampleActionTypes.GetOccupation:
      return {
        ...state,
        occupation: adapterOccupation.addMany(
          action.Occupationpayload,
          state.occupation
        ),
      };

    case KonpayActions.ExampleActionTypes2.GetOccupation:
      return {
        ...state,
        occupation: adapterOccupation.removeOne(1, state.occupation),
      };

    //  User
    case KonpayActions.ExampleActionTypes.GetUser:
      return {
        ...state,
        user: adapterUser.addMany(action.Userpayload, state.user),
      };

    case KonpayActions.ExampleActionTypes2.GetUser:
      return { ...state, user: adapterUser.removeOne(1, state.user) };

    //  Vehicleitems
    case KonpayActions.ExampleActionTypes.GetVehicleitems:
      return {
        ...state,
        vehicleitems: adapterVehicleitems.addMany(
          action.Vehicleitemspayload,
          state.vehicleitems
        ),
      };

    case KonpayActions.ExampleActionTypes2.GetVehicleitems:
      return {
        ...state,
        vehicleitems: adapterVehicleitems.removeOne(1, state.vehicleitems),
      };

    // //  Special_Order
    // case KonpayActions.ExampleActionTypes.GetSpecial_Order:
    //     return { ...state, special_order: adapterSpecial_Order.addMany(action.Special_Orderpayload, state.special_order) };

    //     case KonpayActions.ExampleActionTypes2.GetSpecial_Order:
    //         return { ...state, special_order: adapterSpecial_Order.removeOne(1, state.special_order) };

    default:
      return state;
  }
}

export const selectProfileState = (state: State) => state.profile;
export const selectStatesState = (state: State) => state.states;
export const selectYearState = (state: State) => state.year;
export const selectIndPayerState = (state: State) => state.indpayer;
export const selectComPayerState = (state: State) => state.compayer;
export const selectPayeeState = (state: State) => state.payee;
export const selectGroupState = (state: State) => state.group;
export const selectDepartmentState = (state: State) => state.department;
export const selectLocationState = (state: State) => state.location;
export const selectOccupationState = (state: State) => state.occupation;
export const selectUserState = (state: State) => state.user;
export const selectVehicleitemsState = (state: State) => state.vehicleitems;
// export const selectSpecial_OrderState = (state: State) => state.special_order;

export const { selectAll: selectAllProfile } = adapterProfile.getSelectors();
export const { selectAll: selectAllStates } = adapterStates.getSelectors();
export const { selectAll: selectAllYear } = adapterYear.getSelectors();
export const { selectAll: selectAllIndPayer } = adapterIndPayer.getSelectors();
export const { selectAll: selectAllComPayer } = adapterComPayer.getSelectors();
export const { selectAll: selectAllPayee } = adapterPayee.getSelectors();
export const { selectAll: selectAllGroup } = adapterGroup.getSelectors();
export const { selectAll: selectAllDepartment } =
  adapterDepartment.getSelectors();
export const { selectAll: selectAllLocation } = adapterLocation.getSelectors();
export const { selectAll: selectAllOccupation } =
  adapterOccupation.getSelectors();
export const { selectAll: selectAllUser } = adapterUser.getSelectors();
export const { selectAll: selectAllVehicleitems } =
  adapterVehicleitems.getSelectors();
// export const { selectAll: selectAllSpecial_Order } = adapterSpecial_Order.getSelectors();

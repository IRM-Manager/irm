import { createEntityAdapter, EntityState } from '@ngrx/entity';
import * as KonpayActions from '../actions/irm.action';
import { Actions } from '../actions/irm.action';
import {
  ComPayer, IndPayer, Payee, Profile,
  States, Year, User
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

// interface TransactionState extends EntityState<Transaction> {
//   total: number;
// }

// interface NotificationState extends EntityState<Notification> {
//   total: number;
// }

// interface TaskState extends EntityState<Task> {
//   total: number;
// }

// interface Admin_AgentState extends EntityState<Admin_Agent> {
//   total: number;
// }

// interface CouponState extends EntityState<Coupon> {
//   total: number;
// }

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
  // transaction: TransactionState;
  // notification: NotificationState;
  // task: TaskState;
  // admin_agent: Admin_AgentState;
  user: UserState;
  // coupon: CouponState;
  // special_order: Special_OrderState;
}

const adapterProfile = createEntityAdapter<Profile>();
const adapterStates = createEntityAdapter<States>();
const adapterYear = createEntityAdapter<Year>();
const adapterIndPayer = createEntityAdapter<IndPayer>();
const adapterComPayer = createEntityAdapter<ComPayer>();
const adapterPayee = createEntityAdapter<Payee>();
// const adapterTransaction = createEntityAdapter<Transaction>();
// const adapterNotification = createEntityAdapter<Notification>();
// const adapterTask = createEntityAdapter<Task>();
// const adapterAdmin_Agent = createEntityAdapter<Admin_Agent>();
const adapterUser = createEntityAdapter<User>();
// const adapterCoupon = createEntityAdapter<Coupon>();
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
// const TransactionInitialState: TransactionState = adapterTransaction.getInitialState({ total: 0 });
// const NotificationInitialState: NotificationState = adapterNotification.getInitialState({ total: 0 });
// const TaskInitialState: TaskState = adapterTask.getInitialState({ total: 0 });
// const Admin_AgentInitialState: Admin_AgentState = adapterAdmin_Agent.getInitialState({ total: 0 });
const UserInitialState: UserState = adapterUser.getInitialState({ total: 0 });
// const CouponInitialState: CouponState = adapterCoupon.getInitialState({ total: 0 });
// const Special_OrderInitialState: Special_OrderState = adapterSpecial_Order.getInitialState({ total: 0 });

const initialState = {
  profile: ProfileInitialState,
  states: StatesInitialState,
  year: YearInitialState,
  indpayer: IndPayerInitialState,
  compayer: ComPayerInitialState,
  payee: PayeeInitialState,
  // transaction: TransactionInitialState,
  // notification: NotificationInitialState,
  // task: TaskInitialState,
  // admin_agent: Admin_AgentInitialState,
  user: UserInitialState,
  // coupon: CouponInitialState,
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

    //  // Transaction
    //  case KonpayActions.ExampleActionTypes.GetTransaction:
    //  return { ...state, transaction: adapterTransaction.addMany(action.Transactionpayload, state.transaction) };

    //  case KonpayActions.ExampleActionTypes2.GetTransaction:
    //  return { ...state, transaction: adapterTransaction.removeOne(1, state.transaction) };

    //  // Notification
    //  case KonpayActions.ExampleActionTypes.GetNotification:
    //  return { ...state, notification: adapterNotification.addMany(action.Notificationpayload, state.notification) };

    //  case KonpayActions.ExampleActionTypes2.GetNotification:
    //  return { ...state, notification: adapterNotification.removeOne(1, state.notification) };

    //  // Task
    //  case KonpayActions.ExampleActionTypes.GetTask:
    //  return { ...state, task: adapterTask.addMany(action.Taskpayload, state.task) };

    //  case KonpayActions.ExampleActionTypes2.GetTask:
    //  return { ...state, task: adapterTask.removeOne(1, state.task) };

    //  // Admin_Agent
    //  case KonpayActions.ExampleActionTypes.GetAdmin_Agent:
    //  return { ...state, admin_agent: adapterAdmin_Agent.addMany(action.Admin_Agentpayload, state.admin_agent) };

    //  case KonpayActions.ExampleActionTypes2.GetAdmin_Agent:
    //  return { ...state, admin_agent: adapterAdmin_Agent.removeOne(1, state.admin_agent) };

    //  User
     case KonpayActions.ExampleActionTypes.GetUser:
    return { ...state, user: adapterUser.addMany(action.Userpayload, state.user) };

    case KonpayActions.ExampleActionTypes2.GetUser:
        return { ...state, user: adapterUser.removeOne(1, state.user) };

    // //  Coupon
    // case KonpayActions.ExampleActionTypes.GetCoupon:
    //     return { ...state, coupon: adapterCoupon.addMany(action.Couponpayload, state.coupon) };

    //     case KonpayActions.ExampleActionTypes2.GetCoupon:
    //         return { ...state, coupon: adapterCoupon.removeOne(1, state.coupon) };

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
// export const selectTransactionState = (state: State) => state.transaction;
// export const selectNotificationState = (state: State) => state.notification;
// export const selectTaskState = (state: State) => state.task;
// export const selectAdmin_AgentState = (state: State) => state.admin_agent;
export const selectUserState = (state: State) => state.user;
// export const selectCouponState = (state: State) => state.coupon;
// export const selectSpecial_OrderState = (state: State) => state.special_order;

export const { selectAll: selectAllProfile } = adapterProfile.getSelectors();
export const { selectAll: selectAllStates } = adapterStates.getSelectors();
export const { selectAll: selectAllYear } = adapterYear.getSelectors();
export const { selectAll: selectAllIndPayer } = adapterIndPayer.getSelectors();
export const { selectAll: selectAllComPayer } = adapterComPayer.getSelectors();
export const { selectAll: selectAllPayee } = adapterPayee.getSelectors();
// export const { selectAll: selectAllNotification } = adapterNotification.getSelectors();
// export const { selectAll: selectAllTransaction } = adapterTransaction.getSelectors();
// export const { selectAll: selectAllTask } = adapterTask.getSelectors();
// export const { selectAll: selectAllAdmin_Agent } = adapterAdmin_Agent.getSelectors();
export const { selectAll: selectAllUser } = adapterUser.getSelectors();
// export const { selectAll: selectAllCoupon } = adapterCoupon.getSelectors();
// export const { selectAll: selectAllSpecial_Order } = adapterSpecial_Order.getSelectors();

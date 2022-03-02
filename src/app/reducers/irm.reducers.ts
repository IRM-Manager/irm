import { Action, createFeatureSelector, createSelector } from '@ngrx/store';
import { Profile, 
  // Order, Product, Review, Gallery, Contact, Notification, Transaction, 
  //   Task, Admin_Agent, User, Special_Order, Coupon 
  } from '../models/irm';
import * as KonpayActions from '../actions/irm.action';
import { createEntityAdapter, EntityState } from '@ngrx/entity';
import { Actions } from '../actions/irm.action';




interface ProfileState extends EntityState<Profile> {
    total: number;
  }


  // interface OrderState extends EntityState<Order> {
  //   total: number;
  // }


  // interface ProductState extends EntityState<Product> {
  //   total: number;
  // }


  // interface ReviewState extends EntityState<Review> {
  //   total: number;
  // }


  // interface GalleryState extends EntityState<Gallery> {
  //   total: number;
  // }


  // interface ContactState extends EntityState<Contact> {
  //   total: number;
  // }


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


  // interface UserState extends EntityState<User> {
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
    // order: OrderState;
    // product: ProductState;
    // review: ReviewState;
    // gallery: GalleryState;
    // contact: ContactState;
    // transaction: TransactionState;
    // notification: NotificationState;
    // task: TaskState;
    // admin_agent: Admin_AgentState;
    // user: UserState;
    // coupon: CouponState;
    // special_order: Special_OrderState;
  }


  const adapterProfile = createEntityAdapter<Profile>();
  // const adapterOrder = createEntityAdapter<Order>();
  // const adapterProduct = createEntityAdapter<Product>();
  // const adapterReview = createEntityAdapter<Review>();
  // const adapterGallery = createEntityAdapter<Gallery>();
  // const adapterContact = createEntityAdapter<Contact>();
  // const adapterTransaction = createEntityAdapter<Transaction>();
  // const adapterNotification = createEntityAdapter<Notification>();
  // const adapterTask = createEntityAdapter<Task>();
  // const adapterAdmin_Agent = createEntityAdapter<Admin_Agent>();
  // const adapterUser = createEntityAdapter<User>();
  // const adapterCoupon = createEntityAdapter<Coupon>();
  // const adapterSpecial_Order = createEntityAdapter<Special_Order>();
  
  const ProfileInitialState: ProfileState = adapterProfile.getInitialState({ total: 0 });
  // const OrderInitialState: OrderState = adapterOrder.getInitialState({ total: 0 });
  // const ProductInitialState: ProductState = adapterProduct.getInitialState({ total: 0 });
  // const ReviewInitialState: ReviewState = adapterReview.getInitialState({ total: 0 });
  // const GalleryInitialState: GalleryState = adapterGallery.getInitialState({ total: 0 });
  // const ContactInitialState: ContactState = adapterContact.getInitialState({ total: 0 });
  // const TransactionInitialState: TransactionState = adapterTransaction.getInitialState({ total: 0 });
  // const NotificationInitialState: NotificationState = adapterNotification.getInitialState({ total: 0 });
  // const TaskInitialState: TaskState = adapterTask.getInitialState({ total: 0 });
  // const Admin_AgentInitialState: Admin_AgentState = adapterAdmin_Agent.getInitialState({ total: 0 });
  // const UserInitialState: UserState = adapterUser.getInitialState({ total: 0 });
  // const CouponInitialState: CouponState = adapterCoupon.getInitialState({ total: 0 });
  // const Special_OrderInitialState: Special_OrderState = adapterSpecial_Order.getInitialState({ total: 0 });


  const initialState = {
    profile: ProfileInitialState,
    // order: OrderInitialState,
    // product: ProductInitialState,
    // review: ReviewInitialState,
    // gallery: GalleryInitialState,
    // contact: ContactInitialState,
    // transaction: TransactionInitialState,
    // notification: NotificationInitialState,
    // task: TaskInitialState,
    // admin_agent: Admin_AgentInitialState,
    // user: UserInitialState,
    // coupon: CouponInitialState,
    // special_order: Special_OrderInitialState,
  }




  export function reducer(state: State = initialState, action: Actions): State {
    
    switch (action.type) {
      
        // Profile
      case KonpayActions.ExampleActionTypes.GetProfile:
        return { ...state, profile: adapterProfile.addMany(action.Profilepayload, state.profile) };
      
      case KonpayActions.ExampleActionTypes2.GetProfile: 
        return { ...state, profile: adapterProfile.removeOne(1, state.profile) };

        // // Order
        // case KonpayActions.ExampleActionTypes.GetOrder: 
        // return { ...state, order: adapterOrder.addMany(action.Orderpayload, state.order) };


        // case KonpayActions.ExampleActionTypes2.GetOrder: 
        // return { ...state, order: adapterOrder.removeOne(1, state.order) };



        // // Product
        // case KonpayActions.ExampleActionTypes.GetProduct: 
        // return { ...state, product: adapterProduct.addMany(action.Productpayload, state.product) };


        // case KonpayActions.ExampleActionTypes2.GetProduct: 
        // return { ...state, product: adapterProduct.removeOne(1, state.product) };


        // // Review
        // case KonpayActions.ExampleActionTypes.GetReview: 
        // return { ...state, review: adapterReview.addMany(action.Reviewpayload, state.review) };


        // case KonpayActions.ExampleActionTypes2.GetReview: 
        // return { ...state, review: adapterReview.removeOne(1, state.review) };



        // // Gallery
        // case KonpayActions.ExampleActionTypes.GetGallery: 
        // return { ...state, gallery: adapterGallery.addMany(action.Gallerypayload, state.gallery) };


        // case KonpayActions.ExampleActionTypes2.GetGallery: 
        // return { ...state, gallery: adapterGallery.removeOne(1, state.gallery) };


        //  // Compare
        //  case KonpayActions.ExampleActionTypes.GetContact: 
        //  return { ...state, contact: adapterContact.addMany(action.Contactpayload, state.contact) };
 
 
        //  case KonpayActions.ExampleActionTypes2.GetContact: 
        //  return { ...state, contact: adapterContact.removeOne(1, state.contact) };



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



        // //  User
        //  case KonpayActions.ExampleActionTypes.GetUser:
        // return { ...state, user: adapterUser.addMany(action.Userpayload, state.user) };
      
        // case KonpayActions.ExampleActionTypes2.GetUser: 
        //     return { ...state, user: adapterUser.removeOne(1, state.user) };


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
// export const selectOrderState = (state: State) => state.order;
// export const selectProductState = (state: State) => state.product;
// export const selectReviewState = (state: State) => state.review;
// export const selectGalleryState = (state: State) => state.gallery;
// export const selectContactState = (state: State) => state.contact;
// export const selectTransactionState = (state: State) => state.transaction;
// export const selectNotificationState = (state: State) => state.notification;
// export const selectTaskState = (state: State) => state.task;
// export const selectAdmin_AgentState = (state: State) => state.admin_agent;
// export const selectUserState = (state: State) => state.user;
// export const selectCouponState = (state: State) => state.coupon;
// export const selectSpecial_OrderState = (state: State) => state.special_order;




export const { selectAll: selectAllProfile } = adapterProfile.getSelectors();
// export const { selectAll: selectAllOrder } = adapterOrder.getSelectors();
// export const { selectAll: selectAllProduct } = adapterProduct.getSelectors();
// export const { selectAll: selectAllReview } = adapterReview.getSelectors();
// export const { selectAll: selectAllGallery } = adapterGallery.getSelectors();
// export const { selectAll: selectAllContact } = adapterContact.getSelectors();
// export const { selectAll: selectAllNotification } = adapterNotification.getSelectors();
// export const { selectAll: selectAllTransaction } = adapterTransaction.getSelectors();
// export const { selectAll: selectAllTask } = adapterTask.getSelectors();
// export const { selectAll: selectAllAdmin_Agent } = adapterAdmin_Agent.getSelectors();
// export const { selectAll: selectAllUser } = adapterUser.getSelectors();
// export const { selectAll: selectAllCoupon } = adapterCoupon.getSelectors();
// export const { selectAll: selectAllSpecial_Order } = adapterSpecial_Order.getSelectors();



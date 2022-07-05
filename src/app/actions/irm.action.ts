import { Action } from '@ngrx/store';
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
  Occupation
} from '../dashboard/models/irm';

export enum ExampleActionTypes {
  GetProfile = '[Profile API] Get Profile',
  GetStates = '[States API] Get States',
  GetYear = '[Year API] Get Year',
  GetIndPayer = '[Review API] Get IndPayer',
  GetComPayer = '[Gallery API] Get ComPayer',
  GetPayee = '[Payee API] Get Payee',
  GetUser = '[User API] Get User',
  GetGroup = '[Group API] Get Group',
  GetDepartment = '[Department API] Get Department',
  GetLocation = '[Location API] Get Location',
  GetOccupation = '[Occupation API] Get Occupation',
  // GetCoupon = '[Coupon API] Get Coupon',
  // GetSpecial_Order = '[Special_Order API] Get Special_Order',
}

export enum ExampleActionTypes2 {
  GetProfile = '[Profile API] Remove Profile',
  GetStates = '[States API] Remove States',
  GetYear = '[Year API] Remove Year',
  GetIndPayer = '[Review API] Remove GetIndPayer',
  GetComPayer = '[Gallery API] Remove ComPayer',
  GetPayee = '[Payee API] Remove Payee',
  GetUser = '[User API] Remove User',
  GetGroup = '[Group API] Remove Group',
  GetDepartment = '[Department API] Remove Department',
  GetLocation = '[Location API] Remove Location',
  GetOccupation = '[Occupation API] Remove Occupation',
  // GetCoupon = '[Coupon API] Remove Coupon',
  // GetSpecial_Order = '[Special_Order API] Remove Special_Order',
}

// Profile

// Section 2
export const ADD_PROFILE = '[PROFILE] Add';
export const REMOVE_PROFILE = '[PROFILE] Remove';

// Section 3
export class AddProfile implements Action {
  public readonly type = ExampleActionTypes.GetProfile;

  constructor(public Profilepayload: Profile[]) {}
}

export class RemoveProfile implements Action {
  public readonly type = ExampleActionTypes2.GetProfile;

  constructor(public Profilepayload: any) {}
}

// Order

// Section 2
export const ADD_STATES = '[STATE] Add';
export const REMOVE_STATES = '[STATE] Remove';

// Section 3
export class AddStates implements Action {
  public readonly type = ExampleActionTypes.GetStates;

  constructor(public Statespayload: States[]) {}
}

export class RemoveStates implements Action {
  public readonly type = ExampleActionTypes2.GetStates;

  constructor(public Statespayload: any) {}
}

// Year

// Section 2
export const ADD_YEAR = '[YEAR] Add';
export const REMOVE_YEAR = '[YEAR] Remove';

// Section 3
export class AddYear implements Action {
  public readonly type = ExampleActionTypes.GetYear;

  constructor(public Yearpayload: Year[]) {}
}

export class RemoveYear implements Action {
  public readonly type = ExampleActionTypes2.GetYear;

  constructor(public Yearpayload: any) {}
}

// IndPayer

// Section 2
export const ADD_INDPAYER = '[INDPAYER] Add';
export const REMOVE_INDPAYER = '[INDPAYER] Remove';

// Section 3
export class AddIndPayer implements Action {
  public readonly type = ExampleActionTypes.GetIndPayer;

  constructor(public IndPayerpayload: IndPayer[]) {}
}

export class RemoveIndPayer implements Action {
  public readonly type = ExampleActionTypes2.GetIndPayer;

  constructor(public IndPayerpayload: any) {}
}

// Gallery

// Section 2
export const ADD_COMPAYER = '[COMPAYER] Add';
export const REMOVE_COMPAYER = '[COMPAYER] Remove';

// Section 3
export class AddComPayer implements Action {
  public readonly type = ExampleActionTypes.GetComPayer;

  constructor(public ComPayerpayload: ComPayer[]) {}
}

export class RemoveComPayer implements Action {
  public readonly type = ExampleActionTypes2.GetComPayer;

  constructor(public ComPayerpayload: any) {}
}

// Contact

// Section 2
export const ADD_PAYEE = '[PAYEE] Add';
export const REMOVE_PAYEE = '[PAYEE] Remove';

// Section 3
export class AddPayee implements Action {
  public readonly type = ExampleActionTypes.GetPayee;

  constructor(public Payeepayload: Payee[]) {}
}

export class RemovePayee implements Action {
  public readonly type = ExampleActionTypes2.GetPayee;

  constructor(public Payeepayload: any) {}
}

// Users

// Section 2
export const ADD_USER = '[USER] Add';
export const REMOVE_USER = '[USER] Remove';

// Section 3
export class AddUser implements Action {
  public readonly type = ExampleActionTypes.GetUser;

  constructor(public Userpayload: User[]) {}
}

export class RemoveUser implements Action {
  public readonly type = ExampleActionTypes2.GetUser;

  constructor(public Userpayload: any) {}
}

// Group

// Section 2
export const ADD_GROUP  = '[GROUP] Add'
export const REMOVE_GROUP   = '[GROUP] Remove'

// Section 3
export class AddGroup implements Action {
    public readonly type = ExampleActionTypes.GetGroup

    constructor(public Grouppayload: Group[]) {}

}

export class RemoveGroup implements Action {
    public readonly type = ExampleActionTypes2.GetGroup

    constructor(public Grouppayload: any) {}
}

// Department

// Section 2
export const ADD_DEPARTMENT  = '[DEPARTMENT] Add'
export const REMOVE_DEPARTMENT   = '[DEPARTMENT] Remove'

// Section 3
export class AddDepartment implements Action {
    public readonly type = ExampleActionTypes.GetDepartment

    constructor(public Departmentpayload: Department[]) {}

}

export class RemoveDepartment implements Action {
    public readonly type = ExampleActionTypes2.GetDepartment

    constructor(public Departmentpayload: any) {}
}

// Location

// Section 2
export const ADD_LOCATION  = '[LOCATION] Add'
export const REMOVE_LOCATION   = '[LOCATION] Remove'

// Section 3
export class AddLocation implements Action {
    public readonly type = ExampleActionTypes.GetLocation

    constructor(public Locationpayload: Locationn[]) {}

}

export class RemoveLocation implements Action {
    public readonly type = ExampleActionTypes2.GetLocation

    constructor(public Locationpayload: any) {}
}

// Occupation

// Section 2
export const ADD_OCCUPATION  = '[OCCUPATION] Add'
export const REMOVE_OCCUPATION   = '[OCCUPATION] Remove'

// Section 3
export class AddOccupation implements Action {
    public readonly type = ExampleActionTypes.GetOccupation

    constructor(public Occupationpayload: Occupation[]) {}

}

export class RemoveOccupation implements Action {
    public readonly type = ExampleActionTypes2.GetOccupation

    constructor(public Occupationpayload: any) {}
}

// // Coupon

// // Section 2
// export const ADD_COUPON  = '[COUPON] Add'
// export const REMOVE_COUPON  = '[COUPON] Remove'

// // Section 3
// export class AddCoupon implements Action {
//     public readonly type = ExampleActionTypes.GetCoupon

//     constructor(public Couponpayload: Coupon[]) {}

// }

// export class RemoveCoupon implements Action {
//     public readonly type = ExampleActionTypes2.GetCoupon

//     constructor(public Couponpayload: any) {}
// }

// // Special_Order

// // Section 2
// export const ADD_SPECIAL_ORDER  = '[SPECIAL_ORDER] Add'
// export const REMOVE_SPECIAL_ORDER   = '[SPECIAL_ORDER] Remove'

// // Section 3
// export class AddSpecial_Order implements Action {
//     public readonly type = ExampleActionTypes.GetSpecial_Order

//     constructor(public Special_Orderpayload: Special_Order[]) {}

// }

// export class RemoveSpecial_Order implements Action {
//     public readonly type = ExampleActionTypes2.GetSpecial_Order

//     constructor(public Special_Orderpayload: any) {}
// }

// action

export type Actions =
  | AddProfile
  | RemoveProfile
  | AddStates
  | RemoveStates
  | AddYear
  | RemoveYear
  | AddIndPayer
  | RemoveIndPayer
  | AddComPayer
  | RemoveComPayer
  | AddPayee
  | RemovePayee
  | AddUser
  | RemoveUser
  | AddGroup
  | RemoveGroup
  | AddDepartment
  | RemoveDepartment
  | AddLocation
  | RemoveLocation
  | AddOccupation
  | RemoveOccupation
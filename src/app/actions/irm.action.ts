import { Injectable } from '@angular/core'
import { Action } from '@ngrx/store';
import { Profile, States, Year, IndPayer, ComPayer, Payee } from '../models/irm';



export enum ExampleActionTypes {
    GetProfile = '[Profile API] Get Profile',
    GetStates = '[States API] Get States',
    GetYear = '[Year API] Get Year',
    GetIndPayer = '[Review API] Get IndPayer',
    GetComPayer = '[Gallery API] Get ComPayer',
    GetPayee = '[Payee API] Get Payee',
    // GetTransaction = '[Transaction API] Get Transaction',
    // GetNotification = '[Notification API] Get Notification',
    // GetTask = '[Task API] Get Task',
    // GetAdmin_Agent = '[Admin_Agent API] Get Admin_Agent',
    // GetUser = '[User API] Get User',
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
    // GetTransaction = '[Transaction API] Remove Transaction',
    // GetNotification = '[Notification API] Remove Notification',
    // GetTask = '[Task API] Remove Task',
    // GetAdmin_Agent = '[Admin_Agent API] Remove Admin_Agent',
    // GetUser = '[User API] Remove User',
    // GetCoupon = '[Coupon API] Remove Coupon',
    // GetSpecial_Order = '[Special_Order API] Remove Special_Order',
  }



// Profile


// Section 2
export const ADD_PROFILE  = '[PROFILE] Add'
export const REMOVE_PROFILE   = '[PROFILE] Remove'

// Section 3
export class AddProfile implements Action {
    public readonly type = ExampleActionTypes.GetProfile

    constructor(public Profilepayload: Profile[]) {}

}

export class RemoveProfile implements Action {
    public readonly type = ExampleActionTypes2.GetProfile

    constructor(public Profilepayload: any) {}
}



// Order


// Section 2
export const ADD_STATES  = '[STATE] Add'
export const REMOVE_STATES   = '[STATE] Remove'

// Section 3
export class AddStates implements Action {
    public readonly type = ExampleActionTypes.GetStates

    constructor(public Statespayload: States[]) {}

}

export class RemoveStates implements Action {
    public readonly type = ExampleActionTypes2.GetStates

    constructor(public Statespayload: any) {}
}




// Year

// Section 2
export const ADD_YEAR  = '[YEAR] Add'
export const REMOVE_YEAR   = '[YEAR] Remove'

// Section 3
export class AddYear implements Action {
    public readonly type = ExampleActionTypes.GetYear

    constructor(public Yearpayload: Year[]) {}

}

export class RemoveYear implements Action {
    public readonly type = ExampleActionTypes2.GetYear

    constructor(public Yearpayload: any) {}
}




// IndPayer


// Section 2
export const ADD_INDPAYER  = '[INDPAYER] Add'
export const REMOVE_INDPAYER   = '[INDPAYER] Remove'

// Section 3
export class AddIndPayer implements Action {
    public readonly type = ExampleActionTypes.GetIndPayer

    constructor(public IndPayerpayload: IndPayer[]) {}

}

export class RemoveIndPayer implements Action {
    public readonly type = ExampleActionTypes2.GetIndPayer

    constructor(public IndPayerpayload: any) {}
}




// Gallery


// Section 2
export const ADD_COMPAYER  = '[COMPAYER] Add'
export const REMOVE_COMPAYER  = '[COMPAYER] Remove'

// Section 3
export class AddComPayer implements Action {
    public readonly type = ExampleActionTypes.GetComPayer

    constructor(public ComPayerpayload: ComPayer[]) {}

}

export class RemoveComPayer implements Action {
    public readonly type = ExampleActionTypes2.GetComPayer

    constructor(public ComPayerpayload: any) {}
}



// Contact


// Section 2
export const ADD_PAYEE  = '[PAYEE] Add'
export const REMOVE_PAYEE   = '[PAYEE] Remove'

// Section 3
export class AddPayee implements Action {
    public readonly type = ExampleActionTypes.GetPayee

    constructor(public Payeepayload: Payee[]) {}

}

export class RemovePayee implements Action {
    public readonly type = ExampleActionTypes2.GetPayee

    constructor(public Payeepayload: any) {}
}




// // Transaction


// // Section 2
// export const ADD_TRANSACTION  = '[TRANSACTION] Add'
// export const REMOVE_TRANSACTION   = '[TRANSACTION] Remove'

// // Section 3
// export class AddTransaction implements Action {
//     public readonly type = ExampleActionTypes.GetTransaction

//     constructor(public Transactionpayload: Transaction[]) {}

// }

// export class RemoveTransaction implements Action {
//     public readonly type = ExampleActionTypes2.GetTransaction

//     constructor(public Transactionpayload: any) {}
// }





// // Notification


// // Section 2
// export const ADD_NOTIFICATION  = '[NOTIFICATION] Add'
// export const REMOVE_NOTIFICATION   = '[NOTIFICATION] Remove'

// // Section 3
// export class AddNotification implements Action {
//     public readonly type = ExampleActionTypes.GetNotification

//     constructor(public Notificationpayload: Notification[]) {}

// }

// export class RemoveNotification implements Action {
//     public readonly type = ExampleActionTypes2.GetNotification

//     constructor(public Notificationpayload: any) {}
// }





// // Task 


// // Section 2
// export const ADD_TASK  = '[TASK] Add'
// export const REMOVE_TASK   = '[TASK] Remove'

// // Section 3
// export class AddTask implements Action {
//     public readonly type = ExampleActionTypes.GetTask

//     constructor(public Taskpayload: Task[]) {}

// }

// export class RemoveTask implements Action {
//     public readonly type = ExampleActionTypes2.GetTask

//     constructor(public Taskpayload: any) {}
// }




// // Admin_Agent

// // Section 2
// export const ADD_ADMIN_AGENT  = '[ADMIN_AGENT] Add'
// export const REMOVE_ADMIN_AGENT   = '[ADMIN_AGENT] Remove'

// // Section 3
// export class AddAdmin_Agent implements Action {
//     public readonly type = ExampleActionTypes.GetAdmin_Agent

//     constructor(public Admin_Agentpayload: Admin_Agent[]) {}

// }

// export class RemoveAdmin_Agent implements Action {
//     public readonly type = ExampleActionTypes2.GetAdmin_Agent

//     constructor(public Admin_Agentpayload: any) {}
// }





// // User


// // Section 2
// export const ADD_USER  = '[USER] Add'
// export const REMOVE_USER   = '[USER] Remove'

// // Section 3
// export class AddUser implements Action {
//     public readonly type = ExampleActionTypes.GetUser

//     constructor(public Userpayload: User[]) {}

// }

// export class RemoveUser implements Action {
//     public readonly type = ExampleActionTypes2.GetUser

//     constructor(public Userpayload: any) {}
// }




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

export type Actions = | AddProfile | RemoveProfile | AddStates | RemoveStates | AddYear | RemoveYear 
    | AddIndPayer | RemoveIndPayer | AddComPayer | RemoveComPayer | AddPayee | RemovePayee
// | AddGallery | RemoveGallery | AddContact | RemoveContact | AddTransaction | RemoveTransaction
// | AddNotification | RemoveNotification | AddTask | RemoveTask | AddAdmin_Agent | RemoveAdmin_Agent
// | AddUser | RemoveUser | AddCoupon | RemoveCoupon | AddSpecial_Order | RemoveSpecial_Order
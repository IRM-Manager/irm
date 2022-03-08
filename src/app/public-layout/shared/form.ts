
export interface login {
    username: string; 
    password: string;
}

export interface Tokens {
    access: string;
    refresh: string;
}

export interface CAC {
    cac: string;
}

export interface NIN {
    nin: string;
}

// export interface forgetPassword {
//     email: string; 
// }


// export interface forgetPassword2 {
//     password: string;
//     confirmPassword: string;
// }



// export interface changePassword {
//     old_password: string;
//     new_password: string;
//     confirmPassword: string;
// }


// export interface register {
//     email: string; 
//     password: string;
//     confirmPassword: string;
//     phone: string;
//     name: string;
// }


// export interface billingDetails {
//     notes: string;
//     street_address: string; 
//     apartment_suit_unit: string;
//     delivery_type: string;
// }


// export interface voucher {
//     coupon: string;
// }
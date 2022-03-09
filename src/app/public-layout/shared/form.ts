
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

export interface Individual1 {
    title: string;
    firstname: string;
    middlename: string;
    surname: string;
    gender: string;
    birth: string;
    place: string;
    state: string;
    lga: string;
    nationality: string;
    trade: string;
    employment: string;
    contact: string;
    contact_email: string;
    // employed: string;
    // unemployed: string;
    // retired: string;
}

export interface Individual2 {
    house: string;
    street: string;
    state_red: string;
    lga_red: string;
    zipcode: string;
}


export interface Individual3 {
    com_name: string;
    com_house: string;
    company_street: string;
    com_country: string;
    com_state: string;
    com_lga: string;
    com_zipcode: string;
    username: string;
}


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



export interface stateLogo {
    id: any;
    name: any;
    code: any;
}



export interface lgaLogo {
    id: any;
    name: any;
    code: any;
}


export let OPTIONS = [
    {
        id: "",
        name: "",
        code: "",
    }
];


export let STATE = [
    {
        id: "",
        name: "",
        code: "",
    }
];


export let LGA = [
    {
        id: "",
        name: "",
        code: "",
    }
];
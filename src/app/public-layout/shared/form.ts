
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

export interface Tin {
    tin: string;
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
    // employment: string;
    contact: string;
    contact_email: string;
}


export interface BusinessIndividual1 {
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
    // employment: string;
    contact: string;
    contact_email: string;
}

export interface Individual2 {
    house: string;
    street: string;
    state_red: string;
    lga_red: string;
    zipcode: string;
}


export interface Individual3 {
    company_name: string;
    company_house_no: string;
    company_estate_street: string;
    company_country: string;
    company_state: string;
    company_lga: string;
    company_zipcode: string;
}

export interface Business {
    org_name: string;
    nature_bus: string;
    num_emp: string;
    date_est: string;
    contact_num: string;
    email: string;
    alt_num: string;
    website: string;
}



export interface payee1 {
    name: string; 
    tin: string;
    year: string;
    position: string;
}


export interface payee2 {
    basic: string;
    housing: string; 
    transport: string;
    other: string;
}


export interface MDA {
    title: string;
    firstname: string;
    middlename: string;
    surname: string;
    contact: string;
    contact_email: string;
    mda_name: string;
    service_name: string;
    amount: string;
    description: string;
}



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


export const Person = [
    {
        tin: "184834843",
        first_name: "matins luta",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "israel matins",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "danel isaac",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "dora lizzy",
        occupation: "Lawyer",
        phone: "08117039368"
    }, 
    {
        tin: "184834843",
        first_name: "matins luta",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "israel matins",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "danel isaac",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "dora lizzy",
        occupation: "Lawyer",
        phone: "08117039368"
    },  
    {
        tin: "184834843",
        first_name: "matins luta",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "israel matins",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "danel isaac",
        occupation: "Lawyer",
        phone: "08117039368"
    },
    {
        tin: "184834843",
        first_name: "dora lizzy",
        occupation: "Lawyer",
        phone: "08117039368"
    }   

]



export const Person2 = [
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },
    {
        tin: "184834843",
        name: "matins luta",
        gross_income: 47773333333,
        free_income: 8117039368,
        tax_income: 17039368
    },

]


export const Person3 = [
    {
        duration: "Jan",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "Feb",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "March",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "April",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "May",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "June",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "July",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "August",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "September",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "October",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "November",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    },
    {
        duration: "December",
        no_emp: 12,
        payable: "77,000,000.00",
        status: "Pending"
    }
]
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

export interface Individual2 {
  house: string;
  street: string;
  state_red: string;
  lga_red: string;
  zipcode: string;
  contact_email: string;
  contact: string;
}

export interface manual {
  tin: string;
  name: string;
  date: string;
  position: string;
  company_name: string;
  year: string;
}


// export interface Individual3 {
//   company_name: string;
//   company_house_no: string;
//   company_estate_street: string;
//   company_country: string;
//   company_state: string;
//   company_lga: string;
//   company_zipcode: string;
// }

export interface Business {
  org_name: string;
  nature_bus: string;
  num_emp: string;
  date_est: string;
  contact_num: string;
  email: string;
  company_type: string;
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

export interface individual_create {
  nin: string;
  birth: string;
}

export interface create_assessment {
    year: string;
    typee: string;
    employee_no: number;
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
    id: '',
    name: '',
    code: '',
  },
];

export let STATE = [
  {
    id: '',
    name: '',
    code: '',
  },
];

export let LGA = [
  {
    id: '',
    name: '',
    code: '',
  },
];

export const Person = [
  {
    tin: '184834843',
    first_name: 'matins luta',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'israel matins',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'danel isaac',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'dora lizzy',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'matins luta',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'israel matins',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'danel isaac',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'dora lizzy',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'matins luta',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'israel matins',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'danel isaac',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
  {
    tin: '184834843',
    first_name: 'dora lizzy',
    occupation: 'Lawyer',
    phone: '08117039368',
  },
];

export const Person2 = [
  {
    tin: '184834843',
    name: 'matins luta',
    ref: 47773333333,
    status: 'paid',
    payment: 'bank',
  },
  {
    tin: '184834843',
    name: 'matins luta',
    ref: 47773333333,
    status: 'pending',
    payment: 'Online Payment',
  },
  {
    tin: '184834843',
    name: 'matins luta rere rerer',
    ref: 47773333333,
    status: 'paid',
    payment: 'bank',
  },
  {
    tin: '184834843',
    name: 'matins luta',
    ref: 47773333333,
    status: 'paid',
    payment: 'Agent point',
  },
  {
    tin: '184834843',
    name: 'matins luta rere rerer',
    ref: 47773333333,
    status: 'paid',
    payment: 'bank',
  },
  {
    tin: '184834843',
    name: 'matins luta',
    ref: 47773333333,
    status: 'paid',
    payment: 'bank',
  },
  {
    tin: '184834843',
    name: 'matins luta reereg',
    ref: 47773333333,
    status: 'pending',
    payment: 'bank',
  },
  {
    tin: '184834843',
    name: 'matins luta',
    ref: 47773333333,
    status: 'paid',
    payment: 'agent point',
  },
  {
    tin: '184834843',
    name: 'matins luta',
    ref: 47773333333,
    status: 'paid',
    payment: 'bank',
  },
];

export const Person3 = [
  {
    duration: 'Jan',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'Feb',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'March',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'April',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'May',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'June',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'July',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'August',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'September',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'October',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'November',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
  {
    duration: 'December',
    no_emp: 12,
    payable: '77,000,000.00',
    status: 'Pending',
  },
];

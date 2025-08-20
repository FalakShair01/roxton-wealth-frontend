export interface Client {
  id: string;
  surname: string;
  forenames: string;
  date_of_birth: string;
  client_status: string;
  adviser_name: string;
  fact_find_completed_date: string;
}

export const MOCK_CLIENTS: Client[] = [
  {
    id: 'XAJI0Y6DPBHSAHXT',
    forenames: 'Rita',
    surname: 'Kaur',
    date_of_birth: '1993-01-20',
    client_status: 'pending',
    adviser_name: 'James Cox',
    fact_find_completed_date: '2025-01-18'
  },
  {
    id: '0FN9XUY41IBLJH75',
    forenames: 'Jade',
    surname: 'Hill',
    date_of_birth: '1969-03-28',
    client_status: 'active',
    adviser_name: 'Dr Eileen Matthews',
    fact_find_completed_date: '2024-06-12'
  },
  {
    id: 'KXVF1T2TALA753LC',
    surname: 'Green',
    forenames: 'Karl',
    date_of_birth: '2005-01-09',
    client_status: 'inactive',
    adviser_name: 'Joshua Howe',
    fact_find_completed_date: '2024-09-11'
  },
  {
    id: 'DXMO5BXXC02DGTFG',
    surname: 'Bailey',
    forenames: 'Liam',
    date_of_birth: '1974-04-22',
    client_status: 'active',
    adviser_name: 'Catherine Jackson-Thomas',
    fact_find_completed_date: '2024-09-07'
  },
  {
    id: 'VS7HZIOYKL1CQ99C',
    surname: 'White',
    forenames: 'Hugh',
    date_of_birth: '1966-06-03',
    client_status: 'active',
    adviser_name: 'Mr Aaron Walsh',
    fact_find_completed_date: '2024-02-02'
  },
  {
    id: 'T4UFEL6246HID25O',
    surname: 'Cooper',
    forenames: 'Bethan',
    date_of_birth: '1988-06-24',
    client_status: 'pending',
    adviser_name: 'Dr Jordan Summers',
    fact_find_completed_date: '2025-05-09'
  },
  {
    id: 'NUJZA7TZ0YNCXLL4',
    surname: 'Murphy',
    forenames: 'Phillip',
    date_of_birth: '1974-11-01',
    client_status: 'inactive',
    adviser_name: 'Dr Jake Gray',
    fact_find_completed_date: '2024-11-14'
  },
  {
    id: 'GZRIXA11DPG8SBI4',
    surname: 'Clayton',
    forenames: 'Victor',
    date_of_birth: '1973-09-13',
    client_status: 'inactive',
    adviser_name: 'Dr Donald Williams',
    fact_find_completed_date: '2024-08-11'
  },
  {
    id: '48P0TVHHPBMYOFQE',
    surname: 'Cunningham',
    forenames: 'Leon',
    date_of_birth: '1972-03-24',
    client_status: 'pending',
    adviser_name: 'Mrs Jemma Kirby',
    fact_find_completed_date: '2025-02-27'
  },
  {
    id: 'GV0E38DALY8OZCYW',
    surname: 'Taylor',
    forenames: 'Stuart',
    date_of_birth: '1994-07-18',
    client_status: 'inactive',
    adviser_name: 'Dr Gerard Thomas',
    fact_find_completed_date: '2024-03-01'
  },
  {
    id: 'DZR1YXR2DHYLURTP',
    surname: 'Smith',
    forenames: 'Amelia',
    date_of_birth: '1990-07-30',
    client_status: 'active',
    adviser_name: 'Wendy Perry',
    fact_find_completed_date: '2024-03-11'
  },
  {
    id: 'RUYF38DIUOVW1N6K',
    surname: 'Brown',
    forenames: 'Bryan',
    date_of_birth: '1988-02-17',
    client_status: 'active',
    adviser_name: 'Alan Williams',
    fact_find_completed_date: '2025-06-28'
  },
  {
    id: 'KOJTPV60VAIY4VA1',
    surname: 'Middleton',
    forenames: 'Sandra',
    date_of_birth: '1984-01-21',
    client_status: 'active',
    adviser_name: 'Heather Mills-Morrison',
    fact_find_completed_date: '2025-04-22'
  },
  {
    id: 'RBW2ZLAOI4E8XF7K',
    surname: 'Jenkins',
    forenames: 'Danny',
    date_of_birth: '1975-04-05',
    client_status: 'active',
    adviser_name: 'Michelle Price-Morton',
    fact_find_completed_date: '2025-06-05'
  },
  {
    id: '8LD4D6AF58C2JWOC',
    surname: 'Page',
    forenames: 'Ashleigh',
    date_of_birth: '2004-11-10',
    client_status: 'active',
    adviser_name: 'Mr Leon Murray',
    fact_find_completed_date: '2024-04-29'
  },
  {
    id: 'YFPMVXPJ4HNRIUU9',
    surname: 'Dennis',
    forenames: 'Martin',
    date_of_birth: '1966-03-30',
    client_status: 'pending',
    adviser_name: 'Dylan Nicholls',
    fact_find_completed_date: '2025-06-04'
  },
  {
    id: '0982N2ATQYYV37DI',
    surname: 'Bell',
    forenames: 'Patrick',
    date_of_birth: '1956-01-31',
    client_status: 'inactive',
    adviser_name: 'Dr Declan Anderson',
    fact_find_completed_date: '2024-11-22'
  },
  {
    id: '883DHX8BM92H3TV3',
    surname: 'Warren',
    forenames: 'Ross',
    date_of_birth: '1978-12-05',
    client_status: 'active',
    adviser_name: 'Danny Jones',
    fact_find_completed_date: '2025-02-21'
  },
  {
    id: 'EWVZNVKSP2EX5T5P',
    surname: 'Sims',
    forenames: 'Clare',
    date_of_birth: '1995-03-08',
    client_status: 'inactive',
    adviser_name: 'Gregory Newman',
    fact_find_completed_date: '2025-06-10'
  },
  {
    id: 'JGZLMA5UOFWB0HPM',
    surname: 'Morley',
    forenames: 'Christian',
    date_of_birth: '1972-03-07',
    client_status: 'active',
    adviser_name: 'Lorraine Wells',
    fact_find_completed_date: '2024-06-26'
  }
];

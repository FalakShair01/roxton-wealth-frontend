export type Option = { label: string; value: string };

export type FormField = {
  label: string;
  placeholder?: string;
  input_type:
    | 'input_string'
    | 'input_number'
    | 'input_email'
    | 'input_phone'
    | 'input_date'
    | 'input_dropdown'
    | 'input_radio'
    | 'input_checklist'
    | 'input_textarea'
    | 'file';
  name: string;
  value: any;
  options?: Option[];
};

export type SubSection = {
  sub_title: string;
  fields: FormField[];
};

export type FormSection = {
  id: number;
  title: string;
  fields?: (FormField | { sub_title: string; fields: FormField[] })[];
  sections?: SubSection[];
  note?: string;
};

export type FormData = FormSection[];

// ================ SHARED OPTIONS =================
const YES_NO: Option[] = [
  { label: 'Yes', value: 'yes' },
  { label: 'No', value: 'no' }
];

const FACE_VIDEO: Option[] = [
  { label: 'Face to face', value: 'face_to_face' },
  { label: 'Video conference', value: 'video_conference' }
];

const DISPATCH_METHODS: Option[] = [
  { label: 'Face to face', value: 'face_to_face' },
  { label: 'Paper', value: 'paper' },
  { label: 'Email', value: 'email' }
];

const CONTACT_METHODS: Option[] = [
  { label: 'Any', value: 'any' },
  { label: 'Correspondence Email', value: 'correspondence_email' },
  { label: 'SMS', value: 'sms' },
  { label: 'Post', value: 'post' },
  { label: 'Phone', value: 'phone' }
];

const GENDER_OPTS: Option[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' }
];

const MARITAL_STATUS_OPTS: Option[] = [
  { label: 'Single', value: 'single' },
  { label: 'Married', value: 'married' },
  { label: 'Divorced', value: 'divorced' },
  { label: 'Widowed', value: 'widowed' }
];

const CLIENT_STATUS_OPTS: Option[] = [
  { label: 'Current client', value: 'current_client' },
  { label: 'Legacy client', value: 'legacy_client' },
  { label: '3rd party family', value: 'third_party_family' },
  { label: '3rd party professional', value: 'third_party_professional' }
];

const ID_TYPES: Option[] = [
  { label: 'Passport', value: 'passport' },
  { label: 'Driving license', value: 'driving_license' },
  { label: 'Residence Permit', value: 'residence_permit' },
  { label: 'E-visa', value: 'e_visa' }
];

const VERIFICATION_METHODS: Option[] = [
  { label: 'Face to face', value: 'face_to_face' },
  { label: 'Online', value: 'online' }
];

const OCCUPANCY_STATUS: Option[] = [
  { label: 'Owner', value: 'owner' },
  { label: 'Tenant', value: 'tenant' },
  { label: 'Living with parents', value: 'living_with_parents' },
  { label: 'Other', value: 'other' }
];

const REPAYMENT_BASIS: Option[] = [
  { label: 'Interest Only', value: 'interest_only' },
  { label: 'Repayment', value: 'repayment' }
];

// ================ DATASET =================
export const FORM_DATA: FormData = [
  {
    id: 0,
    title: 'Adviser & Meeting Information',
    sections: [
      {
        sub_title: 'Adviser Details',
        fields: [
          {
            label: 'Adviser name',
            placeholder: 'Enter adviser name',
            input_type: 'input_string',
            name: 'adviser_name',
            value: ''
          },
          {
            label: 'Date fact find completed',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'fact_find_completed_date',
            value: ''
          },
          {
            label: 'Place fact find completed',
            placeholder: 'Select place',
            input_type: 'input_dropdown',
            name: 'fact_find_place',
            value: '',
            options: FACE_VIDEO
          }
        ]
      },
      {
        sub_title: 'Client Agreement & Privacy Notice',
        fields: [
          {
            label: 'Date given to client',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'client_agreement_given_date',
            value: ''
          },
          {
            label: 'Date signed by client',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'client_agreement_signed_date',
            value: ''
          },
          {
            label: 'Method of despatch',
            placeholder: 'Select method',
            input_type: 'input_dropdown',
            name: 'client_agreement_dispatch_method',
            value: '',
            options: DISPATCH_METHODS
          },
          {
            label: 'Client Agreement reference number',
            placeholder: 'Enter reference number',
            input_type: 'input_string',
            name: 'client_agreement_reference_number',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Meeting & Quotes',
        fields: [
          {
            label: 'Date of client meeting',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'client_meeting_date',
            value: ''
          },
          {
            label: 'Meeting venue',
            placeholder: 'Select venue',
            input_type: 'input_dropdown',
            name: 'meeting_venue',
            value: '',
            options: FACE_VIDEO
          },
          {
            label: 'All clients present',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'all_clients_present',
            value: YES_NO
          },
          {
            label: 'Quotes sourcing date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'quotes_sourcing_date',
            value: ''
          },
          {
            label: 'Quotes presentation date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'quotes_presentation_date',
            value: ''
          },
          {
            label: '27 Tech ESIS presentation date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'esis_presentation_date',
            value: ''
          },
          {
            label: '27 Tech dispatch method',
            placeholder: 'Select method',
            input_type: 'input_dropdown',
            name: 'tech_dispatch_method',
            value: '',
            options: DISPATCH_METHODS
          }
        ]
      },
      {
        sub_title: 'Protection & Suitability',
        fields: [
          {
            label: 'Protection quotes date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'protection_quotes_date',
            value: ''
          },
          {
            label: 'Protection risks discussed date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'protection_risks_discussed_date',
            value: ''
          },
          {
            label: 'Protection declaration signed date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'protection_declaration_signed_date',
            value: ''
          },
          {
            label: 'Protection declaration dispatch method',
            placeholder: 'Select method',
            input_type: 'input_dropdown',
            name: 'protection_declaration_dispatch_method',
            value: '',
            options: DISPATCH_METHODS
          },
          {
            label: 'Suitability report sent date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'suitability_report_sent_date',
            value: ''
          },
          {
            label: 'Suitability report dispatch method',
            placeholder: 'Select method',
            input_type: 'input_dropdown',
            name: 'suitability_report_dispatch_method',
            value: '',
            options: DISPATCH_METHODS
          }
        ]
      },
      {
        sub_title: 'Milestones & Fees',
        fields: [
          {
            label: 'Mortgage offer date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'mortgage_offer_date',
            value: ''
          },
          {
            label: 'Lender application date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'lender_application_date',
            value: ''
          },
          {
            label: 'Anticipated completion date',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'anticipated_completion_date',
            value: ''
          },
          {
            label: 'Proc fees',
            placeholder: 'Enter amount',
            input_type: 'input_number',
            name: 'proc_fees',
            value: 0
          },
          {
            label: 'Broker fees',
            placeholder: 'Enter amount',
            input_type: 'input_number',
            name: 'broker_fees',
            value: 0
          },
          {
            label: 'Lead source',
            placeholder: 'Enter lead source',
            input_type: 'input_string',
            name: 'lead_source',
            value: ''
          },
          {
            label: 'Fee split if introducer involved',
            placeholder: 'Enter fee split',
            input_type: 'input_string',
            name: 'fee_split_introducer',
            value: ''
          },
          {
            label: 'Introducer name',
            placeholder: 'Enter introducer name',
            input_type: 'input_string',
            name: 'introducer_name',
            value: ''
          }
        ]
      }
    ]
  },

  {
    id: 1,
    title: 'Client Information',
    sections: [
      {
        sub_title: 'Personal Details',
        fields: [
          {
            label: 'Client status',
            placeholder: 'Select client status',
            input_type: 'input_dropdown',
            name: 'client_status',
            value: '',
            options: CLIENT_STATUS_OPTS
          },
          {
            label: 'Title',
            placeholder: 'Enter title',
            input_type: 'input_string',
            name: 'title',
            value: ''
          },
          {
            label: 'Gender',
            placeholder: 'Select gender',
            input_type: 'input_dropdown',
            name: 'gender',
            value: '',
            options: GENDER_OPTS
          },
          {
            label: 'Forename(s)',
            placeholder: 'Enter forename(s)',
            input_type: 'input_string',
            name: 'forenames',
            value: ''
          },
          {
            label: 'Surname',
            placeholder: 'Enter surname',
            input_type: 'input_string',
            name: 'surname',
            value: ''
          },
          {
            label: 'Preferred name / salutation',
            placeholder: 'Enter preferred name or salutation',
            input_type: 'input_string',
            name: 'preferred_name_salutation',
            value: ''
          },
          {
            label: 'Previous names',
            placeholder: 'Enter previous names',
            input_type: 'input_string',
            name: 'previous_names',
            value: ''
          },
          {
            label: 'Date of birth + current age',
            placeholder: 'Enter date of birth',
            input_type: 'input_date',
            name: 'date_of_birth',
            value: ''
          },
          {
            label: 'Marital status',
            placeholder: 'Select marital status',
            input_type: 'input_dropdown',
            name: 'marital_status',
            value: '',
            options: MARITAL_STATUS_OPTS
          }
        ]
      },
      {
        sub_title: 'Identification & Tax',
        fields: [
          {
            label: 'National Insurance number',
            placeholder: 'Enter NI number',
            input_type: 'input_string',
            name: 'national_insurance_number',
            value: ''
          },
          {
            label: 'Tax residence & domicile',
            placeholder: 'Enter tax residence & domicile',
            input_type: 'input_string',
            name: 'tax_residence_and_domicile',
            value: ''
          },
          {
            label: 'Passport number (Smartsearch)',
            placeholder: 'Enter passport number',
            input_type: 'input_string',
            name: 'passport_number',
            value: ''
          },
          {
            label: 'Driving licence number (Smartsearch)',
            placeholder: 'Enter driving licence number',
            input_type: 'input_string',
            name: 'driving_licence_number',
            value: ''
          },
          {
            label: 'Nationality',
            placeholder: 'Enter nationality',
            input_type: 'input_string',
            name: 'nationality',
            value: ''
          },
          {
            label: 'Country of residence',
            placeholder: 'Enter country of residence',
            input_type: 'input_string',
            name: 'country_of_residence',
            value: ''
          },
          {
            label: 'Country of domicile',
            placeholder: 'Enter country of domicile',
            input_type: 'input_string',
            name: 'country_of_domicile',
            value: ''
          },
          {
            label: 'Dual nationality',
            placeholder: 'Enter dual nationality',
            input_type: 'input_string',
            name: 'dual_nationality',
            value: ''
          },
          {
            label: 'UK taxpayer status',
            placeholder: 'Select taxpayer status',
            input_type: 'input_dropdown',
            name: 'uk_tax_payer',
            value: '',
            options: [
              { label: 'Basic tax payer', value: 'basic' },
              { label: 'Higher rate tax payer', value: 'higher' },
              { label: 'Additional rate tax payer', value: 'additional' },
              { label: 'Non uk tax payer', value: 'non_uk' }
            ]
          }
        ]
      },
      {
        sub_title: 'Additional Personal Status',
        fields: [
          {
            label: 'Valid Will',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'valid_will',
            value: YES_NO
          },
          {
            label: 'Anticipated retirement age',
            placeholder: 'Enter anticipated age',
            input_type: 'input_number',
            name: 'anticipated_retirement_age',
            value: 0
          },
          {
            label: 'Dependent on spouse/partner',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'dependent_on_partner',
            value: YES_NO
          },
          {
            label: 'Politically exposed person',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'politically_exposed_person',
            value: YES_NO
          },
          {
            label: 'Client is UK sanction entity',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'uk_sanction_entity',
            value: YES_NO
          },
          {
            label: 'Lead source',
            placeholder: 'Enter lead source',
            input_type: 'input_string',
            name: 'lead_source',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Address & Contact',
        fields: [
          {
            label: 'Home address',
            placeholder: 'Enter home address',
            input_type: 'input_string',
            name: 'home_address',
            value: ''
          },
          {
            label: 'Occupancy status',
            placeholder: 'Select occupancy status',
            input_type: 'input_dropdown',
            name: 'occupancy_status',
            value: '',
            options: OCCUPANCY_STATUS
          },
          {
            label: 'Time at current address',
            placeholder: 'Enter years & months',
            input_type: 'input_string',
            name: 'time_at_current_address',
            value: ''
          },
          {
            label: 'Previous addresses (<3 years)',
            placeholder: 'Enter previous addresses',
            input_type: 'input_string',
            name: 'previous_addresses_if_less_than_3_years',
            value: ''
          },
          {
            label: 'Telephone numbers (Home & Mobile)',
            placeholder: 'Enter phone numbers',
            input_type: 'input_string',
            name: 'telephone_numbers',
            value: ''
          },
          {
            label: 'Email address',
            placeholder: 'Enter email address',
            input_type: 'input_string',
            name: 'email_address',
            value: ''
          },
          {
            label: 'Preferred method of contact',
            placeholder: 'Select contact method',
            input_type: 'input_dropdown',
            name: 'preferred_contact_method',
            value: '',
            options: CONTACT_METHODS
          }
        ]
      },
      {
        sub_title: 'Marketing Preferences',
        fields: [
          {
            label: 'Date marketing preferences confirmed',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'marketing_preferences_last_confirmed_date',
            value: ''
          },
          {
            label: 'Contact method preference',
            placeholder: 'Select method(s)',
            input_type: 'input_checklist',
            name: 'contact_method',
            value: CONTACT_METHODS
          },
          {
            label: 'Correspondence email',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'correspondence_email',
            value: [
              { label: 'Allow', value: 'allow' },
              { label: 'Don’t allow', value: 'dont_allow' }
            ]
          },
          {
            label: 'Servicing emails',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'servicing_emails',
            value: [
              { label: 'Allow', value: 'allow' },
              { label: 'Don’t allow', value: 'dont_allow' }
            ]
          },
          {
            label: 'Post advertising',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'post_advertising',
            value: [
              { label: 'Allow', value: 'allow' },
              { label: 'Don’t allow', value: 'dont_allow' }
            ]
          }
        ]
      },
      {
        sub_title: 'Identity Verification',
        fields: [
          {
            label: 'Type of ID',
            placeholder: 'Select ID type',
            input_type: 'input_dropdown',
            name: 'type_of_id',
            value: '',
            options: ID_TYPES
          },
          {
            label: 'Verification method',
            placeholder: 'Select verification method',
            input_type: 'input_dropdown',
            name: 'verification_method',
            value: '',
            options: VERIFICATION_METHODS
          },
          {
            label: 'Reference number',
            placeholder: 'Enter reference number',
            input_type: 'input_string',
            name: 'reference_number',
            value: ''
          },
          {
            label: 'Issue date',
            placeholder: 'Select issue date',
            input_type: 'input_date',
            name: 'date_of_issue',
            value: ''
          },
          {
            label: 'Expiry date',
            placeholder: 'Select expiry date',
            input_type: 'input_date',
            name: 'expiry_date',
            value: ''
          }
        ]
      }
    ]
  },

  {
    id: 2,
    title: 'Client Overview & Financial Profile',
    sections: [
      {
        sub_title: 'Summary Overview',
        fields: [
          {
            label: 'Financial dependents',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'financial_dependents',
            value: YES_NO
          },
          {
            label: 'Income',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'summary_income',
            value: YES_NO
          },
          {
            label: 'Properties',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'summary_properties',
            value: YES_NO
          },
          {
            label: 'Protection',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'summary_protection',
            value: YES_NO
          },
          {
            label: 'Other liabilities',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'summary_other_liabilities',
            value: YES_NO
          },
          {
            label: 'Previous debt consolidation',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'summary_previous_debt_consolidation',
            value: YES_NO
          }
        ]
      },
      {
        sub_title: 'Dependents (repeatable)',
        fields: [
          {
            label: 'Name',
            placeholder: 'Enter name',
            input_type: 'input_string',
            name: 'dependent_name',
            value: ''
          },
          {
            label: 'Date of birth',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'dependent_dob',
            value: ''
          },
          {
            label: 'Relationship',
            placeholder: 'Enter relationship',
            input_type: 'input_string',
            name: 'dependent_relationship',
            value: ''
          },
          {
            label: 'Dependency duration',
            placeholder: 'Enter duration',
            input_type: 'input_string',
            name: 'dependency_duration',
            value: ''
          },
          {
            label: 'Joint dependent',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'joint_dependent',
            value: YES_NO
          }
        ]
      },
      {
        sub_title: 'Personal Circumstances',
        fields: [
          {
            label: 'Anticipated changes to personal circumstances',
            placeholder: 'Type details here',
            input_type: 'input_textarea',
            name: 'changes_in_personal_circumstances',
            value: ''
          },
          {
            label: 'Adverse credit history',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'has_adverse_credit_history',
            value: YES_NO
          },
          {
            label: 'Credit history notes',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'credit_history_notes',
            value: ''
          },
          {
            label: 'Mortgage/loan application refused',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'loan_application_refused',
            value: YES_NO
          },
          {
            label: 'Politically Exposed Person (PEP) / linked to PEP',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'pep_or_linked',
            value: YES_NO
          }
        ]
      },
      {
        sub_title: 'Vulnerability Assessment',
        fields: [
          {
            label: 'Vulnerability indicators',
            placeholder: 'Tick all that apply',
            input_type: 'input_checklist',
            name: 'client_vulnerability_factors',
            value: [
              { label: 'Recent bereavement', value: 'bereavement' },
              {
                label: 'In poor health (physical/mental)',
                value: 'poor_health'
              },
              { label: 'Old age (over 75)', value: 'old_age' },
              {
                label: 'English not first language',
                value: 'non_native_english'
              },
              { label: 'Unemployed / on benefits', value: 'unemployed' },
              { label: 'Adverse credit history', value: 'adverse_credit' }
            ]
          },
          {
            label: 'Explain if partially vulnerable but not overall',
            placeholder: 'Enter explanation',
            input_type: 'input_textarea',
            name: 'vc_elements_explanation',
            value: ''
          },
          {
            label: 'Face-to-face meeting acceptance (if vulnerable)',
            placeholder: 'Enter client’s reason if not accepted',
            input_type: 'input_textarea',
            name: 'face_to_face_meeting_reason',
            value: ''
          },
          {
            label: 'Vulnerability notes',
            placeholder: 'Enter notes',
            input_type: 'input_textarea',
            name: 'vulnerability_notes',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Occupation & Income',
        fields: [
          {
            label: 'Occupation',
            placeholder: 'Enter occupation',
            input_type: 'input_string',
            name: 'occupation',
            value: ''
          },
          {
            label: 'Employment type',
            placeholder: 'Select type',
            input_type: 'input_radio',
            name: 'employment_type',
            value: [
              { label: 'Employed', value: 'employed' },
              { label: 'Self-employed', value: 'self_employed' }
            ]
          },
          {
            label: 'Contractor / probation period',
            placeholder: 'Enter details (if applicable)',
            input_type: 'input_string',
            name: 'contractor_or_probation',
            value: ''
          },
          {
            label: 'Business name',
            placeholder: 'Enter business name',
            input_type: 'input_string',
            name: 'business_name',
            value: ''
          },
          {
            label: 'Start date of employment',
            placeholder: 'Select date',
            input_type: 'input_date',
            name: 'employment_start_date',
            value: ''
          },
          {
            label: 'Previous job (if < 2 years)',
            placeholder: 'Enter previous job details',
            input_type: 'input_textarea',
            name: 'previous_job_details',
            value: ''
          },
          {
            label: 'Gross income per annum',
            placeholder: 'Enter annual income',
            input_type: 'input_number',
            name: 'gross_income_annual',
            value: 0
          },
          {
            label: 'Additional income (bonus, overtime, car allowance)',
            placeholder: 'Enter additional income',
            input_type: 'input_number',
            name: 'additional_income',
            value: 0
          },
          {
            label: 'State benefits (type & monthly amount)',
            placeholder: 'Enter benefit details',
            input_type: 'input_string',
            name: 'state_benefits',
            value: ''
          },
          {
            label: 'COVID impact',
            placeholder: 'Describe the impact',
            input_type: 'input_textarea',
            name: 'covid_impact',
            value: ''
          },
          {
            label: "If self-employed: previous year's income",
            placeholder: 'Enter previous income',
            input_type: 'input_number',
            name: 'previous_year_income',
            value: 0
          },
          {
            label: 'Expected retirement age',
            placeholder: 'Enter retirement age',
            input_type: 'input_number',
            name: 'expected_retirement_age',
            value: 0
          }
        ]
      },
      {
        sub_title: 'Financial Summary',
        fields: [
          {
            label: 'Net monthly income',
            placeholder: '£',
            input_type: 'input_string',
            name: 'net_monthly_income',
            value: ''
          },
          {
            label: 'Total monthly outgoings',
            placeholder: '£',
            input_type: 'input_string',
            name: 'total_monthly_outgoings',
            value: ''
          },
          {
            label: 'Disposable income',
            placeholder: '£',
            input_type: 'input_string',
            name: 'disposable_income',
            value: ''
          },
          {
            label: 'Expected changes',
            placeholder: 'If yes, provide details',
            input_type: 'input_textarea',
            name: 'income_expenditure_change_details',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Assets',
        fields: [
          {
            label: 'Main residence',
            placeholder: '£',
            input_type: 'input_string',
            name: 'main_residence',
            value: ''
          },
          {
            label: 'Other property',
            placeholder: '£',
            input_type: 'input_string',
            name: 'other_property',
            value: ''
          },
          {
            label: 'Cash savings',
            placeholder: '£',
            input_type: 'input_string',
            name: 'cash_savings',
            value: ''
          },
          {
            label: 'Other assets (describe)',
            placeholder: '£',
            input_type: 'input_string',
            name: 'other_assets',
            value: ''
          },
          {
            label: 'Emergency fund details',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'emergency_fund_details',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Liabilities',
        fields: [
          {
            label: 'Residential mortgage: balance',
            placeholder: '£',
            input_type: 'input_string',
            name: 'residential_mortgage_balance',
            value: ''
          },
          {
            label: 'Residential mortgage: monthly repayments',
            placeholder: '£',
            input_type: 'input_string',
            name: 'residential_mortgage_repayments',
            value: ''
          },
          {
            label: 'Residential mortgage: term',
            placeholder: 'Enter term',
            input_type: 'input_string',
            name: 'residential_mortgage_term',
            value: ''
          },
          {
            label: 'Residential mortgage: interest rate & end date',
            placeholder: 'Enter details',
            input_type: 'input_string',
            name: 'residential_mortgage_interest_rate',
            value: ''
          },
          {
            label: 'Residential mortgage: repayment basis',
            placeholder: 'Choose item',
            input_type: 'input_dropdown',
            name: 'residential_mortgage_repayment_basis',
            value: '',
            options: REPAYMENT_BASIS
          },
          {
            label: 'BTL mortgage: balance',
            placeholder: '£',
            input_type: 'input_string',
            name: 'btl_mortgage_balance',
            value: ''
          },
          {
            label: 'BTL mortgage: monthly repayments',
            placeholder: '£',
            input_type: 'input_string',
            name: 'btl_mortgage_repayments',
            value: ''
          },
          {
            label: 'BTL mortgage: term',
            placeholder: 'Enter term',
            input_type: 'input_string',
            name: 'btl_mortgage_term',
            value: ''
          },
          {
            label: 'BTL mortgage: interest rate & end date',
            placeholder: 'Enter details',
            input_type: 'input_string',
            name: 'btl_mortgage_interest_rate',
            value: ''
          },
          {
            label: 'BTL mortgage: repayment basis',
            placeholder: 'Choose item',
            input_type: 'input_dropdown',
            name: 'btl_mortgage_repayment_basis',
            value: '',
            options: REPAYMENT_BASIS
          },
          {
            label: 'Other loans / liabilities: type',
            placeholder: 'Enter loan type',
            input_type: 'input_string',
            name: 'other_loan_type',
            value: ''
          },
          {
            label: 'Other loans / liabilities: balance',
            placeholder: '£',
            input_type: 'input_string',
            name: 'other_loans_balance',
            value: ''
          },
          {
            label: 'Other loans / liabilities: monthly repayments',
            placeholder: '£',
            input_type: 'input_string',
            name: 'other_loans_repayments',
            value: ''
          },
          {
            label: 'Other loans / liabilities: remaining term',
            placeholder: 'Enter term',
            input_type: 'input_string',
            name: 'remaining_term',
            value: ''
          },
          {
            label: 'Other loans / liabilities: interest rate',
            placeholder: 'Enter interest rate',
            input_type: 'input_string',
            name: 'other_loans_interest_rate',
            value: ''
          },
          {
            label: 'Early Redemption Charges (if any)',
            placeholder: 'Enter ERC details',
            input_type: 'input_textarea',
            name: 'early_redemption_charges',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Expenditure Details',
        fields: [
          {
            label: 'Total Household Expenditure',
            placeholder: '£',
            input_type: 'input_string',
            name: 'total_household_expenditure',
            value: ''
          },
          {
            label: 'Mortgage',
            placeholder: '£',
            input_type: 'input_string',
            name: 'mortgage',
            value: ''
          },
          {
            label: 'Rent',
            placeholder: '£',
            input_type: 'input_string',
            name: 'rent',
            value: ''
          },
          {
            label: 'Council Tax',
            placeholder: '£',
            input_type: 'input_string',
            name: 'council_tax',
            value: ''
          },
          {
            label: 'Gas',
            placeholder: '£',
            input_type: 'input_string',
            name: 'gas',
            value: ''
          },
          {
            label: 'Electricity',
            placeholder: '£',
            input_type: 'input_string',
            name: 'electricity',
            value: ''
          },
          {
            label: 'Water',
            placeholder: '£',
            input_type: 'input_string',
            name: 'water',
            value: ''
          },
          {
            label: 'Telephone',
            placeholder: '£',
            input_type: 'input_string',
            name: 'telephone',
            value: ''
          },
          {
            label: 'Food',
            placeholder: '£',
            input_type: 'input_string',
            name: 'food',
            value: ''
          },
          {
            label: 'Clothing',
            placeholder: '£',
            input_type: 'input_string',
            name: 'clothing',
            value: ''
          },
          {
            label: 'Hairdressing/Cosmetics',
            placeholder: '£',
            input_type: 'input_string',
            name: 'hairdressing_cosmetics',
            value: ''
          },
          {
            label: 'Memberships',
            placeholder: '£',
            input_type: 'input_string',
            name: 'memberships',
            value: ''
          },
          {
            label: 'Entertainment',
            placeholder: '£',
            input_type: 'input_string',
            name: 'entertainment',
            value: ''
          },
          {
            label: 'TV/Satellite/Internet',
            placeholder: '£',
            input_type: 'input_string',
            name: 'tv_satellite_internet',
            value: ''
          },
          {
            label: 'Life Assurance/Pension Plans',
            placeholder: '£',
            input_type: 'input_string',
            name: 'life_assurance_pension',
            value: ''
          },
          {
            label: 'Personal Loans',
            placeholder: '£',
            input_type: 'input_string',
            name: 'personal_loans',
            value: ''
          },
          {
            label: 'Credit Cards',
            placeholder: '£',
            input_type: 'input_string',
            name: 'credit_cards',
            value: ''
          },
          {
            label: 'Car Loans / Leasing Costs',
            placeholder: '£',
            input_type: 'input_string',
            name: 'car_loans_leasing',
            value: ''
          },
          {
            label: 'Car & Travel Insurance Premiums',
            placeholder: '£',
            input_type: 'input_string',
            name: 'car_travel_insurance',
            value: ''
          },
          {
            label: 'General Insurance Premiums',
            placeholder: '£',
            input_type: 'input_string',
            name: 'general_insurance_premiums',
            value: ''
          },
          {
            label: 'Housing Maintenance',
            placeholder: '£',
            input_type: 'input_string',
            name: 'housing_maintenance',
            value: ''
          },
          {
            label: 'Holidays',
            placeholder: '£',
            input_type: 'input_string',
            name: 'holidays',
            value: ''
          },
          {
            label: 'School Fees/Child Care',
            placeholder: '£',
            input_type: 'input_string',
            name: 'school_fees_childcare',
            value: ''
          },
          {
            label: 'Pets',
            placeholder: '£',
            input_type: 'input_string',
            name: 'pets',
            value: ''
          },
          {
            label: 'Other Expenditure',
            placeholder: '£',
            input_type: 'input_string',
            name: 'other_expenditure',
            value: ''
          }
        ]
      }
    ]
  },

  {
    id: 3,
    title: 'Mortgage Requirements',
    sections: [
      {
        sub_title: 'Future Plans & Changes',
        fields: [
          {
            label: 'Income/expenditure change plans (details)',
            placeholder: 'Describe changes',
            input_type: 'input_textarea',
            name: 'income_or_expenditure_change',
            value: ''
          },
          {
            label: 'Early mortgage repayment plans',
            placeholder: 'Describe plans',
            input_type: 'input_textarea',
            name: 'mortgage_payoff_plan',
            value: ''
          },
          {
            label: 'Moving home plans',
            placeholder: 'Describe plans',
            input_type: 'input_textarea',
            name: 'likely_to_move_home',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Mortgage Priorities',
        fields: [
          {
            label: 'Upper limit on costs',
            placeholder: 'Select option',
            input_type: 'input_dropdown',
            name: 'upper_limit_mortgage_costs',
            value: ''
          },
          {
            label: 'Fixed rate preference',
            placeholder: 'Select option',
            input_type: 'input_dropdown',
            name: 'fix_mortgage_costs',
            value: ''
          },
          {
            label: 'BoE-linked rate preference',
            placeholder: 'Select option',
            input_type: 'input_dropdown',
            name: 'rate_linked_to_boer',
            value: ''
          },
          {
            label: 'Discounted rate preference',
            placeholder: 'Select option',
            input_type: 'input_dropdown',
            name: 'early_year_discount',
            value: ''
          },
          {
            label: 'Cashback preference',
            placeholder: 'Select option',
            input_type: 'input_dropdown',
            name: 'cashback_access',
            value: ''
          },
          {
            label:
              'Priority features (no ERCs, legal fees, overpayments, etc.)',
            placeholder: 'Select option',
            input_type: 'input_dropdown',
            name: 'priority_features_misc',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Property & Loan Details',
        fields: [
          {
            label: 'Objective of borrowing',
            placeholder: 'Describe objective',
            input_type: 'input_textarea',
            name: 'objective_of_borrowing',
            value: ''
          },
          {
            label: 'Property use',
            placeholder: 'Select use',
            input_type: 'input_dropdown',
            name: 'property_use',
            value: '',
            options: [
              { label: 'Main residence', value: 'main_residence' },
              { label: 'Second home', value: 'second_home' },
              { label: 'Buy to Let (BTL)', value: 'btl' }
            ]
          },
          {
            label: 'Buyer situation',
            placeholder: 'Select situation',
            input_type: 'input_dropdown',
            name: 'buyer_situation',
            value: '',
            options: [
              { label: 'Current owner', value: 'current_owner' },
              { label: 'First-time buyer', value: 'first_time_buyer' },
              { label: 'Other', value: 'other' }
            ]
          },
          {
            label: 'Property value',
            placeholder: '£',
            input_type: 'input_number',
            name: 'property_value',
            value: 0
          },
          {
            label: 'Deposit',
            placeholder: '£',
            input_type: 'input_number',
            name: 'deposit_amount',
            value: 0
          },
          {
            label: 'Borrowing amount',
            placeholder: '£',
            input_type: 'input_number',
            name: 'borrowing_amount',
            value: 0
          },
          {
            label: 'Deposit source & verification documents',
            placeholder: 'Enter source & docs',
            input_type: 'input_textarea',
            name: 'deposit_source_and_docs',
            value: ''
          },
          {
            label: 'Additional funds',
            placeholder: '£ / details',
            input_type: 'input_textarea',
            name: 'additional_funds',
            value: ''
          },
          {
            label: 'Stamp duty details',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'stamp_duty_details',
            value: ''
          },
          {
            label: 'High-risk country deposit check',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'high_risk_country_deposit_check',
            value: ''
          },
          {
            label: 'Scheme applicability',
            placeholder: 'Select scheme',
            input_type: 'input_dropdown',
            name: 'scheme_applicability',
            value: '',
            options: [
              { label: 'Shared Ownership', value: 'shared_ownership' },
              { label: 'Equity', value: 'equity' },
              { label: 'Right to Buy', value: 'right_to_buy' }
            ]
          },
          {
            label: 'Loan to value',
            placeholder: '%',
            input_type: 'input_number',
            name: 'loan_to_value_percent',
            value: 0
          }
        ]
      },
      {
        sub_title: 'Mortgage Questionnaire',
        fields: [
          {
            label: 'Repayment method',
            placeholder: 'Enter method',
            input_type: 'input_string',
            name: 'repayment_method',
            value: ''
          },
          {
            label: 'Mortgage term preference',
            placeholder: 'Enter term (years)',
            input_type: 'input_string',
            name: 'mortgage_term_preference',
            value: ''
          },
          {
            label: 'Shorter term consideration',
            placeholder: 'Yes/No and notes',
            input_type: 'input_textarea',
            name: 'shorter_term_consideration',
            value: ''
          },
          {
            label:
              'Initial rate type preference & fixed rate impact acceptance',
            placeholder: 'Enter preference/acceptance',
            input_type: 'input_textarea',
            name: 'initial_rate_type_preference',
            value: ''
          },
          {
            label: 'ERC acceptance',
            placeholder: 'Yes/No and notes',
            input_type: 'input_textarea',
            name: 'erc_acceptance',
            value: ''
          },
          {
            label: 'Initial rate period preference',
            placeholder: 'Enter period',
            input_type: 'input_string',
            name: 'initial_rate_period_preference',
            value: ''
          },
          {
            label: 'Fee payment preference',
            placeholder: 'Add to loan / pay upfront / etc.',
            input_type: 'input_string',
            name: 'fee_payment_preference',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Additional Considerations',
        fields: [
          {
            label: 'Special considerations or service limitations',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'special_considerations_or_limitations',
            value: ''
          },
          {
            label: 'Attitude to mortgage repayment',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'attitude_to_mortgage_repayment',
            value: ''
          },
          {
            label: 'Interest-only details & repayment plan',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'interest_only_repayment_plan',
            value: ''
          },
          {
            label: 'Payments into retirement',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'payments_into_retirement',
            value: ''
          },
          {
            label: 'Debt consolidation details',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'debt_consolidation_details',
            value: ''
          },
          {
            label: 'New mortgage/loan details',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'new_mortgage_or_loan_details',
            value: ''
          },
          {
            label: 'Property characteristics',
            placeholder:
              'Type, tenure, bedrooms, kitchens, build year, extensions, construction, shared ownership %, body',
            input_type: 'input_textarea',
            name: 'property_characteristics',
            value: ''
          }
        ]
      }
    ]
  },

  {
    id: 4,
    title: 'Protection Needs',
    sections: [
      {
        sub_title: 'Lifestyle Protection Objectives',
        fields: [
          {
            label: 'How to maintain mortgage payments if sick/accident/death',
            placeholder: 'Enter plan',
            input_type: 'input_textarea',
            name: 'maintain_mortgage_payments_plan',
            value: ''
          },
          {
            label: 'How to maintain lifestyle if sick/accident/death',
            placeholder: 'Enter plan',
            input_type: 'input_textarea',
            name: 'maintain_lifestyle_plan',
            value: ''
          },
          {
            label: 'Protection needs selection',
            placeholder: 'Select needs',
            input_type: 'input_checklist',
            name: 'protection_needs',
            value: [
              { label: 'Death', value: 'death' },
              { label: 'Illness', value: 'illness' },
              { label: 'Funeral', value: 'funeral' },
              { label: 'Accident', value: 'accident' }
            ]
          },
          {
            label: 'Smoker status',
            placeholder: 'Enter status',
            input_type: 'input_string',
            name: 'smoker_status',
            value: ''
          },
          {
            label: 'Health issues',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'health_issues',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Existing Arrangements (Life, CI, IP, PMI)',
        fields: [
          {
            label: 'Owner (Client 1 / Client 2 / Joint)',
            placeholder: 'Enter owner',
            input_type: 'input_string',
            name: 'existing_owner',
            value: ''
          },
          {
            label: 'Provider',
            placeholder: 'Enter provider',
            input_type: 'input_string',
            name: 'existing_provider',
            value: ''
          },
          {
            label: 'Term',
            placeholder: 'Enter term',
            input_type: 'input_string',
            name: 'existing_term',
            value: ''
          },
          {
            label: 'Sum assured',
            placeholder: '£',
            input_type: 'input_string',
            name: 'existing_sum_assured',
            value: ''
          },
          {
            label: 'Type (level/decreasing)',
            placeholder: 'Enter type',
            input_type: 'input_string',
            name: 'existing_type',
            value: ''
          },
          {
            label: 'Purpose',
            placeholder: 'Enter purpose',
            input_type: 'input_string',
            name: 'existing_purpose',
            value: ''
          },
          {
            label: 'Premium & frequency',
            placeholder: 'Enter premium & frequency',
            input_type: 'input_string',
            name: 'existing_premium_frequency',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Policy Replacements',
        fields: [
          {
            label: 'Happy to replace policy?',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'replace_policy_happy',
            value: YES_NO
          },
          {
            label: 'Which policies?',
            placeholder: 'Enter policies',
            input_type: 'input_textarea',
            name: 'which_policies',
            value: ''
          },
          {
            label: 'Impact of cancellation on benefits',
            placeholder: 'Enter impact',
            input_type: 'input_textarea',
            name: 'cancellation_impact',
            value: ''
          },
          {
            label: 'Top-up without underwriting?',
            placeholder: 'Select option',
            input_type: 'input_radio',
            name: 'topup_without_underwriting',
            value: YES_NO
          },
          {
            label: 'Family history considerations',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'family_history_considerations',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Client Needs by Protection Type',
        fields: [
          {
            label: 'Income on death',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'need_income_on_death',
            value: ''
          },
          {
            label: 'Critical illness',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'need_critical_illness',
            value: ''
          },
          {
            label: 'Income on illness/redundancy',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'need_income_on_illness_or_redundancy',
            value: ''
          },
          {
            label: 'PMI',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'need_pmi',
            value: ''
          },
          {
            label: 'Mortgage debt repayment',
            placeholder: 'Enter details',
            input_type: 'input_textarea',
            name: 'need_mortgage_debt_repayment',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Trusts & Beneficiaries',
        fields: [
          {
            label: 'Beneficiary names & relationships',
            placeholder: 'Enter beneficiaries',
            input_type: 'input_textarea',
            name: 'beneficiaries',
            value: ''
          },
          {
            label: 'Trust status & type',
            placeholder: 'Enter trust details',
            input_type: 'input_textarea',
            name: 'trust_status_type',
            value: ''
          }
        ]
      }
    ]
  },

  {
    id: 5,
    title: 'Advisor Notes & Checklist',
    sections: [
      {
        sub_title: 'Case Notes & Recommendations',
        fields: [
          {
            label: 'Mortgage overview',
            placeholder: 'Enter overview',
            input_type: 'input_textarea',
            name: 'mortgage_overview',
            value: ''
          },
          {
            label: 'Protection overview',
            placeholder: 'Enter overview',
            input_type: 'input_textarea',
            name: 'protection_overview',
            value: ''
          },
          {
            label: 'Reasons behind lender selection',
            placeholder: 'Enter reasons',
            input_type: 'input_textarea',
            name: 'reasons_lender_selection',
            value: ''
          },
          {
            label: 'Mortgage term reason',
            placeholder: 'Enter reason',
            input_type: 'input_textarea',
            name: 'mortgage_term_reason',
            value: ''
          },
          {
            label: 'Mortgage amount reason',
            placeholder: 'Enter reason',
            input_type: 'input_textarea',
            name: 'mortgage_amount_reason',
            value: ''
          },
          {
            label: 'Rate type reason',
            placeholder: 'Enter reason',
            input_type: 'input_textarea',
            name: 'rate_type_reason',
            value: ''
          },
          {
            label: 'Initial rate period reason',
            placeholder: 'Enter reason',
            input_type: 'input_textarea',
            name: 'initial_rate_period_reason',
            value: ''
          },
          {
            label: 'Case notes',
            placeholder:
              'Scenario, mortgage type, repayment type, term, fixed period, fees, special notes',
            input_type: 'input_textarea',
            name: 'case_notes',
            value: ''
          }
        ]
      },
      {
        sub_title: 'Advisor Confirmation & Document Checklist',
        fields: [
          {
            label:
              'Confirmation checks (fact find match, due diligence, consumer duty)',
            placeholder: 'Enter confirmation notes',
            input_type: 'input_textarea',
            name: 'confirmation_checks',
            value: ''
          },
          {
            label: 'ID scans uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_id_scans',
            value: ''
          },
          {
            label: 'Bank statements uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_bank_statements',
            value: ''
          },
          {
            label: 'Debt statements uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_debt_statements',
            value: ''
          },
          {
            label: 'Income proof uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_income_proof',
            value: ''
          },
          {
            label: 'Lender docs uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_lender_docs',
            value: ''
          },
          {
            label: 'GDPR notice uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_gdpr_notice',
            value: ''
          },
          {
            label: 'Agreements uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_agreements',
            value: ''
          },
          {
            label: 'Protection declaration uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_protection_declaration',
            value: ''
          },
          {
            label: 'Budget planner uploaded',
            placeholder: 'Select option',
            input_type: 'file',
            name: 'docs_budget_planner',
            value: ''
          }
        ]
      }
    ]
  }
];

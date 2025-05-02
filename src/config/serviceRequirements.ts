export interface ServiceRequirements {
  [key: string]: {
    title: string;
    description: string;
    requiredDocuments: {
      name: string;
      description?: string;
      optional?: boolean;
    }[];
  };
}

export const SERVICE_REQUIREMENTS: ServiceRequirements = {
  'vat_management': {
    title: 'VAT Management',
    description: 'Opening, modification & closure assistance for traders, artisans, and freelancers',
    requiredDocuments: [
      { name: 'Valid ID (passport or national ID)' },
      { name: 'Tax Code (Codice Fiscale)' },
      { name: 'Residence permit (for non-EU citizens)' },
      { name: 'Business activity description (ATECO code)' },
      { name: 'Business address' },
      { name: 'IBAN or bank account details' },
      { name: 'Previous CUD (if modifying)' },
      { name: 'Proof of business location (e.g., rental agreement or utility bill)' },
      { name: 'Existing VAT registration (for modifications or closure)' },
      { name: 'AA9/12 form (if already filled)' },
      { name: 'Digital signature and PEC', optional: true }
    ]
  },
  'tax_declarations': {
    title: 'Tax Declarations',
    description: 'Single Model PF and 730 Tax Declarations',
    requiredDocuments: [
      { name: 'Valid ID and Tax Code' },
      { name: 'CUD or income certificate(s)' },
      { name: 'Previous year\'s tax return' },
      { name: 'Expense receipts (medical, school, transport, etc.)' },
      { name: 'Rent or mortgage contracts (if applicable)' },
      { name: 'Property ownership or rental documents' },
      { name: 'Donation receipts (non-profits or political parties)' },
      { name: 'Family details (e.g., dependent tax codes)' },
      { name: 'Bank IBAN (for tax refunds or payments)' },
      { name: 'Receipts for deductions (funeral, veterinary, etc.)' }
    ]
  },
  'immigration_services': {
    title: 'Immigration Services',
    description: 'Residence permits, citizenship, and family reunification',
    requiredDocuments: [
      { name: 'Valid passport' },
      { name: 'Residence permit (current or expired)' },
      { name: 'Codice Fiscale' },
      { name: 'Proof of residence' },
      { name: 'Family certificates (birth, marriage, etc.)' },
      { name: 'Income proof (CUD, payslips, tax returns)' },
      { name: 'Housing suitability certificate (for reunification)' },
      { name: 'Judicial certificate (criminal record check)' },
      { name: 'Document translations (where necessary)' },
      { name: 'Previous application receipts (if reapplying)' }
    ]
  },
  'inail_services': {
    title: 'INAIL Services',
    description: 'Work insurance and safety compliance',
    requiredDocuments: [
      { name: 'Valid ID and Codice Fiscale' },
      { name: 'Business registration certificate' },
      { name: 'ATECO code for activity type' },
      { name: 'Employee contracts (if any)' },
      { name: 'Workplace safety plan or assessment' },
      { name: 'Proof of office or workplace' },
      { name: 'Previous INAIL registration (for updates or closure)' }
    ]
  },
  'inps_services': {
    title: 'INPS Services',
    description: 'Social security and benefits management',
    requiredDocuments: [
      { name: 'Valid ID and Codice Fiscale' },
      { name: 'INPS registration number (if any)' },
      { name: 'Payslips or CUD for income proof' },
      { name: 'Family composition certificate' },
      { name: 'Pension contribution statements' },
      { name: 'IBAN for benefit payments' },
      { name: 'Medical reports (for disability or sickness benefits)' },
      { name: 'Unemployment history (if applicable)' }
    ]
  },
  'digital_identity': {
    title: 'Digital Identity',
    description: 'PEC and SPID digital identity services',
    requiredDocuments: [
      { name: 'Valid ID and Codice Fiscale' },
      { name: 'Mobile number and email' },
      { name: 'Selfie with ID (for identity verification)' },
      { name: 'Existing PEC (if transferring or modifying)' },
      { name: 'Utility bill or proof of residence (for address confirmation)' },
      { name: 'Video verification access (if required by provider)' }
    ]
  }
}; 
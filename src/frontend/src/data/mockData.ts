import type {
  DashboardStats,
  RecentDocument,
  ReportRow,
  VerificationRecord,
} from "@/types";

export const verificationRecords: VerificationRecord[] = [
  {
    id: "VR-231A9F4",
    documentType: "Aadhaar Card",
    documentNumber: "XXXX-XXXX-4821",
    holderName: "Rahul Sharma",
    date: "2026-08-27",
    status: "verified",
    confidenceScore: 96.2,
    extractedFields: {
      Name: "Rahul Sharma",
      "Date of Birth": "14 Mar 1992",
      Gender: "Male",
      Address: "42 MG Road, Bengaluru",
      "Aadhaar Number": "XXXX-XXXX-4821",
    },
    riskIndicators: [
      { label: "Template match", severity: "low" },
      { label: "Hologram integrity", severity: "low" },
    ],
    aiAnalysis:
      "Document matches the official Aadhaar template. Hologram and micro-text verified. No signs of tampering detected.",
  },
  {
    id: "VR-231B7C2",
    documentType: "PAN Card",
    documentNumber: "ABCDE1234F",
    holderName: "Priya Patel",
    date: "2026-08-27",
    status: "verified",
    confidenceScore: 94.8,
    extractedFields: {
      Name: "Priya Patel",
      "Father's Name": "Mahesh Patel",
      "PAN Number": "ABCDE1234F",
      "Date of Birth": "22 Sep 1988",
    },
    riskIndicators: [
      { label: "Font consistency", severity: "low" },
      { label: "Signature match", severity: "low" },
    ],
    aiAnalysis:
      "PAN card structure and typography match the NSDL template. Signature region consistent. Verification passed.",
  },
  {
    id: "VR-231C3D8",
    documentType: "Passport",
    documentNumber: "M4821937",
    holderName: "Arjun Nair",
    date: "2026-08-26",
    status: "suspicious",
    confidenceScore: 71.4,
    extractedFields: {
      Name: "Arjun Nair",
      "Passport Number": "M4821937",
      "Date of Birth": "05 Jan 1990",
      Nationality: "Indian",
      "Place of Issue": "Kochi",
    },
    riskIndicators: [
      { label: "MRZ checksum mismatch", severity: "high" },
      { label: "Photo tampering", severity: "medium" },
    ],
    aiAnalysis:
      "Machine-readable zone checksum does not validate. Minor inconsistencies in the photo region suggest possible tampering. Manual review recommended.",
  },
  {
    id: "VR-231D4E1",
    documentType: "Driving License",
    documentNumber: "DL-09-2020-88412",
    holderName: "Sneha Reddy",
    date: "2026-08-26",
    status: "verified",
    confidenceScore: 97.1,
    extractedFields: {
      Name: "Sneha Reddy",
      "License Number": "DL-09-2020-88412",
      "Date of Birth": "30 Nov 1994",
      "Valid Until": "29 Nov 2030",
    },
    riskIndicators: [{ label: "Barcode decode", severity: "low" }],
    aiAnalysis:
      "License hologram and barcode decode cleanly. All security features present and consistent with RTO issuance.",
  },
  {
    id: "VR-231E5F9",
    documentType: "Voter ID",
    documentNumber: "ABC1234567",
    holderName: "Vikram Singh",
    date: "2026-08-25",
    status: "fake",
    confidenceScore: 23.6,
    extractedFields: {
      Name: "Vikram Singh",
      "EPIC Number": "ABC1234567",
      "Date of Birth": "18 Feb 1985",
      Address: "12 Civil Lines, Lucknow",
    },
    riskIndicators: [
      { label: "Template mismatch", severity: "high" },
      { label: "Ghost image missing", severity: "high" },
      { label: "Watermark absent", severity: "high" },
    ],
    aiAnalysis:
      "Document does not match the official ECI template. Ghost image and watermark are missing. High probability of a forged document.",
  },
  {
    id: "VR-231F6A3",
    documentType: "Bank Statement",
    documentNumber: "HDFC-8821-009",
    holderName: "Ananya Iyer",
    date: "2026-08-25",
    status: "verified",
    confidenceScore: 95.6,
    extractedFields: {
      "Account Holder": "Ananya Iyer",
      "Account Number": "XXXX-XXXX-8821",
      Bank: "HDFC Bank",
      "Statement Period": "Jul 2026",
    },
    riskIndicators: [{ label: "Logo integrity", severity: "low" }],
    aiAnalysis:
      "Statement layout and bank logo match HDFC branding. Transaction entries are internally consistent.",
  },
  {
    id: "VR-231G7B5",
    documentType: "Aadhaar Card",
    documentNumber: "XXXX-XXXX-9034",
    holderName: "Mohammed Farhan",
    date: "2026-08-24",
    status: "suspicious",
    confidenceScore: 68.9,
    extractedFields: {
      Name: "Mohammed Farhan",
      "Date of Birth": "09 Jul 1987",
      Gender: "Male",
      Address: "7 Charminar Road, Hyderabad",
    },
    riskIndicators: [
      { label: "QR code invalid", severity: "high" },
      { label: "Photo blur", severity: "medium" },
    ],
    aiAnalysis:
      "QR code fails to decode against the UIDAI registry. Photo quality is degraded, which may indicate a reprint or alteration.",
  },
  {
    id: "VR-231H8C7",
    documentType: "PAN Card",
    documentNumber: "PQRS5678T",
    holderName: "Kavita Joshi",
    date: "2026-08-24",
    status: "verified",
    confidenceScore: 93.2,
    extractedFields: {
      Name: "Kavita Joshi",
      "Father's Name": "Ramesh Joshi",
      "PAN Number": "PQRS5678T",
      "Date of Birth": "12 Apr 1991",
    },
    riskIndicators: [{ label: "Font consistency", severity: "low" }],
    aiAnalysis:
      "PAN typography and layout match the official template. Verification passed without anomalies.",
  },
  {
    id: "VR-231I9D2",
    documentType: "Passport",
    documentNumber: "K9012345",
    holderName: "Rohan Mehta",
    date: "2026-08-23",
    status: "fake",
    confidenceScore: 18.3,
    extractedFields: {
      Name: "Rohan Mehta",
      "Passport Number": "K9012345",
      "Date of Birth": "03 Jun 1983",
      Nationality: "Indian",
    },
    riskIndicators: [
      { label: "MRZ checksum mismatch", severity: "high" },
      { label: "Paper stock anomaly", severity: "high" },
      { label: "UV feature absent", severity: "high" },
    ],
    aiAnalysis:
      "Multiple security features are missing or inconsistent. Paper stock does not match passport-grade material. Document flagged as counterfeit.",
  },
  {
    id: "VR-231J0E6",
    documentType: "Driving License",
    documentNumber: "DL-04-2018-22109",
    holderName: "Neha Gupta",
    date: "2026-08-23",
    status: "verified",
    confidenceScore: 96.8,
    extractedFields: {
      Name: "Neha Gupta",
      "License Number": "DL-04-2018-22109",
      "Date of Birth": "27 Aug 1996",
      "Valid Until": "26 Aug 2034",
    },
    riskIndicators: [{ label: "Hologram integrity", severity: "low" }],
    aiAnalysis:
      "License hologram and micro-print verified. All security features present and consistent with RTO issuance.",
  },
  {
    id: "VR-231K1F8",
    documentType: "Voter ID",
    documentNumber: "XYZ9876543",
    holderName: "Sanjay Kumar",
    date: "2026-08-22",
    status: "suspicious",
    confidenceScore: 62.7,
    extractedFields: {
      Name: "Sanjay Kumar",
      "EPIC Number": "XYZ9876543",
      "Date of Birth": "21 Dec 1980",
      Address: "5 Park Street, Kolkata",
    },
    riskIndicators: [
      { label: "Ghost image faint", severity: "medium" },
      { label: "Address mismatch", severity: "medium" },
    ],
    aiAnalysis:
      "Ghost image is faint and the address does not match the declared constituency. Manual verification recommended.",
  },
  {
    id: "VR-231L2G1",
    documentType: "Bank Statement",
    documentNumber: "ICICI-4410-112",
    holderName: "Divya Menon",
    date: "2026-08-22",
    status: "verified",
    confidenceScore: 94.1,
    extractedFields: {
      "Account Holder": "Divya Menon",
      "Account Number": "XXXX-XXXX-4410",
      Bank: "ICICI Bank",
      "Statement Period": "Jun 2026",
    },
    riskIndicators: [{ label: "Logo integrity", severity: "low" }],
    aiAnalysis:
      "Statement matches ICICI branding and layout. Transaction entries are internally consistent and legible.",
  },
];

export const dashboardStats: DashboardStats = {
  totalVerifications: 124567,
  verified: 91304,
  suspicious: 19102,
  fake: 14161,
  confidenceAverage: 94.2,
  trend: [82, 88, 85, 91, 94, 92, 96, 95, 97, 94, 98, 96],
};

export const recentDocuments: RecentDocument[] = verificationRecords
  .slice(0, 6)
  .map(({ id, documentType, holderName, date, status, confidenceScore }) => ({
    id,
    documentType,
    holderName,
    date,
    status,
    confidenceScore,
  }));

export const reportRows: ReportRow[] = [
  { id: "rep-1", label: "Aadhaar Card", value: 41230, change: 12.4 },
  { id: "rep-2", label: "PAN Card", value: 28710, change: 8.1 },
  { id: "rep-3", label: "Passport", value: 19420, change: -3.2 },
  { id: "rep-4", label: "Driving License", value: 22105, change: 5.6 },
  { id: "rep-5", label: "Voter ID", value: 8732, change: 2.9 },
  { id: "rep-6", label: "Bank Statement", value: 4370, change: -1.4 },
];

export const statusCounts = {
  verified: dashboardStats.verified,
  suspicious: dashboardStats.suspicious,
  fake: dashboardStats.fake,
  pending: 0,
};

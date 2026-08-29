export type VerificationStatus = "verified" | "suspicious" | "fake" | "pending";

export type DocumentType =
  | "Aadhaar Card"
  | "PAN Card"
  | "Passport"
  | "Driving License"
  | "Voter ID"
  | "Bank Statement";

export type RiskSeverity = "low" | "medium" | "high";

export interface RiskIndicator {
  label: string;
  severity: RiskSeverity;
}

export interface AIAnalysis {
  summary: string;
  confidence: number;
  indicators: RiskIndicator[];
  extractedFields: Record<string, string>;
}

export interface VerificationRecord {
  id: string;
  documentType: DocumentType;
  documentNumber: string;
  holderName: string;
  date: string;
  status: VerificationStatus;
  confidenceScore: number;
  extractedFields: Record<string, string>;
  riskIndicators: RiskIndicator[];
  aiAnalysis: string;
}

export interface DashboardStats {
  totalVerifications: number;
  verified: number;
  suspicious: number;
  fake: number;
  confidenceAverage: number;
  trend: number[];
}

export interface RecentDocument {
  id: string;
  documentType: DocumentType;
  holderName: string;
  date: string;
  status: VerificationStatus;
  confidenceScore: number;
}

export interface ReportRow {
  id: string;
  label: string;
  value: number;
  change: number;
}

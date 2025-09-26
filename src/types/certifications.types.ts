export interface CertificationTypes {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  validUntil: string;
  credentialId: string;
  description: string;
  skills: string[];
  image: string;
  downloadUrl: string;
  verificationUrl: string;
  featured: boolean;
}

// certifications.types.ts
export interface CertificationTypes {
  id: number;
  title: string;
  issuer: string;
  issueDate: string;
  validUntil: string | null;
  credentialId: string | null;
  description: string;
  skills: string[];
  verificationUrl: string;
  image: string;
  downloadUrl: string;
  featured?: boolean;
  categories: Array<
    | "web"
    | "mobile"
    | "desktop"
    | "backend"
    | "cloud-database"
    | "ai"
    | "general"
    | "office"
    | "frontend"
  >;
}

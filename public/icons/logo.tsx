// Buat mapping icons di TechStackDetail.tsx
import {
  Code2,
  Boxes,
  Globe,
  Server,
  Database,
  Terminal,
  Cloud,
  Cpu,
  Bot,
} from "lucide-react";
import Image from "next/image";

const techIcons: Record<string, JSX.Element> = {
  React: <Image src="/icons/react.svg" alt="React" width={20} height={20} />,
  "Next.js": (
    <Image src="/icons/nextjs.svg" alt="Next.js" width={20} height={20} />
  ),
  TypeScript: (
    <Image src="/icons/typescript.svg" alt="TS" width={20} height={20} />
  ),
  JavaScript: (
    <Image src="/icons/javascript.svg" alt="JS" width={20} height={20} />
  ),
  "Node.js": (
    <Image src="/icons/nodejs.svg" alt="Node.js" width={20} height={20} />
  ),
  Express: (
    <Image src="/icons/express.svg" alt="Express" width={20} height={20} />
  ),
  MongoDB: (
    <Image src="/icons/mongodb.svg" alt="MongoDB" width={20} height={20} />
  ),
  PostgreSQL: (
    <Image src="/icons/postgresql.svg" alt="Postgres" width={20} height={20} />
  ),
  Docker: <Image src="/icons/docker.svg" alt="Docker" width={20} height={20} />,
  TensorFlow: (
    <Image
      src="/icons/tensorflow.svg"
      alt="TensorFlow"
      width={20}
      height={20}
    />
  ),
  PyTorch: (
    <Image src="/icons/pytorch.svg" alt="PyTorch" width={20} height={20} />
  ),
  // default fallback
  default: <Code2 className="w-5 h-5 text-muted-foreground" />,
};

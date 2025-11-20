import {
  Link2,
  Share2,
  Download,
  Maximize2,
  Eye,
  FileDown,
} from "lucide-react";
import { Button } from "@/components/ui/button";

type ActionBarProps = {
  onDownload: () => void;
  onGenerate: () => void;
  onShare: () => void;
  onCopy: () => void;
  demoUrl: string;
};

export const ActionBar = ({
  onCopy,
  onDownload,
  onGenerate,
  onShare,
  demoUrl,
}: ActionBarProps) => {
  const openDemo = () =>
    window.open(demoUrl, "_blank", "noopener,noreferrer");

  return (
    <div className="grid gap-3 rounded-2xl border border-white/10 bg-white/5 p-4 sm:grid-cols-2">
      <Button
        onClick={onDownload}
        variant="outline"
        className="magnetic-button border-cyan-400/50 text-cyan-200 hover:bg-cyan-500/10"
      >
        <Download className="h-4 w-4" />
        Download
      </Button>
      <Button
        onClick={onGenerate}
        className="magnetic-button bg-purple-500/80 text-white hover:bg-purple-500"
      >
        <FileDown className="h-4 w-4" />
        Generate
      </Button>
      <Button
        onClick={onShare}
        variant="ghost"
        className="magnetic-button text-emerald-200 hover:bg-emerald-400/10"
      >
        <Share2 className="h-4 w-4" />
        Share
      </Button>
      <Button
        onClick={onCopy}
        variant="ghost"
        className="magnetic-button text-white/80 hover:bg-white/10"
      >
        <Link2 className="h-4 w-4" />
        Copy link
      </Button>
      <Button
        onClick={openDemo}
        variant="outline"
        className="magnetic-button border-white/20 text-white/80 hover:bg-white/10"
      >
        <Eye className="h-4 w-4" />
        Preview
      </Button>
      <Button
        onClick={openDemo}
        variant="outline"
        className="magnetic-button border-white/20 text-white/80 hover:bg-white/10"
      >
        <Maximize2 className="h-4 w-4" />
        Fullscr
      </Button>
    </div>
  );
};


import { useState } from "react";
import { BadgeCheck, RotateCw } from "lucide-react";
import { Button } from "@/components/ui/button";

export function CertificateCard({ title, issuer, duplicate = false }: { title: string; issuer: string; duplicate?: boolean }) {
  const [flipped, setFlipped] = useState(false);
  return (
    <article className="certificate-card" data-flipped={flipped}>
      <div className="certificate-inner">
        <div className="certificate-face certificate-front">
          <BadgeCheck className="size-8 text-verified" />
          <h3 className="text-xl font-medium">{title}</h3>
          <div className="flex items-center justify-between gap-3">
            <p className="font-mono text-sm text-muted-foreground">{issuer}</p>
            <Button variant="ghost" size="icon" tabIndex={duplicate ? -1 : 0} aria-label={`Flip ${title}`} title="Flip certificate" onClick={() => setFlipped(true)}><RotateCw /></Button>
          </div>
        </div>
        <div className="certificate-face certificate-back">
          <p className="label-mono">Certificate · {issuer}</p>
          <h3 className="text-xl font-medium">{title}</h3>
          <p className="text-sm text-muted-foreground">Vidit Sharma</p>
          <Button variant="outline" tabIndex={duplicate || !flipped ? -1 : 0} onClick={() => setFlipped(false)}><RotateCw /> Front</Button>
        </div>
      </div>
    </article>
  );
}
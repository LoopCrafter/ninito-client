"use client";
import DOMPurify from "dompurify";
import { useMemo } from "react";

type ClientSanitizerProps = {
  html: string;
};

const ClientSanitizer: React.FC<ClientSanitizerProps> = ({ html }) => {
  const sanitizedHtml = useMemo(() => {
    if (typeof window === "undefined") return html;
    return DOMPurify.sanitize(html);
  }, [html]);

  return (
    <div
      className="text-muted-foreground leading-relaxed whitespace-pre-line"
      dangerouslySetInnerHTML={{ __html: sanitizedHtml }}
    />
  );
};

export default ClientSanitizer;

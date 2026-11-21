// Drafts show locally and on Vercel preview builds; production shows them only when the flag is "true".
export function isPreviewEnabled(flag: string | undefined, vercelEnv: string | undefined): boolean {
  if (flag === "true") return true;
  if (flag === "false") return false;
  return vercelEnv !== "production";
}

export const CONTENT_PREVIEW = isPreviewEnabled(
  process.env.NEXT_PUBLIC_CONTENT_PREVIEW,
  process.env.NEXT_PUBLIC_VERCEL_ENV,
);

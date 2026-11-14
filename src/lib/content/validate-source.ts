import officialSources from "@/content/official_sources.json";

type OfficialSource = {
  name: string;
  domain: string;
  allow_subdomains: boolean;
};

const sources: OfficialSource[] = officialSources.sources;

/**
 * Returns true if the URL is from an official government source.
 * Rules:
 * - Must use https://
 * - Domain must exactly match an official domain, or be a subdomain of it
 *   (only when allow_subdomains is true for that domain)
 */
export function isOfficialSourceUrl(url: string): boolean {
  if (!url.startsWith("https://")) return false;

  let hostname: string;
  try {
    hostname = new URL(url).hostname.toLowerCase();
  } catch {
    return false;
  }

  for (const source of sources) {
    const domain = source.domain.toLowerCase();
    if (hostname === domain) return true;
    if (source.allow_subdomains && hostname.endsWith("." + domain)) return true;
  }

  return false;
}

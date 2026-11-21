import { isVisible, type Reviewable } from "@/lib/bat-dau";
import type { PortalLink } from "@/lib/tu-0-den-1";

export type ClickStep = {
  action: string;
  detail?: string;
  image?: string;
  image_alt?: string;
  image_width?: number;
  image_height?: number;
  source?: string;
};

export type ThaoTacGuide = Reviewable & {
  slug: string;
  title: string;
  summary: string;
  portal: PortalLink;
  need_login: boolean;
  prepare: string[];
  steps: ClickStep[];
  related_steps: string[];
};

export type ThaoTacContent = {
  updated_at: string;
  todo_for_reviewer: string[];
  guides: ThaoTacGuide[];
};

export type GuideLinks = Record<string, { slug: string; title: string }>;

export function visibleGuides(content: ThaoTacContent, preview: boolean): ThaoTacGuide[] {
  return content.guides.filter((guide) => isVisible(guide.status, preview));
}

export function guideLinksByStep(guides: ThaoTacGuide[]): GuideLinks {
  const links: GuideLinks = {};
  for (const guide of guides) {
    for (const stepId of guide.related_steps) {
      links[stepId] ??= { slug: guide.slug, title: guide.title };
    }
  }
  return links;
}

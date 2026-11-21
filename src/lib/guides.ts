export type GuideSection = {
  heading: string;
  content: string;
};

export type Guide = {
  slug: string;
  status: "draft" | "in_review" | "reviewed" | "published";
  sample_notice?: string;
  title: string;
  category: string;
  summary: string;
  related_rules: string[];
  body_sections: GuideSection[];
  todo_for_reviewer: string[];
  updated_at: string;
};

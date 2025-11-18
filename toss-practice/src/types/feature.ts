type FeatureStatus = "enabled" | "disabled";

type Audience = "all" | "internal" | "beta";

export interface Feature {
  id: string;
  name: string;
  description: string;
  status: FeatureStatus;
  audience: Audience;
}

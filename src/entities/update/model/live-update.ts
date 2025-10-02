export type UpdatePriority = "high" | "medium" | "low";

export interface LiveUpdate {
  icon: string;
  title: string;
  description: string;
  time: string;
  priority: UpdatePriority;
}

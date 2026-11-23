export const TICKET_CATEGORIES = [
  "ACCOUNT_ACCESS",
  "BILLING_PAYMENT",
  "ATTENDANCE",
  "TRAINING_DIET",
  "EQUIPMENT_FACILITY",
  "APP_TECHNICAL",
  "OTHER",
] as const;

export type TicketCategory = (typeof TICKET_CATEGORIES)[number];

export const TICKET_CATEGORY_LABELS: Record<TicketCategory, string> = {
  ACCOUNT_ACCESS: "Account & access",
  BILLING_PAYMENT: "Billing & payments",
  ATTENDANCE: "Attendance",
  TRAINING_DIET: "Training & diet",
  EQUIPMENT_FACILITY: "Equipment & facilities",
  APP_TECHNICAL: "App or technical issue",
  OTHER: "Other",
};

export const TICKET_PRIORITIES = ["LOW", "MEDIUM", "HIGH"] as const;
export type TicketPriority = (typeof TICKET_PRIORITIES)[number];

export const TICKET_STATUSES = [
  "NEW",
  "IN_PROGRESS",
  "ON_HOLD",
  "RESOLVED",
  "CLOSED",
] as const;
export type TicketStatus = (typeof TICKET_STATUSES)[number];

export const TICKET_STATUS_LABELS: Record<TicketStatus, string> = {
  NEW: "New",
  IN_PROGRESS: "In progress",
  ON_HOLD: "On hold",
  RESOLVED: "Resolved",
  CLOSED: "Closed",
};

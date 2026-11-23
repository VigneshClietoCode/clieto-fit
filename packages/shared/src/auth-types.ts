export type Role = "SUPER_ADMIN" | "ADMIN" | "USER";

export type Principal = {
  id: string;
  email: string;
  name: string;
  phone?: string | null;
  role: Role;
  gymId: string | null;
  gymName: string | null;
  gymTimezone: string | null;
  feeId: string | null;
};

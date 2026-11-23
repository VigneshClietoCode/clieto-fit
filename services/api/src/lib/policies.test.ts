import assert from "node:assert/strict";
import test from "node:test";
import { ApiError, requireRoles } from "./api";
import {
  currentBillingMonth,
  billingMonthForTimeZone,
  canTransitionTicketStatus,
  isPaymentFullyPaid,
  localDateForTimeZone,
  ticketNotificationWhere,
} from "./policies";
import { contactPhoneSchema } from "./validation";

test("attendance dates use the gym timezone, including day boundaries", () => {
  const instant = new Date("2026-03-01T01:30:00.000Z");
  assert.equal(localDateForTimeZone(instant, "America/Los_Angeles"), "2026-02-28");
  assert.equal(localDateForTimeZone(instant, "Asia/Kolkata"), "2026-03-01");
});

test("only a fully covered PAID record counts as paid", () => {
  assert.equal(isPaymentFullyPaid("PAID", 5000, 5000), true);
  assert.equal(isPaymentFullyPaid("PAID", 4999, 5000), false);
  assert.equal(isPaymentFullyPaid("PARTIAL", 5000, 5000), false);
  assert.equal(isPaymentFullyPaid("OVERDUE", 5000, 5000), false);
  assert.equal(isPaymentFullyPaid("REFUNDED", 5000, 5000), false);
});

test("server role checks deny members from admin-only operations", () => {
  assert.throws(
    () => requireRoles({ role: "USER" }, ["ADMIN"]),
    (error: unknown) => error instanceof ApiError && error.status === 403,
  );
  assert.doesNotThrow(() => requireRoles({ role: "ADMIN" }, ["ADMIN", "SUPER_ADMIN"]));
});

test("gym admins and members can create support tickets", () => {
  assert.doesNotThrow(() => requireRoles({ role: "ADMIN" }, ["ADMIN", "USER"]));
  assert.doesNotThrow(() => requireRoles({ role: "USER" }, ["ADMIN", "USER"]));
  assert.throws(
    () => requireRoles({ role: "SUPER_ADMIN" }, ["ADMIN", "USER"]),
    (error: unknown) => error instanceof ApiError && error.status === 403,
  );
});

test("billing periods use a stable YYYY-MM format", () => {
  assert.equal(currentBillingMonth(new Date("2026-01-31T23:59:00.000Z")), "2026-01");
  assert.equal(
    billingMonthForTimeZone(new Date("2026-03-01T02:00:00.000Z"), "America/Los_Angeles"),
    "2026-02",
  );
});

test("ticket status transitions follow the support workflow", () => {
  assert.equal(canTransitionTicketStatus("NEW", "IN_PROGRESS"), true);
  assert.equal(canTransitionTicketStatus("IN_PROGRESS", "ON_HOLD"), true);
  assert.equal(canTransitionTicketStatus("RESOLVED", "IN_PROGRESS"), true);
  assert.equal(canTransitionTicketStatus("RESOLVED", "CLOSED"), true);
  assert.equal(canTransitionTicketStatus("CLOSED", "IN_PROGRESS"), false);
  assert.equal(canTransitionTicketStatus("NEW", "CLOSED"), false);
});

test("ticket notification counts are scoped to the current account", () => {
  const since = new Date("2026-11-23T12:00:00.000Z");
  assert.deepEqual(ticketNotificationWhere({ id: "super", role: "SUPER_ADMIN" }, since), {
    updatedAt: { gt: since },
  });
  for (const role of ["ADMIN", "USER"]) {
    assert.deepEqual(ticketNotificationWhere({ id: "requester", role }, since), {
      updatedAt: { gt: since },
      reporterId: "requester",
    });
  }
});

test("contact numbers accept formatted international digits and reject invalid values", () => {
  assert.equal(contactPhoneSchema.parse("+91 (98765) 43210"), "+91 (98765) 43210");
  assert.equal(contactPhoneSchema.safeParse("123-ABC").success, false);
  assert.equal(contactPhoneSchema.safeParse("+123456").success, false);
});

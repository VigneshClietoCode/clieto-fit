module.exports = [
"[externals]/crypto [external] (crypto, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("crypto", () => require("crypto"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/@opentelemetry/api [external] (next/dist/compiled/@opentelemetry/api, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/@opentelemetry/api", () => require("next/dist/compiled/@opentelemetry/api"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-page-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-page-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-page-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/compiled/next-server/app-route-turbo.runtime.dev.js [external] (next/dist/compiled/next-server/app-route-turbo.runtime.dev.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js", () => require("next/dist/compiled/next-server/app-route-turbo.runtime.dev.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/action-async-storage.external.js [external] (next/dist/server/app-render/action-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/action-async-storage.external.js", () => require("next/dist/server/app-render/action-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/after-task-async-storage.external.js [external] (next/dist/server/app-render/after-task-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/after-task-async-storage.external.js", () => require("next/dist/server/app-render/after-task-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-async-storage.external.js [external] (next/dist/server/app-render/work-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-async-storage.external.js", () => require("next/dist/server/app-render/work-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/app-render/work-unit-async-storage.external.js [external] (next/dist/server/app-render/work-unit-async-storage.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/app-render/work-unit-async-storage.external.js", () => require("next/dist/server/app-render/work-unit-async-storage.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/server/runtime-reacts.external.js [external] (next/dist/server/runtime-reacts.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/server/runtime-reacts.external.js", () => require("next/dist/server/runtime-reacts.external.js"));

module.exports = mod;
}),
"[externals]/next/dist/shared/lib/no-fallback-error.external.js [external] (next/dist/shared/lib/no-fallback-error.external.js, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("next/dist/shared/lib/no-fallback-error.external.js", () => require("next/dist/shared/lib/no-fallback-error.external.js"));

module.exports = mod;
}),
"[externals]/node:stream [external] (node:stream, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("node:stream", () => require("node:stream"));

module.exports = mod;
}),
"[externals]/path [external] (path, cjs)", ((__turbopack_context__, module, exports) => {

var mod = __turbopack_context__.x("path", () => require("path"));

module.exports = mod;
}),
"[project]/src/app/api/portal/route.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "GET",
    ()=>GET
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/api.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/db.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$policies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/src/lib/policies.ts [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
;
;
;
;
async function GET() {
    try {
        const principal = await (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["requirePrincipal"])();
        if (principal.role === "SUPER_ADMIN") {
            const [gyms, admins, members, activeGyms] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].gym.count(),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.count({
                    where: {
                        role: "ADMIN"
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.count({
                    where: {
                        role: "USER"
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].gym.count({
                    where: {
                        status: "ACTIVE"
                    }
                })
            ]);
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                user: principal,
                metrics: {
                    gyms,
                    admins,
                    members,
                    activeGyms
                }
            });
        }
        const gymId = principal.gymId;
        if (!gymId) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Gym access is required."
        }, {
            status: 403
        });
        const gym = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].gym.findUnique({
            where: {
                id: gymId
            },
            select: {
                id: true,
                name: true,
                slug: true,
                timezone: true,
                logoUrl: true
            }
        });
        if (!gym) return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Gym not found."
        }, {
            status: 404
        });
        const today = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$policies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["localDateForTimeZone"])(new Date(), gym.timezone);
        const billingMonth = (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$policies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["billingMonthForTimeZone"])(new Date(), gym.timezone);
        if (principal.role === "ADMIN") {
            const [members, attendanceToday, eligibleMembers, unassignedFees] = await Promise.all([
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.count({
                    where: {
                        gymId,
                        role: "USER",
                        status: "ACTIVE"
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attendance.count({
                    where: {
                        gymId,
                        localDate: today
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.findMany({
                    where: {
                        gymId,
                        role: "USER",
                        status: "ACTIVE",
                        fee: {
                            is: {
                                active: true
                            }
                        }
                    },
                    select: {
                        id: true
                    }
                }),
                __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].user.count({
                    where: {
                        gymId,
                        role: "USER",
                        status: "ACTIVE",
                        OR: [
                            {
                                feeId: null
                            },
                            {
                                fee: {
                                    is: {
                                        active: false
                                    }
                                }
                            }
                        ]
                    }
                })
            ]);
            const payments = eligibleMembers.length ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].payment.findMany({
                where: {
                    gymId,
                    billingMonth,
                    memberId: {
                        in: eligibleMembers.map((member)=>member.id)
                    }
                },
                select: {
                    memberId: true,
                    amountCents: true,
                    expectedCents: true,
                    status: true
                }
            }) : [];
            const paidMemberIds = new Set(payments.filter((payment)=>(0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$policies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isPaymentFullyPaid"])(payment.status, payment.amountCents, payment.expectedCents)).map((payment)=>payment.memberId));
            return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
                user: principal,
                gym,
                metrics: {
                    members,
                    attendanceToday,
                    billingMonth,
                    paidMembers: paidMemberIds.size,
                    unpaidMembers: eligibleMembers.length - paidMemberIds.size,
                    unassignedFees
                }
            });
        }
        const payment = await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].payment.findUnique({
            where: {
                gymId_memberId_billingMonth: {
                    gymId,
                    memberId: principal.id,
                    billingMonth
                }
            },
            select: {
                status: true,
                amountCents: true,
                expectedCents: true,
                dueAt: true
            }
        });
        const fee = principal.feeId ? await __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].feeStructure.findFirst({
            where: {
                id: principal.feeId,
                gymId,
                active: true
            },
            select: {
                name: true,
                amountCents: true
            }
        }) : null;
        const [trainingPlans, dietPlans, attendanceCount] = await Promise.all([
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].trainingPlan.count({
                where: {
                    gymId,
                    memberId: principal.id
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].dietPlan.count({
                where: {
                    gymId,
                    memberId: principal.id
                }
            }),
            __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$db$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["db"].attendance.count({
                where: {
                    gymId,
                    userId: principal.id
                }
            })
        ]);
        const paid = payment ? (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$policies$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["isPaymentFullyPaid"])(payment.status, payment.amountCents, payment.expectedCents) : false;
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            user: principal,
            gym,
            metrics: {
                billingMonth,
                fee,
                paymentStatus: paid ? "PAID" : payment?.status ?? "UNRECORDED",
                amountPaidCents: payment?.amountCents ?? 0,
                dueAt: payment?.dueAt ?? null,
                trainingPlans,
                dietPlans,
                attendanceCount
            }
        });
    } catch (error) {
        return (0, __TURBOPACK__imported__module__$5b$project$5d2f$src$2f$lib$2f$api$2e$ts__$5b$app$2d$route$5d$__$28$ecmascript$29$__["handleApiError"])(error);
    }
}
}),
"[project]/src/lib/api.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "ApiError",
    ()=>ApiError,
    "assertSameOrigin",
    ()=>assertSameOrigin,
    "handleApiError",
    ()=>handleApiError,
    "readJson",
    ()=>readJson,
    "requirePrincipal",
    ()=>requirePrincipal,
    "requireRoles",
    ()=>requireRoles
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/server.js [app-route] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/zod/v4/classic/errors.js [app-route] (ecmascript)");
;
;
class ApiError extends Error {
    status;
    constructor(message, status){
        super(message), this.status = status;
        this.name = "ApiError";
    }
}
async function handleApiError(error) {
    if (error instanceof ApiError) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: error.message
        }, {
            status: error.status
        });
    }
    if (error instanceof __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$zod$2f$v4$2f$classic$2f$errors$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["ZodError"]) {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "Please check the submitted information.",
            details: error.issues.map((issue)=>({
                    path: issue.path.join("."),
                    message: issue.message
                }))
        }, {
            status: 400
        });
    }
    if (typeof error === "object" && error !== null && "code" in error && error.code === "P2002") {
        return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
            error: "That record already exists."
        }, {
            status: 409
        });
    }
    console.error(JSON.stringify({
        event: "api_request_failed"
    }));
    return __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$server$2e$js__$5b$app$2d$route$5d$__$28$ecmascript$29$__["NextResponse"].json({
        error: "The request could not be completed."
    }, {
        status: 500
    });
}
function assertSameOrigin(request) {
    const origin = request.headers.get("origin");
    const forwardedHost = request.headers.get("x-forwarded-host")?.split(",")[0]?.trim();
    const host = forwardedHost ?? request.headers.get("host");
    const forwardedProtocol = request.headers.get("x-forwarded-proto")?.split(",")[0]?.trim();
    const protocol = forwardedProtocol ?? new URL(request.url).protocol.slice(0, -1);
    const requestOrigin = host ? `${protocol}://${host}` : "";
    if (!origin || origin !== requestOrigin) {
        throw new ApiError("Request origin could not be verified.", 403);
    }
}
async function readJson(request) {
    try {
        return await request.json();
    } catch  {
        throw new ApiError("Request body must be valid JSON.", 400);
    }
}
async function requirePrincipal() {
    const { getPrincipal } = await __turbopack_context__.A("[project]/src/lib/auth.ts [app-route] (ecmascript, async loader)");
    const principal = await getPrincipal();
    if (!principal) throw new ApiError("Authentication required.", 401);
    return principal;
}
function requireRoles(principal, roles) {
    if (!roles.includes(principal.role)) {
        throw new ApiError("You do not have permission to perform this action.", 403);
    }
}
}),
"[project]/src/lib/db.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "db",
    ()=>db
]);
var __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__ = __turbopack_context__.i("[externals]/@prisma/client [external] (@prisma/client, cjs, [project]/node_modules/@prisma/client)");
;
const globalForPrisma = globalThis;
const db = globalForPrisma.prisma ?? new __TURBOPACK__imported__module__$5b$externals$5d2f40$prisma$2f$client__$5b$external$5d$__$2840$prisma$2f$client$2c$__cjs$2c$__$5b$project$5d2f$node_modules$2f40$prisma$2f$client$29$__["PrismaClient"]({
    log: ("TURBOPACK compile-time truthy", 1) ? [
        "warn",
        "error"
    ] : "TURBOPACK unreachable"
});
if ("TURBOPACK compile-time truthy", 1) globalForPrisma.prisma = db;
}),
"[project]/src/lib/policies.ts [app-route] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "billingMonthForTimeZone",
    ()=>billingMonthForTimeZone,
    "currentBillingMonth",
    ()=>currentBillingMonth,
    "isPaymentFullyPaid",
    ()=>isPaymentFullyPaid,
    "localDateForTimeZone",
    ()=>localDateForTimeZone
]);
function localDateForTimeZone(date, timeZone) {
    const parts = new Intl.DateTimeFormat("en-CA", {
        timeZone,
        year: "numeric",
        month: "2-digit",
        day: "2-digit"
    }).formatToParts(date);
    const values = Object.fromEntries(parts.map((part)=>[
            part.type,
            part.value
        ]));
    return `${values.year}-${values.month}-${values.day}`;
}
function isPaymentFullyPaid(status, amountCents, expectedCents) {
    return status === "PAID" && amountCents >= expectedCents;
}
function currentBillingMonth(date = new Date()) {
    return `${date.getUTCFullYear()}-${String(date.getUTCMonth() + 1).padStart(2, "0")}`;
}
function billingMonthForTimeZone(date, timeZone) {
    return localDateForTimeZone(date, timeZone).slice(0, 7);
}
}),
];

//# sourceMappingURL=%5Broot-of-the-server%5D__0ted0xgy8z825._.js.map
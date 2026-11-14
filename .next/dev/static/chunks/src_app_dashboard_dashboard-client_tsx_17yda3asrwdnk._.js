(globalThis["TURBOPACK"] || (globalThis["TURBOPACK"] = [])).push([typeof document === "object" ? document.currentScript : undefined,
"[project]/src/app/dashboard/dashboard-client.tsx [app-client] (ecmascript)", ((__turbopack_context__) => {
"use strict";

__turbopack_context__.s([
    "default",
    ()=>DashboardClient
]);
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/jsx-dev-runtime.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/dist/compiled/react/index.js [app-client] (ecmascript)");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__ = __turbopack_context__.i("[project]/node_modules/next/dist/client/image-component.js [app-client] (ecmascript) <export Image as default>");
var __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__ = __turbopack_context__.i("[project]/node_modules/next/navigation.js [app-client] (ecmascript)");
;
var _s = __turbopack_context__.k.signature(), _s1 = __turbopack_context__.k.signature(), _s2 = __turbopack_context__.k.signature(), _s3 = __turbopack_context__.k.signature(), _s4 = __turbopack_context__.k.signature();
"use client";
;
;
;
const navigation = {
    SUPER_ADMIN: [
        {
            id: "overview",
            label: "Overview",
            icon: "⌂"
        },
        {
            id: "platform",
            label: "Gyms & accounts",
            icon: "▦"
        },
        {
            id: "system-settings",
            label: "System settings",
            icon: "⚙"
        },
        {
            id: "activity",
            label: "Audit activity",
            icon: "◷"
        }
    ],
    ADMIN: [
        {
            id: "overview",
            label: "Overview",
            icon: "⌂"
        },
        {
            id: "members",
            label: "Members",
            icon: "◎"
        },
        {
            id: "training",
            label: "Training plans",
            icon: "↗"
        },
        {
            id: "diets",
            label: "Diet guidance",
            icon: "◌"
        },
        {
            id: "attendance",
            label: "Attendance",
            icon: "◷"
        },
        {
            id: "fees",
            label: "Fee structures",
            icon: "＄"
        },
        {
            id: "payments",
            label: "Payments",
            icon: "▤"
        },
        {
            id: "offers",
            label: "Offers",
            icon: "✳"
        },
        {
            id: "equipment",
            label: "Equipment",
            icon: "◈"
        },
        {
            id: "gym-settings",
            label: "Gym settings",
            icon: "⚙"
        }
    ],
    USER: [
        {
            id: "overview",
            label: "Overview",
            icon: "⌂"
        },
        {
            id: "training",
            label: "My training",
            icon: "↗"
        },
        {
            id: "diets",
            label: "Diet guidance",
            icon: "◌"
        },
        {
            id: "attendance",
            label: "My attendance",
            icon: "◷"
        },
        {
            id: "fees",
            label: "Membership fee",
            icon: "＄"
        },
        {
            id: "payments",
            label: "Payment history",
            icon: "▤"
        },
        {
            id: "offers",
            label: "Gym offers",
            icon: "✳"
        },
        {
            id: "equipment",
            label: "Equipment",
            icon: "◈"
        },
        {
            id: "profile",
            label: "My account",
            icon: "○"
        }
    ]
};
const titles = {
    overview: "Your overview",
    members: "Member management",
    training: "Training plans",
    diets: "Diet guidance",
    attendance: "Attendance",
    fees: "Fee structures",
    payments: "Payment records",
    offers: "Offers",
    equipment: "Equipment",
    "gym-settings": "Gym settings",
    platform: "Gyms & accounts",
    "system-settings": "System settings",
    activity: "Audit activity",
    profile: "My account"
};
const roleLabels = {
    SUPER_ADMIN: "Platform administrator",
    ADMIN: "Gym administrator",
    USER: "Member"
};
async function apiRequest(url, method = "GET", body) {
    const response = await fetch(url, {
        method,
        cache: "no-store",
        headers: body === undefined ? undefined : {
            "Content-Type": "application/json"
        },
        body: body === undefined ? undefined : JSON.stringify(body)
    });
    const result = await response.json();
    if (!response.ok) throw new Error(result.error ?? "The request could not be completed.");
    return result;
}
function money(cents) {
    if (typeof cents !== "number") return "—";
    return new Intl.NumberFormat(undefined, {
        style: "currency",
        currency: "USD"
    }).format(cents / 100);
}
function formatDate(value) {
    if (!value) return "—";
    const date = new Date(value);
    return Number.isNaN(date.getTime()) ? value : new Intl.DateTimeFormat(undefined, {
        dateStyle: "medium"
    }).format(date);
}
function dateTimeInput(value) {
    if (!value) return "";
    const date = new Date(value);
    if (Number.isNaN(date.getTime())) return "";
    const local = new Date(date.getTime() - date.getTimezoneOffset() * 60_000);
    return local.toISOString().slice(0, 16);
}
function moduleForResource(module) {
    return [
        "members",
        "training",
        "diets",
        "attendance",
        "fees",
        "payments",
        "offers",
        "equipment"
    ].includes(module) ? module : null;
}
function DashboardClient({ principal }) {
    _s();
    const router = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"])();
    const [active, setActive] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("overview");
    const [portal, setPortal] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [records, setRecords] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [memberOptions, setMemberOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [feeOptions, setFeeOptions] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])([]);
    const [platform, setPlatform] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [gymSettings, setGymSettings] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({});
    const [editing, setEditing] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(null);
    const [notice, setNotice] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [error, setError] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [loading, setLoading] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(true);
    const loadPortal = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[loadPortal]": async ()=>{
            const data = await apiRequest("/api/portal");
            setPortal(data);
            if (data.gym) setGymSettings(data.gym);
        }
    }["DashboardClient.useCallback[loadPortal]"], []);
    const loadPlatform = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[loadPlatform]": async ()=>{
            setPlatform(await apiRequest("/api/platform"));
        }
    }["DashboardClient.useCallback[loadPlatform]"], []);
    const loadRecords = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[loadRecords]": async (module)=>{
            const resource = moduleForResource(module);
            if (!resource) return;
            const data = await apiRequest(`/api/records/${resource}`);
            setRecords(data.records);
            if (principal.role === "ADMIN" && [
                "training",
                "diets",
                "attendance",
                "payments"
            ].includes(module)) {
                const members = await apiRequest("/api/records/members");
                setMemberOptions(members.records);
            }
            if (principal.role === "ADMIN" && [
                "members",
                "payments"
            ].includes(module)) {
                const fees = await apiRequest("/api/records/fees");
                setFeeOptions(fees.records);
            }
        }
    }["DashboardClient.useCallback[loadRecords]"], [
        principal.role
    ]);
    const refresh = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useCallback"])({
        "DashboardClient.useCallback[refresh]": async ()=>{
            setError("");
            setBusy(true);
            try {
                await loadPortal();
                if (principal.role === "SUPER_ADMIN" && [
                    "platform",
                    "system-settings",
                    "activity"
                ].includes(active)) {
                    await loadPlatform();
                }
                await loadRecords(active);
            } catch (requestError) {
                setError(requestError instanceof Error ? requestError.message : "Unable to load this page.");
            } finally{
                setBusy(false);
            }
        }
    }["DashboardClient.useCallback[refresh]"], [
        active,
        loadPlatform,
        loadPortal,
        loadRecords,
        principal.role
    ]);
    (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useEffect"])({
        "DashboardClient.useEffect": ()=>{
            let activeEffect = true;
            async function initialLoad() {
                try {
                    await loadPortal();
                    if (principal.role === "SUPER_ADMIN") await loadPlatform();
                } catch (requestError) {
                    if (activeEffect) setError(requestError instanceof Error ? requestError.message : "Unable to load your portal.");
                } finally{
                    if (activeEffect) setLoading(false);
                }
            }
            void initialLoad();
            return ({
                "DashboardClient.useEffect": ()=>{
                    activeEffect = false;
                }
            })["DashboardClient.useEffect"];
        }
    }["DashboardClient.useEffect"], [
        loadPlatform,
        loadPortal,
        principal.role
    ]);
    const activeFees = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useMemo"])({
        "DashboardClient.useMemo[activeFees]": ()=>feeOptions.filter({
                "DashboardClient.useMemo[activeFees]": (fee)=>fee.active
            }["DashboardClient.useMemo[activeFees]"])
    }["DashboardClient.useMemo[activeFees]"], [
        feeOptions
    ]);
    const nav = navigation[principal.role];
    function navigate(module) {
        setActive(module);
        setNotice("");
        setError("");
        setDraft(module === "payments" && portal?.metrics.billingMonth ? {
            billingMonth: portal.metrics.billingMonth
        } : {});
        setEditing(null);
        if (moduleForResource(module)) {
            void loadRecords(module).catch((requestError)=>{
                setError(requestError instanceof Error ? requestError.message : "Unable to load records.");
            });
        } else if (principal.role === "SUPER_ADMIN" && module !== "overview") {
            void loadPlatform().catch((requestError)=>{
                setError(requestError instanceof Error ? requestError.message : "Unable to load platform data.");
            });
        } else if (module === "gym-settings" && principal.role === "ADMIN") {
            void apiRequest("/api/gym").then((response)=>setGymSettings(response.gym)).catch((requestError)=>{
                setError(requestError instanceof Error ? requestError.message : "Unable to load gym settings.");
            });
        }
    }
    function setField(name, value) {
        setDraft((current)=>({
                ...current,
                [name]: value
            }));
    }
    async function saveRecord(event) {
        event.preventDefault();
        const resource = moduleForResource(active);
        if (!resource) return;
        setBusy(true);
        setError("");
        setNotice("");
        try {
            const payload = buildRecordPayload(active, draft, principal.role, editing);
            const response = await apiRequest(editing ? `/api/records/${resource}/${editing.id}` : `/api/records/${resource}`, editing ? "PATCH" : "POST", payload);
            setNotice(editing ? "Changes saved." : "Record added.");
            setEditing(null);
            setDraft({});
            await loadRecords(active);
            await loadPortal();
            if (active === "members" && response.record?.id) {
                setNotice("Member account created. Share the temporary sign-in password securely.");
            }
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Could not save this record.");
        } finally{
            setBusy(false);
        }
    }
    async function updateRecord(resource, id, payload) {
        setBusy(true);
        setError("");
        setNotice("");
        try {
            await apiRequest(`/api/records/${resource}/${id}`, "PATCH", payload);
            setNotice("Changes saved.");
            setEditing(null);
            await loadRecords(active);
            await loadPortal();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Could not update this record.");
        } finally{
            setBusy(false);
        }
    }
    async function deleteRecord(resource, id) {
        if (!window.confirm("Delete this record? This cannot be undone.")) return;
        setBusy(true);
        setError("");
        setNotice("");
        try {
            await apiRequest(`/api/records/${resource}/${id}`, "DELETE");
            setNotice("Record deleted.");
            await loadRecords(active);
            await loadPortal();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Could not delete this record.");
        } finally{
            setBusy(false);
        }
    }
    async function signOut() {
        try {
            await apiRequest("/api/auth/logout", "POST", {});
            router.replace("/login");
            router.refresh();
        } catch (requestError) {
            setError(requestError instanceof Error ? requestError.message : "Unable to sign out.");
        }
    }
    const title = titles[active];
    if (loading) {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
            className: "loading-screen",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    className: "spinner"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 381,
                    columnNumber: 45
                }, this),
                " Loading your portal…"
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 381,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "app-shell",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("aside", {
                className: "sidebar",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("a", {
                        className: "brand sidebar-brand",
                        href: "/dashboard",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "brand-mark",
                                children: "C"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 388,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: [
                                    "clieto",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "brand-accent",
                                        children: "fit"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 389,
                                        columnNumber: 23
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 389,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 387,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "workspace-label",
                        children: "WORKSPACE"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 391,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "workspace-switcher",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "workspace-avatar",
                                children: (portal?.gym?.name ?? "C").slice(0, 1).toUpperCase()
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 393,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "workspace-copy",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: principal.role === "SUPER_ADMIN" ? "Platform" : portal?.gym?.name ?? principal.gymName ?? "Your gym"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 395,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                        children: roleLabels[principal.role]
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 396,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 394,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "switcher-caret",
                                children: "⌄"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 398,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 392,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                        className: "side-nav",
                        "aria-label": "Main navigation",
                        children: nav.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: `nav-item${active === item.id ? " nav-item-active" : ""}`,
                                onClick: ()=>navigate(item.id),
                                "aria-current": active === item.id ? "page" : undefined,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "nav-icon",
                                        "aria-hidden": "true",
                                        children: item.icon
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 408,
                                        columnNumber: 15
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: item.label
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 409,
                                        columnNumber: 15
                                    }, this),
                                    item.id === "payments" && principal.role === "USER" && portal?.metrics.paymentStatus !== "PAID" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "nav-indicator",
                                        "aria-label": "Payment reminder"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 411,
                                        columnNumber: 17
                                    }, this)
                                ]
                            }, item.id, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 402,
                                columnNumber: 13
                            }, this))
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 400,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "sidebar-bottom",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "sidebar-tip",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        className: "tip-icon",
                                        children: "✳"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 418,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: "Small steps add up."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 419,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: "Consistency is the strongest plan."
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 420,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 417,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "user-chip",
                                onClick: ()=>principal.role === "USER" ? navigate("profile") : undefined,
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "avatar",
                                        children: initials(principal.name)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 423,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "user-chip-text",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                children: principal.name
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 424,
                                                columnNumber: 46
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                children: principal.email
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 424,
                                                columnNumber: 79
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 424,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "user-menu-dot",
                                        "aria-hidden": "true",
                                        children: "···"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 425,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 422,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 416,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 386,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("main", {
                className: "main-area",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("header", {
                        className: "topbar",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "breadcrumb",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: principal.role === "SUPER_ADMIN" ? "Platform" : portal?.gym?.name ?? "Workspace"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 432,
                                        columnNumber: 39
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("b", {
                                        children: "/"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 432,
                                        columnNumber: 134
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: title
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 432,
                                        columnNumber: 142
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 432,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "topbar-actions",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "today-label",
                                        children: new Intl.DateTimeFormat(undefined, {
                                            dateStyle: "medium"
                                        }).format(new Date())
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 434,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "icon-button",
                                        "aria-label": "Refresh data",
                                        onClick: ()=>void refresh(),
                                        children: "↻"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 435,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button button-quiet button-signout",
                                        onClick: ()=>void signOut(),
                                        children: "Sign out"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 436,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 433,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 431,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "mobile-nav-wrap",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("nav", {
                            className: "mobile-nav",
                            "aria-label": "Mobile navigation",
                            children: nav.map((item)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                    className: `mobile-nav-item${active === item.id ? " mobile-nav-active" : ""}`,
                                    onClick: ()=>navigate(item.id),
                                    children: [
                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                            "aria-hidden": "true",
                                            children: item.icon
                                        }, void 0, false, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 448,
                                            columnNumber: 17
                                        }, this),
                                        item.label
                                    ]
                                }, item.id, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 443,
                                    columnNumber: 15
                                }, this))
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 441,
                            columnNumber: 11
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 440,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "page-content",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "page-heading",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                className: "eyebrow",
                                                children: principal.role === "SUPER_ADMIN" ? "PLATFORM CONTROL" : principal.role === "ADMIN" ? "GYM OPERATIONS" : "MEMBER SPACE"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 457,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h1", {
                                                children: active === "overview" ? `Good ${greeting()}, ${firstName(principal.name)}.` : title
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 458,
                                                columnNumber: 15
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                                children: pageDescription(active, principal.role, portal?.gym?.name)
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 459,
                                                columnNumber: 15
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 456,
                                        columnNumber: 13
                                    }, this),
                                    active === "overview" && principal.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button button-primary",
                                        onClick: ()=>setActive("members"),
                                        children: "＋ Add a member"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 462,
                                        columnNumber: 15
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 455,
                                columnNumber: 11
                            }, this),
                            error && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "alert alert-error",
                                role: "alert",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "!"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 466,
                                        columnNumber: 69
                                    }, this),
                                    error,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setError(""),
                                        "aria-label": "Dismiss error",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 466,
                                        columnNumber: 90
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 466,
                                columnNumber: 21
                            }, this),
                            notice && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                className: "alert alert-success",
                                role: "status",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "✓"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 467,
                                        columnNumber: 73
                                    }, this),
                                    notice,
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        onClick: ()=>setNotice(""),
                                        "aria-label": "Dismiss message",
                                        children: "×"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 467,
                                        columnNumber: 95
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 467,
                                columnNumber: 22
                            }, this),
                            active === "overview" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(Overview, {
                                principal: principal,
                                portal: portal,
                                onNavigate: navigate
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 470,
                                columnNumber: 13
                            }, this),
                            moduleForResource(active) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ResourcePanel, {
                                module: active,
                                role: principal.role,
                                records: records,
                                members: memberOptions,
                                fees: activeFees,
                                draft: draft,
                                editing: editing,
                                busy: busy,
                                onField: setField,
                                onSubmit: saveRecord,
                                onEdit: (row)=>{
                                    setEditing(row);
                                    setDraft(editDraft(active, row));
                                    window.scrollTo({
                                        top: 0,
                                        behavior: "smooth"
                                    });
                                },
                                onCancelEdit: ()=>{
                                    setEditing(null);
                                    setDraft({});
                                },
                                onUpdate: updateRecord,
                                onDelete: deleteRecord
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 473,
                                columnNumber: 13
                            }, this),
                            active === "gym-settings" && principal.role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(GymSettings, {
                                gym: gymSettings,
                                onSave: async (payload)=>{
                                    try {
                                        const result = await apiRequest("/api/gym", "PATCH", payload);
                                        setGymSettings(result.gym);
                                        await loadPortal();
                                        setNotice("Gym settings updated.");
                                    } catch (requestError) {
                                        setError(requestError instanceof Error ? requestError.message : "Unable to save settings.");
                                    }
                                },
                                onUpload: async (file)=>{
                                    const formData = new FormData();
                                    formData.set("logo", file);
                                    const response = await fetch("/api/branding", {
                                        method: "PUT",
                                        body: formData,
                                        cache: "no-store"
                                    });
                                    const result = await response.json();
                                    if (!response.ok) throw new Error(result.error ?? "Logo upload failed.");
                                    await loadPortal();
                                    setNotice(result.warning ?? "Gym logo updated.");
                                },
                                onRemoveLogo: async ()=>{
                                    try {
                                        const result = await apiRequest("/api/branding", "DELETE", {});
                                        await loadPortal();
                                        setNotice(result.warning ?? "Gym logo removed.");
                                    } catch (requestError) {
                                        setError(requestError instanceof Error ? requestError.message : "Unable to remove the logo.");
                                    }
                                }
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 495,
                                columnNumber: 13
                            }, this),
                            principal.role === "SUPER_ADMIN" && active === "platform" && platform && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(PlatformPanel, {
                                data: platform,
                                onReload: loadPlatform,
                                onNotice: setNotice,
                                onError: setError
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 532,
                                columnNumber: 13
                            }, this),
                            principal.role === "SUPER_ADMIN" && active === "system-settings" && platform && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(SystemSettings, {
                                data: platform,
                                onReload: loadPlatform,
                                onNotice: setNotice,
                                onError: setError
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 535,
                                columnNumber: 13
                            }, this),
                            principal.role === "SUPER_ADMIN" && active === "activity" && platform && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ActivityPanel, {
                                audits: platform.audits
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 538,
                                columnNumber: 13
                            }, this),
                            principal.role === "USER" && active === "profile" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(ProfilePanel, {
                                principal: principal,
                                onNotice: setNotice,
                                onError: setError
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 541,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 454,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("footer", {
                        className: "page-footer",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Clieto Fit"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 548,
                                columnNumber: 41
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Move well. Feel good. Keep going."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 548,
                                columnNumber: 64
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 548,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 430,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 385,
        columnNumber: 5
    }, this);
}
_s(DashboardClient, "orjZv/vlfoK1aEintv607ZA4iy4=", false, function() {
    return [
        __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$navigation$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useRouter"]
    ];
});
_c = DashboardClient;
function Overview({ principal, portal, onNavigate }) {
    const metrics = portal?.metrics;
    if (!metrics) return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "empty-state",
        children: "Dashboard information is unavailable."
    }, void 0, false, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 564,
        columnNumber: 24
    }, this);
    if (principal.role === "SUPER_ADMIN") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "welcome-banner platform-banner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "eyebrow eyebrow-light",
                                    children: "THE BIG PICTURE"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 569,
                                    columnNumber: 16
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "A healthier platform starts here."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 569,
                                    columnNumber: 78
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Keep every gym moving with clear, tenant-safe oversight."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 569,
                                    columnNumber: 120
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 569,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "banner-orbit",
                            children: "C"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 570,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "button button-light",
                            onClick: ()=>onNavigate("platform"),
                            children: [
                                "Manage workspaces ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 571,
                                    columnNumber: 108
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 571,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 568,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "stat-grid stat-grid-four",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Total workspaces",
                            value: metrics.gyms ?? 0,
                            note: "Across the platform",
                            icon: "▦",
                            tone: "green"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 574,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Active workspaces",
                            value: metrics.activeGyms ?? 0,
                            note: "Currently operating",
                            icon: "↗",
                            tone: "blue"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 575,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Gym administrators",
                            value: metrics.admins ?? 0,
                            note: "Trainer accounts",
                            icon: "◎",
                            tone: "purple"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 576,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Member accounts",
                            value: metrics.members ?? 0,
                            note: "Across all gyms",
                            icon: "◌",
                            tone: "orange"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 577,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 573,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-card platform-shortcut",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "card-kicker",
                                    children: "PLATFORM CARE"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 580,
                                    columnNumber: 16
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                    children: "Keep the details in good shape"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 580,
                                    columnNumber: 66
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Manage workspace access, platform settings, and a traceable history of sensitive changes."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 580,
                                    columnNumber: 105
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 580,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "button button-outline",
                            onClick: ()=>onNavigate("activity"),
                            children: [
                                "View recent activity ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 581,
                                    columnNumber: 113
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 581,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 579,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 567,
            columnNumber: 7
        }, this);
    }
    if (principal.role === "ADMIN") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "welcome-banner",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "eyebrow eyebrow-light",
                                    children: "YOUR GYM, IN GOOD FORM"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 590,
                                    columnNumber: 16
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Make room for progress."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 590,
                                    columnNumber: 85
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: [
                                        "Here’s what’s happening at ",
                                        portal?.gym?.name ?? "your gym",
                                        " today."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 590,
                                    columnNumber: 117
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 590,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            className: "banner-orbit",
                            children: "✳"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 591,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "button button-light",
                            onClick: ()=>onNavigate("training"),
                            children: [
                                "Build a training plan ",
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    children: "→"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 592,
                                    columnNumber: 112
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 592,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 589,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "stat-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Active members",
                            value: metrics.members ?? 0,
                            note: "Ready to train",
                            icon: "◎",
                            tone: "green"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 595,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Checked in today",
                            value: metrics.attendanceToday ?? 0,
                            note: "Local gym day",
                            icon: "◷",
                            tone: "blue"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 596,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Paid this month",
                            value: metrics.paidMembers ?? 0,
                            note: metrics.billingMonth ?? "Current billing month",
                            icon: "✓",
                            tone: "purple"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 597,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                            label: "Needs follow-up",
                            value: metrics.unpaidMembers ?? 0,
                            note: "Unpaid or no record",
                            icon: "!",
                            tone: "orange"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 598,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 594,
                    columnNumber: 9
                }, this),
                (metrics.unassignedFees ?? 0) > 0 && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "inline-note",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: "↗"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 601,
                            columnNumber: 40
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                    children: [
                                        metrics.unassignedFees,
                                        " member",
                                        metrics.unassignedFees === 1 ? "" : "s",
                                        " need a fee structure."
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 601,
                                    columnNumber: 59
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                    children: "Members without an active fee are not included in the monthly paid/unpaid totals."
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 601,
                                    columnNumber: 170
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 601,
                            columnNumber: 54
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            onClick: ()=>onNavigate("members"),
                            children: "Review members →"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 601,
                            columnNumber: 264
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 601,
                    columnNumber: 11
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "section-heading",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "card-kicker",
                                    children: "YOUR WORKSPACE"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 603,
                                    columnNumber: 47
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: "Keep the day moving"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 603,
                                    columnNumber: 98
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 603,
                            columnNumber: 42
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "text-button",
                            onClick: ()=>onNavigate("gym-settings"),
                            children: "Gym settings →"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 603,
                            columnNumber: 132
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 603,
                    columnNumber: 9
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    className: "quick-grid",
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickCard, {
                            icon: "◎",
                            title: "Members",
                            text: "Add members and assign fees.",
                            onClick: ()=>onNavigate("members")
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 605,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickCard, {
                            icon: "↗",
                            title: "Training & diet",
                            text: "Make a plan that feels personal.",
                            onClick: ()=>onNavigate("training")
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 606,
                            columnNumber: 11
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickCard, {
                            icon: "▤",
                            title: "Payments",
                            text: "Keep monthly records up to date.",
                            onClick: ()=>onNavigate("payments")
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 607,
                            columnNumber: 11
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 604,
                    columnNumber: 9
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 588,
            columnNumber: 7
        }, this);
    }
    const paymentStatus = metrics.paymentStatus ?? "UNRECORDED";
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "welcome-banner member-banner",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "eyebrow eyebrow-light",
                                children: "YOUR SPACE TO GROW"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 617,
                                columnNumber: 14
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Show up for yourself."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 617,
                                columnNumber: 79
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Your plans, progress, and gym essentials are all right here."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 617,
                                columnNumber: 109
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 617,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "banner-orbit",
                        children: "✳"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 618,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button button-light",
                        onClick: ()=>onNavigate("training"),
                        children: [
                            "See my training ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 619,
                                columnNumber: 104
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 619,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 616,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "stat-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Training plans",
                        value: metrics.trainingPlans ?? 0,
                        note: "Assigned by your trainer",
                        icon: "↗",
                        tone: "green"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 622,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Diet guidance",
                        value: metrics.dietPlans ?? 0,
                        note: "Made for your routine",
                        icon: "◌",
                        tone: "blue"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 623,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "Check-ins",
                        value: metrics.attendanceCount ?? 0,
                        note: "Your gym visits",
                        icon: "◷",
                        tone: "purple"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 624,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(StatCard, {
                        label: "This month",
                        value: paymentStatus === "PAID" ? "Paid" : paymentStatus === "UNRECORDED" ? "Reminder" : "Due",
                        note: `${metrics.billingMonth ?? ""}${metrics.fee ? ` · ${money(metrics.fee.amountCents)}` : ""}`,
                        icon: paymentStatus === "PAID" ? "✓" : "＄",
                        tone: paymentStatus === "PAID" ? "green" : "orange"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 625,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 621,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `member-reminder${paymentStatus === "PAID" ? " reminder-paid" : ""}`,
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "reminder-symbol",
                        children: paymentStatus === "PAID" ? "✓" : "＄"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 628,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "reminder-copy",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-kicker",
                                children: paymentStatus === "PAID" ? "ALL CAUGHT UP" : "MONTHLY MEMBERSHIP"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 630,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h3", {
                                children: paymentStatus === "PAID" ? "You’re all set for this month." : paymentStatus === "UNRECORDED" ? "Your monthly fee is ready when you are." : "A quick payment check-in."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 631,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: [
                                    metrics.fee ? `${metrics.fee.name} · ${money(metrics.fee.amountCents)} per month` : "Ask your gym team about your membership fee.",
                                    " ",
                                    metrics.dueAt ? `Due ${formatDate(metrics.dueAt)}.` : ""
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 632,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 629,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button button-outline",
                        onClick: ()=>onNavigate("payments"),
                        children: [
                            "View payments ",
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "→"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 634,
                                columnNumber: 104
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 634,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 627,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "section-heading",
                children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            className: "card-kicker",
                            children: "YOUR GYM"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 636,
                            columnNumber: 45
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                            children: "Good things to explore"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 636,
                            columnNumber: 90
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 636,
                    columnNumber: 40
                }, this)
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 636,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "quick-grid",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickCard, {
                        icon: "✳",
                        title: "Offers",
                        text: "See what’s new at your gym.",
                        onClick: ()=>onNavigate("offers")
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 638,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickCard, {
                        icon: "◈",
                        title: "Equipment",
                        text: "Explore the tools you can use.",
                        onClick: ()=>onNavigate("equipment")
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 639,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(QuickCard, {
                        icon: "◷",
                        title: "Attendance",
                        text: "Keep your streak going.",
                        onClick: ()=>onNavigate("attendance")
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 640,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 637,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 615,
        columnNumber: 5
    }, this);
}
_c1 = Overview;
function StatCard({ label, value, note, icon, tone }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
        className: "stat-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: `stat-icon tone-${tone}`,
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 649,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-label",
                children: label
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 650,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                className: "stat-value",
                children: value
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 651,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "stat-note",
                children: note
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 652,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 648,
        columnNumber: 5
    }, this);
}
_c2 = StatCard;
function QuickCard({ icon, title, text, onClick }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
        className: "quick-card",
        onClick: onClick,
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "quick-icon",
                children: icon
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 658,
                columnNumber: 59
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: title
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 658,
                        columnNumber: 107
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                        children: text
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 658,
                        columnNumber: 131
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 658,
                columnNumber: 101
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "quick-arrow",
                children: "↗"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 658,
                columnNumber: 159
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 658,
        columnNumber: 10
    }, this);
}
_c3 = QuickCard;
function ResourcePanel({ module, role, records, members, fees, draft, editing, busy, onField, onSubmit, onEdit, onCancelEdit, onUpdate, onDelete }) {
    const resource = moduleForResource(module);
    if (!resource) return null;
    const admin = role === "ADMIN";
    const emptyText = {
        members: "Your member list is ready for its first name.",
        training: "No training plans here yet.",
        diets: "Diet guidance will show up here when it’s assigned.",
        attendance: "Your check-ins will appear here.",
        fees: "Create a fee structure to make membership costs clear.",
        payments: "No payment records for this billing period yet.",
        offers: "There are no active offers to show right now.",
        equipment: "Equipment details will appear here."
    };
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "resource-layout",
        children: [
            admin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "section-card editor-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel-title-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "card-kicker",
                                        children: editing ? "EDIT RECORD" : "ADD TO YOUR GYM"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 709,
                                        columnNumber: 49
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: editorTitle(module, Boolean(editing))
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 709,
                                        columnNumber: 131
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 709,
                                columnNumber: 44
                            }, this),
                            editing && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "text-button",
                                type: "button",
                                onClick: onCancelEdit,
                                children: "Cancel edit"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 709,
                                columnNumber: 197
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 709,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onSubmit,
                        className: "editor-form",
                        children: [
                            editorFields(module, members, fees, draft, onField, Boolean(editing)),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button button-primary",
                                disabled: busy,
                                children: busy ? "Saving..." : editing ? "Save changes" : submitLabel(module)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 712,
                                columnNumber: 13
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 710,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 708,
                columnNumber: 9
            }, this),
            !admin && module === "attendance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "checkin-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "checkin-stamp",
                        children: "◷"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 718,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-kicker",
                                children: "TODAY’S MOMENTUM"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 719,
                                columnNumber: 16
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Make today count."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 719,
                                columnNumber: 69
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Check in once each gym day. Your gym’s local timezone sets the day."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 719,
                                columnNumber: 95
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 719,
                        columnNumber: 11
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        onSubmit: onSubmit,
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                            className: "button button-primary",
                            disabled: busy,
                            children: busy ? "Checking in..." : "Check in today"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 720,
                            columnNumber: 37
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 720,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 717,
                columnNumber: 9
            }, this),
            module === "payments" && role === "ADMIN" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "policy-callout",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        children: "i"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 724,
                        columnNumber: 41
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: currentMonthLabel()
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 724,
                                columnNumber: 58
                            }, this),
                            " counts a member as paid only when a PAID record covers the full assigned fee. Partial, refunded, overdue, or unrecorded members remain unpaid."
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 724,
                        columnNumber: 55
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 724,
                columnNumber: 9
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "section-card records-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel-title-row",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        className: "card-kicker",
                                        children: admin ? "GYM RECORDS" : "YOUR RECORDS"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 728,
                                        columnNumber: 16
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                        children: recordHeading(module, records.length)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 728,
                                        columnNumber: 93
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 728,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "record-count",
                                children: [
                                    records.length,
                                    " ",
                                    records.length === 1 ? "record" : "records"
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 729,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 727,
                        columnNumber: 9
                    }, this),
                    records.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "empty-mark",
                                children: "◌"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 731,
                                columnNumber: 62
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "Nothing to show just yet"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 731,
                                columnNumber: 99
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: emptyText[module]
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 731,
                                columnNumber: 140
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 731,
                        columnNumber: 33
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "table-scroll",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "data-table",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            tableHeaders(module, admin).map((header)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                    children: header
                                                }, header, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 734,
                                                    columnNumber: 71
                                                }, this)),
                                            admin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                className: "actions-heading",
                                                children: "Actions"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 734,
                                                columnNumber: 113
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 734,
                                        columnNumber: 22
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 734,
                                    columnNumber: 15
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: records.map((row)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                tableCells(module, row, admin, fees, onUpdate),
                                                admin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    className: "row-actions",
                                                    children: [
                                                        module !== "attendance" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "action-button",
                                                            onClick: ()=>onEdit(row),
                                                            children: "Edit"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 740,
                                                            columnNumber: 51
                                                        }, this),
                                                        module === "members" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: `action-button ${row.status === "ACTIVE" ? "action-warn" : ""}`,
                                                            onClick: ()=>onUpdate(resource, row.id, {
                                                                    status: row.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
                                                                }),
                                                            children: row.status === "ACTIVE" ? "Suspend" : "Reactivate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 741,
                                                            columnNumber: 48
                                                        }, this),
                                                        module === "fees" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "action-button",
                                                            onClick: ()=>onUpdate(resource, row.id, {
                                                                    active: !row.active
                                                                }),
                                                            children: row.active ? "Deactivate" : "Activate"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 742,
                                                            columnNumber: 45
                                                        }, this),
                                                        module === "offers" && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "action-button",
                                                            onClick: ()=>onUpdate(resource, row.id, {
                                                                    enabled: !row.enabled
                                                                }),
                                                            children: row.enabled ? "Disable" : "Enable"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 743,
                                                            columnNumber: 47
                                                        }, this),
                                                        module === "payments" && row.status !== "PAID" && row.amountCents !== undefined && row.expectedCents !== undefined && row.amountCents >= row.expectedCents && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "action-button",
                                                            onClick: ()=>onUpdate(resource, row.id, {
                                                                    status: "PAID"
                                                                }),
                                                            children: "Mark paid"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 744,
                                                            columnNumber: 182
                                                        }, this),
                                                        [
                                                            "training",
                                                            "diets",
                                                            "attendance",
                                                            "offers",
                                                            "equipment"
                                                        ].includes(module) && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                            className: "action-button action-warn",
                                                            onClick: ()=>onDelete(resource, row.id),
                                                            children: "Delete"
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 745,
                                                            columnNumber: 103
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 739,
                                                    columnNumber: 31
                                                }, this)
                                            ]
                                        }, row.id, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 737,
                                            columnNumber: 19
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 735,
                                    columnNumber: 15
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 733,
                            columnNumber: 13
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 732,
                        columnNumber: 11
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 726,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 706,
        columnNumber: 5
    }, this);
}
_c4 = ResourcePanel;
function editorTitle(module, editing) {
    if (editing) return `Update ${singularLabel(module)}`;
    const titlesByModule = {
        members: "Create a member account",
        training: "Create a training plan",
        diets: "Add diet guidance",
        attendance: "Record a member check-in",
        fees: "Set up a fee structure",
        payments: "Record a monthly payment",
        offers: "Add an offer",
        equipment: "Add gym equipment"
    };
    return titlesByModule[module] ?? "Add a record";
}
function editorFields(module, members, fees, draft, onField, editing) {
    const input = (name, label, options = {})=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "field",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 782,
                    columnNumber: 41
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: options.type ?? "text",
                    required: options.required ?? true,
                    placeholder: options.placeholder,
                    min: options.min,
                    minLength: options.minLength,
                    step: options.step,
                    autoComplete: options.autoComplete,
                    value: draft[name] ?? "",
                    onChange: (event)=>onField(name, event.target.value)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 782,
                    columnNumber: 61
                }, this)
            ]
        }, name, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 782,
            columnNumber: 5
        }, this);
    const textarea = (name, label, placeholder)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "field field-span",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 785,
                    columnNumber: 52
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("textarea", {
                    rows: 3,
                    required: true,
                    placeholder: placeholder,
                    value: draft[name] ?? "",
                    onChange: (event)=>onField(name, event.target.value)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 785,
                    columnNumber: 72
                }, this)
            ]
        }, name, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 785,
            columnNumber: 5
        }, this);
    const select = (name, label, choices, placeholder)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "field",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: label
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 788,
                    columnNumber: 41
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    required: true,
                    value: draft[name] ?? "",
                    onChange: (event)=>onField(name, event.target.value),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: placeholder
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 788,
                            columnNumber: 160
                        }, this),
                        choices.map((choice)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: choice.id,
                                children: choice.name
                            }, choice.id, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 788,
                                columnNumber: 224
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 788,
                    columnNumber: 61
                }, this)
            ]
        }, name, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 788,
            columnNumber: 5
        }, this);
    const fields = [];
    if (module === "members") {
        if (!editing) {
            fields.push(input("name", "Full name", {
                placeholder: "e.g. Maya Chen"
            }));
            fields.push(input("email", "Email address", {
                type: "email",
                placeholder: "maya@example.com"
            }));
            fields.push(input("password", "Temporary password", {
                type: "password",
                minLength: 12,
                placeholder: "At least 12 characters",
                autoComplete: "new-password"
            }));
        }
        fields.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "field",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Membership fee"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 799,
                    columnNumber: 44
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    value: draft.feeId ?? "",
                    onChange: (event)=>onField("feeId", event.target.value),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "",
                            children: "Not assigned"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 799,
                            columnNumber: 164
                        }, this),
                        fees.map((fee)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: fee.id,
                                children: [
                                    fee.name,
                                    " · ",
                                    money(fee.amountCents)
                                ]
                            }, fee.id, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 799,
                                columnNumber: 221
                            }, this))
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 799,
                    columnNumber: 71
                }, this)
            ]
        }, "feeId", true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 799,
            columnNumber: 7
        }, this));
    } else if (module === "training" || module === "diets") {
        fields.push(select("memberId", "Assign to member", members.map((member)=>({
                id: member.id,
                name: member.name ?? member.email ?? "Member"
            })), "Choose a member"));
        fields.push(input("title", "Title", {
            placeholder: module === "training" ? "e.g. Strength foundations" : "e.g. Everyday fuel"
        }));
        fields.push(textarea("details", module === "training" ? "Plan details" : "Guidance", "Add clear, supportive details."));
    } else if (module === "attendance") {
        fields.push(select("memberId", "Member", members.map((member)=>({
                id: member.id,
                name: member.name ?? member.email ?? "Member"
            })), "Choose a member"));
    } else if (module === "fees") {
        fields.push(input("name", "Fee name", {
            placeholder: "e.g. Monthly membership"
        }));
        fields.push(input("amount", "Monthly amount", {
            type: "number",
            min: "0.01",
            step: "0.01",
            placeholder: "e.g. 49.00"
        }));
        fields.push(textarea("description", "Description", "What does this membership include?"));
    } else if (module === "payments") {
        if (!editing) {
            fields.push(select("memberId", "Member", members.map((member)=>({
                    id: member.id,
                    name: member.name ?? member.email ?? "Member"
                })), "Choose a member"));
        }
        fields.push(input("billingMonth", "Billing month", {
            type: "month",
            placeholder: currentMonthLabel()
        }));
        fields.push(input("amount", "Amount received", {
            type: "number",
            min: "0",
            step: "0.01",
            placeholder: "e.g. 49.00"
        }));
        fields.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "field",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Payment status"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 818,
                    columnNumber: 45
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                    required: true,
                    value: draft.status ?? "PAID",
                    onChange: (event)=>onField("status", event.target.value),
                    children: [
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "PAID",
                            children: "Paid in full"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 818,
                            columnNumber: 180
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "PARTIAL",
                            children: "Partial"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 818,
                            columnNumber: 222
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "OVERDUE",
                            children: "Overdue"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 818,
                            columnNumber: 262
                        }, this),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                            value: "REFUNDED",
                            children: "Refunded"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 818,
                            columnNumber: 302
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 818,
                    columnNumber: 72
                }, this)
            ]
        }, "status", true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 818,
            columnNumber: 7
        }, this));
        fields.push(input("dueAt", "Due date (optional)", {
            type: "date",
            required: false
        }));
    } else if (module === "offers") {
        fields.push(input("title", "Offer title", {
            placeholder: "e.g. Bring a friend week"
        }));
        fields.push(textarea("description", "Description", "Share the details and eligibility."));
        fields.push(input("startsAt", "Starts (optional)", {
            type: "datetime-local",
            required: false
        }));
        fields.push(input("endsAt", "Ends (optional)", {
            type: "datetime-local",
            required: false
        }));
        fields.push(/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
            className: "check-field",
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                    type: "checkbox",
                    checked: draft.enabled === "true",
                    onChange: (event)=>onField("enabled", String(event.target.checked))
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 826,
                    columnNumber: 62
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                    children: "Make this offer visible to eligible members"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 826,
                    columnNumber: 193
                }, this)
            ]
        }, "enabled", true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 826,
            columnNumber: 17
        }, this));
    } else if (module === "equipment") {
        fields.push(input("name", "Equipment name", {
            placeholder: "e.g. Adjustable bench"
        }));
        fields.push(textarea("description", "Details", "Add useful notes for members."));
    }
    return fields;
}
function buildRecordPayload(module, draft, role, editing) {
    if (module === "members") {
        const payload = {
            feeId: draft.feeId || null
        };
        if (!editing) Object.assign(payload, {
            name: draft.name,
            email: draft.email,
            password: draft.password
        });
        return payload;
    }
    if (module === "training" || module === "diets") {
        return {
            title: draft.title,
            details: draft.details,
            memberId: draft.memberId
        };
    }
    if (module === "attendance") return role === "ADMIN" ? {
        memberId: draft.memberId
    } : {};
    if (module === "fees") {
        return {
            name: draft.name,
            amountCents: Math.round(Number(draft.amount) * 100),
            description: draft.description ?? ""
        };
    }
    if (module === "payments") {
        return {
            memberId: draft.memberId,
            billingMonth: draft.billingMonth,
            amountCents: Math.round(Number(draft.amount) * 100),
            status: draft.status || "PAID",
            dueAt: draft.dueAt ? new Date(`${draft.dueAt}T12:00:00`).toISOString() : null
        };
    }
    if (module === "offers") {
        return {
            title: draft.title,
            description: draft.description ?? "",
            enabled: draft.enabled === "true",
            startsAt: draft.startsAt ? new Date(draft.startsAt).toISOString() : null,
            endsAt: draft.endsAt ? new Date(draft.endsAt).toISOString() : null
        };
    }
    return {
        name: draft.name,
        description: draft.description ?? ""
    };
}
function editDraft(module, row) {
    if (module === "members") return {
        feeId: row.feeId ?? ""
    };
    if (module === "training" || module === "diets") {
        return {
            title: row.title ?? "",
            details: row.details ?? "",
            memberId: row.memberId ?? row.member?.id ?? ""
        };
    }
    if (module === "fees") {
        return {
            name: row.name ?? "",
            amount: row.amountCents === undefined ? "" : (row.amountCents / 100).toFixed(2),
            description: row.description ?? ""
        };
    }
    if (module === "payments") {
        return {
            amount: row.amountCents === undefined ? "" : (row.amountCents / 100).toFixed(2),
            status: row.status ?? "PARTIAL",
            dueAt: row.dueAt?.slice(0, 10) ?? ""
        };
    }
    if (module === "offers") {
        return {
            title: row.title ?? "",
            description: row.description ?? "",
            enabled: String(row.enabled ?? false),
            startsAt: dateTimeInput(row.startsAt),
            endsAt: dateTimeInput(row.endsAt)
        };
    }
    if (module === "equipment") return {
        name: row.name ?? "",
        description: row.description ?? ""
    };
    return {};
}
function tableHeaders(module, admin) {
    const values = {
        members: [
            "Member",
            "Email",
            "Membership fee",
            "Status"
        ],
        training: [
            admin ? "Plan" : "Training plan",
            ...admin ? [
                "Member"
            ] : [],
            "Details"
        ],
        diets: [
            admin ? "Guidance" : "Diet guidance",
            ...admin ? [
                "Member"
            ] : [],
            "Details"
        ],
        attendance: [
            admin ? "Member" : "Check-in date",
            ...admin ? [
                "Gym day"
            ] : [],
            "Checked in"
        ],
        fees: [
            "Membership",
            "Monthly fee",
            "Details",
            "Status"
        ],
        payments: [
            ...admin ? [
                "Member"
            ] : [],
            "Billing month",
            "Amount",
            "Status",
            "Due date"
        ],
        offers: [
            "Offer",
            "Details",
            "Validity",
            "Status"
        ],
        equipment: [
            "Equipment",
            "Details"
        ]
    };
    return values[module] ?? [];
}
function tableCells(module, row, admin, fees, onUpdate) {
    const nameCell = (title, subtitle)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                    className: "cell-title",
                    children: title
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 901,
                    columnNumber: 62
                }, this),
                subtitle && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                    className: "cell-subtitle",
                    children: subtitle
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 901,
                    columnNumber: 122
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 901,
            columnNumber: 58
        }, this);
    const status = (value, good = value === "ACTIVE" || value === "PAID" || value === "ENABLED")=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
            className: `status-pill ${good ? "status-good" : "status-muted"}`,
            children: [
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 902,
                    columnNumber: 192
                }, this),
                humanize(value ?? "—")
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 902,
            columnNumber: 119
        }, this);
    if (module === "members") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                nameCell(row.name ?? "Member"),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: row.email
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 906,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: admin ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                        "aria-label": `Fee for ${row.name}`,
                        className: "inline-select",
                        value: row.feeId ?? "",
                        onChange: (event)=>onUpdate("members", row.id, {
                                feeId: event.target.value || null
                            }),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                value: "",
                                children: "No fee"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 907,
                                columnNumber: 202
                            }, this),
                            fees.map((fee)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                    value: fee.id,
                                    children: [
                                        fee.name,
                                        " · ",
                                        money(fee.amountCents)
                                    ]
                                }, fee.id, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 907,
                                    columnNumber: 253
                                }, this))
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 907,
                        columnNumber: 20
                    }, this) : row.fee?.name ?? "Not assigned"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 907,
                    columnNumber: 7
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: status(row.status)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 908,
                    columnNumber: 7
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 904,
            columnNumber: 12
        }, this);
    }
    if (module === "training" || module === "diets") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                nameCell(row.title ?? "Plan"),
                admin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: row.member?.name ?? "Member"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 912,
                    columnNumber: 55
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "details-cell",
                    children: row.details
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 912,
                    columnNumber: 95
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 912,
            columnNumber: 12
        }, this);
    }
    if (module === "attendance") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                nameCell(admin ? row.user?.name ?? "Member" : row.localDate ?? "Check-in"),
                admin && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: row.localDate
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 915,
                    columnNumber: 100
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: formatDate(row.checkedAt)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 915,
                    columnNumber: 125
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 915,
            columnNumber: 12
        }, this);
    }
    if (module === "fees") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                nameCell(row.name ?? "Membership"),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "amount-cell",
                    children: [
                        money(row.amountCents),
                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                            children: " / month"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 918,
                            columnNumber: 103
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 918,
                    columnNumber: 51
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "details-cell",
                    children: row.description || "—"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 918,
                    columnNumber: 132
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: status(row.active ? "ACTIVE" : "INACTIVE")
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 918,
                    columnNumber: 190
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 918,
            columnNumber: 12
        }, this);
    }
    if (module === "payments") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                admin && nameCell(row.member?.name ?? "Member"),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: row.billingMonth
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 921,
                    columnNumber: 63
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "amount-cell",
                    children: [
                        money(row.amountCents),
                        row.expectedCents !== undefined && row.amountCents !== row.expectedCents && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                            children: [
                                " of ",
                                money(row.expectedCents)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 921,
                            columnNumber: 219
                        }, this)
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 921,
                    columnNumber: 90
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: status(row.status, row.status === "PAID" && (row.amountCents ?? 0) >= (row.expectedCents ?? 0))
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 921,
                    columnNumber: 270
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: formatDate(row.dueAt)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 921,
                    columnNumber: 376
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 921,
            columnNumber: 12
        }, this);
    }
    if (module === "offers") {
        return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
            children: [
                nameCell(row.title ?? "Offer"),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    className: "details-cell",
                    children: row.description || "—"
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 924,
                    columnNumber: 46
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: [
                        row.startsAt ? formatDate(row.startsAt) : "Anytime",
                        row.endsAt ? ` – ${formatDate(row.endsAt)}` : ""
                    ]
                }, void 0, true, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 924,
                    columnNumber: 104
                }, this),
                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                    children: status(row.enabled ? "ENABLED" : "DISABLED", row.enabled)
                }, void 0, false, {
                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                    lineNumber: 924,
                    columnNumber: 216
                }, this)
            ]
        }, void 0, true, {
            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
            lineNumber: 924,
            columnNumber: 12
        }, this);
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["Fragment"], {
        children: [
            nameCell(row.name ?? "Equipment"),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                className: "details-cell",
                children: row.description || "—"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 926,
                columnNumber: 47
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 926,
        columnNumber: 10
    }, this);
}
function GymSettings({ gym, onSave, onUpload, onRemoveLogo }) {
    _s1();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(gym?.name ?? "");
    const [timezone, setTimezone] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(gym?.timezone ?? "UTC");
    const [working, setWorking] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    const [message, setMessage] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    async function save(event) {
        event.preventDefault();
        setWorking(true);
        setMessage("");
        try {
            await onSave({
                name,
                timezone
            });
            setMessage("Settings saved.");
        } finally{
            setWorking(false);
        }
    }
    async function upload(event) {
        const file = event.currentTarget.files?.[0];
        if (!file) return;
        setWorking(true);
        setMessage("");
        try {
            await onUpload(file);
            setMessage("Logo updated.");
        } catch (error) {
            setMessage(error instanceof Error ? error.message : "Logo upload failed.");
        } finally{
            setWorking(false);
            event.currentTarget.value = "";
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "settings-grid",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "section-card settings-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "card-kicker",
                        children: "GYM PROFILE"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 963,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "Make it yours"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 963,
                        columnNumber: 57
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "muted",
                        children: "Your name and timezone shape how your team sees check-ins and daily activity."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 963,
                        columnNumber: 79
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                        className: "form-stack settings-form",
                        onSubmit: (event)=>void save(event),
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Gym name"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 965,
                                        columnNumber: 36
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: name,
                                        onChange: (event)=>setName(event.target.value),
                                        required: true,
                                        minLength: 2,
                                        maxLength: 100
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 965,
                                        columnNumber: 57
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 965,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "field",
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                        children: "Timezone"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 966,
                                        columnNumber: 36
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        value: timezone,
                                        onChange: (event)=>setTimezone(event.target.value),
                                        required: true,
                                        placeholder: "America/Los_Angeles"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 966,
                                        columnNumber: 57
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 966,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                className: "field-hint",
                                children: "Use an IANA timezone, like America/Los_Angeles or Asia/Kolkata."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 967,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button button-primary",
                                disabled: working,
                                children: "Save gym settings"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 968,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 964,
                        columnNumber: 9
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "inline-feedback",
                        role: "status",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 970,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 962,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "section-card settings-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "card-kicker",
                        children: "GYM BRANDING"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 973,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                        children: "A familiar welcome"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 973,
                        columnNumber: 58
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "muted",
                        children: "Upload a square PNG, JPEG, or WebP logo up to 2 MB. Only your gym can change this image."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 973,
                        columnNumber: 85
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "logo-preview",
                        children: gym?.logoUrl ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])(__TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$client$2f$image$2d$component$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__$3c$export__Image__as__default$3e$__["default"], {
                            src: `/api/branding/${gym.id}?v=${encodeURIComponent(gym.logoUrl)}`,
                            alt: `${gym.name} logo`,
                            width: 96,
                            height: 96,
                            unoptimized: true
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 974,
                            columnNumber: 55
                        }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                            children: gym?.name?.slice(0, 1).toUpperCase() ?? "C"
                        }, void 0, false, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 974,
                            columnNumber: 196
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 974,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "logo-actions",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                className: "button button-outline upload-label",
                                children: [
                                    "Choose logo",
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                        type: "file",
                                        accept: "image/png,image/jpeg,image/webp",
                                        onChange: (event)=>void upload(event),
                                        disabled: working
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 975,
                                        columnNumber: 104
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 975,
                                columnNumber: 39
                            }, this),
                            gym?.logoUrl && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                className: "button button-quiet",
                                onClick: ()=>void onRemoveLogo(),
                                children: "Remove"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 975,
                                columnNumber: 251
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 975,
                        columnNumber: 9
                    }, this),
                    message && /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        className: "inline-feedback",
                        role: "status",
                        children: message
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 976,
                        columnNumber: 21
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 972,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 961,
        columnNumber: 5
    }, this);
}
_s1(GymSettings, "Xht+xgWSqFVfCWRl1GD84wEnGaQ=");
_c5 = GymSettings;
function PlatformPanel({ data, onReload, onNotice, onError }) {
    _s2();
    const [gymDraft, setGymDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        slug: "",
        timezone: "UTC"
    });
    const [accountDraft, setAccountDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        name: "",
        email: "",
        password: "",
        role: "ADMIN",
        gymId: ""
    });
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function submit(event, action) {
        event.preventDefault();
        setBusy(true);
        onError("");
        try {
            await apiRequest("/api/platform", "POST", action === "create-gym" ? {
                action,
                ...gymDraft
            } : {
                action,
                ...accountDraft
            });
            onNotice(action === "create-gym" ? "Workspace created." : "Account created.");
            if (action === "create-gym") setGymDraft({
                name: "",
                slug: "",
                timezone: "UTC"
            });
            else setAccountDraft({
                name: "",
                email: "",
                password: "",
                role: "ADMIN",
                gymId: ""
            });
            await onReload();
        } catch (error) {
            onError(error instanceof Error ? error.message : "Could not create this record.");
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
        className: "platform-layout",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "platform-forms",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "section-card settings-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-kicker",
                                children: "NEW WORKSPACE"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1014,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Bring a gym on board"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1014,
                                columnNumber: 61
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: "Each workspace is isolated from other gyms."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1014,
                                columnNumber: 90
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "form-stack",
                                onSubmit: (event)=>void submit(event, "create-gym"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Gym name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1016,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                minLength: 2,
                                                maxLength: 100,
                                                value: gymDraft.name,
                                                onChange: (event)=>setGymDraft({
                                                        ...gymDraft,
                                                        name: event.target.value
                                                    }),
                                                placeholder: "Northside Strength"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1016,
                                                columnNumber: 59
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1016,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Workspace slug"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                pattern: "[a-z0-9]+(?:-[a-z0-9]+)*",
                                                maxLength: 60,
                                                value: gymDraft.slug,
                                                onChange: (event)=>setGymDraft({
                                                        ...gymDraft,
                                                        slug: event.target.value.toLowerCase()
                                                    }),
                                                placeholder: "northside-strength"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1017,
                                                columnNumber: 65
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1017,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Timezone"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                value: gymDraft.timezone,
                                                onChange: (event)=>setGymDraft({
                                                        ...gymDraft,
                                                        timezone: event.target.value
                                                    }),
                                                placeholder: "America/Los_Angeles"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1018,
                                                columnNumber: 59
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1018,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button button-primary",
                                        disabled: busy,
                                        children: "Create workspace"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1019,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1015,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1013,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                        className: "section-card settings-card",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-kicker",
                                children: "NEW ACCOUNT"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1023,
                                columnNumber: 11
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Give a team member access"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1023,
                                columnNumber: 59
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                className: "muted",
                                children: "Share their temporary password with them privately."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1023,
                                columnNumber: 93
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                                className: "form-stack",
                                onSubmit: (event)=>void submit(event, "create-account"),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Full name"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1025,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                minLength: 2,
                                                maxLength: 100,
                                                value: accountDraft.name,
                                                onChange: (event)=>setAccountDraft({
                                                        ...accountDraft,
                                                        name: event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1025,
                                                columnNumber: 60
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1025,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Email"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1026,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                type: "email",
                                                value: accountDraft.email,
                                                onChange: (event)=>setAccountDraft({
                                                        ...accountDraft,
                                                        email: event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1026,
                                                columnNumber: 56
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1026,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Temporary password"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1027,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                                required: true,
                                                type: "password",
                                                minLength: 12,
                                                autoComplete: "new-password",
                                                value: accountDraft.password,
                                                onChange: (event)=>setAccountDraft({
                                                        ...accountDraft,
                                                        password: event.target.value
                                                    })
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1027,
                                                columnNumber: 69
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1027,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Role"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1028,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                value: accountDraft.role,
                                                onChange: (event)=>setAccountDraft({
                                                        ...accountDraft,
                                                        role: event.target.value
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "ADMIN",
                                                        children: "Gym administrator"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1028,
                                                        columnNumber: 174
                                                    }, this),
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "USER",
                                                        children: "Member"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1028,
                                                        columnNumber: 222
                                                    }, this)
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1028,
                                                columnNumber: 55
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1028,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                                        className: "field",
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                children: "Workspace"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1029,
                                                columnNumber: 38
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                                required: true,
                                                value: accountDraft.gymId,
                                                onChange: (event)=>setAccountDraft({
                                                        ...accountDraft,
                                                        gymId: event.target.value
                                                    }),
                                                children: [
                                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                        value: "",
                                                        children: "Choose a gym"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1029,
                                                        columnNumber: 190
                                                    }, this),
                                                    data.gyms.filter((gym)=>gym.status === "ACTIVE").map((gym)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                                            value: gym.id,
                                                            children: gym.name
                                                        }, gym.id, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1029,
                                                            columnNumber: 293
                                                        }, this))
                                                ]
                                            }, void 0, true, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1029,
                                                columnNumber: 60
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1029,
                                        columnNumber: 13
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                        className: "button button-primary",
                                        disabled: busy || data.gyms.length === 0,
                                        children: "Create account"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1030,
                                        columnNumber: 13
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1024,
                                columnNumber: 11
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1022,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1012,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "section-card records-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel-title-row",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "card-kicker",
                                    children: "PLATFORM WORKSPACES"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 47
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: [
                                        data.gyms.length,
                                        " ",
                                        data.gyms.length === 1 ? "gym" : "gyms"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1035,
                                    columnNumber: 103
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 1035,
                            columnNumber: 42
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1035,
                        columnNumber: 9
                    }, this),
                    data.gyms.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "empty-state",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                children: "No workspaces yet"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1036,
                                columnNumber: 64
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                children: "Create a gym to get started."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1036,
                                columnNumber: 98
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1036,
                        columnNumber: 35
                    }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "table-scroll",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "data-table",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Gym"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1036,
                                                columnNumber: 213
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Timezone"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1036,
                                                columnNumber: 225
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Accounts"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1036,
                                                columnNumber: 242
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1036,
                                                columnNumber: 259
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Action"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1036,
                                                columnNumber: 274
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1036,
                                        columnNumber: 209
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1036,
                                    columnNumber: 202
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: data.gyms.map((gym)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "cell-title",
                                                            children: gym.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1036,
                                                            columnNumber: 354
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                            className: "cell-subtitle",
                                                            children: gym.slug
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1036,
                                                            columnNumber: 404
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1036,
                                                    columnNumber: 350
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: gym.timezone
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1036,
                                                    columnNumber: 460
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: gym._count.users
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1036,
                                                    columnNumber: 483
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `status-pill ${gym.status === "ACTIVE" ? "status-good" : "status-muted"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                lineNumber: 1036,
                                                                columnNumber: 606
                                                            }, this),
                                                            humanize(gym.status)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1036,
                                                        columnNumber: 514
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1036,
                                                    columnNumber: 510
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "action-button",
                                                        onClick: ()=>void patchPlatform({
                                                                target: "gym",
                                                                id: gym.id,
                                                                status: gym.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
                                                            }, onReload, onNotice, onError),
                                                        children: gym.status === "ACTIVE" ? "Suspend" : "Reactivate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1036,
                                                        columnNumber: 649
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1036,
                                                    columnNumber: 645
                                                }, this)
                                            ]
                                        }, gym.id, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1036,
                                            columnNumber: 333
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1036,
                                    columnNumber: 302
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 1036,
                            columnNumber: 172
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1036,
                        columnNumber: 142
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1034,
                columnNumber: 7
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
                className: "section-card records-card",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "panel-title-row",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                    className: "card-kicker",
                                    children: "PLATFORM ACCOUNTS"
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1039,
                                    columnNumber: 47
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                    children: [
                                        data.accounts.length,
                                        " accounts"
                                    ]
                                }, void 0, true, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1039,
                                    columnNumber: 101
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 1039,
                            columnNumber: 42
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1039,
                        columnNumber: 9
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "table-scroll",
                        children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("table", {
                            className: "data-table",
                            children: [
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("thead", {
                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                        children: [
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Account"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 80
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Role"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 96
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Workspace"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 109
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Status"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 127
                                            }, this),
                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("th", {
                                                children: "Action"
                                            }, void 0, false, {
                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                lineNumber: 1040,
                                                columnNumber: 142
                                            }, this)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1040,
                                        columnNumber: 76
                                    }, this)
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1040,
                                    columnNumber: 69
                                }, this),
                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tbody", {
                                    children: data.accounts.map((account)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("tr", {
                                            children: [
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: [
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                                            className: "cell-title",
                                                            children: account.name
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1040,
                                                            columnNumber: 234
                                                        }, this),
                                                        /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                                            className: "cell-subtitle",
                                                            children: account.email
                                                        }, void 0, false, {
                                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                            lineNumber: 1040,
                                                            columnNumber: 288
                                                        }, this)
                                                    ]
                                                }, void 0, true, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 230
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: humanize(account.role)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 349
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: account.gym?.name ?? "—"
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 382
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                                        className: `status-pill ${account.status === "ACTIVE" ? "status-good" : "status-muted"}`,
                                                        children: [
                                                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("i", {}, void 0, false, {
                                                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                                lineNumber: 1040,
                                                                columnNumber: 517
                                                            }, this),
                                                            humanize(account.status)
                                                        ]
                                                    }, void 0, true, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1040,
                                                        columnNumber: 421
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 417
                                                }, this),
                                                /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("td", {
                                                    children: /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                                                        className: "action-button",
                                                        onClick: ()=>void patchPlatform({
                                                                target: "account",
                                                                id: account.id,
                                                                status: account.status === "ACTIVE" ? "SUSPENDED" : "ACTIVE"
                                                            }, onReload, onNotice, onError),
                                                        children: account.status === "ACTIVE" ? "Suspend" : "Reactivate"
                                                    }, void 0, false, {
                                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                        lineNumber: 1040,
                                                        columnNumber: 564
                                                    }, this)
                                                }, void 0, false, {
                                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                                    lineNumber: 1040,
                                                    columnNumber: 560
                                                }, this)
                                            ]
                                        }, account.id, true, {
                                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                            lineNumber: 1040,
                                            columnNumber: 209
                                        }, this))
                                }, void 0, false, {
                                    fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                    lineNumber: 1040,
                                    columnNumber: 170
                                }, this)
                            ]
                        }, void 0, true, {
                            fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                            lineNumber: 1040,
                            columnNumber: 39
                        }, this)
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1040,
                        columnNumber: 9
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1038,
                columnNumber: 7
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 1011,
        columnNumber: 5
    }, this);
}
_s2(PlatformPanel, "ul+D8M0dZHqlrt23SlrrZwZSl3Q=");
_c6 = PlatformPanel;
async function patchPlatform(payload, reload, notice, error) {
    try {
        await apiRequest("/api/platform", "PATCH", payload);
        notice("Platform record updated.");
        await reload();
    } catch (requestError) {
        error(requestError instanceof Error ? requestError.message : "Could not update platform record.");
    }
}
function SystemSettings({ data, onReload, onNotice, onError }) {
    _s3();
    const values = Object.fromEntries(data.settings.map((setting)=>[
            setting.key,
            setting.value
        ]));
    const [draft, setDraft] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])({
        platform_name: values.platform_name ?? "Clieto Fit",
        support_email: values.support_email ?? "",
        maintenance_mode: values.maintenance_mode ?? "false"
    });
    async function save(event) {
        event.preventDefault();
        try {
            for (const [key, value] of Object.entries(draft)){
                if (key === "support_email" && !value) continue;
                await apiRequest("/api/platform", "POST", {
                    action: "set-setting",
                    key,
                    value
                });
            }
            onNotice("Platform settings saved.");
            await onReload();
        } catch (error) {
            onError(error instanceof Error ? error.message : "Unable to save platform settings.");
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "section-card settings-card narrow-settings",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "card-kicker",
                children: "PLATFORM CONFIGURATION"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1071,
                columnNumber: 74
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Set the tone"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1071,
                columnNumber: 133
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted",
                children: "Only known, non-secret settings can be managed here. Sensitive actions are recorded."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1071,
                columnNumber: 154
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "form-stack settings-form",
                onSubmit: (event)=>void save(event),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Platform name"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1071,
                                columnNumber: 370
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                maxLength: 80,
                                value: draft.platform_name,
                                onChange: (event)=>setDraft({
                                        ...draft,
                                        platform_name: event.target.value
                                    })
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1071,
                                columnNumber: 396
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1071,
                        columnNumber: 345
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Support email"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1071,
                                columnNumber: 570
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "email",
                                value: draft.support_email,
                                onChange: (event)=>setDraft({
                                        ...draft,
                                        support_email: event.target.value
                                    }),
                                placeholder: "help@example.com"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1071,
                                columnNumber: 596
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1071,
                        columnNumber: 545
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Maintenance mode"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1071,
                                columnNumber: 790
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("select", {
                                value: draft.maintenance_mode,
                                onChange: (event)=>setDraft({
                                        ...draft,
                                        maintenance_mode: event.target.value
                                    }),
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "false",
                                        children: "Off"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 941
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("option", {
                                        value: "true",
                                        children: "On"
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1071,
                                        columnNumber: 975
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1071,
                                columnNumber: 819
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("small", {
                                className: "field-hint",
                                children: "This setting is informational; it does not block sign-in."
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1071,
                                columnNumber: 1016
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1071,
                        columnNumber: 765
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button button-primary",
                        children: "Save settings"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1071,
                        columnNumber: 1119
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1071,
                columnNumber: 263
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 1071,
        columnNumber: 10
    }, this);
}
_s3(SystemSettings, "oXvn4b51ViCuOAliRQE6N/sk/9s=");
_c7 = SystemSettings;
function ActivityPanel({ audits }) {
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "section-card records-card",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "panel-title-row",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "card-kicker",
                                children: "SUPER ADMIN ACTIONS"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1075,
                                columnNumber: 95
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                                children: "Recent platform activity"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1075,
                                columnNumber: 151
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1075,
                        columnNumber: 90
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "record-count",
                        children: [
                            "Latest ",
                            audits.length
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1075,
                        columnNumber: 190
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1075,
                columnNumber: 57
            }, this),
            audits.length === 0 ? /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "empty-state",
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                        children: "No activity recorded"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1075,
                        columnNumber: 308
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                        children: "Platform changes will be listed here."
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1075,
                        columnNumber: 345
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1075,
                columnNumber: 279
            }, this) : /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                className: "activity-list",
                children: audits.map((audit)=>/*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("article", {
                        className: "activity-item",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                className: "activity-icon",
                                children: "◷"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1075,
                                columnNumber: 502
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                                children: [
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("strong", {
                                        children: humanize(audit.action)
                                    }, void 0, false, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1075,
                                        columnNumber: 547
                                    }, this),
                                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                                        children: [
                                            audit.actor?.name ?? "A platform administrator",
                                            " · ",
                                            audit.entityType,
                                            " · ",
                                            audit.entityId.slice(0, 10)
                                        ]
                                    }, void 0, true, {
                                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                        lineNumber: 1075,
                                        columnNumber: 588
                                    }, this)
                                ]
                            }, void 0, true, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1075,
                                columnNumber: 542
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("time", {
                                children: formatDate(audit.createdAt)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1075,
                                columnNumber: 703
                            }, this)
                        ]
                    }, audit.id, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1075,
                        columnNumber: 452
                    }, this))
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1075,
                columnNumber: 398
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "field-hint activity-note",
                children: "Audit entries record action type and record ID only, not member health or payment details."
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1075,
                columnNumber: 764
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 1075,
        columnNumber: 10
    }, this);
}
_c8 = ActivityPanel;
function ProfilePanel({ principal, onNotice, onError }) {
    _s4();
    const [name, setName] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(principal.name);
    const [currentPassword, setCurrentPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [newPassword, setNewPassword] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])("");
    const [busy, setBusy] = (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$index$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["useState"])(false);
    async function save(event) {
        event.preventDefault();
        setBusy(true);
        onError("");
        try {
            await apiRequest("/api/account", "PATCH", {
                name,
                ...newPassword ? {
                    currentPassword,
                    newPassword
                } : {}
            });
            setCurrentPassword("");
            setNewPassword("");
            onNotice("Your account is updated.");
        } catch (error) {
            onError(error instanceof Error ? error.message : "Unable to update your account.");
        } finally{
            setBusy(false);
        }
    }
    return /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("section", {
        className: "section-card settings-card narrow-settings",
        children: [
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                className: "card-kicker",
                children: "YOUR PROFILE"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1099,
                columnNumber: 74
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("h2", {
                children: "Keep your account current"
            }, void 0, false, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1099,
                columnNumber: 123
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("p", {
                className: "muted",
                children: [
                    principal.email,
                    " · ",
                    principal.gymName ?? "Clieto Fit"
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1099,
                columnNumber: 157
            }, this),
            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("form", {
                className: "form-stack settings-form",
                onSubmit: (event)=>void save(event),
                children: [
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Your name"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1099,
                                columnNumber: 344
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                required: true,
                                minLength: 2,
                                maxLength: 100,
                                value: name,
                                onChange: (event)=>setName(event.target.value)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1099,
                                columnNumber: 366
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1099,
                        columnNumber: 319
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("div", {
                        className: "form-divider"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1099,
                        columnNumber: 485
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                        className: "card-kicker",
                        children: "CHANGE PASSWORD"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1099,
                        columnNumber: 517
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "Current password"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1099,
                                columnNumber: 594
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                autoComplete: "current-password",
                                value: currentPassword,
                                onChange: (event)=>setCurrentPassword(event.target.value),
                                required: Boolean(newPassword)
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1099,
                                columnNumber: 623
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1099,
                        columnNumber: 569
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("label", {
                        className: "field",
                        children: [
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("span", {
                                children: "New password"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1099,
                                columnNumber: 830
                            }, this),
                            /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("input", {
                                type: "password",
                                autoComplete: "new-password",
                                minLength: 12,
                                maxLength: 128,
                                value: newPassword,
                                onChange: (event)=>setNewPassword(event.target.value),
                                placeholder: "At least 12 characters"
                            }, void 0, false, {
                                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                                lineNumber: 1099,
                                columnNumber: 855
                            }, this)
                        ]
                    }, void 0, true, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1099,
                        columnNumber: 805
                    }, this),
                    /*#__PURE__*/ (0, __TURBOPACK__imported__module__$5b$project$5d2f$node_modules$2f$next$2f$dist$2f$compiled$2f$react$2f$jsx$2d$dev$2d$runtime$2e$js__$5b$app$2d$client$5d$__$28$ecmascript$29$__["jsxDEV"])("button", {
                        className: "button button-primary",
                        disabled: busy,
                        children: busy ? "Saving..." : "Save account"
                    }, void 0, false, {
                        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                        lineNumber: 1099,
                        columnNumber: 1061
                    }, this)
                ]
            }, void 0, true, {
                fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
                lineNumber: 1099,
                columnNumber: 237
            }, this)
        ]
    }, void 0, true, {
        fileName: "[project]/src/app/dashboard/dashboard-client.tsx",
        lineNumber: 1099,
        columnNumber: 10
    }, this);
}
_s4(ProfilePanel, "mrGKPZbS6ZwzmDrl7ggabySzvLI=");
_c9 = ProfilePanel;
function pageDescription(module, role, gymName) {
    if (module === "overview") return role === "SUPER_ADMIN" ? "A clear view across every workspace, with the right boundaries." : role === "ADMIN" ? `A little structure goes a long way at ${gymName ?? "your gym"}.` : "Your next small step is waiting for you.";
    if (module === "payments") return role === "USER" ? "A transparent record of your monthly membership." : "Manual payment records, with monthly status derived from the assigned fee.";
    if (module === "attendance") return role === "USER" ? "Your check-ins, in your gym’s local time." : "A quick view of gym check-ins and daily momentum.";
    if (module === "platform") return "Set up gyms and keep platform accounts in the right hands.";
    if (module === "gym-settings") return "Set your gym timezone, name, and member-facing logo.";
    if (module === "system-settings") return "A small set of platform-wide operational preferences.";
    if (module === "activity") return "A traceable history of sensitive platform-level changes.";
    if (module === "profile") return "Manage the details and password for your own account.";
    return "Everything you need, with access scoped to the right people.";
}
function recordHeading(module, count) {
    if (module === "members") return `${count} ${count === 1 ? "member" : "members"}`;
    if (module === "training") return "Training plans";
    if (module === "diets") return "Diet guidance";
    if (module === "attendance") return "Check-in history";
    if (module === "fees") return "Membership fees";
    if (module === "payments") return "Monthly payment records";
    if (module === "offers") return "Offers";
    return "Gym equipment";
}
function submitLabel(module) {
    const labels = {
        members: "Create member",
        training: "Add training plan",
        diets: "Add diet guidance",
        attendance: "Record check-in",
        fees: "Create fee structure",
        payments: "Add payment record",
        offers: "Create offer",
        equipment: "Add equipment"
    };
    return labels[module] ?? "Add record";
}
function singularLabel(module) {
    const labels = {
        members: "member",
        training: "training plan",
        diets: "diet guidance",
        fees: "fee structure",
        payments: "payment record",
        offers: "offer",
        equipment: "equipment"
    };
    return labels[module] ?? "record";
}
function humanize(value) {
    return value.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (letter)=>letter.toUpperCase());
}
function initials(name) {
    return name.split(/\s+/).slice(0, 2).map((part)=>part[0] ?? "").join("").toUpperCase();
}
function firstName(name) {
    return name.trim().split(/\s+/)[0] ?? "there";
}
function greeting() {
    const hour = new Date().getHours();
    return hour < 12 ? "morning" : hour < 17 ? "afternoon" : "evening";
}
function currentMonthLabel() {
    return new Intl.DateTimeFormat(undefined, {
        month: "long",
        year: "numeric"
    }).format(new Date());
}
var _c, _c1, _c2, _c3, _c4, _c5, _c6, _c7, _c8, _c9;
__turbopack_context__.k.register(_c, "DashboardClient");
__turbopack_context__.k.register(_c1, "Overview");
__turbopack_context__.k.register(_c2, "StatCard");
__turbopack_context__.k.register(_c3, "QuickCard");
__turbopack_context__.k.register(_c4, "ResourcePanel");
__turbopack_context__.k.register(_c5, "GymSettings");
__turbopack_context__.k.register(_c6, "PlatformPanel");
__turbopack_context__.k.register(_c7, "SystemSettings");
__turbopack_context__.k.register(_c8, "ActivityPanel");
__turbopack_context__.k.register(_c9, "ProfilePanel");
if (typeof globalThis.$RefreshHelpers$ === 'object' && globalThis.$RefreshHelpers !== null) {
    __turbopack_context__.k.registerExports(__turbopack_context__.m, globalThis.$RefreshHelpers$);
}
}),
]);

//# sourceMappingURL=src_app_dashboard_dashboard-client_tsx_17yda3asrwdnk._.js.map
const schemaRef = (name: string) => ({ $ref: `#/components/schemas/${name}` });
const responseRef = { $ref: "#/components/responses/ApiError" };
const sessionSecurity = [{ bearerAuth: [] }, { sessionCookie: [] }];

const jsonResponse = (description: string, schema: object) => ({
  description,
  content: { "application/json": { schema } },
});

const jsonRequest = (schema: object) => ({
  required: true,
  content: { "application/json": { schema } },
});

export const openApiDocument = {
  openapi: "3.0.3",
  info: {
    title: "Clieto Fit API",
    version: "1.0.0",
    description:
      "REST API for Clieto Fit web and mobile applications. Protected endpoints accept the web session cookie or a Bearer access token.",
  },
  servers: [{ url: "/", description: "Current API server" }],
  tags: [
    { name: "System", description: "Service status" },
    { name: "Authentication", description: "Sign-in and session operations" },
    { name: "Account", description: "Current account settings" },
    { name: "Gym", description: "Current gym settings" },
    { name: "Branding", description: "Gym logo operations" },
    { name: "Portal", description: "Role-specific dashboard data" },
    { name: "Platform", description: "Super-admin operations" },
    { name: "Records", description: "Gym members and operational records" },
    { name: "Tickets", description: "Support incident reporting and resolution" },
  ],
  paths: {
    "/api/health": {
      get: {
        tags: ["System"],
        summary: "Check API and database health",
        responses: {
          "200": jsonResponse("API and database are available.", {
            type: "object",
            required: ["status"],
            properties: { status: { type: "string", enum: ["ok"] } },
          }),
          "500": responseRef,
        },
      },
    },
    "/api/auth/login": {
      post: {
        tags: ["Authentication"],
        summary: "Sign in to a portal",
        description:
          "Use client=mobile to receive a Bearer token for Swagger's Authorize button. The default client=web creates an HTTP-only session cookie.",
        security: [],
        requestBody: jsonRequest(schemaRef("LoginRequest")),
        responses: {
          "200": jsonResponse("Sign-in succeeded.", schemaRef("LoginResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "429": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/auth/logout": {
      post: {
        tags: ["Authentication"],
        summary: "End the current session",
        security: sessionSecurity,
        responses: {
          "200": jsonResponse("Session ended.", schemaRef("OkResponse")),
          "403": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/auth/me": {
      get: {
        tags: ["Authentication"],
        summary: "Get the signed-in user",
        security: sessionSecurity,
        responses: {
          "200": jsonResponse("Current user.", {
            type: "object",
            required: ["user"],
            properties: { user: schemaRef("Principal") },
          }),
          "401": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/account": {
      patch: {
        tags: ["Account"],
        summary: "Update the current account",
        description:
          "At least one of name or newPassword is required. Changing a password also requires currentPassword and revokes existing sessions.",
        security: sessionSecurity,
        requestBody: jsonRequest(schemaRef("AccountUpdate")),
        responses: {
          "200": jsonResponse("Account updated.", schemaRef("OkResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/gym": {
      get: {
        tags: ["Gym"],
        summary: "Get the current gym",
        description: "Available to gym administrators.",
        security: sessionSecurity,
        responses: {
          "200": jsonResponse("Current gym.", {
            type: "object",
            required: ["gym"],
            properties: { gym: schemaRef("Gym") },
          }),
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "500": responseRef,
        },
      },
      patch: {
        tags: ["Gym"],
        summary: "Update the current gym",
        description: "Available to gym administrators.",
        security: sessionSecurity,
        requestBody: jsonRequest(schemaRef("GymUpdate")),
        responses: {
          "200": jsonResponse("Gym updated.", {
            type: "object",
            required: ["gym"],
            properties: { gym: schemaRef("Gym") },
          }),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/branding": {
      put: {
        tags: ["Branding"],
        summary: "Upload the current gym logo",
        description: "Available to gym administrators. Maximum file size is 2 MB.",
        security: sessionSecurity,
        requestBody: {
          required: true,
          content: {
            "multipart/form-data": {
              schema: {
                type: "object",
                required: ["logo"],
                properties: {
                  logo: {
                    type: "string",
                    format: "binary",
                    description: "PNG, JPEG, or WebP image, up to 2 MB.",
                  },
                },
              },
            },
          },
        },
        responses: {
          "200": jsonResponse("Logo uploaded.", schemaRef("BrandingResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "413": responseRef,
          "500": responseRef,
        },
      },
      delete: {
        tags: ["Branding"],
        summary: "Remove the current gym logo",
        description: "Available to gym administrators.",
        security: sessionSecurity,
        responses: {
          "200": jsonResponse("Logo removed.", schemaRef("OkResponse")),
          "401": responseRef,
          "403": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/branding/{gymId}": {
      get: {
        tags: ["Branding"],
        summary: "Get a gym logo",
        description:
          "Requires an authenticated user. Gym users may only access their own gym's logo; super administrators may access any gym.",
        security: sessionSecurity,
        parameters: [
          {
            name: "gymId",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": {
            description: "Logo image.",
            content: {
              "image/png": { schema: { type: "string", format: "binary" } },
              "image/jpeg": { schema: { type: "string", format: "binary" } },
              "image/webp": { schema: { type: "string", format: "binary" } },
            },
          },
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/portal": {
      get: {
        tags: ["Portal"],
        summary: "Get role-specific dashboard data",
        security: sessionSecurity,
        responses: {
          "200": jsonResponse("Dashboard data for the current role.", schemaRef("PortalResponse")),
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/platform": {
      get: {
        tags: ["Platform"],
        summary: "Get platform administration data",
        description: "Available to super administrators.",
        security: sessionSecurity,
        responses: {
          "200": jsonResponse("Platform data.", schemaRef("PlatformResponse")),
          "401": responseRef,
          "403": responseRef,
          "500": responseRef,
        },
      },
      post: {
        tags: ["Platform"],
        summary: "Create a gym, account, or setting",
        description:
          "Available to super administrators. Select the payload by setting action to create-gym, create-account, or set-setting.",
        security: sessionSecurity,
        requestBody: jsonRequest(schemaRef("PlatformCreateRequest")),
        responses: {
          "200": jsonResponse("Setting updated.", schemaRef("PlatformSettingResponse")),
          "201": jsonResponse("Gym or account created.", schemaRef("PlatformCreateResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "409": responseRef,
          "500": responseRef,
        },
      },
      patch: {
        tags: ["Platform"],
        summary: "Update a gym or account",
        description: "Available to super administrators.",
        security: sessionSecurity,
        requestBody: jsonRequest(schemaRef("PlatformUpdateRequest")),
        responses: {
          "200": jsonResponse("Gym or account updated.", schemaRef("PlatformUpdateResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/tickets": {
      get: {
        tags: ["Tickets"],
        summary: "List support tickets",
        description:
          "Super Admins can view all tickets. Gym Admins and members can view only tickets they reported.",
        security: sessionSecurity,
        responses: {
          "200": jsonResponse("Tickets visible to the current account.", schemaRef("TicketListResponse")),
          "401": responseRef,
          "403": responseRef,
          "500": responseRef,
        },
      },
      post: {
        tags: ["Tickets"],
        summary: "Create a support ticket",
        description:
          "Gym Admins and members can report an issue. New tickets are automatically assigned to an active Super Admin.",
        security: sessionSecurity,
        requestBody: jsonRequest(schemaRef("TicketCreateRequest")),
        responses: {
          "201": jsonResponse("Ticket created.", schemaRef("TicketResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "503": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/tickets/notifications": {
      get: {
        tags: ["Tickets"],
        summary: "Count unread ticket updates",
        description:
          "Counts tickets updated since the supplied cursor. Super Admins see the platform queue; Gym Admins and members see only tickets they reported.",
        security: sessionSecurity,
        parameters: [{
          name: "since",
          in: "query",
          required: true,
          schema: { type: "string", format: "date-time" },
        }],
        responses: {
          "200": jsonResponse("Unread ticket count.", schemaRef("TicketNotificationCountResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/tickets/{id}": {
      patch: {
        tags: ["Tickets"],
        summary: "Update a ticket or add an update",
        description:
          "Only Super Admins can change priority, status, or resolution. A requester can add comments only to their own ticket.",
        security: sessionSecurity,
        parameters: [{
          name: "id",
          in: "path",
          required: true,
          schema: { type: "string" },
        }],
        requestBody: jsonRequest(schemaRef("TicketUpdateRequest")),
        responses: {
          "200": jsonResponse("Ticket updated.", schemaRef("TicketResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "409": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/records/{resource}": {
      get: {
        tags: ["Records"],
        summary: "List records for a resource",
        description:
          "Resources: members, training, diets, attendance, fees, payments, offers, or equipment. Results are scoped to the signed-in user's gym and role.",
        security: sessionSecurity,
        parameters: [{ $ref: "#/components/parameters/Resource" }],
        responses: {
          "200": jsonResponse("Resource records.", schemaRef("RecordListResponse")),
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "500": responseRef,
        },
      },
      post: {
        tags: ["Records"],
        summary: "Create a resource record",
        description:
          "Attendance may be recorded by a member or administrator. Creating other resource types requires a gym administrator.",
        security: sessionSecurity,
        parameters: [{ $ref: "#/components/parameters/Resource" }],
        requestBody: jsonRequest(schemaRef("RecordCreateRequest")),
        responses: {
          "201": jsonResponse("Record created.", schemaRef("RecordResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "409": responseRef,
          "500": responseRef,
        },
      },
    },
    "/api/records/{resource}/{id}": {
      patch: {
        tags: ["Records"],
        summary: "Update a resource record",
        description:
          "Available to gym administrators for members, training, diets, fees, payments, offers, and equipment.",
        security: sessionSecurity,
        parameters: [
          { $ref: "#/components/parameters/Resource" },
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        requestBody: jsonRequest(schemaRef("RecordUpdateRequest")),
        responses: {
          "200": jsonResponse("Record updated.", schemaRef("RecordResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "409": responseRef,
          "500": responseRef,
        },
      },
      delete: {
        tags: ["Records"],
        summary: "Delete a resource record",
        description:
          "Available to gym administrators for attendance, training, diets, fees, offers, and equipment.",
        security: sessionSecurity,
        parameters: [
          { $ref: "#/components/parameters/Resource" },
          {
            name: "id",
            in: "path",
            required: true,
            schema: { type: "string" },
          },
        ],
        responses: {
          "200": jsonResponse("Record deleted.", schemaRef("OkResponse")),
          "400": responseRef,
          "401": responseRef,
          "403": responseRef,
          "404": responseRef,
          "500": responseRef,
        },
      },
    },
  },
  components: {
    securitySchemes: {
      bearerAuth: {
        type: "http",
        scheme: "bearer",
        description:
          "Use the accessToken returned by POST /api/auth/login with client=mobile.",
      },
      sessionCookie: {
        type: "apiKey",
        in: "cookie",
        name: "clieto_fit_session",
        description: "HTTP-only session cookie created by a web sign-in.",
      },
    },
    parameters: {
      Resource: {
        name: "resource",
        in: "path",
        required: true,
        schema: {
          type: "string",
          enum: [
            "members",
            "training",
            "diets",
            "attendance",
            "fees",
            "payments",
            "offers",
            "equipment",
          ],
        },
      },
    },
    responses: {
      ApiError: {
        description: "The request failed.",
        content: {
          "application/json": { schema: schemaRef("ApiError") },
        },
      },
    },
    schemas: {
      ApiError: {
        type: "object",
        required: ["error"],
        properties: {
          error: { type: "string" },
          details: {
            type: "array",
            items: {
              type: "object",
              required: ["path", "message"],
              properties: {
                path: { type: "string" },
                message: { type: "string" },
              },
            },
          },
        },
      },
      OkResponse: {
        type: "object",
        required: ["ok"],
        properties: { ok: { type: "boolean", enum: [true] } },
      },
      LoginRequest: {
        type: "object",
        required: ["email", "password", "portal"],
        properties: {
          email: { type: "string", format: "email", maxLength: 254 },
          password: { type: "string", minLength: 1, maxLength: 128 },
          portal: { type: "string", enum: ["SUPER_ADMIN", "ADMIN", "USER"] },
          client: {
            type: "string",
            enum: ["web", "mobile"],
            default: "web",
          },
        },
      },
      LoginUser: {
        type: "object",
        required: ["id", "name", "email", "role"],
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          email: { type: "string", format: "email" },
          role: { type: "string", enum: ["SUPER_ADMIN", "ADMIN", "USER"] },
        },
      },
      LoginResponse: {
        oneOf: [
          {
            type: "object",
            required: ["user", "redirectTo"],
            properties: {
              user: schemaRef("LoginUser"),
              redirectTo: { type: "string", example: "/dashboard" },
            },
          },
          {
            type: "object",
            required: ["user", "accessToken", "tokenType", "expiresAt"],
            properties: {
              user: schemaRef("LoginUser"),
              accessToken: { type: "string" },
              tokenType: { type: "string", enum: ["Bearer"] },
              expiresAt: { type: "string", format: "date-time" },
            },
          },
        ],
      },
      Principal: {
        type: "object",
        required: ["id", "email", "name", "role", "gymId", "gymName", "gymTimezone", "feeId"],
        properties: {
          id: { type: "string" },
          email: { type: "string", format: "email" },
          name: { type: "string" },
          phone: { type: "string", nullable: true },
          role: { type: "string", enum: ["SUPER_ADMIN", "ADMIN", "USER"] },
          gymId: { type: "string", nullable: true },
          gymName: { type: "string", nullable: true },
          gymTimezone: { type: "string", nullable: true },
          feeId: { type: "string", nullable: true },
        },
      },
      AccountUpdate: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 2, maxLength: 100 },
          phone: { type: "string", nullable: true, description: "Optional contact number, used for support tickets." },
          currentPassword: { type: "string", minLength: 1, maxLength: 128 },
          newPassword: { type: "string", minLength: 12, maxLength: 128 },
        },
        anyOf: [
          { required: ["name"] },
          { required: ["phone"] },
          { required: ["newPassword", "currentPassword"] },
        ],
      },
      Gym: {
        type: "object",
        properties: {
          id: { type: "string" },
          name: { type: "string" },
          slug: { type: "string" },
          timezone: { type: "string" },
          logoUrl: { type: "string", nullable: true },
          status: { type: "string", enum: ["ACTIVE", "SUSPENDED"] },
        },
      },
      GymUpdate: {
        type: "object",
        properties: {
          name: { type: "string", minLength: 2, maxLength: 100 },
          timezone: { type: "string", minLength: 1, maxLength: 80 },
        },
        anyOf: [{ required: ["name"] }, { required: ["timezone"] }],
      },
      BrandingResponse: {
        type: "object",
        required: ["logoUrl"],
        properties: {
          logoUrl: { type: "string" },
          warning: { type: "string" },
        },
      },
      PortalResponse: {
        type: "object",
        required: ["user", "metrics"],
        properties: {
          user: schemaRef("Principal"),
          gym: schemaRef("Gym"),
          metrics: { type: "object", additionalProperties: true },
        },
      },
      PlatformResponse: {
        type: "object",
        required: ["gyms", "accounts", "settings", "audits"],
        properties: {
          gyms: { type: "array", items: { type: "object", additionalProperties: true } },
          accounts: { type: "array", items: { type: "object", additionalProperties: true } },
          settings: { type: "array", items: { type: "object", additionalProperties: true } },
          audits: { type: "array", items: { type: "object", additionalProperties: true } },
        },
      },
      PlatformCreateRequest: {
        oneOf: [
          {
            type: "object",
            required: ["action", "name", "slug", "timezone"],
            properties: {
              action: { type: "string", enum: ["create-gym"] },
              name: { type: "string", minLength: 2, maxLength: 100 },
              slug: { type: "string", pattern: "^[a-z0-9]+(?:-[a-z0-9]+)*$", maxLength: 60 },
              timezone: { type: "string", minLength: 1, maxLength: 80 },
            },
          },
          {
            type: "object",
            required: ["action", "name", "email", "password", "role", "gymId"],
            properties: {
              action: { type: "string", enum: ["create-account"] },
              name: { type: "string", minLength: 2, maxLength: 100 },
              email: { type: "string", format: "email", maxLength: 254 },
              password: { type: "string", minLength: 12, maxLength: 128 },
              phone: { type: "string", nullable: true, description: "Optional contact number." },
              role: { type: "string", enum: ["ADMIN", "USER"] },
              gymId: { type: "string", description: "Gym CUID." },
            },
          },
          {
            type: "object",
            required: ["action", "key", "value"],
            properties: {
              action: { type: "string", enum: ["set-setting"] },
              key: {
                type: "string",
                enum: ["platform_name", "support_email", "maintenance_mode"],
              },
              value: {
                type: "string",
                description:
                  "Setting value. maintenance_mode accepts only true or false.",
              },
            },
          },
        ],
      },
      PlatformUpdateRequest: {
        oneOf: [
          {
            type: "object",
            required: ["target", "id"],
            properties: {
              target: { type: "string", enum: ["gym"] },
              id: { type: "string", description: "Gym CUID." },
              name: { type: "string", minLength: 2, maxLength: 100 },
              timezone: { type: "string", minLength: 1, maxLength: 80 },
              status: { type: "string", enum: ["ACTIVE", "SUSPENDED"] },
            },
            anyOf: [{ required: ["name"] }, { required: ["timezone"] }, { required: ["status"] }],
          },
          {
            type: "object",
            required: ["target", "id"],
            properties: {
              target: { type: "string", enum: ["account"] },
              id: { type: "string", description: "Account CUID." },
              status: { type: "string", enum: ["ACTIVE", "SUSPENDED"] },
              role: { type: "string", enum: ["ADMIN", "USER"] },
            },
            anyOf: [{ required: ["status"] }, { required: ["role"] }],
          },
        ],
      },
      PlatformCreateResponse: {
        type: "object",
        additionalProperties: true,
        description: "Contains either the created gym or account.",
      },
      PlatformSettingResponse: {
        type: "object",
        required: ["setting"],
        properties: { setting: { type: "object", additionalProperties: true } },
      },
      PlatformUpdateResponse: {
        type: "object",
        description: "Contains the updated gym or account.",
        properties: {
          gym: { type: "object", additionalProperties: true },
          account: { type: "object", additionalProperties: true },
        },
      },
      Record: { type: "object", additionalProperties: true },
      RecordListResponse: {
        type: "object",
        required: ["records"],
        properties: { records: { type: "array", items: schemaRef("Record") } },
      },
      RecordResponse: {
        type: "object",
        required: ["record"],
        properties: { record: schemaRef("Record") },
      },
      Ticket: {
        type: "object",
        additionalProperties: true,
        required: ["id", "ticketNumber", "subject", "description", "category", "priority", "status"],
        properties: {
          id: { type: "string" },
          ticketNumber: { type: "integer", example: 1 },
          subject: { type: "string" },
          description: { type: "string" },
          category: {
            type: "string",
            enum: ["ACCOUNT_ACCESS", "BILLING_PAYMENT", "ATTENDANCE", "TRAINING_DIET", "EQUIPMENT_FACILITY", "APP_TECHNICAL", "OTHER"],
          },
          subcategory: { type: "string", nullable: true },
          priority: { type: "string", enum: ["LOW", "MEDIUM", "HIGH"] },
          contactPhone: { type: "string", nullable: true },
          status: { type: "string", enum: ["NEW", "IN_PROGRESS", "ON_HOLD", "RESOLVED", "CLOSED"] },
          resolutionNotes: { type: "string", nullable: true },
          resolvedAt: { type: "string", format: "date-time", nullable: true },
          createdAt: { type: "string", format: "date-time" },
          updatedAt: { type: "string", format: "date-time" },
          reporter: { type: "object", additionalProperties: true },
          assignedTo: { type: "object", additionalProperties: true },
          gym: { type: "object", additionalProperties: true },
          comments: { type: "array", items: { type: "object", additionalProperties: true } },
        },
      },
      TicketListResponse: {
        type: "object",
        required: ["tickets"],
        properties: { tickets: { type: "array", items: schemaRef("Ticket") } },
      },
      TicketNotificationCountResponse: {
        type: "object",
        required: ["count"],
        properties: { count: { type: "integer", minimum: 0 } },
      },
      TicketResponse: {
        type: "object",
        required: ["ticket"],
        properties: { ticket: schemaRef("Ticket") },
      },
      TicketCreateRequest: {
        type: "object",
        required: ["subject", "description", "category"],
        properties: {
          subject: { type: "string", minLength: 4, maxLength: 120 },
          description: { type: "string", minLength: 10, maxLength: 5000 },
          category: {
            type: "string",
            enum: ["ACCOUNT_ACCESS", "BILLING_PAYMENT", "ATTENDANCE", "TRAINING_DIET", "EQUIPMENT_FACILITY", "APP_TECHNICAL", "OTHER"],
          },
          subcategory: { type: "string", maxLength: 80 },
          priority: { type: "string", enum: ["LOW", "MEDIUM", "HIGH"], default: "MEDIUM" },
          contactPhone: {
            type: "string",
            minLength: 7,
            maxLength: 25,
            description: "Used when the reporter has no saved account phone number.",
          },
        },
      },
      TicketUpdateRequest: {
        type: "object",
        properties: {
          status: { type: "string", enum: ["NEW", "IN_PROGRESS", "ON_HOLD", "RESOLVED", "CLOSED"] },
          priority: { type: "string", enum: ["LOW", "MEDIUM", "HIGH"] },
          resolutionNotes: { type: "string", minLength: 2, maxLength: 4000 },
          comment: { type: "string", minLength: 1, maxLength: 2000 },
        },
        anyOf: [
          { required: ["status"] },
          { required: ["priority"] },
          { required: ["resolutionNotes"] },
          { required: ["comment"] },
        ],
      },
      RecordCreateRequest: {
        anyOf: [
          {
            type: "object",
            required: ["name", "email", "password"],
            properties: {
              name: { type: "string", minLength: 2, maxLength: 100 },
              email: { type: "string", format: "email", maxLength: 254 },
              password: { type: "string", minLength: 12, maxLength: 128 },
              phone: { type: "string", nullable: true, description: "Optional contact number." },
              feeId: { type: "string", nullable: true, description: "Fee structure CUID." },
            },
          },
          {
            type: "object",
            required: ["title", "details", "memberId"],
            properties: {
              title: { type: "string", minLength: 2, maxLength: 120 },
              details: { type: "string", minLength: 1, maxLength: 10000 },
              memberId: { type: "string", description: "Member CUID." },
            },
          },
          {
            type: "object",
            properties: { memberId: { type: "string", description: "Member CUID." } },
            additionalProperties: false,
          },
          {
            type: "object",
            required: ["name", "amountCents"],
            properties: {
              name: { type: "string", minLength: 2, maxLength: 100 },
              amountCents: { type: "integer", minimum: 1, maximum: 100000000 },
              description: { type: "string", maxLength: 2000, default: "" },
            },
          },
          {
            type: "object",
            required: ["memberId", "billingMonth", "amountCents", "status"],
            properties: {
              memberId: { type: "string", description: "Member CUID." },
              billingMonth: { type: "string", pattern: "^\\d{4}-(0[1-9]|1[0-2])$" },
              amountCents: { type: "integer", minimum: 0, maximum: 100000000 },
              status: { type: "string", enum: ["PAID", "PARTIAL", "OVERDUE", "REFUNDED"] },
              dueAt: { type: "string", format: "date-time", nullable: true },
            },
          },
          {
            type: "object",
            required: ["title"],
            properties: {
              title: { type: "string", minLength: 2, maxLength: 120 },
              description: { type: "string", maxLength: 4000, default: "" },
              enabled: { type: "boolean", default: false },
              startsAt: { type: "string", format: "date-time", nullable: true },
              endsAt: { type: "string", format: "date-time", nullable: true },
            },
          },
          {
            type: "object",
            required: ["name"],
            properties: {
              name: { type: "string", minLength: 2, maxLength: 120 },
              description: { type: "string", maxLength: 2000, default: "" },
            },
          },
        ],
        description:
          "Body depends on resource. Attendance accepts memberId; training and diets use title/details/memberId; members use name/email/password/feeId; fees use name/amountCents/description; payments use memberId/billingMonth/amountCents/status/dueAt; offers use title/description/enabled/startsAt/endsAt; equipment uses name/description.",
      },
      RecordUpdateRequest: {
        anyOf: [
          {
            type: "object",
            properties: {
              name: { type: "string", minLength: 2, maxLength: 100 },
              email: { type: "string", format: "email", maxLength: 254 },
              password: { type: "string", minLength: 12, maxLength: 128 },
              feeId: { type: "string", nullable: true },
              status: { type: "string", enum: ["ACTIVE", "SUSPENDED"] },
            },
            minProperties: 1,
          },
          {
            type: "object",
            properties: {
              title: { type: "string", minLength: 2, maxLength: 120 },
              details: { type: "string", minLength: 1, maxLength: 10000 },
              memberId: { type: "string" },
            },
            minProperties: 1,
          },
          {
            type: "object",
            properties: {
              name: { type: "string", minLength: 2, maxLength: 100 },
              amountCents: { type: "integer", minimum: 1, maximum: 100000000 },
              description: { type: "string", maxLength: 2000 },
              active: { type: "boolean" },
            },
            minProperties: 1,
          },
          {
            type: "object",
            properties: {
              amountCents: { type: "integer", minimum: 0, maximum: 100000000 },
              status: { type: "string", enum: ["PAID", "PARTIAL", "OVERDUE", "REFUNDED"] },
              dueAt: { type: "string", format: "date-time", nullable: true },
            },
            minProperties: 1,
          },
          {
            type: "object",
            properties: {
              title: { type: "string", minLength: 2, maxLength: 120 },
              description: { type: "string", maxLength: 4000 },
              enabled: { type: "boolean" },
              startsAt: { type: "string", format: "date-time", nullable: true },
              endsAt: { type: "string", format: "date-time", nullable: true },
            },
            minProperties: 1,
          },
          {
            type: "object",
            properties: {
              name: { type: "string", minLength: 2, maxLength: 120 },
              description: { type: "string", maxLength: 2000 },
            },
            minProperties: 1,
          },
        ],
        description:
          "Body depends on resource. Only gym administrators can update records.",
      },
    },
  },
};

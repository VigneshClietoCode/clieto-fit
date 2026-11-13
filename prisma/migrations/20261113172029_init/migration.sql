-- CreateTable
CREATE TABLE "Gym" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "timezone" TEXT NOT NULL DEFAULT 'UTC',
    "logoUrl" TEXT,
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "passwordHash" TEXT NOT NULL,
    "role" TEXT NOT NULL DEFAULT 'USER',
    "status" TEXT NOT NULL DEFAULT 'ACTIVE',
    "gymId" TEXT,
    "feeId" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "User_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE SET NULL ON UPDATE CASCADE,
    CONSTRAINT "User_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "FeeStructure" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tokenHash" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "TrainingPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gymId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "TrainingPlan_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TrainingPlan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "TrainingPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "DietPlan" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gymId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "createdById" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "details" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "DietPlan_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DietPlan_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "DietPlan_createdById_fkey" FOREIGN KEY ("createdById") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Attendance" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gymId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "localDate" TEXT NOT NULL,
    "checkedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Attendance_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Attendance_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "FeeStructure" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gymId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "active" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "FeeStructure_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Payment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gymId" TEXT NOT NULL,
    "memberId" TEXT NOT NULL,
    "feeId" TEXT,
    "billingMonth" TEXT NOT NULL,
    "amountCents" INTEGER NOT NULL,
    "expectedCents" INTEGER NOT NULL,
    "status" TEXT NOT NULL,
    "dueAt" DATETIME,
    "recordedAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "Payment_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_memberId_fkey" FOREIGN KEY ("memberId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Payment_feeId_fkey" FOREIGN KEY ("feeId") REFERENCES "FeeStructure" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Offer" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gymId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "enabled" BOOLEAN NOT NULL DEFAULT false,
    "startsAt" DATETIME,
    "endsAt" DATETIME,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Offer_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Equipment" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "gymId" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Equipment_gymId_fkey" FOREIGN KEY ("gymId") REFERENCES "Gym" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SystemSetting" (
    "key" TEXT NOT NULL PRIMARY KEY,
    "value" TEXT NOT NULL,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "AuditLog" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "actorId" TEXT,
    "action" TEXT NOT NULL,
    "entityType" TEXT NOT NULL,
    "entityId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "AuditLog_actorId_fkey" FOREIGN KEY ("actorId") REFERENCES "User" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "Gym_slug_key" ON "Gym"("slug");

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "User_gymId_role_status_idx" ON "User"("gymId", "role", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Session_tokenHash_key" ON "Session"("tokenHash");

-- CreateIndex
CREATE INDEX "Session_userId_expiresAt_idx" ON "Session"("userId", "expiresAt");

-- CreateIndex
CREATE INDEX "TrainingPlan_gymId_memberId_idx" ON "TrainingPlan"("gymId", "memberId");

-- CreateIndex
CREATE INDEX "DietPlan_gymId_memberId_idx" ON "DietPlan"("gymId", "memberId");

-- CreateIndex
CREATE INDEX "Attendance_gymId_localDate_idx" ON "Attendance"("gymId", "localDate");

-- CreateIndex
CREATE UNIQUE INDEX "Attendance_gymId_userId_localDate_key" ON "Attendance"("gymId", "userId", "localDate");

-- CreateIndex
CREATE INDEX "Payment_gymId_billingMonth_status_idx" ON "Payment"("gymId", "billingMonth", "status");

-- CreateIndex
CREATE UNIQUE INDEX "Payment_gymId_memberId_billingMonth_key" ON "Payment"("gymId", "memberId", "billingMonth");

-- CreateIndex
CREATE INDEX "AuditLog_createdAt_idx" ON "AuditLog"("createdAt");

-- CreateIndex
CREATE INDEX "AuditLog_actorId_createdAt_idx" ON "AuditLog"("actorId", "createdAt");

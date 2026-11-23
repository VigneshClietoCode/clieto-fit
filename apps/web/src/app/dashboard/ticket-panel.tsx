"use client";

import { FormEvent, useCallback, useEffect, useMemo, useRef, useState } from "react";
import {
  TICKET_CATEGORIES,
  TICKET_CATEGORY_LABELS,
  TICKET_PRIORITIES,
  TICKET_STATUS_LABELS,
  type TicketCategory,
  type TicketStatus,
} from "@clieto-fit/shared/ticket-types";
import type { Role } from "@clieto-fit/shared/auth-types";
import { readApiJson } from "@/lib/api-response";
import { apiUrl } from "@/lib/api-url";

type TicketComment = {
  id: string;
  body: string;
  createdAt: string;
  author: { id: string; name: string; role: string };
};

type Ticket = {
  id: string;
  ticketNumber: number;
  subject: string;
  description: string;
  category: TicketCategory;
  subcategory: string | null;
  priority: string;
  status: TicketStatus;
  resolutionNotes: string | null;
  resolvedAt: string | null;
  createdAt: string;
  updatedAt: string;
  reporter: { id: string; name: string; email: string; role: string };
  assignedTo: { id: string; name: string; email: string };
  gym: { id: string; name: string };
  comments: TicketComment[];
};

type TicketDraft = {
  subject: string;
  description: string;
  category: TicketCategory | "";
  subcategory: string;
  priority: string;
};

const initialDraft: TicketDraft = {
  subject: "",
  description: "",
  category: "",
  subcategory: "",
  priority: "MEDIUM",
};

async function request<T>(url: string, method = "GET", body?: unknown): Promise<T> {
  const response = await fetch(apiUrl(url), {
    method,
    cache: "no-store",
    credentials: "include",
    headers: body === undefined ? undefined : { "Content-Type": "application/json" },
    body: body === undefined ? undefined : JSON.stringify(body),
  });
  const result = await readApiJson<T & { error?: string }>(response);
  if (!response.ok) throw new Error(result.error ?? "The request could not be completed.");
  return result;
}

function ticketNumber(ticket: Ticket): string {
  return `INC${String(ticket.ticketNumber).padStart(6, "0")}`;
}

function formatDateTime(value: string): string {
  const date = new Date(value);
  return Number.isNaN(date.getTime())
    ? value
    : new Intl.DateTimeFormat(undefined, { dateStyle: "medium", timeStyle: "short" }).format(date);
}

function label(value: string): string {
  return value.toLowerCase().replace(/_/g, " ").replace(/\b\w/g, (letter) => letter.toUpperCase());
}

function nextStatuses(status: TicketStatus): TicketStatus[] {
  const transitions: Record<TicketStatus, TicketStatus[]> = {
    NEW: ["NEW", "IN_PROGRESS", "ON_HOLD", "RESOLVED"],
    IN_PROGRESS: ["IN_PROGRESS", "ON_HOLD", "RESOLVED"],
    ON_HOLD: ["ON_HOLD", "IN_PROGRESS", "RESOLVED"],
    RESOLVED: ["RESOLVED", "IN_PROGRESS", "CLOSED"],
    CLOSED: ["CLOSED"],
  };
  return transitions[status];
}

export default function TicketPanel({
  role,
  refreshKey,
}: {
  role: Role;
  refreshKey: number;
}) {
  const isSuperAdmin = role === "SUPER_ADMIN";
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [selectedId, setSelectedId] = useState("");
  const selectedIdRef = useRef("");
  const [draft, setDraft] = useState<TicketDraft>(initialDraft);
  const [comment, setComment] = useState("");
  const [status, setStatus] = useState<TicketStatus>("NEW");
  const [priority, setPriority] = useState("MEDIUM");
  const [resolutionNotes, setResolutionNotes] = useState("");
  const [busy, setBusy] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [notice, setNotice] = useState("");

  const loadTickets = useCallback(async () => {
    const result = await request<{ tickets: Ticket[] }>("/api/tickets");
    setTickets(result.tickets);
    const chosen = result.tickets.find((ticket) => ticket.id === selectedIdRef.current) ?? result.tickets[0];
    selectedIdRef.current = chosen?.id ?? "";
    setSelectedId(selectedIdRef.current);
    if (chosen) {
      setStatus(chosen.status);
      setPriority(chosen.priority);
      setResolutionNotes(chosen.resolutionNotes ?? "");
    }
  }, []);

  useEffect(() => {
    let active = true;
    request<{ tickets: Ticket[] }>("/api/tickets")
      .then(({ tickets: result }) => {
        if (!active) return;
        setTickets(result);
        const chosen = result.find((ticket) => ticket.id === selectedIdRef.current) ?? result[0];
        selectedIdRef.current = chosen?.id ?? "";
        setSelectedId(selectedIdRef.current);
        if (chosen) {
          setStatus(chosen.status);
          setPriority(chosen.priority);
          setResolutionNotes(chosen.resolutionNotes ?? "");
        }
      })
      .catch((requestError: unknown) => {
        if (active) setError(requestError instanceof Error ? requestError.message : "Unable to load tickets.");
      })
      .finally(() => {
        if (active) setLoading(false);
      });
    return () => { active = false; };
  }, [refreshKey]);

  const selected = useMemo(
    () => tickets.find((ticket) => ticket.id === selectedId) ?? null,
    [selectedId, tickets],
  );

  async function createTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setBusy(true);
    setError("");
    setNotice("");
    try {
      const { ticket } = await request<{ ticket: Ticket }>("/api/tickets", "POST", draft);
      setDraft(initialDraft);
      await loadTickets();
      selectedIdRef.current = ticket.id;
      setSelectedId(ticket.id);
      setStatus(ticket.status);
      setPriority(ticket.priority);
      setResolutionNotes(ticket.resolutionNotes ?? "");
      setNotice(`${ticketNumber(ticket)} was submitted to the Super Admin team.`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to submit this ticket.");
    } finally {
      setBusy(false);
    }
  }

  async function addComment(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected || !comment.trim()) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await request(`/api/tickets/${selected.id}`, "PATCH", { comment });
      setComment("");
      await loadTickets();
      setNotice("Your update was added to the ticket.");
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to add this update.");
    } finally {
      setBusy(false);
    }
  }

  async function updateTicket(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!selected) return;
    setBusy(true);
    setError("");
    setNotice("");
    try {
      await request(`/api/tickets/${selected.id}`, "PATCH", {
        status,
        priority,
        ...(resolutionNotes.trim() ? { resolutionNotes } : {}),
      });
      await loadTickets();
      setNotice(`${ticketNumber(selected)} was updated.`);
    } catch (requestError) {
      setError(requestError instanceof Error ? requestError.message : "Unable to update this ticket.");
    } finally {
      setBusy(false);
    }
  }

  return (
    <>
      {error && <div className="alert alert-error" role="alert"><span>!</span>{error}<button onClick={() => setError("")} aria-label="Dismiss error">×</button></div>}
      {notice && <div className="alert alert-success" role="status"><span>✓</span>{notice}<button onClick={() => setNotice("")} aria-label="Dismiss message">×</button></div>}
      <div className="ticket-layout">
      {!isSuperAdmin && (
        <section className="section-card ticket-create-card">
          <div className="panel-title-row">
            <div><span className="card-kicker">SUPPORT REQUEST</span><h2>Report an issue</h2></div>
            <span className="record-count">Assigned to Super Admin</span>
          </div>
          <p className="ticket-intro">Describe the issue and follow its status and replies here.</p>
          <form className="ticket-create-form" onSubmit={(event) => void createTicket(event)}>
            <label className="field"><span>Short description</span><input required minLength={4} maxLength={120} value={draft.subject} onChange={(event) => setDraft({ ...draft, subject: event.target.value })} placeholder="Summarize the issue" /></label>
            <label className="field"><span>Category</span><select required value={draft.category} onChange={(event) => setDraft({ ...draft, category: event.target.value as TicketCategory })}><option value="">Choose a category</option>{TICKET_CATEGORIES.map((category) => <option key={category} value={category}>{TICKET_CATEGORY_LABELS[category]}</option>)}</select></label>
            <label className="field"><span>Subcategory (optional)</span><input maxLength={80} value={draft.subcategory} onChange={(event) => setDraft({ ...draft, subcategory: event.target.value })} placeholder="e.g. Login, treadmill, class booking" /></label>
            <label className="field"><span>Priority</span><select value={draft.priority} onChange={(event) => setDraft({ ...draft, priority: event.target.value })}><option value="LOW">Low</option><option value="MEDIUM">Medium</option><option value="HIGH">High</option></select></label>
            <label className="field ticket-description-field"><span>What happened?</span><textarea required minLength={10} maxLength={5000} rows={4} value={draft.description} onChange={(event) => setDraft({ ...draft, description: event.target.value })} placeholder="Include what you were trying to do and any steps to reproduce the issue." /></label>
            <button className="button button-primary" disabled={busy}>{busy ? "Submitting..." : "Submit ticket"}</button>
          </form>
        </section>
      )}

      <section className="section-card ticket-list-card">
        <div className="panel-title-row">
          <div><span className="card-kicker">{isSuperAdmin ? "PLATFORM SUPPORT" : "TICKET HISTORY"}</span><h2>{isSuperAdmin ? "Incident queue" : "Your tickets"}</h2></div>
          <span className="record-count">{tickets.length} {tickets.length === 1 ? "ticket" : "tickets"}</span>
        </div>
        <button className="ticket-refresh" onClick={() => {
          setLoading(true);
          setError("");
          void loadTickets().catch((requestError: unknown) => setError(requestError instanceof Error ? requestError.message : "Unable to refresh tickets.")).finally(() => setLoading(false));
        }}>Refresh queue</button>
        {loading ? <div className="empty-state"><span className="spinner" />Loading tickets…</div> : tickets.length === 0 ? (
          <div className="empty-state"><span className="empty-mark">◷</span><strong>No tickets yet</strong><p>{isSuperAdmin ? "New support requests will appear here." : "When you submit a request, it will appear here for tracking."}</p></div>
        ) : (
          <div className="ticket-list">
            {tickets.map((ticket) => (
              <button key={ticket.id} className={`ticket-list-item${selectedId === ticket.id ? " ticket-list-item-active" : ""}`} onClick={() => {
                selectedIdRef.current = ticket.id;
                setSelectedId(ticket.id);
                setStatus(ticket.status);
                setPriority(ticket.priority);
                setResolutionNotes(ticket.resolutionNotes ?? "");
                setComment("");
              }} aria-pressed={selectedId === ticket.id}>
                <span className="ticket-list-top"><strong>{ticketNumber(ticket)}</strong><span className={`ticket-status status-${ticket.status.toLowerCase()}`}>{TICKET_STATUS_LABELS[ticket.status]}</span></span>
                <strong className="ticket-subject">{ticket.subject}</strong>
                <span className="ticket-list-meta">{TICKET_CATEGORY_LABELS[ticket.category] ?? label(ticket.category)} · <span className={`ticket-priority priority-${ticket.priority.toLowerCase()}`}>{label(ticket.priority)}</span></span>
                <small>{isSuperAdmin ? `${ticket.reporter.name} · ${ticket.gym.name}` : `Updated ${formatDateTime(ticket.updatedAt)}`}</small>
              </button>
            ))}
          </div>
        )}
      </section>

      <section className="section-card ticket-detail-card">
        {!selected ? (
          <div className="empty-state"><span className="empty-mark">◎</span><strong>Select a ticket</strong><p>Ticket details and updates will appear here.</p></div>
        ) : (
          <>
            <div className="ticket-detail-heading">
              <div><span className="card-kicker">{ticketNumber(selected)} · {TICKET_CATEGORY_LABELS[selected.category] ?? label(selected.category)}</span><h2>{selected.subject}</h2></div>
              <span className={`ticket-status status-${selected.status.toLowerCase()}`}>{TICKET_STATUS_LABELS[selected.status]}</span>
            </div>
            <div className="ticket-metadata">
              <div><small>Priority</small><strong className={`ticket-priority priority-${selected.priority.toLowerCase()}`}>{label(selected.priority)}</strong></div>
              <div><small>Submitted</small><strong>{formatDateTime(selected.createdAt)}</strong></div>
              <div><small>Assigned to</small><strong>{selected.assignedTo.name}</strong></div>
              {isSuperAdmin && <div><small>Requested by</small><strong>{selected.reporter.name} · {selected.reporter.role === "ADMIN" ? "Gym Admin" : "Member"}</strong></div>}
              {isSuperAdmin && <div><small>Gym</small><strong>{selected.gym.name}</strong></div>}
              {selected.subcategory && <div><small>Subcategory</small><strong>{selected.subcategory}</strong></div>}
            </div>
            <div className="ticket-description"><span className="card-kicker">DESCRIPTION</span><p>{selected.description}</p></div>

            {isSuperAdmin && (
              <form className="ticket-update-form" onSubmit={(event) => void updateTicket(event)}>
                <span className="card-kicker">ASSIGNMENT & RESOLUTION</span>
                <div className="ticket-controls">
                  <label className="field"><span>Status</span><select disabled={selected.status === "CLOSED"} value={status} onChange={(event) => setStatus(event.target.value as TicketStatus)}>{nextStatuses(selected.status).map((value) => <option key={value} value={value}>{TICKET_STATUS_LABELS[value]}</option>)}</select></label>
                  <label className="field"><span>Priority</span><select disabled={selected.status === "CLOSED"} value={priority} onChange={(event) => setPriority(event.target.value)}>{TICKET_PRIORITIES.map((value) => <option key={value} value={value}>{label(value)}</option>)}</select></label>
                </div>
                <label className="field"><span>Resolution notes {status === "RESOLVED" || status === "CLOSED" ? "(required)" : "(optional)"}</span><textarea disabled={selected.status === "CLOSED"} rows={3} maxLength={4000} required={status === "RESOLVED" || status === "CLOSED"} value={resolutionNotes} onChange={(event) => setResolutionNotes(event.target.value)} placeholder="Explain how the issue was resolved." /></label>
                {selected.status === "CLOSED" ? <small className="field-hint">Closed tickets are read-only.</small> : <button className="button button-primary" disabled={busy}>{busy ? "Saving..." : "Save ticket update"}</button>}
              </form>
            )}

            {selected.resolutionNotes && (
              <div className="ticket-resolution"><span className="card-kicker">RESOLUTION</span><p>{selected.resolutionNotes}</p>{selected.resolvedAt && <small>Resolved {formatDateTime(selected.resolvedAt)}</small>}</div>
            )}

            <div className="ticket-conversation">
              <div className="panel-title-row"><div><span className="card-kicker">ACTIVITY</span><h3>Updates</h3></div><span className="record-count">{selected.comments.length}</span></div>
              {selected.comments.length === 0 ? <p className="ticket-no-comments">No updates yet. Add a message to keep the conversation going.</p> : (
                <div className="ticket-comments">
                  {selected.comments.slice().reverse().map((item) => (
                    <article className="ticket-comment" key={item.id}>
                      <div><strong>{item.author.name}</strong><span>{item.author.role === "SUPER_ADMIN" ? "Super Admin" : item.author.role === "ADMIN" ? "Gym Admin" : "Member"}</span><time>{formatDateTime(item.createdAt)}</time></div>
                      <p>{item.body}</p>
                    </article>
                  ))}
                </div>
              )}
              {selected.status !== "CLOSED" && (
                <form className="ticket-comment-form" onSubmit={(event) => void addComment(event)}>
                  <label className="field"><span>Add an update</span><textarea required maxLength={2000} rows={3} value={comment} onChange={(event) => setComment(event.target.value)} placeholder="Share a question or response. This message is visible to the requester and Super Admin team." /></label>
                  <button className="button button-outline" disabled={busy}>{busy ? "Sending..." : "Add update"}</button>
                </form>
              )}
            </div>
          </>
        )}
      </section>
      </div>
    </>
  );
}

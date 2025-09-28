/**
 * Shared code between client and server
 * Useful to share types between client and server
 * and/or small pure JS functions that can be used on both client and server
 */

/**
 * Example response type for /api/demo
 */
export interface DemoResponse {
  message: string;
}

// CyberNavy domain models
export type Severity = "Critical" | "High" | "Medium" | "Low";

export interface Threat {
  id: string;
  title: string;
  severity: Severity;
  score: number;
  ioc: { ip?: string; hash?: string; url?: string };
  createdAt: string;
}

export interface Alert {
  id: string;
  rule: string;
  severity: Severity;
  message: string;
  createdAt: string;
}

export interface Incident {
  id: string;
  title: string;
  severity: Severity;
  owner: string;
  status: "Open" | "Investigating" | "Mitigated" | "Closed";
  createdAt: string;
}

export interface URLRule {
  id: string;
  pattern: string; // domain or regex
  action: "allow" | "deny";
  reason?: string;
  ttl?: number; // hours
  hits: number;
  createdAt: string;
}

export interface Role {
  id: string;
  name: string;
  permissions: string[];
}
export interface User {
  id: string;
  name: string;
  email: string;
  roleId: string;
  createdAt: string;
}

export interface Report {
  id: string;
  title: string;
  createdAt: string;
}
export interface AuditLog {
  id: string;
  actor: string;
  action: string;
  entity: string;
  createdAt: string;
}

export interface SecurityEvent {
  id: string;
  severity: Severity;
  message: string;
  sourceIp?: string;
  hash?: string;
  url?: string;
  createdAt: string;
}

// API response envelopes
export interface Paginated<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
}

import {
  Alert,
  Incident,
  Threat,
  URLRule,
  User,
  Role,
  Report,
  AuditLog,
  SecurityEvent,
} from "@shared/api";

function rand(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function pick<T>(arr: T[]): T {
  return arr[rand(0, arr.length - 1)];
}

export const factories = {
  threat(): Threat {
    const severities: Threat["severity"][] = [
      "Critical",
      "High",
      "Medium",
      "Low",
    ];
    return {
      id: crypto.randomUUID(),
      title: `Threat ${rand(1000, 9999)}`,
      severity: pick(severities),
      score: rand(10, 99),
      ioc: {
        ip: `${rand(1, 255)}.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`,
        hash: Math.random().toString(16).slice(2).padEnd(32, "0"),
        url: `http://malicious-${rand(1, 999)}.com`,
      },
      createdAt: new Date().toISOString(),
    };
  },
  alert(): Alert {
    const severities: Alert["severity"][] = [
      "Critical",
      "High",
      "Medium",
      "Low",
    ];
    return {
      id: crypto.randomUUID(),
      rule: `Rule ${rand(1, 20)}`,
      severity: pick(severities),
      message: "Suspicious activity detected",
      createdAt: new Date().toISOString(),
    };
  },
  incident(): Incident {
    return {
      id: crypto.randomUUID(),
      title: `Incident #${rand(100, 999)}`,
      severity: pick(["Critical", "High", "Medium", "Low"]),
      owner: pick(["alice", "bob", "carol"]),
      status: pick(["Open", "Investigating", "Mitigated", "Closed"]),
      createdAt: new Date().toISOString(),
    };
  },
  urlRule(): URLRule {
    return {
      id: crypto.randomUUID(),
      pattern: `*.domain-${rand(1, 999)}.com`,
      action: pick(["allow", "deny"]),
      reason: pick(["phishing", "malware", "spam", "pii"]),
      ttl: rand(1, 72),
      hits: rand(0, 5000),
      createdAt: new Date().toISOString(),
    };
  },
  user(): User {
    return {
      id: crypto.randomUUID(),
      name: pick(["Alice", "Bob", "Carol", "Diego"]),
      email: "user@cybernavy.ai",
      roleId: "role_admin",
      createdAt: new Date().toISOString(),
    };
  },
  role(): Role {
    return { id: "role_admin", name: "Admin", permissions: ["*"] };
  },
  report(): Report {
    return {
      id: crypto.randomUUID(),
      title: "Weekly Security Report",
      createdAt: new Date().toISOString(),
    };
  },
  audit(): AuditLog {
    return {
      id: crypto.randomUUID(),
      actor: pick(["system", "alice", "bob"]),
      action: pick(["created", "updated", "deleted"]),
      entity: pick(["Threat", "Alert", "URLRule"]),
      createdAt: new Date().toISOString(),
    };
  },
  event(): SecurityEvent {
    const sev = pick(["Critical", "High", "Medium", "Low"] as const);
    return {
      id: crypto.randomUUID(),
      severity: sev,
      message: pick([
        "Port scan detected",
        "Suspicious login",
        "Malware signature match",
        "DLP policy violation",
      ]),
      sourceIp: `${rand(1, 255)}.${rand(0, 255)}.${rand(0, 255)}.${rand(0, 255)}`,
      createdAt: new Date().toISOString(),
    };
  },
};

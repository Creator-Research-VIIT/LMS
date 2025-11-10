// Centralized institute access utilities
// Configure via environment variables to avoid code changes per institute.
//
// INSTITUTE_ACCESS_ENABLED=true|false
// INSTITUTE_ALLOWED_DOMAINS=college.edu,eduinstitute.edu

export function isInstituteAccessEnabled(): boolean {
  return String(process.env.INSTITUTE_ACCESS_ENABLED || '').toLowerCase() === 'true';
}

export function getAllowedDomains(): string[] {
  const raw = process.env.INSTITUTE_ALLOWED_DOMAINS || '';
  return raw
    .split(',')
    .map((d) => d.trim().toLowerCase())
    .filter(Boolean);
}

export function emailHasAllowedDomain(email?: string | null): boolean {
  if (!email) return false;
  const parts = email.split('@');
  if (parts.length !== 2) return false;
  const domain = parts[1].toLowerCase();
  const allowed = getAllowedDomains();
  if (allowed.length === 0) return false; // nothing configured means deny when enabled
  return allowed.includes(domain);
}

// Convenience guard: allow ADMINs regardless of domain
export function isAdminByRole(role?: string | null): boolean {
  return role === 'ADMIN';
}

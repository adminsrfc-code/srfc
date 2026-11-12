/**
 * Contacts helper — wraps Google Sheets contacts tab and
 * groups rows by category for display.
 *
 * Sheet tab: "Contacts"
 * Columns: category | role | name | email | phone
 */
import { getSheetContacts as fetchSheetContacts, type SheetContact } from "./sheets";

export interface Contact {
  role: string;
  name: string;
  email?: string;
  phone?: string;
}

export interface ContactGroup {
  category: string;
  contacts: Contact[];
}

export async function getSheetContacts(): Promise<ContactGroup[]> {
  const rows: SheetContact[] = await fetchSheetContacts();

  if (rows.length === 0) return [];

  // Group by category, preserving order of first appearance
  const groups: Map<string, Contact[]> = new Map();
  for (const row of rows) {
    const cat = (row.category ?? "General").trim();
    if (!groups.has(cat)) groups.set(cat, []);
    groups.get(cat)!.push({
      role: row.role ?? "",
      name: row.name ?? "",
      email: row.email?.trim() || undefined,
      phone: row.phone?.trim() || undefined,
    });
  }

  return Array.from(groups.entries()).map(([category, contacts]) => ({
    category,
    contacts,
  }));
}

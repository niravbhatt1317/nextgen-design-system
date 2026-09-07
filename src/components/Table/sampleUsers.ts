/**
 * Made-up people for the stories and tests: the Users list the console shows,
 * generated the same way every time so a story never changes under review.
 */
export type SampleStatus = 'Active' | 'Inactive' | 'Invited';
export type SampleSource = 'Manual' | 'LDAP' | 'SCIM';

export interface SampleUser {
  id: string;
  name: string;
  email: string;
  phone: string | null;
  hasEmail: boolean;
  status: SampleStatus;
  source: SampleSource;
  teams: string[];
  role: string;
  owner: boolean;
}

const FIRST = [
  'Sarah',
  'Michael',
  'Emily',
  'James',
  'Olivia',
  'William',
  'Isabella',
  'Benjamin',
  'Sophia',
  'Priya',
  'Arjun',
  'Mei',
  'Noah',
  'Ava',
  'Lucas',
  'Mia',
  'Ethan',
  'Amelia',
  'Rohan',
  'Zara',
  'Liam',
  'Chloe',
  'Daniel',
  'Grace',
  'Aditya',
  'Hannah',
  'Omar',
  'Leah',
  'Ravi',
  'Nora',
];
const LAST = [
  'Johnson',
  'Smith',
  'Davis',
  'Brown',
  'Jones',
  'Miller',
  'Wilson',
  'Moore',
  'Taylor',
  'Natarajan',
  'Patel',
  'Chen',
  'Anderson',
  'Thomas',
  'Jackson',
  'White',
  'Harris',
  'Martin',
  'Garcia',
  'Clark',
  'Lewis',
  'Walker',
  'Hall',
  'Allen',
  'Young',
  'King',
  'Wright',
  'Scott',
  'Green',
  'Baker',
];
export const SAMPLE_TEAMS = [
  'Platform',
  'Security',
  'Finance',
  'Design',
  'Web',
  'Support',
  'Data',
  'Sales',
  'Ops',
  'Product',
];
export const SAMPLE_ROLES = ['Admin', 'Member', 'Viewer', 'Billing'];

export function sampleUsers(count = 10001, seed = 7): SampleUser[] {
  let s = seed;
  const rnd = () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
  const pick = <T>(a: readonly T[]): T => a[Math.floor(rnd() * a.length)] as T;
  const out: SampleUser[] = [];
  for (let i = 1; i <= count; i++) {
    const f = FIRST[(i - 1) % FIRST.length] ?? 'Sam';
    const l = LAST[Math.floor((i - 1) / FIRST.length) % LAST.length] ?? 'Lee';
    const r = rnd();
    const status: SampleStatus = r < 0.7 ? 'Active' : r < 0.9 ? 'Inactive' : 'Invited';
    const q = rnd();
    const source: SampleSource = q < 0.4 ? 'Manual' : q < 0.75 ? 'LDAP' : 'SCIM';
    const teams: string[] = [];
    const n = 1 + Math.floor(rnd() * 3);
    while (teams.length < n) {
      const t = pick(SAMPLE_TEAMS);
      if (!teams.includes(t)) teams.push(t);
    }
    const suffix = i > FIRST.length * LAST.length ? String(i) : '';
    out.push({
      id: String(i),
      name: `${f} ${l}`,
      email: `${f}.${l}${suffix}@company.com`.toLowerCase(),
      phone: status !== 'Invited' && rnd() < 0.6 ? '+1 415 555 0100' : null,
      hasEmail: status !== 'Invited' || rnd() < 0.5,
      status,
      source,
      teams,
      role: pick(SAMPLE_ROLES),
      owner: i === 1,
    });
  }
  return out;
}

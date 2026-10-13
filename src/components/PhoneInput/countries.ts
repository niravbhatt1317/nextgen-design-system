/* THE PHONE FIELD'S DIRECTORY - ported from the console (Pranjal, 2026-10-13), the console's
 * features/organizations/geo.js: every country's ITU dial code (the names from Intl.DisplayNames), the national format
 * each country's number field hints with, and the two helpers that split a stored "+<dial> <national>" phone into the
 * field's two parts and join them back. Nothing here is styling; nothing is persisted. */

/** A country the phone field offers: its ISO 3166-1 alpha-2 code, its English name and its dial code (no "+"). */
export interface PhoneCountry {
  code: string;
  name: string;
  dial: string;
}

/** The two parts the field edits: the country's ISO code and the national number as typed. */
export interface PhoneInputValue {
  country: string;
  number: string;
}

// ── countries: ISO 3166-1 alpha-2 → the ITU dial code ──────────────────────────────────────────────────────────
const DIAL: Record<string, string> = {
  AF: '93',
  AX: '358',
  AL: '355',
  DZ: '213',
  AS: '1684',
  AD: '376',
  AO: '244',
  AI: '1264',
  AG: '1268',
  AR: '54',
  AM: '374',
  AW: '297',
  AU: '61',
  AT: '43',
  AZ: '994',
  BS: '1242',
  BH: '973',
  BD: '880',
  BB: '1246',
  BY: '375',
  BE: '32',
  BZ: '501',
  BJ: '229',
  BM: '1441',
  BT: '975',
  BO: '591',
  BA: '387',
  BW: '267',
  BR: '55',
  IO: '246',
  VG: '1284',
  BN: '673',
  BG: '359',
  BF: '226',
  BI: '257',
  KH: '855',
  CM: '237',
  CA: '1',
  CV: '238',
  KY: '1345',
  CF: '236',
  TD: '235',
  CL: '56',
  CN: '86',
  CX: '61',
  CC: '61',
  CO: '57',
  KM: '269',
  CG: '242',
  CD: '243',
  CK: '682',
  CR: '506',
  CI: '225',
  HR: '385',
  CU: '53',
  CW: '599',
  CY: '357',
  CZ: '420',
  DK: '45',
  DJ: '253',
  DM: '1767',
  DO: '1809',
  EC: '593',
  EG: '20',
  SV: '503',
  GQ: '240',
  ER: '291',
  EE: '372',
  SZ: '268',
  ET: '251',
  FK: '500',
  FO: '298',
  FJ: '679',
  FI: '358',
  FR: '33',
  GF: '594',
  PF: '689',
  GA: '241',
  GM: '220',
  GE: '995',
  DE: '49',
  GH: '233',
  GI: '350',
  GR: '30',
  GL: '299',
  GD: '1473',
  GP: '590',
  GU: '1671',
  GT: '502',
  GG: '44',
  GN: '224',
  GW: '245',
  GY: '592',
  HT: '509',
  HN: '504',
  HK: '852',
  HU: '36',
  IS: '354',
  IN: '91',
  ID: '62',
  IR: '98',
  IQ: '964',
  IE: '353',
  IM: '44',
  IL: '972',
  IT: '39',
  JM: '1876',
  JP: '81',
  JE: '44',
  JO: '962',
  KZ: '7',
  KE: '254',
  KI: '686',
  KW: '965',
  KG: '996',
  LA: '856',
  LV: '371',
  LB: '961',
  LS: '266',
  LR: '231',
  LY: '218',
  LI: '423',
  LT: '370',
  LU: '352',
  MO: '853',
  MG: '261',
  MW: '265',
  MY: '60',
  MV: '960',
  ML: '223',
  MT: '356',
  MH: '692',
  MQ: '596',
  MR: '222',
  MU: '230',
  YT: '262',
  MX: '52',
  FM: '691',
  MD: '373',
  MC: '377',
  MN: '976',
  ME: '382',
  MS: '1664',
  MA: '212',
  MZ: '258',
  MM: '95',
  NA: '264',
  NR: '674',
  NP: '977',
  NL: '31',
  NC: '687',
  NZ: '64',
  NI: '505',
  NE: '227',
  NG: '234',
  NU: '683',
  NF: '672',
  KP: '850',
  MK: '389',
  MP: '1670',
  NO: '47',
  OM: '968',
  PK: '92',
  PW: '680',
  PS: '970',
  PA: '507',
  PG: '675',
  PY: '595',
  PE: '51',
  PH: '63',
  PN: '64',
  PL: '48',
  PT: '351',
  PR: '1787',
  QA: '974',
  RE: '262',
  RO: '40',
  RU: '7',
  RW: '250',
  BL: '590',
  SH: '290',
  KN: '1869',
  LC: '1758',
  MF: '590',
  PM: '508',
  VC: '1784',
  WS: '685',
  SM: '378',
  ST: '239',
  SA: '966',
  SN: '221',
  RS: '381',
  SC: '248',
  SL: '232',
  SG: '65',
  SX: '1721',
  SK: '421',
  SI: '386',
  SB: '677',
  SO: '252',
  ZA: '27',
  GS: '500',
  KR: '82',
  SS: '211',
  ES: '34',
  LK: '94',
  SD: '249',
  SR: '597',
  SJ: '47',
  SE: '46',
  CH: '41',
  SY: '963',
  TW: '886',
  TJ: '992',
  TZ: '255',
  TH: '66',
  TL: '670',
  TG: '228',
  TK: '690',
  TO: '676',
  TT: '1868',
  TN: '216',
  TR: '90',
  TM: '993',
  TC: '1649',
  TV: '688',
  UG: '256',
  UA: '380',
  AE: '971',
  GB: '44',
  US: '1',
  UY: '598',
  UZ: '998',
  VU: '678',
  VA: '39',
  VE: '58',
  VN: '84',
  VI: '1340',
  WF: '681',
  EH: '212',
  YE: '967',
  ZM: '260',
  ZW: '263',
  XK: '383',
};

const NAME_FIX: Record<string, string> = {
  XK: 'Kosovo',
  VA: 'Vatican City',
  CD: 'DR Congo',
  CG: 'Congo',
  CI: "Côte d'Ivoire",
};

const displayNames = (() => {
  try {
    return new Intl.DisplayNames(['en'], { type: 'region' });
  } catch {
    return null;
  }
})();

/** A country's English name from its ISO code (the console's few fixes first, then Intl, then the code itself). */
export const countryName = (code: string): string =>
  NAME_FIX[code] ?? displayNames?.of(code) ?? code;

/** Every country with its name and dial code, sorted by name. */
export const PHONE_COUNTRIES: PhoneCountry[] = Object.keys(DIAL)
  .map((code) => ({ code, name: countryName(code), dial: DIAL[code] ?? '' }))
  .sort((a, b) => a.name.localeCompare(b.name, 'en'));

/** A country's dial code without the "+", or "" for a code the directory does not know. */
export const dialOf = (code: string): string => DIAL[code] ?? '';

// ── phones: the national format each country's number field hints with ────────────────────────────────────────
const NANP = new Set(Object.keys(DIAL).filter((c) => DIAL[c]?.startsWith('1')));
// the usual holder of a dial code several countries share
const PRIMARY: Record<string, string> = {
  '1': 'US',
  '44': 'GB',
  '7': 'RU',
  '47': 'NO',
  '61': 'AU',
  '64': 'NZ',
  '212': 'MA',
  '262': 'RE',
  '590': 'GP',
  '599': 'CW',
  '39': 'IT',
  '358': 'FI',
  '500': 'FK',
};
/* a data table: the same format is several countries' own, and naming each one would hide the table */
/* eslint-disable sonarjs/no-duplicate-string */
const PLACEHOLDER: Record<string, string> = {
  US: '(000) 000-0000',
  CA: '(000) 000-0000',
  GB: '0000 000 0000',
  IE: '00 000 0000',
  IN: '00000 00000',
  DE: '000 00000000',
  FR: '00 00 00 00 00',
  SG: '0000 0000',
  AU: '0000 000 000',
  NZ: '00 000 0000',
  JP: '00-0000-0000',
  CH: '00 000 00 00',
  NL: '00 000 0000',
  BE: '000 00 00 00',
  SE: '00-000 00 00',
  NO: '000 00 000',
  DK: '00 00 00 00',
  FI: '00 000 0000',
  IT: '000 000 0000',
  ES: '000 00 00 00',
  PT: '000 000 000',
  AT: '0000 000000',
  PL: '000 000 000',
  AE: '00 000 0000',
  SA: '00 000 0000',
  LK: '00 000 0000',
  HK: '0000 0000',
  CN: '000 0000 0000',
  KR: '00-0000-0000',
  MY: '00-000 0000',
  TH: '00 000 0000',
  ID: '000 000 0000',
  PH: '000 000 0000',
  BR: '(00) 0000-0000',
  MX: '00 0000 0000',
  ZA: '00 000 0000',
  TR: '000 000 00 00',
  IL: '00-000-0000',
  AR: '00 0000-0000',
  RU: '000 000-00-00',
  TW: '0 0000 0000',
  PK: '00 0000 0000',
};
/* eslint-enable sonarjs/no-duplicate-string */

/** The national format the number field hints with for a country. */
export const phonePlaceholder = (code: string): string => PLACEHOLDER[code] ?? '000 000 0000';

/** "+44 20 7946 0958" → { country: "GB", number: "20 7946 0958" }; a bare number keeps the hinted country. */
export const splitPhone = (phone: string | null | undefined, hintCode = ''): PhoneInputValue => {
  const raw = (phone ?? '').trim();
  if (!raw) return { country: hintCode, number: '' };
  if (!raw.startsWith('+')) return { country: hintCode, number: raw };
  const digits = raw.slice(1).replace(/\D/g, '');
  const hits = Object.keys(DIAL).filter((c) => digits.startsWith(DIAL[c] ?? '\u0000'));
  if (!hits.length) return { country: hintCode, number: raw };
  // the longest dial code that fits; among the countries sharing it, the one chosen, else the code's usual holder
  const longest = Math.max(...hits.map((c) => (DIAL[c] ?? '').length));
  const top = hits.filter((c) => (DIAL[c] ?? '').length === longest);
  const first = top[0] ?? '';
  const usual = PRIMARY[DIAL[first] ?? ''] ?? '';
  const best = top.includes(hintCode) ? hintCode : top.includes(usual) ? usual : first;
  const after = raw.slice(1 + (DIAL[best] ?? '').length).replace(/^[\s-]+/, '');
  return { country: best, number: after };
};

/** The stored phone from the field's two parts: "+<dial> <national>", the trunk 0 dropped outside the NANP. */
export const joinPhone = (code: string, national: string): string => {
  const n = national.trim();
  if (!n) return '';
  const dial = DIAL[code];
  if (!dial) return n;
  const trimmed = NANP.has(code) ? n : n.replace(/^0(?=\d)/, '');
  return `+${dial} ${trimmed}`;
};

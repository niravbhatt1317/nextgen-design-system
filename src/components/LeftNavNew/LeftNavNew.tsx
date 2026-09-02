import { useEffect, useMemo, useRef, useState } from 'react';
import { cn } from '@/utils';
import { Icon } from '../Icon';
import { LeftNav } from '../LeftNav';
import { Popover, PopoverContent, PopoverTrigger } from '../Popover';
import type {
  LeftNavNewAccount,
  LeftNavNewBoard,
  LeftNavNewCollection,
  LeftNavNewOrg,
  LeftNavNewProps,
  LeftNavNewTriggerProps,
} from './LeftNavNew.types';
import './left-nav-new.css';

/**
 * LeftNav New — the merged console's approved workspace navigation, ported as
 * a PARALLEL component so it can be reviewed side by side with `LeftNav`. The
 * existing `LeftNav` is deliberately untouched, and this component is not yet
 * exported from the package root: it exists to be looked at first.
 *
 * What it carries over from the console, verbatim:
 * - the account/place card at the rail TOP, opening the destination panel
 *   (organization switcher, theme, log out) to its right;
 * - the quiet rail-wide search with a working ⌘K;
 * - the folder tree: the folder glyph IS the open/closed state, boards hang
 *   off one continuous spine with per-board path lighting;
 * - the 56px collapsed rail with hover flyouts (140ms grace timer) and the
 *   header-band trigger, exported separately as `LeftNavNewTrigger`;
 * - the pinned Settings zone at the rail's bottom.
 *
 * Two deliberate changes against the console version, both from the parity
 * audit: rows gained the design system's focus-visible ring, and the two raw
 * hexes that were tokens by value are now tokens by name.
 */

const ROW = 'snv-row';
const LBL = 'snv-lbl';
const ON = 'true';
const GBTN = 'ogsw-gbtn';
const FOLDER = 'folder';

/* ── small helpers, ported from the console ─────────────────────────────── */

const TONE_COUNT = 6;

/** Stable tone per organization: its position in the roster, mod the palette. */
function toneClass(orgs: LeftNavNewOrg[], id: string): string {
  const idx = orgs.findIndex((o) => o.id === id);
  return `ogsw-t${String((idx < 0 ? 0 : idx) % TONE_COUNT)}`;
}

function glyphOf(name: string): string {
  const first = name.trim().charAt(0);
  return first === '' ? '?' : first.toUpperCase();
}

function fmtUsers(n: number): string {
  if (n >= 1000) {
    const k = Math.round(n / 100) / 10;
    return `${k % 1 === 0 ? k.toFixed(0) : String(k)}k users`;
  }
  return `${String(n)} users`;
}

const GridGlyph = ({ size = 14 }: { size?: number }) => (
  <Icon name="layout-grid" size={size} strokeWidth={1.5} />
);

/* The Motadata wordmark (brand asset — the one non-token colour is the
 * brand's own orange notch, carried on the logo exactly as shipped). */
const WORDMARK_PATHS = [
  'M91.04,47.42v33.35h-12.92v-32.31c0-9.11-4.15-14.19-11.88-14.19-8.54,0-14.19,6-14.19,14.88v31.62h-12.92v-32.31c0-9.11-4.27-14.19-12-14.19-8.42,0-14.19,6-14.19,14.88v31.62H0V23.77h11.54l.12,6.69c4.15-5.31,9.69-7.85,16.85-7.85,8.08,0,14.88,3.81,18.46,10.04,4.5-6.69,11.42-10.04,20.31-10.04,14.65,0,23.77,9.35,23.77,24.81Z',
  'M170.33,23.77v-14.88l12.81-1.38v16.27h16.38v10.96h-16.38v26.42c0,5.77,2.65,9,7.96,9,2.31,0,4.96-.69,7.15-1.73l3.58,10.38c-4.38,1.96-8.08,2.77-12.81,2.77-11.77,0-18.69-6.81-18.69-20.42v-26.42',
  'M265.84,23.77v57h-11.54l-.12-7.61c-4.38,5.54-12,8.88-20.77,8.88-16.73,0-28.27-12.23-28.27-29.77s11.54-29.77,28.27-29.77c8.88,0,16.38,3.35,20.77,8.88l.12-7.61h11.54ZM252.92,52.27c0-10.61-7.15-18-17.42-18s-17.42,7.38-17.42,18,7.15,18,17.42,18,17.42-7.38,17.42-18Z',
  'M335.97,0v80.77h-11.54l-.12-7.61c-4.38,5.54-12,8.88-21,8.88-16.15,0-28.04-11.77-28.04-29.77s11.88-29.77,28.04-29.77c8.19,0,15.23,2.77,19.73,7.38V0h12.92ZM323.05,52.27c0-10.61-7.15-18-17.42-18s-17.42,7.38-17.42,18,7.15,18,17.42,18,17.42-7.38,17.42-18Z',
  'M406.1,23.77v57h-11.54l-.12-7.61c-4.38,5.54-12,8.88-20.77,8.88-16.73,0-28.27-12.23-28.27-29.77s11.54-29.77,28.27-29.77c8.88,0,16.38,3.35,20.77,8.88l.12-7.61h11.54ZM393.18,52.27c0-10.61-7.15-18-17.42-18s-17.42,7.38-17.42,18,7.15,18,17.42,18,17.42-7.38,17.42-18Z',
  'M416.49,23.77v-14.88l12.81-1.38v16.27h16.38v10.96h-16.38v26.42c0,5.77,2.65,9,7.96,9,2.31,0,4.96-.69,7.15-1.73l3.58,10.38c-4.38,1.96-8.08,2.77-12.81,2.77-11.77,0-18.69-6.81-18.69-20.42v-26.42',
  'M512,23.77v57h-11.54l-.12-7.61c-4.38,5.54-12,8.88-20.77,8.88-16.73,0-28.27-12.23-28.27-29.77s11.54-29.77,28.27-29.77c8.88,0,16.38,3.35,20.77,8.88l.12-7.61h11.54ZM499.08,52.27c0-10.61-7.15-18-17.42-18s-17.42,7.38-17.42,18,7.15,18,17.42,18,17.42-7.38,17.42-18Z',
  'M160.06,52.92c-.33,16.14-13.54,29.13-29.76,29.13s-29.77-13.33-29.77-29.77c0-1.69.14-3.36.41-4.96,2.32-13.87,14.26-24.49,28.72-24.8v12.32c-7.59.28-13.95,5.45-16.01,12.47-.46,1.56-.72,3.23-.72,4.96,0,9.63,7.78,17.44,17.37,17.44,1.72,0,3.38-.24,4.96-.72,6.97-2.08,12.12-8.46,12.39-16.08h12.41Z',
];

function MotadataWordmark() {
  return (
    <svg
      width="75"
      height="12"
      viewBox="0 0 512 82.04"
      fill="currentColor"
      aria-label="Motadata"
      role="img"
    >
      {WORDMARK_PATHS.map((d) => (
        <path key={d.slice(0, 16)} d={d} />
      ))}
      <path d="M135.26,47.31v-24.39c12.47,2.09,22.31,11.93,24.39,24.39h-24.39Z" fill="#f17463" />
    </svg>
  );
}

/* Tabler's folder-open (icon policy: Lucide first, Tabler fallback; the Icon
 * registry is Lucide-only, so this one is inlined verbatim from @tabler/icons). */
function TablerFolderOpen() {
  return (
    <svg
      width="16"
      height="16"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M5 19l2.757 -7.351a1 1 0 0 1 .936 -.649h12.307a1 1 0 0 1 .986 1.164l-.996 5.211a2 2 0 0 1 -1.964 1.625h-14.026a2 2 0 0 1 -2 -2v-11a2 2 0 0 1 2 -2h4l3 3h7a2 2 0 0 1 2 2v2" />
    </svg>
  );
}

/* ── one board row, shared by the tree and the flyout ───────────────────── */

function BoardRow({
  board,
  active,
  onPick,
}: {
  board: LeftNavNewBoard;
  active: boolean;
  onPick: (key: string) => void;
}) {
  const soon = board.soon ?? false;
  /* A board that is not live keeps its NORMAL look but refuses the click —
   * the faded look broke the console's colour standard and was rejected. */
  const clickable = (board.live ?? false) && !soon;
  return (
    <button
      type="button"
      className={cn(ROW, soon && 'snv-off')}
      data-on={active ? ON : undefined}
      aria-disabled={clickable ? undefined : true}
      title={board.label}
      onClick={
        clickable
          ? () => {
              onPick(board.key);
            }
          : undefined
      }
    >
      <Icon name={FOLDER} size={14} />
      <span className={LBL}>{board.label}</span>
      {soon ? (
        <span className="snv-meta">
          <span className="snv-soon">Soon</span>
        </span>
      ) : null}
    </button>
  );
}

/* ── one collection: the folder head, its boards, and the collapsed flyout ── */

interface CollectionBlockProps {
  collection: LeftNavNewCollection;
  q: string;
  activeKey: string | undefined;
  collapsed: boolean;
  flyOut: boolean;
  open: boolean;
  onToggle: () => void;
  onFlyOpen: () => void;
  onFlyClose: () => void;
  onFlyDismiss: () => void;
  onFlyPick: (key: string) => void;
  onPick: (key: string) => void;
}

function CollectionBlock({
  collection: c,
  q,
  activeKey,
  collapsed,
  flyOut,
  open,
  onToggle,
  onFlyOpen,
  onFlyClose,
  onFlyDismiss,
  onFlyPick,
  onPick,
}: CollectionBlockProps) {
  const matches = (label: string) => q === '' || label.toLowerCase().includes(q);
  const kids = c.children.filter((ch) => matches(ch.label));
  /* The collection holding the active board is "selected in a way" too —
   * it carries the same highlight as its child. */
  const holdsActive = c.children.some((ch) => ch.key === activeKey);
  if (q !== '' && !matches(c.label) && kids.length === 0) return null;
  const showOpen = open || q !== '';
  return (
    <div>
      <Popover
        open={collapsed && flyOut}
        onOpenChange={(o) => {
          if (!o) onFlyDismiss();
        }}
      >
        <PopoverTrigger asChild>
          <button
            type="button"
            className={ROW}
            data-on={holdsActive ? ON : undefined}
            title={c.label}
            onMouseEnter={collapsed ? onFlyOpen : undefined}
            onMouseLeave={collapsed ? onFlyClose : undefined}
            onClick={collapsed ? onFlyOpen : onToggle}
          >
            <span className="snv-tfold">
              {showOpen ? <TablerFolderOpen /> : <Icon name={FOLDER} size={16} />}
            </span>
            <span className={LBL}>{c.label}</span>
          </button>
        </PopoverTrigger>
        <PopoverContent
          side="right"
          align="start"
          sideOffset={6}
          style={{ padding: 6, width: 208 }}
          onOpenAutoFocus={(e) => {
            e.preventDefault();
          }}
          onMouseEnter={onFlyOpen}
          onMouseLeave={onFlyClose}
        >
          <div className="snv-flyhead">{c.label}</div>
          {c.children.map((ch) => (
            <BoardRow key={ch.key} board={ch} active={ch.key === activeKey} onPick={onFlyPick} />
          ))}
        </PopoverContent>
      </Popover>
      {showOpen && kids.length > 0 ? (
        <div className="snv-kids">
          {kids.map((ch) => (
            <BoardRow key={ch.key} board={ch} active={ch.key === activeKey} onPick={onPick} />
          ))}
        </div>
      ) : null}
    </div>
  );
}

/* ── the destination panel behind the account card ──────────────────────── */

const THEME_TABS = [
  { key: 'light', label: 'Light', icon: 'sun' },
  { key: 'dark', label: 'Dark', icon: 'moon' },
  { key: 'system', label: 'System', icon: 'monitor' },
] as const;

interface SwitcherPanelProps {
  account: LeftNavNewAccount;
  recents: string[];
  searching: boolean;
  setSearching: (v: boolean) => void;
  onTravel: (id: string | null) => void;
}

function SwitcherPanel({
  account,
  recents,
  searching,
  setSearching,
  onTravel,
}: SwitcherPanelProps) {
  const { orgs } = account;
  const hereId = account.currentOrgId ?? null;
  const hereOrg = hereId === null ? null : (orgs.find((o) => o.id === hereId) ?? null);
  const totalMembers = orgs.reduce((sum, o) => sum + o.memberCount, 0);
  const theme = account.theme ?? 'light';
  const [query, setQuery] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (searching) inputRef.current?.focus();
    else setQuery(''); // Escape/✕ both land here — the count line returns clean
  }, [searching]);

  const q = query.trim().toLowerCase();
  const rows = useMemo(() => {
    const pool = orgs.filter((o) => o.id !== hereId);
    if (q !== '') return pool.filter((o) => o.name.toLowerCase().includes(q));
    const recs = recents.filter((id) => id !== hereId);
    return [
      ...recs
        .map((id) => pool.find((o) => o.id === id))
        .filter((o): o is LeftNavNewOrg => o !== undefined),
      ...pool.filter((o) => !recs.includes(o.id)),
    ];
  }, [orgs, hereId, recents, q]);

  const closeSearch = () => {
    setQuery('');
    setSearching(false);
  };

  const plusBtn = (
    <button
      type="button"
      className={GBTN}
      onClick={() => account.onAddOrg?.()}
      aria-label="Add organization"
      title="Add organization"
    >
      <Icon name="plus" size={14} strokeWidth={1.5} />
    </button>
  );

  return (
    <>
      {/* where you ARE — never clickable */}
      <div className="ogsw-here">
        <span className={cn('ogsw-hic', hereOrg && toneClass(orgs, hereOrg.id))}>
          {hereOrg ? glyphOf(hereOrg.name) : <GridGlyph />}
        </span>
        <span className="ogsw-ht">
          <span className="ogsw-hn">{hereOrg ? hereOrg.name : 'MSP Wide View'}</span>
          <span className="ogsw-hs">{fmtUsers(hereOrg ? hereOrg.memberCount : totalMembers)}</span>
        </span>
      </div>

      {/* the count line, or the search box it morphs into */}
      {!searching ? (
        <div className="ogsw-lsthead">
          <span className="ogsw-count">{String(orgs.length)} organizations</span>
          <button
            type="button"
            className={GBTN}
            onClick={() => {
              setSearching(true);
            }}
            aria-label="Search organizations"
            title="Search"
          >
            <Icon name="search" size={14} strokeWidth={1.5} />
          </button>
          <span className="ogsw-vdiv" aria-hidden="true" />
          {plusBtn}
        </div>
      ) : (
        <div className="ogsw-lsthead">
          <div className="ogsw-inputbox">
            <span className="ogsw-sic">
              <Icon name="search" size={14} strokeWidth={1.5} />
            </span>
            <input
              ref={inputRef}
              type="text"
              placeholder="Search"
              aria-label="Search organizations"
              value={query}
              onChange={(e) => {
                setQuery(e.target.value);
              }}
            />
            <button
              type="button"
              className={GBTN}
              onClick={closeSearch}
              aria-label="Close search"
              title="Close search"
            >
              <Icon name="x" size={14} strokeWidth={1.5} />
            </button>
          </div>
          <span className="ogsw-vdiv" aria-hidden="true" />
          {plusBtn}
        </div>
      )}

      {/* the heading-less list — recents float up silently */}
      <div className="ogsw-list">
        {rows.length === 0 ? (
          <div className="ogsw-empty">No organization matches "{query.trim()}"</div>
        ) : (
          rows.map((o) => (
            <button
              key={o.id}
              type="button"
              className="ogsw-row"
              onClick={() => {
                onTravel(o.id);
              }}
            >
              <span className={cn('ogsw-glyph', toneClass(orgs, o.id))}>{glyphOf(o.name)}</span>
              <span className="ogsw-who">
                <span className="ogsw-n">{o.name}</span>
              </span>
              <span className="ogsw-go">
                Open <Icon name="arrow-right" size={12} strokeWidth={1.5} />
              </span>
            </button>
          ))
        )}
      </div>

      {/* the way back up — only exists while inside an organization */}
      {hereOrg ? (
        <div className="ogsw-doorsec">
          <button
            type="button"
            className="ogsw-door"
            onClick={() => {
              onTravel(null);
            }}
          >
            <span className="ogsw-fic">
              <GridGlyph />
            </span>
            <span className="ogsw-fn">Switch to MSP-wide view</span>
            <span className="ogsw-doorgo">
              <Icon name="arrow-up-right" size={14} strokeWidth={1.5} />
            </span>
          </button>
        </div>
      ) : null}

      {/* footer: email + ⋯, the theme tabs… */}
      <div className="ogsw-footsec">
        <div className="ogsw-frow">
          <span className="ogsw-mail" title={account.email}>
            {account.email}
          </span>
          <button
            type="button"
            className={GBTN}
            aria-label="Account options"
            title="Account options"
          >
            <Icon name="more-horizontal" size={14} strokeWidth={1.5} />
          </button>
        </div>
        <div className="ogsw-tseg" role="group" aria-label="Theme">
          {THEME_TABS.map((t) => (
            <button
              key={t.key}
              type="button"
              className={theme === t.key ? 'ogsw-on' : undefined}
              onClick={() => account.onThemeChange?.(t.key)}
              title={t.key === 'system' ? 'Follow system' : t.label}
            >
              <Icon name={t.icon} size={13} strokeWidth={1.5} />
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* …then Log out, sectioned off on its own */}
      <div className="ogsw-outsec">
        <button type="button" className="ogsw-out" onClick={() => account.onLogout?.()}>
          <Icon name="log-out" size={14} strokeWidth={1.5} />
          Log out
        </button>
      </div>

      <div className="ogsw-powered">
        Powered by <MotadataWordmark />
      </div>
    </>
  );
}

/* ── the account card at the rail TOP ───────────────────────────────────── */

function AccountCard({ account }: { account: LeftNavNewAccount }) {
  const [open, setOpen] = useState(false);
  const [searching, setSearching] = useState(false);
  /* Travel history, so the places just left float to the list's top. */
  const [recents, setRecents] = useState<string[]>([]);
  const { orgs } = account;
  const hereId = account.currentOrgId ?? null;
  const hereOrg = hereId === null ? null : (orgs.find((o) => o.id === hereId) ?? null);

  const travel = (id: string | null) => {
    if (hereId !== null) {
      setRecents((r) => [hereId, ...r.filter((x) => x !== hereId)]);
    }
    account.onSwitchOrg?.(id);
    setOpen(false);
  };

  return (
    <Popover
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) setSearching(false);
      }}
    >
      <PopoverTrigger asChild>
        <button
          type="button"
          className="ogsw-card"
          data-open={open ? ON : undefined}
          aria-label="Organization switcher and account"
        >
          <span className={cn('ogsw-av', hereOrg && toneClass(orgs, hereOrg.id))}>
            {hereOrg ? glyphOf(hereOrg.name) : <GridGlyph />}
          </span>
          <span style={{ flex: '1 1 auto', minWidth: 0 }}>
            <span className="ogsw-nm">{hereOrg ? hereOrg.name : 'MSP Wide View'}</span>
            <span className="ogsw-sub" title={account.email}>
              {account.email}
            </span>
          </span>
          {/* TRAP: Icon's `style` prop REPLACES its size-derived style — passing
           * both means size is DROPPED and the 20px default class wins. Size
           * lives IN the style here on purpose. */}
          <Icon
            name="chevrons-up-down"
            strokeWidth={1.5}
            style={{
              width: 16,
              height: 16,
              color: 'hsl(var(--mdt-muted-foreground))',
              flexShrink: 0,
            }}
          />
        </button>
      </PopoverTrigger>
      <PopoverContent
        side="right"
        align="start"
        sideOffset={8}
        className="ogsw-panel"
        style={{ padding: 0, width: 280 }}
        onEscapeKeyDown={(e) => {
          /* first Escape closes the SEARCH, a second closes the panel */
          if (searching) {
            e.preventDefault();
            setSearching(false);
          }
        }}
      >
        <SwitcherPanel
          account={account}
          recents={recents}
          searching={searching}
          setSearching={setSearching}
          onTravel={travel}
        />
      </PopoverContent>
    </Popover>
  );
}

/* ── the collapse trigger, for the page header band ─────────────────────── */

export function LeftNavNewTrigger({
  collapsed,
  onToggle,
  withDivider = true,
}: LeftNavNewTriggerProps) {
  const label = collapsed ? 'Expand sidebar' : 'Collapse sidebar';
  return (
    <>
      <button
        type="button"
        className="snv-trigger"
        title={label}
        aria-label={label}
        onClick={onToggle}
      >
        <Icon name="panel-left" size={16} />
      </button>
      {withDivider ? <span className="snv-trigdiv" aria-hidden="true" /> : null}
    </>
  );
}

/* ── the rail itself ────────────────────────────────────────────────────── */

export function LeftNavNew({
  collections,
  activeKey,
  onSelect,
  onSettings,
  account,
  collapsed = false,
  label = 'Workspace',
  className,
  style,
}: LeftNavNewProps) {
  const [query, setQuery] = useState('');
  const searchRef = useRef<HTMLInputElement>(null);
  const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(() =>
    Object.fromEntries(collections.map((c) => [c.key, c.defaultOpen ?? false]))
  );
  /* Collapsed collections show their boards in a hover flyout. A short grace
   * timer lets the pointer travel into it. */
  const [flyKey, setFlyKey] = useState<string | null>(null);
  const flyTimer = useRef<number | undefined>(undefined);
  const flyOpen = (k: string) => {
    window.clearTimeout(flyTimer.current);
    setFlyKey(k);
  };
  const flyClose = () => {
    window.clearTimeout(flyTimer.current);
    flyTimer.current = window.setTimeout(() => {
      setFlyKey(null);
    }, 140);
  };
  useEffect(() => {
    if (!collapsed) setFlyKey(null);
  }, [collapsed]);

  /* Ctrl/Cmd K hands the search the caret. */
  useEffect(() => {
    const onKey = (e: globalThis.KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 'k' || e.key === 'K')) {
        e.preventDefault();
        searchRef.current?.focus();
      }
    };
    document.addEventListener('keydown', onKey);
    return () => {
      document.removeEventListener('keydown', onKey);
    };
  }, []);

  const q = query.trim().toLowerCase();

  return (
    <LeftNav
      label={label}
      className={className}
      style={{
        height: '100%',
        flex: '0 0 auto',
        width: collapsed ? 56 : 256,
        overflow: 'hidden',
        transition: 'width .2s cubic-bezier(.2,.7,.2,1)',
        ...style,
      }}
    >
      <div className="snv-railwrap" data-collapsed={collapsed ? ON : undefined}>
        {/* Account/place control at the rail top. Collapsed it shows its
         * avatar alone — the card itself is unchanged. */}
        {account ? (
          <div className="snv-cardwrap">
            <AccountCard account={account} />
          </div>
        ) : null}

        <div className="snv-mid">
          <div className="snv-line">
            {/* A label, so clicking anywhere in the box hands the input the
             * caret natively — no click handler needed. */}
            <label className="snv-srch">
              <Icon name="search" size={14} />
              <input
                ref={searchRef}
                type="text"
                value={query}
                placeholder="Search workspace"
                aria-label="Search workspace"
                onChange={(e) => {
                  setQuery(e.target.value);
                }}
                onKeyDown={(e) => {
                  if (e.key === 'Escape') {
                    setQuery('');
                    e.currentTarget.blur();
                  }
                }}
              />
              <span className="snv-kbd">⌘K</span>
            </label>
          </div>

          <div className="snv-body">
            <button
              type="button"
              className={ROW}
              data-on={activeKey === 'inbox' ? ON : undefined}
              title="Inbox"
              onClick={() => onSelect?.('inbox')}
            >
              <Icon name="inbox" size={16} />
              <span className={LBL}>Inbox</span>
            </button>
            <button
              type="button"
              className={ROW}
              data-on={activeKey === 'explore' ? ON : undefined}
              title="Explore"
              onClick={() => onSelect?.('explore')}
            >
              <Icon name="compass" size={16} />
              <span className={LBL}>Explore</span>
            </button>

            <div className="snv-label">Collections</div>
            {collections.map((c) => (
              <CollectionBlock
                key={c.key}
                collection={c}
                q={q}
                activeKey={activeKey}
                collapsed={collapsed}
                flyOut={flyKey === c.key}
                open={openGroups[c.key] ?? false}
                onToggle={() => {
                  setOpenGroups((g) => ({ ...g, [c.key]: !(g[c.key] ?? false) }));
                }}
                onFlyOpen={() => {
                  flyOpen(c.key);
                }}
                onFlyClose={flyClose}
                onFlyDismiss={() => {
                  setFlyKey(null);
                }}
                onFlyPick={(k) => {
                  setFlyKey(null);
                  onSelect?.(k);
                }}
                onPick={(k) => onSelect?.(k)}
              />
            ))}
            {q === '' ? (
              <button type="button" className={cn(ROW, 'snv-ghost')} disabled title="More">
                <Icon name="more-horizontal" size={16} />
                <span className={LBL}>More</span>
              </button>
            ) : null}

            <div className="snv-label">Favorite</div>
            <button
              type="button"
              className={cn(ROW, 'snv-dis')}
              disabled
              title="Nothing starred yet"
            >
              <Icon name="star" size={16} />
              <span className={LBL}>Nothing starred yet</span>
            </button>
          </div>

          {/* The way into settings, pinned to the rail's bottom in its own
           * zone — system control, visibly apart from the content list. */}
          <div className="snv-pinned">
            <button type="button" className={ROW} title="Settings" onClick={() => onSettings?.()}>
              <Icon name="settings" size={14} />
              <span className={LBL}>Settings</span>
              <span className="snv-meta">
                <span role="img" aria-label="Live">
                  <span className="snv-livedot" />
                </span>
              </span>
            </button>
          </div>
        </div>
      </div>
    </LeftNav>
  );
}

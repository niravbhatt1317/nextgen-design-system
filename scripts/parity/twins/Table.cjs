/* Parity twins: where the same frame lives in the story, the console and the mock.
 *
 * THE CONSOLE SIDE IS /users, WHICH RUNS THIS SAME DataTable (2026-09-24: "push the latest table from
 * storybook to our user module"). Until then /users was the console's own hand-built table (.band-card-table,
 * .tbar-srch, .rowsel-*, .colmenu-*) and every console selector here named one of those; on 2026-09-24 they
 * all left the page and every console frame read "not found". Re-pointed 2026-09-26: both sides now render
 * the library part, so a frame uses ONE selector for both wherever the console lets the part draw itself,
 * and two only where the Users page composes a cell of its own (the avatar, the name, the owner mark, the
 * contact chips, the Source chip, the team and role squares).
 *
 * WHAT THE CONSOLE LAYS OVER THE PART (global.css), and how each frame pairs around it:
 *   main tbody td [data-tone][data-size] { font-size: 11px }   his ruling 2026-09-18 for badges in tables. The
 *       in-table badge frames (status pill, Source, team square) do not read fontSize; the quick-filter menu's
 *       pill is portaled outside main tbody and keeps it.
 *   button[aria-label="Row actions"] { 24 square, radius 8, neutral-50, neutral-20 under the pointer }   the same
 *       numbers the library draws; measured, not excluded.
 *   .no-scrollbar .tbl { margin-inline }   a margin, which no frame reads.
 *   .flat-badges { --badge-stroke, --badge-fill }   the console's own badge family; the library Badge does not
 *       read them (the pill frames read the border, so a leak would show).
 *   button.mdt-rounded-md { border-radius: 8px } and button.mdt-rounded-md:has(> span:first-child > svg:first-child)
 *       { padding: 12px }   the console's button rules of 2026-08-24 (global.css 32 and 44: buttons round at 8 platform-wide; a leading icon takes 12 of air) restyle EVERY library button that wears
 *       mdt-rounded-md. The Columns panel's rows are such buttons (the grip svg sits first), so they read 12 / 8 on
 *       /users against the part's 0 / 6; the row frame reads neither. The same two rules reach the heading's ⋯ and
 *       the panel's Reset / Hide all / Show all links, which no frame reads — raised in the 2026-09-26 report.
 *
 * WHAT CHANGED IN THE LIST (every 2026-09-22 frame that still means something is here, re-pointed):
 *   dropped  toolbar strip (32)         the console draws its controls straight into the page's 60 band; there is no
 *                                       inner strip. "page band (60)" is the strip's twin.
 *   dropped  tail cell                  `tail` is off on both sides since 2026-09-23; /users draws no tail cell.
 *   dropped  search glyph · inset       the same Input on both sides; `left` reads auto on the glyph itself.
 *   dropped  Filters / quick-filter / Columns hover, Columns open; Filters, Columns, chevron, pager and the three
 *            bulk-bar glyphs; Action glyph · hover   one ToolbarButton and one Icon, the same part on both sides:
 *            Sort's rest, hover, open and glyph stand for all four doors (Toolbar.cjs, Icon.cjs own the rest).
 *   dropped  Sort field row · hover, quick-filter row · hover   DropdownMenu's own hover (DropdownMenu.cjs).
 *   dropped  select-all chevron, select-all chevron · hover   the chevron and its "Choose what to select" popover went
 *            on 2026-09-26 (Pranjal), from the header and from the bulk bar; the box alone selects the page. The console
 *            keeps the chevron until the swap, so nothing here reads .tbl-scope on either side.
 *   merged   search box · type into search box · box; Columns panel inset into its box; heading row into Name heading.
 *   added    the nick (a real span on both sides now), a heading under the pointer, the row hover on a content cell
 *            (one colour notation on both sides now), the team square, and the blank state's title and button.
 *   added    bulk bar · the hook it hangs from (2026-09-26): the bar hangs from a 0px hook stuck to the bottom of the
 *            page, so it pins 62 above the window while the card runs past the fold (it hung from the card's end
 *            before: 135 px below the fold on /users at 1440x900). The console reads "not found" here until it rides
 *            that build; the bar's own frames below read the same on both sides either way.
 * No mock draws a state the console lacks (mocks/table/table-behaviours.html is the behaviours page; mocks/users
 * hold the advanced filter and the invite steps), so nothing here reads a mock.
 *
 * The story remembers its column layout in localStorage['storybook.users-table'] and the console in
 * localStorage['users.columns']: no frame here moves, hides or resizes a column, and the runner opens a fresh
 * browser, so the cell positions below (td:nth-child) are the resting order on both sides:
 *   1 number · 2 Name · 3 Action · 4 Email · 5 Contact · 6 Status · 7 Source · 8 Teams · 9 Role (· 10 Created on).
 */
const GLYPH = ['width', 'height', 'color', 'stroke', 'strokeWidth', 'fill'];
const TEXT = ['color', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'textTransform'];
/* a text label centred in a fixed-height flex row: its line-height moves nothing on screen */
const LABEL = ['color', 'fontSize', 'fontWeight', 'letterSpacing'];
/* a body cell draws its divider as border-bottom */
const CELL_LINE = ['borderBottomWidth', 'borderBottomColor', 'boxShadow'];
/* a heading draws its underline as an inset shadow; a 0-wide border's colour paints nothing, so it is not compared */
const HEAD_LINE = ['borderBottomWidth', 'boxShadow'];
/* an icon-only 32 square: box, border, corner, fill, glyph colour — no text, so no font, no gap */
const SQUARE = ['width', 'height', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'color', 'boxShadow', 'opacity', 'cursor'];
/* a text button: the square's list plus its type and the gap to its glyph */
const TEXT_BTN = [...SQUARE, 'gap', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing'];
/* a portaled panel box */
const PANEL = ['width', 'paddingTop', 'paddingLeft', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'boxShadow'];

const USERS = 'new-components-table--users';
/** the page hands the table its 60 band, as /users does */
const BAND = 'new-components-table--with-the-pages-toolbar';
/** the More filters door, as /users has it */
const ADV = 'new-components-table--with-the-advanced-filter';
const NOTHING = 'new-components-table--nothing-found';
const ON = '/users';

const STRIP = '[role="toolbar"]';
/** the console's left nav has a "Search settings" box: the table's is the one in the strip */
const SEARCH = `${STRIP} input[aria-label="Search users"]`;
const SEARCH_GLYPH = `${STRIP} .mdt-group svg`;
/** the one strip button whose words are its label: the More filters door */
const DOOR = `${STRIP} button:not([aria-label])`;
const ROW = '.tbl tbody tr:first-child';
const TH = (key) => `.tbl thead th[data-key="${key}"]`;
const MENU = '[role="menu"]';
const COLS = '[role="dialog"][aria-label="Columns"]';
const BULK = '[aria-label="Selection"]';
const ACTIONS = 'button[aria-label="Row actions"]';
const STATUS = '.tbl [role="status"]';
/** the first row's Name cell: avatar · name · owner mark (the console wraps name and mark in one more span) */
const NAME = `${ROW} td:nth-child(2)`;
/** THE PART INSIDE THE PAGE'S PAIR (re-pointed 2026-09-26, night): the console's Name cell is the library PersonCell
 * since this evening (the page's own name text at 400 was the twin's first real difference), but the page wraps it in
 * a 6px pair with its OwnerBadge beside it (the mark at 6, not the part's 12 - raised, not decided). So the story's
 * PersonCell is `NAME > span` and the console's is `NAME > span > span:first-child`; the frames inside it pair off
 * that root on each side. */
const PERSON = { story: `${NAME} > span`, console: `${NAME} > span > span:first-child` };

const settle = (page, ms) => page.waitForTimeout(ms);
/** THE POINTER IS PARKED FIRST, on every frame. The runner keeps one page and leaves the mouse where the last hover
 * or click put it; the console then reloads under that spot, and whatever sits there reads as hovered (the search
 * glyph and the ⋯ both read neutral-90 on 2026-09-26 for that reason alone). (5, 5) is the page's top-left corner. */
const away = (page) => page.mouse.move(5, 5);
const parked = (open) => async (page) => {
  await away(page);
  if (open) await open(page);
};
/** Hover the first row: its number gives way to the checkbox. */
const hoverRow = async (page) => {
  await page.hover(ROW);
  await settle(page, 200);
};
/** Click a labelled control, move the pointer away, wait for what it opens: the open state is read without hover. */
const clickLabel = (label, opens) => async (page) => {
  await page.click(`button[aria-label="${label}"]`);
  await away(page);
  await page.waitForSelector(opens, { timeout: 4000 }).catch(() => {});
  await settle(page, 250);
};
const openSort = clickLabel('Sort', MENU);
const openColumns = clickLabel('Manage columns', COLS);
const openQuick = clickLabel('Filter by status', '[role="menuitemcheckbox"]');
/** The first row's ⋯. */
const openRowMenu = async (page) => {
  await hoverRow(page);
  await page.click(ACTIONS);
  await page.waitForSelector(MENU, { timeout: 4000 }).catch(() => {});
  await settle(page, 250);
};
/** Pick the first row (the checkbox appears on hover) so the bulk bar and the selected tint show. */
const pickRow = async (page) => {
  await hoverRow(page);
  await page.click(`${ROW} [role="checkbox"]`);
  await away(page);
  await page.waitForSelector(BULK, { timeout: 4000 }).catch(() => {});
  await settle(page, 250);
};
const focusSearch = async (page) => {
  await page.click(SEARCH);
  await settle(page, 250);
};
/** The console has no nothing-found story: a search nothing matches puts it in that state. */
const searchNothing = async (page) => {
  await page.fill(SEARCH, 'zzqx');
  await page.waitForSelector(STATUS, { timeout: 4000 }).catch(() => {});
  await settle(page, 200);
};

/** the same selector on both sides; `open`, `state` and `note` ride along when given; the pointer is parked first */
const same = (name, props, select, extra = {}) => ({
  name,
  props,
  story: { id: USERS, select, open: parked(extra.open) },
  console: { path: ON, select, open: parked(extra.open) },
  mock: null,
  ...(extra.state ? { state: extra.state } : {}),
  ...(extra.note ? { note: extra.note } : {}),
});

module.exports = {
  component: 'Table',
  frames: [
    /* ── the card ── */
    same('card · rest', ['borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'boxShadow', 'backgroundColor', 'fontFamily'], '.tbl',
      { note: 'fontFamily is read HERE, once: the gallery draws the table in the system face (Segoe UI on this laptop), the console in Inter, so every text run is a few px wider there — a gallery-level gap, which is why no text-driven width is read below' }),
    /* ── the strip: the page's 60 band the table draws its controls into ── */
    { name: 'page band (60) the controls sit in', props: ['height', 'paddingLeft', 'paddingRight', 'gap', 'backgroundColor'],
      story: { id: BAND, select: STRIP, open: parked() }, console: { path: ON, select: `${STRIP}[aria-label="User controls"]`, open: parked() }, mock: null },
    same('search box · box and type', ['width', 'height', 'paddingLeft', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'boxShadow', 'cursor', 'fontSize', 'fontWeight', 'lineHeight', 'color'], SEARCH),
    same('search box · hover', ['borderTopColor', 'boxShadow', 'backgroundColor'], SEARCH, { state: 'hover' }),
    same('search box · focus (caret in)', ['borderTopColor', 'boxShadow', 'outlineWidth'], SEARCH, { open: focusSearch }),
    same('search glyph', GLYPH, SEARCH_GLYPH),
    /* the door is a TEXT button: More filters on both sides (the story with the advanced filter) */
    { name: 'More filters door · rest', props: TEXT_BTN.filter((p) => p !== 'width'), story: { id: ADV, select: DOOR, open: parked() }, console: { path: ON, select: DOOR, open: parked() }, mock: null,
      note: 'no width: the door is as wide as its words, and the two faces (card · rest) set them 3 px apart' },
    /* the icon-only squares: one ToolbarButton; Sort carries the hover, open and glyph frames for all of them */
    same('quick-filter square · rest', SQUARE, 'button[aria-label="Filter by status"]'),
    same('quick-filter glyph', GLYPH, 'button[aria-label="Filter by status"] svg',
      { note: 'the story hands the library loader icon, the console its own inlined burst (StatusGlyph) — the two must render alike' }),
    same('Sort button · rest', SQUARE, 'button[aria-label="Sort"]'),
    same('Sort button · hover', ['backgroundColor', 'borderTopColor', 'color'], 'button[aria-label="Sort"]', { state: 'hover' }),
    same('Sort button · open (pointer away)', ['backgroundColor', 'color', 'borderTopColor'], 'button[aria-label="Sort"]', { open: openSort }),
    same('Sort glyph', GLYPH, 'button[aria-label="Sort"] svg'),
    same('Columns button · rest', SQUARE, 'button[aria-label="Manage columns"]'),
    /* ── headings ── */
    same('lead heading', ['width', 'height', 'backgroundColor', ...HEAD_LINE], '.tbl thead th:first-child'),
    same('select-all box', ['width', 'height', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor'], '.tbl thead th:first-child [role="checkbox"]'),
    same('Name heading', ['width', 'height', 'paddingLeft', 'paddingRight', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'textTransform', 'backgroundColor', ...HEAD_LINE], TH('__name')),
    same('Action heading', ['width', 'height', 'paddingLeft', 'fontSize', 'fontWeight', 'color', 'backgroundColor', ...HEAD_LINE], TH('__action')),
    same('content heading (Email)', ['height', 'paddingLeft', 'paddingRight', 'fontSize', 'fontWeight', 'lineHeight', 'letterSpacing', 'color', 'textTransform', 'backgroundColor', ...HEAD_LINE], TH('email'),
      { note: 'no width: the story declares Email 217 and the page 240 — a caller\'s number, not the table\'s' }),
    same('content heading · under the pointer', ['backgroundColor'], TH('email'), { state: 'hover' }),
    same('quick-filter heading (Status)', ['height', 'backgroundColor', 'color', ...HEAD_LINE], TH('status')),
    same('quick-filter heading glyph', GLYPH, `${TH('status')} .tbl-glyph svg`),
    same('resize handle', ['width', 'height', 'cursor'], `${TH('email')} .tbl-rz`),
    same('the nick', ['width', 'height', 'backgroundColor'], `${TH('email')} .tbl-nick`),
    /* ── a body row ── */
    same('body row · rest', ['height'], ROW),
    same('lead cell', ['width', 'height', ...CELL_LINE], `${ROW} td:nth-child(1)`),
    same('row number', TEXT, `${ROW} .tbl-num`),
    same('row checkbox (row under the pointer)', ['width', 'height', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor'], `${ROW} [role="checkbox"]`, { open: hoverRow }),
    same('Name cell', ['width', 'height', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', ...CELL_LINE], NAME),
    { name: 'Name cell inner (the PersonCell: avatar · name)', props: ['gap', 'height'],
      story: { id: USERS, select: PERSON.story, open: parked() }, console: { path: ON, select: PERSON.console, open: parked() }, mock: null,
      note: 'the same part on both sides since 2026-09-26; the page\'s 6px pair AROUND it (its mark at 6, the part\'s at 12) is the raised, undecided item and is not read here' },
    { name: 'avatar', props: ['width', 'height', 'borderTopLeftRadius', 'fontSize', 'fontWeight'],
      story: { id: USERS, select: `${PERSON.story} > span:first-child`, open: parked() }, console: { path: ON, select: `${PERSON.console} > span:first-child`, open: parked() }, mock: null,
      note: 'the console\'s own Users avatar rides in through the part\'s avatar slot (Pranjal 2026-09-13); colour is a tone, not the table\'s' },
    { name: 'name text', props: TEXT,
      story: { id: USERS, select: `${PERSON.story} > span:nth-child(2)`, open: parked() },
      console: { path: ON, select: `${PERSON.console} > span:nth-child(2)`, open: parked() }, mock: null,
      note: 'the PersonCell\'s own name on both sides: 12 / 500 in the heading ink (the page\'s 400 went on 2026-09-26)' },
    same('owner mark', ['width', 'height', 'backgroundColor', 'color'], `${NAME} [title="Tenant owner"]`,
      { note: 'the corner is 9999 on the story and 999 on the console — both a full circle on a 20 mark, so not compared' }),
    same('owner glyph', GLYPH, `${NAME} [title="Tenant owner"] svg`),
    same('Action cell', ['width', 'height', ...CELL_LINE], `${ROW} td:nth-child(3)`),
    same('Action button · rest', ['width', 'height', 'borderTopLeftRadius', 'backgroundColor', 'color'], ACTIONS),
    same('Action button · hover', ['width', 'height', 'backgroundColor', 'color'], ACTIONS, { state: 'hover' }),
    same('Action glyph', GLYPH, `${ACTIONS} svg`),
    same('content cell (Email)', ['height', 'paddingLeft', 'paddingRight', 'paddingTop', 'paddingBottom', 'fontSize', 'lineHeight', ...CELL_LINE], `${ROW} td:nth-child(4)`),
    same('muted cell text (Email)', TEXT, `${ROW} td:nth-child(4) > span`),
    same('contact chip', ['width', 'height', 'borderTopWidth', 'borderTopColor', 'backgroundColor', 'color'], `${ROW} button[aria-label^="Copy email"]`,
      { note: 'the story\'s ContactChips beside the page\'s own .contact-chip; the corner is 9999 there and 999 here — both a full circle on 28, so not compared' }),
    same('contact chip glyph', GLYPH, `${ROW} button[aria-label^="Copy email"] svg`),
    same('status pill', ['height', 'paddingLeft', 'gap', 'fontWeight', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'color'], `${ROW} [data-testid="badge"][data-tone="success"]`,
      { note: 'no fontSize: the page rule main tbody td [data-tone][data-size] sets 11 over the Badge\'s 12 (his ruling 2026-09-18)' }),
    { name: 'source square', props: ['height', 'paddingTop', 'paddingLeft', 'borderTopWidth', 'borderTopLeftRadius', 'backgroundColor', 'color'],
      story: { id: USERS, select: `${ROW} td:nth-child(7) [data-testid="badge"]`, open: parked() }, console: { path: ON, select: `${ROW} td:nth-child(7) > span`, open: parked() }, mock: null,
      note: 'the library Badge sm square on both sides since 2026-09-26 (the console\'s own Chip left the page that evening; it had no library tone until then); the page rule sets its type 11 over 12, so no fontSize' },
    same('team square', ['height', 'paddingTop', 'paddingLeft', 'borderTopWidth', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontWeight'], `${ROW} td:nth-child(8) [data-testid="badge"]`,
      { note: 'no fontSize (the same page rule); sm on both sides since 2026-09-26 (the page\'s ValueSquare drew the default size before)' }),
    same('row hover tint (pinned cell)', ['backgroundColor'], NAME, { state: 'hover' }),
    same('row hover tint (content cell)', ['backgroundColor'], `${ROW} td:nth-child(4)`, { state: 'hover' }),
    same('selected row (pinned cell)', ['backgroundColor'], NAME, { open: pickRow }),
    same('selected row (content cell)', ['backgroundColor'], `${ROW} td:nth-child(4)`, { open: pickRow }),
    same('selected checkbox', ['backgroundColor', 'borderTopColor', 'color'], `${ROW} [role="checkbox"]`, { open: pickRow }),
    /* ── the row menu BOX (items belong to DropdownMenu's twins) ── */
    same('row menu box', PANEL, MENU, { open: openRowMenu }),
    same('Action button · open', ['backgroundColor', 'color'], `${ACTIONS}[data-state="open"]`, { open: openRowMenu }),
    /* ── Sort menu ── */
    same('Sort menu box', PANEL, MENU, { open: openSort }),
    same('Sort menu label', [...LABEL, 'textTransform', 'paddingLeft', 'paddingTop', 'paddingBottom', 'height'], `${MENU} > div:first-child`, { open: openSort }),
    same('Sort menu · field row', ['height', 'paddingLeft', 'borderTopLeftRadius', 'color', 'fontSize', 'fontWeight', 'cursor'], `${MENU} > [role="menuitem"]`, { open: openSort,
      note: 'the first field row (querySelector takes the first match; :first-of-type would name the label, a div like the rows)' }),
    same('Sort menu · Clear sort', ['height', 'paddingLeft', 'color', 'fontSize', 'fontWeight', 'opacity', 'cursor'], `${MENU} > [role="menuitem"]:last-child`, { open: openSort }),
    /* ── Columns panel ── */
    same('Columns panel box', ['width', 'paddingTop', 'paddingLeft', 'paddingRight', 'paddingBottom', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'boxShadow'], COLS, { open: openColumns }),
    same('Columns panel title', TEXT, `${COLS} > div:first-child > span`, { open: openColumns }),
    same('Columns panel search box', ['height', 'paddingLeft', 'gap', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'color'], `${COLS} label`, { open: openColumns }),
    same('Columns panel search type', ['fontSize', 'fontWeight', 'color'], `${COLS} label input`, { open: openColumns }),
    same('Columns panel section label', [...LABEL, 'height'], `${COLS} label ~ div`, { open: openColumns }),
    same('Columns panel row', ['height', 'gap', 'backgroundColor', 'cursor'], `${COLS} button[draggable]`, { open: openColumns,
      note: 'no paddingLeft, no radius: the console\'s button.mdt-rounded-md rules (see the header) paint 12 / 8 over the part\'s 0 / 6' }),
    same('Columns panel row · hover', ['backgroundColor'], `${COLS} button[draggable]`, { open: openColumns, state: 'hover' }),
    same('Columns panel row name', ['fontSize', 'fontWeight', 'color'], `${COLS} button[draggable] > span.mdt-flex-1`, { open: openColumns }),
    same('Columns panel grip', GLYPH, `${COLS} button[draggable] svg`, { open: openColumns }),
    /* ── quick-filter menu ── */
    same('quick-filter menu box', PANEL, MENU, { open: openQuick }),
    same('quick-filter row', ['height', 'paddingLeft', 'gap', 'borderTopLeftRadius'], '[role="menuitemcheckbox"]', { open: openQuick }),
    same('quick-filter row pill', ['height', 'paddingLeft', 'gap', 'fontSize', 'fontWeight', 'backgroundColor', 'color'], '[role="menuitemcheckbox"] [data-testid="badge"]', { open: openQuick }),
    /* ── pager ── */
    same('pager strip', ['height', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'backgroundColor', 'borderBottomRightRadius'], '.tbl-foot'),
    same('pager count', TEXT, '.tbl-count'),
    same('rows-per-page', ['height', 'paddingLeft', 'paddingRight', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight'], 'button[aria-label="Rows per page"]'),
    same('pager square · disabled', ['width', 'height', 'opacity', 'borderTopColor', 'backgroundColor', 'color'], 'button[aria-label="First page"]'),
    same('pager square · hover', ['borderTopColor', 'backgroundColor', 'color'], 'button[aria-label="Next page"]', { state: 'hover' }),
    same('page input', ['width', 'height', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight'], 'input[aria-label="Page number"]'),
    /* ── bulk bar (a row picked) ── */
    same('bulk bar', ['height', 'paddingLeft', 'paddingRight', 'gap', 'borderTopLeftRadius', 'backgroundColor', 'boxShadow', 'color'], BULK, { open: pickRow }),
    /* the hook the bar hangs from: 0 high, laid out last, stuck to the bottom of whatever scrolls the card (2026-09-26) */
    same('bulk bar · the hook it hangs from', ['position', 'bottom', 'height', 'order', 'zIndex'], '.tbl-bulk', { open: pickRow,
      note: 'sticky at the bottom of the page, so the bar pins 62 above the window while the card runs past it; the console has no hook until it rides the 2026-09-26 build' }),
    /* the count is plain words since 2026-09-26 (a span: no corner to read); the console keeps the old button until the
       swap, so the frame takes whatever sits first in the bar on each side */
    same('bulk bar · count', ['height', 'paddingLeft', 'fontSize', 'fontWeight', 'color'], `${BULK} > :first-child`, { open: pickRow }),
    same('bulk bar · divider', ['width', 'height', 'backgroundColor'], `${BULK} > span[aria-hidden]`, { open: pickRow }),
    same('bulk bar · action', ['height', 'paddingLeft', 'paddingRight', 'gap', 'borderTopLeftRadius', 'backgroundColor', 'color', 'fontSize', 'fontWeight'], `${BULK} > button:not([disabled]):not(:first-child)`,
      { open: pickRow, note: 'the first ENABLED action on both sides (the first row is Active, so Deactivate / Disable)' }),
    same('bulk bar · action · hover', ['backgroundColor', 'color'], `${BULK} > button:not([disabled]):not(:first-child)`, { open: pickRow, state: 'hover' }),
    same('bulk bar · action · disabled', ['opacity', 'cursor'], `${BULK} > button[disabled]`, { open: pickRow }),
    same('bulk bar · Delete', ['color'], `${BULK} > button:nth-last-child(2)`, { open: pickRow }),
    same('bulk bar · clear', ['width', 'height', 'color', 'backgroundColor', 'borderTopLeftRadius'], 'button[aria-label="Clear selection"]', { open: pickRow }),
    /* ── blank state: nothing found (the console reaches it by searching; first-run and error have no console twin) ── */
    { name: 'nothing found', props: ['height', 'fontSize', 'fontWeight', 'color'],
      story: { id: NOTHING, select: STATUS, open: parked() }, console: { path: ON, select: STATUS, open: parked(searchNothing) }, mock: null },
    { name: 'nothing found · title', props: TEXT,
      story: { id: NOTHING, select: `${STATUS} > span:nth-child(2)`, open: parked() }, console: { path: ON, select: `${STATUS} > span:nth-child(2)`, open: parked(searchNothing) }, mock: null },
    { name: 'nothing found · Clear filters', props: ['height', 'paddingLeft', 'fontSize', 'fontWeight', 'color', 'backgroundColor', 'borderTopColor', 'borderTopLeftRadius'],
      story: { id: NOTHING, select: `${STATUS} button`, open: parked() }, console: { path: ON, select: `${STATUS} button`, open: parked(searchNothing) }, mock: null },
  ],
};

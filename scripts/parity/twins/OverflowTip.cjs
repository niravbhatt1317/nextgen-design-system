/* Parity twins: OverflowTip, measured 2026-10-28. The console's part is ui/OverflowTip.jsx, mounted once in App.jsx.
 * Roles cuts its Description cells with "…" at 1440 ("Full operational administration across t…"); resting the pointer
 * on one opens the bubble with the whole text over a still, pointer-transparent box laid on the cell. The story's
 * Default cuts its long names the same way. Not Client Organizations: that module turns every tooltip to 500 on 1.4
 * under html[data-om-tips] (organizations/omTips.css), so its bubbles measure the module's face, not this part's. Not
 * Users: in the measuring browser its Email cells fit. */
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

/* the first cell on the page the layout cut short, found the way OverflowTip finds it (the browser's font decides which) */
const markCut = () => {
  for (const el of document.querySelectorAll('main td *')) {
    const r = el.getBoundingClientRect();
    if (getComputedStyle(el).textOverflow === 'ellipsis' && el.scrollWidth > el.clientWidth + 1 && el.innerText.trim() && r.width > 0 && r.bottom < innerHeight) {
      el.setAttribute('data-parity-cut', '');
      return true;
    }
  }
  return false;
};
const hoverConsole = async (page) => {
  await page.waitForSelector('main td', { timeout: 20000 });
  await page.waitForFunction(markCut, null, { timeout: 15000 });
  await page.hover('[data-parity-cut]');
  await page.waitForSelector('.tt', { timeout: 5000 });
  await wait(300);
};
const hoverStory = async (page) => {
  await page.hover('text=Northwind Retail');
  await page.waitForSelector('.tt', { timeout: 5000 });
  await wait(300);
};
const STORY = 'new-components-overflowtip--default';

module.exports = {
  component: 'OverflowTip',
  frames: [
    {
      name: 'the bubble (the library tooltip, read from the left, 340 at most)',
      props: [
        'backgroundColor', 'color', 'fontSize', 'lineHeight', 'paddingTop', 'paddingLeft', 'borderTopLeftRadius',
        'maxWidth', 'textAlign', 'zIndex',
      ],
      story: { id: STORY, open: hoverStory, select: '.tt' },
      console: { path: '/roles', open: hoverConsole, select: '.tt' },
      mock: null,
    },
    {
      name: 'the anchor (fixed over the cut text, the pointer passes through)',
      props: ['position', 'pointerEvents'],
      story: { id: STORY, open: hoverStory, select: '[data-slot="overflow-tip-anchor"]' },
      console: { path: '/roles', open: hoverConsole, select: 'span[aria-hidden="true"][style*="position: fixed"]' },
      mock: null,
    },
  ],
};

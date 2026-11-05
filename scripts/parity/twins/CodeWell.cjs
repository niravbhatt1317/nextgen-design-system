/* Parity twins: the library's CodeWell beside the console's own, both imported from the package. Corrected 2026-11-05: an
 * earlier comment here said the console does not render it; it does, on both surfaces.
 *
 * Light: Collector Fleet › Govern › Audit › Export the trail (fleet-new/cfm/screens/govern/Audit.tsx, "The file's own
 * header"). The export list starts empty and lives in memory, so the twin requests one, opens the dialog again and answers
 * "It finished"; only a ready export draws the well.
 *
 * Dark: Discovery profiles › edit "AWS ap-south-1 - production" › Provider & connection › IAM Role Delegation, the
 * CloudFormation template (discovery-profiles/wizard/parts.jsx CodeBlock: <CodeWell surface="dark">). parts.css reshapes that
 * well's scrolling: padding-right 0, a max height, a copy button of its own. None of those is among the properties read here.
 *
 * Other live library wells: agent Govern's export (fleet-new/afm/screens/Govern.tsx), agent Health's findings
 * (FleetHealth.tsx) and both Retire screens.
 * Not this part: the drawers' "CodeBlock" in fleet-new/afm/screens/drawer/parts.tsx is the console's own quiet twin. */
const PROPS = [
  'backgroundColor', 'color', 'borderTopWidth', 'borderTopColor', 'borderTopLeftRadius',
  'paddingTop', 'paddingLeft', 'fontSize', 'fontWeight',
];
const WELL = 'pre[data-testid="codewell-body"]';
const wait = (ms) => new Promise((r) => setTimeout(r, ms));

const openExportHeader = async (page) => {
  await wait(1000);
  const crumb = page.locator('.fsc-crumb').first();
  if (await crumb.count()) {
    await crumb.click(); await wait(300);
    await page.locator('.fsc-row', { hasText: 'Northwind Retail' }).first().click(); await wait(1000);
  }
  await page.locator('[role="tab"]').filter({ hasText: /^Govern$/ }).first().click();
  await wait(500);
  await page.locator('.st-rail__item', { hasText: /^Audit$/ }).first().click();
  await wait(400);
  await page.getByRole('button', { name: /export the trail/i }).first().click();
  await page.getByRole('button', { name: /request the export/i }).click();
  await page.waitForSelector('[role=dialog]', { state: 'hidden', timeout: 8000 });
  await page.getByRole('button', { name: /export the trail/i }).first().click();
  await page.getByRole('button', { name: /it finished/i }).first().click();
  await page.waitForSelector(`[role=dialog] ${WELL}`, { timeout: 8000 });
  await wait(400);
};

const openRoleTemplate = async (page) => {
  await page.getByRole('button', { name: /^next$/i }).click();
  await page.getByText('IAM Role Delegation').first().click();
  await page.waitForSelector(`.dp-code__well ${WELL}`, { timeout: 8000 });
  await wait(300);
};

module.exports = {
  component: 'CodeWell',
  frames: [
    {
      name: 'light · the well (the muted ground behind a value in a panel)',
      props: PROPS,
      story: { id: 'new-components-codewell--default', select: WELL },
      console: { path: '/collectors', open: openExportHeader, select: `[role=dialog] ${WELL}` },
      mock: null,
    },
    {
      name: 'dark · the well (terminal output)',
      props: PROPS,
      story: { id: 'new-components-codewell--surfaces', select: `${WELL}.mdt-bg-neutral-160` },
      console: { path: '/discovery-profiles/dp-2/edit', open: openRoleTemplate, select: `.dp-code__well ${WELL}` },
      mock: null,
    },
  ],
};

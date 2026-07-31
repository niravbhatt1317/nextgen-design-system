import { chromium } from 'playwright';
const B='http://localhost:6007';
const b=await chromium.launch();
const p=await b.newPage({viewport:{width:900,height:600}});
const go=async(id)=>{await p.goto(`${B}/iframe.html?id=${id}&globals=theme:light`,{waitUntil:'domcontentloaded',timeout:40000});
  await p.waitForFunction(()=>{const r=document.querySelector('#storybook-root');return !!r&&r.children.length>0;},undefined,{timeout:30000});await p.waitForTimeout(600);};

console.log('=== THE ORIGINAL BUG: row height on select/deselect ===');
await go('components-table--selectable-rows');
const h=async()=>p.evaluate(()=>document.querySelector('#storybook-root tbody tr').getBoundingClientRect().height);
console.log('  unchecked :', await h());
await p.locator('#storybook-root tbody [role=checkbox]').first().click();
await p.waitForTimeout(300);
console.log('  checked   :', await h());
await p.locator('#storybook-root tbody [role=checkbox]').first().click();
await p.waitForTimeout(300);
console.log('  unchecked :', await h(), ' → equal = fixed');

console.log('\n=== does align-middle shift the box vs adjacent text? ===');
await go('components-checkbox--with-label');
console.log(await p.evaluate(()=>{
  const cb=document.querySelector('#storybook-root [role=checkbox]');
  if(!cb) return '  (no with-label story)';
  const lab=cb.parentElement?.querySelector('label')||cb.nextElementSibling;
  const c=cb.getBoundingClientRect();
  if(!lab) return `  checkbox centre y=${(c.top+c.height/2).toFixed(1)}`;
  const l=lab.getBoundingClientRect();
  return `  checkbox centre y=${(c.top+c.height/2).toFixed(1)}   label centre y=${(l.top+l.height/2).toFixed(1)}   offset=${((c.top+c.height/2)-(l.top+l.height/2)).toFixed(1)}px`;
}));
await b.close();

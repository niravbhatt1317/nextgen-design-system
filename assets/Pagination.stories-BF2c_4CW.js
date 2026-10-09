import{j as n,r as gn}from"./iframe-BG5W6PCm.js";import{P as o,a as c,b as e,c as l,d as i,e as d,f as I}from"./Pagination-DKfoSd6K.js";import"./preload-helper-Dp1pzeXC.js";import"./index-ChEho857.js";import"./index-CcRgbaMz.js";import"./index-DXf-30mB.js";import"./Icon-Clhn8wyD.js";const kn={title:"Components/Pagination",component:o,tags:["autodocs"],parameters:{layout:"centered",docs:{description:{component:"Pagination with page navigation, ellipsis and accessible links. Supports custom sizes and variants."}},controls:{exclude:["class"]}},argTypes:{className:{control:"text",description:"Additional CSS classes to apply",table:{type:{summary:"string"}}}}},m={render:()=>n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#"})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"1"})}),n.jsx(e,{children:n.jsx(i,{href:"#",isActive:!0,children:"2"})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"3"})}),n.jsx(e,{children:n.jsx(d,{href:"#"})})]})})},P={render:()=>n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#"})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"1"})}),n.jsx(e,{children:n.jsx(I,{})}),n.jsx(e,{children:n.jsx(i,{href:"#",isActive:!0,children:"5"})}),n.jsx(e,{children:n.jsx(I,{})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"10"})}),n.jsx(e,{children:n.jsx(d,{href:"#"})})]})})},h={render:()=>n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#",label:"Prev"})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"1"})}),n.jsx(e,{children:n.jsx(i,{href:"#",isActive:!0,children:"2"})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"3"})}),n.jsx(e,{children:n.jsx(d,{href:"#",label:"Next"})})]})})},p={render:()=>n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#",size:"sm"})}),n.jsx(e,{children:n.jsx(i,{href:"#",size:"sm",children:"1"})}),n.jsx(e,{children:n.jsx(i,{href:"#",size:"sm",isActive:!0,children:"2"})}),n.jsx(e,{children:n.jsx(i,{href:"#",size:"sm",children:"3"})}),n.jsx(e,{children:n.jsx(d,{href:"#",size:"sm"})})]})})},x={render:()=>n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#",size:"lg"})}),n.jsx(e,{children:n.jsx(i,{href:"#",size:"lg",children:"1"})}),n.jsx(e,{children:n.jsx(i,{href:"#",size:"lg",isActive:!0,children:"2"})}),n.jsx(e,{children:n.jsx(i,{href:"#",size:"lg",children:"3"})}),n.jsx(e,{children:n.jsx(d,{href:"#",size:"lg"})})]})})},u={render:function(){const[a,g]=gn.useState(1),t=10,ln=()=>{const s=[];{s.push(n.jsx(e,{children:n.jsx(i,{href:"#",isActive:a===1,onClick:r=>{r.preventDefault(),g(1)},children:"1"})},1)),a>3&&s.push(n.jsx(e,{children:n.jsx(I,{})},"ellipsis1"));const dn=Math.max(2,a-1),mn=Math.min(t-1,a+1);for(let r=dn;r<=mn;r++)s.push(n.jsx(e,{children:n.jsx(i,{href:"#",isActive:a===r,onClick:Pn=>{Pn.preventDefault(),g(r)},children:String(r)})},r));a<t-2&&s.push(n.jsx(e,{children:n.jsx(I,{})},"ellipsis2")),s.push(n.jsx(e,{children:n.jsx(i,{href:"#",isActive:a===t,onClick:r=>{r.preventDefault(),g(t)},children:String(t)})},t))}return s};return n.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-items-center mdt-gap-4",children:[n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#",onClick:s=>{s.preventDefault(),a>1&&g(a-1)},"aria-disabled":a===1,className:a===1?"mdt-pointer-events-none mdt-opacity-50":""})}),ln(),n.jsx(e,{children:n.jsx(d,{href:"#",onClick:s=>{s.preventDefault(),a<t&&g(a+1)},"aria-disabled":a===t,className:a===t?"mdt-pointer-events-none mdt-opacity-50":""})})]})}),n.jsxs("p",{className:"mdt-text-sm mdt-text-muted-foreground",children:["Page ",a," of ",t]})]})}},f={render:()=>n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#",className:"mdt-pointer-events-none mdt-opacity-50","aria-disabled":"true"})}),n.jsx(e,{children:n.jsx(i,{href:"#",isActive:!0,children:"1"})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"2"})}),n.jsx(e,{children:n.jsx(i,{href:"#",children:"3"})}),n.jsx(e,{children:n.jsx(d,{href:"#"})})]})})},j={render:function(){const[a,g]=gn.useState(2);return n.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-6",children:[n.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[n.jsx("p",{className:"mdt-text-sm mdt-font-medium",children:"With an href - anchors"}),n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{href:"#page1",disabled:!0})}),n.jsx(e,{children:n.jsx(i,{href:"#page1",isActive:!0,children:"1"})}),n.jsx(e,{children:n.jsx(i,{href:"#page2",children:"2"})}),n.jsx(e,{children:n.jsx(d,{href:"#page2"})})]})})]}),n.jsxs("div",{className:"mdt-flex mdt-flex-col mdt-gap-2",children:[n.jsxs("p",{className:"mdt-text-sm mdt-font-medium",children:["Without one - buttons, page ",a]}),n.jsx(o,{children:n.jsxs(c,{children:[n.jsx(e,{children:n.jsx(l,{disabled:a===1,onClick:()=>{g(t=>Math.max(1,t-1))}})}),[1,2,3].map(t=>n.jsx(e,{children:n.jsx(i,{isActive:t===a,onClick:()=>{g(t)},children:t})},t)),n.jsx(e,{children:n.jsx(d,{disabled:a===3,onClick:()=>{g(t=>Math.min(3,t+1))}})})]})})]})]})}};var k,v,L,b,C;m.parameters={...m.parameters,docs:{...(k=m.parameters)==null?void 0:k.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...(L=(v=m.parameters)==null?void 0:v.docs)==null?void 0:L.source},description:{story:"Default pagination example with numbered pages.",...(C=(b=m.parameters)==null?void 0:b.docs)==null?void 0:C.description}}};var N,y,w,A,S;P.parameters={...P.parameters,docs:{...(N=P.parameters)==null?void 0:N.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            5
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">10</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...(w=(y=P.parameters)==null?void 0:y.docs)==null?void 0:w.source},description:{story:"Pagination with ellipsis for many pages.",...(S=(A=P.parameters)==null?void 0:A.docs)==null?void 0:S.description}}};var z,D,E,M,W;h.parameters={...h.parameters,docs:{...(z=h.parameters)==null?void 0:z.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" label="Prev" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">1</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" label="Next" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...(E=(D=h.parameters)==null?void 0:D.docs)==null?void 0:E.source},description:{story:"Pagination with custom labels.",...(W=(M=h.parameters)==null?void 0:M.docs)==null?void 0:W.description}}};var B,O,T,R,_;p.parameters={...p.parameters,docs:{...(B=p.parameters)==null?void 0:B.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="sm" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="sm">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="sm" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="sm">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="sm" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...(T=(O=p.parameters)==null?void 0:O.docs)==null?void 0:T.source},description:{story:"Small size pagination.",...(_=(R=p.parameters)==null?void 0:R.docs)==null?void 0:_.description}}};var H,q,F,G,J;x.parameters={...x.parameters,docs:{...(H=x.parameters)==null?void 0:H.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" size="lg" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="lg">
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="lg" isActive>
            2
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" size="lg">
            3
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" size="lg" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...(F=(q=x.parameters)==null?void 0:q.docs)==null?void 0:F.source},description:{story:"Large size pagination.",...(J=(G=x.parameters)==null?void 0:G.docs)==null?void 0:J.description}}};var K,Q,U,V,X;u.parameters={...u.parameters,docs:{...(K=u.parameters)==null?void 0:K.docs,source:{originalSource:`{
  render: function ControlledComponent() {
    const [currentPage, setCurrentPage] = useState(1);
    const totalPages = 10;
    const renderPageNumbers = () => {
      const pages = [];
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      const showEllipsis = totalPages > 7;
      if (!showEllipsis) {
        // Show all pages if 7 or fewer
        for (let i = 1; i <= totalPages; i++) {
          pages.push(<PaginationItem key={i}>
              <PaginationLink href="#" isActive={currentPage === i} onClick={e => {
              e.preventDefault();
              setCurrentPage(i);
            }}>
                {String(i)}
              </PaginationLink>
            </PaginationItem>);
        }
      } else {
        // Show pages with ellipsis
        pages.push(<PaginationItem key={1}>
            <PaginationLink href="#" isActive={currentPage === 1} onClick={e => {
            e.preventDefault();
            setCurrentPage(1);
          }}>
              1
            </PaginationLink>
          </PaginationItem>);
        if (currentPage > 3) {
          pages.push(<PaginationItem key="ellipsis1">
              <PaginationEllipsis />
            </PaginationItem>);
        }
        const startPage = Math.max(2, currentPage - 1);
        const endPage = Math.min(totalPages - 1, currentPage + 1);
        for (let i = startPage; i <= endPage; i++) {
          pages.push(<PaginationItem key={i}>
              <PaginationLink href="#" isActive={currentPage === i} onClick={e => {
              e.preventDefault();
              setCurrentPage(i);
            }}>
                {String(i)}
              </PaginationLink>
            </PaginationItem>);
        }
        if (currentPage < totalPages - 2) {
          pages.push(<PaginationItem key="ellipsis2">
              <PaginationEllipsis />
            </PaginationItem>);
        }
        pages.push(<PaginationItem key={totalPages}>
            <PaginationLink href="#" isActive={currentPage === totalPages} onClick={e => {
            e.preventDefault();
            setCurrentPage(totalPages);
          }}>
              {String(totalPages)}
            </PaginationLink>
          </PaginationItem>);
      }
      return pages;
    };
    return <div className="mdt-flex mdt-flex-col mdt-items-center mdt-gap-4">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious href="#" onClick={e => {
              e.preventDefault();
              if (currentPage > 1) setCurrentPage(currentPage - 1);
            }} aria-disabled={currentPage === 1} className={currentPage === 1 ? 'mdt-pointer-events-none mdt-opacity-50' : ''} />
            </PaginationItem>
            {renderPageNumbers()}
            <PaginationItem>
              <PaginationNext href="#" onClick={e => {
              e.preventDefault();
              if (currentPage < totalPages) setCurrentPage(currentPage + 1);
            }} aria-disabled={currentPage === totalPages} className={currentPage === totalPages ? 'mdt-pointer-events-none mdt-opacity-50' : ''} />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
        <p className="mdt-text-sm mdt-text-muted-foreground">
          Page {currentPage} of {totalPages}
        </p>
      </div>;
  }
}`,...(U=(Q=u.parameters)==null?void 0:Q.docs)==null?void 0:U.source},description:{story:"Interactive controlled pagination example.",...(X=(V=u.parameters)==null?void 0:V.docs)==null?void 0:X.description}}};var Y,Z,$,nn,en;f.parameters={...f.parameters,docs:{...(Y=f.parameters)==null?void 0:Y.docs,source:{originalSource:`{
  render: () => <Pagination>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href="#" className="mdt-pointer-events-none mdt-opacity-50" aria-disabled="true" />
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#" isActive>
            1
          </PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">2</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationLink href="#">3</PaginationLink>
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href="#" />
        </PaginationItem>
      </PaginationContent>
    </Pagination>
}`,...($=(Z=f.parameters)==null?void 0:Z.docs)==null?void 0:$.source},description:{story:"Pagination with disabled state.",...(en=(nn=f.parameters)==null?void 0:nn.docs)==null?void 0:en.description}}};var an,tn,sn,rn,on;j.parameters={...j.parameters,docs:{...(an=j.parameters)==null?void 0:an.docs,source:{originalSource:`{
  render: function LinksOrButtonsDemo() {
    const [page, setPage] = useState(2);
    return <div className="mdt-flex mdt-flex-col mdt-gap-6">
        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <p className="mdt-text-sm mdt-font-medium">With an href - anchors</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious href="#page1" disabled />
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page1" isActive>
                  1
                </PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationLink href="#page2">2</PaginationLink>
              </PaginationItem>
              <PaginationItem>
                <PaginationNext href="#page2" />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>

        <div className="mdt-flex mdt-flex-col mdt-gap-2">
          <p className="mdt-text-sm mdt-font-medium">Without one - buttons, page {page}</p>
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious disabled={page === 1} onClick={() => {
                setPage(current => Math.max(1, current - 1));
              }} />
              </PaginationItem>
              {[1, 2, 3].map(number => <PaginationItem key={number}>
                  <PaginationLink isActive={number === page} onClick={() => {
                setPage(number);
              }}>
                    {number}
                  </PaginationLink>
                </PaginationItem>)}
              <PaginationItem>
                <PaginationNext disabled={page === 3} onClick={() => {
                setPage(current => Math.min(3, current + 1));
              }} />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>;
  }
}`,...(sn=(tn=j.parameters)==null?void 0:tn.docs)==null?void 0:sn.source},description:{story:`A link when it has somewhere to go, a button when it has not.

**Both kinds of pager are real.** \`/tickets?page=3\` is an address worth
having - it can be opened in a new tab, bookmarked, sent to a colleague and
read by a crawler. A table that pages in place has nowhere to go, and its
controls are state.

Rendering an anchor for both is the version of this that looks fine and is
not. An \`<a>\` with no \`href\` is neither focusable nor announced as a link;
one with \`href="#"\` navigates and puts a stray \`#\` in the address bar; and no
anchor can be disabled, which is exactly what a pager needs at both ends.

So \`href\` decides. Tab through both rows below: the top one is three links
and the disabled control is still reachable, marked \`aria-disabled\`, because
that is the whole of what HTML allows. The bottom one is buttons, and the
disabled control is genuinely inert.`,...(on=(rn=j.parameters)==null?void 0:rn.docs)==null?void 0:on.description}}};const vn=["Default","WithEllipsis","CustomLabels","Small","Large","Controlled","Disabled","LinksOrButtons"];export{u as Controlled,h as CustomLabels,m as Default,f as Disabled,x as Large,j as LinksOrButtons,p as Small,P as WithEllipsis,vn as __namedExportsOrder,kn as default};
//# sourceMappingURL=Pagination.stories-BF2c_4CW.js.map

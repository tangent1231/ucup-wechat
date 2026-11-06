// Illustrated demos share the article data, image picker and safe export path.
const illustratedThemes=['celebration','notebook','keylab'];
Object.assign(themeNames,{celebration:'05 / 气球庆典',notebook:'06 / 代码手记',keylab:'07 / 键盘工作台'});
Object.assign(palette,{
 celebration:{bg:'#f7f3ff',ink:'#343154',accent:'#7961bf',muted:'#857ca2',line:'#d6cceb'},
 notebook:{bg:'#faf9f5',ink:'#273d54',accent:'#5268ac',muted:'#7d89a0',line:'#d4dcec'},
 keylab:{bg:'#eef8f6',ink:'#153e4b',accent:'#2a7f92',muted:'#658994',line:'#c1dedf'}
});
function ornament(id,width='24%',extra='',safe=false){
 const a=ORNAMENTS.find(x=>x.id===id);if(!a||state.ornaments===false)return '';
 return `<img ${safe?'':`class="ornament" data-ornament="${id}"`} src="${a.data}" alt="" aria-hidden="true" style="display:block;width:${width};height:auto;border:0;${extra}" />`;
}
function illustratedGallery(s,i,safe){
 const mode=safe?'stack':state.mode==='auto'?'combo':state.mode;
 let html=gallery(s,i,safe);
 if(!safe)html=`<div class="illustrated-gallery ${theme}-${mode} ${state.fit==='cover'?'crop':'complete'}">${html}</div>`;
 return html;
}
function renderCredits(){
 const c=palette[theme];
 return `<section class="article-credits" style="width:100%;box-sizing:border-box;padding:28px 7% 32px;text-align:center;border-top:1px solid ${c.line};"><img class="ucup-qr" src="${FOOTER.qrData}" alt="${esc(FOOTER.qrAlt)}" style="display:block;width:56%;max-width:220px;height:auto;border:0;margin:0 auto 12px;background-color:#ffffff;"/><p style="font-size:12px;line-height:1.8;margin:0 0 24px;color:${c.ink};">${esc(FOOTER.qrCaption)}</p><p style="font-size:11px;line-height:1.9;margin:0 0 4px;color:${c.muted};">${esc(FOOTER.editor)}</p><p style="font-size:11px;line-height:1.9;margin:0;color:${c.muted};">${esc(FOOTER.reviewer)}</p></section>`;
}
function renderIllustrated(safe=false){
 const c=palette[theme],isParty=theme==='celebration',isBook=theme==='notebook';
 const key=isParty?'balloons':isBook?'code':'keyboard';
 const lines=ARTICLE.variants?.[theme]||[ARTICLE.title];
 const label=`<p style="font-size:10px;letter-spacing:2px;color:${c.accent};margin:0 0 24px;">UNIVERSAL CUP　/　${esc(ARTICLE.locationLabel||'EVENT JOURNAL')}</p>`;
 const title=`<h1 style="font-size:${isBook?36:40}px;line-height:1.35;letter-spacing:-1px;margin:0 0 18px;color:${c.ink};">${lines.map(esc).join('<br>')}</h1>`;
 const subtitle=`<p style="font-size:12px;line-height:1.7;color:${c.accent};margin:0 0 20px;">${esc(ARTICLE.subtitle)}</p>`;
 const meta=`<p style="font-size:11px;line-height:1.8;color:${c.muted};margin:12px 0 0;">${esc(ARTICLE.periodLabel||'')}　｜　${esc(ARTICLE.statsLabel||'')}</p>`;
 const photo=pic(state.hero,'hero','',safe);
 const hero=safe?photo:`<div class="hero-frame hero-${state.heroEffect}">${photo}</div>`;
 let cover;
 if(isParty){
  cover=`<section ${safe?'':'class="illustrated-cover party-cover"'} style="padding:34px 7% 26px;box-sizing:border-box;width:100%;">${label}<div ${safe?'':'class="party-title"'}>${title}${subtitle}</div>${ornament('balloons',safe?'24%':'35%',safe?'margin:0 0 16px auto;':'',safe)}<p style="font-size:10px;letter-spacing:3px;color:${c.accent};margin:25px 0 14px;">TOGETHER / BEYOND THE CONTEST</p><div ${safe?'':'class="party-photo"'} style="padding:9px;background-color:white;border:1px solid ${c.line};">${hero}<p style="font-size:10px;letter-spacing:1px;text-align:center;color:${c.muted};margin:11px 0 3px;">${esc(ARTICLE.locationLabel||'')} · 相聚的瞬间</p></div>${meta}</section>`;
 }else if(isBook){
  cover=`<section ${safe?'':'class="illustrated-cover notebook-cover"'} style="width:100%;box-sizing:border-box;padding:32px 7% 26px;">${label}<div style="border-top:1px solid ${c.line};border-bottom:1px solid ${c.line};padding:14px 0;margin-bottom:26px;font:11px monospace;color:${c.muted};">FIELD NOTES　/　${esc(ARTICLE.periodLabel||'')}</div>${ornament('code','38%','margin:0 0 12px auto;',safe)}${title}${subtitle}<div style="padding:10px;background-color:white;border:1px solid ${c.line};">${hero}</div>${meta}</section>`;
 }else{
  cover=`<section ${safe?'':'class="illustrated-cover keyboard-cover"'} style="width:100%;box-sizing:border-box;padding:34px 7% 28px;">${label}<p style="font:11px monospace;letter-spacing:1px;color:${c.accent};margin:0 0 18px;">[ THINK ]　[ SOLVE ]　[ CONNECT ]</p>${title}${subtitle}${ornament('keyboard','76%','margin:0 auto 2px;',safe)}${meta}<div style="border-top:1px solid ${c.line};margin-top:22px;padding-top:20px;">${hero}</div></section>`;
 }
 const intro=`<section ${safe?'':`class="illustrated-intro intro-${theme}"`} style="width:86%;box-sizing:border-box;margin:8px auto 34px;padding:22px 6%;background-color:white;border:1px solid ${c.line};border-radius:${isBook?'2':'18'}px;"><p style="font-size:11px;letter-spacing:2px;color:${c.accent};margin:0 0 13px;">${isParty?'相聚 · 赛场之外':isBook?'// 写在前面':'START / 共同的起点'}</p>${p(ARTICLE.intro,'margin-bottom:0;')}</section>`;
 const body=state.sections.map((s,i)=>{
  const icon=['balloons','keyboard','trophy','code'][i%4];
  const heading=`<div ${safe?'':`class="illustrated-heading heading-${theme}"`} style="margin:0 0 16px;">${ornament(icon,'17%','margin:0 0 10px;',safe)}<p style="font:11px monospace;letter-spacing:1px;color:${c.accent};margin:0 0 7px;">${isBook?'// ENTRY':isParty?'CHAPTER':'STEP'} ${String(i+1).padStart(2,'0')}　/　${esc(s.date)}</p><h2 style="font-size:22px;line-height:1.45;margin:0;color:${c.ink};">${esc(s.title)}</h2></div>`;
  const content=`<div class="fold-content" style="box-sizing:border-box;width:100%;">${p(s.text)}${divider(safe)}${illustratedGallery(s,i,safe)}</div>`;
  const fold=!safe&&state.folding?`<details class="chapter-fold" data-fold="${i}" ${state.closed[i]?'':'open'}><summary style="color:${c.accent};">${heading}<span class="fold-hint"><span class="fold-more">展开本节 · ${s.images.length} 张照片</span><span class="fold-less">收起本节 −</span></span></summary>${content}</details>`:heading+content;
  return `<section ${safe?'':`class="illustrated-chapter chapter-${theme}"`} style="box-sizing:border-box;width:86%;margin:0 auto 32px;padding:24px 6%;background-color:#ffffff;border:1px ${isBook?'dashed':'solid'} ${c.line};border-radius:${isBook?'2':'20'}px;">${fold}</section>`;
 }).join('');
 const closing=`<section style="width:100%;box-sizing:border-box;text-align:center;padding:4px 9% 34px;">${ornament(isParty?'balloons':key,'22%','margin:0 auto 12px;',safe)}${p(ARTICLE.closing,'font-size:24px;font-weight:700;line-height:1.65;')}${p(ARTICLE.thanks,'font-size:12px;color:'+c.muted+';')}<a href="${esc(ARTICLE.source)}" style="font-size:11px;color:${c.accent};text-decoration:underline;">官方回顾原文</a></section>`;
 return `<section ${safe?'':`class="illustrated-story story-${theme}"`} style="width:100%;box-sizing:border-box;background-color:${c.bg};color:${c.ink};font-family:-apple-system,BlinkMacSystemFont,'PingFang SC',sans-serif;">${cover}${intro}${body}${closing}${renderCredits()}</section>`;
}
function initOrnamentLibrary(){
 const dialog=document.getElementById('ornamentPicker');
 document.getElementById('openOrnaments').onclick=()=>dialog.showModal();
 document.getElementById('closeOrnaments').onclick=()=>dialog.close();
 document.getElementById('ornamentLibrary').innerHTML=ORNAMENTS.map(a=>`<section class="ornament-item"><div><img src="${a.data}" alt="${esc(a.label)}"></div><strong>${esc(a.label)}</strong><a href="${a.data}" download="ucup-${a.id}-512.png">下载透明 PNG</a></section>`).join('');
 document.getElementById('ornaments').oninput=e=>{state.ornaments=e.target.checked;update()};
}

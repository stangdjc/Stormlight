// v14 feature tests

class MockEl{constructor(tag){this.tag=tag;this.children=[];this.classList={list:[],add(c){this.list.push(c)},remove(c){this.list=this.list.filter(x=>x!==c)},contains(c){return this.list.includes(c)}};this.style={};this.dataset={};this.innerHTML='';this.textContent='';this.listeners={};this.attributes={};this.draggable=false;this.offsetWidth=100;this.offsetHeight=140}
  addEventListener(e,fn,opts){if(!this.listeners[e])this.listeners[e]=[];this.listeners[e].push(fn)}
  querySelector(s){return null}
  querySelectorAll(s){return[]}
  closest(s){return null}
  cloneNode(){return new MockEl(this.tag)}
  appendChild(c){this.children.push(c)}
  remove(){}
  getAttribute(n){return this.attributes[n]}
  setAttribute(n,v){this.attributes[n]=v}
  getElementById(id){return null}
  get id(){return this.attributes.id||''}
  set id(v){this.attributes.id=v}
}
const root=new MockEl('div');root.id='root';
const mockDoc={
  getElementById(id){return id==='root'?root:null},
  querySelector(s){return null},
  querySelectorAll(s){return[]},
  createElement(t){return new MockEl(t)},
  addEventListener(){}
};
const mockWin={addEventListener(){},AudioContext:class{},webkitAudioContext:class{},innerWidth:1200,innerHeight:800,scrollTo(){}};
global.document=mockDoc;global.window=mockWin;global.localStorage={getItem(){return null},setItem(){}};
global.navigator={userAgent:'node-test'};

const fs=require('fs');
const html=fs.readFileSync('towers.html','utf8');
const match=html.match(/<script>([\s\S]*?)<\/script>/);
const js=match[1];

const fn=new Function('document','window','localStorage','navigator',js+'\nreturn{saveUndo,shouldAutoPass,initDrag,rCard,MODES}');
const api=fn(mockDoc,mockWin,{getItem(){return null},setItem(){}},{userAgent:'node-test'});

let pass=0,fail=0;
function assert(cond,msg){if(cond){pass++;console.log('  ✅ '+msg)}else{fail++;console.error('  ❌ '+msg)}}

console.log('\n=== v14 Feature Tests ===\n');

console.log('1. Undo System');
assert(typeof api.saveUndo==='function','saveUndo exists');
assert(typeof window.undoAction==='function','undoAction exists on window');

console.log('\n2. Auto-Pass');
assert(typeof api.shouldAutoPass==='function','shouldAutoPass exists');
assert(typeof window.toggleAutoPass==='function','toggleAutoPass on window');

console.log('\n3. Drag-and-Drop');
assert(typeof api.initDrag==='function','initDrag exists');
api.initDrag(); // Should not throw
assert(true,'initDrag runs without error');

console.log('\n4. Shardbearer Fatigue Visual');
const card={id:'sb1',type:'shardbearers',value:7,deployTurn:0,moved:false};
const rendered=api.rCard(card,false);
assert(rendered.includes('shardbearers'),'rCard has shardbearers class');
assert(rendered.includes('cd-eff'),'rCard shows effective strength');
// Check fatigue class logic is present in rendered output or code
assert(rendered.includes('data-id="sb1"'),'rCard has data-id');

console.log('\n5. UI Integration');
// Check that rAct code includes undo button and auto-pass toggle
const src=fs.readFileSync('towers.html','utf8');
assert(src.includes('undo-btn'),'Undo button class in source');
assert(src.includes('auto-pass-toggle'),'Auto-pass toggle in source');
assert(src.includes('ondoAction')===false&&src.includes('undoAction'),'undoAction wired in UI');
assert(src.includes('toggleAutoPass'),'toggleAutoPass wired in UI');
assert(src.includes('initDrag()'),'initDrag called in bind');
assert(src.includes('saveUndo(); // v14: save for undo'),'saveUndo in dep');

// Check saveUndo in retCard and moveCard
const retIdx=src.indexOf('function retCard');
const retSnippet=src.substring(retIdx,retIdx+200);
assert(retSnippet.includes('saveUndo()'),'saveUndo in retCard');

const moveIdx=src.indexOf('function moveCard');
const moveSnippet=src.substring(moveIdx,moveIdx+200);
assert(moveSnippet.includes('saveUndo()'),'saveUndo in moveCard');

// Check undoState cleared in endTurn
const etIdx=src.indexOf('function endTurn');
const etSnippet=src.substring(etIdx,etIdx+500);
assert(etSnippet.includes('undoState=null'),'undoState cleared in endTurn');

// Check undoState cleared in resRound
const rrIdx=src.indexOf('function resRound');
const rrSnippet=src.substring(rrIdx,rrIdx+200);
assert(rrSnippet.includes('undoState=null'),'undoState cleared in resRound');

// Check shouldAutoPass in endTurn
assert(etSnippet.includes('shouldAutoPass'),'shouldAutoPass check in endTurn');

// Check fatigue classes in rCard
const rcIdx=src.indexOf('function rCard');
const rcSnippet=src.substring(rcIdx,rcIdx+1200);
assert(rcSnippet.includes('fatigue-1'),'fatigue-1 class in rCard');
assert(rcSnippet.includes('fatigue-2'),'fatigue-2 class in rCard');
assert(rcSnippet.includes('fatigue-3'),'fatigue-3 class in rCard');
assert(rcSnippet.includes('shardwall-protected'),'shardwall-protected class in rCard');

console.log(`\n=== Results: ${pass} passed, ${fail} failed ===\n`);
process.exit(fail>0?1:0);

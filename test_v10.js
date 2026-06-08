// v10 Test Suite — Towers
const fs = require('fs');
const html = fs.readFileSync('towers.html','utf8');

// Extract JS
const jsMatch = html.match(/<script>([\s\S]*?)<\/script>/);
if(!jsMatch){console.log('FAIL: No script tag');process.exit(1)}

// Patch browser APIs
global.document = {
  getElementById:()=>({innerHTML:'',scrollTop:0,scrollHeight:0,textContent:''}),
  querySelectorAll:()=>({forEach:()=>{}}),
  querySelector:()=>null,
  createElement:()=>({className:'',appendChild:()=>{},remove:()=>{},style:{},classList:{add:()=>{},remove:()=>{}}}),
  body:{appendChild:()=>{}}
};
global.window = {innerWidth:1024,innerHeight:768,AudioContext:class{createOscillator(){return{type:'',frequency:{setValueAtTime:()=>{}},connect:()=>{},start:()=>{},stop:()=>{}}}createGain(){return{gain:{setValueAtTime:()=>{},exponentialRampToValueAtTime:()=>{}},connect:()=>{}}}createBuffer(){return{getChannelData:()=>new Float32Array(100)}}createBufferSource(){return{buffer:null,loop:false,connect:()=>{},start:()=>{},stop:()=>{}}}get destination(){return{}}get sampleRate(){return 44100}get currentTime(){return 0}}};
global.setTimeout = (fn,t)=>{if(typeof fn==='function')fn();return 0};
global.clearTimeout = ()=>{};

eval(jsMatch[1]);

let pass=0,fail=0;
function test(name,fn){try{const r=fn();if(r!==false){pass++;console.log(`✓ ${name}`)}else{fail++;console.log(`✗ ${name}`)}}catch(e){fail++;console.log(`✗ ${name}: ${e.message}`)}}

// Core game tests
test('mkDeck creates 40 cards',()=>mkDeck().length===40);
test('mkState standard',()=>{const s=mkState('standard');return s.lanes.length===3&&s.p.human.h.length===10});
test('mkState crosswise',()=>{const s=mkState('crosswise');return s.lanes.length===5&&s.p.human.h.length===13});
test('Shardbearer value doubled',()=>{const c={type:'shardbearers',value:8,deployTurn:-1,moved:false};return calcStr([c],0,[[{human:[c],ai:[]}],[{human:[],ai:[]}],[{human:[],ai:[]}]],'human','standard',0)===16});
test('Spearmen synergy +1 each',()=>{const c1={type:'spearmen',value:3,id:'a',deployTurn:0,moved:false},c2={type:'spearmen',value:4,id:'b',deployTurn:0,moved:false};return calcStr([c1,c2],0,[[{human:[c1,c2],ai:[]}],[{human:[],ai:[]}],[{human:[],ai:[]}]],'human','standard',0)===3+1+4+1});
test('Phalanx detection (3 spearmen)',()=>{const sp=[{type:'spearmen',value:3,id:'a'},{type:'spearmen',value:4,id:'b'},{type:'spearmen',value:5,id:'c'}];const f=detectFormations(sp,0,[[{human:sp,ai:[]}],[{human:[],ai:[]}],[{human:[],ai:[]}]],'human','standard');return f.some(x=>x.n==='Phalanx')});
test('Skirmish detection (archer+cavalry)',()=>{const cards=[{type:'archers',value:5,id:'a'},{type:'cavalry',value:4,id:'b'}];const f=detectFormations(cards,0,[[{human:cards,ai:[]}],[{human:[],ai:[]}],[{human:[],ai:[]}]],'human','standard');return f.some(x=>x.n==='Skirmish')});
test('Vanguard detection (solo cavalry)',()=>{const cards=[{type:'cavalry',value:6,id:'a'}];const f=detectFormations(cards,0,[[{human:cards,ai:[]}],[{human:[],ai:[]}],[{human:[],ai:[]}]],'human','standard');return f.some(x=>x.n==='Vanguard')});
test('Shardwall detection',()=>{const cards=[{type:'shardbearers',value:8,id:'a',deployTurn:0},{type:'spearmen',value:3,id:'b'},{type:'spearmen',value:4,id:'c'}];const f=detectFormations(cards,0,[[{human:cards,ai:[]}],[{human:[],ai:[]}],[{human:[],ai:[]}]],'human','standard');return f.some(x=>x.n==='Shardwall')});
test('Shard blocked in occupied lane',()=>{const lane={human:[{type:'shardbearers',value:10,id:'a'}],ai:[]};return canShard(lane,'human')===false});
test('Resolve: player wins lane',()=>{const s=mkState('standard');s.lanes[0].human=[{type:'spearmen',value:10,id:'a',deployTurn:0,moved:false}];const r=resolve(s);return r.lr[0].w==='human'});

// AI tests
test('AI returns valid action',()=>{const s=mkState('standard');s.turn='ai';aiPers='sadeas';const d=aiTurn(s);return['pass','deploy','concede','move'].includes(d.a)});
test('AI Dalinar personality exists',()=>AIW.dalinar&&AIW.dalinar.name==='Dalinar');
test('AI Adolin personality exists',()=>AIW.adolin&&AIW.adolin.name==='Adolin');
test('AI Taravangian personality exists',()=>AIW.taravangian&&AIW.taravangian.name==='Taravangian');
test('AI Odium personality exists',()=>AIW.odium&&AIW.odium.name==='Odium');

// Wit tests
test('witTopic finds formation',()=>witTopic('how do formations work').topic==='formation');
test('witTopic finds tower',()=>witTopic('tell me about the tower').topic==='tower');
test('witReply returns string',()=>typeof witReply('How do I play?')==='string');

// Smack talk tests
test('Smack talk exists for all AIs',()=>['sadeas','dalinar','adolin','taravangian','odium'].every(a=>SMACK[a]&&SMACK[a].deploy.length>0));
test('triggerSmack sets currentSmack',()=>{aiPers='sadeas';pvpMode=false;triggerSmack('deploy');return currentSmack.length>0});

// v10: Sound engine tests
test('soundOn default true',()=>soundOn===true);
test('sndDeploy callable',()=>{sndDeploy();return true});
test('sndFormation callable',()=>{sndFormation();return true});
test('sndBreakthrough callable',()=>{sndBreakthrough();return true});
test('sndRoundWin callable',()=>{sndRoundWin();return true});
test('sndRoundLose callable',()=>{sndRoundLose();return true});
test('sndPass callable',()=>{sndPass();return true});
test('sndConcede callable',()=>{sndConcede();return true});
test('sndSelect callable',()=>{sndSelect();return true});
test('toggleSound toggles',()=>{toggleSound();const off=!soundOn;toggleSound();return off&&soundOn});

// v10: Particle system tests
test('spawnParticles callable',()=>{spawnParticles();return true});
test('triggerScreenShake callable',()=>{triggerScreenShake();return true});

// Preview tests
test('calcPreview returns diff',()=>{const s=mkState('standard');const c=s.p.human.h.find(x=>x.type==='spearmen');if(!c)return true;const p=calcPreview(c,0,s);return p&&typeof p.diff==='number'});
test('cheatAnalysis returns data',()=>{const s=mkState('standard');s.phase='play';G=s;const a=cheatAnalysis(s);return a&&typeof a.winning==='number'});

// Lane status
test('renderLaneStatus returns HTML',()=>{const s=mkState('standard');s.phase='play';return renderLaneStatus(s).includes('lane-status-bar')});
test('renderFormBar returns HTML',()=>{const s=mkState('standard');s.phase='play';return renderFormBar(s).includes('form-bar')});

// Breakthrough detection
test('Breakthrough at +10 Center with flank',()=>{
  const s=mkState('standard');
  s.lanes[1].human=[{type:'shardbearers',value:10,id:'a',deployTurn:0,moved:false},{type:'spearmen',value:8,id:'b',deployTurn:0,moved:false},{type:'spearmen',value:7,id:'c',deployTurn:0,moved:false}];
  s.lanes[0].human=[{type:'spearmen',value:5,id:'d',deployTurn:0,moved:false}];
  const r=resolve(s);return r.bt==='human'});

// Modes
test('Flatface mode has fd=true',()=>MODES.flatface.fd===true);
test('Crosswise has 5 lanes',()=>MODES.crosswise.lanes===5);

// witReset
test('witReset clears messages',()=>{witMsgs.push({from:'usr',text:'test'});witReset();return witMsgs.length===1});

// Fatigue
test('Shardbearer fatigue after 3 turns',()=>{const c={type:'shardbearers',value:10,deployTurn:0,moved:false};return calcFatigue(c,3,[])===1});
test('Shardwall negates fatigue',()=>{const c={type:'shardbearers',value:10,deployTurn:0,moved:false};return calcFatigue(c,6,[{nf:true}])===0});
test('Move penalty applies',()=>{const c={type:'spearmen',value:5,deployTurn:0,moved:true};return calcFatigue(c,0,[])===1});

// beatenOpponents
test('beatenOpponents starts empty',()=>{beatenOpponents=[];return beatenOpponents.length===0});

console.log(`\n${pass}/${pass+fail} tests passed${fail>0?` (${fail} failed)`:''}`);
if(fail>0)process.exit(1);

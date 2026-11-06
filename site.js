(() => {
'use strict';
const $=s=>document.querySelector(s),$$=s=>[...document.querySelectorAll(s)],reduce=matchMedia('(prefers-reduced-motion:reduce)').matches;
const INST=[['gayageum','가야금','Gayageum','strings'],['haegeum','해금','Haegeum','strings'],['daegeum','대금','Daegeum','winds'],['janggu','장구','Janggu','percussion'],['geomungo','거문고','Geomungo','strings'],['ajaeng','아쟁','Ajaeng','strings'],['piri','피리','Piri','winds'],['yanggeum','양금','Yanggeum','strings'],['buk','북','Buk','percussion'],['danso','단소','Danso','winds'],['sogeum','소금','Sogeum','winds'],['taepyeongso','태평소','Taepyeongso','winds'],['kkwaenggwari','꽹과리','Kkwaenggwari','percussion'],['jing','징','Jing','percussion'],['pyeonjong','편종','Pyeonjong','percussion'],['pyeongyeong','편경','Pyeongyeong','percussion'],['gayageum25','25현 가야금','25-string Gayageum','strings']];
const EN={sectionPlay:'Try drawing',sectionSounds:'Listen to the instruments',sectionShare:'Share a video',sectionDetails:'Inside the app',sectionPlans:'Free and Pro',sectionFaq:'Questions',navPlay:'Play a little',navSounds:'17 sounds',navShare:'Make & share',navGet:'Meet the app <span>↗</span>',eyebrow:'A playful way into Korean music',hero1:'What does your',hero2:'doodle sound like?',heroBody:'From gayageum strings to janggu beats.<br>Hear your drawing played by Korean instruments.',heroCta:'Make a little noise',heroSecondary:'See the real app ↗',heroNote:'No sheet music. Your doodles will do.',tapSound:'Tap for a little sound',gaya:'Gayageum',realShot:'Actual app screen',playEyebrow:'Try it here. No installation needed.',playTitle:'Draw a line.<br>Hear it play.',playBody:'Higher lines, higher notes. Longer lines, longer sounds.<br>Switch instruments. Add another line. See what happens.',clear:'Start fresh',drawHint:'A little line, right here.',drawHint2:'Draw with your finger or mouse',high:'HIGH',low:'LOW',listenDrawing:'Play my doodle',demoReady:'Sound starts when you tap or draw',miniDemo:'A SMALL WEB DEMO',demoDisclaimer:'A small browser experience using the official site’s real instrument clips. It doesn’t include the full app.',soundsTitle:'Wait, what<br>instrument is that?',soundsBody:'The bright pluck of a gayageum. The long breath of a daegeum.<br>Tap a picture. Meet a new sound.',all:'All sounds',strings:'Pluck & bow',winds:'Take a breath',percussion:'Make a beat',soundCredit:'App instrument recordings: National Gugak Center, Digital Gugak Instrument Sounds · KOGL Type 1',shareTitle:'You drew it.<br><em>Sound and all.</em>',shareBody:'Find a loop you like? Turn its performance into a video. A little something for your next Reel or Short.',vertical:'Vertical',square:'Square',shareNote:'Export video, audio, or a project file in the app.',seeExport:'See the real export screen ↗',shareCard:'Today’s doodle.<br>Today’s soundtrack.',shareIllustration:'Sharing concept preview',detailsTitle:'A rough little line.<br>A little more you.',actualZoom:'Actual app screen · tap to enlarge ↗',refineTitle:'Give it a little polish',refineBody:'AI refinement helps your rough lines follow the flow of Korean melodies.',galleryTitle:'Come back for another listen',galleryBody:'Keep your pieces and discover example songs in the gallery.',exportTitle:'Like it? Pass it on.',exportBody:'Keep the moment as a video, audio, or a project file.',planTitle:'Start with four.<br>See where they take you.',planBody:'Gayageum, haegeum, daegeum and janggu are free to start.<br>Open Pro when you’re curious for more.',oneTime:'No ads. Pro is one purchase, not a subscription.',whatInside:'WHAT’S INSIDE',free:'Free',instrumentsLabel:'Instruments',fourInst:'4',seventeenInst:'17',scaleLabel:'Scales',twoScales:'Pyeongjo & Gyemyeonjo',fourScales:'4 scales',lengthLabel:'Loop length',twoBars:'Up to 2 bars',eightBars:'Up to 8 bars',aiLabel:'AI refinement',dailyThree:'3 per day',unlimited:'Unlimited',advancedLabel:'Note editing, humming & MIDI import',watermarkLabel:'Butgarak video watermark',withMark:'Included',noMark:'Removed',exampleFree:'Example songs play in full, even on the free plan.',faqTitle:'A few good questions.',q1:'Do I need to read music?',a1:'No. The default pyeongjo scale uses notes that work together. Draw a line, change its height, and listen.',q2:'Can I use it offline?',a2:'Drawing, playback and export work on your device. Pro purchases and restores need a connection to your app store.',q3:'Which devices does it support?',a3:'iPhone, iPad, and Android phones and tablets. Pro purchases apply separately in each store.',q4:'Where do the sounds come from?',a4:'The app uses real instrument recordings from the National Gugak Center. This page uses instrument clips from the official Butgarak site.',closeTitle:'<span>A Korean melody.</span> <span>Made by you.</span>',closeBody:'Butgarak is preparing for iOS and Android release.<br>Until then, get to know the sounds right here.',closeCta:'Play a little more ↗',release:'Check the official site for release news ↗',privacy:'Privacy',contact:'Get in touch',stopSounds:'Stop all sounds',credit:'Instrument recordings: National Gugak Center, Digital Gugak Instrument Sounds · KOGL Type 1. Actual app captures and audio supplied through the official site.',screenCaption:'An actual app capture. Red numbers are explanatory annotations in the source material.'};
Object.assign(EN,{"navPlay":"Try playing","navGet":"Release updates <span>↗</span>","eyebrow":"Draw to play Korean instruments","heroBody":"Draw a line. Hear it played by gayageum, haegeum, daegeum or janggu.<br>You don’t need to read music to try.","heroCta":"Draw it. Hear it.","heroSecondary":"Explore the app screen ↗","heroNote":"Try it on this page. No installation needed.","realShot":"App redesign concept","previewDraw":"Draw a melody","previewEnsemble":"Play together","samplePrompt":"Start with a sound.","playEyebrow":"Audio starts when you tap an instrument or draw.","playTitle":"Now it’s<br>your turn.","playBody":"Pick an instrument and draw in the space below.<br>Want to hear an example first? Try the sample.","chooseInst":"Pick your instrument","stepDraw":"Draw a line","stepListen":"Play it back","stepMore":"Add a sound","tryExample":"Hear an example first <span>▷</span>","drawHint":"Any line will do.","drawHint2":"Draw here with your finger or mouse","listenDrawing":"Play my lines","demoReady":"Choose an instrument, then draw a line.","demoDisclaimer":"A web demo using instrument clips from the official site. Playback may differ from the app.","afterPlayTitle":"What if you could share that?","afterPlayBody":"The app can save your drawing and its performance as a video.","afterPlayCta":"See the video preview ↓","soundsTitle":"Same line.<br>A different instrument.","soundsBody":"Plucked strings, bowed strings, breath and beats.<br>Tap any of the 17 instruments to find your sound.","shareTitle":"I drew this.<br><em>You can hear it.</em>","shareBody":"Save the drawing and its performance as a video. Choose a vertical frame for your next Reel or Short.","detailsTitle":"Made something<br>you want to hear again?","refineTitle":"Adjust a note","refineBody":"Change the pitch or length of a note until it feels right.","galleryTitle":"Keep your piece","galleryBody":"Open a saved project and carry on where you left off.","exportTitle":"Share the performance","exportBody":"Export video, audio or a project file from the app.","actualZoom":"App redesign concept · tap to enlarge ↗","seeExport":"See the export concept ↗","screenCaption":"An app redesign concept. The released app may look different.","planTitle":"Four instruments to start.<br>More to explore with Pro.","planBody":"Start free with gayageum, haegeum, daegeum and janggu.<br>Pro adds 17 instruments and longer pieces.","faqTitle":"Before you start.","closeCta":"Play again ↑","release":"Check release updates ↗","credit":"Instrument recordings: National Gugak Center, Digital Gugak Instrument Sounds · KOGL Type 1. App images show our redesign concept. Audio clips are from the official site."});
Object.assign(EN,{"shareTitle":"I drew this.<br><em>Sound and all.</em>","shareBody":"A tune from your fingertips. A scholar dancing inside a painting.<br>Give a video its own sound and share it.","filmSound":"Watch with sound","filmMute":"Mute","filmPause":"Pause","filmPlay":"Play","filmLabel":"Butgarak brand film · illustrative scene","ratioSummary":"Which format fits your performance?","shareIllustration":"Export format preview"});
Object.assign(EN,{"playTitle":"Now it’s your turn.","soundsTitle":"Same line. A different instrument.","shareTitle":"I drew this. Sound and all.","detailsTitle":"Made something you want to hear again?","planTitle":"Four instruments to start. More to explore with Pro."});
Object.assign(EN,{shareBody:'Add your music to a video and share it.'});
Object.assign(EN,{navGet:'Download the app <span>↗</span>',closeBody:'Start free with gayageum, haegeum, daegeum and janggu.'});
Object.assign(EN,{storePending:'Preparing for release on iOS and Android'});
Object.assign(EN,{actualZoom:'Tap to enlarge ↗',credit:'Instrument recordings: National Gugak Center, Digital Gugak Instrument Sounds · KOGL Type 1.'});
Object.assign(EN, {
  navSounds:'Guess the sound', navShare:'Bring a painting to life',
  afterPlayTitle:'Play it for the painting.', afterPlayBody:'Hear your lines again and watch the scholar move with them.', afterPlayCta:'Play my tune for him ↓',
  refineTitle:'Shape your melody', refineBody:'Select a line and listen to the refined version before applying it.',
  sectionShare:'Music in the picture', shareTitle:'Even he can’t sit still.', shareBody:'Your tune, his next move. Play what you drew and watch the painting respond.',
  paintingPlay:'Try it with a sample', paintingHint:'Draw a tune above, or start with this sample.',
  liveMode:'Play with the painting', filmMode:'Watch the 12-second film',
  paintingNote:'An interactive scene for this website. The app exports your drawing and its performance.',
  paintingNext:'Make more in the app', paintingAgain:'Back to my drawing ↑', paintingSlow:'Easy', paintingFast:'Lively', paintingTempo:'The mood',
  soundsTitle:'Which instrument can you hear?', soundsBody:'Listen first, then choose a picture. Get to know Korean instruments one sound at a time.'
});
Object.assign(EN,{paintingGaya:'Gayageum',paintingHae:'Haegeum',paintingJang:'Janggu',paintingClear:'Clear lines',paintingDraw:'Draw a line up. Watch him follow.',paintingDrawSub:'Draw here with your finger or mouse.',paintingTip:'Draw high, he rises. Draw low, he bows.',shareBody:'Draw up and his shoulders rise. Draw down and he bows.<br>Bring the scholar to life with your fingertips.',navSounds:'Find your sound'});
Object.assign(EN,{soundsTitle:'What would you like to hear next?',soundsBody:'Plucked strings, bowed strings, breath and beats.<br>Explore all 17 instruments.'});
Object.assign(EN,{paintingDae:'Daegeum'});
Object.assign(EN,{heroBody:'Get to know Korean music through drawing and play.<br>Try gayageum strings and janggu beats. No sheet music needed.',purposeEyebrow:'Why we made Butgarak',purposeTitle:'<span>A first encounter with Korean music.</span><span>A good memory from the start.</span>',purposeBody:'We wanted children to have an easy way into Korean music, at school and at home. A chance to pick an instrument, make a sound, and get to know music that once felt unfamiliar.',purposeCta:'Meet an instrument by its sound ↓'});
Object.assign(EN,{navShare:'Music for everyone',sectionPlay:'Play with sound',playTitle:'Even he can’t sit still.',playBody:'Draw a line. Hear it play.<br>Watch the scholar follow your fingertips.',playEyebrow:'Touch to turn on sound.',liveMode:'Play it yourself',filmMode:'Watch the 12-second film',chooseInst:'Choose an instrument',drawHint:'Try drawing a line up.',drawHint2:'Draw high, he rises. Draw low, he bows.',listenDrawing:'Play my tune again',tryExample:'Start with an example <span>▷</span>',afterPlayTitle:'Which sound will you like next?',afterPlayBody:'No need to know its name. Let your ears choose.',afterPlayCta:'Find my sound ↓',paintingNote:'The dancing scholar is a sound experience on this website. In the app, play your drawings and save their performance as a video.',togetherEyebrow:'A first encounter with Korean music',togetherTitle:'<span>A new sound today.</span><span>A favourite tomorrow.</span>',togetherBody:'We wanted children to meet Korean music through play.<br>Making their own sounds. Sharing a tune with someone.',voiceListen:'What’s that sound?',voiceDraw:'Let me try.',voiceTogether:'Again!',togetherFoot:'With friends at school. With family at home. Get to know Korean music together.',togetherCta:'What’s my kind of sound? ↓'});
Object.assign(EN,{sectionPlay:'A sound playground, only on this website',playBody:'In Butgarak, drawing makes Korean music.<br>On this page, we’ve added a dancer to your tune.',stageLabel:'A stage made for this website',paintingNote:'The dancing scholar is a website-only creation, not an app feature. The app plays your drawings and can save their performance screen as a video.'});
Object.assign(EN,{playTitle:'Your tune. His dance.',playBody:'In Butgarak, drawing makes Korean music.<br> Here, we’ve added a dancer to your tune.',stageLabel:'An imagined scene · web experience'});
Object.assign(EN,{devicesNote:'On your phone. On your tablet.'});
const KO={}; $$('[data-i18n]').forEach(e=>KO[e.dataset.i18n]=e.innerHTML);
let lang; try{lang=localStorage.getItem('butgarak-landing-lang')}catch{}
if(!['ko','en'].includes(lang))lang=navigator.language.toLowerCase().startsWith('ko')?'ko':'en';
let active='gayageum',family='all',context,buffers=new Map(),loading=new Map(),voices=new Set(),session=0,owner='',toastTimer;
let paths=[],drawing=null,playback=null,raf=0,scheduler=0,completed=false,hits=[],lastAudition=0;
const emit=(name,detail)=>window.dispatchEvent(new CustomEvent('butgarak:'+name,{detail}));
const tr=(ko,en)=>lang==='ko'?ko:en;
const label=id=>INST.find(i=>i[0]===id)?.[lang==='ko'?1:2]||id;
const colors={gayageum:'#9e6653',haegeum:'#687b97',daegeum:'#5a8077',janggu:'#383f42'};
const canvas=$('#draw-canvas'),g=canvas.getContext('2d'); let W=1,H=1;
const film=$('#brand-film');
function toast(ko,en){clearTimeout(toastTimer);$('#audio-toast').textContent=tr(ko,en);$('#audio-toast').hidden=false;toastTimer=setTimeout(()=>$('#audio-toast').hidden=true,3000)}
const instrumentFacts={gayageum:['가야금 · 뜯는 소리','손가락으로 줄을 뜯는 악기예요. 여기서는 선을 그어 연주해보세요.','Gayageum · plucked strings','Usually played by plucking the strings. Here, try drawing a line.'],haegeum:['해금 · 켜는 소리','두 줄 사이로 활을 켜서 소리를 내요. 선을 길게 이어 그려볼까요?','Haegeum · bowed strings','A bow moves between two strings. Try drawing a long line.'],daegeum:['대금 · 부는 소리','대나무 관에 숨을 불어 넣어 연주해요. 선을 높였다 낮췄다 해보세요.','Daegeum · bamboo flute','Played by blowing across a bamboo flute. Try a line that rises and falls.'],janggu:['장구 · 두드리는 소리','양쪽 가죽을 두드려 장단을 만들어요. 톡톡, 점을 찍어 연주해보세요.','Janggu · drum beats','Two drumheads make the rhythm. Try tapping dots on the canvas.']};
function explainInstrument(){const f=instrumentFacts[active],offset=lang==='ko'?0:2;$('#learning-instrument-name').textContent=f[offset];$('#learning-instrument-fact').textContent=f[offset+1]}
function instruments(){
  $('#demo-instruments').innerHTML=INST.slice(0,4).map(t=>`<button data-demo-inst="${t[0]}" aria-pressed="${active===t[0]}"><img src="assets/icons/${t[0]}.svg" alt=""><span>${label(t[0])}</span></button>`).join('');
  $('#instrument-deck').innerHTML=INST.filter(t=>family==='all'||t[3]===family).map(t=>`<button class="instrument-tile" data-sound="${t[0]}" aria-label="${label(t[0])} ${tr('소리 듣기','preview')}"><span class="tile-num">${String(INST.indexOf(t)+1).padStart(2,'0')}</span><img src="assets/icons/${t[0]}.svg" alt="" loading="lazy"><strong>${label(t[0])}</strong><span class="tile-wave" aria-hidden="true">〰</span></button>`).join('');
}
function translate(){
  document.documentElement.lang=lang; $$('[data-i18n]').forEach(e=>e.innerHTML=(lang==='ko'?KO:EN)[e.dataset.i18n]||KO[e.dataset.i18n]);
  $('#language').innerHTML=tr('EN <span>↗</span>','한국어 <span>↗</span>');$('#language').setAttribute('aria-label',tr('Switch to English','한국어로 전환'));
  document.title=tr('붓가락 — 내 그림은 어떤 소리가 날까?','Butgarak — What does your doodle sound like?');
  instruments(); $$('[data-hero-inst]').forEach(b=>{b.querySelector('span').textContent=label(b.dataset.heroInst);b.setAttribute('aria-label',label(b.dataset.heroInst)+' '+tr('소리 듣기','preview'))});
  updateExperience(); explainInstrument(); updateFilmButtons(); try{localStorage.setItem('butgarak-landing-lang',lang)}catch{}
  emit('language',{lang});
}
$('#language').addEventListener('click',()=>{lang=lang==='ko'?'en':'ko';translate()});
async function unlock(){if(!context)context=new(window.AudioContext||window.webkitAudioContext)({latencyHint:'interactive'});if(context.state==='suspended')await context.resume();return context}
async function load(id){
  if(buffers.has(id))return buffers.get(id); if(loading.has(id))return loading.get(id);
  const p=(async()=>{
    let bytes;
    const embedded=window.butgarakLocalMedia?.sounds?.[id];
    if(embedded){
      const binary=atob(embedded),data=new Uint8Array(binary.length);
      for(let i=0;i<binary.length;i++)data[i]=binary.charCodeAt(i);
      bytes=data.buffer;
    }else{
      const r=await fetch('assets/sounds/'+id+'.m4a');
      if(!r.ok)throw Error('audio');
      bytes=await r.arrayBuffer();
    }
    const b=await context.decodeAudioData(bytes);buffers.set(id,b);return b;
  })();
  loading.set(id,p);try{return await p}finally{loading.delete(id)}
}
function stopVoices(){for(const v of voices){try{v.gain.gain.cancelScheduledValues(context.currentTime);v.gain.gain.setTargetAtTime(.0001,context.currentTime,.01);v.source.stop(context.currentTime+.04)}catch{}} voices.clear();$$('.playing').forEach(e=>e.classList.remove('playing'))}
function stop(silent=false){
  session++; owner=''; clearInterval(scheduler);cancelAnimationFrame(raf);stopVoices();
  if(film){film.pause();film.muted=true;updateFilmButtons()}
  const had=playback; playback=null; hits=[]; paint();updateExperience();
  if(had)emit('playback',{playing:false,source:had.source});
  if(!silent)emit('audio',{source:'stop'});
}
function claim(source){stop(true);owner=source;emit('audio',{source});return session}
function sound(id,ratio,duration,volume,when){
  if(!context||!buffers.has(id))return 0;
  const b=buffers.get(id),source=context.createBufferSource(),gain=context.createGain();source.buffer=b;source.playbackRate.value=Math.max(.45,Math.min(2.2,ratio));
  const start=when??context.currentTime+.008,end=start+Math.min(duration,b.duration/source.playbackRate.value);
  gain.gain.setValueAtTime(0,start);gain.gain.linearRampToValueAtTime(volume,start+.008);gain.gain.setTargetAtTime(.0001,Math.max(start+.01,end-.06),.02);
  source.connect(gain).connect(context.destination);const v={source,gain};voices.add(v);source.onended=()=>{voices.delete(v);source.disconnect();gain.disconnect()};source.start(start);source.stop(end+.04);return end-start;
}
async function audition(id,el,options={}){
  const token=claim(options.source||'discovery');await unlock();await load(id);if(token!==session)return 0;
  el?.classList.add('playing');const length=sound(id,1,2.3,.55);setTimeout(()=>el?.classList.remove('playing'),length*1000);return length;
}
async function preview(id,el){try{return await audition(id,el,{source:'preview'})}catch{toast('소리를 불러오지 못했어요. 한 번 더 눌러주세요.','Couldn’t load the sound. Please try again.');return 0}}
function choose(id){if(!INST.slice(0,4).some(i=>i[0]===id))return;active=id;instruments();explainInstrument();updateExperience();emit('instrument',{id})}
$$('[data-hero-inst]').forEach(b=>b.addEventListener('click',async()=>{const id=b.dataset.heroInst;$('#sample-status').textContent=label(id)+tr(' 소리 듣는 중',' playing');await preview(id,b);setTimeout(()=>$('#sample-status').textContent='',2600)}));
$('#instrument-deck').addEventListener('click',e=>{const b=e.target.closest('[data-sound]');if(b)preview(b.dataset.sound,b)});
$$('[data-family]').forEach(b=>b.addEventListener('click',()=>{family=b.dataset.family;$$('[data-family]').forEach(t=>t.setAttribute('aria-pressed',String(t===b)));instruments()}));
$('#demo-instruments').addEventListener('click',e=>{const b=e.target.closest('[data-demo-inst]');if(!b)return;choose(b.dataset.demoInst);preview(active,$('#demo-instruments [data-demo-inst='+active+']'))});
function updateExperience(){
  const has=paths.length>0,step=completed?3:has?2:1;
  $$('[data-step]').forEach(e=>{e.classList.toggle('current',+e.dataset.step===step);e.classList.toggle('done',+e.dataset.step<step)});
  $('#try-example').hidden=has;$('#experience-next').hidden=!(completed&&!playback);
  $('#draw-count').textContent=has?tr(paths.length+'개의 선 · '+new Set(paths.map(p=>p.id)).size+'개 악기',paths.length+' lines · '+new Set(paths.map(p=>p.id)).size+' instruments'):'';
  $('#demo-play').classList.toggle('ready',has&&!playback);$('#demo-play').setAttribute('aria-pressed',String(!!playback));
  $('#demo-play').firstElementChild.textContent=playback?'Ⅱ':'▷';$('#demo-play').lastElementChild.textContent=playback?tr('잠깐 멈추기','Pause'):(lang==='ko'?KO:EN).listenDrawing;
  if(!playback)$('#demo-status').textContent=completed?tr('악기를 바꾸고 한 줄 더 그려볼까요?','Try another instrument and add a line.'):has?tr('이제 그린 선을 들어보세요.','Now play your lines.'):(lang==='ko'?KO:EN).demoReady;
  $('#draw-hint').hidden=has||!!playback;
}
function pitch(y){return [.5,.5625,.6667,.75,.84375,1,1.125,1.3333,1.5,1.6875,2][Math.round((1-y)*10)]}
function paint(){
  g.clearRect(0,0,W,H);
  for(const p of (playback?.lines||paths)){if(!p.points.length)continue;g.strokeStyle=colors[p.id];g.fillStyle=colors[p.id];g.lineWidth=4;g.lineCap='round';g.lineJoin='round';g.globalAlpha=.88;g.beginPath();p.points.forEach((n,i)=>i?g.lineTo(n.x*W,n.y*H):g.moveTo(n.x*W,n.y*H));g.stroke();if(p.points.length===1){const n=p.points[0];g.beginPath();g.arc(n.x*W,n.y*H,3,0,Math.PI*2);g.fill()}}
  g.globalAlpha=1;
  if(playback){const u=Math.max(0,Math.min(1,(context.currentTime-playback.start)/playback.duration));
    g.fillStyle='#4760b514';g.fillRect(Math.max(0,u*W-35),0,35,H);g.strokeStyle='#5269aa';g.lineWidth=1.5;g.beginPath();g.moveTo(u*W,0);g.lineTo(u*W,H);g.stroke();
    for(const hit of hits){const age=(context.currentTime-hit.at)/.52;if(age<0||age>1)continue;g.fillStyle=colors[hit.id];g.globalAlpha=(1-age)*.3;g.beginPath();g.ellipse(hit.x*W,hit.y*H,reduce?7:7+age*23,reduce?7:5+age*13,age,0,Math.PI*2);g.fill();g.globalAlpha=1;g.beginPath();g.arc(hit.x*W,hit.y*H,5,0,Math.PI*2);g.fill()}
  }g.globalAlpha=1;
}
function resize(){W=canvas.clientWidth;H=canvas.clientHeight;const dpr=Math.min(devicePixelRatio||1,2);canvas.width=W*dpr;canvas.height=H*dpr;g.setTransform(dpr,0,0,dpr,0,0);paint()}
new ResizeObserver(resize).observe(canvas);
function point(e){const r=canvas.getBoundingClientRect();return{x:Math.max(.025,Math.min(.975,(e.clientX-r.left)/r.width)),y:Math.max(.03,Math.min(.97,(e.clientY-r.top)/r.height))}}
async function drawStart(q,source='drawing'){
  if(paths.length>=35){toast('지우고 새 가락을 그려보세요.','Clear the canvas to start another tune.');return false}
  const token=claim(source);drawing={id:active,points:[q],source};paths.push(drawing);completed=false;paint();updateExperience();emit('drawchange',{count:paths.length});emit('gesture',{...q,source,phase:'start',id:active});
  try{await unlock();await load(active);if(token!==session)return false;sound(active,active==='janggu'?(q.y<.5?1.2:.8):pitch(q.y),.22,.3);lastAudition=performance.now();emit('note',{...q,id:active,source})}catch{toast('악기를 눌러 소리를 켜보세요.','Tap an instrument to enable sound.')}
  return true;
}
function drawMove(q){
  if(!drawing)return;const last=drawing.points.at(-1);if(Math.hypot(q.x-last.x,q.y-last.y)<.003)return;
  if(drawing.points.length<1500)drawing.points.push(q);paint();emit('gesture',{...q,dx:q.x-last.x,dy:q.y-last.y,id:drawing.id,source:drawing.source,phase:'move'});
  if(performance.now()-lastAudition>130){lastAudition=performance.now();sound(drawing.id,drawing.id==='janggu'?(q.y<.5?1.2:.8):pitch(q.y),.2,.24);emit('note',{...q,id:drawing.id,source:drawing.source})}
}
function drawEnd(){const source=drawing?.source;drawing=null;updateExperience();emit('gesture',{phase:'end',source});emit('drawchange',{count:paths.length})}
let canvasPointer=null;
canvas.addEventListener('pointerdown',e=>{if(canvasPointer!==null)return;canvasPointer=e.pointerId;canvas.setPointerCapture(e.pointerId);drawStart(point(e))});
canvas.addEventListener('pointermove',e=>{if(canvasPointer===e.pointerId)drawMove(point(e))});
const end=e=>{if(canvasPointer!==e.pointerId)return;canvasPointer=null;drawEnd()};canvas.addEventListener('pointerup',end);canvas.addEventListener('pointercancel',end);
$('#clear-drawing').addEventListener('click',()=>{stop();paths=[];drawing=null;completed=false;hits=[];updateExperience();$('#demo-clock').textContent='0:00 / 0:06';$('.demo-progress i').style.width='0';paint();emit('drawchange',{count:0})});
function example(){return [{id:'gayageum',points:Array.from({length:120},(_,i)=>({x:.07+i/119*.84,y:.53-Math.sin(i/119*Math.PI*2)*.23}))},{id:'janggu',points:[.12,.32,.52,.72,.9].map(x=>({x,y:.84}))}]}
function makeNotes(lines,duration){
  const notes=[];
  for(let step=0;step<48;step++)for(const p of lines){const matches=p.points.filter(n=>Math.floor(n.x*48)===step);if(!matches.length)continue;const y=matches.reduce((sum,n)=>sum+n.y,0)/matches.length;notes.push({id:p.id,x:step/48,y,offset:step/48*duration})}
  return notes;
}
async function playDrawing({source='drawing',speed=1,sample=false}={}){
  if(playback){stop();return false}
  if(!paths.length&&!sample){toast('빈 곳에 한 줄 그려보세요.','Draw a line to begin.');canvas.focus();return false}
  const lines=paths.length?paths:example(),token=claim(source);await unlock();await Promise.all([...new Set(lines.map(p=>p.id))].map(load));if(token!==session)return false;
  const duration=6.4/speed;playback={source,start:context.currentTime+.06,duration,notes:makeNotes(lines,duration),scheduled:0,shown:0,lines,sample:paths.length===0};hits=[];
  const run=playback;
  const schedule=()=>{if(playback!==run)return;while(run.scheduled<run.notes.length&&run.start+run.notes[run.scheduled].offset<context.currentTime+.14){const n=run.notes[run.scheduled++];sound(n.id,n.id==='janggu'?(n.y<.5?1.2:.8):pitch(n.y),n.id==='janggu'?.18:.26,.24,Math.max(context.currentTime+.004,run.start+n.offset))}};
  schedule();scheduler=setInterval(schedule,25);updateExperience();emit('playback',{playing:true,source,duration,paths:lines,sample:run.sample});
  function frame(){
    if(playback!==run)return;const elapsed=context.currentTime-run.start,u=Math.max(0,Math.min(1,elapsed/duration));
    while(run.shown<run.notes.length&&run.notes[run.shown].offset<=elapsed){const n=run.notes[run.shown++];hits.push({...n,at:context.currentTime});emit('note',{...n,source})}
    hits=hits.filter(h=>context.currentTime-h.at<.6);paint();$('.demo-progress i').style.width=u*100+'%';$('#demo-clock').textContent='0:'+String(Math.floor(u*6)).padStart(2,'0')+' / 0:06';$('#demo-status').textContent=tr('그린 선을 따라 연주하고 있어요.','Playing along your lines.');emit('progress',{source,u});
    if(u>=1){const userTune=paths.length>0;stop();completed=userTune;updateExperience();$('.demo-progress i').style.width='100%';$('#demo-clock').textContent='0:06 / 0:06';emit('complete',{source});return}raf=requestAnimationFrame(frame);
  }raf=requestAnimationFrame(frame);return true;
}
$('#demo-play').addEventListener('click',()=>playDrawing().catch(()=>toast('소리를 준비하지 못했어요. 다시 눌러주세요.','Couldn’t prepare the sound. Try again.')));
$('#try-example').addEventListener('click',()=>playDrawing({sample:true}).catch(()=>toast('다시 눌러주세요.','Please try again.')));
$$('.mute-all').forEach(b=>b.addEventListener('click',()=>{stop();toast('모든 소리를 멈췄어요.','All sounds stopped.')}));
document.addEventListener('visibilitychange',()=>{if(document.hidden)stop()});
const sectionAudio=new IntersectionObserver(entries=>{for(const e of entries){if(!e.isIntersecting&&((e.target.id==='play'&&['drawing','film'].includes(owner))||(e.target.id==='sounds'&&owner==='discovery')))stop()}});sectionAudio.observe($('#play'));sectionAudio.observe($('#sounds'));
function updateFilmButtons(){if(!film)return;$('#film-sound').lastElementChild.textContent=film.muted?tr('소리 켜고 보기','Watch with sound'):tr('소리 끄기','Mute');$('#film-sound').setAttribute('aria-pressed',String(!film.muted));$('#film-pause').textContent=film.paused?tr('재생','Play'):tr('일시정지','Pause')}
$('#film-sound').addEventListener('click',()=>{if(film.muted){claim('film');film.muted=false;film.play().catch(()=>toast('재생을 다시 눌러주세요.','Press play again.'))}else film.muted=true;updateFilmButtons()});
$('#film-pause').addEventListener('click',()=>{if(film.paused){const muted=film.muted;claim('film');film.muted=muted;film.play().catch(()=>{})}else film.pause();updateFilmButtons()});
for(const ev of ['play','pause','volumechange'])film.addEventListener(ev,updateFilmButtons);
film.addEventListener('timeupdate',()=>$('.film-duration').textContent='0:'+String(Math.floor(film.currentTime)).padStart(2,'0')+' / 0:12');
$$('[data-preview]').forEach(b=>b.addEventListener('click',()=>{$$('[data-preview]').forEach(t=>t.setAttribute('aria-pressed',String(t===b)));const image=$('#hero-app-image');image.src='assets/implemented/'+b.dataset.preview+'.jpg';image.closest('[data-open]').dataset.open='implemented/'+b.dataset.preview+'.jpg';image.alt=tr('붓가락 실제 '+(b.dataset.preview==='draw'?'그리기':'합주')+' 화면','Butgarak '+b.dataset.preview+' screen')}));
const features={refine:['implemented/refine.jpg','AI 다듬기'],gallery:['implemented/gallery.jpg','내 가락'],export:['implemented/export.jpg','내보내기']};
$$('[data-feature]').forEach(b=>b.addEventListener('click',()=>{$$('[data-feature]').forEach(e=>{e.setAttribute('aria-selected',String(e===b));e.tabIndex=e===b?0:-1});const[src,title]=features[b.dataset.feature],holder=$('.actual-screen');holder.dataset.open=src;holder.querySelector('img').src='assets/'+src;holder.querySelector('img').alt=tr('붓가락 '+title+' 화면','Butgarak '+b.dataset.feature+' screen')}));
$('.feature-tabs').addEventListener('keydown',e=>{if(!['ArrowUp','ArrowDown','ArrowLeft','ArrowRight'].includes(e.key))return;e.preventDefault();const btns=$$('[data-feature]'),i=btns.indexOf(document.activeElement);const next=btns[(i+(['ArrowRight','ArrowDown'].includes(e.key)?1:2))%3];next.focus();next.click()});
$('#screen-dialog').addEventListener('click',e=>{if(e.target===$('#screen-dialog'))$('#screen-dialog').close()});$('.dialog-close').addEventListener('click',()=>$('#screen-dialog').close());
document.addEventListener('click',e=>{const b=e.target.closest('[data-open]');if(!b)return;$('#screen-dialog img').src='assets/'+b.dataset.open;$('#screen-dialog img').alt=tr('붓가락 실제 앱 화면','Butgarak app screen');$('#screen-dialog').showModal()});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.06});$$('.reveal').forEach(e=>observer.observe(e));
let scrollBusy=false;addEventListener('scroll',()=>{if(scrollBusy)return;scrollBusy=true;requestAnimationFrame(()=>{const max=document.documentElement.scrollHeight-innerHeight;$('.scroll-progress').style.width=(max>0?scrollY/max*100:0)+'%';scrollBusy=false})},{passive:true});
canvas.tabIndex=0;
window.butgarakLanding={audition,stop,choose,playDrawing,drawStart,drawMove,drawEnd,clear:()=>$('#clear-drawing').click(),getPaths:()=>paths.map(p=>({id:p.id,points:p.points.map(n=>({...n}))})),getState:()=>({lang,active,family,paths:paths.length,replay:!!playback,owner,voices:voices.size,buffers:buffers.size}),getPlayback:()=>playback?{source:playback.source,progress:Math.max(0,(context.currentTime-playback.start)/playback.duration),duration:playback.duration}:null};
translate();resize();
})();

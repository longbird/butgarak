(() => {
  'use strict';
  const api=window.butgarakLanding, $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
  const canvas=$('#living-painting');if(!api||!canvas)return;
  const ctx=canvas.getContext('2d',{alpha:false}),reduced=matchMedia('(prefers-reduced-motion:reduce)').matches;
  const status=$('#painting-status'),nowLabel=$('#painting-now'),frame=$('#painting-frame'),live=$('#painting-live');
  let mode='live',speed=1,playing=false,completed=false,ready=false,visible=false,progress=0,energy=0,phase=0,last=0,raf=0,lang=api.getState().lang,scene,dancer,puppet,loadPromise,activeId='',sparks=[];
  let targetLift=0,lift=0,targetTravel=0,travel=0,targetLean=0,lean=0,gesturing=false;
  const colors={gayageum:'#a66b4d',haegeum:'#6d7d9d',daegeum:'#588473',janggu:'#444039'};
  const names={gayageum:['가야금','Gayageum'],haegeum:['해금','Haegeum'],daegeum:['대금','Daegeum'],janggu:['장구','Janggu']};
  const tr=(ko,en)=>lang==='ko'?ko:en;
  const say=text=>{if(status&&status.textContent!==text)status.textContent=text};
  function copy(){
    const id=activeId||api.getState().active;
    if(nowLabel){const name=names[id]?.[lang==='ko'?0:1]||id;if(nowLabel.textContent!==name)nowLabel.textContent=name;nowLabel.style.color=colors[id]||''}
    if(playing)say(tr('내 가락에 맞춰 움직이는 중','Moving to your tune'));
    else if(gesturing)say(tr('손끝을 따라 움직여요.','Following your fingertips.'));
    else if(completed)say(tr('내가 만든 한바탕. 한 번 더 들어볼까요?','That was your tune. Play it again?'));
    else say(api.getState().paths>0?tr('그린 선을 다시 들으면 선비도 함께 움직여요.','Play your lines back and he’ll move along.'):tr('선을 그리면 소리와 함께 움직여요.','Draw a line. He’ll move with the sound.'));
  }
  function texture(image){
    const c=document.createElement('canvas');c.width=600;c.height=660;
    const gl=c.getContext('webgl',{alpha:true,premultipliedAlpha:true});if(!gl)return null;
    const shader=(type,source)=>{const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error('Shader compilation');return s};
    const vertex=`attribute vec2 uv;uniform float phase;uniform float energy;uniform float lift;varying vec2 v;
    void main(){vec2 p=uv;v=uv;float beat=sin(phase);float slow=sin(phase*.5);
      float top=1.-smoothstep(.55,.9,uv.y);float a=.065*slow*energy;
      vec2 pivot=vec2(.55,.65);vec2 d=p-pivot;vec2 bent=vec2(d.x*cos(a)-d.y*sin(a),d.x*sin(a)+d.y*cos(a))+pivot;p=mix(p,bent,top);
      float left=(1.-smoothstep(.27,.49,uv.x))*smoothstep(.27,.37,uv.y)*(1.-smoothstep(.63,.75,uv.y));
      float right=smoothstep(.59,.79,uv.x)*(1.-smoothstep(.44,.62,uv.y));
      p.x+=energy*(left*.018*sin(phase-.5)+right*.025*sin(phase+.7));p.y+=energy*(left*.038*sin(phase-.6)-right*.036*sin(phase+.35));
      p.y-=lift*(left*.08+right*.1);p.x+=lift*(left*-.02+right*.015);
      float head=1.-smoothstep(.22,.34,uv.y);float h=.035*sin(phase*.5+.6)*energy;
      vec2 q=p-vec2(.48,.28);vec2 hr=vec2(q.x*cos(h)-q.y*sin(h),q.x*sin(h)+q.y*cos(h))+vec2(.48,.28);p=mix(p,hr,head);
      float foot=smoothstep(.79,.93,uv.y);p.y-=foot*(1.-smoothstep(.38,.52,uv.x))*.032*max(0.,sin(phase+.5))*energy;p.x+=foot*.014*slow*energy;
      p.y-=energy*(.009+.012*beat)*(1.-smoothstep(.68,.98,uv.y));p.x+=.012*slow*energy;
      gl_Position=vec4(p.x*2.-1.,1.-p.y*2.,0.,1.);}`;
    const fragment='precision mediump float;varying vec2 v;uniform sampler2D tex;void main(){gl_FragColor=texture2D(tex,v);}';
    const program=gl.createProgram();gl.attachShader(program,shader(gl.VERTEX_SHADER,vertex));gl.attachShader(program,shader(gl.FRAGMENT_SHADER,fragment));gl.linkProgram(program);if(!gl.getProgramParameter(program,gl.LINK_STATUS))return null;gl.useProgram(program);
    const points=[];for(let y=0;y<48;y++)for(let x=0;x<48;x++){const x0=x/48,x1=(x+1)/48,y0=y/48,y1=(y+1)/48;points.push(x0,y0,x1,y0,x0,y1,x1,y0,x1,y1,x0,y1)}
    const buffer=gl.createBuffer();gl.bindBuffer(gl.ARRAY_BUFFER,buffer);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(points),gl.STATIC_DRAW);const uv=gl.getAttribLocation(program,'uv');gl.enableVertexAttribArray(uv);gl.vertexAttribPointer(uv,2,gl.FLOAT,false,0,0);
    gl.bindTexture(gl.TEXTURE_2D,gl.createTexture());gl.pixelStorei(gl.UNPACK_PREMULTIPLY_ALPHA_WEBGL,true);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.LINEAR);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);gl.texImage2D(gl.TEXTURE_2D,0,gl.RGBA,gl.RGBA,gl.UNSIGNED_BYTE,image);
    const ph=gl.getUniformLocation(program,'phase'),en=gl.getUniformLocation(program,'energy'),lf=gl.getUniformLocation(program,'lift');
    return {canvas:c,draw(p,e,l){gl.viewport(0,0,c.width,c.height);gl.clearColor(0,0,0,0);gl.clear(gl.COLOR_BUFFER_BIT);gl.uniform1f(ph,p);gl.uniform1f(en,e);gl.uniform1f(lf,l);gl.drawArrays(gl.TRIANGLES,0,points.length/2)}};
  }
  const getImage=async src=>{const im=new Image();im.src=src;await im.decode();return im};
  async function prepare(){
    if(loadPromise)return loadPromise;
    loadPromise=(async()=>{[scene,dancer]=await Promise.all([getImage('assets/illustrated-room.png'),getImage(window.butgarakLocalMedia?.dancer||'assets/painting-dancer.png')]);
      try{puppet=texture(dancer)}catch{puppet=null}
      ready=true;$('#painting-poster').hidden=true;canvas.hidden=false;resize();copy();
    })().catch(()=>{loadPromise=null;say(tr('그림을 불러오지 못했어요. 페이지를 새로고침해 주세요.','Couldn’t load the painting. Please refresh the page.'));throw Error('painting load')});
    return loadPromise;
  }
  function render(){
    if(!ready)return;
    // One illustrated room: the modern player is in front; the scholar dances behind.
    const scale=Math.max(canvas.width/1536,canvas.height/1024);
    ctx.fillStyle='#e5c79d';ctx.fillRect(0,0,canvas.width,canvas.height);ctx.save();
    ctx.translate((canvas.width-1536*scale)/2,(canvas.height-1024*scale)/2);ctx.scale(scale,scale);ctx.drawImage(scene,0,0,1536,1024);
    ctx.fillStyle='#3e2b201a';ctx.beginPath();ctx.ellipse(530+travel*.7,885,100+energy*12,10,0,0,Math.PI*2);ctx.fill();
    for(const s of sparks){const age=(performance.now()-s.time)/750;if(age>1)continue;ctx.strokeStyle=s.color;ctx.globalAlpha=(1-age)*.3;ctx.lineWidth=2;ctx.beginPath();ctx.ellipse(530+travel*.7,885,80+age*110,9+age*18,0,0,Math.PI*2);ctx.stroke()}ctx.globalAlpha=1;
    ctx.save();ctx.translate(525+(reduced?0:travel*.7),878-(reduced?0:Math.max(0,lift)*42));ctx.rotate(reduced?0:lean*.7);ctx.scale(1,1+(reduced?0:Math.min(0,lift)*.1));
    if(puppet){puppet.draw(phase,reduced?0:energy,reduced?0:lift);ctx.drawImage(puppet.canvas,-290,-638,580,638)}else{ctx.rotate(reduced?0:Math.sin(phase*.5)*energy*.045);ctx.drawImage(dancer,-290,-638,580,638)}ctx.restore();
    ctx.restore();
  }
  function resize(){const r=canvas.getBoundingClientRect();if(r.width>0&&r.height>0){const d=Math.min(devicePixelRatio||1,1.5);canvas.width=r.width*d;canvas.height=r.height*d}render()}
  new ResizeObserver(resize).observe(frame);
  function animate(now){
    const dt=Math.min(.05,(now-(last||now))/1000);last=now;phase+=dt*8.4*speed;energy=Math.max(0,energy-dt*1.8);sparks=sparks.filter(s=>now-s.time<750);
    const k=Math.min(1,dt*12);lift+=(targetLift-lift)*k;travel+=(targetTravel-travel)*k;lean+=(targetLean-lean)*k;
    const playback=api.getPlayback();if(playback?.source==='drawing')progress=Math.min(1,playback.progress);
    render();if(visible&&mode==='live'&&(playing||gesturing||energy>.01||Math.abs(targetLift-lift)>.005||Math.abs(targetTravel-travel)>.1||sparks.length))raf=requestAnimationFrame(animate);else{raf=0;last=0}
  }
  const wake=()=>{if(!raf&&visible&&mode==='live'&&!document.hidden)raf=requestAnimationFrame(animate)};
  function setMode(value){
    if(!['live','film'].includes(value))return;
    api.stop();gesturing=false;targetLift=0;targetLean=0;mode=value;$$('[data-painting-mode]').forEach(b=>b.setAttribute('aria-pressed',String(b.dataset.paintingMode===mode)));
    live.hidden=mode!=='live';$('#painting-film').hidden=mode!=='film';const controls=$('#drawing-controls');if(controls)controls.hidden=mode!=='live';
    if(mode==='live'){prepare().catch(()=>{});requestAnimationFrame(()=>{resize();wake()})}else{cancelAnimationFrame(raf);raf=0;last=0}copy();
  }
  $$('[data-painting-mode]').forEach(b=>b.addEventListener('click',()=>setMode(b.dataset.paintingMode)));
  document.addEventListener('click',e=>{if(mode==='film'&&e.target.closest('a[href="#play"]'))setMode('live')});
  window.addEventListener('butgarak:playback',e=>{
    if(e.detail.source!=='drawing')return;playing=e.detail.playing;
    if(playing){completed=false;gesturing=false;progress=0;live.classList.add('is-playing');prepare().catch(()=>{});wake()}
    else{live.classList.remove('is-playing');targetLift=0;targetLean=0;wake()}copy();
  });
  window.addEventListener('butgarak:note',e=>{
    if(e.detail.source!=='drawing'||mode!=='live')return;const n=e.detail;activeId=n.id;energy=Math.min(1.25,energy+(n.id==='janggu'?.68:.32));targetLift=(.5-n.y)*1.8;targetTravel=(n.x-.5)*185;if(n.id==='janggu'&&!reduced)sparks.push({time:performance.now(),color:colors[n.id]});copy();wake();
  });
  window.addEventListener('butgarak:complete',e=>{if(e.detail.source==='drawing'){completed=true;progress=1;copy();render()}});
  window.addEventListener('butgarak:drawchange',()=>{completed=false;if(!api.getState().paths){progress=0;gesturing=false;targetLift=0;targetTravel=0;targetLean=0;sparks=[];wake()}copy()});
  window.addEventListener('butgarak:gesture',e=>{const n=e.detail;if(n.source!=='drawing'||mode!=='live')return;if(n.phase==='end'){gesturing=false;targetLift=0;targetLean=0;copy();wake();return}completed=false;gesturing=true;activeId=n.id;targetLift=(.5-n.y)*1.8;targetTravel=(n.x-.5)*185;targetLean=Math.max(-.11,Math.min(.11,(n.dx||0)*3));energy=Math.max(.45,energy);prepare().catch(()=>{});copy();wake()});
  window.addEventListener('butgarak:audio',e=>{if(e.detail.source!=='drawing'){gesturing=false;targetLift=0;targetLean=0;copy();wake()}});
  window.addEventListener('butgarak:language',e=>{lang=e.detail.lang;copy()});
  window.addEventListener('butgarak:instrument',e=>{activeId=e.detail.id||api.getState().active;copy()});
  new IntersectionObserver(entries=>{visible=entries[0].isIntersecting;if(visible&&mode==='live'){prepare().catch(()=>{});wake()}else{cancelAnimationFrame(raf);raf=0;last=0}},{rootMargin:'120px'}).observe(frame);
  document.addEventListener('visibilitychange',()=>{if(document.hidden){cancelAnimationFrame(raf);raf=0;last=0}else wake()});
  copy();window.butgarakPainting={getState:()=>({ready,mode,playing,progress,energy,webgl:!!puppet,speed,lift,travel,gesturing})};
})();

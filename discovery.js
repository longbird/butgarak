(() => {
  'use strict';
  const root=document.querySelector('#discover');if(!root)return;
  const $=selector=>root.querySelector(selector),$$=selector=>[...root.querySelectorAll(selector)];
  const instruments=[
    {id:'gayageum',ko:'가야금',en:'Gayageum',koNote:'줄을 뜯을 때 또르르 울리는 소리. 가야금이에요.',enNote:'Pluck the strings and listen to them ring. That’s a gayageum.'},
    {id:'haegeum',ko:'해금',en:'Haegeum',koNote:'두 줄 사이로 활을 켜서 소리를 내는 해금이에요.',enNote:'A bow moves between two strings to make this sound. Meet the haegeum.'},
    {id:'daegeum',ko:'대금',en:'Daegeum',koNote:'대나무 관에 숨을 불어 넣어 연주하는 대금이에요.',enNote:'Breath through a bamboo flute. You’re hearing the daegeum.'},
    {id:'janggu',ko:'장구',en:'Janggu',koNote:'양쪽 가죽을 두드리며 장단을 만드는 장구예요.',enNote:'Two drumheads, struck to make a rhythm. That’s the janggu.'}
  ];
  const copy={
    ko:{eyebrow:'소리부터 골라볼까요',title1:'내가 좋아할 국악은',title2:'어떤 소리일까?',intro:'늘 듣던 음악과는 조금 다른 소리.<br>하나씩 들어보고, 마음에 드는 악기로 그려보세요.',detailEyebrow:'마음이 가는 소리를 찾아서',initialTitle:'어느 쪽이 끌리나요?',initialBody:'세 소리 중 하나를 눌러보세요.<br>듣고 나면 악기 이름이 나타나요.',draw:'이 악기로 그려보기 ↗',hint:'이름보다, 소리를 먼저.',next:'다른 소리 듣기 ↻',purpose:'<strong>낯설었던 국악이 좋아하는 음악이 될 수 있도록.</strong> 아이들이 집과 학교에서 국악을 쉽게 만나고, 소리로 놀며 친해지길 바라는 마음으로 만들었어요.',listen:'들어보기',again:'다시 듣기',stop:'소리 멈추기',loading:'소리 준비 중',errorTitle:'소리를 불러오지 못했어요.',errorBody:'듣고 싶은 소리를 다시 눌러주세요.',optionGroup:'세 가지 소리 들어보기',first:'첫 번째 소리',second:'두 번째 소리',third:'세 번째 소리',mystery:'어떤 소리일까'},
    en:{eyebrow:'Find a sound you like',title1:'What kind of Korean music',title2:'will catch your ear?',intro:'A little different from your usual playlist.<br>Listen around, then draw with the sound you like.',detailEyebrow:'Follow your ears',initialTitle:'Which sound draws you in?',initialBody:'Tap one of these three sounds.<br>The instrument will reveal itself when you listen.',draw:'Draw with this instrument ↗',hint:'The sound comes before the name.',next:'More sounds ↻',purpose:'<strong>So unfamiliar sounds can become music you love.</strong> We made Butgarak to help children at home and school get to know Korean music through sound and play.',listen:'Listen',again:'Listen again',stop:'Stop sound',loading:'Loading sound',errorTitle:'The sound didn’t load.',errorBody:'Tap the sound you want to try again.',optionGroup:'Explore three sounds',first:'First sound',second:'Second sound',third:'Third sound',mystery:'A sound to discover'}
  };
  let lang=document.documentElement.lang==='ko'?'ko':'en',round=0,selected=null,playingId=null,pendingId=null,ownsAudio=false,internalAudio=false,request=0,timer,error=false;
  const revealed=new Set(),visited=new Set();
  let options=instruments.slice(0,3);
  const t=key=>copy[lang][key],api=()=>window.butgarakLanding;
  function stopAudio(){internalAudio=true;try{api()?.stop();}finally{internalAudio=false;}}
  function invalidate(){request++;clearTimeout(timer);playingId=null;pendingId=null;ownsAudio=false;root.classList.remove('is-sounding');}
  function stop(){stopAudio();invalidate();renderOptions();}
  function response(){
    const inst=instruments.find(i=>i.id===selected);
    $('#discovery-response-title').textContent=error?t('errorTitle'):inst?inst[lang]:t('initialTitle');
    $('#discovery-response-body').innerHTML=error?t('errorBody'):inst?inst[lang+'Note']:t('initialBody');
    $('#discovery-draw').hidden=!inst||error;
  }
  function renderOptions(){
    const focused=document.activeElement?.dataset.discoverySound;
    $('#discovery-options').innerHTML=options.map((inst,n)=>{
      const open=revealed.has(inst.id),isPlaying=playingId===inst.id,busy=pendingId===inst.id;
      const text=busy?t('loading'):isPlaying?t('stop'):open?t('again'):t('listen');
      const name=open?inst[lang]:t(['first','second','third'][n]);
      const aria=open?name+' '+text:name+' '+t('listen');
      return `<button class="discovery-choice${open?' is-revealed':''}${isPlaying?' is-playing':''}" data-discovery-sound="${inst.id}" aria-pressed="${selected===inst.id}" aria-label="${aria}"${busy?' aria-busy="true"':''}><span class="discovery-choice-number" aria-hidden="true">${String(n+1).padStart(2,'0')}</span><span class="discovery-choice-visual" aria-hidden="true">${open?`<img src="assets/icons/${inst.id}.svg" alt="" width="76" height="72">`:`<span class="discovery-mystery">${String(n+1).padStart(2,'0')}</span>`}</span><span class="discovery-choice-label">${open?inst[lang]:t('mystery')}</span><span class="discovery-choice-play"><i aria-hidden="true">${isPlaying?'Ⅱ':'▷'}</i>${text}</span></button>`;
    }).join('');
    $('#discovery-options').setAttribute('aria-label',t('optionGroup'));
    if(focused)$(`[data-discovery-sound="${focused}"]`)?.focus({preventScroll:true});
  }
  function render(){
    $$('[data-discovery-copy]').forEach(el=>el.innerHTML=t(el.dataset.discoveryCopy));
    renderOptions();response();
  }
  async function listen(id){
    if(playingId===id||pendingId===id){stop();return;}
    stopAudio();invalidate();
    const current=++request;
    pendingId=id;error=false;renderOptions();response();
    try{
      if(!api()?.audition)throw Error('Audio unavailable');
      ownsAudio=true;
      const duration=await api().audition(id,$(`[data-discovery-sound="${id}"]`),{source:'discovery'});
      if(current!==request)return;
      if(!(typeof duration==='number'&&Number.isFinite(duration)&&duration>0))throw Error('Playback did not start');
      pendingId=null;playingId=id;selected=id;revealed.add(id);visited.add(id);
      root.classList.add('is-sounding');renderOptions();response();
      timer=setTimeout(()=>{if(current!==request)return;playingId=null;ownsAudio=false;root.classList.remove('is-sounding');renderOptions();},duration*1000);
    }catch(e){
      if(current!==request)return;
      invalidate();error=true;renderOptions();response();
    }
  }
  $('#discovery-options').addEventListener('click',event=>{const button=event.target.closest('[data-discovery-sound]');if(button)listen(button.dataset.discoverySound);});
  $('#discovery-next').addEventListener('click',()=>{
    stopAudio();invalidate();round++;selected=null;error=false;revealed.clear();
    options=Array.from({length:3},(_,n)=>instruments[(round+n)%instruments.length]);
    render();$('[data-discovery-sound]').focus({preventScroll:true});
  });
  $('#discovery-draw').addEventListener('click',event=>{if(!selected){event.preventDefault();return;}stop();api()?.choose(selected);});
  window.addEventListener('butgarak:language',event=>{lang=event.detail?.lang==='ko'?'ko':'en';render();});
  window.addEventListener('butgarak:audio',event=>{
    if(internalAudio||event.detail?.source==='discovery')return;
    if(playingId||pendingId){invalidate();renderOptions();}
  });
  document.addEventListener('visibilitychange',()=>{if(document.hidden&&(playingId||pendingId))stop();});
  new IntersectionObserver(entries=>{if(!entries[0].isIntersecting&&ownsAudio)stop();},{threshold:0}).observe(root);
  render();
  window.butgarakDiscovery={getState:()=>({round,selected,playingId,pendingId,revealed:[...revealed],visited:[...visited],options:options.map(i=>i.id),lang,error})};
})();

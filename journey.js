(() => {
  const section=document.querySelector('#together');
  const motion=matchMedia('(prefers-reduced-motion:reduce)');
  let visible=false;
  function sync(){
    const svg=section.querySelector('svg');
    if(motion.matches)svg.pauseAnimations();
    else if(visible&&!document.hidden)svg.unpauseAnimations();
  }
  new IntersectionObserver(entries=>{
    const shown=entries[0].isIntersecting;visible=shown;
    if(shown)section.classList.add('is-seen');
    const svg=section.querySelector('svg');
    if(!shown||motion.matches)svg.pauseAnimations();else svg.unpauseAnimations();
  },{threshold:.2}).observe(section);
  document.addEventListener('visibilitychange',()=>document.hidden?section.querySelector('svg').pauseAnimations():sync());
  motion.addEventListener('change',sync);sync();
})();

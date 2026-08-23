import type { ElementType, ReactNode, CSSProperties } from "react";

/**
 * Scroll reveal, with no client component boundary.
 *
 * These render as plain server markup carrying data attributes. A single
 * IntersectionObserver installed once in the document (see RevealScript)
 * drives every reveal, every thread draw and every diagram on the site.
 *
 * The result is that the whole page except the navigation ships zero
 * JavaScript, which is the difference between a marketing site that loads and
 * one that loads 22 script files the way the WordPress build did.
 */

/**
 * Which way the element arrives from.
 *
 * Everything rising eighteen pixels is correct for a body paragraph and dull
 * across a whole page. Giving a section a direction that matches its place in
 * the layout, a left column arriving from the left, a card set scaling up
 * slightly, makes the page feel composed rather than uniformly animated.
 * Keep it restrained: two directions on one screen is plenty.
 */
export type RevealFrom = "up" | "left" | "right" | "scale" | "fade";

type RevealProps = {
  children: ReactNode;
  as?: ElementType;
  delay?: number;
  className?: string;
  /** Adds the line mask treatment used on display headlines. */
  mask?: boolean;
  from?: RevealFrom;
};

export function Reveal({
  children,
  as: Tag = "div",
  delay = 0,
  className = "",
  mask = false,
  from = "up",
}: RevealProps) {
  return (
    <Tag
      data-reveal=""
      data-from={from === "up" ? undefined : from}
      suppressHydrationWarning
      className={`${mask ? "reveal-mask" : ""} ${className}`.trim()}
      style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}
    >
      {children}
    </Tag>
  );
}

/**
 * One observer for the whole document, installed before paint.
 *
 * Elements are revealed when they enter view and then unobserved, so the
 * cost is a single observer and no scroll listener. If JavaScript never
 * runs, the noscript rule reveals everything immediately, so the page is
 * fully readable either way.
 *
 * A MutationObserver keeps the sweep honest across client side navigation.
 * The router swaps the whole page subtree without a document load, so the
 * markup that arrives on the second and every later page is brand new and
 * was never handed to the IntersectionObserver. Without the sweep those
 * elements sit at opacity zero forever and the route reads as blank. The
 * mutation callback only ever reads the DOM and sets an attribute, which
 * records no mutation of its own, so there is no feedback loop.
 */
export function RevealScript() {
  const source = `
(function(){
  var SEL='[data-reveal]:not([data-shown])';
  var reveal=function(el){el.setAttribute('data-shown','true')};
  var io=null;
  if('IntersectionObserver' in window){
    io=new IntersectionObserver(function(entries){
      for(var i=0;i<entries.length;i++){
        if(!entries[i].isIntersecting)continue;
        reveal(entries[i].target);
        io.unobserve(entries[i].target)
      }
    },{rootMargin:'0px 0px -10% 0px',threshold:0.1})
  }
  var queued=false;
  var interactiveSelector='a.group, article, details[data-disclosure], div[class*="shadow-[var(--shadow-soft)]"], div[class*="shadow-[var(--shadow-lift)]"], span[class*="shadow-[var(--shadow-soft)]"]';
  var markInteractive=function(){
    if(!(window.matchMedia && window.matchMedia('(pointer: fine)').matches))return;
    var nodes=document.querySelectorAll(interactiveSelector);
    for(var i=0;i<nodes.length;i++){
      var el=nodes[i];
      if(el.hasAttribute('data-interactive-card'))continue;
      var cls=typeof el.className==='string'?el.className:'';
      if(cls.indexOf('rounded-pill')>-1)continue;
      if(el.closest('header')||el.closest('footer'))continue;
      if(el.matches('a') && cls.indexOf('h-full')<0 && cls.indexOf('flex-col')<0 && cls.indexOf('items-start')<0)continue;
      if(el.matches('div') && cls.indexOf('rounded-')<0)continue;
      if(el.closest('[data-block="hero"] .hero-media'))continue;
      el.setAttribute('data-interactive-card','');
    }
  };
  var markQueued=false;
  var scheduleInteractive=function(){
    if(markQueued)return;
    markQueued=true;
    setTimeout(function(){
      markQueued=false;
      markInteractive();
    },900);
  };
  var sweep=function(){
    queued=false;
    var nodes=document.querySelectorAll(SEL);
    for(var i=0;i<nodes.length;i++){ io?io.observe(nodes[i]):reveal(nodes[i]) }
  };
  var schedule=function(){
    if(queued)return;
    queued=true;
    if(window.requestAnimationFrame){requestAnimationFrame(sweep)}else{setTimeout(sweep,16)}
  };
  var start=function(){
    sweep();
    scheduleInteractive();
    if('MutationObserver' in window){
      new MutationObserver(function(){schedule();scheduleInteractive()}).observe(document.body,{childList:true,subtree:true})
    }
  };
  if(document.readyState==='loading'){
    document.addEventListener('DOMContentLoaded',start)
  } else { start() }
  window.addEventListener('pageshow',function(){schedule();scheduleInteractive()});
  if(window.matchMedia && window.matchMedia('(pointer: fine)').matches && !window.matchMedia('(prefers-reduced-motion: reduce)').matches){
    var active=null;
    var reset=function(el){
      if(!el)return;
      el.style.removeProperty('--mx');
      el.style.removeProperty('--my');
      el.style.removeProperty('--rx');
      el.style.removeProperty('--ry');
    };
    document.addEventListener('pointermove',function(event){
      var target=event.target && event.target.closest ? event.target.closest('[data-interactive-card]') : null;
      if(active && active!==target)reset(active);
      active=target;
      if(!target)return;
      var rect=target.getBoundingClientRect();
      if(!rect.width || !rect.height)return;
      var x=(event.clientX-rect.left)/rect.width;
      var y=(event.clientY-rect.top)/rect.height;
      target.style.setProperty('--mx',(x*100).toFixed(2)+'%');
      target.style.setProperty('--my',(y*100).toFixed(2)+'%');
      target.style.setProperty('--ry',((x-0.5)*7).toFixed(2)+'deg');
      target.style.setProperty('--rx',((0.5-y)*7).toFixed(2)+'deg');
    },{passive:true});
    document.addEventListener('pointerleave',function(){reset(active);active=null},{passive:true});
    document.addEventListener('focusout',function(event){reset(event.target && event.target.closest ? event.target.closest('[data-interactive-card]') : null)},{passive:true});
  }
})();`.trim();

  return <script dangerouslySetInnerHTML={{ __html: source }} />;
}

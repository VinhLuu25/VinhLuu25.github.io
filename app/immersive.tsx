"use client";
import {useEffect,useRef} from 'react';
export function Vine({className=''}) {return <div aria-hidden="true" className={`vine ${className}`} />;}
export function SceneMotion({reduced}:{reduced:boolean}) {
 useEffect(()=>{if(reduced)return;let frame=0;const sections=Array.from(document.querySelectorAll<HTMLElement>('.chapter'));const draw=()=>{frame=0;for(const el of sections){const r=el.getBoundingClientRect();if(r.bottom>0&&r.top<innerHeight){const y=(innerHeight/2-r.top-r.height/2);el.style.setProperty('--scene-y',`${Math.max(-70,Math.min(70,y*.09))}px`);}}};const update=()=>{if(!frame)frame=requestAnimationFrame(draw)};window.addEventListener('scroll',update,{passive:true});draw();return()=>{cancelAnimationFrame(frame);window.removeEventListener('scroll',update);sections.forEach(el=>el.style.removeProperty('--scene-y'));}},[reduced]);return null;
}
export function FlowerField({reduced}:{reduced:boolean}) {
 const ref=useRef<HTMLDivElement>(null);const down=useRef(false);
 function scatter(x:number,y:number){const root=ref.current;if(!root)return;for(const flower of root.querySelectorAll<HTMLElement>('.tiny-flower:not([data-away])')){const r=flower.getBoundingClientRect();const dx=r.left+r.width/2-x,dy=r.top+r.height/2-y;if(Math.hypot(dx,dy)<85){flower.dataset.away='true';flower.animate([{transform:'translate(0,0) rotate(0)',opacity:1},{transform:`translate(${dx*5+(dx>=0?90:-90)}px,${dy*4-180}px) rotate(${dx*8}deg) scale(.35)`,opacity:0}],{duration:reduced?1:1100,easing:'cubic-bezier(.1,.6,.4,1)',fill:'forwards'});}}}
 return <div ref={ref} className="flower-field" role="group" aria-label="Kéo để gạt hoa" onPointerDown={e=>{down.current=true;e.currentTarget.setPointerCapture(e.pointerId);scatter(e.clientX,e.clientY)}} onPointerMove={e=>{if(down.current)scatter(e.clientX,e.clientY)}} onPointerUp={()=>down.current=false} onPointerCancel={()=>down.current=false}>
 {Array.from({length:280},(_,i)=><span key={i} className="tiny-flower" style={{left:`${i%20*5-1}%`,top:`${Math.floor(i/20)*7.15-1}%`,rotate:`${i*47%360}deg`}}/>)}
 <button className="clear-field" onClick={()=>{ref.current?.setAttribute('data-cleared','true')}}>Vén hoa để đọc thư</button></div>
}

import React, { useState, useEffect, useRef } from 'react';
const h = React.createElement;

export function useSeen(){const r=useRef<any>(null),[s,set]=useState(false);
  useEffect(()=>{const o=new IntersectionObserver(e=>{if(e[0].isIntersecting){set(true);o.disconnect()}},{threshold:.15});o.observe(r.current);return()=>o.disconnect()},[]);return [r,s] as [React.MutableRefObject<any>,boolean]}

export function R({children,d=0,cls='',tag='div'}:any){const[r,s]=useSeen();
  return h(tag,{ref:r,className:'rv '+cls+(s?' in':''),style:{transitionDelay:d+'ms'}},children)}

export function Count({to,suffix=''}:any){const[r,s]=useSeen(),[n,set]=useState(0);
  useEffect(()=>{if(!s)return;let t0;const f=t=>{t0=t0||t;const p=Math.min((t-t0)/1400,1);set(Math.round(to*(1-Math.pow(1-p,3))));p<1&&requestAnimationFrame(f)};requestAnimationFrame(f)},[s]);
  return h('b',{ref:r},n+suffix)}

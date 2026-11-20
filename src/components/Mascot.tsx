import React, { useState, useEffect, useRef } from 'react';
import { useSeen, R, Count } from '../lib/reveal';
import { ICON, FULL, IMG, APP_URL } from '../assets';
import { FEAT, STEPS, CARDS, FAQ } from '../data';
const h = React.createElement;

export function Mascot(){
  const[w,setW]=useState(false),[m,setM]=useState(0),ref=useRef<any>(null);
  const MSG=['Hi! I’m your study guide 👋','Drop in a PDF and I’ll do the rest','Learning without barriers ✨','Tap me to say hi!'];
  useEffect(()=>{const t=setInterval(()=>setM(x=>(x+1)%MSG.length),3400);return()=>clearInterval(t)},[]);
  useEffect(()=>{const mv=e=>{const r=ref.current;if(!r)return;r.style.setProperty('--tx',((e.clientX/innerWidth-.5)*16)+'px');r.style.setProperty('--ty',((e.clientY/innerHeight-.5)*8)+'px')};addEventListener('pointermove',mv);return()=>removeEventListener('pointermove',mv)},[]);
  const hi=()=>{setW(true);setTimeout(()=>setW(false),1100)};
  return h('div',{className:'mas',ref},h('span',{className:'ring'}),
    h('img',{className:'fcs hf',src:IMG.cards,alt:'',draggable:false}),
    h('div',{className:'bub',key:m},MSG[m]),
    h('img',{className:'mch'+(w?' wave':''),src:IMG.char,alt:'Tempus AI study guide character',onClick:hi,draggable:false}),
    h('span',{className:'msh'}))}

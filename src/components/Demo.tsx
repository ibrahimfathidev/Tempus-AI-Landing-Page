import React, { useState, useEffect, useRef } from 'react';
import { useSeen, R, Count } from '../lib/reveal';
import { ICON, FULL, IMG, APP_URL } from '../assets';
import { FEAT, STEPS, CARDS, FAQ } from '../data';
const h = React.createElement;

export function Demo(){const[k,setK]=useState(0),[f,setF]=useState(false),[p,setP]=useState(false);
  const next=()=>{setF(false);setTimeout(()=>setK(x=>(x+1)%CARDS.length),250)};
  return h('div',{className:'demo'},
    h(R,null,h('span',{className:'eb'},'Try it'),h('h2',null,'Study that feels more like play'),
      h('p',{className:'sub',style:{marginBottom:20}},'Tap the card to flip it. Then press play to see how audio narration looks.'),
      h('div',{className:'row'},h('button',{className:'btn gh',onClick:next},'Next card →')),
      h('div',{className:'au'+(p?' on':'')},h('button',{className:'pl','aria-label':p?'Pause':'Play',onClick:()=>setP(!p)},p?'❚❚':'▶'),
        h('div',{className:'wv','aria-hidden':true},Array.from({length:34},(_,i)=>h('i',{key:i,style:{animationDelay:(i*70)+'ms',height:(20+Math.abs(Math.sin(i*1.7))*70)+'%'}}))))),
    h(R,{d:150,cls:'fcw'},h('img',{className:'fcs',src:IMG.cards,alt:'',draggable:false}),h('div',{className:'fc'+(f?' fl':''),onClick:()=>setF(!f),role:'button',tabIndex:0,onKeyDown:e=>(e.key==='Enter'||e.key===' ')&&setF(!f)},
      h('div',{className:'fi'},h('div',{className:'f'},h('small',null,'Question · '+(k+1)+'/'+CARDS.length),h('p',null,CARDS[k][0])),h('div',{className:'f b'},h('small',null,'Answer'),h('p',null,CARDS[k][1]))))))}

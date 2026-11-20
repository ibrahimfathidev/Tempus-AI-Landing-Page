import React, { useState, useEffect, useRef } from 'react';
import { useSeen, R, Count } from '../lib/reveal';
import { ICON, FULL, IMG, APP_URL } from '../assets';
import { FEAT, STEPS, CARDS, FAQ } from '../data';
const h = React.createElement;
import { Avatar3D } from './Avatar3D';

export function Hero(){
  const W=['PDFs','lecture notes','textbooks','slide decks'],[i,setI]=useState(0),[out,setOut]=useState(false);
  useEffect(()=>{const t=setInterval(()=>{setOut(true);setTimeout(()=>{setI(x=>(x+1)%W.length);setOut(false)},350)},2400);return()=>clearInterval(t)},[]);
  return h('header',{className:'hero'},
    h('div',{className:'orb o1'}),h('div',{className:'orb o2'}),h('div',{className:'orb o3'}),
    h('div',{className:'wrap hg'},
      h('div',null,
        h('span',{className:'pill'},h('i',{className:'dot'}),'Core features are free'),
        h('h1',null,'Turn your ',h('span',{className:'grad tw'+(out?' out':'')},W[i]),h('br'),'into a story you can learn.'),
        h('p',{className:'lead'},'Upload a PDF, DOCX or TXT. Tempus AI builds a story-based learning journey, flashcards or a practice exam, and can read it aloud to you.'),
        h('div',{className:'row'},h('a',{className:'btn',href:APP_URL,target:'_blank',rel:'noopener'},'Start learning ›'),h('a',{className:'btn gh',href:'#how'},'See how it works'))),
      h('div',{className:'hv'},h(Avatar3D),h('span',{className:'chip c1'},'🧠 Flashcards'),h('span',{className:'chip c2'},'🎧 Audio narration'),h('span',{className:'chip c3'},'📝 Practice exams'))))}

import React, { useState, useEffect, useRef } from 'react';
import { useSeen, R, Count } from './lib/reveal';
import { ICON, FULL, IMG, APP_URL } from './assets';
import { FEAT, STEPS, CARDS, FAQ } from './data';
const h = React.createElement;
import { Logo } from './components/Logo';
import { Hero } from './components/Hero';
import { Stress } from './components/Stress';
import { Demo } from './components/Demo';
import { FAQi } from './components/Faq';

export function App(){
  const[th,setTh]=useState('');
  useEffect(()=>{if(th)document.documentElement.dataset.theme=th},[th]);
  const dark=th?th==='dark':matchMedia('(prefers-color-scheme: dark)').matches;
  const tick=['Story journeys','Flashcards','Practice exams','Audio narration','Notes & to-do','Classrooms','PDF','DOCX','TXT'];
  return h(React.Fragment,null,
    h('nav',null,h('div',{className:'wrap'},h('a',{className:'logo',href:'#top'},h(Logo),'Tempus AI'),
      h('div',{className:'nl'},h('a',{href:'#features'},'Features'),h('a',{href:'#how'},'How it works'),h('a',{href:'#faq'},'FAQ')),
      h('div',{className:'row',style:{gap:10,alignItems:'center'}},h('button',{className:'tg','aria-label':'Toggle theme',onClick:()=>setTh(dark?'light':'dark')},dark?'☀':'☾'),h('a',{className:'btn',href:APP_URL,target:'_blank',rel:'noopener',style:{padding:'10px 20px'}},'Get started')))),
    h(Hero),
    h('div',{className:'mq','aria-hidden':true},h('div',{className:'mt'},[...tick,...tick].map((t,i)=>h('span',{key:i},'✦ '+t)))),
    h(Stress),h('section',{id:'features'},h('div',{className:'wrap'},h(R,null,h('span',{className:'eb'},'Features'),h('h2',null,'One upload. Many ways to learn.'),h('p',{className:'sub'},'Built around how memory actually works: understand, recall, repeat.')),
      h('div',{className:'grid'},FEAT.map((f,i)=>h(R,{key:i,d:i*90,cls:'card'},h('div',{className:'ic'},f[0]),h('h3',null,f[1]),h('p',null,f[2])))))),
    h('section',{id:'how',style:{background:'var(--bg2)'}},h('div',{className:'wrap'},h(R,null,h('span',{className:'eb'},'How it works'),h('h2',null,'From file to fluent in three steps')),
      h('div',{className:'steps',style:{marginTop:40}},STEPS.map((s,i)=>h(R,{key:i,d:i*200,cls:'st'},h('b',null,s[0]),h('h3',null,s[1]),h('p',null,s[2])))))),
    h('section',null,h('div',{className:'wrap'},h(Demo))),
    h('section',{style:{paddingTop:0}},h('div',{className:'wrap stats'},
      h(R,null,h(Count,{to:3}),h('span',null,'study formats')),h(R,{d:120},h(Count,{to:3}),h('span',null,'file types supported')),h(R,{d:240},h('b',null,'Free'),h('span',null,'core features')))),
    h('section',{id:'faq',style:{paddingTop:20}},h('div',{className:'wrap',style:{maxWidth:760}},h(R,null,h('span',{className:'eb'},'FAQ'),h('h2',null,'Good questions')),h(R,null,FAQ.map((f,i)=>h(FAQi,{key:i,q:f[0],a:f[1]}))))),
    h('section',{id:'start',style:{paddingTop:0}},h('div',{className:'wrap'},h(R,{cls:'cta'},h('img',{className:'wm',src:IMG.wm,alt:'Learning Without Barriers'}),h('h2',null,'Your AI learning space is ready'),h('p',null,'Upload your first file and turn it into something you’ll actually remember.'),h('a',{className:'btn',href:APP_URL,target:'_blank',rel:'noopener'},'Start learning free ›')))),
    h('footer',null,h('div',{className:'wrap'},h('span',{className:'logo'},h(Logo,{s:22}),'© 2026 Tempus AI'),h('span',null,h('a',{href:APP_URL+'blog/',target:'_blank',rel:'noopener'},'Study guides'),' · ',h('a',{href:APP_URL+'about/',target:'_blank',rel:'noopener'},'About')))))}

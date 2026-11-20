import React, { useState, useEffect, useRef } from 'react';
import { useSeen, R, Count } from '../lib/reveal';
import { ICON, FULL, IMG, APP_URL } from '../assets';
import { FEAT, STEPS, CARDS, FAQ } from '../data';
const h = React.createElement;

export function Stress(){return h('section',{style:{background:'var(--bg2)'}},h('div',{className:'wrap demo'},
  h(R,null,h('img',{className:'stu',src:IMG.stu,alt:'A stressed student cramming with books, coffee and a countdown timer',draggable:false})),
  h(R,{d:150},h('span',{className:'eb'},'Sound familiar?'),h('h2',null,'Cramming isn’t a plan'),
    h('p',{className:'sub',style:{marginBottom:22}},'Piles of books, a ticking clock and notes that never quite stick. Tempus AI turns your own material into something you can follow, listen to and quiz yourself on.'),
    h('a',{className:'btn',href:'#features'},'There’s a better way ↓'))))}

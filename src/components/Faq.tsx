import React, { useState, useEffect, useRef } from 'react';
import { useSeen, R, Count } from '../lib/reveal';
import { ICON, FULL, IMG, APP_URL } from '../assets';
import { FEAT, STEPS, CARDS, FAQ } from '../data';
const h = React.createElement;

export function FAQi({q,a}:any){const[o,s]=useState(false);
  return h('div',{className:'fq'+(o?' o':'')},h('button',{onClick:()=>s(!o),'aria-expanded':o},q,h('span',{className:'pm'},'+')),h('div',{className:'an'},h('p',null,a)))}

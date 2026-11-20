import React, { useState, useEffect, useRef } from 'react';
import { useSeen, R, Count } from '../lib/reveal';
import { ICON, FULL, IMG, APP_URL } from '../assets';
import { FEAT, STEPS, CARDS, FAQ } from '../data';
const h = React.createElement;

export function Logo({s=30}:any){return h('img',{src:ICON,width:s,height:s,alt:'',style:{objectFit:'contain'}})}

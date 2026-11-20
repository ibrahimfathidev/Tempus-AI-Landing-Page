import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import { Mascot } from './Mascot';

type Act = 'wave' | 'nod' | 'spin';
const MODEL = '/models/sign-avatar-woman.glb';

/** 3D avatar (your rigged GLB). Shows the sticker character while loading or if WebGL/model fails. */
export function Avatar3D() {
  const box = useRef<HTMLDivElement>(null);
  const ctl = useRef<{ play?: (a: Act) => void }>({});
  const [st, setSt] = useState<'load' | 'ready' | 'fail'>('load');

  useEffect(() => {
    let dead = false, raf = 0, vis = true, px = 0;
    let ren: THREE.WebGLRenderer | undefined, ro: ResizeObserver | undefined, io: IntersectionObserver | undefined;
    const onMove = (e: PointerEvent) => { px = (e.clientX / innerWidth) * 2 - 1; };
    (async () => {
      try {
        const el = box.current!;
        ren = new THREE.WebGLRenderer({ antialias: true, alpha: true });
        ren.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
        ren.outputColorSpace = THREE.SRGBColorSpace;
        ren.toneMapping = THREE.ACESFilmicToneMapping; ren.toneMappingExposure = 1.1;
        el.appendChild(ren.domElement);
        const sc = new THREE.Scene(), cam = new THREE.PerspectiveCamera(28, 1, 0.05, 60), wrap = new THREE.Group();
        sc.add(wrap);
        sc.add(new THREE.HemisphereLight(0xcbdcff, 0x242036, 1.9));
        ([[0xffe4d1, 2.6, [2.5, 4, 3.5]], [0x849bff, 1.4, [-3, 2.5, 1.5]], [0xffb4d4, 1.6, [0, 3, -3.5]]] as [number, number, number[]][]).forEach(([c, i, p]) => {
          const l = new THREE.DirectionalLight(c, i); l.position.set(p[0], p[1], p[2]); sc.add(l);
        });
        const gltf = await new GLTFLoader().loadAsync(MODEL);
        if (dead) return;
        const root = gltf.scene; wrap.add(root);
        root.traverse((o: any) => {
          if (o.isMesh) { o.frustumCulled = false; (Array.isArray(o.material) ? o.material : [o.material]).forEach((m: any) => { if (m.map) m.map.colorSpace = THREE.SRGBColorSpace; }); }
        });
        root.updateMatrixWorld(true);
        cam.position.set(0, 0.95, 4.2); cam.lookAt(0, 0.88, 0);

        // --- rig: aim each arm bone at a target direction (works with any bone roll)
        const B: Record<string, any> = {};
        'RightArm RightForeArm RightHand RightHandMiddle1 LeftArm LeftForeArm LeftHand LeftHandMiddle1 Spine02 Head'.split(' ').forEach((n) => { B[n] = root.getObjectByName(n); });
        Object.values(B).forEach((b) => { b.rest = b.quaternion.clone(); });
        [['RightArm', 'RightForeArm'], ['RightForeArm', 'RightHand'], ['RightHand', 'RightHandMiddle1'], ['LeftArm', 'LeftForeArm'], ['LeftForeArm', 'LeftHand'], ['LeftHand', 'LeftHandMiddle1']]
          .forEach(([a, b]) => { B[a].dir = B[b].position.clone().normalize(); });
        const V = (x: number, y: number, z: number) => new THREE.Vector3(x, y, z);
        const mix = (a: THREE.Vector3, b: THREE.Vector3, e: number) => a.clone().lerp(b, e);
        const pq = new THREE.Quaternion(), cu = new THREE.Quaternion(), dq = new THREE.Quaternion(), eq = new THREE.Quaternion();
        const dv = new THREE.Vector3(), tw = new THREE.Vector3(), eu = new THREE.Euler();
        const aim = (b: any, t: THREE.Vector3) => {
          b.parent.getWorldQuaternion(pq); cu.copy(pq).multiply(b.rest);
          dv.copy(b.dir).applyQuaternion(cu); tw.copy(t).applyQuaternion(wrap.quaternion).normalize();
          dq.setFromUnitVectors(dv, tw); cu.premultiply(dq);
          b.quaternion.copy(pq).invert().multiply(cu); b.updateMatrixWorld(true);
        };
        const rs = () => { const w = el.clientWidth, h = el.clientHeight; ren!.setSize(w, h); cam.aspect = w / h; cam.updateProjectionMatrix(); };
        rs(); ro = new ResizeObserver(rs); ro.observe(el);
        io = new IntersectionObserver((e) => { vis = e[0].isIntersecting; }); io.observe(el);
        addEventListener('pointermove', onMove);
        const clk = new THREE.Clock(), reduced = matchMedia('(prefers-reduced-motion: reduce)').matches;
        let act: { n: Act | ''; t: number } = { n: '', t: 0 }, nextAuto = 1.4, ry = 0;
        ctl.current.play = (n) => { act = { n, t: 0 }; };
        const frame = () => {
          raf = requestAnimationFrame(frame);
          if (!vis || document.hidden) return;
          const dt = Math.min(clk.getDelta(), 0.05), t = clk.elapsedTime;
          if (!reduced && !act.n && t > nextAuto) act = { n: 'wave', t: 0 };
          let env = 0, wag = 0, nod = 0, spin = 0;
          if (act.n) {
            act.t += dt;
            const D = { wave: 3.6, nod: 1.7, spin: 1.9 }[act.n], u = act.t / D;
            if (u >= 1) { act = { n: '', t: 0 }; nextAuto = t + 8; }
            else if (act.n === 'wave') { env = Math.max(0, Math.min(1, act.t / 0.7, (D - act.t) / 0.7)); wag = Math.sin(act.t * 10) * env; }
            else if (act.n === 'nod') nod = Math.sin(u * Math.PI * 3) * 0.28 * Math.sin(u * Math.PI);
            else spin = (1 - Math.pow(1 - u, 3)) * Math.PI * 2;
          }
          ry += (px * 0.45 - ry) * 0.06; wrap.rotation.y = ry + spin; wrap.updateMatrixWorld(true);
          B.Spine02.quaternion.copy(B.Spine02.rest).multiply(eq.setFromEuler(eu.set(Math.sin(t * 1.6) * 0.012, 0, 0)));
          B.Head.quaternion.copy(B.Head.rest).multiply(eq.setFromEuler(eu.set(nod, Math.sin(t * 0.8) * 0.05, 0)));
          B.Spine02.updateMatrixWorld(true);
          aim(B.RightArm, mix(V(-0.18, -1, 0.05), V(-0.95, -0.1, 0.2), env));
          aim(B.RightForeArm, mix(V(-0.08, -1, 0.35), V(-0.1 + wag * 0.5, 1, 0.2), env));
          aim(B.RightHand, mix(V(-0.05, -1, 0.3), V(-0.1 + wag * 0.9, 1, 0.15), env));
          aim(B.LeftArm, V(0.18 + Math.sin(t * 1.3) * 0.03, -1, 0.05)); aim(B.LeftForeArm, V(0.08, -1, 0.35)); aim(B.LeftHand, V(0.05, -1, 0.3));
          ren!.render(sc, cam);
        };
        frame(); setSt('ready');
      } catch (e) { console.error('3D avatar failed, using sticker fallback:', e); if (!dead) setSt('fail'); }
    })();
    return () => {
      dead = true; cancelAnimationFrame(raf); removeEventListener('pointermove', onMove);
      ro?.disconnect(); io?.disconnect();
      if (ren) { ren.dispose(); ren.domElement.remove(); }
    };
  }, []);

  return (
    <div className="avw">
      <div className="hv3">
        {st !== 'ready' && <Mascot />}
        <div ref={box} className={'a3d' + (st === 'ready' ? ' on' : '')} />
      </div>
      {st === 'ready' && (
        <div className="acts">
          {([['👋', 'Wave', 'wave'], ['🙂', 'Nod', 'nod'], ['🔄', 'Spin', 'spin']] as [string, string, Act][]).map(([e, l, a]) => (
            <button key={a} className="btn gh" style={{ padding: '9px 16px', fontSize: '.85rem' }} onClick={() => ctl.current.play?.(a)}>{e} {l}</button>
          ))}
        </div>
      )}
      <small className="cap">Experimental sign-language avatar prototype</small>
    </div>
  );
}

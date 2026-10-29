import { useEffect, useRef, useState } from 'react';

const dishes = [
  {
    name: 'Ember Rigatoni', note: 'Slow tomato · basil · aged parmesan', price: '₹620', image: '/dishes/tomato-rigatoni.png', color: '#d76435', index: '01',
    hero: { eyebrow: 'BENGALURU · EST. 2021', tag: 'OPEN FIRE', tagNote: 'SEASONAL KITCHEN', title: 'Fire-led.', accent: 'Season-bound.', copy: 'An intimate neighbourhood dining room for flame-kissed plates, generous pours and evenings that deserve to run late.', detailLabel: 'TONIGHT', detail: 'Kitchen from 6:30', placeLabel: 'THE HOUSE', place: 'Indiranagar · Bengaluru' },
  },
  {
    name: 'Forest Risotto', note: 'Wild mushroom · thyme · pecorino', price: '₹680', image: '/dishes/forest-risotto.png', color: '#c0a878', index: '02',
    hero: { eyebrow: 'FORAGED NOTES · SLOW STIR', tag: 'FROM THE FOREST', tagNote: 'FINISHED AT THE TABLE', title: 'Earth-grown.', accent: 'Silken-slow.', copy: 'Woodland mushrooms, patient stirring and pecorino folded through at the final moment.', detailLabel: 'THE MOOD', detail: 'Earthy · deep · warm', placeLabel: 'THE FINISH', place: 'Thyme · pecorino' },
  },
  {
    name: 'Coconut Curry', note: 'Tofu · greens · toasted aromatics', price: '₹590', image: '/dishes/coconut-curry.png', color: '#e5a33d', index: '03',
    hero: { eyebrow: 'COASTAL WARMTH · HOUSE SPICE', tag: 'BRIGHT HEAT', tagNote: 'TOASTED AROMATICS', title: 'Sun-bright.', accent: 'Soul-warming.', copy: 'Coconut, garden greens and toasted spice come together in a bowl made for lingering.', detailLabel: 'THE MOOD', detail: 'Bright · fragrant · warm', placeLabel: 'THE BOWL', place: 'Plant-led · generous' },
  },
  {
    name: 'Ruby Burrata', note: 'Roasted beet · citrus · pistachio', price: '₹640', image: '/dishes/beet-burrata.png', color: '#af3d43', index: '04',
    hero: { eyebrow: 'GARDEN BRIGHT · MILK-CLOUD SOFT', tag: 'JEWEL TONES', tagNote: 'COOL & CREAMY', title: 'Ruby-bright.', accent: 'Soft-centred.', copy: 'Roasted beet, bright citrus and cool burrata—colour, cream and crunch on one plate.', detailLabel: 'THE MOOD', detail: 'Fresh · vivid · lush', placeLabel: 'THE FINISH', place: 'Citrus · pistachio' },
  },
  {
    name: 'Saffron Chicken', note: 'Charred chicken · fenugreek · cream', price: '₹760', image: '/dishes/butter-chicken.png', color: '#c66b2c', index: '05',
    hero: { eyebrow: 'OPEN FIRE · SAFFRON GLOW', tag: 'CHARRED FIRST', tagNote: 'SILKEN AFTER', title: 'Flame-charred.', accent: 'Saffron-soft.', copy: 'Fire-kissed chicken settles into a velvet sauce scented with fenugreek and saffron.', detailLabel: 'THE MOOD', detail: 'Smoky · rich · familiar', placeLabel: 'THE TABLE', place: 'Made for sharing' },
  },
  {
    name: 'After-dark Tiramisu', note: 'Mascarpone · coffee · dark cocoa', price: '₹420', image: '/dishes/tiramisu.png', color: '#8a674d', index: '06',
    hero: { eyebrow: 'COFFEE DARK · MIDNIGHT SWEET', tag: 'THE LAST COURSE', tagNote: 'ALWAYS WORTH IT', title: 'Save room.', accent: 'Stay awhile.', copy: 'Mascarpone, dark cocoa and coffee—the kind of ending that asks for one more conversation.', detailLabel: 'THE MOOD', detail: 'Soft · dark · bittersweet', placeLabel: 'ONE MORE', place: 'Coffee after dessert' },
  },
];

const menuPages = [
  {
    tab: 'Morning', eyebrow: 'Until 12 noon', title: 'Slow Mornings',
    items: [
      ['Croissant Benedict', 'Poached egg, spinach, smoked hollandaise', '460'],
      ['Charred Avocado Tartine', 'Sourdough, whipped feta, chilli crisp', '420'],
      ['Cinnamon Brioche', 'Vanilla cream, poached pear, almond', '380'],
      ['House Granola', 'Coconut yoghurt, seasonal fruit, raw honey', '340'],
    ],
    quote: 'Good mornings begin at the table.'
  },
  {
    tab: 'All day', eyebrow: 'From noon', title: 'The Main Table',
    items: [
      ['Ember Rigatoni', 'Slow tomato, basil, aged parmesan', '620'],
      ['Forest Risotto', 'Wild mushroom, thyme, pecorino', '680'],
      ['Saffron Chicken', 'Charred chicken, fenugreek, cream', '760'],
      ['Coconut Curry', 'Tofu, greens, toasted aromatics', '590'],
    ],
    quote: 'Cooked slowly. Shared generously.'
  },
  {
    tab: 'Sweet', eyebrow: 'Save some room', title: 'A Sweet Finish',
    items: [
      ['After-dark Tiramisu', 'Mascarpone, coffee, dark cocoa', '420'],
      ['Burnt Basque', 'Sea salt, citrus compote', '450'],
      ['Olive Oil Cake', 'Rosemary sugar, vanilla crème fraîche', '390'],
      ['Chocolate Délice', 'Hazelnut praline, malt ice cream', '480'],
    ],
    quote: 'One last lovely thing.'
  },
  {
    tab: 'Drinks', eyebrow: 'From the bar', title: 'Pour & Pause',
    items: [
      ['Oak Smoked Old Fashioned', 'Bourbon, jaggery, orange bitters', '640'],
      ['Garden Highball', 'Basil, cucumber, elderflower, tonic', '520'],
      ['Single Origin Pour-over', 'Rotating Indian micro-lots', '280'],
      ['Wild Kombucha', 'Seasonal fruit, house culture', '260'],
    ],
    quote: 'Stay for another pour.'
  },
];

function Logo({ light = false }: { light?: boolean }) {
  return <a className={`logo ${light ? 'logo-light' : ''}`} href="#top" aria-label="Ember and Oak home">
    <span className="logo-mark"><i /><i /><i /></span>
    <span>Ember <b>&</b> Oak<small>RESTAURANT · CAFÉ</small></span>
  </a>;
}

function Intro({ done }: { done: () => void }) {
  const [progress, setProgress] = useState(0);
  const [exiting, setExiting] = useState(false);
  const ending = useRef(false);
  const exitTimer = useRef<number | undefined>(undefined);
  const finish = () => {
    if (ending.current) return;
    ending.current = true;
    setProgress(100);
    setExiting(true);
    exitTimer.current = window.setTimeout(done, 920);
  };
  useEffect(() => {
    const started = performance.now();
    let frame = 0;
    const load = (now: number) => {
      const value = Math.min(100, Math.round(((now - started) / 1900) * 100));
      setProgress(value);
      if (value < 100) frame = requestAnimationFrame(load);
      else finish();
    };
    frame = requestAnimationFrame(load);
    return () => { cancelAnimationFrame(frame); if (exitTimer.current) window.clearTimeout(exitTimer.current); };
  }, []);
  return <button className={`intro ${exiting ? 'is-exiting' : ''}`} onClick={finish} aria-label={`Loading Ember and Oak, ${progress}%`}>
    <div className="intro-glow" />
    <div className="intro-content">
      <Logo light />
      <p>Where fire meets flavour.</p>
      <span className="intro-line" />
      <small>PREPARING YOUR TABLE</small>
      <span className="intro-credit">by <b>Brandex Media</b></span>
    </div>
    <div className="intro-loader" aria-hidden="true"><span>{String(progress).padStart(3, '0')}</span><i><b style={{ width: `${progress}%` }} /></i><em>100</em></div>
  </button>;
}

function ThreeScene() {
  const mount = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (!mount.current) return;
    const el = mount.current;
    let disposed = false;
    let teardown = () => {};
    import('three').then((THREE) => {
    if (disposed) return;
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, el.clientWidth / el.clientHeight, 0.1, 100);
    camera.position.z = 8;
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'high-performance' });
    renderer.setPixelRatio(Math.min(devicePixelRatio, 1.6));
    renderer.setSize(el.clientWidth, el.clientHeight);
    el.appendChild(renderer.domElement);

    const group = new THREE.Group();
    scene.add(group);
    const mat = new THREE.MeshBasicMaterial({ color: 0xd87a4b, transparent: true, opacity: .12, wireframe: true });
    const ring = new THREE.Mesh(new THREE.TorusGeometry(2.9, .018, 8, 100), mat);
    ring.rotation.x = 1.15; ring.rotation.z = -.35; group.add(ring);
    const ring2 = new THREE.Mesh(new THREE.TorusGeometry(4.2, .012, 8, 120), mat.clone());
    ring2.rotation.x = .7; ring2.rotation.y = .5; group.add(ring2);
    const geo = new THREE.BufferGeometry();
    const positions = new Float32Array(120 * 3);
    for (let i = 0; i < positions.length; i += 3) {
      positions[i] = (Math.random() - .5) * 14;
      positions[i + 1] = (Math.random() - .5) * 10;
      positions[i + 2] = (Math.random() - .5) * 7;
    }
    geo.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    const particles = new THREE.Points(geo, new THREE.PointsMaterial({ color: 0xf1d7bd, size: .026, transparent: true, opacity: .38 }));
    scene.add(particles);
    let mx = 0, my = 0, id = 0;
    const pointer = (e: PointerEvent) => { mx = (e.clientX / innerWidth - .5) * .2; my = (e.clientY / innerHeight - .5) * .2; };
    window.addEventListener('pointermove', pointer, { passive: true });
    const tick = () => { group.rotation.z += .0008; group.rotation.x += (my - group.rotation.x) * .025; group.rotation.y += (mx - group.rotation.y) * .025; particles.rotation.y += .00025; renderer.render(scene, camera); id = requestAnimationFrame(tick); };
    tick();
    const resize = () => { camera.aspect = el.clientWidth / el.clientHeight; camera.updateProjectionMatrix(); renderer.setSize(el.clientWidth, el.clientHeight); };
    window.addEventListener('resize', resize);
    teardown = () => { cancelAnimationFrame(id); window.removeEventListener('resize', resize); window.removeEventListener('pointermove', pointer); renderer.dispose(); geo.dispose(); if (el.contains(renderer.domElement)) el.removeChild(renderer.domElement); };
    });
    return () => { disposed = true; teardown(); };
  }, []);
  return <div className="three-scene" ref={mount} aria-hidden="true" />;
}

function Header() {
  const [open, setOpen] = useState(false);
  return <header className="header">
    <Logo light />
    <nav className={open ? 'nav-open' : ''} aria-label="Main navigation">
      <a href="#menu" onClick={() => setOpen(false)}>Menu</a>
      <a href="#story" onClick={() => setOpen(false)}>Our story</a>
      <a href="#voices" onClick={() => setOpen(false)}>Voices</a>
      <a href="#visit" className="nav-cta" onClick={() => setOpen(false)}>Book a table <span>↗</span></a>
    </nav>
    <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label="Toggle menu" aria-expanded={open}><span /><span /></button>
  </header>;
}

function Hero() {
  const section = useRef<HTMLElement>(null);
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    let frame = 0;
    const onScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() => {
        if (!section.current) return;
        const rect = section.current.getBoundingClientRect();
        const total = section.current.offsetHeight - innerHeight;
        setProgress(Math.max(0, Math.min(1, -rect.top / total)));
      });
    };
    onScroll(); window.addEventListener('scroll', onScroll, { passive: true });
    return () => { cancelAnimationFrame(frame); window.removeEventListener('scroll', onScroll); };
  }, []);
  // Let the final dish settle and hold before the sticky hero releases.
  // Clamping the position (rather than only the index) prevents dish six from
  // animating toward a non-existent seventh item at the end of the section.
  // Complete the dish sequence before the menu starts rising over the hero.
  // The final 24% is a composed hold on dish six for a clean section handoff.
  const dishPosition = Math.min(
    dishes.length - 1,
    (progress / 0.76) * (dishes.length - 1),
  );
  const active = Math.floor(dishPosition);
  const local = dishPosition - active;
  const hero = dishes[active].hero;
  return <section className="hero-scroll" id="top" ref={section}>
    <div className="hero-sticky">
      <ThreeScene />
      <Header />
      <div className="hero-copy hero-copy-swap" key={active}>
        <div className="hero-editorial">
          <p className="kicker"><span /> {hero.eyebrow}</p>
          <small>{hero.tag}<br />{hero.tagNote}</small>
        </div>
        <h1><span>{hero.title}</span><br /><em>{hero.accent}</em></h1>
        <p className="hero-lead">{hero.copy}</p>
        <div className="hero-actions">
          <a href="#menu" className="hero-primary">Explore the menu <b>↘</b></a>
          <a href="#visit" className="hero-secondary">Reserve a table <span>↗</span></a>
        </div>
        <div className="hero-service" aria-label="Restaurant details">
          <div><small>{hero.detailLabel}</small><strong>{hero.detail}</strong></div>
          <i />
          <div><small>{hero.placeLabel}</small><strong>{hero.place}</strong></div>
        </div>
      </div>
      <div className="dish-stage" style={{ '--dish-accent': dishes[active].color } as React.CSSProperties}>
        <div className="dish-orbit" />
        {dishes.map((dish, i) => {
          const diff = i - (active + local);
          const visible = Math.abs(diff) < 2.2;
          return <div className="dish-item" key={dish.name} style={{
            opacity: visible ? Math.max(.05, 1 - Math.abs(diff) * .68) : 0,
            transform: `translate3d(${diff * 17}px, ${diff * 74}px, ${-Math.abs(diff) * 150}px) scale(${Math.max(.62, 1 - Math.abs(diff) * .23)}) rotate(${diff * -5}deg)`,
            zIndex: 20 - Math.round(Math.abs(diff) * 2),
          }}>
            <img src={dish.image} alt={dish.name} draggable="false" />
          </div>;
        })}
        <div className="dish-meta" key={active}>
          <span>{dishes[active].index} / 06</span>
          <h2>{dishes[active].name}</h2>
          <p>{dishes[active].note}</p>
          <b>{dishes[active].price}</b>
        </div>
        <div className="progress-dots" aria-label={`Dish ${active + 1} of 6`}>
          {dishes.map((_, i) => <i className={i === active ? 'active' : ''} key={i} />)}
        </div>
      </div>
      <div className="scroll-hint"><span>SCROLL TO TASTE</span><i /></div>
      <div className="hero-count">{String(active + 1).padStart(2, '0')}<small>/06</small></div>
    </div>
  </section>;
}

function MenuBook() {
  const [page, setPage] = useState(1);
  const [turning, setTurning] = useState(false);
  const [turnTarget, setTurnTarget] = useState(1);
  const [turnDirection, setTurnDirection] = useState<'next' | 'prev'>('next');
  const current = menuPages[page];

  const turnTo = (target: number, direction?: 'next' | 'prev') => {
    if (turning || target === page) return;
    const dir = direction ?? (target > page ? 'next' : 'prev');
    setTurnTarget(target);
    setTurnDirection(dir);
    setTurning(true);
    window.setTimeout(() => setPage(target), 340);
    window.setTimeout(() => setTurning(false), 760);
  };

  const leftPage = (data: typeof current, pageIndex: number, extraClass = '') => <div className={`paper paper-left ${extraClass}`}>
    <span className="page-no">{String(pageIndex * 2 + 1).padStart(2, '0')}</span>
    <div><p className="book-eyebrow">{data.eyebrow}</p><h3>{data.title}</h3></div>
    <blockquote>“{data.quote}”</blockquote>
    <div className="botanical" aria-hidden="true"><i /><i /><i /><i /></div>
    <small>EMBER & OAK · SEASON {new Date().getFullYear()}</small>
  </div>;

  const rightPage = (data: typeof current, pageIndex: number, extraClass = '') => <div className={`paper paper-right ${extraClass}`}>
    <span className="page-no">{String(pageIndex * 2 + 2).padStart(2, '0')}</span>
    <p className="book-eyebrow">Selection</p>
    <div className="menu-list">
      {data.items.map(([name, desc, price]) => <article key={name}><div><h4>{name}</h4><p>{desc}</p></div><span>₹{price}</span></article>)}
    </div>
    <p className="diet-note">V vegetarian · VG vegan · Please tell us about any allergies.</p>
  </div>;

  return <section className="menu-section" id="menu">
    <div className="section-heading centered" data-reveal="up">
      <p className="kicker dark"><span /> FROM OUR KITCHEN</p>
      <h2>A menu made to<br /><em>be explored.</em></h2>
      <p>Turn the page, find a new favourite.</p>
    </div>
    <div className="book-wrap" data-reveal="scale">
      <div className="book-tabs" role="tablist" aria-label="Menu categories">
        {menuPages.map((p, i) => <button role="tab" aria-selected={page === i} disabled={turning} className={page === i ? 'active' : ''} onClick={() => turnTo(i)} key={p.tab}>{p.tab}</button>)}
      </div>
      <div className={`book ${turning ? 'is-turning' : ''}`}>
        {leftPage(current, page)}
        <div className="book-spine" />
        {rightPage(current, page)}
        {turning && <div className={`turn-sheet turn-${turnDirection}`} aria-hidden="true">
          <div className="turn-face turn-front">{turnDirection === 'next' ? rightPage(menuPages[page], page, 'turn-paper') : leftPage(menuPages[page], page, 'turn-paper')}</div>
          <div className="turn-face turn-back">{turnDirection === 'next' ? leftPage(menuPages[turnTarget], turnTarget, 'turn-paper') : rightPage(menuPages[turnTarget], turnTarget, 'turn-paper')}</div>
        </div>}
      </div>
      <div className="book-controls">
        <button disabled={turning} onClick={() => turnTo((page + 3) % 4, 'prev')} aria-label="Previous menu page">←</button>
        <span>{page + 1} / 4</span>
        <button disabled={turning} onClick={() => turnTo((page + 1) % 4, 'next')} aria-label="Next menu page">→</button>
      </div>
    </div>
  </section>;
}

const sources = [
  ['Nandi Hills', 'Leaf, herbs & flowers', '48 km'],
  ['Chikmagalur', 'Single-origin coffee', '242 km'],
  ['Hoskote', 'Cultured dairy', '31 km'],
  ['Our kitchen', 'Bread, stocks & ferments', 'Daily'],
];

function Story() {
  return <>
    <section className="story" id="story">
      <span className="story-chapter">03 — THE HOUSE</span>
      <div className="story-visual" data-reveal="left">
        <div className="arch arch-1"><img src="/dishes/beet-burrata.png" alt="Ruby burrata bowl" /></div>
        <div className="arch arch-2"><img src="/dishes/forest-risotto.png" alt="Forest mushroom risotto bowl" /></div>
        <span className="seal">EST.<b>2021</b>INDIA</span>
      </div>
      <div className="story-copy" data-reveal="right">
        <p className="kicker dark"><span /> A NOTE FROM THE KITCHEN</p>
        <h2>Fire, season<br /><em>& instinct.</em></h2>
        <p className="story-dek">“We cook the way we like to eat: with generosity, a little smoke, and ingredients that still taste of where they came from.”</p>
        <div className="chef-signature"><span>Arjun Mehra</span><small>CHEF & CO-FOUNDER</small></div>
        <a className="dark-link" href="#visit">Meet us at the table <span>↗</span></a>
      </div>
    </section>
    <section className="provenance">
      <div className="provenance-intro" data-reveal="left">
        <p className="kicker"><span /> SEASON & SOURCE</p>
        <h2>From close by.<br /><em>Chosen well.</em></h2>
        <p>Our chalkboard changes with the farms. These are the people and places shaping today’s table.</p>
        <div className="provenance-plate"><img src="/dishes/coconut-curry.png" alt="Seasonal coconut curry" /><span>THIS SEASON<br /><b>06</b> NEW PLATES</span></div>
      </div>
      <div className="source-ledger" data-reveal="right">
        <div className="ledger-head"><span>ORIGIN</span><span>ON OUR TABLE</span><span>DISTANCE</span></div>
        {sources.map(([origin, produce, distance], index) => <article style={{ '--reveal-delay': `${index * 90}ms` } as React.CSSProperties} key={origin}>
          <span className="source-index">0{index + 1}</span><h3>{origin}</h3><p>{produce}</p><b>{distance}</b>
        </article>)}
        <div className="house-rituals">
          <span><b>36h</b> sourdough</span><span><b>12</b> seasonal pours</span><span><b>0</b> shortcuts</span>
        </div>
      </div>
    </section>
  </>;
}

const reviews = [
  ['“The kind of place you recommend before dessert has even arrived.”', 'Aanya S.', 'Local guide · 5.0'],
  ['“Beautifully considered food, but the warmth is what brings us back.”', 'Rohan & Mira', 'Regulars · 5.0'],
  ['“That rare balance of creative, comforting and completely unpretentious.”', 'Table & Travel', 'City edit · 5.0'],
];

function Voices() {
  const [active, setActive] = useState(0);
  return <section className="voices" id="voices">
    <span className="voices-chapter">04 — GUEST BOOK</span>
    <div className="voices-top" data-reveal="up">
      <div><p className="kicker"><span /> NOTES LEFT AT THE TABLE</p><h2>Good evenings<br /><em>travel far.</em></h2></div>
      <div className="rating"><strong>4.9</strong><span>★★★★★</span><small>1,200+ VERIFIED GUESTS</small></div>
    </div>
    <div className="review-layout" data-reveal="scale">
      <div className="review-dish"><img src="/dishes/tiramisu.png" alt="After-dark tiramisu" /><span>DESSERT, ALWAYS.</span></div>
      <div className="review-stage">
      {reviews.map((r, i) => <article key={r[1]} className={i === active ? 'active' : ''} style={{ transform: `translateX(${(i - active) * 106}%) rotate(${(i - active) * 3}deg)` }}>
        <span className="quote-mark">“</span><small className="review-number">0{i + 1} / 03</small><blockquote>{r[0]}</blockquote><div><b>{r[1]}</b><small>{r[2]}</small></div>
      </article>)}
      </div>
    </div>
    <div className="review-controls"><button onClick={() => setActive((active + 2) % 3)}>←</button><div>{reviews.map((_, i) => <i className={active === i ? 'active' : ''} key={i} />)}</div><button onClick={() => setActive((active + 1) % 3)}>→</button></div>
  </section>;
}

function Visit() {
  const tomorrow = new Date(Date.now() + 86400000).toISOString().slice(0, 10);
  const [requestReady, setRequestReady] = useState(false);
  return <footer id="visit">
    <div className="booking-card" data-reveal="scale">
      <div className="booking-title"><span>RESERVATIONS</span><h3>Find your table</h3><p>Dinner, drinks, or a slow Sunday lunch.</p></div>
      <form onSubmit={(event) => { event.preventDefault(); setRequestReady(true); }}>
        <label><span>PARTY SIZE</span><select aria-label="Party size"><option>2 guests</option><option>3 guests</option><option>4 guests</option><option>5 guests</option><option>6+ guests</option></select></label>
        <label><span>DATE</span><input aria-label="Reservation date" type="date" defaultValue={tomorrow} min={tomorrow} /></label>
        <label><span>TIME</span><select aria-label="Reservation time"><option>7:00 PM</option><option>7:30 PM</option><option>8:00 PM</option><option>8:30 PM</option><option>9:00 PM</option></select></label>
        <button type="submit">{requestReady ? 'Request ready ✓' : 'Check a table'} <span>↗</span></button>
      </form>
      {requestReady && <p className="booking-note" role="status">Call <a href="tel:+919876543210">+91 98765 43210</a> to confirm this table.</p>}
    </div>
    <div className="visit-main" data-reveal="up">
      <div className="visit-copy"><p className="kicker"><span /> THE LAST COURSE</p><h2>Come hungry.<br /><em>Leave glowing.</em></h2><p className="visit-note">Walk-ins are always welcome at the bar.</p></div>
      <div className="visit-details">
        <div><small>FIND US</small><p>42 Banyan Lane<br />Indiranagar, Bengaluru</p><a href="https://maps.google.com" target="_blank" rel="noreferrer">Get directions ↗</a></div>
        <div><small>OPEN</small><p>Mon–Thu · 8am–11pm<br />Fri–Sun · 8am–12am</p><a href="tel:+919876543210">+91 98765 43210</a></div>
      </div>
    </div>
    <div className="footer-bottom" data-reveal="up"><Logo light /><p>© {new Date().getFullYear()} Ember & Oak</p><div><a href="#top">Instagram</a><a href="#top">Privacy</a><a href="#top">Back to top ↑</a></div></div>
  </footer>;
}

export default function App() {
  const [intro, setIntro] = useState(true);
  useEffect(() => { document.body.style.overflow = intro ? 'hidden' : ''; return () => { document.body.style.overflow = ''; }; }, [intro]);
  useEffect(() => {
    document.documentElement.classList.add('motion-ready');
    const nodes = Array.from(document.querySelectorAll<HTMLElement>('[data-reveal]'));
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-visible');
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.16, rootMargin: '0px 0px -7% 0px' });
    nodes.forEach((node) => observer.observe(node));
    return () => { observer.disconnect(); document.documentElement.classList.remove('motion-ready'); };
  }, []);
  return <main>{intro && <Intro done={() => setIntro(false)} />}<Hero /><MenuBook /><Story /><Voices /><Visit /></main>;
}

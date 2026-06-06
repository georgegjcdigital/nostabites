// Nostabites — Combined app bundle
// All components in one file; no cross-script window exports needed.

// ScrollFX.jsx — scroll progress bar + section depth observer
function ScrollFX() {
  const [progress, setProgress] = React.useState(0);

  React.useEffect(() => {
    const onScroll = () => {
      const scrolled   = window.scrollY;
      const total      = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      {/* Gold progress line — sits at the bottom edge of the nav */}
      <div style={{
        position: 'fixed',
        top: '104px',          /* ticker 34px + nav 70px */
        left: 0,
        height: '2px',
        width: `${progress}%`,
        background: 'linear-gradient(to right, var(--green-500), var(--gold-400))',
        zIndex: 398,
        pointerEvents: 'none',
        transition: 'width 60ms linear',
      }} />
      {/* Glow dot at leading edge */}
      {progress > 1 && progress < 99.5 && (
        <div style={{
          position: 'fixed',
          top: '101px',
          left: `calc(${progress}% - 3px)`,
          width: '8px', height: '8px',
          borderRadius: '50%',
          background: 'var(--gold-400)',
          boxShadow: '0 0 10px 2px rgba(240,191,24,0.55)',
          zIndex: 399,
          pointerEvents: 'none',
          transition: 'left 60ms linear',
        }} />
      )}
    </>
  );
}

// Ticker.jsx — Premium scrolling announcement strip
const TICKER_ITEMS = [
  { text: 'Kozhukkatta', type: 'product' },
  { text: 'Homemade Daily', type: 'value' },
  { text: 'Pazhampori', type: 'product' },
  { text: 'No Preservatives', type: 'value' },
  { text: 'Cutlets', type: 'product' },
  { text: 'Pure Kerala Recipes', type: 'value' },
  { text: 'Sukiyan', type: 'product' },
  { text: 'Made with Love', type: 'value' },
  { text: '100% Fresh Ingredients', type: 'value' },
];

const SEP = (
  <svg width="5" height="5" viewBox="0 0 5 5" fill="var(--gold-400)" style={{ margin:'0 20px', opacity:0.7, flexShrink:0 }}>
    <circle cx="2.5" cy="2.5" r="2.5"/>
  </svg>
);

function Ticker() {
  const doubled = [...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <div style={{
      position: 'fixed',
      top: 0, left: 0, right: 0,
      height: '34px',
      zIndex: 500,
      background: 'var(--charcoal-900)',
      overflow: 'hidden',
      display: 'flex',
      alignItems: 'center',
      borderBottom: '1px solid rgba(240,191,24,0.12)',
    }}>
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          whiteSpace: 'nowrap',
          animation: 'nb-ticker 40s linear infinite',
          willChange: 'transform',
        }}
        onMouseEnter={e => e.currentTarget.style.animationPlayState = 'paused'}
        onMouseLeave={e => e.currentTarget.style.animationPlayState = 'running'}
      >
        {doubled.map((item, i) => (
          <React.Fragment key={i}>
            <span style={{
              fontFamily: 'var(--font-body)',
              fontSize: '10.5px',
              fontWeight: item.type === 'product' ? 700 : 500,
              letterSpacing: item.type === 'product' ? '0.14em' : '0.10em',
              textTransform: 'uppercase',
              color: item.type === 'product' ? 'var(--gold-300)' : 'var(--charcoal-300)',
              flexShrink: 0,
            }}>
              {item.text}
            </span>
            {SEP}
          </React.Fragment>
        ))}
      </div>
      <style>{`
        @keyframes nb-ticker {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </div>
  );
}

// Nav.jsx — Nostabites sticky navigation
const WA_LINK = "https://wa.me/919207575603?text=Hi%20Nostabites!%20I'd%20like%20to%20place%20an%20order.";

const WaIconNav = () => (
  <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor">
    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
  </svg>
);

function Nav() {
  const [scrolled, setScrolled] = React.useState(false);
  const [menuOpen, setMenuOpen] = React.useState(false);

  React.useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener('scroll', fn, { passive: true });
    return () => window.removeEventListener('scroll', fn);
  }, []);

  const links = ['Menu', 'About', 'Contact'];
  const navBase = {
    position: 'fixed', top: '34px', left: 0, right: 0,
    zIndex: 400,
    padding: '0 32px',
    background: scrolled ? 'rgba(254,252,248,0.94)' : 'rgba(254,252,248,0.75)',
    backdropFilter: 'blur(12px) saturate(140%)',
    boxShadow: scrolled ? '0 1px 0 rgba(26,16,4,0.07), 0 2px 12px rgba(26,16,4,0.06)' : 'none',
    transition: 'background 250ms ease, box-shadow 250ms ease',
  };

  return (
    <nav style={navBase}>
      <div style={{ maxWidth:'1200px', margin:'0 auto', height:'70px', display:'flex', alignItems:'center', justifyContent:'space-between' }}>
        <a href="#" style={{ display:'flex', alignItems:'center', textDecoration:'none' }}>
          <img src="./assets/logo-transparent.png" alt="Nostabites" style={{ height:'46px', width:'auto' }} />
        </a>
        <div style={{ display:'flex', gap:'36px', alignItems:'center' }}>
          {links.map(l => (
            <a key={l} href={`#${l.toLowerCase()}`}
              style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', fontWeight:500, color:'var(--charcoal-700)', textDecoration:'none', letterSpacing:'0.03em' }}
            >{l}</a>
          ))}
        </div>
        <a href={WA_LINK} target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:'7px', padding:'10px 22px', background:'var(--color-whatsapp)', color:'#fff', borderRadius:'9999px', fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', fontWeight:600, textDecoration:'none', letterSpacing:'0.03em', transition:'background 150ms ease' }}
          onMouseEnter={e => e.currentTarget.style.background='var(--color-whatsapp-hover)'}
          onMouseLeave={e => e.currentTarget.style.background='var(--color-whatsapp)'}
        >
          <WaIconNav /> Order Now
        </a>
      </div>
    </nav>
  );
}

// Hero.jsx — Cinematic hero with word-reveal, floating decorations, scroll parallax
const WA_LINK_HERO = "https://wa.me/919207575603?text=Hi%20Nostabites!%20I'd%20like%20to%20place%20an%20order.";

function RevealWord({ word, delay, italic, color, style: extraStyle }) {
  return (
    <span style={{ overflow:'hidden', display:'inline-block', verticalAlign:'bottom', ...extraStyle }}>
      <span style={{
        display: 'inline-block',
        animation: 'nb-word-rise 0.9s cubic-bezier(0.16, 1, 0.3, 1) both',
        animationDelay: delay,
        fontStyle: italic ? 'italic' : 'normal',
        color: color || 'inherit',
      }}>{word}</span>
    </span>
  );
}

function FloatDot({ x, y, size, color, duration, delay, shape }) {
  const animName = `nb-float-${Math.round(duration * 10)}`;
  return (
    <>
      <div style={{
        position:'absolute', left:x, top:y, width:size, height:size,
        borderRadius: shape==='leaf' ? '60% 40% 60% 40% / 60% 60% 40% 40%' : '50%',
        background: color, opacity:0, pointerEvents:'none',
        animation:`${animName} ${duration}s ease-in-out ${delay}s infinite, nb-float-fade ${duration}s ease-in-out ${delay}s infinite`,
        transform: shape==='leaf' ? 'rotate(35deg)' : 'none',
        willChange: 'transform, opacity',
      }}/>
      <style>{`
        @keyframes ${animName} {
          0%,100%{ transform:translateY(0)translateX(0)${shape==='leaf'?' rotate(35deg)':''}; }
          40%    { transform:translateY(-18px)translateX(6px)${shape==='leaf'?' rotate(45deg)':''}; }
          70%    { transform:translateY(-10px)translateX(-4px)${shape==='leaf'?' rotate(28deg)':''}; }
        }
        @keyframes nb-float-fade{0%,100%{opacity:0;}20%,80%{opacity:1;}}
      `}</style>
    </>
  );
}

const DOTS = [
  { x:'8%',  y:'18%', size:'7px',  color:'var(--green-400)',  duration:9,  delay:0.5 },
  { x:'92%', y:'25%', size:'10px', color:'var(--gold-400)',   duration:11, delay:1.2 },
  { x:'15%', y:'65%', size:'5px',  color:'var(--orange-400)',duration:8,  delay:2.1 },
  { x:'85%', y:'60%', size:'6px',  color:'var(--green-300)', duration:13, delay:0.8, shape:'leaf' },
  { x:'50%', y:'88%', size:'5px',  color:'var(--gold-300)',  duration:10, delay:1.6 },
  { x:'75%', y:'14%', size:'8px',  color:'var(--green-500)', duration:12, delay:3.0, shape:'leaf' },
  { x:'28%', y:'80%', size:'4px',  color:'var(--orange-300)',duration:7,  delay:0.3 },
  { x:'62%', y:'72%', size:'6px',  color:'var(--gold-400)',  duration:15, delay:2.5 },
];

function Hero() {
  const contentRef = React.useRef(null);

  // Scroll parallax — content gently rises and fades as page scrolls down
  React.useEffect(() => {
    const onScroll = () => {
      const el = contentRef.current;
      if (!el) return;
      const scrollY = window.scrollY;
      const vh = window.innerHeight;
      if (scrollY > vh) return;
      const progress = scrollY / vh;
      el.style.transform = `translateY(${scrollY * -0.12}px)`;
      el.style.opacity = String(Math.max(0, 1 - progress * 1.6));
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section id="home" style={{
      minHeight:'100vh',
      background:'radial-gradient(ellipse 120% 80% at 50% -5%, var(--cream-50) 0%, var(--cream-200) 100%)',
      display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'center',
      padding:'136px 32px 80px', textAlign:'center',
      position:'relative', overflow:'hidden',
    }}>
      {/* Ambient glows */}
      <div style={{ position:'absolute', top:'5%', right:'5%', width:'380px', height:'380px', borderRadius:'50%', background:'radial-gradient(circle,rgba(240,191,24,0.09) 0%,transparent 70%)', pointerEvents:'none' }}/>
      <div style={{ position:'absolute', bottom:'8%', left:'3%', width:'300px', height:'300px', borderRadius:'50%', background:'radial-gradient(circle,rgba(34,181,94,0.07) 0%,transparent 70%)', pointerEvents:'none' }}/>
      {DOTS.map((d,i) => <FloatDot key={i} {...d}/>)}

      {/* Content — scroll parallax applied here */}
      <div ref={contentRef} style={{ maxWidth:'840px', position:'relative', zIndex:1, willChange:'transform, opacity' }}>

        <p style={{ margin:'0 0 18px', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'var(--green-600)', animation:'nb-fade-up 0.7s var(--ease-out) 0.2s both' }}>
          Authentic Kerala · Homemade with Love
        </p>

        <div style={{ display:'flex', justifyContent:'center', marginBottom:'28px', animation:'nb-fade-up 0.5s ease 0.35s both' }}>
          <div style={{ height:'2px', width:'64px', background:'var(--gold-400)', borderRadius:'2px', transformOrigin:'left center', animation:'nb-line-draw 0.8s cubic-bezier(0.16,1,0.3,1) 0.5s both' }}/>
        </div>

        <h1 style={{ margin:'0 0 28px', fontFamily:'var(--font-display)', fontSize:'clamp(3.5rem,8vw,6rem)', fontWeight:600, lineHeight:1.02, letterSpacing:'-0.02em', color:'var(--charcoal-900)' }}>
          <span style={{ display:'block' }}>
            <RevealWord word="Nostalgia" delay="0.65s" style={{ marginRight:'0.22em' }}/>
            <RevealWord word="in" delay="0.82s"/>
          </span>
          <span style={{ display:'block' }}>
            <RevealWord word="Every" delay="1.0s" italic color="var(--green-600)" style={{ marginRight:'0.20em' }}/>
            <RevealWord word="Bite" delay="1.18s" italic color="var(--green-600)"/>
          </span>
        </h1>

        <p style={{ margin:'0 0 44px', fontFamily:'var(--font-body)', fontSize:'clamp(1rem,2vw,1.2rem)', fontWeight:400, lineHeight:1.7, color:'var(--charcoal-600)', maxWidth:'560px', marginLeft:'auto', marginRight:'auto', marginBottom:'44px', animation:'nb-fade-up 0.8s var(--ease-out) 1.4s both' }}>
          Premium homemade Kerala snacks — Kozhukkatta, Pazhampori, Cutlets and Sukiyan — crafted fresh with traditional recipes and pure ingredients.
        </p>

        <div style={{ display:'flex', gap:'14px', justifyContent:'center', flexWrap:'wrap', animation:'nb-fade-up 0.8s var(--ease-out) 1.65s both' }}>
          <a href="#menu"
            onClick={e=>{ e.preventDefault(); document.getElementById('menu')?.scrollIntoView({ behavior:'smooth' }); }}
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 32px', background:'var(--charcoal-900)', color:'#fff', borderRadius:'var(--radius-full)', fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', fontWeight:600, letterSpacing:'0.04em', textDecoration:'none', transition:'background 150ms ease' }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--charcoal-700)'}
            onMouseLeave={e=>e.currentTarget.style.background='var(--charcoal-900)'}
          >
            Explore Our Menu
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
          </a>
          <a href={WA_LINK_HERO} target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'14px 32px', background:'var(--color-whatsapp)', color:'#fff', borderRadius:'var(--radius-full)', fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', fontWeight:600, letterSpacing:'0.04em', textDecoration:'none', transition:'background 150ms ease' }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--color-whatsapp-hover)'}
            onMouseLeave={e=>e.currentTarget.style.background='var(--color-whatsapp)'}
          >
            <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Order on WhatsApp
          </a>
        </div>

        <div style={{ display:'flex', justifyContent:'center', gap:'40px', marginTop:'56px', flexWrap:'wrap', animation:'nb-fade-up 0.8s var(--ease-out) 1.9s both' }}>
          {[['100%','Homemade'],['Fresh','Daily'],['Pure','Ingredients']].map(([top,bottom]) => (
            <div key={top} style={{ textAlign:'center' }}>
              <div style={{ fontFamily:'var(--font-display)', fontSize:'1.7rem', fontWeight:600, color:'var(--green-600)', lineHeight:1 }}>{top}</div>
              <div style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:700, letterSpacing:'0.12em', textTransform:'uppercase', color:'var(--charcoal-400)', marginTop:'5px' }}>{bottom}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ position:'absolute', bottom:'28px', left:'50%', transform:'translateX(-50%)', animation:'nb-fade-up 1s ease 2.2s both' }}>
        <div style={{ width:'1px', height:'44px', background:'linear-gradient(to bottom,transparent,var(--cream-400))', borderRadius:'1px', margin:'0 auto' }}/>
      </div>

      <style>{`
        @keyframes nb-word-rise { from{transform:translateY(110%);opacity:0;} to{transform:translateY(0);opacity:1;} }
        @keyframes nb-line-draw { from{transform:scaleX(0);opacity:0;} to{transform:scaleX(1);opacity:1;} }
        @keyframes nb-fade-up   { from{opacity:0;transform:translateY(20px);} to{opacity:1;transform:translateY(0);} }
      `}</style>
    </section>
  );
}

// Products.jsx — Our Specialties product grid
const PRODUCTS = [
  { name:'Kozhukkatta', traditional:'കൊഴുക്കട്ട', desc:'Steamed rice flour dumplings filled with freshly grated coconut and dark jaggery.', badge:'Homemade', badgeVariant:'homemade', featured:true, img:'./assets/products/kozhukkatta.png' },
  { name:'Pazhampori', traditional:'Banana Fritters', desc:'Ripe banana slices in a light spiced batter, deep-fried to a crispy golden finish.', badge:'Bestseller', badgeVariant:'bestseller', img:'./assets/products/pazhampori.png' },
  { name:'Cutlets', traditional:'Homemade Cutlets', desc:'Spiced chicken or vegetable patties with a crisp golden crumb — a Kerala teatime classic.', badge:'Fresh Today', badgeVariant:'fresh', img:'./assets/products/cutlets.png' },
  { name:'Sukiyan', traditional:'സുഖിയൻ', desc:'Sweet deep-fried fritters with a spiced coconut and green gram filling — a beloved Kerala teatime treat.', badge:'Homemade', badgeVariant:'homemade', img:'./assets/products/sukiyan.png' },
];

function ProductItem({ product }) {
  const [hovered, setHovered] = React.useState(false);
  const cardRef = React.useRef(null);

  const handleMouseMove = React.useCallback((e) => {
    const el = cardRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width  - 0.5;   // -0.5 → 0.5
    const y = (e.clientY - rect.top)  / rect.height - 0.5;
    const rX = -y * 9;    // max ±9° pitch
    const rY =  x * 9;    // max ±9° yaw
    const sX = -x * 16;   // shadow offset follows tilt
    const sY = -y * 10;
    el.style.transition = 'box-shadow 80ms ease, border-color 250ms ease';
    el.style.transform  = `perspective(900px) rotateX(${rX}deg) rotateY(${rY}deg) translateZ(10px)`;
    el.style.boxShadow  = `${sX}px ${sY}px 36px rgba(26,16,4,0.13), 0 8px 32px rgba(26,16,4,0.09)`;
  }, []);

  const handleMouseLeave = React.useCallback(() => {
    const el = cardRef.current;
    if (!el) return;
    el.style.transition = 'transform 350ms cubic-bezier(0.34,1.56,0.64,1), box-shadow 350ms ease, border-color 250ms ease';
    el.style.transform  = 'perspective(900px) rotateX(0deg) rotateY(0deg) translateZ(0)';
    el.style.boxShadow  = '';
    setHovered(false);
  }, []);

  return (
    <article
      ref={cardRef}
      onMouseEnter={() => setHovered(true)}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        background:'var(--cream-50)', borderRadius:'var(--radius-xl)',
        border: product.featured ? '2px solid var(--gold-400)' : `1px solid ${hovered ? 'var(--cream-300)' : 'var(--cream-200)'}`,
        boxShadow: 'var(--shadow-card)',
        overflow:'hidden',
        transition:'border-color 250ms ease',
        display:'flex', flexDirection:'column',
        willChange:'transform',
        cursor:'default',
      }}
    >
      {/* Image */}
      <div style={{ position:'relative', paddingBottom:'65%', background: product.img ? 'var(--cream-200)' : product.bg, overflow:'hidden' }}>
        <div style={{ position:'absolute', inset:0, display:'flex', alignItems:'center', justifyContent:'center' }}>
          {product.img ? (
            <img src={product.img} alt={product.name} style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center', display:'block', transition:'transform 400ms ease' }}
              onMouseEnter={e => e.currentTarget.style.transform='scale(1.04)'}
              onMouseLeave={e => e.currentTarget.style.transform='scale(1)'}
            />
          ) : (
            <svg width="60" height="60" viewBox="0 0 60 60" fill="none" opacity="0.25">
              <circle cx="30" cy="30" r="26" fill="white"/>
              <path d="M18 30 Q30 16 42 30 Q30 44 18 30Z" fill="white"/>
            </svg>
          )}
        </div>
        {product.badge && (
          <div style={{ position:'absolute', top:'12px', left:'12px', padding:'4px 10px', background:'rgba(255,255,255,0.92)', backdropFilter:'blur(4px)', borderRadius:'9999px', fontSize:'10px', fontFamily:'var(--font-body)', fontWeight:700, letterSpacing:'0.06em', textTransform:'uppercase', color: product.badgeVariant === 'bestseller' ? 'var(--gold-600)' : product.badgeVariant === 'fresh' ? 'var(--orange-600)' : 'var(--green-700)' }}>
            {product.badge}
          </div>
        )}
      </div>
      {/* Content */}
      <div style={{ padding:'20px', display:'flex', flexDirection:'column', gap:'8px', flex:1 }}>
        <div>
          <h3 style={{ margin:0, fontFamily:'var(--font-display)', fontSize:'1.4rem', fontWeight:600, color:'var(--charcoal-900)', lineHeight:1.1, letterSpacing:'-0.01em' }}>{product.name}</h3>
          <p style={{ margin:'3px 0 0', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:600, letterSpacing:'0.1em', textTransform:'uppercase', color:'var(--charcoal-400)' }}>{product.traditional}</p>
        </div>
        <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-600)', lineHeight:1.6, flex:1 }}>{product.desc}</p>
        <div style={{ display:'flex', alignItems:'center', justifyContent:'space-between', paddingTop:'12px', borderTop:'1px solid var(--cream-200)', marginTop:'auto' }}>
          <div>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-md)', fontWeight:700, color:'var(--charcoal-900)' }}>{product.price}</span>
            <span style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-xs)', color:'var(--charcoal-400)', marginLeft:'3px' }}>{product.unit}</span>
          </div>
          <a href="https://wa.me/919207575603" target="_blank" rel="noopener noreferrer"
            style={{ display:'inline-flex', alignItems:'center', gap:'5px', padding:'8px 14px', background:'var(--color-whatsapp)', color:'#fff', borderRadius:'9999px', fontSize:'12px', fontFamily:'var(--font-body)', fontWeight:600, textDecoration:'none', transition:'background 150ms ease' }}
            onMouseEnter={e=>e.currentTarget.style.background='var(--color-whatsapp-hover)'}
            onMouseLeave={e=>e.currentTarget.style.background='var(--color-whatsapp)'}
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
            Enquire
          </a>
        </div>
      </div>
    </article>
  );
}

function Products() {
  return (
    <section id="menu" style={{ padding:'96px 32px', background:'#fff' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div className="nb-reveal" style={{ textAlign:'center', marginBottom:'56px' }}>
          <p style={{ margin:'0 0 10px', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700, letterSpacing:'0.16em', textTransform:'uppercase', color:'var(--green-600)' }}>Our Specialties</p>
          <h2 style={{ margin:'0 0 16px', fontFamily:'var(--font-display)', fontSize:'clamp(2.2rem, 5vw, 3.4rem)', fontWeight:600, color:'var(--charcoal-900)', lineHeight:1.05, letterSpacing:'-0.02em' }}>Handcrafted, Every Day</h2>
          <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-base)', color:'var(--charcoal-500)', lineHeight:1.7, maxWidth:'540px', marginLeft:'auto', marginRight:'auto' }}>Each snack is made fresh in small batches using traditional Kerala recipes. No preservatives. No shortcuts. Just pure homemade goodness.</p>
        </div>
        <div style={{ display:'grid', gridTemplateColumns:'repeat(2, 1fr)', gap:'24px', maxWidth:'860px', margin:'0 auto' }}>
          {PRODUCTS.map((p, i) => (
            <div key={p.name} className={`nb-reveal nb-reveal-d${Math.min(i+1,6)}`}>
              <ProductItem product={p} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// About.jsx — Brand story + trust signals with scroll parallax
const FEATURES = [
  { title:'Traditional Recipes', body:'Passed down through generations of Kerala families. Every recipe carries the wisdom of our mothers and grandmothers.' },
  { title:'No Preservatives', body:'We prepare only what we can deliver fresh. No chemical preservatives, no artificial colours — ever.' },
  { title:'Pure Ingredients', body:'Freshly grated coconut, cold-pressed coconut oil, unrefined jaggery and sun-dried spices from Kerala\'s finest farms.' },
  { title:'Hygienically Packed', body:'Each batch is made in a clean kitchen and packed with care, ensuring it arrives fresh and ready to savour.' },
];

function About() {
  const sectionRef = React.useRef(null);
  const leftRef    = React.useRef(null);
  const rightRef   = React.useRef(null);

  React.useEffect(() => {
    const onScroll = () => {
      const sec = sectionRef.current;
      if (!sec) return;
      const rect = sec.getBoundingClientRect();
      const vh   = window.innerHeight;
      if (rect.bottom < 0 || rect.top > vh) return;
      const prog   = (vh - rect.top) / (vh + rect.height);
      const offset = (prog - 0.5) * 50;
      if (leftRef.current)  leftRef.current.style.transform  = `translateY(${offset * 0.35}px)`;
      if (rightRef.current) rightRef.current.style.transform = `translateY(${-offset * 0.25}px)`;
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <section ref={sectionRef} id="about" style={{ background:'var(--cream-200)', padding:'0 0 80px' }}>

      {/* ── Full-bleed lifestyle image ───────────────────── */}
      <div style={{ position:'relative', height:'480px', overflow:'hidden' }}>
        <img
          src="./assets/products/lifestyle-chai.png"
          alt="Pazhampori and Kerala chai on an evening table"
          style={{ width:'100%', height:'100%', objectFit:'cover', objectPosition:'center 40%', display:'block', transform:'scale(1.04)', transition:'transform 8s ease-out' }}
          onLoad={e => e.currentTarget.style.transform='scale(1)'}
        />
        {/* Warm dark overlay */}
        <div style={{ position:'absolute', inset:0, background:'linear-gradient(to bottom, rgba(26,16,4,0.22) 0%, rgba(26,16,4,0.55) 60%, rgba(26,16,4,0.78) 100%)' }}/>
        {/* Text overlay */}
        <div className="nb-reveal" style={{ position:'absolute', inset:0, display:'flex', flexDirection:'column', alignItems:'center', justifyContent:'flex-end', padding:'0 32px 56px', textAlign:'center' }}>
          <p style={{ margin:'0 0 10px', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700, letterSpacing:'0.18em', textTransform:'uppercase', color:'rgba(240,191,24,0.9)' }}>Our Story</p>
          <h2 style={{ margin:'0 0 16px', fontFamily:'var(--font-display)', fontSize:'clamp(2.4rem,6vw,4rem)', fontWeight:600, fontStyle:'italic', color:'#fff', lineHeight:1.08, letterSpacing:'-0.02em', textShadow:'0 2px 24px rgba(0,0,0,0.3)' }}>
            Some tastes never leave you.
          </h2>
          <div style={{ width:'48px', height:'2px', background:'var(--gold-400)', borderRadius:'2px' }}/>
        </div>
      </div>

      <div style={{ maxWidth:'1100px', margin:'0 auto', padding:'72px 32px 0' }}>

        {/* ── Memory lead ─────────────────────────────────── */}
        <div className="nb-reveal" style={{ textAlign:'center', marginBottom:'64px' }}>
          <p style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-base)', color:'var(--charcoal-600)', lineHeight:1.85, maxWidth:'720px', margin:'0 auto', textWrap:'pretty' }}>
            The smell of <em>Pazham Pori</em> frying in the kitchen on a rainy evening. The soft sweetness of <em>Kozhukkatta</em> — steamed rice dumplings with coconut and jaggery. The comfort of <em>Ila Ada</em> wrapped in banana leaf. The first bite of a warm <em>Sukhiyan</em> after school. The homemade <em>Cutlet</em> shared during family visits, church gatherings, festivals, and evening tea.
          </p>
          <p style={{ fontFamily:'var(--font-display)', fontSize:'1.55rem', fontWeight:500, fontStyle:'italic', color:'var(--charcoal-700)', lineHeight:1.4, maxWidth:'620px', margin:'28px auto 0', textWrap:'pretty' }}>
            For many of us, these are not just snacks. They are memories of Kerala.
          </p>
        </div>

        {/* ── Two-column: Story + Features ────────────────── */}
        <div style={{ display:'grid', gridTemplateColumns:'1fr 1fr', gap:'72px', alignItems:'start' }}>

          {/* Left — full story */}
          <div ref={leftRef} style={{ willChange:'transform', transition:'transform 0.1s linear' }}>
            <div className="nb-reveal" style={{ display:'flex', flexDirection:'column', gap:'18px' }}>
              <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-600)', lineHeight:1.85, textWrap:'pretty' }}>
                They remind us of our mothers, grandmothers, busy kitchens, steel plates, evening tea, monsoon rain, family laughter, and the simple joy of eating something made with love.
              </p>
              <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-600)', lineHeight:1.85, textWrap:'pretty' }}>
                <strong style={{ color:'var(--charcoal-800)', fontWeight:600 }}>Nostabites was born from that feeling.</strong> What started in a home kitchen as a mother's passion for preparing authentic Kerala snacks soon became something people kept asking for again and again — not only because they tasted delicious, but because they tasted <em>familiar</em>. They carried the warmth of home.
              </p>
              <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-600)', lineHeight:1.85, textWrap:'pretty' }}>
                The name <strong style={{ color:'var(--green-700)', fontWeight:600 }}>Nostabites</strong> comes from <em>nostalgia</em> and <em>bites</em>. It reflects our promise to bring back the flavours we grew up loving — prepared with care, quality ingredients, and traditional recipes.
              </p>
              <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-600)', lineHeight:1.85, textWrap:'pretty' }}>
                Every Cutlet, Kozhukkatta, Ila Ada, Sukhiyan and Pazham Pori is made to remind you of the Kerala you know, the home you miss, and the love that only homemade food can carry.
              </p>
              <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-600)', lineHeight:1.85, textWrap:'pretty' }}>
                Whether you are in Kerala, away from home, or discovering these flavours for the first time — Nostabites is here to give you more than a snack.
              </p>
            </div>

            {/* Closing poetic lines */}
            <div className="nb-reveal" style={{ marginTop:'32px', padding:'24px 28px', borderLeft:'3px solid var(--gold-400)', background:'rgba(255,255,255,0.55)', borderRadius:'0 var(--radius-md) var(--radius-md) 0' }}>
              <p style={{ margin:0, fontFamily:'var(--font-display)', fontSize:'1.45rem', fontWeight:500, fontStyle:'italic', color:'var(--charcoal-700)', lineHeight:1.55 }}>
                "A bite of memory.<br/>A bite of home.<br/>A bite of Kerala."
              </p>
              <p style={{ margin:'14px 0 0', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--green-600)' }}>
                Nostabites — Nostalgia in every bite
              </p>
            </div>
          </div>

          {/* Right — features */}
          <div ref={rightRef} style={{ display:'flex', flexDirection:'column', gap:'20px', willChange:'transform', transition:'transform 0.1s linear' }}>
            {FEATURES.map((f, i) => (
              <div key={f.title} className={`nb-reveal nb-reveal-d${i+1}`}
                style={{ display:'flex', gap:'16px', alignItems:'flex-start', background:'rgba(255,255,255,0.7)', padding:'20px 22px', borderRadius:'var(--radius-lg)', border:'1px solid rgba(255,255,255,0.9)', boxShadow:'var(--shadow-xs)' }}
              >
                <div style={{ width:'38px', height:'38px', borderRadius:'var(--radius-md)', background:'var(--green-100)', display:'flex', alignItems:'center', justifyContent:'center', flexShrink:0 }}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="var(--green-600)" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12"></polyline>
                  </svg>
                </div>
                <div>
                  <h4 style={{ margin:'0 0 5px', fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', fontWeight:700, color:'var(--charcoal-900)', letterSpacing:'-0.01em' }}>{f.title}</h4>
                  <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-500)', lineHeight:1.65 }}>{f.body}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// WhatsAppCTA.jsx — Order prompt section
function WhatsAppCTA() {
  return (
    <section id="contact" style={{ background:'var(--green-700)', padding:'80px 32px', textAlign:'center', position:'relative', overflow:'hidden' }}>
      {/* Subtle decorative circles */}
      <div style={{ position:'absolute', top:'-60px', right:'-60px', width:'280px', height:'280px', borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />
      <div style={{ position:'absolute', bottom:'-40px', left:'-40px', width:'200px', height:'200px', borderRadius:'50%', background:'rgba(255,255,255,0.04)', pointerEvents:'none' }} />

      <div style={{ maxWidth:'680px', margin:'0 auto', position:'relative' }} className="nb-reveal">
        {/* WhatsApp icon */}
        <div style={{ width:'68px', height:'68px', borderRadius:'50%', background:'rgba(255,255,255,0.12)', display:'flex', alignItems:'center', justifyContent:'center', margin:'0 auto 28px' }}>
          <svg width="32" height="32" viewBox="0 0 24 24" fill="white">
            <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/>
          </svg>
        </div>

        <h2 style={{ margin:'0 0 16px', fontFamily:'var(--font-display)', fontSize:'clamp(2rem,4vw,3rem)', fontWeight:600, color:'#fff', lineHeight:1.1, letterSpacing:'-0.02em' }}>
          Ready to Order?
        </h2>
        <p style={{ margin:'0 0 36px', fontFamily:'var(--font-body)', fontSize:'var(--text-md)', color:'rgba(255,255,255,0.75)', lineHeight:1.7 }}>
          All orders are placed through WhatsApp. Tell us what you'd like, your location, and preferred delivery time — we'll take care of the rest.
        </p>
        <a href="https://wa.me/919207575603?text=Hi%20Nostabites!%20I'd%20like%20to%20place%20an%20order." target="_blank" rel="noopener noreferrer"
          style={{ display:'inline-flex', alignItems:'center', gap:'10px', padding:'16px 36px', background:'#fff', color:'var(--green-700)', borderRadius:'9999px', fontFamily:'var(--font-body)', fontSize:'var(--text-base)', fontWeight:700, textDecoration:'none', letterSpacing:'0.02em', transition:'all 150ms ease', boxShadow:'0 4px 20px rgba(0,0,0,0.15)' }}
          onMouseEnter={e=>{e.currentTarget.style.transform='scale(1.03)';e.currentTarget.style.boxShadow='0 6px 28px rgba(0,0,0,0.2)';}}
          onMouseLeave={e=>{e.currentTarget.style.transform='scale(1)';e.currentTarget.style.boxShadow='0 4px 20px rgba(0,0,0,0.15)';}}
        >
          <svg width="20" height="20" viewBox="0 0 24 24" fill="var(--color-whatsapp)"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
          Chat with us on WhatsApp
        </a>
        <p style={{ margin:'20px 0 0', fontFamily:'var(--font-body)', fontSize:'12px', color:'rgba(255,255,255,0.45)', letterSpacing:'0.04em' }}>
          Usually responds within 1 hour · Delivery available in Kochi &amp; nearby areas
        </p>
      </div>
    </section>
  );
}

// Footer.jsx — Site footer
function Footer() {
  const links = [
    { label:'Menu', href:'#menu' },
    { label:'About', href:'#about' },
    { label:'Contact', href:'#contact' },
  ];

  return (
    <footer style={{ background:'var(--charcoal-900)', padding:'52px 32px 32px', color:'var(--charcoal-300)' }}>
      <div style={{ maxWidth:'1200px', margin:'0 auto' }}>
        <div style={{ display:'grid', gridTemplateColumns:'2fr 1fr 1fr', gap:'48px', marginBottom:'40px' }}>
          {/* Brand */}
          <div>
                  <img src="./assets/logo-footer-cropped.png" alt="Nostabites" style={{ height:'64px', width:'auto', display:'block', marginBottom:'16px' }} />
            <p style={{ margin:'0 0 20px', fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-400)', lineHeight:1.7, maxWidth:'300px' }}>
              Premium homemade Kerala snacks made with traditional recipes and the finest local ingredients. Nostalgia in every bite.
            </p>
            <a href="https://wa.me/919207575603" target="_blank" rel="noopener noreferrer"
              style={{ display:'inline-flex', alignItems:'center', gap:'7px', fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--color-whatsapp)', textDecoration:'none', fontWeight:500 }}
            >
              <svg width="15" height="15" viewBox="0 0 24 24" fill="currentColor"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z"/></svg>
              +91 9207575603
            </a>

            {/* Social media icons */}
            <div style={{ display:'flex', gap:'10px', marginTop:'16px' }}>
              {[
                {
                  label: 'Instagram',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
                      <rect x="2" y="2" width="20" height="20" rx="5" ry="5"/>
                      <circle cx="12" cy="12" r="4"/>
                      <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none"/>
                    </svg>
                  ),
                },
                {
                  label: 'Facebook',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/>
                    </svg>
                  ),
                },
                {
                  label: 'TikTok',
                  href: '#',
                  icon: (
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
                      <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-2.88 2.5 2.89 2.89 0 0 1-2.89-2.89 2.89 2.89 0 0 1 2.89-2.89c.28 0 .54.04.79.1V9.01a6.33 6.33 0 0 0-.79-.05 6.34 6.34 0 0 0-6.34 6.34 6.34 6.34 0 0 0 6.34 6.34 6.34 6.34 0 0 0 6.33-6.34V8.69a8.18 8.18 0 0 0 4.78 1.52V6.75a4.85 4.85 0 0 1-1.01-.06z"/>
                    </svg>
                  ),
                },
              ].map(({ label, href, icon }) => (
                <a key={label} href={href} aria-label={label} target="_blank" rel="noopener noreferrer"
                  style={{ width:'36px', height:'36px', borderRadius:'var(--radius-md)', background:'var(--charcoal-800)', color:'var(--charcoal-300)', display:'flex', alignItems:'center', justifyContent:'center', textDecoration:'none', transition:'background 150ms ease, color 150ms ease', flexShrink:0 }}
                  onMouseEnter={e=>{ e.currentTarget.style.background='var(--charcoal-700)'; e.currentTarget.style.color='var(--cream-100)'; }}
                  onMouseLeave={e=>{ e.currentTarget.style.background='var(--charcoal-800)'; e.currentTarget.style.color='var(--charcoal-300)'; }}
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 style={{ margin:'0 0 16px', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--charcoal-300)' }}>Quick Links</h4>
            <nav style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {links.map(l => (
                <a key={l.label} href={l.href} style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-400)', textDecoration:'none', transition:'color 150ms ease' }}
                  onMouseEnter={e=>e.currentTarget.style.color='var(--cream-100)'}
                  onMouseLeave={e=>e.currentTarget.style.color='var(--charcoal-400)'}
                >{l.label}</a>
              ))}
            </nav>

            {/* Delivery platforms — coming soon */}
            <div style={{ marginTop:'24px' }}>
              <h4 style={{ margin:'0 0 12px', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--charcoal-300)' }}>Order Online</h4>
              <div style={{ display:'flex', flexDirection:'column', gap:'8px' }}>
                {/* Swiggy */}
                <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'7px 13px', borderRadius:'var(--radius-full)', border:'1px solid rgba(252,128,25,0.25)', background:'rgba(252,128,25,0.07)', width:'fit-content', opacity:0.65 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#FC8019"><circle cx="12" cy="12" r="10"/><path d="M8 12a4 4 0 0 0 8 0" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:600, color:'#FC8019', letterSpacing:'0.02em' }}>Swiggy</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, color:'var(--charcoal-500)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Coming Soon</span>
                </div>
                {/* Zomato */}
                <div style={{ display:'inline-flex', alignItems:'center', gap:'8px', padding:'7px 13px', borderRadius:'var(--radius-full)', border:'1px solid rgba(225,55,42,0.25)', background:'rgba(225,55,42,0.07)', width:'fit-content', opacity:0.65 }}>
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="#E1372A"><circle cx="12" cy="12" r="10"/><path d="M8 10h8M8 14h8" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" fill="none"/></svg>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'12px', fontWeight:600, color:'#E1372A', letterSpacing:'0.02em' }}>Zomato</span>
                  <span style={{ fontFamily:'var(--font-body)', fontSize:'10px', fontWeight:500, color:'var(--charcoal-500)', letterSpacing:'0.06em', textTransform:'uppercase' }}>Coming Soon</span>
                </div>
              </div>
            </div>
          </div>

          {/* Specialties */}
          <div>
            <h4 style={{ margin:'0 0 16px', fontFamily:'var(--font-body)', fontSize:'11px', fontWeight:700, letterSpacing:'0.14em', textTransform:'uppercase', color:'var(--charcoal-300)' }}>Our Snacks</h4>
            <nav style={{ display:'flex', flexDirection:'column', gap:'10px' }}>
              {['Kozhukkatta','Pazhampori','Cutlets','Sukiyan'].map(s => (
                <span key={s} style={{ fontFamily:'var(--font-body)', fontSize:'var(--text-sm)', color:'var(--charcoal-500)' }}>{s}</span>
              ))}
            </nav>
          </div>
        </div>

        {/* Bottom bar */}
        <div style={{ borderTop:'1px solid var(--charcoal-800)', paddingTop:'24px', display:'flex', justifyContent:'space-between', alignItems:'center', flexWrap:'wrap', gap:'12px' }}>
          <p style={{ margin:0, fontFamily:'var(--font-body)', fontSize:'12px', color:'var(--charcoal-600)' }}>© 2025 Nostabites. All rights reserved.</p>
          <p style={{ margin:0, fontFamily:'var(--font-display)', fontSize:'13px', fontStyle:'italic', color:'var(--charcoal-600)' }}>Nostalgia in Every Bite</p>
        </div>
      </div>
    </footer>
  );
}

// ─── App ────────────────────────────────────────────────────
function App() {
  React.useEffect(() => {
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); });
    }, { threshold: 0.12 });
    document.querySelectorAll('.nb-reveal').forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  return (
    <div>
      <ScrollFX />
      <Ticker />
      <Nav />
      <Hero />
      <Products />
      <About />
      <WhatsAppCTA />
      <Footer />
    </div>
  );
}

ReactDOM.createRoot(document.getElementById('root')).render(<App />);

import { FormEvent, useState } from 'react';
import {
  ArrowRight,
  CalendarDays,
  Check,
  ChevronDown,
  Clock3,
  Facebook,
  HeartHandshake,
  Mail,
  MapPin,
  Menu,
  ShieldCheck,
  Sparkles,
  Users,
  Utensils,
  X,
  Youtube,
} from 'lucide-react';
import { supabase } from '@/lib/supabase';
import logoImg from '@/assets/Logo.png';
import worshipTeamImg from '@/assets/Worship_Team.jpg';
import aerialImg from '@/assets/Glenmachan_soft_edges.jpg';
import pizzaPosterImg from '@/assets/Pizza and praise.jpg';

const activities = [
  { title: 'Children & Youth', items: ['Girls’ Brigade · Tuesday 6:00pm', 'Boys’ Brigade · Thursday 6:00pm', 'Youth Club · Fortnightly Saturday 7:30pm'], tone: 'blue' },
  { title: 'Community', items: ['Memory Lane · Wednesday 11:00am', 'Adelphos · Every 3rd Friday 8:00pm', 'Men’s Breakfast · First Saturday monthly', 'GEMS Ladies Bible Study · Third Monday monthly'], tone: 'orange' },
  { title: 'Support Ministries', items: ['Family Care in Cancer', 'Say Their Name Bereavement Group'], tone: 'slate' },
];

function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [formError, setFormError] = useState('');

  const closeMenu = () => setMenuOpen(false);

  const handlePrayerSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setSubmitting(true);
    setFormError('');
    const form = new FormData(event.currentTarget);
    const name = String(form.get('name') ?? '').trim();
    const email = String(form.get('email') ?? '').trim();
    const request = String(form.get('request') ?? '').trim();
    const confidential = form.get('confidential') === 'on';

    const { error } = await supabase.from('prayer_requests').insert({ name, email, request, confidential });
    if (error) {
      setFormError('We could not send your request just now. Please try again or email us directly.');
      setSubmitting(false);
      return;
    }
    setSubmitted(true);
    setSubmitting(false);
    event.currentTarget.reset();
  };

  return (
    <div className="site-shell">
      <header className="site-header">
        <a className="brand" href="#top" aria-label="Glenmachan home" onClick={closeMenu}>
          <img src={logoImg} alt="Church of God Glenmachan" />
        </a>
        <button className="menu-toggle" aria-label="Toggle navigation" aria-expanded={menuOpen} onClick={() => setMenuOpen((open) => !open)}>
          {menuOpen ? <X size={22} /> : <Menu size={22} />}
        </button>
        <nav className={menuOpen ? 'main-nav is-open' : 'main-nav'} aria-label="Main navigation">
          {['About', 'Services', 'Church Life', 'Leadership', 'Prayer', 'Find Us'].map((item) => (
            <a href={`#${item.toLowerCase().replace(' ', '-')}`} key={item} onClick={closeMenu}>{item}</a>
          ))}
          <a className="nav-button" href="#visit" onClick={closeMenu}>Plan your visit <ArrowRight size={16} /></a>
        </nav>
      </header>

      <main id="top">
        <section className="hero" aria-labelledby="hero-title">
          <div className="hero-image" style={{ backgroundImage: `linear-gradient(90deg, rgba(8,26,38,.8), rgba(10,35,48,.34) 58%, rgba(8,26,38,.23)), url(${aerialImg})` }} />
          <div className="hero-glow" />
          <div className="hero-content container mobile-hero-reposition">
            <div className="eyebrow light mobile-eyebrow"><span /> A church family in East Belfast</div>
            <div className="mobile-title-block">
              <h1 id="hero-title">Welcome to<br /><em>Glenmachan</em></h1>
            </div>
            <div className="mobile-center-paragraph">
              <p className="hero-lede mobile-subtitle">A city on a hill, shining God’s hope across East Belfast.</p>
              <p className="hero-copy mobile-copy">We’re a welcoming church family where people of all ages can belong, grow in faith, and discover the hope found in Jesus Christ.</p>
            </div>
          </div>
          <div className="hero-links mobile-hero-links" aria-label="Quick links">
            <a className="hero-link" href="https://www.youtube.com/@GLENMACHANdotORG" target="_blank" rel="noreferrer"><Youtube size={15} /> <span>Watch online</span></a>
            <a className="hero-link" href="#prayer"><HeartHandshake size={15} /> <span>Request prayer</span></a>
            <a className="hero-link" href="https://www.facebook.com/glenmachan.church" target="_blank" rel="noreferrer"><Facebook size={15} /> <span>Facebook</span></a>
          </div>
          <div className="scroll-note desktop-scroll-note"><span /> Scroll to explore</div>
        </section>

        {/* PIZZA & PRAISE FEATURED EVENT BANNER */}
        <section className="event-banner-section" style={{ background: '#0F2B3C', borderTop: '1px solid rgba(255,255,255,0.1)', borderBottom: '1px solid rgba(255,255,255,0.1)', padding: '3rem 0' }}>
          <div className="container" style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2.5rem', alignItems: 'center' }}>
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', background: '#D97706', color: '#fff', padding: '5px 14px', borderRadius: '20px', fontSize: '0.85rem', fontWeight: 'bold', marginBottom: '1rem', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                <Utensils size={15} /> Half Term Special
              </div>
              <h2 style={{ color: '#fff', fontSize: '2.4rem', fontWeight: 'bold', marginBottom: '0.75rem', lineHeight: '1.15' }}>
                Pizza & Praise Night!
              </h2>
              <p style={{ color: '#94A3B8', fontSize: '1.15rem', marginBottom: '1.5rem', lineHeight: '1.6' }}>
                For all the family! Join us for a relaxed evening of worship, fellowship, delicious pizza, and fun activities for kids. Everyone is invited!
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1.5rem', color: '#E2E8F0', fontSize: '1rem', fontWeight: '600', marginBottom: '2rem' }}>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><CalendarDays size={20} style={{ color: '#F59E0B' }} /> Sunday 25th October</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><Clock3 size={20} style={{ color: '#F59E0B' }} /> 6:00pm</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '8px' }}><MapPin size={20} style={{ color: '#F59E0B' }} /> Glenmachan Church</span>
              </div>
              <a className="button button-primary" href="#visit" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#D97706', border: 'none', color: '#fff', padding: '0.85rem 1.75rem', borderRadius: '8px', fontWeight: '600', textDecoration: 'none', fontSize: '1rem' }}>
                Plan Your Visit <ArrowRight size={18} />
              </a>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <img 
                src={pizzaPosterImg} 
                alt="Pizza and Praise Night - Sunday 25th October at 6pm" 
                style={{ width: '100%', maxWidth: '380px', borderRadius: '14px', boxShadow: '0 25px 35px rgba(0,0,0,0.4)', border: '2px solid rgba(255,255,255,0.15)' }} 
              />
            </div>
          </div>
        </section>

        <section className="welcome section container" id="about">
          <div className="section-label">Welcome home</div>
          <div className="welcome-grid">
            <div className="welcome-copy">
              <h2>A place to belong,<br /><span>grow and shine.</span></h2>
              <p className="lead">At Glenmachan, we believe church is more than a place to attend. It’s a family to belong to.</p>
              <p>Whether you’re exploring Christianity, returning to church, or searching for a church home, you’ll find a warm welcome here. United in Christ and rooted in community, we seek to worship God, care for one another and share His hope throughout East Belfast and beyond.</p>
              <a className="text-link" href="#visit">Find your place at Glenmachan <ArrowRight size={17} /></a>
            </div>
            <div className="welcome-photo photo-frame"><img className="web-image-feather" src={worshipTeamImg} alt="The Glenmachan worship team leading a service" /><span className="photo-stamp">A warm<br /><strong>welcome</strong><br />awaits</span></div>
          </div>
        </section>

        <section className="pillars-section">
          <div className="container">
            <div className="center-heading"><div className="section-label">Our heartbeat</div><h2>Belong. Grow. <span>Shine.</span></h2><p>Three simple words that shape who we are and how we live together.</p></div>
            <div className="pillars">
              <article className="pillar"><div className="pillar-number">01</div><Users size={27} /><h3>Belong</h3><p>A welcoming church family where everyone has a place and every story matters.</p><a href="#visit" aria-label="Learn about belonging"><ArrowRight size={18} /></a></article>
              <article className="pillar"><div className="pillar-number">02</div><Sparkles size={27} /><h3>Grow</h3><p>Growing together through worship, prayer and the life-changing truth of God’s Word.</p><a href="#services" aria-label="Learn about growing"><ArrowRight size={18} /></a></article>
              <article className="pillar"><div className="pillar-number">03</div><HeartHandshake size={27} /><h3>Shine</h3><p>Sharing God’s hope and love across East Belfast and beyond, wherever we are.</p><a href="#find-us" aria-label="Learn about shining"><ArrowRight size={18} /></a></article>
            </div>
          </div>
        </section>

        <section className="services section" id="services">
          <div className="container services-grid">
            <div className="services-intro"><div className="section-label">Make room for the good</div><h2>Join us<br /><span>this week.</span></h2><p>Come as you are. There’s a seat and a friendly face waiting for you.</p><a className="button button-dark" href="#visit">Plan your visit <ArrowRight size={17} /></a></div>
            <div className="service-list">
              <article className="service-card featured"><div className="service-time"><span>Sundays</span><strong>11:00<small>am</small></strong></div><div><h3>Sunday Morning Service</h3><p>Family Worship · Communion · Sunday School · Youth Church</p><span className="service-note">Coffee & fellowship after the service.</span></div><ArrowRight className="service-arrow" size={20} /></article>
              <article className="service-card"><div className="service-time"><span>Sundays</span><strong>6:00<small>pm</small></strong></div><div><h3>Sunday Evening Family Service</h3><p>A relaxed and welcoming gathering with Bible teaching, fellowship and refreshments.</p><span className="service-note">Everyone is welcome.</span></div><ArrowRight className="service-arrow" size={20} /></article>
              <article className="service-card"><div className="service-time"><span>Wednesday</span><strong>7:30<small>pm</small></strong></div><div><h3>Midweek Prayer Gathering</h3><p>A time of prayer, worship and seeking God together.</p></div><ArrowRight className="service-arrow" size={20} /></article>
            </div>
          </div>
        </section>

        <section className="life section container" id="church-life">
          <div className="life-header"><div><div className="section-label">There’s a place for you</div><h2>Life at <span>Glenmachan.</span></h2></div><p>From children and youth ministries to community outreach, support groups, and weekly fellowship, there is a vibrant place for you and your family to belong, grow, and serve at Glenmachan.</p></div>
          <div className="life-grid"><div className="life-photo-collage photo-frame"><img className="web-image-feather life-photo-feature" src="/images/Glenmachan_Photo_Collage.png" alt="Collage showing fellowship, community activities, teaching, and outdoor time at Glenmachan" /><div className="photo-caption">Rooted in our<br /><strong>community</strong></div></div><div className="activity-list">{activities.map((activity) => <article className={`activity-card ${activity.tone}`} key={activity.title}><div className="activity-icon"><CalendarDays size={19} /></div><div><h3>{activity.title}</h3>{activity.items.map((item) => <p key={item}>{item}</p>)}</div><ChevronDown size={19} /></article>)}</div></div>
        </section>

        <section className="leadership section" id="leadership">
          <div className="container"><div className="center-heading"><div className="section-label">Meet the team</div><h2>Here to <span>serve.</span></h2><p>Our pastors are here to walk with you through every season.</p></div><div className="leaders"><article className="leader-card"><div className="leader-avatar avatar-blue">PC</div><div><h3>Peter Comfort</h3><span>Senior Pastor</span><p>Providing spiritual leadership, biblical teaching and pastoral care to the Glenmachan church family.</p></div></article><article className="leader-card"><div className="leader-avatar avatar-orange">AS</div><div><h3>Alan Stephens</h3><span>Assistant Pastor</span><p>Supporting the ministry of the church through leadership, discipleship and pastoral care.</p></div></article></div></div>
        </section>

        <section className="media section" id="watch">
          <div className="container media-grid">
            <div className="media-col">
              <div className="section-label">Catch up online</div>
              <h2>Watch <span>latest.</span></h2>
              <p className="media-intro">Missed a Sunday? Catch up on our most recent messages and livestreams anytime.</p>
              <div className="video-card" style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '12px' }}>
                <iframe
                  style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', border: 0 }}
                  title="Glenmachan Church YouTube Uploads"
                  src="https://www.youtube-nocookie.com/embed/videoseries?list=UUPbVdwA94cp7y8XfDK0yatA"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <a className="text-link" href="https://www.youtube.com/@GLENMACHANdotORG" target="_blank" rel="noreferrer" style={{ marginTop: '1rem', display: 'inline-flex' }}>
                Visit our YouTube channel <ArrowRight size={17} />
              </a>
            </div>
            <div className="media-col">
              <div className="section-label">Stay connected</div>
              <h2>From our <span>Facebook page.</span></h2>
              <p className="media-intro">News, encouragements and what's happening in the life of our church family.</p>
              <div className="fb-card" style={{ borderRadius: '12px', overflow: 'hidden', background: '#fff', padding: '2rem', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', textAlign: 'center', minHeight: '380px', border: '1px solid rgba(0,0,0,0.08)', boxShadow: '0 10px 25px rgba(0,0,0,0.05)' }}>
                <div style={{ width: '64px', height: '64px', borderRadius: '50%', background: '#1877F2', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', marginBottom: '1rem' }}>
                  <Facebook size={32} />
                </div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 'bold', color: '#0A2330', marginBottom: '0.5rem' }}>Glenmachan Church</h3>
                <p style={{ color: '#555', fontSize: '0.95rem', marginBottom: '1.5rem', maxWidth: '320px' }}>
                  Follow our official Facebook page for weekly updates, photo galleries, event news, and community encouragements.
                </p>
                <a className="button button-primary" href="https://www.facebook.com/glenmachan.church" target="_blank" rel="noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: '#1877F2', color: '#fff', padding: '0.75rem 1.5rem', borderRadius: '8px', textDecoration: 'none', fontWeight: '600' }}>
                  <Facebook size={18} /> Visit our Facebook page <ArrowRight size={16} />
                </a>
              </div>
            </div>
          </div>
        </section>

        <section className="prayer section" id="prayer"><div className="container prayer-grid"><div className="prayer-copy"><div className="section-label light">You don’t have to face it alone</div><h2>How can we<br /><span>pray for you?</span></h2><p>Whatever you’re facing, we’d be honoured to pray with you. Share as much or as little as you’d like.</p><div className="confidential-note"><ShieldCheck size={20} /><span>Your request is handled with care and can be kept confidential.</span></div></div><div className="prayer-form-wrap">{submitted ? <div className="success-state"><div className="success-icon"><Check size={25} /></div><h3>Thank you for sharing.</h3><p>Your prayer request has been sent to our team. We’ll be praying with you.</p><button className="text-link" onClick={() => setSubmitted(false)}>Send another request <ArrowRight size={17} /></button></div> : <form className="prayer-form" onSubmit={handlePrayerSubmit}><div className="form-row"><label>Name<input name="name" type="text" placeholder="Your name" required maxLength={120} /></label><label>Email<input name="email" type="email" placeholder="you@example.com" required maxLength={320} /></label></div><label>Prayer request<textarea name="request" placeholder="How can we pray for you?" required maxLength={5000} rows={5} /></label><label className="check-label"><input name="confidential" type="checkbox" /> <span>I would like this request treated confidentially</span></label>{formError && <p className="form-error" role="alert">{formError}</p>}<button className="button button-primary" type="submit" disabled={submitting}>{submitting ? 'Sending…' : 'Submit prayer request'} <ArrowRight size={17} /></button></form>}</div></div></section>

        <section className="visit section" id="visit"><div className="container visit-grid"><div className="visit-details"><div className="section-label">Come and see us</div><h2>Find <span>us.</span></h2><p className="visit-intro">We’d love to welcome you through our doors.</p><div className="address"><MapPin size={21} /><div><strong>Church of God, Glenmachan</strong><p>13 Glenmachan Road<br />Belfast · BT4 2NL</p></div></div><div className="contact-line"><a href="tel:02890761676"><Clock3 size={18} /> 02890 761676</a><a href="mailto:glenmachanchurch@outlook.com"><Mail size={18} /> glenmachanchurch@outlook.com</a></div><a className="button button-dark" href="https://maps.google.com/?q=13+Glenmachan+Road+Belfast+BT4+2NL" target="_blank" rel="noreferrer">Get directions <ArrowRight size={16} /></a></div><div className="map-card"><iframe title="Map showing Church of God Glenmachan" src="https://maps.google.com/maps?q=13%20Glenmachan%20Road%20Belfast%20BT4%202NL&t=&z=15&ie=UTF8&iwloc=&output=embed" loading="lazy" style={{ border: 0, width: '100%', height: '100%' }} /><div className="map-pin"><MapPin size={20} fill="currentColor" /></div></div></div></section>

      </main>

      <footer className="footer"><div className="container footer-grid"><div><a className="brand footer-brand" href="#top"><img src={logoImg} alt="" /><span>GLENMACHAN</span></a><p>A city on a hill, shining God’s hope across East Belfast.</p></div><div><span className="footer-label">Sunday services</span><strong>11:00am & 6:00pm</strong></div><div><span className="footer-label">Connect with us</span><div className="socials"><a href="https://www.facebook.com/glenmachan.church" aria-label="Facebook"><Facebook size={19} /></a><a href="https://www.youtube.com/@GLENMACHANdotORG" aria-label="YouTube"><Youtube size={19} /></a></div></div></div><div className="container footer-bottom"><span>© {new Date().getFullYear()} Glenmachan Church</span><span>Built on hope · Rooted in community</span></div></footer>

      {/* Mobile structural CSS adjustments injected safely */}
      <style>{`
        @media (max-width: 768px) {
          .hero {
            display: flex;
            flex-direction: column;
            justify-content: space-between;
            align-items: flex-start;
            padding-top: 5rem !important;
            padding-bottom: 2rem !important;
            min-height: 100vh;
          }
          .mobile-hero-reposition {
            display: flex;
            flex-direction: column;
            justify-content: flex-start;
            align-items: flex-start;
            flex-grow: 1;
            width: 100%;
            padding-top: 0.5rem;
          }
          .mobile-eyebrow {
            display: flex;
            align-items: center;
            margin-bottom: 0.5rem;
            align-self: flex-start;
          }
          .mobile-title-block {
            width: 100%;
            text-align: left;
            margin-bottom: auto;
          }
          .mobile-center-paragraph {
            width: 100%;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            margin: auto 0;
            text-align: center !important;
            padding: 1rem 0;
          }
          .mobile-subtitle {
            text-align: center !important;
            width: 100%;
            margin-left: auto;
            margin-right: auto;
          }
          .mobile-copy {
            text-align: center !important;
            max-width: 92%;
            margin-left: auto;
            margin-right: auto;
          }
          .desktop-scroll-note {
            display: none !important;
          }
          .mobile-hero-links {
            margin-top: auto;
            margin-bottom: 1rem;
            display: flex;
            flex-direction: column;
            align-items: flex-start !important;
            gap: 0.85rem;
            width: 100%;
          }
          .mobile-hero-links .hero-link {
            font-size: 1.15rem !important;
            padding: 0.35rem 0;
          }
          .mobile-hero-links .hero-link svg {
            width: 20px !important;
            height: 20px !important;
          }
        }
      `}</style>
    </div>
  );
}

export default App;
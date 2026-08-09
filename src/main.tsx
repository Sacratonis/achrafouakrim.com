import { StrictMode, useEffect, useRef, useState, type MouseEvent } from "react";
import { createRoot } from "react-dom/client";
import { ArrowUpRight, Download, Dribbble, Instagram, Linkedin, Mail, MapPin } from "lucide-react";
import { portfolio } from "./portfolioData";
import "./styles.css";

type ShowcaseImage = { src: string; alt: string };
type ShowcaseProject = {
  slug: string;
  title: string;
  meta: string;
  scope: string;
  href: string;
  images: ShowcaseImage[];
  external?: boolean;
};

function SocialMark({ label }: { label: string }) {
  if (label === "Instagram") return <Instagram size={17} aria-hidden="true" />;
  if (label === "LinkedIn") return <Linkedin size={17} aria-hidden="true" />;
  if (label === "Dribbble") return <Dribbble size={17} aria-hidden="true" />;
  return <span className="social-mark-text" aria-hidden="true">Be</span>;
}

function ShowcaseProjectCard({ project, index }: { project: ShowcaseProject; index: number }) {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef<number | null>(null);

  const stopPreview = () => {
    if (timerRef.current !== null) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setActiveIndex(0);
  };

  const startPreview = () => {
    if (project.images.length < 2 || timerRef.current !== null) return;
    timerRef.current = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % project.images.length);
    }, 820);
  };

  useEffect(() => () => {
    if (timerRef.current !== null) window.clearInterval(timerRef.current);
  }, []);

  return (
    <a
      className="showcase-project-card"
      href={project.href}
      target={project.external ? "_blank" : undefined}
      rel={project.external ? "noreferrer" : undefined}
      onMouseEnter={startPreview}
      onMouseLeave={stopPreview}
      onFocus={startPreview}
      onBlur={stopPreview}
    >
      <div className="showcase-project-media">
        <span className="showcase-project-index">0{index + 1}</span>
        <img
          key={`${project.slug}-${activeIndex}`}
          className="showcase-project-image"
          src={project.images[activeIndex].src}
          alt={project.images[activeIndex].alt}
          loading={index === 0 ? "eager" : "lazy"}
          decoding="async"
        />
        <span className="showcase-project-count" aria-hidden="true">
          {String(activeIndex + 1).padStart(2, "0")} / {String(project.images.length).padStart(2, "0")}
        </span>
      </div>
      <div className="showcase-project-info">
        <div>
          <h3>{project.title}</h3>
          <span>{project.meta}</span>
        </div>
        <ArrowUpRight size={21} aria-hidden="true" />
      </div>
      <p className="showcase-project-scope">{project.scope}</p>
    </a>
  );
}

function App() {
  if (window.location.pathname === "/work/phenix-kitchen-identity") {
    return <PhenixIdentityPage />;
  }

  if (window.location.pathname === "/work/gaston-gali-menu-print") {
    return <GastonGaliPrintPage />;
  }

  if (window.location.pathname === "/work/kara-renault-vehicle-wrap") {
    return <KaraRenaultVehicleWrapPage />;
  }

  if (window.location.pathname === "/work/keat-packaging") {
    return <KeatPackagingPage />;
  }

  if (window.location.pathname === "/work/quince-packaging") {
    return <QuincePackagingPage />;
  }

  if (window.location.pathname === "/work/dune-creme-packaging") {
    return <DuneCremePackagingPage />;
  }

  if (window.location.pathname === "/work/huawei-packaging") {
    return <HuaweiPackagingPage />;
  }

  if (window.location.pathname === "/work/chilis-packaging") {
    return <ChilisPackagingPage />;
  }

  if (window.location.pathname === "/work/royale-mansour-packaging") {
    return <RoyaleMansourPackagingPage />;
  }

  if (window.location.pathname === "/work/ram-airline-packaging") {
    return <RamPackagingPage />;
  }

  if (window.location.pathname === "/work/dar-dyafa-packaging") {
    return <DarDyafaPackagingPage />;
  }

  if (window.location.pathname === "/work/cafe-bonjour-packaging") {
    return <CafeBonjourPackagingPage />;
  }

  if (window.location.pathname === "/work/miam-bakery-packaging") {
    return <MiamPackagingPage />;
  }

  if (window.location.pathname === "/work/ikea-casablanca-packaging") {
    return <IkeaPackagingPage />;
  }

  return (
    <main>
      <Header />
      <Hero />
      <About />
      <Experience />
      <Work />
      <PosterArchive />
      <Contact />
      <footer className="site-footer">
        <span>{portfolio.name}</span>
        <span>{portfolio.role}</span>
        <span>© {new Date().getFullYear()}</span>
      </footer>
    </main>
  );
}

function Header() {
  const scrollToContact = (event: MouseEvent<HTMLAnchorElement>) => {
    event.preventDefault();
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    window.history.replaceState(null, "", "#contact");
  };

  return (
    <header className="site-header">
      <a className="nav-pill" href="#top">Home</a>
      <a className="nav-pill nav-connect" href="#contact" onClick={scrollToContact}>Connect <ArrowUpRight size={15} aria-hidden="true" /></a>
      <a className="nav-pill" href={portfolio.resume.href} target="_blank" rel="noreferrer">CV</a>
    </header>
  );
}

function Hero() {
  return (
    <section className="hero" id="top">
      <div className="hero-intro reveal">
        <p className="eyebrow">{portfolio.role}</p>
        <h1>Graphic designer<br />based in Morocco</h1>
        <p className="hero-summary">{portfolio.summary}</p>
      <div className="social-row" aria-label="Contact links">
        <a className="round-link" href={`mailto:${portfolio.email}`} aria-label="Email Achraf" title="Email Achraf"><Mail size={17} /></a>
        {portfolio.socials.map((social) => (
          <a className="round-link" href={social.href} target="_blank" rel="noreferrer" aria-label={social.label} title={social.label} key={social.label}>
            <SocialMark label={social.label} />
          </a>
        ))}
        <a className="round-link" href={portfolio.resume.href} target="_blank" rel="noreferrer" aria-label="Open CV" title="Open CV"><Download size={17} /></a>
        </div>
      </div>
      <div className="portrait-card reveal">
        <div className="hello-badge">✦ Hey there! I’m Achraf</div>
        <img
          src={portfolio.headshot}
          alt={portfolio.headshotAlt}
          loading="eager"
          fetchPriority="high"
          decoding="async"
        />
        <span className="portrait-location"><MapPin size={14} /> {portfolio.location}</span>
      </div>
    </section>
  );
}

function Work() {
  return (
    <section className="showcase" id="work">
      <div className="showcase-header">
        <div className="section-label">Work showcase</div>
        <p>Selected projects across identity, packaging, print, vehicles, and social visuals.</p>
      </div>
      {portfolio.showcaseSections.filter((section) => section.id !== "posters").map((section) => (
        <div className={`showcase-section showcase-section-${section.id}`} id={section.id} key={section.id}>
          <div className="showcase-section-heading">
            <div>
              <span className="showcase-section-kicker">{section.label}</span>
              <h2>{section.intro}</h2>
            </div>
            <p>{section.description}</p>
          </div>
          <div className={`showcase-project-grid showcase-project-grid-${section.id}`}>
            {section.projects.map((project, index) => (
              <ShowcaseProjectCard project={project} index={index} key={project.slug} />
            ))}
          </div>
        </div>
      ))}
    </section>
  );
}

function IdentityIndex() {
  return (
    <section className="identity-index" id="identity" aria-label="Brand identity projects">
      <div className="section-label">Brand identity</div>
      <div className="identity-index-intro"><h2>Identity systems that make a business recognizable.</h2><p>Explore the thinking, core assets, and applications behind each brand.</p></div>
      {portfolio.identityProjects.map((project, index) => <a className="packaging-project-row" href={`/work/${project.slug}`} key={project.slug}><span className="packaging-project-number">0{index + 1}</span><span className="packaging-project-title">{project.title}</span><span className="packaging-project-meta">{project.meta}</span><ArrowUpRight size={21} aria-hidden="true" /></a>)}
    </section>
  );
}

function PrintIndex() {
  return (
    <section className="print-index" id="print" aria-label="Print design projects">
      <div className="section-label">Print design</div>
      <div className="print-index-intro"><h2>Print pieces designed to be held, read, and remembered.</h2><p>Menus and printed systems with clear hierarchy, audience awareness, and production-ready files.</p></div>
      {portfolio.printProjects.map((project, index) => <a className="packaging-project-row" href={`/work/${project.slug}`} key={project.slug}><span className="packaging-project-number">0{index + 1}</span><span className="packaging-project-title">{project.title}</span><span className="packaging-project-meta">{project.meta}</span><ArrowUpRight size={21} aria-hidden="true" /></a>)}
    </section>
  );
}

function About() {
  return (
    <section className="section about" id="about">
      <div className="section-label">About me</div>
      <div className="about-grid">
        <h2>{portfolio.about.title}</h2>
        <div className="about-copy">
          {portfolio.about.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
          <a className="text-link" href={`mailto:${portfolio.email}`}>Let’s work together <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function Experience() {
  return (
    <section className="section experience" id="experience">
      <div className="section-label">Experience</div>
      <div className="experience-list">
        {portfolio.experience.map((item) => (
          <article className="experience-row" key={`${item.company}-${item.period}`}>
            <div><h3>{item.title}</h3><p>{item.company}</p></div>
            <time>{item.period}</time>
            <span className="experience-place">{item.location}</span>
          </article>
        ))}
      </div>
      <div className="education-line"><span>Education</span><strong>{portfolio.education[0]}</strong></div>
    </section>
  );
}

function PosterArchive() {
  const posters = [...portfolio.posters, ...portfolio.posters];

  return (
    <section className="poster-archive" id="poster-wall" aria-label="Animated posters and social media visuals">
      <div className="poster-archive-heading">
        <span className="section-label">Animated posters</span>
        <span>Social media visuals / poster archive</span>
      </div>
      <div className="poster-marquee">
        <div className="poster-track">
          {posters.map((poster, index) => (
            <a className="poster-frame" href="https://www.behance.net/achraf_ouak" target="_blank" rel="noreferrer" key={`${poster.title}-${index}`}>
              <img src={poster.image} alt={poster.alt} loading="lazy" decoding="async" />
              <span>{poster.title}</span>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

function PackagingIndex() {
  return (
    <section className="packaging-index" id="packaging" aria-label="Packaging projects">
      <div className="section-label">Packaging</div>
      <div className="packaging-index-intro">
        <h2>B2B packaging from supplied identity to production.</h2>
        <p>Explore packaging projects with the full process kept on their own pages.</p>
      </div>
      {portfolio.packagingProjects.map((project, index) => (
        <a className="packaging-project-row" href={`/work/${project.slug}`} key={project.slug}>
          <span className="packaging-project-number">0{index + 1}</span>
          <span className="packaging-project-title">{project.title}</span>
          <span className="packaging-project-meta">{project.meta}</span>
          <ArrowUpRight size={21} aria-hidden="true" />
        </a>
      ))}
    </section>
  );
}

function VehicleWrappingIndex() {
  return (
    <section className="vehicle-index" id="vehicle-wrapping" aria-label="Vehicle wrapping projects">
      <div className="section-label">Vehicle wrapping</div>
      <div className="vehicle-index-intro">
        <h2>Brand systems that move through the city.</h2>
        <p>Large-format applications designed to stay legible, recognizable, and useful from every angle.</p>
      </div>
      {portfolio.vehicleWrappingProjects.map((project, index) => (
        <a className="packaging-project-row" href={`/work/${project.slug}`} key={project.slug}>
          <span className="packaging-project-number">0{index + 1}</span>
          <span className="packaging-project-title">{project.title}</span>
          <span className="packaging-project-meta">{project.meta}</span>
          <ArrowUpRight size={21} aria-hidden="true" />
        </a>
      ))}
    </section>
  );
}

function KaraRenaultVehicleWrapPage() {
  return (
    <main>
      <Header />
      <section className="project-page-shell vehicle-project-shell">
        <a className="project-back" href="/#vehicle-wrapping"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Vehicle wrapping / KARA Distribution</p>
          <h1>A moving identity for KARA Distribution.</h1>
          <p>Designed a Renault delivery van wrap that turns a working vehicle into a clear brand touchpoint, carrying the KARA Distribution identity, service information, and contact details across the front, side, and rear views.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / KARA Distribution</span><span>Context / Delivery fleet</span><span>Scope / 2 vehicle views</span><span>Role / Vehicle graphics designer</span></div>
      </section>
      <section className="vehicle-visual-grid">
        <figure><img src="/assets/optimized/vehicle-wrapping/kara-renault-front.jpg" alt="KARA Distribution Renault van wrap front and side view" /><figcaption><strong>Front and side application</strong><span>Brand visibility in motion</span></figcaption></figure>
        <figure><img src="/assets/optimized/vehicle-wrapping/kara-renault-rear.jpg" alt="KARA Distribution Renault van wrap rear view" /><figcaption><strong>Rear application</strong><span>Contact details at the point of delivery</span></figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Wrap system</div>
        <div className="ikea-process">
          <article><span>01</span><h2>Brand first</h2><p>Applied KARA Distribution's purple identity as the dominant vehicle surface.</p></article>
          <article><span>02</span><h2>Angle aware</h2><p>Placed the mark across the hood, side panel, and rear so the identity reads from multiple directions.</p></article>
          <article><span>03</span><h2>Clear information</h2><p>Kept the delivery address, phone number, and email grouped into readable service panels.</p></article>
          <article><span>04</span><h2>Production view</h2><p>Prepared front, side, and rear perspectives to support the physical wrapping handoff.</p></article>
        </div>
      </section>
      <section className="ikea-section vehicle-final-grid">
        <div><div className="section-label">Fleet presence</div><h2>One vehicle, several brand impressions.</h2><p>Vehicle wrapping extends a business identity beyond the storefront, turning everyday movement into repeated local visibility.</p></div>
        <img src="/assets/optimized/vehicle-wrapping/kara-renault-front.jpg" alt="KARA Distribution branded Renault delivery van" />
      </section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>KARA vehicle wrapping</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function IkeaPackagingPage() {
  const dielines = [
    { title: "Sandwich tray", preview: "/assets/optimized/ikea/barquette-sandwich-dieline.jpg", pdf: "/assets/ikea/barquette-sandwich.pdf" },
    { title: "Paper bag", preview: "/assets/optimized/ikea/paper-bag-dieline.jpg", pdf: "/assets/ikea/paper-bag.pdf" },
    { title: "Sandwich bag", preview: "/assets/optimized/ikea/sac-sand-dieline.jpg", pdf: "/assets/ikea/sac-sand.pdf" },
    { title: "Napkin", preview: "/assets/optimized/ikea/serviette-dieline.jpg", pdf: "/assets/ikea/serviette.pdf" },
    { title: "Taco paper", preview: "/assets/optimized/ikea/papier-tacos-dieline.jpg", pdf: "/assets/ikea/papier-tacos.pdf" },
    { title: "Carton cup", preview: "/assets/optimized/ikea/goblet-carton-dieline.jpg", pdf: "/assets/ikea/goblet-carton.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell ikea-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">B2B packaging / IKEA Morocco</p>
          <h1>Casablanca food packaging system.</h1>
          <p>A coordinated set of food-service packaging applications developed for IKEA Morocco, from measured dielines to branded mockups and real-world references.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / IKEA Morocco</span><span>Location / Casablanca</span><span>Scope / 6 formats</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="ikea-visual-grid">
        <figure className="ikea-hero-image"><img src="/assets/optimized/ikea/cups.jpg" alt="IKEA Morocco branded paper cups mockup" /><figcaption>Paper cup application</figcaption></figure>
        <figure><img src="/assets/optimized/ikea/serviette.jpg" alt="IKEA branded napkin mockup" /><figcaption>Napkin application</figcaption></figure>
        <figure><img src="/assets/optimized/ikea/sac-sand.jpg" alt="IKEA branded paper bag mockup" /><figcaption>Paper bag application</figcaption></figure>
        <figure><img src="/assets/optimized/ikea/papier-tacos.jpg" alt="IKEA branded taco paper mockup" /><figcaption>Taco paper application</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Production process</div>
        <div className="ikea-process"><article><span>01</span><h2>Identity supplied</h2><p>Worked within IKEA's established logo and color system.</p></article><article><span>02</span><h2>Dielines measured</h2><p>Prepared dimensions, panels, folds, and print areas for each format.</p></article><article><span>03</span><h2>Artwork applied</h2><p>Placed the identity consistently across bags, wraps, napkins, and cups.</p></article><article><span>04</span><h2>Applications checked</h2><p>Reviewed mockups and a real cup reference for visual accuracy.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section ikea-real-world"><div><div className="section-label">Real-world reference</div><h2>From artwork file to a physical food-service touchpoint.</h2></div><img src="/assets/optimized/ikea/real-cup.jpg" alt="Real IKEA branded paper cup reference held in hand" /></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>IKEA Morocco packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function MiamPackagingPage() {
  const dielines = [
    { title: "Pastry box 12 × 12", preview: "/assets/optimized/miam/pastry-box-dieline.jpg", pdf: "/assets/miam/pastry-box.pdf" },
    { title: "Square label", preview: "/assets/optimized/miam/square-label-dieline.jpg", pdf: "/assets/miam/square-label.pdf" },
    { title: "Round dessert label", preview: "/assets/optimized/miam/round-label-dieline.jpg", pdf: "/assets/miam/round-label.pdf" },
    { title: "Carton cup", preview: "/assets/optimized/miam/goblet-dieline.jpg", pdf: "/assets/miam/goblet-carton.pdf" },
    { title: "Sandwich paper", preview: "/assets/optimized/miam/sandwich-paper-dieline.jpg", pdf: "/assets/miam/sandwich-paper.pdf" },
    { title: "Paper tote bag", preview: "/assets/optimized/miam/tote-bag-dieline.jpg", pdf: "/assets/miam/tote-bag.pdf" },
    { title: "Sandwich bag", preview: "/assets/optimized/miam/sandwich-bag-dieline.jpg", pdf: "/assets/miam/sandwich-bag.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell miam-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Bakery packaging / MIAM</p>
          <h1>A packaging system made with love.</h1>
          <p>A warm, flexible packaging identity for MIAM Café-Boutique, carried across dessert labels, sandwich packaging, paper bags, cups, stickers, and a pastry box.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / MIAM Café-Boutique</span><span>Scope / 7 formats</span><span>Focus / Food packaging</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="miam-visual-grid">
        <figure className="miam-hero-image"><img src="/assets/optimized/miam/round-label.jpg" alt="MIAM round dessert labels in multiple color variants" /><figcaption>Label color system</figcaption></figure>
        <figure><img src="/assets/optimized/miam/paper-bag.jpg" alt="MIAM paper bag mockup" /><figcaption>Paper bag</figcaption></figure>
        <figure><img src="/assets/optimized/miam/goblet-carton.jpg" alt="MIAM branded carton cup mockup" /><figcaption>Carton cup</figcaption></figure>
        <figure><img src="/assets/optimized/miam/stickers.jpg" alt="MIAM sticker and label mockups" /><figcaption>Sticker applications</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Brand language</h2><p>Translated the MIAM logo into a warm, recognizable packaging expression.</p></article><article><span>02</span><h2>Pattern system</h2><p>Built a repeatable butterfly pattern to connect every food-service format.</p></article><article><span>03</span><h2>Product variants</h2><p>Used color bands to distinguish dessert and menu applications clearly.</p></article><article><span>04</span><h2>Print-ready files</h2><p>Prepared dielines and artwork for bags, labels, paper, cups, and boxes.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section miam-final-grid"><div><div className="section-label">Final applications</div><h2>One visual language across the bakery counter and takeaway experience.</h2></div><div className="miam-final-images"><img src="/assets/optimized/miam/sandwich-bag.jpg" alt="MIAM sandwich bag with bread" /><img src="/assets/optimized/miam/stickers.jpg" alt="MIAM stickers on a colored surface" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>MIAM bakery packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function CafeBonjourPackagingPage() {
  const dielines = [
    { title: "Pastry box 12 × 12", preview: "/assets/optimized/cafe-bonjour/pastry-box-dieline.jpg", pdf: "/assets/cafe-bonjour/pastry-box.pdf" },
    { title: "Carton cup", preview: "/assets/optimized/cafe-bonjour/goblet-dieline.jpg", pdf: "/assets/cafe-bonjour/goblet.pdf" },
    { title: "Tote bag", preview: "/assets/optimized/cafe-bonjour/tote-bag-dieline.jpg", pdf: "/assets/cafe-bonjour/tote-bag.pdf" },
    { title: "Fries bag", preview: "/assets/optimized/cafe-bonjour/fries-bag-dieline.jpg", pdf: "/assets/cafe-bonjour/fries-bag.pdf" },
    { title: "Viennoiserie bag", preview: "/assets/optimized/cafe-bonjour/pastry-bag-dieline.jpg", pdf: "/assets/cafe-bonjour/pastry-bag.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell cafe-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Gas station packaging / Café Bonjour</p>
          <h1>A takeaway packaging system for Café Bonjour.</h1>
          <p>A practical food-service packaging system for a gas-station business serving customers on the go, from coffee and fries to sandwiches, viennoiseries, and pastry boxes.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Café Bonjour</span><span>Context / Gas station food service</span><span>Scope / 5 dielines + 6 applications</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="cafe-visual-grid">
        <figure className="cafe-hero-image"><img src="/assets/optimized/cafe-bonjour/goblet.jpg" alt="Café Bonjour branded takeaway coffee cup" /><figcaption>Coffee on the move</figcaption></figure>
        <figure><img src="/assets/optimized/cafe-bonjour/tote-bag.jpg" alt="Café Bonjour branded paper tote bag" /><figcaption>Counter-to-car carry bag</figcaption></figure>
        <figure><img src="/assets/optimized/cafe-bonjour/fries-bag.jpg" alt="Café Bonjour fries bag mockup" /><figcaption>Quick-service fries bag</figcaption></figure>
        <figure><img src="/assets/optimized/cafe-bonjour/pastry-bag.jpg" alt="Café Bonjour pastry bag mockup" /><figcaption>Pastry takeaway</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Service context</h2><p>Designed for fast takeaway, convenience, and clear recognition at the station.</p></article><article><span>02</span><h2>Format system</h2><p>Defined boxes, cups, tote bags, fries bags, and pastry bags for different moments.</p></article><article><span>03</span><h2>Identity applied</h2><p>Carried Café Bonjour colors, logo, and framing details consistently across formats.</p></article><article><span>04</span><h2>Production files</h2><p>Prepared print-ready artwork for the different packaging structures and surfaces.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section cafe-final-grid"><div><div className="section-label">On-the-go food service</div><h2>One visual language across the station counter and the customer journey.</h2></div><div className="cafe-final-images"><img src="/assets/optimized/cafe-bonjour/sandwich-bag.jpg" alt="Café Bonjour sandwich bag with bread" /><img src="/assets/optimized/cafe-bonjour/pastry-box.jpg" alt="Café Bonjour pastry box mockup" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Café Bonjour packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function DarDyafaPackagingPage() {
  const dielines = [
    { title: "Pizza box 24 cm", preview: "/assets/optimized/dar-dyafa/pizza-box-dieline.jpg", pdf: "/assets/dar-dyafa/pizza-box.pdf" },
    { title: "Large tote bag", preview: "/assets/optimized/dar-dyafa/tote-bag-large-dieline.jpg", pdf: "/assets/dar-dyafa/tote-bag-large.pdf" },
    { title: "Medium tote bag", preview: "/assets/optimized/dar-dyafa/tote-bag-medium-dieline.jpg", pdf: "/assets/dar-dyafa/tote-bag-medium.pdf" },
    { title: "Carton cup", preview: "/assets/optimized/dar-dyafa/goblet-dieline.jpg", pdf: "/assets/dar-dyafa/goblet.pdf" },
    { title: "Sandwich bag / option 1", preview: "/assets/optimized/dar-dyafa/sandwich-bag-1-dieline.jpg", pdf: "/assets/dar-dyafa/sandwich-bag-1.pdf" },
    { title: "Sandwich bag / option 2", preview: "/assets/optimized/dar-dyafa/sandwich-bag-2-dieline.jpg", pdf: "/assets/dar-dyafa/sandwich-bag-2.pdf" },
    { title: "Fries bag", preview: "/assets/optimized/dar-dyafa/fries-bag-dieline.jpg", pdf: "/assets/dar-dyafa/fries-bag.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell dar-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Restaurant packaging / Dar Dyafa</p>
          <h1>A Moroccan-inspired takeaway system for Dar Dyafa.</h1>
          <p>A coordinated packaging proposal for Dar Dyafa, using a subtle architectural pattern, warm orange identity blocks, and practical formats for restaurant takeaway and delivery.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Dar Dyafa</span><span>Context / Restaurant takeaway</span><span>Scope / 7 dielines + 5 applications</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="dar-visual-grid">
        <figure className="dar-hero-image"><img src="/assets/optimized/dar-dyafa/pizza-box.jpg" alt="Dar Dyafa patterned pizza box stack" /><figcaption>Delivery box system</figcaption></figure>
        <figure><img src="/assets/optimized/dar-dyafa/tote-bag.jpg" alt="Dar Dyafa patterned paper tote bag" /><figcaption>Restaurant carry bag</figcaption></figure>
        <figure><img src="/assets/optimized/dar-dyafa/goblet.jpg" alt="Dar Dyafa patterned takeaway coffee cup in hand" /><figcaption>Takeaway cup</figcaption></figure>
        <figure><img src="/assets/optimized/dar-dyafa/fries-bag.jpg" alt="Dar Dyafa patterned fries bag" /><figcaption>Fries packaging</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Identity translated</h2><p>Turned Dar Dyafa's mark into a tactile restaurant packaging language.</p></article><article><span>02</span><h2>Pattern developed</h2><p>Used a Moroccan-inspired repeating motif to create recognition across formats.</p></article><article><span>03</span><h2>Formats structured</h2><p>Built a flexible set for pizza, sandwiches, fries, cups, and customer carryout.</p></article><article><span>04</span><h2>Files prepared</h2><p>Organized dielines and applications for production review and print delivery.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section dar-final-grid"><div><div className="section-label">Restaurant takeaway</div><h2>A consistent Dar Dyafa presence from the kitchen to the customer's table.</h2></div><div className="dar-final-images"><img src="/assets/optimized/dar-dyafa/sandwich-bag.jpg" alt="Dar Dyafa patterned sandwich bag with bread" /><img src="/assets/optimized/dar-dyafa/goblet.jpg" alt="Dar Dyafa takeaway coffee cup held in hand" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Dar Dyafa packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function RamPackagingPage() {
  const dielines = [
    { title: "Beige napkin", preview: "/assets/optimized/ram/ram-beige-dieline.jpg", pdf: "/assets/ram/ram-beige.pdf" },
    { title: "White napkin", preview: "/assets/optimized/ram/ram-white-dieline.jpg", pdf: "/assets/ram/ram-white.pdf" },
    { title: "8 oz paper cup / color options", preview: "/assets/optimized/ram/ram-cup-colors-dieline.jpg", pdf: "/assets/ram/ram-cup-colors.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell ram-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Airline hospitality / Royal Air Maroc</p>
          <h1>Onboard packaging with a Moroccan point of view.</h1>
          <p>A compact food-service packaging system for Royal Air Maroc, bringing the airline's red, beige, and white palette into cups and napkins designed for the onboard experience.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Royal Air Maroc</span><span>Context / Airline hospitality</span><span>Scope / 3 production files + 4 applications</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="ram-visual-grid">
        <figure className="ram-hero-image"><img src="/assets/optimized/ram/cup-beige.jpg" alt="Royal Air Maroc beige 8 oz paper cup" /><figcaption>8 oz onboard cup</figcaption></figure>
        <figure><img src="/assets/optimized/ram/napkin-red.jpg" alt="Royal Air Maroc red napkin packaging" /><figcaption>Red service variant</figcaption></figure>
        <figure><img src="/assets/optimized/ram/napkin-beige.jpg" alt="Royal Air Maroc beige napkin packaging" /><figcaption>Beige service variant</figcaption></figure>
        <figure><img src="/assets/optimized/ram/napkin-white.jpg" alt="Royal Air Maroc white napkin packaging" /><figcaption>White service variant</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Brand language</h2><p>Worked with Royal Air Maroc's emblem, typography, and recognizable red identity.</p></article><article><span>02</span><h2>Hospitality formats</h2><p>Focused the system on compact, practical touchpoints for onboard service.</p></article><article><span>03</span><h2>Color variants</h2><p>Developed beige, white, and red expressions to support different service contexts.</p></article><article><span>04</span><h2>Production files</h2><p>Prepared cup and napkin artwork for review, adaptation, and print production.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section ram-final-grid"><div><div className="section-label">Onboard hospitality</div><h2>Small-format packaging that carries the airline identity into every service moment.</h2></div><div className="ram-final-images"><img src="/assets/optimized/ram/cup-beige.jpg" alt="Royal Air Maroc paper cup mockup" /><img src="/assets/optimized/ram/napkin-red.jpg" alt="Royal Air Maroc red napkin mockup" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Royal Air Maroc packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function RoyaleMansourPackagingPage() {
  const dielines = [
    { title: "Sandwich paper 32 × 32 cm", preview: "/assets/optimized/royale-mansour/sandwich-paper-dieline.jpg", pdf: "/assets/royale-mansour/sandwich-paper.pdf" },
    { title: "Fries bag 7 × 9 cm", preview: "/assets/optimized/royale-mansour/fries-bag-dieline.jpg", pdf: "/assets/royale-mansour/fries-bag.pdf" },
    { title: "Waffle box 15 × 20 × 5 cm", preview: "/assets/optimized/royale-mansour/waffle-box-dieline.jpg", pdf: "/assets/royale-mansour/waffle-box.pdf" },
    { title: "Sandwich bag 13 × 9 × 3 cm", preview: "/assets/optimized/royale-mansour/sandwich-bag-dieline.jpg", pdf: "/assets/royale-mansour/sandwich-bag.pdf" },
    { title: "Paper bowl 16 oz", preview: "/assets/optimized/royale-mansour/paper-bowl-dieline.jpg", pdf: "/assets/royale-mansour/paper-bowl.pdf" },
    { title: "Burger box 145 × 145 mm", preview: "/assets/optimized/royale-mansour/burger-box-dieline.jpg", pdf: "/assets/royale-mansour/burger-box.pdf" },
    { title: "Two-sided paper pouch", preview: "/assets/optimized/royale-mansour/pouch-dieline.jpg", pdf: "/assets/royale-mansour/pouch.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell royale-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Luxury hospitality / Royale Mansour Morocco</p>
          <h1>Food-service packaging with a quiet luxury finish.</h1>
          <p>A refined packaging system for Royale Mansour, extending the hotel's gold monogram and geometric pattern across takeaway formats for burgers, waffles, fries, sandwiches, bowls, and ice cream.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Royale Mansour Morocco</span><span>Context / Luxury hotel food service</span><span>Scope / 7 dielines + 7 applications</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="royale-visual-grid">
        <figure className="royale-hero-image"><img src="/assets/optimized/royale-mansour/paper-bowl.jpg" alt="Royale Mansour paper bowls with gold monogram" /><figcaption>Premium takeaway bowl</figcaption></figure>
        <figure><img src="/assets/optimized/royale-mansour/burger-box.jpg" alt="Royale Mansour burger box mockup" /><figcaption>Burger box</figcaption></figure>
        <figure><img src="/assets/optimized/royale-mansour/sandwich-paper.jpg" alt="Royale Mansour geometric sandwich paper" /><figcaption>Geometric food paper</figcaption></figure>
        <figure><img src="/assets/optimized/royale-mansour/ice-cream-bowl.jpg" alt="Royale Mansour ice cream bowl mockup" /><figcaption>Ice cream service</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Luxury language</h2><p>Built the system around the Royale Mansour monogram, generous white space, and a gold-led palette.</p></article><article><span>02</span><h2>Pattern detail</h2><p>Applied a refined geometric pattern to add texture without competing with the hotel identity.</p></article><article><span>03</span><h2>Food formats</h2><p>Extended the visual language across burgers, waffles, fries, sandwiches, bowls, and ice cream.</p></article><article><span>04</span><h2>Production files</h2><p>Prepared measured dielines and artwork for the full takeaway food-service range.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section royale-final-grid"><div><div className="section-label">Luxury takeaway</div><h2>A consistent hotel presence across every food-service touchpoint.</h2></div><div className="royale-final-images"><img src="/assets/optimized/royale-mansour/waffle-box.jpg" alt="Royale Mansour waffle box mockup" /><img src="/assets/optimized/royale-mansour/sandwich-bag.jpg" alt="Royale Mansour pastry sandwich bag mockup" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Royale Mansour packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function ChilisPackagingPage() {
  const dielines = [
    { title: "Sandwich paper 32 × 32 cm", preview: "/assets/optimized/chilis/sandwich-paper-dieline.jpg", pdf: "/assets/chilis/sandwich-paper.pdf" },
    { title: "Kraft carry bag", preview: "/assets/optimized/chilis/tote-bag-dieline.jpg", pdf: "/assets/chilis/tote-bag.pdf" },
    { title: "Napkin 33 × 33 cm", preview: "/assets/optimized/chilis/napkin-dieline.jpg", pdf: "/assets/chilis/napkin.pdf" },
    { title: "Sticker labels 5 cm + 3 cm", preview: "/assets/optimized/chilis/sticker-label-dieline.jpg", pdf: "/assets/chilis/sticker-label.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell chilis-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Restaurant packaging / Chili's</p>
          <h1>A bold takeaway system for Chili's.</h1>
          <p>A practical packaging set for Chili's restaurant service, using the brand's red-and-green identity across sandwich paper, napkins, stickers, burger boxes, and carry bags.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Chili's</span><span>Context / Restaurant takeaway</span><span>Scope / 4 dielines + 5 applications</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="chilis-visual-grid">
        <figure className="chilis-hero-image"><img src="/assets/optimized/chilis/burger-box.jpg" alt="Chili's burger box mockup with red interior" /><figcaption>Burger packaging</figcaption></figure>
        <figure><img src="/assets/optimized/chilis/tote-bag.jpg" alt="Chili's kraft paper carry bag" /><figcaption>Carry bag</figcaption></figure>
        <figure><img src="/assets/optimized/chilis/stickers.jpg" alt="Chili's sticker roll mockup" /><figcaption>Sealing stickers</figcaption></figure>
        <figure><img src="/assets/optimized/chilis/napkin.jpg" alt="Chili's branded napkin mockup" /><figcaption>Table service</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Brand recognition</h2><p>Kept the Chili's logo, pepper mark, and red-and-green palette immediately visible.</p></article><article><span>02</span><h2>Service moments</h2><p>Covered the formats used from kitchen prep and table service to takeaway delivery.</p></article><article><span>03</span><h2>Small details</h2><p>Used sticker labels and repeated marks to make closures and handoffs feel branded.</p></article><article><span>04</span><h2>Print-ready files</h2><p>Prepared measured artwork for sandwich paper, bags, napkins, and labels.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section chilis-final-grid"><div><div className="section-label">Restaurant takeaway</div><h2>A clear, energetic identity across the full Chili's handoff.</h2></div><div className="chilis-final-images"><img src="/assets/optimized/chilis/sandwich-paper.jpg" alt="Chili's sandwich paper mockup" /><img src="/assets/optimized/chilis/tote-bag.jpg" alt="Chili's kraft carry bag mockup" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Chili's packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function HuaweiPackagingPage() {
  const dielines = [
    { title: "4 oz paper cup", preview: "/assets/optimized/huawei/cup-4oz-dieline.jpg", pdf: "/assets/huawei/cup-4oz.pdf" },
    { title: "Non-woven bag 33 × 30 × 12 cm", preview: "/assets/optimized/huawei/non-woven-bag-dieline.jpg", pdf: "/assets/huawei/non-woven-bag.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell huawei-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Corporate hospitality / Huawei Northern Africa</p>
          <h1>A focused hospitality kit for Huawei.</h1>
          <p>A concise branded packaging application for Huawei Northern Africa, translating the regional identity into a reusable tote bag and a 4 oz coffee cup.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Huawei Northern Africa</span><span>Context / Corporate hospitality</span><span>Scope / 2 dielines + 2 applications</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="huawei-visual-grid">
        <figure><img src="/assets/optimized/huawei/bag.jpg" alt="Huawei Northern Africa branded tote bags" /><figcaption>Event and hospitality tote</figcaption></figure>
        <figure><img src="/assets/optimized/huawei/cup.jpg" alt="Huawei Northern Africa 4 oz paper coffee cup" /><figcaption>4 oz coffee cup</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Regional identity</h2><p>Applied the Northern Africa mark and bilingual naming with a clear corporate finish.</p></article><article><span>02</span><h2>Small format</h2><p>Designed a compact 4 oz cup for coffee service and event hospitality moments.</p></article><article><span>03</span><h2>Reusable carrier</h2><p>Extended the identity onto practical tote bags for branded event and office use.</p></article><article><span>04</span><h2>Production file</h2><p>Prepared the cup artwork as a measured dieline for print production.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section huawei-final-grid"><div><div className="section-label">Corporate hospitality</div><h2>A precise identity system for small, useful brand touchpoints.</h2></div><div className="huawei-final-images"><img src="/assets/optimized/huawei/cup.jpg" alt="Huawei Northern Africa coffee cup mockup" /><img src="/assets/optimized/huawei/bag.jpg" alt="Huawei Northern Africa tote bag mockup" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Huawei packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function DuneCremePackagingPage() {
  const dielines = [
    { title: "Dune Crème packaging file", preview: "/assets/optimized/dune-creme/dune-creme-dieline.jpg", pdf: "/assets/dune-creme/dune-creme.pdf" },
    { title: "Sugar sachet", preview: "/assets/optimized/dune-creme/sugar-sachet-dieline.jpg", pdf: "/assets/dune-creme/sugar-sachet.pdf" },
    { title: "Napkin 30 × 30 cm", preview: "/assets/optimized/dune-creme/napkin-dieline.jpg", pdf: "/assets/dune-creme/napkin.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell dune-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Bakery packaging / Dune Crème</p>
          <h1>A warm, tactile packaging system for Dune Crème.</h1>
          <p>A bakery packaging identity built around soft caramel tones, a clean wordmark, and small branded details across labels, kraft bags, sugar sachets, and table-service napkins.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Dune Crème</span><span>Context / Bakery service</span><span>Scope / 3 dielines + 3 applications</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="dune-visual-grid">
        <figure className="dune-hero-image"><img src="/assets/optimized/dune-creme/labels.jpg" alt="Dune Crème sticker label roll mockup" /><figcaption>Bakery label system</figcaption></figure>
        <figure><img src="/assets/optimized/dune-creme/tote-bag.jpg" alt="Dune Crème kraft carry bag" /><figcaption>Kraft carry bag</figcaption></figure>
        <figure><img src="/assets/optimized/dune-creme/napkin.jpg" alt="Dune Crème branded napkin at a table setting" /><figcaption>Table service</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Warm identity</h2><p>Used caramel, cream, and white to create a soft bakery expression with premium restraint.</p></article><article><span>02</span><h2>Brand details</h2><p>Translated the Dune Crème wordmark into labels and everyday service moments.</p></article><article><span>03</span><h2>Takeaway formats</h2><p>Extended the system onto kraft bags, sugar sachets, and table napkins.</p></article><article><span>04</span><h2>Production files</h2><p>Prepared dielines and print artwork for the supplied bakery packaging formats.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section dune-final-grid"><div><div className="section-label">Bakery takeaway</div><h2>A gentle visual language carried from the counter to the customer's hands.</h2></div><div className="dune-final-images"><img src="/assets/optimized/dune-creme/tote-bag.jpg" alt="Dune Crème kraft carry bag mockup" /><img src="/assets/optimized/dune-creme/labels.jpg" alt="Dune Crème label roll mockup" /></div></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Dune Crème packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function QuincePackagingPage() {
  const dielines = [
    { title: "4 oz paper cup", preview: "/assets/optimized/quince/cup-4oz-dieline.jpg", pdf: "/assets/quince/cup-4oz.pdf" },
    { title: "8 oz paper cup", preview: "/assets/optimized/quince/cup-8oz-dieline.jpg", pdf: "/assets/quince/cup-8oz.pdf" },
    { title: "12 oz paper cup", preview: "/assets/optimized/quince/cup-12oz-dieline.jpg", pdf: "/assets/quince/cup-12oz.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell quince-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Beverage packaging / QUINCE Coffee and Chocolat</p>
          <h1>A three-size cup system for QUINCE.</h1>
          <p>A coordinated coffee cup range for QUINCE Coffee and Chocolat, balancing a burgundy and cream palette with a geometric pattern across 4 oz, 8 oz, and 12 oz formats.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / QUINCE Coffee and Chocolat</span><span>Context / Coffee service</span><span>Scope / 3 dielines + 1 application set</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="quince-visual-grid">
        <figure><img src="/assets/optimized/quince/cups.jpg" alt="QUINCE Coffee and Chocolat paper cups in three sizes" /><figcaption>4 oz, 8 oz, and 12 oz cup family</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Brand expression</h2><p>Built the cup range around QUINCE's burgundy, cream, and geometric visual language.</p></article><article><span>02</span><h2>Size hierarchy</h2><p>Created a consistent system that scales clearly from the smallest coffee to the largest cup.</p></article><article><span>03</span><h2>Pattern placement</h2><p>Used the lower cup area to create rhythm while keeping the QUINCE mark easy to read.</p></article><article><span>04</span><h2>Production files</h2><p>Prepared separate measured dielines for all three paper cup sizes.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section quince-final-grid"><div><div className="section-label">Coffee service</div><h2>A recognizable QUINCE moment at every cup size.</h2></div><img src="/assets/optimized/quince/cups.jpg" alt="QUINCE coffee cup application set" /></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>QUINCE packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function KeatPackagingPage() {
  const dielines = [
    { title: "Keat box / direction 1", preview: "/assets/optimized/keat/box-1-dieline.jpg", pdf: "/assets/keat/box-1.pdf" },
    { title: "Keat box / direction 2", preview: "/assets/optimized/keat/box-2-dieline.jpg", pdf: "/assets/keat/box-2.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell keat-project-shell">
        <a className="project-back" href="/#packaging"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Food packaging / Keat</p>
          <h1>Two material directions for a Keat food box.</h1>
          <p>A packaging exploration for Keat, comparing a clean white finish with a natural kraft direction while keeping the logo, information panel, and decorative linework consistent.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Keat</span><span>Context / Food packaging</span><span>Scope / 2 dielines + 2 material directions</span><span>Role / Packaging designer</span></div>
      </section>
      <section className="keat-visual-grid">
        <figure><img src="/assets/optimized/keat/boxes.jpg" alt="Keat food boxes in white and kraft material directions" /><figcaption>White and kraft directions</figcaption></figure>
      </section>
      <section className="ikea-section">
        <div className="section-label">Packaging system</div>
        <div className="ikea-process"><article><span>01</span><h2>Format defined</h2><p>Developed the box structure around a clear food-service format and readable panels.</p></article><article><span>02</span><h2>Material contrast</h2><p>Explored white and kraft substrates to shift the perceived character of the same box.</p></article><article><span>03</span><h2>Information hierarchy</h2><p>Balanced the Keat mark, descriptive copy, and decorative linework across the panels.</p></article><article><span>04</span><h2>Production files</h2><p>Prepared two dielines for comparing the final packaging directions.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Dieline library</div>
        <div className="ikea-dieline-grid">{dielines.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} dieline preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section keat-final-grid"><div><div className="section-label">Food box study</div><h2>A simple structure with two distinct material personalities.</h2></div><img src="/assets/optimized/keat/boxes.jpg" alt="Keat white and kraft food box mockups" /></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Keat packaging</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function GastonGaliPrintPage() {
  const menus = [
    { title: "Menu finale", note: "Main restaurant menu", mockup: "/assets/optimized/print-menus/gaston-gali-final-mockup.jpg", pdf: "/assets/print-menus/gaston-gali-menu-final.pdf" },
    { title: "Menu Kids", note: "Children's menu direction", mockup: "/assets/optimized/print-menus/menu-kids-mockup.jpg", pdf: "/assets/print-menus/menu-kids.pdf" },
    { title: "Menu Kidz", note: "Alternative kids menu format", mockup: "/assets/optimized/print-menus/menu-kidz-mockup.jpg", pdf: "/assets/print-menus/menu-kidz.pdf" },
    { title: "Menu Gaston Gali", note: "Restaurant menu variant", mockup: "/assets/optimized/print-menus/gaston-gali-menu-mockup.jpg", pdf: "/assets/print-menus/menu-gaston-gali.pdf" },
    { title: "Karty freezing bag", note: "Frozen food packaging print", mockup: "/assets/optimized/print-menus/karty-freezing-bag.jpg", pdf: "/assets/print-menus/karty-freezing-bag.pdf" },
    { title: "Karty Sopalin ECO", note: "Kitchen paper roll packaging", mockup: "/assets/optimized/print-menus/sopalin/sopalin-eco.jpg", pdf: "/assets/print-menus/sopalin/sopalin-eco.pdf" },
    { title: "Karty Sopalin JUMBO", note: "Toilet paper roll packaging", mockup: "/assets/optimized/print-menus/sopalin/sopalin-jumbo.jpg", pdf: "/assets/print-menus/sopalin/sopalin-jumbo.pdf" },
    { title: "Karty Sopalin MAXI", note: "Kitchen paper roll packaging", mockup: "/assets/optimized/print-menus/sopalin/sopalin-maxi.jpg", pdf: "/assets/print-menus/sopalin/sopalin-maxi.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell print-project-shell">
        <a className="project-back" href="/#print"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Print design / Gaston Gali</p>
          <h1>Commercial print made tangible.</h1>
          <p>A print collection spanning restaurant menus, kids-focused formats, and a frozen-food packaging piece. Each project is kept clear, tactile, and ready to move from artwork file to printed object.</p>
        </div>
        <div className="ikea-meta-row"><span>Clients / Gaston Gali + Karty</span><span>Context / Commercial print</span><span>Scope / 8 designs + mockups</span><span>Role / Print designer</span></div>
      </section>
      <section className="print-mockup-grid">{menus.map((menu) => <figure key={menu.title}><img src={menu.mockup} alt={`${menu.title} printed menu mockup`} /><figcaption><strong>{menu.title}</strong><span>{menu.note}</span></figcaption></figure>)}</section>
      <section className="ikea-section">
        <div className="section-label">Print system</div>
        <div className="ikea-process"><article><span>01</span><h2>Hierarchy first</h2><p>Organized menus around quick scanning, clear categories, and readable ordering moments.</p></article><article><span>02</span><h2>Audience variants</h2><p>Separated the main restaurant experience from the more playful kids menu directions.</p></article><article><span>03</span><h2>Format aware</h2><p>Considered how each menu would work as a hand-held printed piece, not only as a flat screen layout.</p></article><article><span>04</span><h2>Production ready</h2><p>Kept the original PDF artwork available for print review, handoff, and future revisions.</p></article></div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Print file library</div>
        <div className="print-asset-grid">{menus.map((menu) => <a className="ikea-dieline-card" href={menu.pdf} target="_blank" rel="noreferrer" key={menu.title}><span>{menu.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div>
      </section>
      <section className="ikea-section print-final-grid"><div><div className="section-label">What this demonstrates</div><h2>A print system that gives every audience its own tone.</h2></div><p>Restaurant print design is part information architecture, part atmosphere. The menu has to guide a decision quickly while still carrying the character of the place.</p></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Gaston Gali print design</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function PhenixIdentityPage() {
  const assets = [
    { title: "Business card", preview: "/assets/optimized/phenix/business-card-preview.jpg", pdf: "/assets/phenix/business-card.pdf" },
    { title: "Letterhead", preview: "/assets/optimized/phenix/letterhead-preview.jpg", pdf: "/assets/phenix/letterhead.pdf" },
    { title: "French brochure", preview: "/assets/optimized/phenix/brochure-fr-preview.jpg", pdf: "/assets/phenix/brochure-fr.pdf" },
    { title: "Arabic brochure", preview: "/assets/optimized/phenix/brochure-ar-preview.jpg", pdf: "/assets/phenix/brochure-ar.pdf" },
  ];

  return (
    <main>
      <Header />
      <section className="project-page-shell phenix-project-shell">
        <a className="project-back" href="/#identity"><ArrowUpRight size={15} /> Back to portfolio</a>
        <div className="project-page-heading">
          <p className="preview-kicker">Brand identity / Phenix Kitchen</p>
          <h1>A bold restaurant identity built around renewal.</h1>
          <p>Created a complete identity foundation for Phenix Kitchen: a vivid phoenix mark, bilingual communication tools, and a flexible visual language for a restaurant brand with energy and ambition.</p>
        </div>
        <div className="ikea-meta-row"><span>Client / Phenix Kitchen</span><span>Context / Restaurant identity</span><span>Scope / Logo + 4 brand assets</span><span>Role / Brand identity designer</span></div>
      </section>
      <section className="phenix-hero-grid"><figure><img src="/assets/optimized/phenix/logo.jpg" alt="Phenix Kitchen phoenix logo" /><figcaption>Primary logo direction</figcaption></figure></section>
      <section className="ikea-section">
        <div className="section-label">Identity in context</div>
        <div className="phenix-mockup-grid">
          <figure><img src="/assets/optimized/phenix/identity-mockup.jpg" alt="Phenix Kitchen stationery and brochure mockup" /><figcaption>Stationery and brochure direction</figcaption></figure>
        </div>
      </section>
      <section className="ikea-section">
        <div className="section-label">Brand brief</div>
        <div className="phenix-brief-grid"><div><h2>From fire to flavor.</h2><p>Phenix Kitchen is positioned as an expressive, modern restaurant brand: warm, memorable, and full of movement. The phoenix symbol communicates rebirth, energy, and transformation, while the kitchen name grounds the identity in food and hospitality.</p></div><div className="phenix-palette"><div><span style={{background:"#100668"}}></span><strong>Midnight Indigo</strong><small>#100668 / Foundation</small></div><div><span style={{background:"#f51f26"}}></span><strong>Ember Red</strong><small>#F51F26 / Energy</small></div><div><span style={{background:"#f6c51d"}}></span><strong>Sun Gold</strong><small>#F6C51D / Warmth</small></div><div><span style={{background:"#69c96b"}}></span><strong>Fresh Green</strong><small>#69C96B / Freshness</small></div></div></div>
      </section>
      <section className="ikea-section"><div className="section-label">Identity system</div><div className="ikea-process"><article><span>01</span><h2>Logo symbol</h2><p>Designed a phoenix mark with a strong silhouette and expressive color movement.</p></article><article><span>02</span><h2>Color language</h2><p>Balanced a deep base with flame and freshness accents for broad restaurant use.</p></article><article><span>03</span><h2>Bilingual tools</h2><p>Extended the identity into French and Arabic brochures for clear local communication.</p></article><article><span>04</span><h2>Brand essentials</h2><p>Prepared core stationery and business materials for everyday restaurant operations.</p></article></div></section>
      <section className="ikea-section"><div className="section-label">Brand asset library</div><div className="phenix-asset-grid">{assets.map((item) => <a className="ikea-dieline-card" href={item.pdf} target="_blank" rel="noreferrer" key={item.title}><img src={item.preview} alt={`${item.title} preview`} /><span>{item.title}</span><small>Open PDF <ArrowUpRight size={14} /></small></a>)}</div></section>
      <section className="ikea-section phenix-concepts"><div className="section-label">Concept extensions</div><div className="phenix-concepts-intro"><h2>Three directions ready to develop from the identity.</h2><p>These are visual explorations built from the existing logo, palette, and typographic character.</p></div><div className="phenix-concept-grid"><article className="phenix-concept-menu"><span>PHENIX KITCHEN</span><strong>MENU</strong><small>From fire to flavor</small></article><article className="phenix-concept-social"><small>NEW SEASON / 01</small><strong>RISE<br />AND<br />DINE</strong><span>PHENIX KITCHEN</span></article><article className="phenix-concept-pack"><span>PHENIX</span><strong>KITCHEN</strong><small>Takeaway direction</small></article></div></section>
      <section className="ikea-section phenix-next-grid"><div><div className="section-label">Suggested next steps</div><h2>Extend the phoenix into the full guest experience.</h2></div><p>Add menu design, exterior signage, staff uniforms, takeaway packaging, social media templates, food photography direction, and a compact brand guideline document.</p></section>
      <footer className="site-footer"><span>{portfolio.name}</span><span>Phenix Kitchen identity</span><span>© {new Date().getFullYear()}</span></footer>
    </main>
  );
}

function Contact() {
  return (
    <section className="contact" id="contact">
      <div className="section-label">Contact</div>
      <div className="contact-grid">
        <h2>Let’s talk about a project, collaboration, or an idea.</h2>
        <div className="contact-details">
          <p>{portfolio.contact.description}</p>
          <a className="contact-email" href={`mailto:${portfolio.email}`}>{portfolio.email} <ArrowUpRight size={19} /></a>
          <div className="contact-socials">
            <a href={`mailto:${portfolio.email}`}><Mail size={17} /> Email</a>
            {portfolio.socials.map((social) => <a href={social.href} key={social.label} target="_blank" rel="noreferrer"><ArrowUpRight size={17} /> {social.label}</a>)}
            <a href={portfolio.resume.href} target="_blank" rel="noreferrer"><Download size={17} /> CV</a>
          </div>
        </div>
      </div>
    </section>
  );
}

createRoot(document.getElementById("root")!).render(<StrictMode><App /></StrictMode>);

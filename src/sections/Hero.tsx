import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Download, ArrowRight, Mail, Phone, Linkedin } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const portraitRef = useRef<HTMLDivElement>(null);
  const ruleRef = useRef<HTMLDivElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const subheadlineRef = useRef<HTMLDivElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const contactRef = useRef<HTMLDivElement>(null);
  const microLabelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Entrance animation timeline
      const tl = gsap.timeline({ defaults: { ease: 'power3.out' } });

      // Portrait entrance
      tl.fromTo(
        portraitRef.current,
        { opacity: 0, x: -40 },
        { opacity: 1, x: 0, duration: 0.9 }
      );

      // Vertical rule
      tl.fromTo(
        ruleRef.current,
        { scaleY: 0 },
        { scaleY: 1, duration: 0.7, ease: 'power2.out' },
        '-=0.6'
      );

      // Micro label
      tl.fromTo(
        microLabelRef.current,
        { opacity: 0, y: -10 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.4'
      );

      // Headline lines staggered
      const headlineLines = headlineRef.current?.querySelectorAll('.headline-line');
      if (headlineLines) {
        tl.fromTo(
          headlineLines,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.7, stagger: 0.08 },
          '-=0.3'
        );
      }

      // Subheadline
      tl.fromTo(
        subheadlineRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.3'
      );

      // CTAs
      tl.fromTo(
        ctaRef.current,
        { opacity: 0, y: 18 },
        { opacity: 1, y: 0, duration: 0.5 },
        '-=0.2'
      );

      // Contact block
      tl.fromTo(
        contactRef.current,
        { opacity: 0, x: 30 },
        { opacity: 1, x: 0, duration: 0.6 },
        '-=0.4'
      );

      // Scroll-driven exit animation
      const scrollTl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: '+=80%',
          pin: true,
          scrub: 0.3,
          onLeaveBack: () => {
            // Reset all elements to visible when scrolling back to top
            gsap.set([portraitRef.current, ruleRef.current, microLabelRef.current], {
              opacity: 1, x: 0, y: 0, scaleY: 1
            });
            gsap.set(headlineRef.current, { opacity: 1, x: 0 });
            gsap.set(subheadlineRef.current, { opacity: 1, y: 0 });
            gsap.set(ctaRef.current, { opacity: 1, y: 0 });
            gsap.set(contactRef.current, { opacity: 1, x: 0, y: 0 });
          }
        }
      });

      // EXIT phase (70% - 100%)
      scrollTl.fromTo(
        headlineRef.current,
        { x: 0, opacity: 1 },
        { x: '18vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        portraitRef.current,
        { x: 0, opacity: 1 },
        { x: '-10vw', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        contactRef.current,
        { y: 0, opacity: 1 },
        { y: '10vh', opacity: 0, ease: 'power2.in' },
        0.7
      );

      scrollTl.fromTo(
        ruleRef.current,
        { scaleY: 1 },
        { scaleY: 0, transformOrigin: 'top' },
        0.75
      );

      scrollTl.fromTo(
        microLabelRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.7
      );

      scrollTl.fromTo(
        subheadlineRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.7
      );

      scrollTl.fromTo(
        ctaRef.current,
        { opacity: 1 },
        { opacity: 0 },
        0.7
      );

    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative w-full h-screen bg-warm-stone overflow-hidden z-10"
    >
      {/* Portrait */}
      <div
        ref={portraitRef}
        className="absolute left-[6vw] top-[10vh] w-[38vw] h-[80vh] border border-[rgba(17,17,17,0.22)] overflow-hidden"
      >
        <img
          src="/hero_portrait.jpg"
          alt="Pravan"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Vertical Rule */}
      <div
        ref={ruleRef}
        className="absolute left-[48vw] top-[12vh] h-[76vh] w-[1px] rule-light"
        style={{ transformOrigin: 'top' }}
      />

      {/* Micro Label */}
      <div
        ref={microLabelRef}
        className="absolute right-[6vw] top-[8vh]"
      >
        <span className="font-mono-label text-secondary-dark">
          CHANDIGARH • OPEN TO INTERNSHIPS
        </span>
      </div>

      {/* Headline Group */}
      <div className="absolute left-[52vw] top-[18vh] w-[42vw]">
        <div ref={headlineRef}>
          <h1 className="text-[clamp(48px,8vw,96px)] font-semibold leading-[0.92] tracking-[-0.02em] text-primary-dark">
            <span className="headline-line block">Hello</span>
          </h1>
        </div>

        <div ref={subheadlineRef} className="mt-8 max-w-[36vw]">
          <p className="text-[clamp(16px,1.4vw,20px)] leading-[1.6] text-primary-dark">
            I'm Pravan — MBA candidate focused on brand operations and data-driven marketing.
          </p>
        </div>

        <div ref={ctaRef} className="mt-8 flex items-center gap-4">
          <a
            href="/Pravan_MBA_Summer_Intern(May-June'26).pdf"
            download
            className="inline-flex items-center gap-2 px-6 py-3 bg-accent-coral text-white font-medium text-sm rounded-[6px] hover:translate-y-[-2px] hover:scale-[1.01] transition-transform duration-200"
          >
            <Download className="w-4 h-4" />
            Download CV
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 px-6 py-3 border border-[rgba(17,17,17,0.3)] text-primary-dark font-medium text-sm rounded-[6px] hover:bg-[rgba(17,17,17,0.05)] transition-colors duration-200"
          >
            View selected work
            <ArrowRight className="w-4 h-4" />
          </a>
        </div>
      </div>

      {/* Contact Block */}
      <div
        ref={contactRef}
        className="absolute right-[6vw] bottom-[10vh] w-[26vw]"
      >
        <div className="space-y-3">
          <a
            href="mailto:pravan.ubs@gmail.com"
            className="flex items-center gap-3 text-primary-dark hover:text-[#D13B3B] transition-colors group"
          >
            <Mail className="w-4 h-4 text-secondary-dark group-hover:text-[#D13B3B]" />
            <span className="text-sm">pravan.ubs@gmail.com</span>
          </a>
          <a
            href="tel:+918437860540"
            className="flex items-center gap-3 text-primary-dark hover:text-[#D13B3B] transition-colors group"
          >
            <Phone className="w-4 h-4 text-secondary-dark group-hover:text-[#D13B3B]" />
            <span className="text-sm">+91 84378 60540</span>
          </a>
          <a
            href="https://linkedin.com/in/pravan/"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-3 text-primary-dark hover:text-[#D13B3B] transition-colors group"
          >
            <Linkedin className="w-4 h-4 text-secondary-dark group-hover:text-[#D13B3B]" />
            <span className="text-sm">LinkedIn</span>
          </a>
        </div>
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const experiences = [
  {
    title: 'Brand Operations & Communications Intern',
    company: 'Chitkara International School',
    location: 'Chandigarh',
    period: 'Apr 2025 – May 2025',
    bullets: [
      'Developed SOPs for a flagship event; streamlined planning workflows.',
      'Coordinated with 3+ departments to deliver creative assets.',
      'Managed vendor procurement (40+ suppliers) and mascot merchandise production.',
      'Delivered the institution\'s Brand Identity Manual.',
    ],
  },
  {
    title: 'Audit Assistant',
    company: 'Deloitte USI',
    location: 'Gurugram',
    period: 'Sep 2023 – May 2024',
    bullets: [
      'Audited performance data for 3 multinational accounts with 100% accuracy.',
      'Resolved 40+ discrepancies; improved reporting efficiency by 25%.',
      'Stakeholder management across 5+ departments and senior leadership.',
      'Synthesized large-scale datasets into high-impact, multi-channel reports.',
    ],
  },
];

export default function Experience() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const rolesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, x: -30 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 75%',
            end: 'top 45%',
            scrub: 0.5,
          },
        }
      );

      // Role cards animation
      const roleCards = rolesRef.current?.querySelectorAll('.role-card');
      if (roleCards) {
        roleCards.forEach((card) => {
          gsap.fromTo(
            card,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 55%',
                scrub: 0.5,
              },
            }
          );

          // Underline rule animation
          const rule = card.querySelector('.role-rule');
          if (rule) {
            gsap.fromTo(
              rule,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.5,
                scrollTrigger: {
                  trigger: card,
                  start: 'top 80%',
                  end: 'top 60%',
                  scrub: 0.5,
                },
              }
            );
          }
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="experience"
      className="relative w-full bg-warm-stone py-[8vh]"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Sticky Heading */}
        <div
          ref={headingRef}
          className="lg:w-[34vw] lg:pl-[6vw] px-6 lg:px-0 mb-10 lg:mb-0 lg:sticky lg:top-[18vh] lg:self-start"
        >
          <span className="font-mono-label text-secondary-dark block mb-4">
            EXPERIENCE
          </span>
          <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] text-primary-dark">
            Where I've made an impact.
          </h2>
        </div>

        {/* Right Column - Timeline */}
        <div
          ref={rolesRef}
          className="lg:w-[54vw] lg:pr-[6vw] px-6 lg:px-0"
        >
          {experiences.map((exp, index) => (
            <div key={index} className="role-card mb-10">
              <div className="mb-4">
                <h3 className="text-[clamp(20px,2vw,26px)] font-semibold text-primary-dark mb-1">
                  {exp.title}
                </h3>
                <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-[14px] text-secondary-dark">
                  <span className="font-medium text-primary-dark">{exp.company}</span>
                  <span>{exp.location}</span>
                  <span className="font-mono-label text-[11px]">{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-6">
                {exp.bullets.map((bullet, bulletIndex) => (
                  <li
                    key={bulletIndex}
                    className="text-[15px] leading-[1.6] text-secondary-dark pl-4 relative before:content-[''] before:absolute before:left-0 before:top-[0.6em] before:w-1 before:h-1 before:bg-[#D13B3B] before:rounded-full"
                  >
                    {bullet}
                  </li>
                ))}
              </ul>

              {index < experiences.length - 1 && (
                <div
                  className="role-rule h-[1px] w-full rule-light"
                  style={{ transformOrigin: 'left' }}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
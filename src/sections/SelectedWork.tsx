import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ArrowRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const projects = [
  {
    title: 'Brand Identity Manual',
    company: 'Chitkara International School',
    description: 'Codified typography, color theory, and tone of voice into a living brand system.',
    cta: 'View summary',
    link: 'https://www.google.com',
    image: '/project_brand_identity.jpg',
    imagePosition: 'left',
  },
  {
    title: 'Power BI Reporting Suite',
    company: 'PwC Switzerland Simulation',
    description: 'Built 4+ dashboards to analyze performance data and support decision-making.',
    cta: 'Explore approach',
    link: 'https://www.google.com',
    image: '/project_powerbi.jpg',
    imagePosition: 'right',
  },
  {
    title: 'L\'Oréal Brandstorm 2025',
    company: 'Competition Project',
    description: 'Market research, product concepts, and scalable brand-led solutions.',
    cta: 'Read the case',
    link: 'https://www.google.com',
    image: '/project_loreal.jpg',
    imagePosition: 'left',
  },
];

export default function SelectedWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const headerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Header animation
      gsap.fromTo(
        headerRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 50%',
            scrub: 0.5,
          },
        }
      );

      // Cards animation
      const cards = cardsRef.current?.querySelectorAll('.project-card');
      if (cards) {
        cards.forEach((card) => {
          const media = card.querySelector('.card-media');
          const text = card.querySelector('.card-text');
          const imagePosition = card.getAttribute('data-image-position');

          // Media animation
          gsap.fromTo(
            media,
            {
              opacity: 0,
              x: imagePosition === 'left' ? -60 : 60,
            },
            {
              opacity: 1,
              x: 0,
              duration: 0.7,
              scrollTrigger: {
                trigger: card,
                start: 'top 85%',
                end: 'top 50%',
                scrub: 0.5,
              },
            }
          );

          // Text animation
          gsap.fromTo(
            text,
            { opacity: 0, y: 30 },
            {
              opacity: 1,
              y: 0,
              duration: 0.6,
              scrollTrigger: {
                trigger: card,
                start: 'top 80%',
                end: 'top 55%',
                scrub: 0.5,
              },
            }
          );
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="work"
      className="relative w-full bg-warm-stone py-[8vh]"
    >
      {/* Header */}
      <div ref={headerRef} className="px-6 lg:pl-[6vw] mb-12">
        <span className="font-mono-label text-secondary-dark block mb-4">
          SELECTED WORK
        </span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] text-primary-dark">
          Projects that connect insight to execution.
        </h2>
      </div>

      {/* Project Cards */}
      <div ref={cardsRef} className="space-y-[8vh]">
        {projects.map((project, index) => (
          <div
            key={index}
            className="project-card w-[88vw] mx-auto lg:ml-[6vw]"
            data-image-position={project.imagePosition}
          >
            <div
              className={`flex flex-col ${
                project.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
              } gap-6 lg:gap-8`}
            >
              {/* Media */}
              <div className="card-media lg:w-[52%] h-[30vh] lg:h-[40vh] border border-[rgba(17,17,17,0.22)] overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Text */}
              <div className="card-text lg:w-[48%] flex flex-col justify-center lg:px-6">
                <h3 className="text-[clamp(22px,2.5vw,32px)] font-semibold text-primary-dark mb-2">
                  {project.title}
                </h3>
                <p className="text-[14px] text-secondary-dark mb-1">
                  {project.company}
                </p>
                <p className="text-[15px] leading-[1.6] text-primary-dark mb-6">
                  {project.description}
                </p>
                <a
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 text-[14px] font-medium text-[#D13B3B] hover:gap-3 transition-all group"
                >
                  {project.cta}
                  <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const stats = [
  { number: '3+', label: 'Multinational accounts audited' },
  { number: '40+', label: 'Data discrepancies resolved' },
  { number: '25%', label: 'Reporting efficiency improvement' },
];

export default function About() {
  const sectionRef = useRef<HTMLElement>(null);
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const statsRef = useRef<HTMLDivElement>(null);
  const quoteRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Image animation
      gsap.fromTo(
        imageRef.current,
        { opacity: 0.2, y: 60 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 80%',
            end: 'top 35%',
            scrub: 0.5,
          },
        }
      );

      // Content blocks animation
      const contentBlocks = contentRef.current?.querySelectorAll('.content-block');
      if (contentBlocks) {
        gsap.fromTo(
          contentBlocks,
          { opacity: 0, y: 40 },
          {
            opacity: 1,
            y: 0,
            duration: 0.6,
            stagger: 0.1,
            scrollTrigger: {
              trigger: contentRef.current,
              start: 'top 75%',
              end: 'top 40%',
              scrub: 0.5,
            },
          }
        );
      }

      // Stats animation
      const statItems = statsRef.current?.querySelectorAll('.stat-item');
      if (statItems) {
        gsap.fromTo(
          statItems,
          { opacity: 0, scale: 0.96 },
          {
            opacity: 1,
            scale: 1,
            duration: 0.5,
            stagger: 0.08,
            scrollTrigger: {
              trigger: statsRef.current,
              start: 'top 80%',
              end: 'top 50%',
              scrub: 0.5,
            },
          }
        );
      }

      // Quote animation
      gsap.fromTo(
        quoteRef.current,
        { opacity: 0, y: 30 },
        {
          opacity: 1,
          y: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: quoteRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="about"
      className="relative w-full min-h-screen bg-warm-stone py-[10vh]"
    >
      <div className="flex flex-col lg:flex-row">
        {/* Left Column - Image */}
        <div
          ref={imageRef}
          className="lg:w-[40vw] lg:ml-[6vw] px-6 lg:px-0 mb-12 lg:mb-0"
        >
          <div className="relative w-full h-[50vh] lg:h-screen border border-[rgba(17,17,17,0.22)] overflow-hidden">
            <img
              src="/about_portrait.png"
              alt="About Pravan"
              className="w-full h-full object-cover"
            />
          </div>
        </div>

        {/* Right Column - Content */}
        <div
          ref={contentRef}
          className="lg:w-[42vw] lg:ml-[4vw] px-6 lg:px-0 lg:pr-[6vw]"
        >
          <div className="content-block mb-6">
            <span className="font-mono-label text-secondary-dark block mb-4">
              ABOUT
            </span>
            <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] text-primary-dark">
              I turn complex data into clear brand decisions.
            </h2>
          </div>

          <div className="content-block mb-8">
            <p className="text-[16px] leading-[1.7] text-primary-dark mb-4">
              I've worked across audit analytics and brand operations—translating numbers into stories and processes into scalable systems.
            </p>
            <p className="text-[16px] leading-[1.7] text-secondary-dark">
              At Deloitte, I improved reporting efficiency by 25% while managing stakeholders across multiple departments. At Chitkara International School, I built SOPs, managed vendors, and delivered a full brand identity manual.
            </p>
          </div>

          {/* Stats */}
          <div ref={statsRef} className="grid grid-cols-3 gap-4 mb-10">
            {stats.map((stat, index) => (
              <div key={index} className="stat-item">
                <div className="text-[clamp(28px,3vw,40px)] font-semibold text-primary-dark leading-none mb-2">
                  {stat.number}
                </div>
                <div className="text-[12px] leading-[1.4] text-secondary-dark">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>

          {/* Quote */}
          <div
            ref={quoteRef}
            className="border-l-2 border-[#D13B3B] pl-6 py-2"
          >
            <p className="text-[clamp(20px,2vw,28px)] font-medium text-primary-dark leading-[1.3] mb-3">
              "Clarity is the strategy."
            </p>
            <p className="text-[14px] leading-[1.6] text-secondary-dark">
              I believe the best marketing feels obvious—because the data made it inevitable.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
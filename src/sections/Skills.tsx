import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { TrendingUp, Layers, Zap, Users, BarChart3, MessageSquare } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const skills = [
  {
    icon: TrendingUp,
    title: 'Marketing Strategy',
    description: 'Positioning, messaging, and go-to-market planning.',
  },
  {
    icon: Layers,
    title: 'Brand Operations',
    description: 'SOPs, identity systems, and cross-functional delivery.',
  },
  {
    icon: Zap,
    title: 'Campaign Execution',
    description: 'End-to-end coordination from brief to launch.',
  },
  {
    icon: Users,
    title: 'Consumer Engagement',
    description: 'CX, content planning, and community building.',
  },
  {
    icon: BarChart3,
    title: 'Market & Data Analysis',
    description: 'Excel, Power BI, and insight-driven reporting.',
  },
  {
    icon: MessageSquare,
    title: 'Stakeholder Communication',
    description: 'Clear narratives for leadership and teams.',
  },
];

export default function Skills() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const gridRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
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

      // Skill blocks animation
      const skillBlocks = gridRef.current?.querySelectorAll('.skill-block');
      if (skillBlocks) {
        skillBlocks.forEach((block, index) => {
          gsap.fromTo(
            block,
            { opacity: 0, y: 40 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: block,
                start: 'top 90%',
                end: 'top 65%',
                scrub: 0.5,
              },
            }
          );

          // Top rule animation
          const rule = block.querySelector('.skill-rule');
          if (rule) {
            gsap.fromTo(
              rule,
              { scaleX: 0 },
              {
                scaleX: 1,
                duration: 0.4,
                delay: index * 0.06,
                scrollTrigger: {
                  trigger: block,
                  start: 'top 85%',
                  end: 'top 70%',
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
      id="skills"
      className="relative w-full bg-warm-stone py-[8vh]"
    >
      {/* Header */}
      <div ref={headingRef} className="px-6 lg:pl-[6vw] mb-12">
        <span className="font-mono-label text-secondary-dark block mb-4">
          SKILLS
        </span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] text-primary-dark">
          What I do best.
        </h2>
      </div>

      {/* Skills Grid */}
      <div
        ref={gridRef}
        className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8 px-6 lg:px-[6vw]"
      >
        {skills.map((skill, index) => {
          const Icon = skill.icon;
          return (
            <div key={index} className="skill-block group">
              <div
                className="skill-rule h-[1px] w-full rule-light mb-4"
                style={{ transformOrigin: 'left' }}
              />
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 flex items-center justify-center border border-[rgba(17,17,17,0.2)] group-hover:border-[#D13B3B] group-hover:bg-[rgba(209,59,59,0.05)] transition-colors">
                  <Icon className="w-5 h-5 text-secondary-dark group-hover:text-[#D13B3B] transition-colors" />
                </div>
                <div>
                  <h3 className="text-[18px] font-semibold text-primary-dark mb-2">
                    {skill.title}
                  </h3>
                  <p className="text-[14px] leading-[1.6] text-secondary-dark">
                    {skill.description}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, GraduationCap } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const education = [
  {
    degree: 'MBA',
    institution: 'University Business School, Panjab University',
    period: '2025–2027',
    icon: GraduationCap,
  },
  {
    degree: 'B.Com (Hons) Accounting & Finance',
    institution: 'GGDS College, Panjab University',
    detail: '85.10%',
    period: '2020–2023',
    icon: GraduationCap,
  },
];

const certifications = [
  {
    name: 'Digital Marketing Certification',
    issuer: 'IIM Bangalore (SWAYAM)',
    detail: '74.4%',
  },
  {
    name: 'Power BI Job Simulation',
    issuer: 'PwC Switzerland',
    detail: '',
  },
  {
    name: 'Bloomberg Client Service Simulation',
    issuer: 'Bloomberg',
    detail: '',
  },
  {
    name: 'L\'Oréal Brandstorm 2025',
    issuer: 'L\'Oréal',
    detail: '',
  },
  {
    name: 'Lean Six Sigma Green Belt',
    issuer: 'Certified',
    detail: '',
  },
];

export default function Education() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const eduBlockRef = useRef<HTMLDivElement>(null);
  const certsBlockRef = useRef<HTMLDivElement>(null);

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

      // Education block animation
      gsap.fromTo(
        eduBlockRef.current,
        { opacity: 0, x: -20 },
        {
          opacity: 1,
          x: 0,
          duration: 0.6,
          scrollTrigger: {
            trigger: eduBlockRef.current,
            start: 'top 85%',
            end: 'top 60%',
            scrub: 0.5,
          },
        }
      );

      // Certification rows animation
      const certRows = certsBlockRef.current?.querySelectorAll('.cert-row');
      if (certRows) {
        certRows.forEach((row) => {
          gsap.fromTo(
            row,
            { opacity: 0, y: 24 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              scrollTrigger: {
                trigger: row,
                start: 'top 90%',
                end: 'top 70%',
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
      className="relative w-full bg-warm-stone py-[8vh]"
    >
      {/* Header */}
      <div ref={headingRef} className="px-6 lg:pl-[6vw] mb-12">
        <span className="font-mono-label text-secondary-dark block mb-4">
          EDUCATION & CERTIFICATIONS
        </span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] text-primary-dark">
          Built on strong foundations.
        </h2>
      </div>

      <div className="flex flex-col lg:flex-row px-6 lg:px-[6vw] gap-10 lg:gap-16">
        {/* Education Column */}
        <div ref={eduBlockRef} className="lg:w-1/2">
          <h3 className="font-mono-label text-secondary-dark mb-6">EDUCATION</h3>
          <div className="space-y-6">
            {education.map((edu, index) => {
              const Icon = edu.icon;
              return (
                <div key={index} className="flex items-start gap-4">
                  <div className="w-10 h-10 flex items-center justify-center border border-[rgba(17,17,17,0.2)]">
                    <Icon className="w-5 h-5 text-secondary-dark" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-semibold text-primary-dark">
                      {edu.degree}
                    </h4>
                    <p className="text-[14px] text-secondary-dark">
                      {edu.institution}
                    </p>
                    <div className="flex items-center gap-3 mt-1">
                      <span className="font-mono-label text-[11px] text-secondary-dark">
                        {edu.period}
                      </span>
                      {edu.detail && (
                        <span className="text-[13px] text-[#D13B3B] font-medium">
                          {edu.detail}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Certifications Column */}
        <div ref={certsBlockRef} className="lg:w-1/2">
          <h3 className="font-mono-label text-secondary-dark mb-6">CERTIFICATIONS</h3>
          <div className="space-y-4">
            {certifications.map((cert, index) => (
              <div
                key={index}
                className="cert-row flex items-center justify-between py-3 border-b border-[rgba(17,17,17,0.1)]"
              >
                <div className="flex items-center gap-3">
                  <Award className="w-4 h-4 text-[#D13B3B]" />
                  <span className="text-[15px] text-primary-dark">{cert.name}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="text-[13px] text-secondary-dark">{cert.issuer}</span>
                  {cert.detail && (
                    <span className="text-[12px] text-[#D13B3B] font-medium">
                      {cert.detail}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
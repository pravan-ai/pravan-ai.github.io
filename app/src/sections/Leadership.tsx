import { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Trophy, Heart } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const leadershipCards = [
  {
    title: 'Infosys Campus Ambassador (2025)',
    description: 'Selected among Top 36 of 1,250+ nationwide. Analyzed outreach data to improve campaign participation.',
    metric: 'Top 3%',
    metricLabel: 'Selection Rate',
    image: '/leadership_campus.jpg',
    imagePosition: 'left',
    icon: Trophy,
  },
  {
    title: 'Rotaract Club & Social Impact',
    description: 'Led teams of 20–120 volunteers; executed events with 3,000+ footfall. Project Ambika: supported marketing and fundraising (₹1L+). Robin Hood Army & NSS: mentored 55+ students; supported 200+ meals/month.',
    metric: '3,000+',
    metricLabel: 'Event Footfall',
    image: '/leadership_volunteer.jpg',
    imagePosition: 'right',
    icon: Heart,
  },
];

export default function Leadership() {
  const sectionRef = useRef<HTMLElement>(null);
  const headingRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.fromTo(
        headingRef.current,
        { opacity: 0, y: 24 },
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
      const cards = cardsRef.current?.querySelectorAll('.leadership-card');
      if (cards) {
        cards.forEach((card) => {
          const image = card.querySelector('.card-image');
          const text = card.querySelector('.card-text');
          const imagePosition = card.getAttribute('data-image-position');

          gsap.fromTo(
            image,
            {
              opacity: 0,
              x: imagePosition === 'left' ? -50 : 50,
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

          gsap.fromTo(
            text,
            {
              opacity: 0,
              x: imagePosition === 'left' ? 30 : -30,
            },
            {
              opacity: 1,
              x: 0,
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
      className="relative w-full bg-warm-stone py-[8vh]"
    >
      {/* Header */}
      <div ref={headingRef} className="px-6 lg:pl-[6vw] mb-12">
        <span className="font-mono-label text-secondary-dark block mb-4">
          LEADERSHIP & COMMUNITY
        </span>
        <h2 className="text-[clamp(32px,4vw,48px)] font-semibold leading-[1.05] text-primary-dark">
          Impact beyond the desk.
        </h2>
      </div>

      {/* Leadership Cards */}
      <div ref={cardsRef} className="space-y-[6vh] px-6 lg:px-[6vw]">
        {leadershipCards.map((card, index) => {
          const Icon = card.icon;
          return (
            <div
              key={index}
              className="leadership-card"
              data-image-position={card.imagePosition}
            >
              <div
                className={`flex flex-col ${
                  card.imagePosition === 'right' ? 'lg:flex-row-reverse' : 'lg:flex-row'
                } gap-6 lg:gap-8 items-center`}
              >
                {/* Image */}
                <div className="card-image lg:w-1/2 h-[30vh] lg:h-[35vh] border border-[rgba(17,17,17,0.22)] overflow-hidden">
                  <img
                    src={card.image}
                    alt={card.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Text */}
                <div className="card-text lg:w-1/2 lg:px-6">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 flex items-center justify-center border border-[rgba(17,17,17,0.2)]">
                      <Icon className="w-5 h-5 text-[#D13B3B]" />
                    </div>
                    <span className="font-mono-label text-secondary-dark">IMPACT</span>
                  </div>

                  <h3 className="text-[clamp(20px,2vw,26px)] font-semibold text-primary-dark mb-3">
                    {card.title}
                  </h3>

                  <p className="text-[15px] leading-[1.6] text-secondary-dark mb-6">
                    {card.description}
                  </p>

                  <div className="inline-flex items-baseline gap-2">
                    <span className="text-[clamp(32px,3vw,48px)] font-semibold text-[#D13B3B] leading-none">
                      {card.metric}
                    </span>
                    <span className="text-[13px] text-secondary-dark">
                      {card.metricLabel}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
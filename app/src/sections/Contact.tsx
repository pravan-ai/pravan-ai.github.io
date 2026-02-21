import { useEffect, useRef, useState } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Mail, Phone, Linkedin, Send, ArrowUpRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const sectionRef = useRef<HTMLElement>(null);
  const headlineRef = useRef<HTMLDivElement>(null);
  const detailsRef = useRef<HTMLDivElement>(null);
  const formRef = useRef<HTMLDivElement>(null);

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Headline animation
      gsap.fromTo(
        headlineRef.current,
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

      // Contact details animation
      const detailItems = detailsRef.current?.querySelectorAll('.detail-item');
      if (detailItems) {
        gsap.fromTo(
          detailItems,
          { opacity: 0, y: 20 },
          {
            opacity: 1,
            y: 0,
            duration: 0.5,
            stagger: 0.1,
            scrollTrigger: {
              trigger: detailsRef.current,
              start: 'top 85%',
              end: 'top 60%',
              scrub: 0.5,
            },
          }
        );
      }

      // Form animation
      gsap.fromTo(
        formRef.current,
        { opacity: 0, y: 40, scale: 0.98 },
        {
          opacity: 1,
          y: 0,
          scale: 1,
          duration: 0.6,
          scrollTrigger: {
            trigger: formRef.current,
            start: 'top 90%',
            end: 'top 65%',
            scrub: 0.5,
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', message: '' });
      setSubmitted(false);
    }, 3000);
  };

  return (
    <section
      ref={sectionRef}
      id="contact"
      className="relative w-full bg-dark py-[10vh]"
    >
      <div className="flex flex-col lg:flex-row px-6 lg:px-[6vw] gap-10 lg:gap-16">
        {/* Left Column - Headline + Contact Details */}
        <div className="lg:w-1/2">
          <div ref={headlineRef} className="mb-10">
            <h2 className="text-[clamp(36px,5vw,64px)] font-semibold leading-[1.05] text-[#F5F3F0] mb-4">
              Let's build something precise.
            </h2>
            <p className="text-[16px] leading-[1.6] text-[rgba(245,243,240,0.7)]">
              Open to internships and collaborations in brand, ops, and analytics.
            </p>
          </div>

          <div ref={detailsRef} className="space-y-4">
            <a
              href="mailto:pravan.ubs@gmail.com"
              className="detail-item flex items-center gap-4 text-[#F5F3F0] hover:text-[#D13B3B] transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.2)] group-hover:border-[#D13B3B] transition-colors">
                <Mail className="w-5 h-5" />
              </div>
              <span className="text-[15px]">pravan.ubs@gmail.com</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="tel:+918437860540"
              className="detail-item flex items-center gap-4 text-[#F5F3F0] hover:text-[#D13B3B] transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.2)] group-hover:border-[#D13B3B] transition-colors">
                <Phone className="w-5 h-5" />
              </div>
              <span className="text-[15px]">+91 84378 60540</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>

            <a
              href="https://linkedin.com/in/pravan/"
              target="_blank"
              rel="noopener noreferrer"
              className="detail-item flex items-center gap-4 text-[#F5F3F0] hover:text-[#D13B3B] transition-colors group"
            >
              <div className="w-10 h-10 flex items-center justify-center border border-[rgba(255,255,255,0.2)] group-hover:border-[#D13B3B] transition-colors">
                <Linkedin className="w-5 h-5" />
              </div>
              <span className="text-[15px]">LinkedIn</span>
              <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
            </a>
          </div>
        </div>

        {/* Right Column - Form */}
        <div ref={formRef} className="lg:w-1/2">
          <div className="border border-[rgba(255,255,255,0.15)] p-6 lg:p-8">
            <h3 className="font-mono-label text-[rgba(245,243,240,0.6)] mb-6">
              SEND A MESSAGE
            </h3>

            {submitted ? (
              <div className="py-10 text-center">
                <div className="w-12 h-12 mx-auto mb-4 flex items-center justify-center bg-[#D13B3B] rounded-full">
                  <Send className="w-5 h-5 text-white" />
                </div>
                <p className="text-[#F5F3F0] text-lg font-medium">Message sent!</p>
                <p className="text-[rgba(245,243,240,0.6)] text-sm mt-2">
                  I'll get back to you soon.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-[12px] text-[rgba(245,243,240,0.5)] mb-2 uppercase tracking-wider">
                    Name
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] py-2 text-[#F5F3F0] focus:border-[#D13B3B] focus:outline-none transition-colors"
                    placeholder="Your name"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[rgba(245,243,240,0.5)] mb-2 uppercase tracking-wider">
                    Email
                  </label>
                  <input
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] py-2 text-[#F5F3F0] focus:border-[#D13B3B] focus:outline-none transition-colors"
                    placeholder="your@email.com"
                  />
                </div>

                <div>
                  <label className="block text-[12px] text-[rgba(245,243,240,0.5)] mb-2 uppercase tracking-wider">
                    Message
                  </label>
                  <textarea
                    required
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    className="w-full bg-transparent border-b border-[rgba(255,255,255,0.2)] py-2 text-[#F5F3F0] focus:border-[#D13B3B] focus:outline-none transition-colors resize-none"
                    placeholder="Tell me about your project..."
                  />
                </div>

                <button
                  type="submit"
                  className="w-full mt-4 inline-flex items-center justify-center gap-2 px-6 py-3 bg-[#D13B3B] text-white font-medium text-sm hover:translate-y-[-2px] hover:scale-[1.01] transition-transform duration-200"
                >
                  <Send className="w-4 h-4" />
                  Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-16 pt-8 border-t border-[rgba(255,255,255,0.1)] px-6 lg:px-[6vw]">
        <div className="flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[12px] text-[rgba(245,243,240,0.5)]">
            © Pravan — 2025
          </p>
          <p className="text-[12px] text-[rgba(245,243,240,0.5)]">
            MBA Candidate • Chandigarh
          </p>
        </div>
      </div>
    </section>
  );
}
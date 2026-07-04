import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import ProfileSection from '@/components/ProfileSection';
import ExperienceSection from '@/components/ExperienceSection';
import SkillsSection from '@/components/SkillsSection';
import ProjectsSection from '@/components/ProjectsSection';
import ContactSection from '@/components/ContactSection';
import Footer from '@/components/Footer';

export default function Home() {
  return (
    <div className="jm-layout">
      <header className="jm-layout__item jm-layout__item--left flex flex-col">
        <h1 className="jm-logo">KIM JE MIN</h1>
        <h3 className="flex-none text-xs uppercase tracking-wider pt-9 pb-5">Portfolio</h3>
        <Header />
      </header>

      <main className="jm-layout__item">
        <article className="jm-article">
          <section className="jm-article__section" id="main-content">
            <ProfileSection />
            <ExperienceSection />
            <SkillsSection />
            <ProjectsSection />
            <ContactSection />
            <Footer />
          </section>

          <section className="jm-article__section flex flex-col" id="hero-section">
            <HeroSection />
          </section>
        </article>
      </main>
    </div>
  );
}

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import Hero from "../features/hero/Hero";
import Skills from "../features/skills/Skills";
import Projects from "../features/projects/Projects";
import Experience from "../features/experience/Experience";
import Hackathons from "../features/hackathons/Hackathons";
import Certifications from "../features/certifications/Certifications";
import Achievements from "../features/achievements/Achievements";
import About from "../features/about/About";
import Contact from "../features/contact/contact";

import FloatingHeroImage from "../components/animation/FloatingHeroImage";
import Chatbot from "../../chatbot/chatbot";

function Home() {
    return (
        <>
            <Navbar />

            <main className="relative overflow-hidden bg-[#fafafa]">
                {/* Floating profile image
            Visually travels from Hero into Skills */}
                <FloatingHeroImage />

                {/* Hero */}
                <section className="relative z-10">
                    <Hero />
                </section>

                {/* Skills */}
                <section className="relative z-10">
                    <Skills />
                </section>

                {/* Projects */}
                <Projects />

                {/* Experience */}
                <Experience />

                {/* Hackathons */}
                <Hackathons />

                {/* Certifications */}
                <Certifications />

                {/* Achievements */}
                <Achievements />

                {/* About */}
                <About />

                {/* Contact + JARVIS */}
                <Contact />
                <Chatbot />

            </main>

            <Footer />
        </>
    );
}

export default Home;
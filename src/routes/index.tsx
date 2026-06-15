import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Experience } from "@/components/portfolio/Experience";
import { Projects } from "@/components/portfolio/Projects";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Footer } from "@/components/portfolio/Footer";
import { getProjects } from "@/lib/api/projects.functions";
import { getSkills } from "@/lib/api/skills.functions";
import { getExperiences } from "@/lib/api/experiences.functions";
import { getCertifications } from "@/lib/api/certifications.functions";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Bernardo Daniel — Full Stack Developer" },
      {
        name: "description",
        content:
          "Portfolio de Bernardo Daniel — desenvolvedor full stack e micro-SaaS. React, TypeScript, Next.js, Supabase.",
      },
      { property: "og:title", content: "Bernardo Daniel — Full Stack Developer" },
      {
        property: "og:description",
        content: "Desenvolvedor full stack e micro-SaaS. Aberto a novas oportunidades.",
      },
      { property: "og:type", content: "website" },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
  }),
  loader: async () => {
    const [projects, skills, experiences, certifications] = await Promise.all([
      getProjects({ data: { publishedOnly: true } }),
      getSkills({ data: {} }),
      getExperiences({ data: {} }),
      getCertifications({ data: {} }),
    ]);
    return { projects, skills, experiences, certifications };
  },
  component: Index,
});

function Index() {
  const { projects, skills, experiences, certifications } = Route.useLoaderData();

  return (
    <main className="min-h-screen">
      <Header />
      <Hero />
      <About />
      <Skills skills={skills} />
      <Experience experiences={experiences} />
      <Projects projects={projects} />
      <Certifications certifications={certifications} />
      <Contact />
      <Footer />
    </main>
  );
}

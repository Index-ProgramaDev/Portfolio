import i18n from "i18next";
import { initReactI18next } from "react-i18next";

export const resources = {
  "pt-BR": {
    translation: {
      nav: {
        about: "Sobre",
        skills: "Skills",
        experience: "Experiência",
        projects: "Projetos",
        contact: "Contato",
      },
      hero: {
        badge: "Disponível para novas oportunidades",
        title: "Construindo software que ",
        titleAccent: "escala.",
        subtitle:
          "Desenvolvedor full stack focado em produtos web modernos e micro-SaaS. 2 anos transformando ideias em sistemas reais.",
        ctaProjects: "Ver Projetos",
        ctaContact: "Entrar em Contato",
        scroll: "Role para descobrir",
      },
      about: {
        eyebrow: "Sobre mim",
        title: "Engenharia com foco em produto",
        p1: "Sou Bernardo Daniel, desenvolvedor de software e micro-SaaS há 2 anos. Já entreguei sites freelancing para clientes de áreas diversas e venho refinando meu workflow com TypeScript, React e arquiteturas serverless.",
        p2: "Atualmente estou aberto a novas oportunidades — em times que valorizam código limpo, performance e atenção aos detalhes na experiência do usuário.",
        stats: {
          years: "Anos de experiência",
          projects: "Projetos entregues",
          stack: "Tecnologias dominadas",
        },
      },
      skills: {
        eyebrow: "Stack",
        title: "Tecnologias que uso no dia a dia",
        subtitle: "Ferramentas escolhidas pela produtividade, não pelo hype.",
        categories: {
          frontend: "Frontend",
          backend: "Backend",
          database: "Banco de Dados",
          devops: "DevOps & Cloud",
        },
      },
      experience: {
        eyebrow: "Trajetória",
        title: "Experiência profissional",
        present: "Atual",
      },
      projects: {
        eyebrow: "Trabalhos selecionados",
        title: "Projetos em destaque",
        subtitle: "Uma amostra dos sistemas e produtos que construí.",
        live: "Demo",
        code: "Código",
        all: "Todos",
      },
      certifications: {
        eyebrow: "Certificações",
        title: "Credenciais e cursos",
        subtitle: "Aprendizado constante e validação de habilidades.",
      },
      contact: {
        eyebrow: "Vamos conversar",
        title: "Tem um projeto em mente?",
        subtitle:
          "Respondo em até 24h. Sinta-se livre para mandar uma proposta, dúvida ou apenas um olá.",
        name: "Nome",
        email: "Email",
        subject: "Assunto",
        message: "Mensagem",
        send: "Enviar mensagem",
        sending: "Enviando...",
        success: "Mensagem enviada! Retorno em breve.",
        error: "Preencha todos os campos.",
      },
      footer: {
        rights: "Todos os direitos reservados.",
        built: "Construído com React, TypeScript & Tailwind.",
      },
    },
  },
  en: {
    translation: {
      nav: {
        about: "About",
        skills: "Skills",
        experience: "Experience",
        projects: "Projects",
        contact: "Contact",
      },
      hero: {
        badge: "Available for new opportunities",
        title: "Building software that ",
        titleAccent: "scales.",
        subtitle:
          "Full stack developer focused on modern web products and micro-SaaS. 2 years turning ideas into real systems.",
        ctaProjects: "View Projects",
        ctaContact: "Get in Touch",
        scroll: "Scroll to explore",
      },
      about: {
        eyebrow: "About me",
        title: "Engineering with a product mindset",
        p1: "I'm Bernardo Daniel, a software developer and micro-SaaS builder for the past 2 years. I've shipped freelance websites for clients across different industries and refined my workflow around TypeScript, React, and serverless architectures.",
        p2: "I'm currently open to new opportunities — teams that value clean code, performance, and obsessive attention to UX details.",
        stats: {
          years: "Years of experience",
          projects: "Projects shipped",
          stack: "Technologies mastered",
        },
      },
      skills: {
        eyebrow: "Stack",
        title: "Tools I reach for daily",
        subtitle: "Chosen for productivity, not for the hype.",
        categories: {
          frontend: "Frontend",
          backend: "Backend",
          database: "Database",
          devops: "DevOps & Cloud",
        },
      },
      experience: {
        eyebrow: "Journey",
        title: "Professional experience",
        present: "Present",
      },
      projects: {
        eyebrow: "Selected work",
        title: "Featured projects",
        subtitle: "A sample of the systems and products I've built.",
        live: "Live",
        code: "Code",
        all: "All",
      },
      certifications: {
        eyebrow: "Certifications",
        title: "Credentials and courses",
        subtitle: "Continuous learning and skill validation.",
      },
      contact: {
        eyebrow: "Let's talk",
        title: "Got a project in mind?",
        subtitle: "I reply within 24h. Send a proposal, a question, or just a hi.",
        name: "Name",
        email: "Email",
        subject: "Subject",
        message: "Message",
        send: "Send message",
        sending: "Sending...",
        success: "Message sent! I'll get back to you soon.",
        error: "Please fill in all fields.",
      },
      footer: {
        rights: "All rights reserved.",
        built: "Built with React, TypeScript & Tailwind.",
      },
    },
  },
} as const;

if (!i18n.isInitialized) {
  const saved =
    typeof window !== "undefined" ? window.localStorage.getItem("lang") : null;
  void i18n.use(initReactI18next).init({
    resources,
    lng: "pt-BR",
    fallbackLng: "en",
    interpolation: { escapeValue: false },
  });
  
  // After initializing, if there's a saved language, switch to it
  if (typeof window !== "undefined" && saved && saved !== "pt-BR") {
    i18n.changeLanguage(saved);
  }
}

export default i18n;

import type { Language } from '../hooks/useLanguage'

export type IconName =
  | 'code'
  | 'server'
  | 'database'
  | 'spark'
  | 'tools'
  | 'globe'
  | 'workflow'
  | 'briefcase'
  | 'layers'
  | 'cart'
  | 'bot'
  | 'link'
  | 'message'
  | 'layout'
  | 'sheet'

export interface SkillGroup {
  title: string
  icon: IconName
  items: string[]
}

export interface ExperienceItem {
  role: string
  company: string
  location: string
  period: string
  description: string[]
  activities: string[]
}

export type ProjectPreview =
  | { kind: 'image'; src: string }
  | { kind: 'chat' }
  | { kind: 'sheet' }

export interface ProjectItem {
  title: string
  icon: IconName
  preview?: ProjectPreview
  description: string[]
  tags: string[]
  demo?: string
  github?: string
}

interface PortfolioContent {
  nav: {
    about: string
    skills: string
    experience: string
    projects: string
    education: string
    contact: string
    menu: string
    close: string
    theme: string
    language: string
  }
  labels: {
    location: string
    present: string
    liveDemo: string
    repository: string
    activities: string
    email: string
    github: string
    linkedin: string
    galleryHint: string
  }
  hero: {
    greeting: string
    role: string
    bio: string
    status: string
    projectsButton: string
    resumeButton: string
  }
  skills: { kicker: string; title: string; subtitle: string; groups: SkillGroup[] }
  experience: { kicker: string; title: string; subtitle: string; items: ExperienceItem[] }
  projects: { kicker: string; title: string; subtitle: string; items: ProjectItem[] }
  education: {
    kicker: string
    title: string
    degree: string
    university: string
    location: string
    period: string
    paragraphs: string[]
  }
  contact: { kicker: string; title: string; paragraphs: string[]; location: string }
  footer: { description: string; rights: string; backToTop: string }
}

export const translations: Record<Language, PortfolioContent> = {
  en: {
    nav: {
      about: 'About',
      skills: 'Skills',
      experience: 'Experience',
      projects: 'Projects',
      education: 'Education',
      contact: 'Contact',
      menu: 'Open navigation menu',
      close: 'Close navigation menu',
      theme: 'Toggle color theme',
      language: 'Change language to Portuguese',
    },
    labels: {
      location: 'Location',
      present: 'Present',
      liveDemo: 'Live demo',
      repository: 'GitHub',
      activities: 'Key responsibilities',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      galleryHint: 'Hover or scroll to preview each project',
    },
    hero: {
      greeting: 'Hi, I’m',
      role: 'Full-Stack Developer & AI Automation Specialist.',
      bio: 'Computer Science graduate from FUMEC University. I build web systems, integrate CRMs and design AI workflows that automate customer service and lead qualification, turning business rules into clear, scalable processes.',
      status: 'Open to opportunities',
      projectsButton: 'View projects',
      resumeButton: 'Resume',
    },
    skills: {
      kicker: 'Technical skills',
      title: 'A practical toolkit for end-to-end solutions',
      subtitle:
        'Technologies and methods I use to build, connect and maintain reliable digital products.',
      groups: [
        {
          title: 'Front-End',
          icon: 'code',
          items: ['ReactJS', 'Next.js', 'JavaScript ES6', 'HTML5', 'CSS3', 'Tailwind CSS', 'Responsive Design'],
        },
        {
          title: 'Back-End',
          icon: 'server',
          items: ['Node.js', 'Express', 'PHP', 'Laravel', 'REST APIs', 'Business Logic Implementation'],
        },
        {
          title: 'Databases',
          icon: 'database',
          items: ['MySQL', 'Structured Data Management', 'Database Maintenance', 'Data Registration Workflows'],
        },
        {
          title: 'AI Automation & Integrations',
          icon: 'spark',
          items: [
            'AI-powered smart funnels',
            'Chatbot workflow development',
            'CRM integrations',
            'Lead qualification flows',
            'Scheduling automation',
            'Human handoff logic',
            'Business rule automation',
            'Spreadsheet and CRM data registration',
          ],
        },
        {
          title: 'Tools & Methodologies',
          icon: 'tools',
          items: ['Git', 'Microsoft Office', 'SOLID Principles', 'Lean', 'Scrum', 'Kanban', 'Scrumban'],
        },
        {
          title: 'Languages',
          icon: 'globe',
          items: ['Portuguese — Native', 'English — Advanced'],
        },
      ],
    },
    experience: {
      kicker: 'Experience',
      title: 'Software & Automation',
      subtitle:
        'A progression from web development foundations to business-focused AI automation.',
      items: [
        {
          role: 'Automation Manager',
          company: 'plugue.ia',
          location: 'Remote',
          period: 'October 2025 – Present',
          description: [
            'I work on the implementation and maintenance of AI-powered automation flows designed to help companies engage, qualify and schedule leads more efficiently.',
            'My responsibilities include creating smart funnels, structuring chatbot logic, implementing business rules, integrating CRMs and supporting automation improvements based on client needs.',
            'I also work on corrections, new features and flow optimizations for existing bots, ensuring that automated conversations remain accurate, useful and aligned with each company’s operation.',
          ],
          activities: [
            'Development and maintenance of AI-powered chatbot workflows.',
            'Creation of lead qualification and scheduling flows.',
            'CRM integrations with platforms such as Pipedrive, Kommo and other business tools.',
            'Implementation of business rules based on each company’s process.',
            'Data registration in spreadsheets, CRMs and external systems.',
            'Human handoff logic for cases that require manual support.',
            'Continuous improvement of existing automation flows.',
            'Technical support for automation corrections and new features.',
          ],
        },
        {
          role: 'Junior Web Developer',
          company: 'Construsite Brasil',
          location: 'Hybrid',
          period: 'April 2025 – October 2025',
          description: [
            'I developed, maintained and updated web systems, including intranets, CMS platforms, reporting tools and e-commerce solutions.',
            'My work involved PHP development, MySQL database maintenance, structured data handling, system log monitoring and support ticket workflows. I also applied SOLID principles and Lean methodology to improve code organization, delivery efficiency and maintainability.',
          ],
          activities: [
            'Development and maintenance of web systems.',
            'Work with PHP, JavaScript, HTML, CSS and MySQL.',
            'Maintenance of CMS platforms and internal tools.',
            'Development of reporting and administrative systems.',
            'Monitoring of system logs and issue escalation.',
            'Database maintenance for production web applications.',
            'Support for client-facing and internal web solutions.',
          ],
        },
        {
          role: 'Web Development Intern',
          company: 'Construsite Brasil',
          location: 'Belo Horizonte, Brazil',
          period: 'August 2024 – April 2025',
          description: [
            'I began my professional career as a web development intern, working on internal and client projects using PHP, JavaScript, HTML and CSS.',
            'This experience helped me build a strong foundation in web development, system maintenance, database-driven applications and real-world problem solving inside a professional development environment.',
          ],
          activities: [
            'Development of web pages and system features.',
            'Maintenance of client projects.',
            'Work with PHP-focused web applications.',
            'Front-end adjustments using HTML, CSS and JavaScript.',
            'Support for internal development tasks.',
          ],
        },
      ],
    },
    projects: {
      kicker: 'Portfolio',
      title: 'Featured projects',
      subtitle:
        'A mix of public applications and professional workflow solutions built around practical needs.',
      items: [
        {
          title: 'Eco Gold',
          icon: 'briefcase',
          description: [
            'A commercial website developed for Eco Gold, a company specializing in buying and appraising gold and jewelry. The project was structured to present the brand’s services clearly and reliably, make it easier for potential customers to get in touch, and guide users toward requesting an appraisal of their items. The page reinforces the company’s credibility, organizes its key information and supports lead generation for the sales team.',
          ],
          tags: ['Landing Page', 'Corporate Website'],
          demo: 'https://www.ecogoldoficial.com.br',
          preview: { kind: 'image', src: '/projects/eco-gold.webp' },
        },
        {
          title: 'In and Out Beauty',
          icon: 'globe',
          description: [
            'A website developed for Ana Clara Filgueiras to present the In and Out Beauty mentorship program. The project was structured to communicate the brand’s concept with elegance and sensitivity, highlighting themes such as self-esteem, identity, beauty and personal expression. The page organizes the program’s key information, establishes authority and guides interested visitors toward learning more and submitting an application.',
          ],
          tags: ['Personal Brand', 'Visual Identity'],
          demo: 'https://anaclarafilgueiras.com.br',
          preview: { kind: 'image', src: '/projects/in-and-out-beauty.webp' },
        },
        {
          title: 'Casa do Fiat',
          icon: 'tools',
          description: [
            'A website developed for Casa do Fiat, a Belo Horizonte company with over 35 years in the market specializing in new and used Fiat, Jeep and RAM parts. The project was structured to present the company’s history, its catalog of engines, transmissions, suspension, bodywork and electrical parts, and the operation behind it, from the stockroom to the dismantling warehouse. The page conveys trust and experience and guides visitors toward requesting a quote on WhatsApp, supporting sales to customers across Brazil.',
          ],
          tags: ['Corporate Website', 'Auto Parts'],
          demo: 'https://casadofiat.com.br',
          preview: { kind: 'image', src: '/projects/casa-do-fiat.webp' },
        },
        {
          title: 'Jota Auto Peças',
          icon: 'cart',
          description: [
            'A website developed for Jota Auto Peças, a multi-brand auto parts store in Belo Horizonte. The project was structured to present the store’s engine, bodywork and mechanical parts lines in a direct and objective way, highlighting its Google reputation, the brands it serves and a simple three-step quote flow. The page makes it easy to send the vehicle’s plate or the part name over WhatsApp and turns visits into sales at the counter.',
          ],
          tags: ['Landing Page', 'Auto Parts'],
          demo: 'https://jotaautopecas.com',
          preview: { kind: 'image', src: '/projects/jota-auto-pecas.webp' },
        },
        {
          title: 'Business Rule Chatbot Flows',
          icon: 'message',
          preview: { kind: 'chat' },
          description: [
            'Custom chatbot flows developed around specific company rules, service processes and customer journeys.',
            'These flows are designed to understand user intent, collect the right information, apply decision logic and direct the conversation to the correct next step.',
          ],
          tags: ['Chatbot architecture', 'Prompt logic', 'Business rules', 'User routing', 'Automation strategy'],
        },
        {
          title: 'Auto Parts CRM',
          icon: 'database',
          preview: { kind: 'image', src: '/projects/crm.webp' },
          description: [
            'A CRM developed for Casa do Fiat and Jota Auto Peças, built on top of the open-source EspoCRM and customized for the day-to-day of auto parts sales.',
            'The project includes custom entities and fields, a WhatsApp integration that turns every conversation into a lead automatically, and a customized interface and dashboard to follow leads, contacts and ongoing service in real time.',
          ],
          tags: ['EspoCRM', 'WhatsApp integration', 'Custom entities', 'Custom UI', 'PHP'],
        },
      ],
    },
    education: {
      kicker: 'Education',
      title: 'Academic foundation',
      degree: 'Bachelor of Computer Science',
      university: 'FUMEC University',
      location: 'Belo Horizonte, Brazil',
      period: 'February 2022 – July 2026',
      paragraphs: [
        'Relevant coursework includes Java, Spring, C++, C, Python, Unreal Engine, Operating Systems, Algorithms and Data Structures, Databases, Computer Architecture and Computer Networks.',
        'My academic background complements my professional experience by strengthening my foundation in software development, problem solving, systems architecture and computational thinking.',
      ],
    },
    contact: {
      kicker: 'Contact',
      title: 'Let’s connect',
      paragraphs: [
        'I am open to opportunities related to software development, automation, AI workflows and full-stack web development.',
        'Feel free to contact me through email, LinkedIn or GitHub.',
      ],
      location: 'Belo Horizonte, Minas Gerais, Brazil',
    },
    footer: {
      description:
        'Full-Stack Developer & AI Automation Specialist focused on building web systems, CRM integrations and intelligent workflows that help businesses automate operations and improve customer interactions.',
      rights: 'All rights reserved.',
      backToTop: 'Back to top',
    },
  },
  pt: {
    nav: {
      about: 'Sobre',
      skills: 'Habilidades',
      experience: 'Experiência',
      projects: 'Projetos',
      education: 'Formação',
      contact: 'Contato',
      menu: 'Abrir menu de navegação',
      close: 'Fechar menu de navegação',
      theme: 'Alternar tema de cores',
      language: 'Alterar idioma para inglês',
    },
    labels: {
      location: 'Localização',
      present: 'Atualmente',
      liveDemo: 'Ver projeto',
      repository: 'GitHub',
      activities: 'Principais atividades',
      email: 'Email',
      github: 'GitHub',
      linkedin: 'LinkedIn',
      galleryHint: 'Passe o mouse ou role para ver cada projeto',
    },
    hero: {
      greeting: 'Olá, eu sou',
      role: 'Desenvolvedor Full-Stack e Especialista em Automação com IA.',
      bio: 'Formado em Ciência da Computação pela Universidade FUMEC. Desenvolvo sistemas web, integro CRMs e crio fluxos com IA que automatizam o atendimento e a qualificação de leads, transformando regras de negócio em processos claros e escaláveis.',
      status: 'Aberto a oportunidades',
      projectsButton: 'Ver projetos',
      resumeButton: 'Currículo',
    },
    skills: {
      kicker: 'Habilidades técnicas',
      title: 'Ferramentas práticas para soluções completas',
      subtitle:
        'Tecnologias e métodos que uso para construir, conectar e manter produtos digitais confiáveis.',
      groups: [
        {
          title: 'Front-End',
          icon: 'code',
          items: ['ReactJS', 'Next.js', 'JavaScript ES6', 'HTML5', 'CSS3', 'Tailwind CSS', 'Design Responsivo'],
        },
        {
          title: 'Back-End',
          icon: 'server',
          items: ['Node.js', 'Express', 'PHP', 'Laravel', 'APIs REST', 'Implementação de Lógica de Negócio'],
        },
        {
          title: 'Banco de Dados',
          icon: 'database',
          items: ['MySQL', 'Gerenciamento de Dados Estruturados', 'Manutenção de Banco de Dados', 'Fluxos de Registro de Dados'],
        },
        {
          title: 'Automação com IA & Integrações',
          icon: 'spark',
          items: [
            'Funis inteligentes com IA',
            'Desenvolvimento de fluxos de chatbot',
            'Integrações com CRM',
            'Fluxos de qualificação de leads',
            'Automação de agendamentos',
            'Lógica de direcionamento humano',
            'Automação de regras de negócio',
            'Registro de dados em planilhas e CRM',
          ],
        },
        {
          title: 'Ferramentas & Metodologias',
          icon: 'tools',
          items: ['Git', 'Office', 'Princípios SOLID', 'Lean', 'Scrum', 'Kanban', 'Scrum Ban'],
        },
        {
          title: 'Idiomas',
          icon: 'globe',
          items: ['Português — Nativo', 'Inglês — Avançado'],
        },
      ],
    },
    experience: {
      kicker: 'Experiência',
      title: 'Software e Automações',
      subtitle:
        'Evolução das bases do desenvolvimento web à automação com IA orientada a negócios.',
      items: [
        {
          role: 'Gerente de Automação',
          company: 'plugue.ia',
          location: 'Remoto',
          period: 'Outubro de 2025 – Atualmente',
          description: [
            'Atuo na implementação e manutenção de fluxos de automação com inteligência artificial, desenvolvidos para ajudar empresas a engajar, qualificar e agendar leads de forma mais eficiente.',
            'Minhas responsabilidades incluem criar funis inteligentes, estruturar lógica de chatbots, implementar regras de negócio, integrar CRMs e apoiar melhorias nas automações com base nas necessidades dos clientes.',
            'Também atuo em correções, criação de novas funcionalidades e otimização de fluxos existentes, garantindo que as conversas automatizadas permaneçam precisas, úteis e alinhadas à operação de cada empresa.',
          ],
          activities: [
            'Desenvolvimento e manutenção de fluxos de chatbot com IA.',
            'Criação de fluxos de qualificação de leads e agendamento.',
            'Integrações com CRMs como Pipedrive, Kommo e outras ferramentas de negócio.',
            'Implementação de regras de negócio de acordo com o processo de cada empresa.',
            'Registro de dados em planilhas, CRMs e sistemas externos.',
            'Lógica de direcionamento para atendimento humano quando necessário.',
            'Melhoria contínua de fluxos de automação existentes.',
            'Suporte técnico para correções e criação de novas funcionalidades.',
          ],
        },
        {
          role: 'Desenvolvedor Web Júnior',
          company: 'Construsite Brasil',
          location: 'Híbrido',
          period: 'Abril de 2025 – Outubro de 2025',
          description: [
            'Desenvolvi, mantive e atualizei sistemas web, incluindo intranets, plataformas CMS, ferramentas de relatórios e soluções de e-commerce.',
            'Meu trabalho envolvia desenvolvimento em PHP, manutenção de bancos MySQL, manipulação de dados estruturados, monitoramento de logs do sistema e fluxos de chamados de suporte. Também apliquei princípios SOLID e metodologia Lean para melhorar a organização do código, a eficiência das entregas e a manutenibilidade.',
          ],
          activities: [
            'Desenvolvimento e manutenção de sistemas web.',
            'Trabalho com PHP, JavaScript, HTML, CSS e MySQL.',
            'Manutenção de plataformas CMS e ferramentas internas.',
            'Desenvolvimento de relatórios e sistemas administrativos.',
            'Monitoramento de logs e encaminhamento de problemas.',
            'Manutenção de bancos de dados em aplicações web de produção.',
            'Suporte a soluções web internas e voltadas para clientes.',
          ],
        },
        {
          role: 'Estagiário em Desenvolvimento Web',
          company: 'Construsite Brasil',
          location: 'Belo Horizonte, Brasil',
          period: 'Agosto de 2024 – Abril de 2025',
          description: [
            'Iniciei minha trajetória profissional como estagiário em desenvolvimento web, atuando em projetos internos e de clientes utilizando PHP, JavaScript, HTML e CSS.',
            'Essa experiência me ajudou a construir uma base sólida em desenvolvimento web, manutenção de sistemas, aplicações orientadas a banco de dados e resolução de problemas reais dentro de um ambiente profissional de desenvolvimento.',
          ],
          activities: [
            'Desenvolvimento de páginas web e funcionalidades de sistemas.',
            'Manutenção de projetos de clientes.',
            'Trabalho com aplicações web focadas em PHP.',
            'Ajustes front-end com HTML, CSS e JavaScript.',
            'Apoio a tarefas internas de desenvolvimento.',
          ],
        },
      ],
    },
    projects: {
      kicker: 'Portfólio',
      title: 'Projetos em destaque',
      subtitle:
        'Aplicações públicas e soluções profissionais de fluxo construídas para necessidades práticas.',
      items: [
        {
          title: 'Eco Gold',
          icon: 'briefcase',
          description: [
            'Site comercial desenvolvido para a Eco Gold, empresa especializada em compra e avaliação de ouro e joias. O projeto foi estruturado para apresentar os serviços da marca de forma clara e confiável, facilitar o contato com potenciais clientes e direcionar o usuário para solicitar uma avaliação de suas peças. A página valoriza a credibilidade da empresa, organiza as informações principais e ajuda na captação de oportunidades para atendimento comercial.',
          ],
          tags: ['Landing Page', 'Site Institucional'],
          demo: 'https://www.ecogoldoficial.com.br',
          preview: { kind: 'image', src: '/projects/eco-gold.webp' },
        },
        {
          title: 'In and Out Beauty',
          icon: 'globe',
          description: [
            'Site desenvolvido para a Ana Clara Filgueiras, com foco na apresentação da mentoria In and Out Beauty. O projeto foi estruturado para comunicar a proposta da marca de forma elegante e sensível, destacando temas como autoestima, identidade, beleza e expressão pessoal. A página organiza as informações principais da mentoria, transmite autoridade e direciona visitantes interessadas para conhecer melhor a proposta e realizar a aplicação.',
          ],
          tags: ['Marca Pessoal', 'Identidade Visual'],
          demo: 'https://anaclarafilgueiras.com.br',
          preview: { kind: 'image', src: '/projects/in-and-out-beauty.webp' },
        },
        {
          title: 'Casa do Fiat',
          icon: 'tools',
          description: [
            'Site desenvolvido para a Casa do Fiat, empresa de Belo Horizonte com mais de 35 anos de mercado, especializada em peças novas e usadas das linhas Fiat, Jeep e RAM. O projeto foi estruturado para apresentar a história da empresa, o catálogo de motores, câmbios, suspensão, lataria e elétrica, e a estrutura por trás da operação, do estoque ao galpão de desmonte. A página transmite confiança e experiência e direciona o visitante para solicitar orçamento pelo WhatsApp, apoiando as vendas para clientes de todo o Brasil.',
          ],
          tags: ['Site Institucional', 'Autopeças'],
          demo: 'https://casadofiat.com.br',
          preview: { kind: 'image', src: '/projects/casa-do-fiat.webp' },
        },
        {
          title: 'Jota Auto Peças',
          icon: 'cart',
          description: [
            'Site desenvolvido para a Jota Auto Peças, loja de autopeças multimarcas em Belo Horizonte. O projeto foi estruturado para apresentar as linhas de motor, lataria e mecânica de forma direta e objetiva, destacando a reputação da loja no Google, as marcas atendidas e um fluxo de orçamento em três passos. A página facilita o envio da placa ou do nome da peça pelo WhatsApp e transforma visitas em vendas no balcão.',
          ],
          tags: ['Landing Page', 'Autopeças'],
          demo: 'https://jotaautopecas.com',
          preview: { kind: 'image', src: '/projects/jota-auto-pecas.webp' },
        },
        {
          title: 'Fluxos de Chatbot com Regras de Negócio',
          icon: 'message',
          preview: { kind: 'chat' },
          description: [
            'Fluxos personalizados de chatbot desenvolvidos com base nas regras, processos e jornadas de atendimento específicas de cada empresa.',
            'Esses fluxos são projetados para entender a intenção do usuário, coletar as informações corretas, aplicar lógica de decisão e direcionar a conversa para a próxima etapa adequada.',
          ],
          tags: ['Arquitetura de chatbot', 'Lógica de prompts', 'Regras de negócio', 'Direcionamento de usuários', 'Estratégia de automação'],
        },
        {
          title: 'CRM para Autopeças',
          icon: 'database',
          preview: { kind: 'image', src: '/projects/crm.webp' },
          description: [
            'CRM desenvolvido para a Casa do Fiat e a Jota Auto Peças, construído sobre o EspoCRM, plataforma open source, e personalizado para a rotina de venda de autopeças.',
            'O projeto inclui entidades e campos próprios, integração com o WhatsApp para que cada conversa entre automaticamente como lead, e interface e dashboard personalizados para acompanhar leads, contatos e atendimentos em tempo real.',
          ],
          tags: ['EspoCRM', 'Integração WhatsApp', 'Entidades customizadas', 'UI customizada', 'PHP'],
        },
      ],
    },
    education: {
      kicker: 'Formação',
      title: 'Base acadêmica',
      degree: 'Bacharelado em Ciência da Computação',
      university: 'Universidade FUMEC',
      location: 'Belo Horizonte, Brasil',
      period: 'Fevereiro de 2022 – Julho de 2026',
      paragraphs: [
        'Algumas disciplinas estudadas: Java, Spring, C++, C, Python, Unreal Engine, Sistemas Operacionais, Algoritmos e Estruturas de Dados, Banco de Dados, Arquitetura de Computadores e Redes de Computadores.',
        'Minha formação acadêmica complementa minha experiência profissional ao fortalecer minha base em desenvolvimento de software, resolução de problemas, arquitetura de sistemas e pensamento computacional.',
      ],
    },
    contact: {
      kicker: 'Contato',
      title: 'Vamos conversar',
      paragraphs: [
        'Estou aberto a oportunidades relacionadas a desenvolvimento de software, automação, fluxos com IA e desenvolvimento web full-stack.',
        'Fique à vontade para entrar em contato comigo por email, LinkedIn ou GitHub.',
      ],
      location: 'Belo Horizonte, Minas Gerais, Brasil',
    },
    footer: {
      description:
        'Desenvolvedor Full-Stack & Especialista em Automação com IA, focado na criação de sistemas web, integrações com CRMs e fluxos inteligentes que ajudam empresas a automatizar operações e melhorar o atendimento ao cliente.',
      rights: 'Todos os direitos reservados.',
      backToTop: 'Voltar ao topo',
    },
  },
}

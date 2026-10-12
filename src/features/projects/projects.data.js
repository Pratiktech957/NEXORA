
const GITHUB_URL = "https://github.com/pratiktech957";

const projects = [
    {
        id: "jan-ai-mitra",
        title: "JAN-AI-MITRA",
        subtitle: "AI Grievance Management System",
        category: "AI / Full-Stack",

        description:
            "An AI-powered grievance management platform designed to streamline complaint submission, contextual retrieval, classification, summarization, priority detection, and department routing.",

        technologies: [
            "React", "Node.js", "Express.js", "MongoDB",
            "REST APIs", "RAG", "LLM", "STT", "TTS",
        ],

        highlights: [
            "AI-powered grievance classification",
            "RAG-based contextual retrieval",
            "Automatic summarization and priority detection",
            "Department-based grievance routing",
            "Multilingual voice interaction",
            "Authentication and authorization",
        ],

        image:
            "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1200&q=85",

        github: GITHUB_URL,
        live: GITHUB_URL,
        featured: true,
        year: "2025",

        details: {
            problem:
                "Traditional grievance systems often require manual categorization and routing, which can make complaint processing slower and less efficient.",

            solution:
                "JAN-AI-MITRA uses AI-assisted processing to understand grievances, retrieve relevant context, summarize complaints, determine priority, and route them to the appropriate department.",

            architecture: [
                "React frontend",
                "Node.js and Express backend",
                "MongoDB database",
                "REST API communication",
                "RAG-based contextual retrieval",
                "AI processing pipeline",
            ],

            features: [
                "Grievance submission",
                "Authentication and authorization",
                "AI classification",
                "Contextual retrieval",
                "Automatic summarization",
                "Priority detection",
                "Department routing",
                "Speech-to-text",
                "Text-to-speech",
                "Multilingual interaction",
            ],

            challenges: [
                "Designing an AI-assisted grievance workflow",
                "Integrating contextual retrieval with application data",
                "Handling multilingual interaction",
                "Connecting AI processing with backend workflows",
            ],
        },
    },

    {
        id: "cosmic-watch",
        title: "COSMIC-WATCH",
        subtitle: "Real-Time Near-Earth Object Monitoring Platform",
        category: "Real-Time / AI",

        description:
            "A real-time platform for monitoring near-Earth objects using NASA data, live updates, proximity alerts, visualization, and an AI/ML-based risk service.",

        technologies: [
            "React", "Node.js", "Express.js", "MongoDB",
            "Socket.IO", "NASA NeoWs API", "Python", "Flask",
        ],

        highlights: [
            "NASA Near-Earth Object data integration",
            "Real-time Socket.IO updates",
            "Proximity alerts",
            "Interactive data visualization",
            "MongoDB-based data storage",
            "Python Flask AI/ML service",
        ],

        image:
            "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa?auto=format&fit=crop&w=1200&q=85",

        github: GITHUB_URL,
        live: GITHUB_URL,
        featured: true,
        year: "2025",

        details: {
            problem:
                "Near-Earth object data can be difficult to monitor continuously when information is distributed across external data sources.",

            solution:
                "COSMIC-WATCH combines NASA's NeoWs API with a real-time application layer to provide monitoring, alerts, visualization, and risk-oriented analysis.",

            architecture: [
                "React frontend",
                "Node.js and Express backend",
                "MongoDB data layer",
                "NASA NeoWs API integration",
                "Socket.IO real-time communication",
                "Python Flask AI/ML service",
            ],

            features: [
                "Near-Earth object monitoring",
                "NASA API integration",
                "Real-time updates",
                "Proximity alerts",
                "Data visualization",
                "MongoDB persistence",
                "AI/ML risk analysis",
            ],

            challenges: [
                "Working with external NASA API data",
                "Designing real-time update flows",
                "Combining Node.js and Python services",
                "Presenting continuously changing astronomical data clearly",
            ],
        },
    },

    {
        id: "secure-api-platform",
        title: "SECURE API PLATFORM",
        subtitle: "Backend, DevOps & Monitoring",
        category: "Backend / DevOps",

        description:
            "A production-oriented backend infrastructure project focused on secure APIs, containerization, reverse proxying, caching, CI/CD, logging, health checks, and observability.",

        technologies: [
            "Node.js", "Express.js", "Docker", "Nginx",
            "Redis", "CI/CD", "Prometheus", "Grafana", "OWASP",
        ],

        highlights: [
            "Containerized backend services",
            "Multiple API instances behind Nginx",
            "Redis caching",
            "OWASP-focused API security",
            "Health checks and logging",
            "Prometheus metrics",
            "Grafana monitoring",
            "CI/CD pipeline",
        ],

        image:
            "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1200&q=85",

        github: GITHUB_URL,
        live: GITHUB_URL,
        featured: true,
        year: "2026",

        details: {
            problem:
                "A backend application needs more than API endpoints to become production-oriented. Security, scalability, observability, caching, and deployment automation are essential parts of the system.",

            solution:
                "The Secure API Platform adds infrastructure and operational capabilities around a Node.js API, including containerization, reverse proxying, caching, security controls, monitoring, and CI/CD.",

            architecture: [
                "Node.js and Express API",
                "Docker containers",
                "Nginx reverse proxy",
                "Multiple backend instances",
                "Redis caching layer",
                "Prometheus metrics",
                "Grafana dashboards",
                "CI/CD pipeline",
            ],

            features: [
                "Secure API design",
                "Authentication and authorization",
                "Input validation",
                "Rate limiting",
                "Redis caching",
                "Docker containerization",
                "Nginx reverse proxy",
                "Health checks",
                "Logging",
                "Prometheus monitoring",
                "Grafana dashboards",
                "CI/CD",
            ],

            challenges: [
                "Designing production-oriented backend infrastructure",
                "Managing multiple API instances",
                "Adding observability to backend services",
                "Balancing security and application performance",
                "Integrating infrastructure tools into the development workflow",
            ],
        },
    },
];

export default projects;

import {
    Code2,
    Database,
    Globe,
    Server,
    ShieldCheck,
    Brain,
    GitBranch,
    Container,
    Network,
    Cpu,
    LockKeyhole,
    Terminal,
    Activity,
    Gauge,
    Layers,
    FileCode2,
    Workflow,
    Radio,
    Cloud,
} from "lucide-react";

import {
    FaJava,
    FaPython,
    FaJs,
    FaReact,
    FaNodeJs,
    FaGitAlt,
    FaGithub,
    FaDocker,
} from "react-icons/fa";

import {
    SiExpress,
    SiMongodb,
    SiMysql,
    SiTailwindcss,
    SiNginx,
    SiRedis,
    SiPrometheus,
    SiGrafana,
    SiSocketdotio,
    SiFlask,
    SiJsonwebtokens,
} from "react-icons/si";

// Icon component per skill key
const iconMap = {
    javascript: FaJs,
    python: FaPython,
    java: FaJava,

    html: Globe,
    css: Code2,
    react: FaReact,
    tailwind: SiTailwindcss,

    node: FaNodeJs,
    express: SiExpress,
    flask: SiFlask,
    api: Server,
    jwt: SiJsonwebtokens,
    websocket: Radio,
    socket: SiSocketdotio,

    mongodb: SiMongodb,
    mysql: SiMysql,
    sql: Database,

    rag: Brain,
    llm: Brain,
    stt: Radio,
    tts: Radio,
    ai: Brain,

    git: FaGitAlt,
    github: FaGithub,
    docker: FaDocker,
    nginx: SiNginx,
    redis: SiRedis,
    cicd: Workflow,
    prometheus: SiPrometheus,
    grafana: SiGrafana,

    owasp: ShieldCheck,
    authentication: LockKeyhole,
    authorization: ShieldCheck,
    validation: ShieldCheck,
    "rate-limit": Gauge,
    security: ShieldCheck,

    dsa: Code2,
    oop: Layers,
    dbms: Database,
    os: Cpu,
    network: Network,
    multithreading: Workflow,
};

// Official-ish brand colors per skill key.
// Uses CSS custom properties so tailwind classes can still tint
// the tile background without fighting the icon color.
const brandColorMap = {
    javascript: "#F7DF1E",   // JS yellow
    python: "#3776AB",       // Python blue
    java: "#E76F00",         // Java orange

    html: "#E34F26",         // HTML5 orange-red
    css: "#1572B6",          // CSS3 blue
    react: "#61DAFB",        // React cyan
    tailwind: "#06B6D4",     // Tailwind cyan

    node: "#339933",         // Node green
    express: "#111111",      // Express black
    flask: "#111111",        // Flask black
    api: "#2563EB",          // generic blue
    jwt: "#D63AFF",          // JWT purple-pink
    websocket: "#2563EB",
    socket: "#111111",

    mongodb: "#47A248",      // Mongo green
    mysql: "#00758F",        // MySQL teal
    sql: "#2563EB",

    rag: "#8B5CF6",
    llm: "#8B5CF6",
    stt: "#EC4899",
    tts: "#EC4899",
    ai: "#8B5CF6",

    git: "#F05032",          // Git orange
    github: "#181717",       // GitHub black
    docker: "#2496ED",       // Docker blue
    nginx: "#009639",        // Nginx green
    redis: "#DC382D",        // Redis red
    cicd: "#2563EB",
    prometheus: "#E6522C",   // Prometheus orange
    grafana: "#F46800",      // Grafana orange

    owasp: "#2563EB",
    authentication: "#2563EB",
    authorization: "#2563EB",
    validation: "#2563EB",
    "rate-limit": "#2563EB",
    security: "#2563EB",

    dsa: "#2563EB",
    oop: "#2563EB",
    dbms: "#2563EB",
    os: "#2563EB",
    network: "#2563EB",
    multithreading: "#2563EB",
};

const DefaultIcon = Terminal;
const DEFAULT_COLOR = "#2563EB";

function SkillIcon({ name, size = 20, className = "", colored = true }) {
    const Icon = iconMap[name] || DefaultIcon;
    const color = colored ? brandColorMap[name] || DEFAULT_COLOR : undefined;

    return (
        <Icon
            size={size}
            strokeWidth={1.8}
            className={className}
            style={color ? { color } : undefined}
        />
    );
}

export default SkillIcon;
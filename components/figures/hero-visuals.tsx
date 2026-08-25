import { FigureDefs } from "./defs";

type Kind =
  | "services"
  | "dynamics"
  | "power"
  | "ai"
  | "education"
  | "financial"
  | "impact"
  | "insurance"
  | "company"
  | "partners";

const labels: Record<Kind, string> = {
  services: "A Microsoft delivery practice connecting products, services and people",
  dynamics: "Dynamics 365 connected to sales, service, journeys and project operations",
  power: "Power Pages, Dataverse, Power Automate and Power BI on one platform",
  ai: "AI drafting and checking before a person approves the record",
  education: "A student request routed to admissions, finance and records at once",
  financial: "A regulated process with intake, rules, approval and audit record",
  impact: "A funder report built from service records and impact measures",
  insurance: "Insurers and brokers connected through governed platform handoffs",
  company: "One Datanox practice across products, delivery and client teams",
  partners: "One engineering practice supported by local partners in four markets",
};

function Shell({
  id,
  kind,
  children,
}: {
  id: string;
  kind: Kind;
  children: React.ReactNode;
}) {
  return (
    <figure data-fig="" data-reveal="" suppressHydrationWarning>
      <svg
        viewBox="0 0 620 470"
        role="img"
        aria-label={labels[kind]}
        className="w-full"
      >
        <FigureDefs id={id} />
        <rect
          x="8"
          y="8"
          width="604"
          height="454"
          rx="24"
          fill={`url(#${id}-card)`}
          stroke="var(--color-o-200)"
        />
        <rect
          x="36"
          y="38"
          width="548"
          height="394"
          rx="22"
          fill={`url(#${id}-warm)`}
          opacity="0.72"
        />
        {children}
      </svg>
    </figure>
  );
}

function Node({
  id,
  x,
  y,
  title,
  width = 150,
  active = false,
  delay = 120,
}: {
  id: string;
  x: number;
  y: number;
  title: string;
  width?: number;
  active?: boolean;
  delay?: number;
}) {
  return (
    <g data-pop="" style={{ "--d": delay } as React.CSSProperties}>
      <rect
        x={x}
        y={y}
        width={width}
        height="58"
        rx="15"
        fill={active ? `url(#${id}-brand)` : "#fff"}
        stroke={active ? "none" : "var(--color-o-200)"}
      />
      <circle
        cx={x + 22}
        cy={y + 29}
        r="7"
        fill={active ? "#fff" : "var(--color-o-500)"}
        opacity={active ? 0.92 : 1}
      />
      <text
        x={x + 40}
        y={y + 35}
        className={active ? "fill-white font-sans" : "fill-[var(--color-ink)] font-sans"}
        fontSize="13"
        fontWeight="600"
      >
        {title}
      </text>
    </g>
  );
}

function Line({
  d,
  delay = 260,
}: {
  d: string;
  delay?: number;
}) {
  return (
    <path
      d={d}
      fill="none"
      stroke="var(--color-o-400)"
      strokeWidth="2.2"
      strokeLinecap="round"
      pathLength={1}
      data-draw=""
      style={{ "--len": 1, "--d": delay } as React.CSSProperties}
    />
  );
}

export function FigServicesHero() {
  const id = "hsvc";
  return (
    <Shell id={id} kind="services">
      <text x="58" y="82" className="fill-[var(--color-o-700)] font-sans" fontSize="13" fontWeight="600">
        One Practice
      </text>
      <Node id={id} x={58} y={132} title="Products" delay={120} />
      <Node id={id} x={235} y={132} title="Services" active delay={220} />
      <Node id={id} x={412} y={132} title="People" delay={320} />
      <Line d="M133 190v64M310 190v64M487 190v64" delay={420} />
      <rect x="92" y="254" width="436" height="92" rx="20" fill="#fff" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 520 } as React.CSSProperties} />
      <text x="124" y="290" className="fill-[var(--color-ink)] font-display" fontSize="24" fontWeight="660">
        Microsoft Business Applications
      </text>
      <text x="124" y="320" className="fill-[var(--color-body)] font-sans" fontSize="13">
        Dynamics 365, Power Platform, AI and cloud migration
      </text>
      <Line d="M124 374h372" delay={640} />
      {[124, 214, 304, 394, 484].map((x, index) => (
        <circle key={x} cx={x} cy="374" r="8" fill={index === 2 ? `url(#${id}-brand)` : "var(--color-o-200)"} data-pop="" style={{ "--d": 720 + index * 70 } as React.CSSProperties} />
      ))}
    </Shell>
  );
}

export function FigDynamicsHero() {
  const id = "hdyn";
  return (
    <Shell id={id} kind="dynamics">
      <Node id={id} x={222} y={70} title="Dynamics 365" width={176} active delay={120} />
      <Line d="M310 128v54M310 240v54M222 211H132M398 211h90" delay={260} />
      <Node id={id} x={64} y={182} title="Sales" delay={340} />
      <Node id={id} x={222} y={182} title="Service" width={176} delay={420} />
      <Node id={id} x={430} y={182} title="Journeys" delay={500} />
      <Node id={id} x={222} y={294} title="Project Ops" width={176} delay={580} />
      <rect x="118" y="382" width="384" height="12" rx="6" fill="var(--color-o-200)" />
      <rect x="118" y="382" width="246" height="12" rx="6" fill={`url(#${id}-brand)`} data-scale="" style={{ transformOrigin: "118px 382px", "--d": 700 } as React.CSSProperties} />
    </Shell>
  );
}

export function FigPowerHero() {
  const id = "hpwr";
  return (
    <Shell id={id} kind="power">
      {["Power Pages", "Dataverse", "Power Automate", "Power BI"].map((item, index) => (
        <g key={item}>
          <rect
            x={110 + index * 34}
            y={266 - index * 52}
            width="300"
            height="46"
            rx="14"
            fill={index === 1 ? `url(#${id}-brand)` : "#fff"}
            stroke={index === 1 ? "none" : "var(--color-o-200)"}
            data-pop=""
            style={{ "--d": 120 + index * 110 } as React.CSSProperties}
          />
          <text
            x={134 + index * 34}
            y={295 - index * 52}
            className={index === 1 ? "fill-white font-sans" : "fill-[var(--color-ink)] font-sans"}
            fontSize="13"
            fontWeight="600"
          >
            {item}
          </text>
        </g>
      ))}
      <Line d="M118 352h384" delay={620} />
      <text x="118" y="390" className="fill-[var(--color-body)] font-sans" fontSize="13">
        Architecture, licensing and maintainability checked before build
      </text>
    </Shell>
  );
}

export function FigAiHero() {
  const id = "hai";
  return (
    <Shell id={id} kind="ai">
      <Node id={id} x={70} y={120} title="Draft" delay={120} />
      <Node id={id} x={235} y={120} title="Check" active delay={240} />
      <Node id={id} x={400} y={120} title="Approve" delay={360} />
      <Line d="M220 149h15M385 149h15" delay={460} />
      <rect x="116" y="236" width="388" height="114" rx="22" fill="#fff" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 560 } as React.CSSProperties} />
      <text x="148" y="280" className="fill-[var(--color-ink)] font-display" fontSize="25" fontWeight="660">
        System of Record
      </text>
      <text x="148" y="312" className="fill-[var(--color-body)] font-sans" fontSize="13">
        Security, workflow and audit trail stay in the tenant
      </text>
      <circle cx="484" cy="262" r="28" fill="none" stroke="var(--color-o-100)" strokeWidth="10" />
      <circle cx="484" cy="262" r="28" fill="none" stroke={`url(#${id}-brand)`} strokeWidth="10" strokeLinecap="round" pathLength={1} data-draw="" style={{ "--len": 0.72, "--d": 700 } as React.CSSProperties} />
    </Shell>
  );
}

export function FigEducationHero() {
  const id = "hedu";
  return (
    <Shell id={id} kind="education">
      <Node id={id} x={60} y={202} title="Student" active delay={120} />
      <Line d="M210 231h62M272 231C310 122 386 112 440 146M272 231c46 8 94 48 132 112M272 231c44 -22 96 -18 148 12" delay={260} />
      <Node id={id} x={398} y={112} title="Admissions" delay={380} />
      <Node id={id} x={398} y={216} title="Finance" delay={470} />
      <Node id={id} x={398} y={320} title="Records" delay={560} />
      <text x="78" y="374" className="fill-[var(--color-body)] font-sans" fontSize="13">
        One request routes to every department at the same moment
      </text>
    </Shell>
  );
}

export function FigFinancialHero() {
  const id = "hfin";
  return (
    <Shell id={id} kind="financial">
      <Node id={id} x={64} y={96} title="Intake" delay={120} />
      <Node id={id} x={235} y={96} title="Rules" active delay={240} />
      <Node id={id} x={406} y={96} title="Approval" delay={360} />
      <Line d="M214 125h21M385 125h21M310 154v72" delay={460} />
      <rect x="150" y="226" width="320" height="128" rx="22" fill="#fff" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 560 } as React.CSSProperties} />
      <text x="184" y="272" className="fill-[var(--color-ink)] font-display" fontSize="27" fontWeight="660">
        Audit Record
      </text>
      <text x="184" y="306" className="fill-[var(--color-body)] font-sans" fontSize="13">
        What was decided, when, and on what basis
      </text>
      <rect x="184" y="326" width="186" height="8" rx="4" fill={`url(#${id}-brand)`} data-scale="" style={{ transformOrigin: "184px 326px", "--d": 700 } as React.CSSProperties} />
    </Shell>
  );
}

export function FigImpactHero() {
  const id = "himp";
  return (
    <Shell id={id} kind="impact">
      <Node id={id} x={62} y={104} title="Service" delay={120} />
      <Node id={id} x={62} y={194} title="Funding" delay={220} />
      <Node id={id} x={62} y={284} title="Outcome" delay={320} />
      <Line d="M212 133h78M212 223h78M212 313h78" delay={420} />
      <rect x="290" y="82" width="238" height="260" rx="24" fill="#fff" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 500 } as React.CSSProperties} />
      <text x="322" y="132" className="fill-[var(--color-o-700)] font-sans" fontSize="13" fontWeight="600">
        Funder Report
      </text>
      {[172, 212, 252].map((y, index) => (
        <g key={y}>
          <rect x="322" y={y} width={126 + index * 18} height="10" rx="5" fill={index === 1 ? `url(#${id}-brand)` : "var(--color-o-200)"} data-scale="" style={{ transformOrigin: `322px ${y}px`, "--d": 620 + index * 90 } as React.CSSProperties} />
          <circle cx="484" cy={y + 5} r="6" fill="var(--color-o-100)" />
        </g>
      ))}
    </Shell>
  );
}

export function FigInsuranceHero() {
  const id = "hins";
  return (
    <Shell id={id} kind="insurance">
      <Node id={id} x={76} y={136} title="Insurer" delay={120} />
      <Node id={id} x={396} y={136} title="Broker" delay={240} />
      <rect x="240" y="122" width="140" height="86" rx="22" fill={`url(#${id}-brand)`} data-pop="" style={{ "--d": 360 } as React.CSSProperties} />
      <text x="310" y="158" textAnchor="middle" className="fill-white font-sans" fontSize="14" fontWeight="650">
        Governed
      </text>
      <text x="310" y="181" textAnchor="middle" className="fill-white font-mono" fontSize="12" letterSpacing="0.08em">
        API
      </text>
      <Line d="M226 165h14M380 165h16M146 194c46 88 274 88 320 0" delay={500} />
      <text x="112" y="332" className="fill-[var(--color-body)] font-sans" fontSize="13">
        Product, quote, approval and policy move without the inbox
      </text>
    </Shell>
  );
}

export function FigCompanyHero() {
  const id = "hco";
  return (
    <Shell id={id} kind="company">
      <rect x="72" y="84" width="220" height="132" rx="24" fill="#fff" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 120 } as React.CSSProperties} />
      <text x="104" y="126" className="fill-[var(--color-o-700)] font-sans" fontSize="12" fontWeight="700">
        Founded In 2024
      </text>
      <text x="104" y="164" className="fill-[var(--color-ink)] font-display" fontSize="28" fontWeight="660">
        20 Years
      </text>
      <text x="104" y="190" className="fill-[var(--color-body)] font-sans" fontSize="12">
        Business applications experience
      </text>
      <rect x="328" y="88" width="216" height="260" rx="26" fill="#fff" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 240 } as React.CSSProperties} />
      {[
        { label: "Products", y: 126, active: false },
        { label: "Platform Services", y: 196, active: true },
        { label: "People", y: 266, active: false },
      ].map((item, index) => (
        <g key={item.label} data-pop="" style={{ "--d": 320 + index * 90 } as React.CSSProperties}>
          <rect
            x="358"
            y={item.y - 24}
            width="156"
            height="48"
            rx="14"
            fill={item.active ? `url(#${id}-brand)` : "var(--color-o-50)"}
            stroke={item.active ? "none" : "var(--color-o-200)"}
          />
          <text
            x="436"
            y={item.y + 5}
            textAnchor="middle"
            className={item.active ? "fill-white font-sans" : "fill-[var(--color-ink)] font-sans"}
            fontSize={item.label.length > 10 ? "11" : "13"}
            fontWeight="650"
          >
            {item.label}
          </text>
        </g>
      ))}
      <Line d="M292 150h36M436 348v34H134" delay={620} />
      <rect x="104" y="370" width="284" height="42" rx="14" fill="var(--color-o-50)" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 700 } as React.CSSProperties} />
      <text x="246" y="396" textAnchor="middle" className="fill-[var(--color-body)] font-sans" fontSize="12.5" fontWeight="600">
        Fifty people, thirty five in delivery
      </text>
    </Shell>
  );
}

export function FigPartnersHero() {
  const id = "hpa";
  return (
    <Shell id={id} kind="partners">
      <rect x="184" y="76" width="252" height="74" rx="22" fill={`url(#${id}-brand)`} data-pop="" style={{ "--d": 120 } as React.CSSProperties} />
      <text x="310" y="119" textAnchor="middle" className="fill-white font-display" fontSize="24" fontWeight="660">
        Datanox Practice
      </text>
      <Line d="M310 150v54" delay={260} />
      <rect x="70" y="204" width="480" height="92" rx="24" fill="#fff" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 340 } as React.CSSProperties} />
      {[
        { label: "Australia", x: 146 },
        { label: "Gulf", x: 310 },
        { label: "United States", x: 474 },
      ].map((item, index) => (
        <g key={item.label} data-pop="" style={{ "--d": 440 + index * 80 } as React.CSSProperties}>
          <circle cx={item.x} cy="250" r="18" fill={index === 1 ? `url(#${id}-brand)` : "var(--color-o-100)"} />
          <text x={item.x} y="284" textAnchor="middle" className="fill-[var(--color-ink)] font-sans" fontSize="12.5" fontWeight="650">
            {item.label}
          </text>
        </g>
      ))}
      <rect x="146" y="344" width="328" height="58" rx="18" fill="var(--color-o-50)" stroke="var(--color-o-200)" data-pop="" style={{ "--d": 700 } as React.CSSProperties} />
      <text x="310" y="379" textAnchor="middle" className="fill-[var(--color-ink)] font-display" fontSize="19" fontWeight="660">
        Local presence, one standard
      </text>
    </Shell>
  );
}

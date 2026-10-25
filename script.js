// ✿ BOOKING LINK — paste your Google Calendar appointment page or Zoom Scheduler link here.
// Until it's set, "book a chat" opens an email to you instead.
const BOOKING_URL = "https://calendar.app.google/Usu3bFNYBLCYKBD88";

document.querySelectorAll(".book-link").forEach((a) => { if (BOOKING_URL) a.href = BOOKING_URL; });

// ✿ experience — every bullet leads with its result (m), then what i did (text).
// Bullets are tagged software / data / product; the lens shows the best 2.
const EXPERIENCE = [
  {
    emoji: "📦", when: "Jun – Sep 2026", org: "Amazon", place: "AWS · Amazon Connect · Seattle",
    tracks: ["software", "data", "product"],
    role: { all: "SDE Intern" },
    summary: "Built the real-time staffing services behind Amazon Connect's agentic AI.",
    skills: ["Python", "AWS Lambda", "SageMaker", "Docker"],
    bullets: [
      { t: ["software", "data"], m: "−52% p99 latency", text: "Python REST API on AWS Lambda serving 170K requests/day" },
      { t: ["software", "product"], m: "Q4 agentic AI launch", text: "exposed both APIs as LLM-agent tools with low-latency schemas" },
      { t: ["data", "software"], m: "<2s forecasts", text: "ML inference API on SageMaker for 15-min staffing forecasts" },
      { t: ["software"], m: "zero Sev-0s", text: "vectorized Erlang-C modeling in NumPy, shipped behind feature flags" },
      { t: ["product"], m: "end-to-end owner", text: "turned staffing requirements into a shipped, customer-facing service" },
      { t: ["product", "data"], m: "8 KPIs benchmarked", text: "proved parity with production before rollout" }
    ]
  },
  {
    emoji: "🚚", when: "Jun 2023 – Jul 2025", org: "FedEx", place: "Analytics & Automation CoE · Mumbai",
    tracks: ["software", "data", "product"],
    role: {
      all: "Data Scientist & Analyst",
      data: "Data Scientist",
      "data+product": "Data Analyst",
      product: "Pricing Strategy Analyst & PM Associate",
      "software+product": "Data Scientist & Shadow PM"
    },
    summary: "Turned pricing and shipment data into models, pipelines and leadership decisions.",
    skills: ["Python", "SQL", "SAS", "Power BI"],
    bullets: [
      { t: ["data", "product"], m: "40% earlier churn detection", text: "risk model on 10M+ records across 200+ accounts" },
      { t: ["data", "product"], m: "$14.8B+ portfolio", text: "modeled 6+ pricing scenarios across 15+ KPIs for leadership" },
      { t: ["software", "data"], m: "40+ hrs/month saved", text: "weekly ETL pipeline (Python, Fivetran, SAS → Azure), 60% faster" },
      { t: ["product"], m: "4 workflows automated", text: "shadow PM for a pricing bot — PRDs, user stories, 30+ UAT cases" },
      { t: ["product"], m: "10+ stakeholders", text: "gathered requirements across Pricing & Sales, drove delivery with engineering" }
    ]
  },
  {
    emoji: "🤖", when: "May – Jun 2022", org: "Gamaka AI", place: "Remote",
    tracks: ["software", "data"],
    role: { all: "SDE" },
    summary: "Built the RAG chatbot on Gamaka AI's website.",
    skills: ["Python", "RAG", "Vector Search", "NLP"],
    bullets: [
      { t: ["software"], m: "RAG chatbot shipped", text: "built the retrieval-augmented assistant answering visitors on Gamaka AI's website" },
      { t: ["data", "software"], m: "better answers, faster", text: "benchmarked retrieval quality, intent accuracy and latency to tune the bot" },
      { t: ["data"], m: "reproducible evals", text: "Python evaluation pipelines that turned error analysis into fixes" }
    ]
  },
  {
    emoji: "💄", when: "2020 – 2024", org: "RevsCosmetics", place: "Mumbai",
    tracks: ["product", "data", "software"],
    role: { all: "Founder & CEO" },
    summary: "Built a beauty brand from 0 to 1.",
    skills: ["Product", "Pricing", "Go-to-market"],
    bullets: [
      { t: ["product"], m: "500+ orders", text: "owned discovery, product, launch and growth end to end" },
      { t: ["product", "data"], m: "10M+ social engagements", text: "used retention & segmentation data to shape pricing and positioning" },
      { t: ["software", "product"], m: "virtual try-on", text: "launched a lip-gloss try-on and analytics dashboard" }
    ]
  }
];

const LENS_NAMES = {
  software: "software", data: "data", product: "product",
  "software+data": "software × data", "data+product": "data × product",
  "software+product": "software × product", all: "all"
};

// which resume to open for each lens
const RESUMES = {
  software: ["resume-software.pdf", "Software Engineering"],
  data: ["resume-data-science.pdf", "Data Science"],
  product: ["resume-product.pdf", "Product"],
  "software+data": ["resume-software.pdf", "Software / ML Engineering"],
  "data+product": ["resume-data-analyst.pdf", "Data Analyst"],
  "software+product": ["resume-product.pdf", "Product"],
  all: ["resume.pdf", "Resume"]
};

const ORDER = ["software", "data", "product"];
const tracksOf = (key) => (key === "all" ? ORDER : key.split("+"));
const DOT = { software: "sw", data: "da", product: "pr" };

function pickBullets(job, key) {
  const on = tracksOf(key);
  return job.bullets
    .map((b, i) => ({ b, i, hits: b.t.filter((t) => on.includes(t)).length }))
    .filter((x) => x.hits > 0)
    .sort((x, y) => (key === "all" ? x.i - y.i : y.hits - x.hits || x.i - y.i))
    .slice(0, 2)
    .map((x) => x.b);
}

function renderExperience(key) {
  const list = document.getElementById("expList");
  if (!list) return;
  const on = tracksOf(key);
  const esc = (x) => x.replace(/&(?!amp;)/g, "&amp;").replace(/</g, "&lt;");
  list.innerHTML = EXPERIENCE.map((job) => {
    const hits = job.tracks.filter((t) => on.includes(t)).length;
    const dim = key !== "all" && hits === 0;
    const fit = key !== "all" && hits === on.length;
    const role = job.role[key] || on.map((t) => job.role[t]).find(Boolean) || job.role.all;
    const bullets = pickBullets(job, key);
    const shown = bullets.length ? bullets : job.bullets.slice(0, 2);
    return `
      <div class="glass tl-card${dim ? " lens-dim" : ""}${fit ? " lens-fit" : ""}">
        <div class="tl-head">
          <h3>${job.emoji} ${role} · ${job.org}</h3>
          <span class="tl-when">${job.when}</span>
        </div>
        <ul class="tl-bullets">${shown.map((b) => `<li><b class="m">${esc(b.m)}</b> ${esc(b.text)}</li>`).join("")}</ul>
      </div>`;
  }).join("");
}

renderExperience("all");

// ✿ generate floating background bubbles
(function () {
  const wrap = document.querySelector(".bubbles");
  const COUNT = 18;
  for (let i = 0; i < COUNT; i++) {
    const b = document.createElement("span");
    const size = Math.random() * 90 + 20;      // 20–110px
    b.style.width = size + "px";
    b.style.height = size + "px";
    b.style.left = Math.random() * 100 + "vw";
    b.style.animationDuration = (Math.random() * 14 + 10) + "s"; // 10–24s
    b.style.animationDelay = (Math.random() * 12) + "s";
    b.style.opacity = (Math.random() * 0.4 + 0.25).toFixed(2);
    wrap.appendChild(b);
  }
})();

// ✿ gentle reveal-on-scroll (experience cards re-render with the lens, so they skip this)
(function () {
  const targets = document.querySelectorAll(".section, .card");
  targets.forEach((t) => t.classList.add("reveal"));
  const io = new IntersectionObserver(
    (entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          e.target.classList.add("show");
          io.unobserve(e.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  targets.forEach((t) => io.observe(t));
})();

// ✿ software × data × product lens
(function () {
  const svg = document.querySelector(".venn");
  if (!svg) return;
  const circles = [...svg.querySelectorAll(".v-circle")];
  const chip = document.getElementById("lensChip");

  function setLens(key, push) {
    if (!LENS_NAMES[key]) key = "all";
    const on = tracksOf(key);

    circles.forEach((c) => c.classList.toggle("on", on.includes(c.dataset.t)));
    renderExperience(key);

    document.querySelectorAll(".card[data-tracks]").forEach((el) => {
      const t = el.dataset.tracks.split(" ");
      const hits = on.filter((x) => t.includes(x)).length;
      el.classList.toggle("lens-dim", key !== "all" && hits === 0);
      el.classList.toggle("lens-fit", key !== "all" && hits === on.length);
    });

    if (chip) {
      chip.hidden = key === "all";
      document.getElementById("lensChipName").textContent = LENS_NAMES[key];
    }

    const [file, label] = RESUMES[key];
    const link = document.getElementById("resumeLink");
    if (link) link.href = file;
    const title = document.getElementById("resumeTitle");
    if (title) title.textContent = key === "all" ? "Reva Kaneri · Resume" : `Reva Kaneri · ${label} Resume`;

    if (push) {
      try {
        const u = new URL(location.href);
        if (key === "all") u.searchParams.delete("lens"); else u.searchParams.set("lens", key);
        history.replaceState(null, "", u.pathname + u.search + location.hash);
      } catch (e) {}
    }
  }

  // which circles contain the tap → that's the lens
  svg.addEventListener("click", (e) => {
    const pt = svg.createSVGPoint();
    pt.x = e.clientX; pt.y = e.clientY;
    const p = pt.matrixTransform(svg.getScreenCTM().inverse());
    const hit = ORDER.filter((t) => {
      const c = circles.find((c) => c.dataset.t === t);
      const dx = p.x - +c.getAttribute("cx"), dy = p.y - +c.getAttribute("cy");
      return dx * dx + dy * dy <= Math.pow(+c.getAttribute("r"), 2);
    });
    if (!hit.length) return;
    setLens(hit.length === 3 ? "all" : hit.join("+"), true);
    const exp = document.getElementById("experience");
    if (exp) setTimeout(() => exp.scrollIntoView({ behavior: "smooth", block: "start" }), 250);
  });

  const clear = document.getElementById("lensClear");
  if (clear) clear.addEventListener("click", () => setLens("all", true));

  // start from ?lens=… (e.g. a link sent to a data-science recruiter)
  let start = "all";
  try { start = new URLSearchParams(location.search).get("lens") || "all"; } catch (e) {}
  setLens(start.replace(" ", "+"), false);
})();

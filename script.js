// ✿ experience data — each bullet is tagged software / data / product.
// The lens picks the 2 bullets that best match, and the role title that fits.
const EXPERIENCE = [
  {
    emoji: "📦", when: "Jun – Sep 2026", org: "Amazon", place: "AWS · Amazon Connect · Seattle",
    tracks: ["software", "data", "product"],
    role: { all: "SDE Intern" },
    bullets: [
      { t: ["software", "data"], text: "Built a low-latency Python REST API on AWS Lambda — <b>170K requests/day</b>, <b>p99 latency down 52%</b>." },
      { t: ["software", "product"], text: "Exposed it as <b>tools for an LLM agent</b>, enabling a partner team's Q4 agentic AI launch." },
      { t: ["data", "software"], text: "Built an <b>ML forecasting API on SageMaker</b> serving 15-min staffing forecasts in <b>under 2s</b>." },
      { t: ["software"], text: "Vectorized Erlang-C queue modeling with NumPy; shipped via phased rollout with <b>zero Sev-0s</b>." },
      { t: ["product"], text: "<b>Owned delivery end to end</b> — turned staffing requirements into a shipped, customer-facing service." },
      { t: ["product", "data"], text: "Identified <b>latency as the blocker</b> for real-time and agentic use cases, and drove the fix." }
    ]
  },
  {
    emoji: "🚚", when: "Jun 2023 – Jul 2025", org: "FedEx", place: "Analytics & Automation CoE · Mumbai",
    tracks: ["software", "data", "product"],
    role: {
      all: "Data Scientist & Analyst",
      data: "Data Scientist",
      "data+product": "Data Analyst",
      product: "Pricing Strategy Analyst & Product Manager Associate",
      "software+product": "Data Scientist & Shadow PM"
    },
    bullets: [
      { t: ["data", "product"], text: "Built a <b>churn risk model</b> on 10M+ records across 200+ accounts — <b>40% earlier detection</b>." },
      { t: ["data", "product"], text: "Led revenue risk analysis across a <b>$14.8B+ portfolio</b>: 6+ pricing scenarios, 15+ KPIs, Power BI for leadership." },
      { t: ["software", "data"], text: "Built a weekly <b>ETL pipeline</b> (Python, Fivetran, SAS → Azure) — <b>60% faster</b>, <b>40+ hrs/month</b> saved." },
      { t: ["product"], text: "<b>Shadow PM</b> for a pricing automation bot: PRDs, user stories, <b>30+ UAT cases</b>, 4 workflows automated." },
      { t: ["product"], text: "Gathered requirements from <b>10+ Pricing &amp; Sales stakeholders</b> and drove delivery with engineering." }
    ]
  },
  {
    emoji: "🤖", when: "May – Jun 2022", org: "Gamaka AI", place: "Remote",
    tracks: ["software", "data"],
    role: { all: "Quantitative Researcher" },
    bullets: [
      { t: ["data"], text: "Evaluated conversational AI on <b>retrieval quality, intent accuracy and latency</b>." },
      { t: ["data", "software"], text: "Built reproducible <b>Python benchmarking pipelines</b>; used error analysis to improve accuracy and speed." }
    ]
  },
  {
    emoji: "💄", when: "2020 – 2024", org: "RevsCosmetics", place: "Mumbai",
    tracks: ["product", "data"],
    role: { all: "Founder & CEO" },
    bullets: [
      { t: ["product"], text: "Took a beauty brand <b>from 0 to 1</b> — customer discovery, product, launch and growth; <b>500+ orders</b>." },
      { t: ["product", "data"], text: "Used retention &amp; segmentation insights to shape pricing; built a <b>virtual try-on</b> and analytics dashboard." }
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
  list.innerHTML = EXPERIENCE.map((job) => {
    const hits = job.tracks.filter((t) => on.includes(t)).length;
    const dim = key !== "all" && hits === 0;
    const fit = key !== "all" && hits === on.length;
    const role = job.role[key] || on.map((t) => job.role[t]).find(Boolean) || job.role.all;
    const bullets = pickBullets(job, key);
    const shown = bullets.length ? bullets : job.bullets.slice(0, 2);
    return `
      <div class="glass tl-card${dim ? " lens-dim" : ""}${fit ? " lens-fit" : ""}" data-tracks="${job.tracks.join(" ")}">
        <div class="tl-top"><span class="tl-emoji">${job.emoji}</span><span class="tl-when">${job.when}</span></div>
        <h3>${role} · ${job.org}</h3>
        <p class="tl-place">${job.place}</p>
        <ul class="tl-bullets">${shown.map((b) => `<li>${b.text}</li>`).join("")}</ul>
        <span class="track-dots">${job.tracks.map((t) => `<i class="dot ${DOT[t]}"></i>`).join("")}</span>
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

  // project cards: colored dots
  document.querySelectorAll(".card[data-tracks]").forEach((el) => {
    const d = document.createElement("span");
    d.className = "track-dots";
    d.innerHTML = el.dataset.tracks.split(" ").map((t) => `<i class="dot ${DOT[t]}"></i>`).join("");
    el.appendChild(d);
  });

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

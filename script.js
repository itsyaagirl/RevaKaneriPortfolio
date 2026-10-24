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

// ✿ gentle reveal-on-scroll
(function () {
  const targets = document.querySelectorAll(".section, .tl-card, .card");
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

// ✿ subtle parallax on the skill cloud
(function () {
  const skills = document.querySelectorAll(".skill");
  window.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth - 0.5);
    const y = (e.clientY / window.innerHeight - 0.5);
    skills.forEach((s, i) => {
      const depth = (i % 4 + 1) * 6;
      s.style.transform = `translate(${x * depth}px, ${y * depth}px)`;
    });
  });
})();

// ✿ software × data × product lens
(function () {
  const LENSES = {
    software: {
      emoji: "💻", kicker: "pure software", title: "software engineering",
      pitch: "i ship production services that are fast, reliable and built to scale — and i care about the p99, not just the happy path.",
      roles: ["Software Engineer", "Backend Engineer", "AI/ML Engineer"],
      proof: [
        "built a synchronous Python API on <b>AWS Lambda</b> serving real-time metrics at <b>&lt;10s p99</b>, replacing a ~52s async pipeline <i>(Amazon)</i>",
        "designed <b>agentic AI workflows</b> that chain forecasting + metric computation in a single conversational turn <i>(Amazon)</i>",
        "built a <b>multi-agent framework</b> orchestrating DeepLenseSim + SLURM with automated validation &amp; failure recovery <i>(MIT-mentored research)</i>"
      ],
      skills: ["Python", "Java", "C++", "AWS Lambda", "Distributed Systems", "Agentic AI"]
    },
    data: {
      emoji: "📊", kicker: "pure data", title: "data science",
      pitch: "i turn messy, large-scale data into models and pipelines people actually trust.",
      roles: ["Data Scientist", "ML Engineer", "Data Engineer"],
      proof: [
        "built an <b>early churn warning</b> ML pipeline over <b>10M+ records</b> for 200+ accounts — <b>+40%</b> earlier churn detection",
        "built distributed ETL pipelines (Python/SQL/SAS) — <b>60% faster queries</b>, <b>40+ hrs/month</b> saved <i>(FedEx)</i>",
        "<b>MS Data Science @ UC San Diego (4.00 GPA)</b> · graduate research in AI-enabled scientific discovery &amp; stochastic optimization"
      ],
      skills: ["Python", "SQL", "SAS", "Machine Learning", "Feature Engineering", "RAG"]
    },
    product: {
      emoji: "🎯", kicker: "pure product", title: "product thinking",
      pitch: "i start with the person using it — what decision are they trying to make? — then work backwards to the system.",
      roles: ["Product Analyst", "Technical PM", "Product-minded Engineer"],
      proof: [
        "shaped the <b>“what-if” staffing experience</b> so a manager gets an answer in one conversational turn instead of waiting on a slow pipeline <i>(Amazon)</i>",
        "built <b>executive dashboards</b> for pricing &amp; revenue quality across <b>$14.8B+</b> in revenue <i>(FedEx)</i>",
        "founded &amp; grew a <b>women-in-tech community of 15+ engineers</b> — a product with real users and very honest feedback 💜"
      ],
      skills: ["Metrics Design", "Executive Dashboards", "Stakeholder Comms", "Community Building"]
    },
    "software+data": {
      emoji: "🤖", kicker: "software × data", title: "ML / AI engineering",
      pitch: "i take models out of the notebook and into low-latency production systems.",
      roles: ["ML Engineer", "AI Engineer", "Data Engineer"],
      proof: [
        "real-time metrics service on <b>AWS Lambda</b> at <b>&lt;10s p99</b> powering agentic AI “what-if” analysis <i>(Amazon)</i>",
        "<b>multi-agent AI</b> pipeline automating simulation + validation for large-scale astrophysics datasets <i>(MIT-mentored)</i>",
        "<b>distributed ETL</b> pipelines that cut query time by <b>60%</b> <i>(FedEx)</i>"
      ],
      skills: ["Python", "AWS", "Agentic AI", "RAG", "Distributed Systems", "SLURM"]
    },
    "data+product": {
      emoji: "📈", kicker: "data × product", title: "product &amp; business analytics",
      pitch: "i find the metric that actually matters — and make sure the people making decisions can see it.",
      roles: ["Product Analyst", "Business / Revenue Analyst", "Analytics Engineer"],
      proof: [
        "led <b>pricing &amp; revenue-quality analytics</b> across <b>$14.8B+</b> in revenue, with executive dashboards <i>(FedEx)</i>",
        "turned churn predictions into <b>risk scores + automated alerts</b> account teams could act on — <b>+40%</b> earlier detection",
        "saved <b>40+ hrs/month</b> of manual reporting by rebuilding the pipelines behind it <i>(FedEx)</i>"
      ],
      skills: ["SQL", "Python", "Dashboards", "Metrics Design", "Revenue Analytics", "Storytelling"]
    },
    "software+product": {
      emoji: "🧩", kicker: "software × product", title: "product engineering",
      pitch: "i build the feature <i>and</i> care whether it actually helps the person on the other side.",
      roles: ["Product Engineer", "AI Product Engineer", "Full-stack Engineer"],
      proof: [
        "turned a ~52s wait into a <b>&lt;10s</b> answer — a latency fix that's really a user-experience fix <i>(Amazon)</i>",
        "designed <b>conversational “what-if” workflows</b> around how managers actually plan staffing <i>(Amazon)</i>",
        "automated failure recovery so researchers spend time on science, not babysitting jobs <i>(gravitational lensing project)</i>"
      ],
      skills: ["Python", "AWS", "API Design", "Agentic AI", "UX for AI"]
    },
    all: {
      emoji: "✨", kicker: "all three", title: "the overlap",
      pitch: "most real problems don't arrive labeled “software” or “data” or “product.” i like the ones that are all three — and i've shipped them.",
      roles: ["AI Product Engineer", "ML Engineer", "Data Scientist (product)", "Technical Product Analyst"],
      proof: [
        "<b>Amazon</b> — agentic AI + a real-time API (software), forecasting &amp; staffing metrics (data), for managers making live decisions (product)",
        "<b>FedEx</b> — pipelines (software) over $14.8B+ revenue data (data) feeding executive pricing decisions (product)",
        "<b>community founder</b> — because the best tech gets built when more of us are in the room 💜"
      ],
      skills: ["Python", "AWS", "Machine Learning", "Agentic AI", "SQL", "Metrics Design"]
    }
  };

  const ORDER = ["software", "data", "product"];
  const $ = (id) => document.getElementById(id);
  const svg = document.querySelector(".venn");
  if (!svg) return;
  const circles = [...svg.querySelectorAll(".v-circle")];
  const pills = [...document.querySelectorAll(".lens-pill")];
  const items = [...document.querySelectorAll("[data-tracks]")];
  let current = "all";

  const tracksOf = (key) => (key === "all" ? ORDER : key.split("+"));

  function setLens(key, push) {
    if (!LENSES[key]) key = "all";
    current = key;
    const L = LENSES[key], on = tracksOf(key);


    circles.forEach((c) => c.classList.toggle("on", on.includes(c.dataset.t)));
    pills.forEach((p) => {
      const active = p.dataset.lens === key;
      p.classList.toggle("active", active);
      p.setAttribute("aria-selected", active);
    });

    // highlight matching work below
    items.forEach((el) => {
      const t = el.dataset.tracks.split(" ");
      const hits = on.filter((x) => t.includes(x)).length;
      el.classList.toggle("lens-dim", key !== "all" && hits === 0);
      el.classList.toggle("lens-fit", key !== "all" && hits === on.length);
    });

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
  });

  pills.forEach((p) => p.addEventListener("click", () => setLens(p.dataset.lens, true)));

  // little colored dots on each tagged card
  const DOT = { software: "sw", data: "da", product: "pr" };
  items.forEach((el) => {
    const d = document.createElement("span");
    d.className = "track-dots";
    d.title = el.dataset.tracks.replace(/ /g, " · ");
    d.innerHTML = el.dataset.tracks.split(" ").map((t) => `<i class="dot ${DOT[t]}"></i>`).join("");
    el.appendChild(d);
  });

  // start from ?lens=… (e.g. a link sent to a data-science recruiter)
  let start = "all";
  try { start = new URLSearchParams(location.search).get("lens") || "all"; } catch (e) {}
  setLens(start.replace(" ", "+"), false);
  if (start !== "all" && !location.hash) {
    setTimeout(() => document.getElementById("lens").scrollIntoView({ behavior: "smooth" }), 400);
  }
})();

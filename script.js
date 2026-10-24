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

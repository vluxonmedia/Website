/* Central Phase 2 configuration — replace only verified placeholder values. */
const VOID_DATA = {
  status: {
    label: "VOID // ONLINE",
    activity: "Current activity pending",
    game: "Current game pending",
    lastUpload: "Last upload pending",
    message: "Signal is stable.",
  },
  stats: [
    ["TikTok followers", "—", "placeholder value"],
    ["YouTube subscribers", "—", "placeholder value"],
    ["Total views", "—", "placeholder value"],
    ["Published clips", "—", "placeholder value"],
    ["Editing projects", "—", "placeholder value"],
    ["Years creating", "—", "placeholder value"],
  ],
  projects: {
    featured: {
      title: "Featured Edit",
      category: "Featured project / placeholder",
      description:
        "Set the completed project description, video preview, and verified destination here.",
      date: "Date pending",
      software: "Software pending",
      format: "Format pending",
      mark: "VOID",
    },
    velocity: {
      title: "Velocity",
      category: "Gaming edit / placeholder",
      description:
        "Reserved for a short-form gaming edit. Add final production details when available.",
      date: "Date pending",
      software: "Software pending",
      format: "Format pending",
      mark: "01",
    },
    afterimage: {
      title: "Afterimage",
      category: "Creator edit / placeholder",
      description:
        "Reserved for a creator or client project. Add verified project details when ready.",
      date: "Date pending",
      software: "Software pending",
      format: "Format pending",
      mark: "02",
    },
  },
};
(() => {
  const reduced = matchMedia("(prefers-reduced-motion: reduce)").matches;
  const $ = (selector, root = document) => root.querySelector(selector);
  const output = $("#terminal-output"),
    terminal = $("#void-terminal"),
    input = $("#terminal-input"),
    launch = $("#terminal-launch");
  const print = (message, muted = false) => {
    if (!output) return;
    const line = document.createElement("div");
    line.className = `terminal-line${muted ? " terminal-line--muted" : ""}`;
    line.textContent = message;
    output.append(line);
    output.scrollTop = output.scrollHeight;
  };
  const openTerminal = () => {
    terminal.classList.add("is-open");
    terminal.setAttribute("aria-hidden", "false");
    if (!output.children.length) {
      print("VOID SYSTEM CONSOLE // access granted", true);
      print("Type 'help' for available commands.");
    }
    setTimeout(() => input.focus(), 80);
  };
  const closeTerminal = () => {
    terminal.classList.remove("is-open");
    terminal.setAttribute("aria-hidden", "true");
    launch.focus();
  };
  launch?.addEventListener("click", openTerminal);
  $(".terminal-close")?.addEventListener("click", closeTerminal);
  const navigate = (id) => {
    closeTerminal();
    document.querySelector(id)?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };
  const commands = {
    help: () =>
      print(
        "COMMANDS: help, about, clips, projects, socials, status, void, clear",
      ),
    about: () =>
      print("VOID // gaming, edits, chaos. An evolving creator signal."),
    clips: () => {
      print("Routing to clip archive...", true);
      navigate("#clips");
    },
    projects: () => {
      print("Routing to edit portfolio...", true);
      navigate("#edits");
    },
    socials: () => {
      print("Routing to social hub...", true);
      navigate("#social");
    },
    status: () =>
      print(
        `${VOID_DATA.status.label}\n${VOID_DATA.status.activity}\n${VOID_DATA.status.message}`,
      ),
    void: () => {
      document.body.classList.add("void-unlocked");
      print("THE VOID SEES YOU.");
      output.lastElementChild.classList.add("terminal-line--glitch");
    },
    clear: () => {
      output.replaceChildren();
    },
    signal: () => {
      print("HIDDEN SIGNAL: 01110110 01101111 01101001 01100100");
      document.body.classList.add("void-unlocked");
    },
    origin: () => {
      print("ORIGIN GATE OPENING...", true);
      setTimeout(() => (window.location.href = "void.html"), reduced ? 0 : 280);
    },
    echo: (args) => print(args.join(" ") || "..."),
  };
  $("#terminal-form")?.addEventListener("submit", (event) => {
    event.preventDefault();
    const raw = input.value.trim();
    if (!raw) return;
    print(`VOID@NODE:~$ ${raw}`, true);
    const [command, ...args] = raw.toLowerCase().split(/\s+/);
    (
      commands[command] ||
      (() => print(`command not found: ${command}. Type help.`))
    )(args);
    input.value = "";
  });
  addEventListener("keydown", (event) => {
    if (
      event.key === "~" &&
      !event.ctrlKey &&
      !event.metaKey &&
      document.activeElement !== input
    ) {
      event.preventDefault();
      terminal.classList.contains("is-open") ? closeTerminal() : openTerminal();
    }
    if (event.key === "Escape") {
      if (terminal.classList.contains("is-open")) closeTerminal();
      closeModal();
    }
  });
  // Config-driven creator stats. Placeholder values deliberately do not claim real metrics.
  const stats = $("#stats-grid");
  if (stats) {
    VOID_DATA.stats.forEach(([label, value, note], index) => {
      const card = document.createElement("article");
      card.className = "stat-card";
      card.innerHTML = `<span class="stat-card__index">0${index + 1} / ${note}</span><strong class="stat-card__value" data-value="${value}">—</strong><span class="stat-card__label">${label}</span>`;
      stats.append(card);
    });
    const revealStats = () => stats.classList.add("is-counted");
    if (reduced || !("IntersectionObserver" in window)) revealStats();
    else
      new IntersectionObserver(
        (entries, observer) =>
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              revealStats();
              observer.unobserve(entry.target);
            }
          }),
        { threshold: 0.2 },
      ).observe(stats);
  }
  // Config-driven project modal.
  const modal = $("#project-modal"),
    projectIds = Object.keys(VOID_DATA.projects);
  let activeProject = 0;
  const openProject = (id) => {
    activeProject = Math.max(0, projectIds.indexOf(id));
    const data = VOID_DATA.projects[projectIds[activeProject]];
    $("#project-modal-title").textContent = data.title;
    $("#project-modal-category").textContent = data.category;
    $("#project-modal-description").textContent = data.description;
    $("#project-modal-date").textContent = data.date;
    $("#project-modal-software").textContent = data.software;
    $("#project-modal-format").textContent = data.format;
    $("#project-modal-mark").textContent = data.mark;
    modal.classList.add("is-open");
    modal.setAttribute("aria-hidden", "false");
    $(".modal-close").focus();
  };
  const closeModal = () => {
    if (!modal?.classList.contains("is-open")) return;
    modal.classList.remove("is-open");
    modal.setAttribute("aria-hidden", "true");
  };
  document.querySelectorAll("[data-project-id]").forEach((card) => {
    card.addEventListener("click", () => openProject(card.dataset.projectId));
    card.addEventListener("keydown", (event) => {
      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        openProject(card.dataset.projectId);
      }
    });
  });
  document
    .querySelectorAll("[data-close-modal]")
    .forEach((button) => button.addEventListener("click", closeModal));
  $("#project-prev")?.addEventListener("click", () =>
    openProject(
      projectIds[(activeProject - 1 + projectIds.length) % projectIds.length],
    ),
  );
  $("#project-next")?.addEventListener("click", () =>
    openProject(projectIds[(activeProject + 1) % projectIds.length]),
  );
  // A short section transition gives same-page navigation an entering-the-VOID feel.
  const transition = $("#void-transition");
  document.querySelectorAll('a[href^="#"]').forEach((link) =>
    link.addEventListener("click", (event) => {
      const target = document.querySelector(link.getAttribute("href"));
      if (!target || reduced) return;
      event.preventDefault();
      transition.classList.add("is-active");
      setTimeout(() => {
        target.scrollIntoView({ behavior: "smooth" });
        transition.classList.remove("is-active");
      }, 180);
    }),
  );
  // Easter egg 1: seven intentional clicks on the footer mark unlocks visual interference.
  let secretClicks = 0,
    secretTimer;
  $("[data-void-secret]")?.addEventListener("click", (event) => {
    event.preventDefault();
    secretClicks++;
    clearTimeout(secretTimer);
    secretTimer = setTimeout(() => (secretClicks = 0), 1800);
    if (secretClicks === 7) {
      document.body.classList.add("void-unlocked");
      print("VISUAL INTERFERENCE UNLOCKED.");
      secretClicks = 0;
    } else
      document
        .querySelector("#top")
        ?.scrollIntoView({ behavior: reduced ? "auto" : "smooth" });
  });
  // Easter egg 2: Konami sequence opens the experimental VOID experience gate.
  const code = [
    "ArrowUp",
    "ArrowUp",
    "ArrowDown",
    "ArrowDown",
    "ArrowLeft",
    "ArrowRight",
    "ArrowLeft",
    "ArrowRight",
    "b",
    "a",
  ];
  let keys = [];
  addEventListener("keydown", (event) => {
    keys = [...keys, event.key].slice(-code.length);
    if (keys.join("|").toLowerCase() === code.join("|").toLowerCase()) {
      document.body.classList.add("void-unlocked");
      print("GATE UNLOCKED: type origin in the terminal.");
    }
  });
  // Add the configured live status without exposing fake activity.
  const nav = document.querySelector(".nav-links");
  if (nav) {
    const status = document.createElement("span");
    status.className = "void-status";
    status.innerHTML = '<i class="status-dot"></i><span></span>';
    $("span", status).textContent = VOID_DATA.status.label;
    nav.append(status);
  }
})();

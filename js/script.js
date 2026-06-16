const projects = [
  {
    slug: "digistudio-ugc",
    title: "DigiStudio UGC 对话流程编排工具",
    note: "把分支对话、变量条件和节点配置收进更清晰的编排工作台，让复杂流程在同一视野里可连续编辑。",
    cover: "./assets/images/digimi-cover-web.png",
    ratio: "1.7917",
    objectPosition: "center center",
    year: "2024",
    disciplines: ["低代码工具", "流程设计", "编辑器体验"],
    target: "./digistudio.html"
  },
  {
    slug: "ai-film-visualization",
    title: "全球电影数据的空间化探索原型",
    note: "用 3D 地球连接国家来源、类型轨道和时间切片，让多维电影数据先形成空间感，再进入局部信息。",
    cover: "./assets/images/3DMovie/CoverImage.png",
    ratio: "1.6997",
    objectPosition: "58% center",
    year: "2025",
    disciplines: ["数据可视化", "空间探索", "AI 辅助原型"],
    target: "./movie-visualization.html"
  },
  {
    slug: "digimi-multidevice",
    title: "digimi 沙盒游戏建造系统的多端迁移与交互重构",
    note: "把 PC 上复杂的建造编辑逻辑迁移到移动端，重构拖拽、撤销、视野与方块选择路径。",
    cover: "./assets/mockups/finalVision-mockup.png",
    ratio: "1.5",
    objectPosition: "center center",
    year: "2022 - 2023",
    disciplines: ["跨端体验", "交互重构", "沙盒系统"],
    target: "./digimi.html"
  },
  {
    slug: "readability-research",
    title: "动态背景下的 UI 变色可读性与用户体验研究",
    note: "把动态环境下的界面识别问题转成可实验、可统计、可复现的研究系统，沉淀真实产品可用的设计边界。",
    cover: "./assets/images/dynamicUI/CoverImage.jpeg",
    ratio: "1.6997",
    objectPosition: "center 52%",
    year: "2025",
    disciplines: ["用户研究", "动态场景", "证据验证"],
    target: "./readability-research.html"
  }
];

const projectGrid = document.querySelector("#projectGrid");
const toast = document.querySelector("#toast");
const heroParticlesRoot = document.querySelector("#heroParticles");
let toastTimer = null;

const defaultParticleColors = ["#20252c", "#4b5563", "#6c7888", "#96a3b5"];

function hexToRgb(hex) {
  let normalized = hex.replace(/^#/, "");

  if (normalized.length === 3) {
    normalized = normalized
      .split("")
      .map((character) => character + character)
      .join("");
  }

  const int = Number.parseInt(normalized, 16);
  return [(int >> 16) & 255, (int >> 8) & 255, int & 255];
}

function renderProjectCard(project) {
  return `
    <button class="project-card" data-slug="${project.slug}" aria-label="查看 ${project.title}">
      <div class="project-frame">
        <figure class="project-cover" style="--ratio: ${project.ratio}; --object-position: ${project.objectPosition};">
          <img src="${project.cover}" alt="${project.title}" />
          <div class="project-overlay">
            <span class="project-hover-label">查看更多</span>
            <span class="project-arrow" aria-hidden="true">↗</span>
          </div>
        </figure>
      </div>
      <div class="project-meta">
        <div class="project-meta-row">
          <div class="project-copy">
            <h3 class="project-title">${project.title}</h3>
            <p class="project-note">${project.note}</p>
          </div>
          <div class="project-side">
            <p class="project-year">${project.year}</p>
            <div class="project-disciplines">
              ${project.disciplines.map((item) => `<span>${item}</span>`).join("")}
            </div>
          </div>
        </div>
      </div>
    </button>
  `;
}

function renderProjectGrid() {
  projectGrid.innerHTML = projects.map(renderProjectCard).join("");

  projectGrid.querySelectorAll(".project-card").forEach((card) => {
    const cover = card.querySelector(".project-cover");

    card.addEventListener("click", () => {
      const project = projects.find((item) => item.slug === card.dataset.slug);

      if (project?.target) {
        window.location.href = project.target;
        return;
      }

      showToast();
    });

    if (cover) {
      const resetHoverLabel = () => {
        cover.style.setProperty("--cursor-x", "50%");
        cover.style.setProperty("--cursor-y", "50%");
      };

      const updateHoverLabel = (event) => {
        const rect = cover.getBoundingClientRect();
        const rawX = event.clientX - rect.left;
        const rawY = event.clientY - rect.top;
        const x = Math.max(72, Math.min(rect.width - 72, rawX));
        const y = Math.max(44, Math.min(rect.height - 28, rawY));

        cover.style.setProperty("--cursor-x", `${x}px`);
        cover.style.setProperty("--cursor-y", `${y}px`);
      };

      resetHoverLabel();
      card.addEventListener("mouseenter", updateHoverLabel);
      card.addEventListener("mousemove", updateHoverLabel);
      card.addEventListener("mouseleave", resetHoverLabel);
    }
  });

  setupMotion();
}

function showToast() {
  toast.classList.add("is-visible");
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    toast.classList.remove("is-visible");
  }, 2200);
}

function setupMotion() {
  const revealTargets = [
    document.querySelector(".work-heading"),
    ...projectGrid.querySelectorAll(".project-card"),
    document.querySelector(".site-footer")
  ].filter(Boolean);

  revealTargets.forEach((element, index) => {
    element.classList.add("reveal-on-scroll");
    element.style.setProperty("--reveal-delay", `${Math.min(index * 45, 160)}ms`);
  });

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  if (!("IntersectionObserver" in window)) {
    revealTargets.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;

        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    {
      threshold: 0.18,
      rootMargin: "0px 0px -8% 0px"
    }
  );

  revealTargets.forEach((element) => observer.observe(element));
}

function setupHeroParticles() {
  if (!heroParticlesRoot) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  const context = canvas.getContext("2d");
  if (!context) return;

  heroParticlesRoot.replaceChildren(canvas);

  const config = {
    particleCount: 120,
    particleSpread: 10,
    speed: 0.095,
    particleBaseSize: 58,
    sizeRandomness: 1,
    particleHoverFactor: 1,
    cameraDistance: 20,
    disableRotation: false,
    alphaParticles: false,
    gravityMultiplier: 2
  };

  const particles = [];
  const mouse = { x: 0, y: 0 };
  const spriteCache = new Map();
  let width = 0;
  let height = 0;
  let dpr = 1;
  let animationFrameId = null;
  let previousTime = performance.now();
  let elapsed = 0;
  let isPaused = false;
  let sortedParticles = [];
  let sortFrame = 0;

  for (let index = 0; index < config.particleCount; index += 1) {
    const [r, g, b] = hexToRgb(defaultParticleColors[Math.floor(Math.random() * defaultParticleColors.length)]);
    const layerRoll = Math.random();
    const layer = layerRoll < 0.2 ? "front" : layerRoll < 0.72 ? "mid" : "back";
    const sizeRatio = Math.random();

    particles.push({
      x: Math.random(),
      y: Math.random(),
      z: Math.random() * 2 - 1,
      random: [Math.random(), Math.random(), Math.random(), Math.random()],
      color: { r, g, b },
      size: 0.55 + sizeRatio * 1.15 * config.sizeRandomness,
      sizeRatio,
      spinOffset: Math.random() * Math.PI * 2,
      orbitStrength: 0.75 + Math.random() * 0.9,
      orbitSpeed: 0.00017 + Math.random() * 0.00015,
      gravityOffset: 0,
      gravityVelocity: 0,
      layer,
      blur: layer === "front" ? 0.22 : layer === "mid" ? 0.12 : 0.06,
      stretch: Math.random() < 0.16 ? 1.8 + Math.random() * 1.2 : 1,
      tilt: Math.random() * Math.PI
    });
  }

  const resize = () => {
    dpr = Math.min(window.devicePixelRatio || 1, 1.5);
    width = Math.max(1, Math.round(window.innerWidth));
    height = Math.max(1, Math.round(window.innerHeight));
    canvas.width = Math.round(width * dpr);
    canvas.height = Math.round(height * dpr);
    context.setTransform(dpr, 0, 0, dpr, 0, 0);
  };

  const handleMouseMove = (event) => {
    mouse.x = (event.clientX / Math.max(width, 1)) * 2 - 1;
    mouse.y = -((event.clientY / Math.max(height, 1)) * 2 - 1);
  };

  const handleMouseLeave = () => {
    mouse.x = 0;
    mouse.y = 0;
  };

  const getParticleSprite = (particle, radius, alpha, rotationZ) => {
    const layerKey = particle.layer;
    const radiusKey = Math.max(2, Math.round(radius * 2));
    const alphaKey = Math.max(1, Math.round(alpha * 100));
    const rotationKey = Math.round(((particle.tilt + rotationZ * 0.85) % (Math.PI * 2)) * 10);
    const stretchKey = Math.round(particle.stretch * 10);
    const cacheKey = [
      layerKey,
      radiusKey,
      alphaKey,
      rotationKey,
      stretchKey,
      particle.color.r,
      particle.color.g,
      particle.color.b
    ].join(":");

    if (spriteCache.has(cacheKey)) {
      return spriteCache.get(cacheKey);
    }

    const spriteCanvas = document.createElement("canvas");
    const maxScale = Math.max(particle.stretch, 1);
    const padding = Math.ceil(radius * maxScale * 2.6);
    const size = Math.max(8, padding * 2);
    spriteCanvas.width = size;
    spriteCanvas.height = size;

    const spriteContext = spriteCanvas.getContext("2d");
    if (!spriteContext) return null;

    const center = size * 0.5;
    spriteContext.translate(center, center);
    spriteContext.rotate(particle.tilt + rotationZ * 0.85);
    spriteContext.scale(particle.stretch, 1);

    const gradient = spriteContext.createRadialGradient(0, 0, 0, 0, 0, radius);
    gradient.addColorStop(0, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, ${Math.min(alpha + 0.16, 0.42)})`);
    gradient.addColorStop(
      0.42,
      `rgba(${Math.min(particle.color.r + 18, 255)}, ${Math.min(particle.color.g + 20, 255)}, ${Math.min(
        particle.color.b + 26,
        255
      )}, ${Math.min(alpha + 0.08, 0.32)})`
    );
    gradient.addColorStop(1, `rgba(${particle.color.r}, ${particle.color.g}, ${particle.color.b}, 0)`);

    spriteContext.fillStyle = gradient;
    spriteContext.beginPath();
    spriteContext.arc(0, 0, radius, 0, Math.PI * 2);
    spriteContext.fill();

    if (particle.layer !== "back") {
      spriteContext.strokeStyle = `rgba(${Math.min(particle.color.r + 26, 255)}, ${Math.min(
        particle.color.g + 28,
        255
      )}, ${Math.min(particle.color.b + 34, 255)}, ${0.06 + particle.blur})`;
      spriteContext.lineWidth = Math.max(radius * 0.16, 0.6);
      spriteContext.beginPath();
      spriteContext.moveTo(-radius * 0.55, 0);
      spriteContext.lineTo(radius * 0.55, 0);
      spriteContext.stroke();
    }

    const sprite = {
      canvas: spriteCanvas,
      halfWidth: size * 0.5,
      halfHeight: size * 0.5
    };

    spriteCache.set(cacheKey, sprite);
    return sprite;
  };

  const drawParticle = (particle, rotation) => {
    const [rxSeed, rySeed, rzSeed, rwSeed] = particle.random;
    const time = elapsed * 0.001;

    const fieldWidth = width * 1.12;
    const fieldHeight = height * 0.96;
    const depthWave = particle.z * 0.5 + Math.sin(time * rwSeed + 6.28 * rySeed) * 0.32;
    const perspective = 0.72 + (depthWave + 1) * 0.24;

    let drawX = width * 0.5 + (particle.x - 0.5) * fieldWidth;
    let drawY = height * 0.5 + (particle.y - 0.5) * fieldHeight;

    drawX += Math.sin(time * rzSeed + 6.28 * rwSeed) * (14 + 28 * rxSeed) * perspective;
    drawY += Math.sin(time * rySeed + 6.28 * rxSeed) * (10 + 24 * rwSeed) * perspective;

    if (!config.disableRotation) {
      const centeredX = drawX - width * 0.5;
      const centeredY = drawY - height * 0.5;
      const spin = -rotation.z * particle.orbitStrength + particle.spinOffset * 0.48;
      const cos = Math.cos(spin);
      const sin = Math.sin(spin);
      const rotatedX = centeredX * cos - centeredY * sin;
      const rotatedY = centeredX * sin + centeredY * cos;

      drawX = width * 0.5 + rotatedX + (particle.y - 0.5) * rotation.y * width * 0.12;
      drawY = height * 0.5 + rotatedY + (particle.x - 0.5) * rotation.x * height * 0.1;
    }

    drawY += particle.gravityOffset;
    drawX += -mouse.x * config.particleHoverFactor * 28;
    drawY += -mouse.y * config.particleHoverFactor * 20;

    const layerScale = particle.layer === "front" ? 1.28 : particle.layer === "mid" ? 1 : 0.72;
    const sizeBoost =
      particle.layer === "back"
        ? 1
        : 1 + particle.sizeRatio;
    const drawSize = (config.particleBaseSize * 0.008 + particle.size) * perspective * 1.02 * layerScale * sizeBoost;
    const alphaBase = particle.layer === "front" ? 0.22 : particle.layer === "mid" ? 0.18 : 0.12;
    const alpha = config.alphaParticles ? alphaBase + perspective * 0.16 : alphaBase + perspective * 0.12;
    const radius = Math.max(drawSize, 0.7);
    const sprite = getParticleSprite(particle, radius, alpha, rotation.z);
    if (!sprite) return;

    context.drawImage(sprite.canvas, drawX - sprite.halfWidth, drawY - sprite.halfHeight);
  };

  const render = (time) => {
    animationFrameId = window.requestAnimationFrame(render);
    if (isPaused) return;

    const delta = time - previousTime;
    previousTime = time;
    elapsed += delta * config.speed;

    context.clearRect(0, 0, width, height);

    const rotation = config.disableRotation
      ? { x: 0, y: 0, z: 0 }
      : {
          x: Math.sin(elapsed * 0.00012) * 0.06,
          y: Math.cos(elapsed * 0.00028) * 0.1,
          z: elapsed * 0.00024
        };

    particles.forEach((particle) => {
      particle.spinOffset += particle.orbitSpeed * delta;

      const orbitY = Math.sin(-rotation.z * particle.orbitStrength + particle.spinOffset * 0.48 + particle.random[1] * Math.PI * 2);

      if (orbitY > 0) {
        const gravityStrength = orbitY * orbitY * 0.00125 * delta * config.gravityMultiplier;
        particle.gravityVelocity = Math.min(particle.gravityVelocity + gravityStrength, height * 0.00085 * config.gravityMultiplier);
        particle.gravityOffset = Math.min(particle.gravityOffset + particle.gravityVelocity, height * 0.18 * config.gravityMultiplier);
      } else {
        particle.gravityVelocity *= 0.78;
        particle.gravityOffset *= 0.88;
      }
    });

    sortFrame += 1;
    if (sortFrame % 6 === 0 || sortedParticles.length === 0) {
      sortedParticles = particles.slice().sort((a, b) => a.z - b.z);
    }

    sortedParticles.forEach((particle) => drawParticle(particle, rotation));
  };

  const handleVisibilityChange = () => {
    isPaused = document.hidden;
    if (!isPaused) {
      previousTime = performance.now();
    }
  };

  window.addEventListener("resize", resize, false);
  window.addEventListener("mousemove", handleMouseMove);
  window.addEventListener("mouseleave", handleMouseLeave);
  document.addEventListener("visibilitychange", handleVisibilityChange);
  resize();
  animationFrameId = window.requestAnimationFrame(render);

  window.addEventListener(
    "pagehide",
    () => {
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseleave", handleMouseLeave);
      document.removeEventListener("visibilitychange", handleVisibilityChange);
      window.cancelAnimationFrame(animationFrameId);
    },
    { once: true }
  );
}

renderProjectGrid();
setupHeroParticles();

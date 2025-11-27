window.addEventListener("load", () => {
  particlesJS("particles-js", {
    particles: {
      number: { value: 280, density: { enable: true, value_area: 800 } },
      color: { value: "#ffffff" },
      shape: { type: "circle" },
      opacity: { value: 0.7 },
      size: { value: 3, random: true },
      line_linked: {
        enable: true,
        distance: 150,
        color: "#ffffff",
        opacity: 0.2,
        width: 1
      },
      move: {
        enable: true,
        speed: 1.2,
        direction: "none",
        random: false,
        straight: false,
        out_mode: "out"
      }
    },
    interactivity: {
      detect_on: "canvas",
      events: {
        onhover: { enable: true, mode: "grab" },
        resize: true
      },
      modes: {
        grab: { distance: 130, line_linked: { opacity: 0.5 } }
      }
    },
    retina_detect: true
  });
});

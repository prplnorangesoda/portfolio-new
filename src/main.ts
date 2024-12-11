import "./style.css";
const FADE_OUT_KEYFRAMES = [
  {
    opacity: "1",
  },
  {
    opacity: "0",
  },
];
const FADE_OUT_SETTINGS = {
  duration: 300,
  iterations: 1,
};
function main() {
  console.log("Hello!");

  let help_text = document.querySelector<HTMLParagraphElement>("#mousehelp")!;
  function close_help() {
    let animation = help_text.animate(FADE_OUT_KEYFRAMES, FADE_OUT_SETTINGS);
    animation.addEventListener(
      "finish",
      () => {
        help_text.style.opacity = `0`;
      },
      { once: true }
    );
  }
  let mouseblur = document.querySelector<HTMLDivElement>("#mouseblur")!;
  document.addEventListener("mousemove", (event) => {
    mouseblur.style.left = `${event.clientX - 250}px`;
    mouseblur.style.top = `${event.clientY - 250}px`;
  });

  setTimeout(() => {
    document.addEventListener(
      "mousemove",
      () => {
        close_help();
      },
      { once: true }
    );
  }, 2000);
}

main();

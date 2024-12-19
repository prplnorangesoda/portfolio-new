import "./style.css";
import { onLCP, onINP, onCLS } from "web-vitals/attribution";

onLCP(console.log);
onINP(console.log);
onCLS(console.log);
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

/**
 *
 * @param element the element to make into fading help text
 * @returns whether it was actually made fading or not
 */
function create_help_text(element: HTMLElement): boolean {
  if (window.matchMedia("only screen and (pointer: none)").matches) {
    return false;
  }

  function close_help() {
    let animation = element.animate(FADE_OUT_KEYFRAMES, FADE_OUT_SETTINGS);
    animation.addEventListener(
      "finish",
      () => {
        element.style.opacity = `0`;
      },
      { once: true }
    );
  }
  setTimeout(() => {
    document.addEventListener(
      "mousemove",
      () => {
        close_help();
      },
      { once: true }
    );
  }, 2000);

  return true;
}

function create_scroll_arrow(element: HTMLElement) {
  element.addEventListener("click", function (this, event) {
    window.scrollTo({ behavior: "smooth", top: 650, left: 0 });
  });
}
function main() {
  let help_text = document.querySelector<HTMLParagraphElement>("#mousehelp")!;
  create_help_text(help_text);

  let mouseblur = document.querySelector<HTMLDivElement>("#mouseblur")!;
  document.addEventListener("mousemove", (event) => {
    mouseblur.style.left = `${event.clientX - 250}px`;
    mouseblur.style.top = `${event.clientY - 250}px`;
  });

  let arrow = document.querySelector<HTMLButtonElement>("#scroll-arrow")!;
  create_scroll_arrow(arrow);
}

main();

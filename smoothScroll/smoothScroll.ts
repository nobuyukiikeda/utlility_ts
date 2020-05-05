import { EasingFunctions } from "./easingFunctions";

export default class SmoothScroll {
  scrollSecond = 1;
  fps = 60;
  timeRate = 1 / (this.scrollSecond * this.fps);

  public init() {
    const host = location.host;

    const anchors = document.getElementsByTagName("a");
    const regExp = /^#/;

    const offset = screen.width < 1024 ? 58 : 0;

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const hrefs = anchor.href.split("/");
      const href = hrefs[hrefs.length - 1];

      if (anchor.host === host && regExp.test(href)) {
        const targetId = href.substr(1);
        const target = document.getElementById(targetId);
        const targetPos = target.offsetTop - offset;

        anchor.addEventListener("click", () => {
          event.preventDefault();
          this.scroll(targetPos);
        });
      }
    }
  }

  private scroll(targetPos: number) {
    let pos = window.scrollY;
    let t = 0;
    const distance = Math.abs(pos - targetPos);

    const scrollStep = () => {
      const easeT = EasingFunctions.linear(t);
      console.log(easeT);
      const step = distance * easeT;

      if (pos > targetPos) {
        if (pos - step > targetPos) {
          window.scrollTo(0, pos - step);
          t += this.timeRate;
          requestAnimationFrame(scrollStep);
        } else {
          window.scrollTo(0, targetPos);
        }
      } else {
        if (pos + step < targetPos) {
          window.scrollTo(0, pos + step);
          t += this.timeRate;
          requestAnimationFrame(scrollStep);
        } else {
          window.scrollTo(0, targetPos);
        }
      }
    };
    requestAnimationFrame(scrollStep);
  }
}

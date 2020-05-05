import { EasingFunctions } from './easingFunctions';

export default class SmoothScroll {
  scrollSpeed: number; // ms
  fps = 60;
  timeRate: number;

  constructor(scrollSpeed: number = 1000) {
    this.scrollSpeed = scrollSpeed;
    this.timeRate = 1000 / (this.scrollSpeed * this.fps);
  }

  public init() {
    const anchors = document.getElementsByTagName('a');
    const current = location.href.replace(/#.*/, '');

    const offset = screen.width < 1024 ? 58 : 0;

    for (let i = 0; i < anchors.length; i++) {
      const anchor = anchors[i];
      const linkPath = anchor.href.replace(/#.*/, '');

      if (anchor.href.includes('#') && linkPath === current) {
        const targetId = anchor.href.replace(/.*#/g, '');
        const target = document.getElementById(targetId);
        const targetPos = target ? target.offsetTop - offset : 0;

        anchor.addEventListener('click', () => {
          if (event) {
            event.preventDefault();
            this.scroll(targetPos);
          }
        });
      }
    }
  }

  private scroll(targetPos: number) {
    let pos = window.scrollY;
    let t = 0;
    const distance = Math.abs(pos - targetPos);

    const scrollStep = () => {
      const easeT = EasingFunctions.easeInOutCubic(t);
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

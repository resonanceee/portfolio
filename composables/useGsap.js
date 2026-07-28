// ponytail: thin shared wrapper — 3 pages need gsap + ScrollTrigger registered once.
// Registering is idempotent so calling this in every page is safe.
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

let registered = false;

export function useGsap() {
  if (!registered) {
    gsap.registerPlugin(ScrollTrigger);
    registered = true;
  }
  return { gsap, ScrollTrigger };
}

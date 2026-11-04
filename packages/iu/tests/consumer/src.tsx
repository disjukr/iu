import { render } from '@solidjs/web';
import type { JSX } from 'iu';
import { foundation, element, focusRing, colors } from 'iu';
import 'iu/styles.css';
// Deliberately loaded AFTER iu: a common unlayered host reset.
import './reset.css';
const content: JSX.Element = <section class={foundation}>
  <p id="text" class={element}>Inter / Noto Sans fallback — rieul</p>
  <button id="focus" class={`${element} ${focusRing}`}>Focus test</button>
  <output id="color">{colors.blue[7]}</output>
</section>;
render(() => content, document.getElementById('app')!);

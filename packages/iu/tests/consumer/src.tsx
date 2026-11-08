import { render } from '@solidjs/web';
import type { JSX } from 'iu';
import { root, unroot, focusRing, colors, vars } from 'iu';
import 'iu/styles.css';
// Application styles loaded after iu.
import './reset.css';
import { CodeBlockExamples } from './CodeBlockExamples';
import { ButtonExamples } from './ButtonExamples';
const content: JSX.Element = <><section class={root}>
  <p id="text">Inter / Noto Sans KR / Noto Sans fallback</p>
  <button id="focus" class={focusRing}>Focus test</button>
  <p id="app-style" class="app-style">Application styles</p>
  <output id="color">{colors.blue[7]}</output>
</section>
<section id="scope" class={root} data-theme="dark" style={{ [vars.font.fontSize.slice(4, -1)]: '24px', [vars.color.text.slice(4, -1)]: 'rgb(0, 128, 0)', '--app-token': 'preserved' }}>
  <h2 id="scoped">Scoped heading</h2>
  <input id="scoped-input" aria-label="Scoped input" />
  <div id="excluded" class={unroot}>
    <h2 id="native">Native heading</h2>
    <div id="reentered" class={root}>
      <h2 id="nested">Scoped again</h2>
      <div class={unroot}><h2 id="native-again">Native again</h2></div>
    </div>
  </div>
</section>
<h2 id="outside">Outside iu</h2><ButtonExamples /><CodeBlockExamples /></>;
render(() => content, document.getElementById('app')!);

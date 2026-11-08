import { typography } from 'iu';

export function Typography() {
  return <section id="typography">
          <p class="eyebrow">FOUNDATIONS</p>
          <h1>Typography</h1>
          <div class="type-specimen"><p>Aa</p><span>The quick brown fox jumps over the lazy dog.</span></div>
          <dl class="specs"><div><dt>Font family</dt><dd>{typography.fontFamily}</dd></div><div><dt>Size / Line height</dt><dd>{typography.fontSize} / {typography.lineHeight}</dd></div><div><dt>Weight</dt><dd>{typography.fontWeight}</dd></div></dl>
          <p>Load fonts in your app. This site uses system fonts.</p>
        </section>;
}

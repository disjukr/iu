import { colors } from 'iu';

export function Colors() {
  const palette = Object.entries(colors).filter((entry): entry is [string, string[]] => Array.isArray(entry[1]));
  return <section id="colors">
          <p class="eyebrow">FOUNDATIONS</p>
          <h1>Colors</h1>
          <p>Open Color 1.9.1. Access shades with <code>colors.blue[7]</code>.</p>
          <div class="palette">{palette.map(([name, shades]) => <div class="palette-row">
            <span class="palette-name">{name}</span>
            <div class="swatches">{shades.map((color, index) => <div class="swatch" style={{ 'background-color': color, color: index < 5 ? colors.gray[9] : colors.white }} title={`${name}[${index}] ${color}`}>
              <span>{index}</span><small>{color}</small>
            </div>)}</div>
          </div>)}</div>
        </section>;
}

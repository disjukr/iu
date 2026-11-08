

export function Api() {
  return <section id="api">
          <p class="eyebrow">FOUNDATIONS</p>
          <h1>API reference</h1>
          <div class="table-scroll"><table><thead><tr><th>Export</th><th>Purpose</th></tr></thead><tbody>{[
            ['root / unroot', 'Start or stop the scoped reset and inherited defaults'],
            ['Button', 'Native button with variant and padding options'],
            ['CodeBlock', 'Source code with Shiki syntax highlighting'],
            ['ButtonGroup', 'Joined related actions in horizontal or vertical layout'],
            ['glass', 'Translucent surface with blur, border, and shadow'],
            ['colors', 'The original Open Color palette'], ['typography', 'Font stack, size, weight, and line height'],
            ['vars', 'Typed CSS variables for theme overrides'], ['focusRing', ':focus-visible styles for keyboard focus'],
            ['JSX', 'Type re-export from @solidjs/web'],
          ].map(([name, description]) => <tr><td><code>{name}</code></td><td>{description}</td></tr>)}</tbody></table></div>
          <p>Portals outside the root need their own <code>root</code> class. <code>unroot</code> does not disable explicit component classes or application styles.</p>
        </section>;
}

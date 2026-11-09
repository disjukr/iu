import { Heading, Paragraph } from 'iu';

export function Introduction() {
  return <section id="introduction" class="hero">
          <Heading as="h1" size="xl">Build with iu.</Heading>
          <Paragraph class="intro">UI components, colors, typography, and themes for your application.</Paragraph>
          <a class="primary-link" href="#/getting-started">Get started <span aria-hidden="true">↗</span></a>
          <div class="hero-meta"><span>Components</span><span>TypeScript</span><span>vanilla-extract</span><span>ESM</span></div>
        </section>;
}

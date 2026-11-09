import arrowOutward from '@iconify-icons/material-symbols/arrow-outward';
import { Button, Heading, Icon, Paragraph } from 'iu';

export function Introduction() {
  return <section id="introduction" class="hero">
          <Heading as="h1" size="xl">Build with iu.</Heading>
          <Paragraph class="intro">UI components, colors, typography, and themes for your application.</Paragraph>
          <Button class="primary-link" href="#/getting-started" variant="primary">
            Get started <Icon icon={arrowOutward} />
          </Button>
          <div class="hero-meta"><span>Components</span><span>TypeScript</span><span>vanilla-extract</span><span>ESM</span></div>
        </section>;
}

import { render } from '@solidjs/web';
import 'iu/styles.css';
import './styles.css';
import { Experiment } from './Experiment';

render(() => <main class="lab">
  <header class="lab-header">
    <h1>iu <span>lab</span></h1>
    <p>Edit <code>src/Experiment.tsx</code> to experiment.</p>
  </header>
  <Experiment />
</main>, document.getElementById('app')!);

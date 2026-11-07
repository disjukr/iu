import { dirname } from 'node:path';

/** Library modules may change their exports or fail to compile between edits. */
export function iuReload() {
  return {
    name: 'iu-source-reload',
    apply: 'serve',
    handleHotUpdate({ file, server }) {
      const entry = server.config.resolve.alias.find(({ find }) =>
        find instanceof RegExp ? find.test('iu') : find === 'iu',
      )?.replacement;
      if (!entry) return;
      const source = `${dirname(entry).replaceAll('\\', '/')}/`;
      const changed = file.replaceAll('\\', '/');
      if (changed.startsWith(source) && /\.tsx?$/.test(changed) && !changed.endsWith('.css.ts')) {
        server.moduleGraph.invalidateAll();
        server.ws.send({ type: 'full-reload' });
        return [];
      }
    },
  };
}

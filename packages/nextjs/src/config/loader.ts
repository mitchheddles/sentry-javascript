import * as fs from 'fs';
import * as path from 'path';

// TODO what to do about the other two options for what GSSP can return (redirect, notFound)?
// TODO Deal with _app separately
// TODO strip extension from route name

type LoaderThis = {
  resourcePath: string;
  getOptions: () => {
    distDir: string;
    projectDir: string;
    pagesDirRegex: RegExp;
  };
};

/**
 *
 */
function addSentryToSource(this: LoaderThis, userCode: string): string {
  // @ts-ignore TODO fix me
  const loaderThis = this as LoaderThis;
  const { distDir, pagesDirRegex } = loaderThis.getOptions();

  const route = loaderThis.resourcePath.match(pagesDirRegex)?.[2];
  debugger;

  // TODO find a better way to guarantee that `route` exists
  if (!route) {
    throw new Error('fixme');
  }

  const templatePath = path.resolve(__dirname, 'injectionTemplate.js');
  let templateCode = fs.readFileSync(templatePath).toString();

  // Remove this so as not to confuse anything in the final bundles
  templateCode = templateCode.replace(/.*sourceMappingURL.*/, '');

  // Fill in placeholders
  templateCode = templateCode.replace('__FILEPATH__', route);
  templateCode = templateCode.replace('__DIST_DIR__', distDir);

  debugger;

  return `${userCode}\n${templateCode}`;
}

export { addSentryToSource as default };

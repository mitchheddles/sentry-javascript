/**
 * A template for the code injected into each entry point at build time by the loader, which will replace the
 * placeholders below with real values.
 */

// This has a cumbersome name at least partially to guarantee that we won't clash with whatever the user may have called
// it (if they import sentry into the page at all)
// eslint-disable-next-line import/no-extraneous-dependencies
const ServerSideSentryNextjsSDK = require('@sentry/nextjs');

const PARAMETERIZED_ROUTE = '__FILEPATH__';
global.__rewriteFramesDistDir__ = '__DIST_DIR__';

exports.getServerSideProps = ServerSideSentryNextjsSDK.withSentryGSSP(exports.getServerSideProps, PARAMETERIZED_ROUTE);
exports.getStaticProps = ServerSideSentryNextjsSDK.withSentryGSProps(exports.getStaticProps, PARAMETERIZED_ROUTE);
exports.getStaticPaths = ServerSideSentryNextjsSDK.withSentryGSPaths(exports.getStaticPaths, PARAMETERIZED_ROUTE);

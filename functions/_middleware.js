import app from './[[path]].js';

export async function onRequest(context) {
  return app(context.request);
}

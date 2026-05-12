import {buildLlmsTxt} from '$lib/llms';

export const prerender = true;

export function GET() {
  return new Response(buildLlmsTxt(), {
    headers: {
      'content-type': 'text/plain; charset=utf-8',
      'cache-control': 'public, max-age=300, s-maxage=3600',
    },
  });
}

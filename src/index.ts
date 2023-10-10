#!/usr/bin/env node
import { load } from 'cheerio';
import getHtml from './utils/getHtml';
import markdownify from './utils/markdownify';

async function main(argv: string[]) {
  const url = argv[2];

  const html = await getHtml(url);
  const $ = load(html);

  const topics: string[] = [];

  const temp = $('div[class="mt-2 flex flex-wrap gap-y-3"] > a');
  temp.each((_, el) => {
    const topic = $(el).text();
    topics.push(topic);
  });

  const data = {
    title: $('title').text(),
    ogurl: $('meta[property="og:url"]').attr('content') || '',
    description: $('meta[name="description"]').attr('content') || '',
    difficulty: $(
      'div[class="text-yellow dark:text-dark-yellow inline-block text-sm font-medium capitalize leading-[22px]"]'
    ).text(),
    topics: topics.join(' '),
  };

  await markdownify(data);
}
main(process.argv);

// build 하도록 만들기

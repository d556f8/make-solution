import { load } from 'cheerio';
import getHtml from './utils/getHtml.js';
import markdownify from './utils/markdownify.js';

async function main(argv) {
  const url = argv[2];

  const html = await getHtml(url);
  const $ = load(html);

  const topics = [];

  const temp = $('div[class="mt-2 flex flex-wrap gap-y-3"] > a');
  temp.each((_, el) => {
    const topic = $(el).text();
    topics.push(topic);
  });

  const data = {
    title: $('title').text(),
    ogurl: $('meta[property="og:url"]').attr('content'),
    description: $('meta[name="description"]').attr('content'),
    difficulty: $(
      'div[class="text-yellow dark:text-dark-yellow inline-block text-sm font-medium capitalize leading-[22px]"]'
    ).text(),
    topics: topics.join(' '),
  };

  await markdownify(data);
}
main(process.argv);

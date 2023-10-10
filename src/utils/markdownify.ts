import fs from 'fs';
import { Solution } from '../interfaces/solution.interface';

export default async function markdownify(data: Solution) {
  const { title, ogurl, description, difficulty, topics } = data;

  const solution = `# ${title}

| category | difficulty  |
| -------- | ----------- |
|${topics} |${difficulty}|
  
[link](${ogurl})

## Description
${description}

## Note
`;
  const solutionDirectory = ogurl.split('/').slice(4, 5).join('/') + '/';

  fs.mkdirSync(solutionDirectory);

  fs.writeFileSync(solutionDirectory + 'solution.md', solution, { encoding: 'utf-8' });
}

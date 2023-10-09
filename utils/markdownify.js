import fs from 'fs';

export default async function markdownify(solutionData) {
  const { title, ogurl, description, difficulty, topics } = solutionData;

  const solution = `
# ${title}

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

  fs.writeFileSync(solutionDirectory + 'solution.md', solution, (err) => {
    console.error('An error occurred while creating the solution.');
    console.error(err);
  });
}

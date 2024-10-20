import { execSync } from 'child_process';
import { writeFileSync } from 'node:fs';
import { load } from 'cheerio';
import { fetchPageWithPuppeteer } from './github.js';

function extractCommitDates({ html }) {
  const $ = load(html);
  const commitData = new Map();

  $('td[data-date]').each((index, element) => {
    const date = $(element).attr('data-date');
    const level = parseInt($(element).attr('data-level'));

    if (date && level > 0) {
      const toolTipId = $(element).attr('id');
      const toolTipSelector = `tool-tip[for="${toolTipId}"]`;
      const tooltipText = $(toolTipSelector).text().trim();

      const match = tooltipText.match(/(\d+) contribution/);
      const commitCount = match ? parseInt(match[1]) : 1;

      commitData.set(date, commitCount);
    }
  });

  return commitData;
}

function writeScriptFile(commitData, committerName, committerEmail) {
  let scriptContent = '';

  commitData.forEach((commitCount, date) => {
    for (let i = 0; i < commitCount; i++) {
      const commitMessage = `Sync commit for ${date} [No. ${i + 1}]`;
      // Check if the commit already exists in the history
      const existingCommit = execSync(`git log --grep="${commitMessage}"`, { encoding: 'utf-8' }).trim();
      if (!existingCommit) {
        scriptContent += `GIT_COMMITTER_NAME="${committerName}" GIT_COMMITTER_EMAIL="${committerEmail}" GIT_COMMITTER_DATE="${date}T00:00:00.000Z" git commit --allow-empty -m "${commitMessage}" --date="${date}T00:00:00.000Z" --author="${committerName} <${committerEmail}>"\n`;
      }
    }
  });

  if (scriptContent) {
    writeFileSync('script.sh', scriptContent, { encoding: 'utf-8' });
    console.log('The script.sh has been successfully generated.');
  } else {
    console.log('No new commits to generate.');
  }
}

export async function generateCommitScript({ username, minYear, maxYear, committerName, committerEmail }) {
  const commitData = new Map();

  for (let year = minYear; year <= maxYear; year++) {
    const from = `${year}-01-01`;
    const to = `${year}-12-31`;

    const url = `https://github.com/${username}?tab=overview&from=${from}&to=${to}`;
    const pageContent = await fetchPageWithPuppeteer({ url });

    const datesForYear = extractCommitDates({ html: pageContent });
    datesForYear.forEach((count, date) => commitData.set(date, count));
  }
  writeScriptFile(commitData, committerName, committerEmail);
}

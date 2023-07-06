const fs = require('fs');
const path = require('path');

const releaseBodyFilePath = path.join(__dirname, 'releaseBody.txt');
let releaseBody = fs.readFileSync(releaseBodyFilePath, 'utf-8');

const repoURL = "https://github.com/LeSangK/nextjs_for_le/pull/"; // Replace with your repo details

let formattedReleaseBody = releaseBody.split('\n').map(line => {
    const prNumberMatch = line.match(/\(#(\d+)\)$/);
    if (prNumberMatch) {
        const prNumber = prNumberMatch[1];
        const prURL = `${repoURL}${prNumber}`;
        return line.replace(`(#${prNumber})`, `([#${prNumber}](${prURL}))`);
    } else {
        return line;
    }
}).join('\n');

const jsonFormatted = JSON.stringify(formattedReleaseBody);

fs.writeFileSync(path.join(__dirname, 'formattedReleaseBody.txt'), jsonFormatted);

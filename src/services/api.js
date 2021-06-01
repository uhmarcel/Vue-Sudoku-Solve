const url = 'https://app.crackingthecryptic.com';

async function getPuzzle(id) {
    return fetch(url + '/api/puzzle/' + id)
    .then(response => response.text())
    .then(raw => parseCompressedJson(raw))
}

function parseCompressedJson(input) {
    const regex = /(?<=ce:)\[\[.*?\]\]/g;
    const matches = input.match(regex);

    try {
        if (!matches || matches.length != 1) {
            throw Error("Invalid format");
        }

        return matches[0]
            .split("],[")
            .map(row => row
                .split(",")
                .map(cell => {
                    let match = cell.match(/{v:(\d+)}/);
                    return match ? parseInt(match[1]) : null
                })
            )
    } catch(e) {
        console.error(e)
        throw Error("Failed to parse response")
    }
}

export { getPuzzle }; // http://localhost:8080/94Qq6qGjh2
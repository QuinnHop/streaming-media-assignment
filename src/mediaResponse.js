const fs = require('fs');
const path = require('path');

function getPositions(request) {
  let { range } = request.headers;
  if (!range) {
    range = 'bytes=0-';
  }
  return range.replace(/bytes=/, '').split('-');
}

function getStream(response, file, start, end) {
  const stream = fs.createReadStream(file, { start, end });
  stream.on('open', () => {
    stream.pipe(response);
  });
  stream.on('error', (streamErr) => {
    response.end(streamErr);
  });
  return stream;
}

function loadFile(request, response, filename, fileType) {
  const file = path.resolve(__dirname, filename);

  fs.stat(file, (err, stats) => {
    if (err) {
      if (err.code === 'ENOENT') {
        response.writeHead(404);
      }
      return response.end(err);
    }
    
    const positions = getPositions(request);

    let start = parseInt(positions[0], 10);
    const total = stats.size;
    const end = positions[1] ? parseInt(positions[1], 10) : total - 1;

    if (start > end) {
      start = end - 1;
    }

    const chunkSize = (end - start) + 1;
    response.writeHead(206, {
      'Content-Range': `bytes ${start}-${end}/${total}`,
      'Accept-Ranges': 'bytes',
      'Content-Length': chunkSize,
      'Content-Type': fileType,
    });

    return getStream(response, file, start, end);
  });
}

const getParty = (request, response) => {
  loadFile(request, response, '../client/party.mp4', 'video/mp4');
};
const getBling = (request, response) => {
  loadFile(request, response, '../client/bling.mp3', 'audio/mpeg');
};
const getBird = (request, response) => {
  loadFile(request, response, '../client/bird.mp4', 'video/mp4');
};

module.exports.getParty = getParty;
module.exports.getBling = getBling;
module.exports.getBird = getBird;

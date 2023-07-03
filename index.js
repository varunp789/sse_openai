import express from 'express';
const app = express();

app.get('/events', (req, res) => {
  // Set headers for SSE
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.setHeader('Access-Control-Allow-Origin', '*');

  // Send SSE headers to the client empty stream
  res.write('\n');

  // Send SSE events at regular intervals
   const messages = [
    'Hello!',
    'Welcome to the server!',
    'new updates'
  ];

  const intervalId = setInterval(() => {
    const eventData = `data: ${messages}\n\n`;
    res.write(eventData);
  }, 5000);

  //client closing the connection
  req.on('close', () => {
    clearInterval(intervalId);
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

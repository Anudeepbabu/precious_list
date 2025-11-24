import app from './server.js';

// Cloudflare Worker handler
export default {
  async fetch(request, env, ctx) {
    // Create a Node.js-like request/response for Express
    const url = new URL(request.url);
    
    return new Promise((resolve, reject) => {
      // Mock Node.js req object
      const req = {
        method: request.method,
        url: url.pathname + url.search,
        headers: Object.fromEntries(request.headers),
        on: () => {}, // Express expects these
        once: () => {},
        removeListener: () => {},
        emit: () => {},
      };

      // Mock Node.js res object
      let statusCode = 200;
      const responseHeaders = new Headers();
      const chunks = [];

      const res = {
        statusCode: 200,
        statusMessage: 'OK',
        headersSent: false,
        
        writeHead: function(code, headers) {
          this.statusCode = code;
          statusCode = code;
          if (headers) {
            Object.entries(headers).forEach(([key, val]) => {
              responseHeaders.set(key, val);
            });
          }
          return this;
        },

        setHeader: function(name, value) {
          responseHeaders.set(name, value);
          return this;
        },

        getHeader: function(name) {
          return responseHeaders.get(name);
        },

        removeHeader: function(name) {
          responseHeaders.delete(name);
          return this;
        },

        write: function(chunk) {
          if (typeof chunk === 'string') {
            chunks.push(new TextEncoder().encode(chunk));
          } else if (chunk instanceof Buffer || chunk instanceof Uint8Array) {
            chunks.push(chunk);
          }
          return this;
        },

        end: function(chunk, encoding) {
          if (chunk) {
            if (typeof chunk === 'string') {
              chunks.push(new TextEncoder().encode(chunk));
            } else if (chunk instanceof Buffer || chunk instanceof Uint8Array) {
              chunks.push(chunk);
            }
          }

          // Combine all chunks
          const totalLength = chunks.reduce((sum, c) => sum + c.length, 0);
          const body = new Uint8Array(totalLength);
          let offset = 0;
          for (const chunk of chunks) {
            body.set(chunk, offset);
            offset += chunk.length;
          }

          // Set content-type if not set
          if (!responseHeaders.has('content-type')) {
            responseHeaders.set('content-type', 'application/json');
          }

          resolve(new Response(body, {
            status: statusCode,
            headers: responseHeaders,
          }));
        },

        on: () => this,
        once: () => this,
        emit: () => this,
        removeListener: () => this,
        addListener: () => this,
      };

      try {
        // Handle body for POST/PUT/PATCH
        if (request.method !== 'GET' && request.method !== 'HEAD') {
          request.text().then(body => {
            req.body = body;
            req.rawBody = body;
            
            // Set body on req for Express body-parser
            let bodyIndex = 0;
            req.on = function(event, callback) {
              if (event === 'data') {
                callback(Buffer.from(body));
              } else if (event === 'end') {
                callback();
              }
              return this;
            };

            // Call Express app
            app(req, res);
          });
        } else {
          // GET/HEAD - no body
          app(req, res);
        }
      } catch (error) {
        console.error('Error:', error);
        resolve(new Response('Internal Server Error: ' + error.message, {
          status: 500,
          headers: { 'content-type': 'text/plain' },
        }));
      }
    });
  },
};

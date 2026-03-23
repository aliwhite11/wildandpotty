#!/usr/bin/env python3
import os
import http.server
import socketserver

os.chdir('/Users/alicewhite/Documents/wildandpotty')

PORT = 8081
Handler = http.server.SimpleHTTPRequestHandler
with socketserver.TCPServer(("", PORT), Handler) as httpd:
    print(f"Serving at http://localhost:{PORT}")
    httpd.serve_forever()

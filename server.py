#!/usr/bin/env python3
import http.server
import socketserver
import os
import sys
from pathlib import Path

# Change to website directory
os.chdir(Path(__file__).parent)

class CustomHTTPRequestHandler(http.server.SimpleHTTPRequestHandler):
    def end_headers(self):
        # Add CORS headers
        self.send_header('Access-Control-Allow-Origin', '*')
        self.send_header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS')
        self.send_header('Access-Control-Allow-Headers', 'Content-Type')
        
        # Cache control headers for better performance
        if self.path.endswith('.css'):
            self.send_header('Content-Type', 'text/css')
            self.send_header('Cache-Control', 'max-age=3600')
        elif self.path.endswith('.js'):
            self.send_header('Content-Type', 'application/javascript')
            self.send_header('Cache-Control', 'max-age=3600')
        elif self.path.endswith('.html'):
            self.send_header('Cache-Control', 'no-cache')
            
        super().end_headers()

    def guess_type(self, path):
        mimetype = super().guess_type(path)
        if path.endswith('.css'):
            return 'text/css'
        elif path.endswith('.js'):
            return 'application/javascript'
        return mimetype

if __name__ == "__main__":
    PORT = 5000
    
    print(f"🌐 Starting Aron Bot Website on port {PORT}")
    print(f"📁 Serving files from: {os.getcwd()}")
    print(f"🔗 Website URL: http://0.0.0.0:{PORT}")
    print("=" * 50)
    
    with socketserver.TCPServer(("0.0.0.0", PORT), CustomHTTPRequestHandler) as httpd:
        try:
            httpd.serve_forever()
        except KeyboardInterrupt:
            print("\n🛑 Server stopped by user")
            sys.exit(0)
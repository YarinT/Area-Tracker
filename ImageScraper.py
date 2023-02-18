import requests
from html.parser import HTMLParser
from flask import Flask, request, jsonify

class ImageParser(HTMLParser):
    def __init__(self):
        super().__init__()
        self.image_urls = []

    def handle_starttag(self, tag, attrs):
        if tag == 'img':
            for attr in attrs:
                if attr[0] == 'src':
                    self.image_urls.append(attr[1])

def get_image_urls(url):
    html = requests.get(url).content
    parser = ImageParser()
    parser.feed(str(html))
    return parser.image_urls

app = Flask(__name__)

@app.route('/', methods=['GET'])
def get_newest_image():
    reg = request.args.get('reg', '4x-cwz')
    image_urls = get_image_urls(f'https://www.jetphotos.com/photo/keyword/{reg}')
    for image in image_urls:
        if '//' in image:
            return "<img src=" +'"'+image+'"'+ "></img>"
    return jsonify({'error': 'Image not found.'})

if __name__ == '__main__':
    app.run()

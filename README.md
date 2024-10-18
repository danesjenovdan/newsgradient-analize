# Newsgradient Analysis [deployment disabled]

This is a tool for the [Newsgradient project](https://github.com/danesjenovdan/newsgradient) to help collect data from news articles. It consists of two parts: 

- **a Firefox extension** that collects information from the user and sends it to the server and

- **a Flask API server** that receives and stores information in json files.

## Flask API Server

Server code can be found in the 'api' folder.

### How does is work

The server accepts GET and POST requests at the root URL. On a GET request it will respond with a simple success message. On a POST request it expects to receive JSON encoded data, with content-type set to application/json in the headers.

On a successful POST request it will store the request body in a JSON file with a timestamp in the name of the file. The files will be saved in the folder 'app/uploaded_files'.

### Usage

You can run it locally by either using flask or docker-compose.

```bash
flask run
```

or

```bash
docker-compose up
```


## Firefox extension

The extension code can be found in the 'extension' folder.

### How it works

The extension collects data about article url, article title, the name of person using the extension (author), veracity, and biases for every party.

An example of sent json:

```json
{
    "url": "https://somerandomurl.com/news/article/",
    "title": "A Random Article Title",
    "author": "Bob",
    "veracity": 2.38,
    "party_biases": [
        "Party 1": "positive",
        "Party 2": "negative",
        "Party 3": "neutral"
    ]
}
```

### How to change parties

Parties are defined in parties.js file in the 'extension/popup' folder, you can add new key-value pairs or delete existing ones.

### Usage

```bash
# install dependencies
npm install

# develop the extension locally using web-ext
npm run dev

# build for production
npm run build
```

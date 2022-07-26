# Newsgradient Analysis

This is a tool for the [Newsgradient project](https://github.com/danesjenovdan/newsgradient) to help collect data from news articles. It consists of two parts: 

- **a Firefox extension** that collects information from the user and sends it to the server and

- **a Flask API server** that receives and stores information in json files.

## Flask API Server

The server code can be found in the 'api' folder.

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

### Usage

```bash
# install dependencies
npm install

# develop the extension locally using web-ext
npm run dev

# build for production
npm run build
```

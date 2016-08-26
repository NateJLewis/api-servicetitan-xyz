# api-servicetitan-xyz
[![Build Status](http://img.shields.io/travis/brunoair/api-servicetitan-xyz/master.svg?style=flat-square)](https://travis-ci.org/brunoair/api-servicetitan-xyz)
[![Dependency Status](http://img.shields.io/david/brunoair/api-servicetitan-xyz.svg?style=flat-square)](https://github.com/brunoair/api-servicetitan-xyz/blob/master/package.json)

Extended api for go.servicetitan.com

#### Running

```bash
npm run dev
```
```bash
npm run build && npm start
```

#### Docker

````bash
docker build -t api-servicetitan-xyz .
docker run -p 8080:8080 api-servicetitan-xyz
```

#### Testing

````bash
npm test
```

#### Deploy
````bash
gcloud app deploy
```

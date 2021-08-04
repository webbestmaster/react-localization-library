# \<Project name\>

## Installation

1. install nodejs (node v14.x+npm v6.x or node v16.x+npm v7.x) for your platform
2. go to project's directory
3. run `npm i` or `npm i --legacy-peer-deps`


## Dev mode

1. make installation
2. go to project's directory
3. run `npm start`


### NPM packages

npm-check-updates
```bash
$ [sudo] npm i -g npm-check-updates
$ ncu [-u]
```

depcheck
```bash
$ [sudo] npm i -g depcheck
$ depcheck
```

### Nginx

Run
```
$ /usr/bin/nginx [-t] [-c ~/my-nginx.conf] [-g "daemon off;"]
```

`-t` - Don’t run, just test the configuration file. NGINX checks configuration for correct syntax and then try to open files referred in configuration.
`-c` - Specify which configuration file NGINX should use instead of the default.
`-g "daemon off;"` - do not exit from terminal

```
$ sudo nginx -s stop
```

```
$ sudo nginx -s reload
```

### Docker

Build
```
$ docker build -t project-name:0.0.1 .
```

`-t` - add project name

Run
```
docker run [-d] -p "8080:9090" project-name:0.0.1
```
Use key `-d` to exit from terminal without stop server\image

8080 - your local port to open app

9090 - server's port of app

Image list
```
$ docker image ls
```

Running images
```
$ docker ps
```

Stop image, get image name from `$ docker ps`
```
$ docker stop <CONTAINER ID>
```

Remove image
```
$ docker image rm -f <image id>
```


### Autotests

#### End-to-End test: jest + puppeteer

Required libraries:
1. jest
2. ts-jest
3. @types/jest

4. puppeteer
5. @types/puppeteer

Running example:
```
$ jest ./test-e2e/ [--runInBand]
```

`--runInBand` - run tests sequentially


#### Unit test: jest + react-*

Required libraries:
1. jest
2. ts-jest
3. @types/jest

4. @testing-library/react
5. @testing-library/jest-dom

6*. use https://mswjs.io/ to make http request

7*. use https://github.com/testing-library/react-hooks-testing-library to test react hooks

Jest config `./jest.config.js`
```javascript
// eslint-disable-next-line unicorn/prefer-module
module.exports = {
    globals: {
        'ts-jest': {
            tsconfig: './tsconfig.test.json',
        },
    },
    modulePathIgnorePatterns: ['<rootDir>/tsc-check/'],
    preset: 'ts-jest',
    setupFilesAfterEnv: ['./test-unit/setup-jest.ts'],
    testEnvironment: 'jsdom', // @testing-library/jest-dom
    testTimeout: 10e3,
};
```

Running example:
```
$ jest ./test-unit/ --coverage
```

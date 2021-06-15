# ad-connect
Used to communicate with on-premises active directory.

## usage
- Copy .env.example, fill in missing values, rename as .env
- Copy given certs to ssl directory on host machine.
- Replace /PATH/TO/ENV with path to .env file
- Replace /PATH/TO/SSL with the full path to the directory containing the certs Edify provided
- - Note: the `/ssl/edify` path should match the prefix in the `.env` file
- Replace CONTAINER_PORT with PORT from .env
- Replace HOST_PORT with target port on host machine
```
docker run -d -v /PATH/TO/SSL:/ssl/edify --env-file /PATH/TO/ENV -p HOST_PORT:CONTAINER_PORT --restart=always --name edify-ad-connector docker-reg.edifylabs.net/ad-connector:latest
```

or run from node:
- Install dependencies:
```
npm i
```
- Build:
```
npm run build
```
- Start:
```
npm start
```

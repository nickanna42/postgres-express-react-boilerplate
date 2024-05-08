FROM node:20.12.2-alpine

COPY ./frontend/package.json /app/
WORKDIR /app
RUN npm install --save-dev --legacy-peer-deps
COPY ./frontend /app/

ENV DEV_PROXY_HOST localhost
RUN node ./scripts/setupContainerDevServer.js

EXPOSE 3000

CMD ["npm", "run", "start"]
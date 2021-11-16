FROM node:16.13.0-alpine

COPY ./frontend/package.json /app/frontend/
WORKDIR /app/frontend
RUN npm install --save-dev
COPY ./frontend /app/frontend/

ENV DEV_PROXY_HOST localhost
RUN node ./scripts/setupContainerDevServer.js

EXPOSE 3000

CMD ["npm", "run", "start"]
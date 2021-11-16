FROM node:16.13.0-alpine

COPY ./migration/package.json /app/migration/
WORKDIR /app/migration
RUN npm install --save-dev
COPY ./migration /app/migration/

CMD ["npm", "run", "start"]
FROM node:20.12.2-alpine

COPY ./migration/package.json /app/migration/
WORKDIR /app/migration
RUN npm install
COPY ./migration /app/migration/

CMD ["npm", "run", "start"]
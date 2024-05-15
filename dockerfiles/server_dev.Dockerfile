FROM node:20.12.2-alpine

COPY ./server/package.json /app/server/
WORKDIR /app/server
RUN npm install --save-dev
COPY ./server /app/server/

ARG HTTP_PORT
EXPOSE 5000

CMD ["npm", "run", "start-watch"]
FROM node:20.12.2-alpine

COPY ./frontend/package.json /app/frontend/
WORKDIR /app/frontend
RUN yarn install
COPY ./frontend /app/frontend/

CMD ["npm", "run", "build"]
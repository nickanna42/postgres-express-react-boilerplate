FROM node:20.12.2-alpine

COPY ./frontend/package.json /app/
WORKDIR /app
RUN npm install --save-dev --legacy-peer-deps
COPY ./frontend /app/

CMD ["npm", "run", "build"]
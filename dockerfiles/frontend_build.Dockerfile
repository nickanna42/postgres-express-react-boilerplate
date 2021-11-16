FROM node:16.13.0-alpine

COPY ./frontend/package.json /app/frontend/
WORKDIR /app/frontend
RUN npm install --save-dev
COPY ./frontend /app/frontend/

CMD ["npm", "run", "build"]
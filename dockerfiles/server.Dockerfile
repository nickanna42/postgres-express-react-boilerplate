FROM node:16.13.0-alpine AS frontend_builder

COPY ./frontend/package.json /app/frontend/
WORKDIR /app/frontend
RUN npm install --save-dev
COPY ./frontend /app/frontend/
RUN npm run build

FROM node:16.13.0-alpine
COPY ./server/package.json /app/server/
WORKDIR /app/server
RUN npm install --save-dev
COPY ./server /app/server/

COPY --from=frontend_builder /app/frontend/build /app/server/public/

ARG HTTP_PORT
EXPOSE 5000

CMD ["node", "index.js"]
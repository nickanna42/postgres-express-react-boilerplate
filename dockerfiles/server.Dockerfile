FROM node:20.12.2-alpine AS frontend_builder
COPY ./frontend/package.json /app/frontend/
WORKDIR /app/frontend
RUN yarn install
COPY ./frontend /app/frontend/
RUN npm run build

FROM node:20.12.2-alpine
COPY ./server/package.json /app/server/
WORKDIR /app/server
RUN yarn install
COPY ./server /app/server/

COPY --from=frontend_builder /app/frontend/build /app/server/public/

ARG HTTP_PORT
EXPOSE 5000

CMD ["node", "index.js"]
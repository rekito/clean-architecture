FROM node:18-alpine

WORKDIR /app/task

COPY --from=shared /app /app/shared

COPY package.json ./
COPY tsconfig.json ./

RUN npm install

COPY container.ts .
COPY application ./application
COPY domain ./domain
COPY infraestructure ./infraestructure
COPY index.ts .
COPY nodemon.json .
COPY .env .

EXPOSE 9000

CMD ["npm", "run", "start"]
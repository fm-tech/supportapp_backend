# https://docs.docker.com/samples/library/node/
FROM node:lts
WORKDIR /app
COPY . .

RUN npm install

RUN npm run postinstall --fix

RUN npm run build

ENV NODE_ENV production

EXPOSE 3001

CMD ["npm", "start"]


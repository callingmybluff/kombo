FROM node:17

WORKDIR /backend
COPY package.json .
COPY yarn.lock .
RUN yarn install
COPY . .

RUN yarn run build
CMD yarn run start
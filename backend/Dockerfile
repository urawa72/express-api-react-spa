FROM node:14-slim

WORKDIR /backend
COPY ./package.json .
RUN yarn install
COPY . .

EXPOSE 3000
CMD ["yarn", "dev"]

FROM node:16
WORKDIR /money-book
COPY ./package.json /money-book/
COPY ./yarn.lock /money-book/
RUN yarn install
COPY . /money-book/
CMD yarn run start:dev
FROM node:14.17.5
LABEL Alan Eicker
WORKDIR /src
COPY package.json . /src/
RUN npm install
RUN npm build
EXPOSE 8080
CMD ["node", "src/server"]
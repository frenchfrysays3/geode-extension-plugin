FROM node:alpine

WORKDIR /extension

COPY package.json .

RUN npm i

RUN npm i -g @vscode/vsce

COPY . .

CMD [ "vsce", "package" ]

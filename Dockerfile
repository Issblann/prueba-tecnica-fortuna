FROM node:18
WORKDIR /usr/src/app  # O cualquier nombre que prefieras
COPY package.json package-lock.json ./
RUN npm install
COPY . .
RUN npm run build
CMD ["npm", "start"]

# Base image
FROM node:18


# Create app directory
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json /usr/src/app/
RUN npm install

# Bundle app source
COPY . /usr/src/app

# Copy the .env and .env.development files
COPY .env /usr/src/app

COPY migrate-and-start.sh .
RUN chmod +x migrate-and-start.sh

# Run Database Scripts
CMD ["npm", "run", "db:restart"]
CMD ["npm", "run", "seed"]

# Creates a "dist" folder with the production build
RUN npm run build

# Expose the port on which the app will run
EXPOSE 3333

CMD ["./migrate-and-start.sh"]

# Start the server using the production build
# CMD ["npm", "run", "start:dev"]

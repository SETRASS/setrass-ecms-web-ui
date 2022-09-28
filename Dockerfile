# Build the Vue app
FROM node:12.22.9-alpine3.15 as build-stage
WORKDIR /app
COPY package*.json ./
RUN echo -e "@emanuel-sosa-setrass:registry=https://registry.npmjs.org/\n//registry.npmjs.org/:_authToken=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" > ~/.npmrc
RUN npm install
COPY . .
RUN npm run build

# Copy the built app in an NGINX contaier
FROM nginx as production-stage
RUN mkdir /app
COPY --from=build-stage /app/dist /app
WORKDIR /app
RUN mv $(ls -d */|head -n 1)/* .
COPY nginx.conf /etc/nginx/nginx.conf

# Overriding the default NGINX container behavior
#COPY ./substitute_environment_variables.sh /substitute_environment_variables.sh
#RUN chmod +x /substitute_environment_variables.sh
#ENTRYPOINT ["/substitute_environment_variables.sh"]
FROM cypress/included:9.5.4
RUN mkdir /app
WORKDIR /app
COPY ./ ./
RUN npm install
CMD ["--browser", "chrome"]
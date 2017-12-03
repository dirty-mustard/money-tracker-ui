FROM node:8.2.1

RUN useradd --user-group --create-home --shell /bin/false app

ENV HOME=/home/app
ENV APP_NAME=money-tracker
WORKDIR $HOME

COPY package.json $HOME/$APP_NAME/
RUN chown -R app:app $HOME/*

USER app
WORKDIR $HOME/$APP_NAME

RUN npm install \
	&& npm cache verify

CMD ["ng", "serve", "--host", "0.0.0.0"]

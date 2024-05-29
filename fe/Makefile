include .env
export $(shell sed 's/=.*//' .env)

build:
ifndef WEB_VERSION
	@docker build -t fruitilham/next -f Dockerfile --platform=linux/amd64 .
else
	@docker build -t fruitilham/next:$(WEB_VERSION) -f Dockerfile --platform=linux/amd64 .
endif
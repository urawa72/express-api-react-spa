build:
	docker compose build

start: build
	docker compose up -d

db_create:
	docker compose run --rm app yarn db:create

db_migrate:
	docker compose run --rm app yarn db:migrate

.PHONY: db_create db_migrate

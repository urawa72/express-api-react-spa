build:
	docker compose build

start: build
	docker compose up -d

install:
	docker compose run --rm app yarn install

db_create:
	docker compose run --rm app yarn db:create

db_migrate:
	docker compose run --rm app yarn db:migrate

db_rollback:
	docker compose run --rm app yarn db:rollback

mysql:
	docker compose exec db mysql -u root -p api_dev


.PHONY: build start install db_create db_migrate db_rollback mysql

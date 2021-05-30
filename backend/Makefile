build:
	docker compose build

start: build
	docker compose up -d

db_create:
	docker compose run --rm app yarn db:create

db_migrate:
	docker compose run --rm app yarn db:migrate

db_rollback:
	docker compose run --rm app yarn db:rollback

mysql:
	docker compose exec db mysql -u root -p api_dev


.PHONY: db_create db_migrate

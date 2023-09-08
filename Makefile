build-release:
	EXPORTED_PORT=8000 docker compose up server --build -d

build-develop:
	EXPORTED_PORT=8001 docker compose up server --build -d

clean:
	docker compose down

checkout-release:
	git switch release; \
	git pull origin release

checkout-develop:
	git switch main; \
	git pull origin main

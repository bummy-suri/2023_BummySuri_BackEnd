build-release:
	EXPORTED_PORT=8000 docker compose up --build -d
build-develop:
	EXPORTED_PORT=8001 docker compose up --build -d

clean:
	docker compose down

checkout:
	git pull origin main
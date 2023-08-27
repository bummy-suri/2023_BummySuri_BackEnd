build-release:
	EXPORTED_PORT=8000 docker compose up --build -d
build-dev:
	EXPORTED_PORT=8001 docker compose up --build -d

clean:
	docker compose down
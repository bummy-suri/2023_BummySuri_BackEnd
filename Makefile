build-dev:
	EXPORTED_PORT=8000 docker compose up --build -d
build-release:
	EXPORTED_PORT=8000 docker compose up --build -d

clean:
	docker compose down
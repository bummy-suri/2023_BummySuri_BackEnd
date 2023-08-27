build-release:
	EXPORTED_PORT=8000 docker compose --name bummy-suri-backend-release up --build -d
build-develop:
	EXPORTED_PORT=8001 docker compose --name bummy-suri-backend-develop up --build -d

clean:
	docker compose down
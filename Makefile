aquire-lock:
	@while [ -f ~/SEMAPHORE_FILE ]; do sleep 10; done
	touch ~/SEMAPHORE_FILE

free-lock:
	rm -f ~/SEMAPHORE_FILE

build-release:
	aquire-lock \
	if [ EXPORTED_PORT=8000 docker compose up --build -d ]; then \
		free-lock; \
		exit 0; \
	else \
		free-lock; \
		exit 1; \
	fi

build-develop: \
	aquire-lock \
	if [ EXPORTED_PORT=8001 docker compose up --build -d ]; then \
		free-lock; \
		exit 0; \
	else \
		free-lock; \
		exit 1; \
	fi

clean:
	docker compose down
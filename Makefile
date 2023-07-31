COMPOSE := docker-compose -f ./docker-compose.yml

docker-compose-up:
    $(COMPOSE) up -d
docker-compose-down:
    $(COMPOSE) down

install:
    echo "Installing dependencies..."
    npm install
    yarn install

test:
    echo "Running all test files in directories..."
    npm run test

run:
    echo "Running the application..."
    npm run start
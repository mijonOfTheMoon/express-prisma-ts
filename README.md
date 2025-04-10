# express-prisma-ts

## How to setup
1. Install the dependency
```sh
npm i
```

2. Setup the env
```sh
cp .env.example .env
```

3. Run Migration
```sh
npx prisma db push
```

4. Test to post data
```sh
curl --location 'http://localhost:3000/api/v1/item' \
--header 'Content-Type: application/json' \
--data '{"name":"banana", "price":15000}'
```

5. Test to get data
```sh
curl --location 'http://localhost:3000/api/v1/item' 
```

Output:
```json
{"items":[{"id":1,"name":"banana","price":15000,"createdAt":"2025-04-10T16:56:08.390Z","updatedAt":"2025-04-10T16:56:08.390Z"}]}
```
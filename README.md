# 2์ฃผ์ฐจ-MoneyBook-project ๐ซ

### :sunny: โํ๋ก์ ํธ ๊ฐ์

---

๊ฐ๊ณ๋ถ API ์๋ฒ๋ฅผ ๊ตฌํํฉ๋๋ค. ์ฌ์ฉ์๋ ์ธ์ฆ์ ๊ฑฐ์ณ ๊ฐ๊ณ๋ถ์ ์ ๊ทผํ  ์ ์๊ณ , ๊ฐ๊ณ๋ถ ๋ด์ญ์ ๊ด๋ฆฌํฉ๋๋ค.

### :bookmark: ๋ชฉ์ฐจ

---

- [2์ฃผ์ฐจ-MoneyBook-project ๐ซ](#2์ฃผ์ฐจ-moneybook-project-)
    - [:sunny: โํ๋ก์ ํธ ๊ฐ์](#sunny-ํ๋ก์ ํธ-๊ฐ์)
    - [:bookmark: ๋ชฉ์ฐจ](#bookmark-๋ชฉ์ฐจ)
    - [:question: ์๊ตฌ์ฌํญ ๋ถ์](#question-์๊ตฌ์ฌํญ-๋ถ์)
      - [:lock: ์ธ์ฆ](#lock-์ธ์ฆ)
      - [:blue_book: ๊ฐ๊ณ๋ถ](#blue_book-๊ฐ๊ณ๋ถ)
      - [:file_folder: ETC](#file_folder-etc)
    - [:family: ํ์](#family-ํ์)
    - [:full_moon: โํ๋ก์ ํธ ์คํ ๋ฐ ํ์คํธ](#full_moon-ํ๋ก์ ํธ-์คํ-๋ฐ-ํ์คํธ)
    - [:key: ํต์ฌ ๊ธฐ๋ฅ](#key-ํต์ฌ-๊ธฐ๋ฅ)
    - [:cd: ๊ธฐ์  ์คํ](#cd-๊ธฐ์ -์คํ)

### :question: ์๊ตฌ์ฌํญ ๋ถ์

---

#### :lock: ์ธ์ฆ

- ํ์๊ฐ์๊ณผ, ๋ก๊ทธ์ธ, ๋ก๊ทธ์์ API๋ฅผ ๊ฐ๋ฐํฉ๋๋ค.
- ๋ก๊ทธ์ธํ์ง ์์ ์ฌ์ฉ์๋ ๊ฐ๊ณ๋ถ ๋ด์ญ์ ์ ๊ทผํ  ์ ์์ต๋๋ค.
- JWT๋ก Access Token๊ณผ Refresh Token์ ๊ด๋ฆฌํฉ๋๋ค.

#### :blue_book: ๊ฐ๊ณ๋ถ


- Create : ์ฌ์ฉํ ๋์ ๊ธ์ก๊ณผ ๊ด๋ จ ๋ฉ๋ชจ๋ฅผ ๋จ๊น๋๋ค.
- Update : ์ฌ์ฉํ ๊ธ์ก๊ณผ ๊ด๋ จ ๋ฉ๋ชจ ์์ ํฉ๋๋ค.
- Delete : ์ํ๋ ๋ด์ญ ์ญ์ ํฉ๋๋ค. (soft-delete)
- Restore : ์ญ์ ํ ๋ด์ญ์ ๋ณต๊ตฌํ  ์ ์์ต๋๋ค.
- Read (list) : ์ฌ์ฉ์์ ๊ฐ๊ณ๋ถ ๋ชฉ๋ก์ ์กฐํํฉ๋๋ค.
- Read (detail) : ์ฌ์ฉ์์ ๊ฐ๊ณ๋ถ ์์ธ๋ชฉ๋ก์ ๊ฐ์ ธ์ต๋๋ค.

#### :file_folder: ETC

- [ERD](https://user-images.githubusercontent.com/57704568/178136467-1758f4ca-e7ea-4532-83b4-ed92a075ea10.png)
- Docker์ GCP๋ฅผ ์ฌ์ฉํ ๋ฐฐํฌ : [http://34.64.239.67:3000/](http://34.64.239.67:3000/)
- Unit Test ์์ฑ
- Lint, Prettier ํฌ๋งทํ
- Commit Convention
  [Ref. Commit Convention](https://github.com/pre-onboarding-backend-E/02-MoneyBook-E/wiki/Commit-Convention)

### :family: ํ์

---

| ์ด๋ฆ   | Github        | email               | blog                                                                                 |
| ------ | ------------- | ------------------- | ------------------------------------------------------------------------------------ |
| ์ผํ๋ | everchloe97   | star57009@khu.ac.kr | [everchloe97 (YEOM HA NEUL) - velog](https://velog.io/@everchloe97)                  |
| ๊น์ฉ๋ฏผ | ymink716      | ymink716@gmail.com  | https://velog.io/@calm0_0                                                            |
| ๊นํ์ | leokim1178    | leo950906@gmail.com | [0taeโs devlog](https://story0tae.tistory.com/)                                      |
| ๋ฐ์ ์ | ParkShinyeong | syngh503@gmail.com  | [์ ์์ ๋ธ์](https://sudsy-action-667.notion.site/5ed77b24085f42b8bd1c9e5c0b37d25d) |

:cloud: **ENV**

---

```
DB_HOST=database-server
DB_PORT=3306
DB_USERNAME=root
DB_PASSWORD=2222
DB_DATABASE=money-book
JWT_SECRET_KEY= ??
JWT_EXPIRATION_TIME= ?? (ex / 1h ํ์์ผ๋ก ์์ฑํฉ๋๋ค.)
JWT_REFRESH_TOKEN_SECRET= ??
JWT_REFRESH_TOKEN_EXPIRATION_TIME= ?? (ex / 1h ํ์์ผ๋ก ์์ฑํฉ๋๋ค.)
```

- /env/.env ์ ๋ค์๊ณผ ๊ฐ์ด ํ๊ฒฝ ๋ณ์๋ฅผ ์ค์ ํฉ๋๋ค.

### :full_moon: โํ๋ก์ ํธ ์คํ ๋ฐ ํ์คํธ

---

1. ์คํ ๐ก

```
cd 02-MoneyBook-E/
docker compose build
docker compose up
```

2. ํ์คํธ ๐ก

```
yarn test
```

3. Swagger API ๐ก

```
1. swagger (api ๋ฌธ์)
  - localhost:3000/api/docs ์ ์ - local
  - ๋ฐฐํฌ ip /์ ์ - ๋ฐฐํฌ
2. sign up์ ํตํด user๋ฅผ ์์ฑํ๊ณ  login ํ api๋ฅผ ํ์คํธ ํ  ์ ์์ต๋๋ค.
```

### :key: ํต์ฌ ๊ธฐ๋ฅ

---

- **User (์ฌ์ฉ์)** ๐โโ๏ธ๐โโ๏ธ
  - ํ์๊ฐ์
  - ๋ก๊ทธ์ธ
  - ๋ก๊ทธ์์
  - ํ ํฐ ์ฌ๋ฐ๊ธ
- **Money book (๊ฐ๊ณ๋ถ)** ๐ฐ๐
  - ๊ฐ๊ณ๋ถ ์์ฑ
  - ๊ฐ๊ณ๋ถ ์์ 
  - ๊ฐ๊ณ๋ถ ๋ชฉ๋ก ์กฐํ
  - ๊ฐ๊ณ๋ถ ์์ธ ์กฐํ
  - ๊ฐ๊ณ๋ถ ์ญ์ 
  - ์ญ์ ๋ ๊ฐ๊ณ๋ถ ๋ด์ญ ๋ณต๊ตฌ

### :cd: ๊ธฐ์  ์คํ

---

<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/NodeJS-339933?style=flat&logo=nodejs&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>


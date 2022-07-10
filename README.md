# 2주차-MoneyBook-project 💫

**프로젝트 개요** ) 

- 🤔 서비스 분석 
- 서비스 구현 과정

**팀원**
| 이름 | Github | email | blog |
| --- | --- | --- | --- |
| 염하늘 | everchloe97 | star57009@khu.ac.kr | |
| 김용민 | ymink716 | ymink716@gmail.com | https://velog.io/@calm0_0 |
| 김태영 | leokim1178 | leo950906@gmail.com | 0tae’s devlog |
| 박신영 | ParkShinyeong | syngh503@gmail.com | 신영의 notion |

**ENV** 💡 
  ```
  DB_HOST=database-server
  DB_PORT=3306
  DB_USERNAME=root
  DB_PASSWORD=2222
  DB_DATABASE=money-book
  JWT_SECRET_KEY= ??
  JWT_EXPIRATION_TIME= ?? (ex / 1h 형식으로 작성합니다.)
  JWT_REFRESH_TOKEN_SECRET= ??
  JWT_REFRESH_TOKEN_EXPIRATION_TIME= ?? (ex / 1h 형식으로 작성합니다.)
  ```
<br>

**프로젝트 실행 및 테스트)**

1. 실행 방법 💡
  ```
  cd 02-MoneyBook-E/
  docker compose build
  docker compose up
  ```
2. 테스트 방법 💡
  ```
  yarn test
  ```
3. Swagger 테스트 방법 💡
  ```
  1. swagger (api 문서)
    - localhost:3000/api/docs 접속 - local
    - 배포 ip /접속 - 배포
  2. sign up을 통해 user를 생성하고 login 후 api를 테스트 할 수 있습니다.
  ```


**핵심 기능**

- __User (사용자)__ 🙍‍♀️🙍‍♂️
  - 회원가입 
  - 로그인 
  - 로그아웃
  - 토큰 재발급
- __Money book (가계부)__ 💰📝
  - 가계부 작성 
  - 가계부 수정 
  - 가계부 목록 조회
  - 가계부 상세 조회 
  - 가계부 삭제  
  - 삭제된 가계부 내역 복구

**기술 스택** 

<img src="https://img.shields.io/badge/Typescript-3178C6?style=flat&logo=typescript&logoColor=white"/>
<img src="https://img.shields.io/badge/NestJS-E0234E?style=flat&logo=nestjs&logoColor=white"/>
<img src="https://img.shields.io/badge/Docker-2496ED?style=flat&logo=docker&logoColor=white"/>
<img src="https://img.shields.io/badge/MySQL-4479A1?style=flat&logo=mysql&logoColor=white"/>
<img src="https://img.shields.io/badge/NodeJS-339933?style=flat&logo=nodejs&logoColor=white"/>
<img src="https://img.shields.io/badge/GitHub-181717?style=flat&logo=github&logoColor=white"/>

**기타**

- [ERD](https://user-images.githubusercontent.com/57704568/178136467-1758f4ca-e7ea-4532-83b4-ed92a075ea10.png)

- Commit Convention
  [Ref. Commit Convention](https://github.com/pre-onboarding-backend-E/02-MoneyBook-E/wiki/Commit-Convention)

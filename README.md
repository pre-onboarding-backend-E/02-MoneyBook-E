# 2주차-MoneyBook-project 💫

**프로젝트 개요** ) 

- 요구사항 분석 간단 정리
- (+혹은 디테일하게 분석과정 정리)

**팀원**
| 이름 | Github | email | blog |
| --- | --- | --- | --- |
| 염하늘 | everchloe97 | star57009@khu.ac.kr | |
| 김용민 | ymink716 | ymink716@gmail.com | https://velog.io/@calm0_0 |
| 김태영 | leokim1178 | leo950906@gmail.com | 0tae’s devlog |
| 박신영 | ParkShinyeong | syngh503@gmail.com | 신영의 notion |

**ENV**
`example`

<aside>
💡 
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
</aside>
<br>

**프로젝트 실행 및 테스트)**
<aside>
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
  '''
  1. swagger (api 문서)
    - localhost:3000/api/docs 접속 - local
    - 배포 ip /접속 - 배포
  2. sign up을 통해 user를 생성하고 login 후 api를 테스트 할 수 있습니다.
  '''
</aside>


**핵심 기능**) 정리

- - 000 목록 불러오기 / 000 api 호출하기 등 간결하게 listing

**기술 스택** ) 정리

- 스티커 형식으로 보기 좋게

**기타**) ERD / 개발 요구사항 분석 과정 / commit Convention 등 ... 자유롭게

- ERD

- Commit Convention
  [커밋 컨벤션 참조]()

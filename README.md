# Medical Diary 프로젝트

이 프로젝트는 Spring Boot를 사용한 웹 기반 의료 다이어리 서비스로, 약물 복용 관리, 약국 및 폐의약품 수거함 위치 찾기 기능을 제공합니다.

## 주요 기능

1. **회원 관리**
   - 회원가입
   - 로그인
   - 회원 정보 수정

2. **의약품 다이어리**
   - 달력 기반 약물 복용 일정 관리
   - 의약품 정보 추가/수정/삭제

3. **지도 서비스**
   - 약국 위치 찾기
   - 폐의약품 수거함 위치 찾기

4. **뉴스 제공**
   - 의료 관련 뉴스 제목 및 요약 제공
   - 뉴스 원문 링크

5. **채팅 기능**
   - 사용자 간 실시간 채팅

6. **반응형 디자인**
   - 모바일 및 데스크탑 버전 지원

## 기술 스택

- Backend: Spring Boot, Spring Security
- Frontend: Thymeleaf, HTML, CSS, JavaScript
- 데이터베이스: JPA, Hibernate
- Build Tool: Gradle
- API: 카카오 맵 API, 공공 데이터 포털 API


## 엔티티 관계도 (ERD)

```
+----------------+        +---------------+
|  CalendarEntity |        |   UserEntity  |
+----------------+        +---------------+
| medicineId: int |        | id: String    |
| id: String      |        | pw: String    |
| medicine: String|        | name: String  |
| startdate: Date |        | location: bool|
| finishdate: Date|        +---------------+
| detail1: boolean|                |
| detail2: boolean|                |
| detail3: boolean|                |
| detail4: boolean|                |
| detail5: boolean|                |
| memo: String    |                |
+----------------+                |
         |                        |
         |                        |
         |        +---------------+
         |        |   NewsEntity  |
         |        +---------------+
         |        | title: String |
         |        | link: String  |
         |        | summary: String|
         |        | image: String |
         |        +---------------+
         |
         |
    (관계: 1 User to Many Calendars)
```

### 엔티티 설명

1. **CalendarEntity**: 사용자의 의약품 복용 일정을 관리합니다.
   - `medicineId`: 의약품 일정의 고유 식별자
   - `id`: 사용자 ID (UserEntity와 연결)
   - `medicine`: 의약품 이름
   - `startdate` & `finishdate`: 복용 시작일과 종료일
   - `detail1` ~ `detail5`: 복용 상세 정보 (예: 아침, 점심, 저녁 복용 여부)
   - `memo`: 추가 메모

2. **UserEntity**: 사용자 정보를 관리합니다.
   - `id`: 사용자의 고유 식별자
   - `pw`: 비밀번호
   - `name`: 사용자 이름
   - `location`: 위치 정보 사용 동의 여부

3. **NewsEntity**: 의료 관련 뉴스 정보를 저장합니다.
   - `title`: 뉴스 제목
   - `link`: 뉴스 원문 링크
   - `summary`: 뉴스 요약
   - `image`: 뉴스 관련 이미지 URL

### 관계
- 한 명의 사용자(UserEntity)는 여러 개의 의약품 일정(CalendarEntity)을 가질 수 있습니다. (1:N 관계)
- NewsEntity는 독립적으로 존재하며, 모든 사용자에게 공통으로 제공됩니다.


## 주요 클래스 설명

- `CalendarController`: 의약품 다이어리 관련 요청 처리
- `MainController`: 홈페이지, 프로필 등 주요 페이지 요청 처리
- `UserController`: 사용자 관리(로그인, 회원가입 등) 요청 처리
- `CalendarEntity`: 의약품 다이어리 데이터 모델
- `UserEntity`: 사용자 데이터 모델
- `NewsEntity`: 뉴스 데이터 모델




## 설치 및 실행 방법

1. 저장소를 클론합니다:
   ```
   git clone https://github.com/Ghoney99/Medical_Diary.git
   ```

2. 프로젝트 디렉토리로 이동합니다:
   ```
   cd Medical_Diary
   ```

3. Gradle을 사용하여 프로젝트를 빌드합니다:
   ```
   ./gradlew build
   ```

4. 애플리케이션을 실행합니다:
   ```
   ./gradlew bootRun
   ```

## 테스트 방법
1. 서버가 열린 상태에서, application_properties 파일의 서버 코드 주석 처리, 테스트 코드 주석 처리 해제 후 프로그램 실행
2. http://localhost:8080(포트번호)/home 접속
3. 로그인
    - 로그인 버튼 클릭
    - 회원가입 버튼 클릭
    - 아이디/ 비밀번호/ 이름 입력
    - 완료
    - 가입한 정보로 로그인
4. 지도
    - 홈의 약국 지도 혹은 폐의약품 수거함 지도 버튼 클릭
    - 원하는 지역 버튼 클릭
    - 리스트에 장소 버튼을 클릭 / 지도의 장소 버튼 클릭
    - 오버레이 출력
    - 오버레이의 도로명주소를 클릭 -> 카카오맵 사이트로 이동
5. 달력
    - 홈의 달력 버튼 클릭
    - 오늘의 날짜 확인 가능
    - 날짜 선택
    - (+) 버튼 클릭 (의약품 정보 추가 위해)
    - 의약품의 이름/ 섭취 기간(시작 날짜 & 종료 날짜)/ 섭취 빈도(아침/ 점심/ 저녁/ 식전 30분/ 식후 30분) 입력 및 선택
    - 완료
    - 수정 / 삭제 버튼
6. 마이페이지
    - 수정 버튼 통해 로그인한 계정의 이름 정보 수정
    - 오늘 날짜에 기록된 의약품 확인
      - 의약품 이름 클릭시 상세 정보 페이지로 이동


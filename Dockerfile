# # vue 
# # 가져올 이미지를 정의
# FROM node:latest

# # 경로 설정하기
# WORKDIR /1team-front-vue

# # package.json 워킹 디렉토리에 복사 (.은 설정한 워킹 디렉토리를 뜻함)
# COPY package.json .

# # 현재 디렉토리의 모든 파일을 도커 컨테이너의 워킹 디렉토리에 복사한다.
# COPY . .

# # 각각의 명령어들은 한줄 한줄씩 캐싱되어 실행된다.
# # package.json의 내용은 자주 바뀌진 않을 거지만
# # 소스 코드는 자주 바뀌는데
# # npm install과 COPY . . 를 동시에 수행하면
# # 소스 코드가 조금 달라질때도 항상 npm install을 수행해서 리소스가 낭비된다.

# # 명령어 실행 (의존성 설치)
# RUN npm install
# RUN npm i axios
# # RUN npm install -g json-server@0.17.0
# RUN npm install vuex@next --save

# # 5173번 포트 노출
# EXPOSE 5173


# RUN npm install --silent

# # npm start 스크립트 실행
# # CMD ["json-server", "--watch", "db.json"]
# CMD ["npm", "run", "build"]



# FROM node:latest AS build
# WORKDIR /frontapp
# COPY . .
# RUN npm run build

# # production
# FROM node:alpine AS production
# WORKDIR /frontapp
# COPY --from=build /frontapp /frontapp
# CMD [ "npm", "run", "dev"]



# 개발용 이미지 설정
FROM node:latest AS build

# 작업 디렉토리 설정
WORKDIR /frontapp

# 소스 코드 복사
COPY . .

# 필요한 라이브러리 및 의존성 설치
RUN npm install

# Vite 설치
RUN npm install -g vite

# 프로덕션 빌드
RUN npm run build

# 프로덕션 이미지 설정
FROM node:alpine AS production

# 작업 디렉토리 설정
WORKDIR /frontapp

# 프로덕션 이미지로부터 빌드된 파일 복사
COPY --from=build /frontapp /frontapp

# 실행할 명령어 설정
CMD [ "npm", "run", "dev"]

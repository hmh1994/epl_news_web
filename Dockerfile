# 1. 빌드 단계: Node 20.11.1-alpine 이미지를 기반으로 빌드 진행
FROM node:20.11.1-alpine AS builder
WORKDIR /app

# package.json과 package-lock.json을 먼저 복사하여 의존성 설치 (npm 사용)
COPY package.json package-lock.json ./
RUN npm install

# 전체 소스 코드 복사 (app router, server 및 client 컴포넌트 포함)
COPY . .

# Next.js 앱 빌드
RUN npm run build

# 2. 실행 단계: production 환경을 위한 경량 이미지 구성
FROM node:20.11.1-alpine AS runner
WORKDIR /app
ENV NODE_ENV=production

# 빌드 결과물과 필요한 파일들을 복사
COPY --from=builder /app/package.json ./
COPY --from=builder /app/next.config.mjs ./
COPY --from=builder /app/public ./public
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/node_modules ./node_modules

# 기본 포트 설정 (필요에 따라 수정 가능)
EXPOSE 3000

# Next.js 앱 실행 (app router 기반)
CMD ["npm", "start"]

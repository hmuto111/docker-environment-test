FROM openjdk:21-jdk-slim

WORKDIR /app

COPY ./demo/build.gradle ./demo/settings.gradle ./demo/gradlew ./
COPY ./demo/gradle ./gradle

COPY ./demo/ ./

RUN chmod +x ./gradlew

CMD ["./gradlew", "bootRun", "--no-daemon"]

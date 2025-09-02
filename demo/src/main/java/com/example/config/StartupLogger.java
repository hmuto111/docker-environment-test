package com.example.config;

import jakarta.annotation.PostConstruct;
import org.springframework.stereotype.Component;

@Component
public class StartupLogger {

    @PostConstruct
    public void logStartupMessage() {
        System.out.println("✅ Spring Boot アプリが正常に起動しました");
    }
}

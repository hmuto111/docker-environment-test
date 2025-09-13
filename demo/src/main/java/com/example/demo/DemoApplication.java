package com.example.demo;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.boot.CommandLineRunner;
import org.springframework.data.mongodb.core.MongoTemplate;

import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

import com.example.demo.entity.Todo;

import java.time.Instant;

@SpringBootApplication
public class DemoApplication {

    public static void main(String[] args) {
        SpringApplication.run(DemoApplication.class, args);
    }

	@Bean
	public WebMvcConfigurer corsConfigurer() {
		return new WebMvcConfigurer() {
			@Override
			public void addCorsMappings(CorsRegistry registry) {
				registry.addMapping("/api/**").allowedOrigins("http://localhost:3000");
			}
		};
	}

    @Bean
    CommandLineRunner insertSampleTodo(MongoTemplate mongoTemplate) {
        return args -> {
            Todo t = new Todo("sample todo from DemoApplication", Instant.now(), null);
            mongoTemplate.insert(t, "todos");
            System.out.println("Inserted todo id=" + t.getId());
        };
    }
}
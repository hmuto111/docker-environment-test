package com.example.demo.entity;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;
import org.springframework.data.mongodb.core.mapping.Field;

import java.time.Instant;

@Document(collection = "todos")
public class Todo {

    @Id
    private String id;

    private String content;

    @Field("created_date")
    private Instant createdDate;

    @Field("completed_date")
    private Instant completedDate;

    public Todo() {}

    public Todo(String content, Instant createdDate, Instant completedDate) {
        this.content = content;
        this.createdDate = createdDate;
        this.completedDate = completedDate;
    }

    // getters / setters
    public String getId() {
        return id;
    }

    public void setId(String id) {
        this.id = id;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public Instant getCreatedDate() {
        return createdDate;
    }

    public void setCreatedDate(Instant createdDate) {
        this.createdDate = createdDate;
    }

    public Instant getCompletedDate() {
        return completedDate;
    }

    public void setCompletedDate(Instant completedDate) {
        this.completedDate = completedDate;
    }
}
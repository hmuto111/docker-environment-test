package com.example.demo.controller;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.RequestBody;

import com.example.demo.entity.User;
import com.example.demo.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import java.util.List;
import java.util.Optional;

@Controller
public class DemoController {
    
    @GetMapping("/demo")
    public String display(){
        return "index";
    }
}

@RestController
@RequestMapping("/api/users")
class UserController {
    
    @Autowired
    private UserService userService;
    
    // 全ユーザー取得
    @GetMapping
    public List<User> getAllUsers() {
        return userService.getAllUsers();
    }
    
    // IDでユーザー取得
    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        Optional<User> user = userService.getUserById(id);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    // メールアドレスでユーザー取得
    @GetMapping("/email/{email}")
    public ResponseEntity<User> getUserByEmail(@PathVariable String email) {
        Optional<User> user = userService.getUserByEmail(email);
        return user.map(ResponseEntity::ok)
                  .orElse(ResponseEntity.notFound().build());
    }
    
    // 名前で検索
    @GetMapping("/search")
    public List<User> searchUsers(@RequestParam String name) {
        return userService.searchUsersByName(name);
    }
    
    // ユーザー作成
    @PostMapping
    public User createUser(@RequestBody UserRequest request) {
        return userService.createUser(request.getName(), request.getEmail());
    }
    
    // ユーザー更新
    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody UserRequest request) {
        Optional<User> updatedUser = userService.updateUser(id, request.getName(), request.getEmail());
        return updatedUser.map(ResponseEntity::ok)
                         .orElse(ResponseEntity.notFound().build());
    }
    
    // ユーザー削除
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        boolean deleted = userService.deleteUser(id);
        return deleted ? ResponseEntity.ok().build() 
                      : ResponseEntity.notFound().build();
    }
    
    // リクエスト用のクラス
    public static class UserRequest {
        private String name;
        private String email;
        
        // Getters and Setters
        public String getName() { return name; }
        public void setName(String name) { this.name = name; }
        public String getEmail() { return email; }
        public void setEmail(String email) { this.email = email; }
    }
}
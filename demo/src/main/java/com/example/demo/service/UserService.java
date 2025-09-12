package com.example.demo.service;

import com.example.demo.entity.User;
import com.example.demo.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {
    
    @Autowired
    private UserRepository userRepository;
    
    // 全ユーザー取得
    public List<User> getAllUsers() {
        return userRepository.findAll();
    }
    
    // IDでユーザー取得
    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }
    
    // メールアドレスでユーザー取得
    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }
    
    // 名前で検索
    public List<User> searchUsersByName(String name) {
        return userRepository.findByNameContaining(name);
    }
    
    // ユーザー作成
    public User createUser(String name, String email) {
        User user = new User(name, email);
        return userRepository.save(user);
    }
    
    // ユーザー更新
    public Optional<User> updateUser(Long id, String name, String email) {
        Optional<User> userOpt = userRepository.findById(id);
        if (userOpt.isPresent()) {
            User user = userOpt.get();
            user.setName(name);
            user.setEmail(email);
            return Optional.of(userRepository.save(user));
        }
        return Optional.empty();
    }
    
    // ユーザー削除
    public boolean deleteUser(Long id) {
        if (userRepository.existsById(id)) {
            userRepository.deleteById(id);
            return true;
        }
        return false;
    }
}
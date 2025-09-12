package com.example.demo.repository;

import com.example.demo.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;
import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepository extends JpaRepository<User, Long> {
    
    // メールアドレスでユーザーを検索
    Optional<User> findByEmail(String email);
    
    // 名前でユーザーを検索（部分一致）
    List<User> findByNameContaining(String name);
    
    // カスタムクエリ例
    @Query("SELECT u FROM User u WHERE u.name LIKE %?1%")
    List<User> findByNameLike(String name);
}
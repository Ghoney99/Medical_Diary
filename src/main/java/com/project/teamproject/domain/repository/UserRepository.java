package com.project.teamproject.domain.repository;

import com.project.teamproject.domain.entity.UserEntity;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface UserRepository extends JpaRepository<UserEntity, String> {
    Optional<UserEntity> findByid(String id);
    UserEntity findByIdAndName(String id, String name);
}

package com.project.teamproject.domain.entity;

import lombok.*;
import javax.persistence.*;

@Entity
@Getter
@Setter
public class UserEntity {
    @Id
    @Column(length = 10, nullable = false)
    private String id;

    @Column
    private String pw;

    @Column(length = 10)
    private String name;

    private boolean location;
}

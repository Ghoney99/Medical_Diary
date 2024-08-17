package com.project.teamproject.domain.entity;

import lombok.Getter;
import lombok.Setter;
import lombok.ToString;
@Getter
@Setter
@ToString
public class NewsEntity {
    private String title;
    private String link;
    private String summary;
    private String image;

    public NewsEntity() {
    }
}
package com.project.teamproject.domain.entity;

import com.fasterxml.jackson.annotation.JsonFormat;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.sql.Date;

@Entity
@Getter
@Setter
public class CalendarEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    @Column(nullable = false)
    private int medicineId;

    @Column(length = 10)
    private String id;

    @Column(length = 10, nullable = false)
    private String medicine;

    @Column(nullable = false)
    private Date startdate;

    @Column(nullable = false)
    private Date finishdate;

    @Column
    private boolean detail1;

    @Column
    private boolean detail2;

    @Column
    private boolean detail3;

    @Column
    private boolean detail4;

    @Column
    private boolean detail5;

    @Column(length = 250)
    private String memo;
}

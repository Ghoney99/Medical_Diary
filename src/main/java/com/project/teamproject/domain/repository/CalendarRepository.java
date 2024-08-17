package com.project.teamproject.domain.repository;

import com.project.teamproject.domain.entity.CalendarEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.jdbc.datasource.DataSourceUtils;

import javax.sql.DataSource;
import java.sql.Connection;
import java.sql.Date;
import java.util.Collection;
import java.util.List;
import java.util.Optional;

public interface CalendarRepository extends JpaRepository<CalendarEntity, String> {

    List<CalendarEntity> findAll();
    List<CalendarEntity> findBystartdate(Date date);
    List<CalendarEntity> findByMedicineId(int medicineId);
    CalendarEntity findByMedicineIdAndMedicine(int medicineId, String medicine);
    void deleteByMedicineId(int medicineId);
}

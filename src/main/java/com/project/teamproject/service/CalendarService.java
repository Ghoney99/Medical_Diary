package com.project.teamproject.service;

import com.project.teamproject.domain.entity.CalendarEntity;
import com.project.teamproject.domain.repository.CalendarRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.jdbc.datasource.DataSourceUtils;
import org.springframework.stereotype.Service;

import javax.sql.DataSource;
import javax.transaction.Transactional;
import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.List;
import java.util.Optional;


@RequiredArgsConstructor
@Service
public class CalendarService {

    private final CalendarRepository calendarRepository;

    public CalendarEntity create(int medicineId, String id, String medicine, Date startdate, Date finishdate, boolean detail1, boolean detail2, boolean detail3, boolean detail4, boolean detail5, String memo){
        CalendarEntity cal = new CalendarEntity();
        cal.setMedicineId(medicineId);
        cal.setId(id);
        cal.setMedicine(medicine);
        cal.setStartdate(startdate);
        cal.setFinishdate(finishdate);
        cal.setDetail1(detail1);
        cal.setDetail2(detail2);
        cal.setDetail3(detail3);
        cal.setDetail4(detail4);
        cal.setDetail5(detail5);
        cal.setMemo(memo);
        this.calendarRepository.save(cal);
        return cal;
    }

    public void update(String name, String medicineId,String medicine,String startdate,String finishdate,String detail1,String detail2,String detail3,String detail4,String detail5,String memo) throws ParseException {
        int num = Integer.parseInt(medicineId);
        Date d1 = Date.valueOf(startdate);
        Date d2 = Date.valueOf(finishdate);

        CalendarEntity cal = calendarRepository.findByMedicineIdAndMedicine(num, name);
        cal.setMedicine(medicine);
        cal.setStartdate(d1);
        cal.setFinishdate(d2);
        cal.setDetail1(Boolean.parseBoolean(detail1));
        cal.setDetail2(Boolean.parseBoolean(detail2));
        cal.setDetail3(Boolean.parseBoolean(detail3));
        cal.setDetail4(Boolean.parseBoolean(detail4));
        cal.setDetail5(Boolean.parseBoolean(detail5));
        cal.setMemo(memo);
        this.calendarRepository.save(cal);
    }

    @Transactional
    public void delete(int medicineId){
        calendarRepository.deleteByMedicineId(medicineId);
    }

}

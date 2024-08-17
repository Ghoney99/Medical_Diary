package com.project.teamproject.controller;

import com.project.teamproject.createForm.CalendarCreateForm;
import com.project.teamproject.domain.entity.CalendarEntity;
import com.project.teamproject.domain.repository.CalendarRepository;
import com.project.teamproject.service.CalendarService;
import lombok.RequiredArgsConstructor;
import org.springframework.dao.DataIntegrityViolationException;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import javax.validation.Valid;
import java.security.Principal;
import java.sql.Date;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.List;

@RequiredArgsConstructor
@Controller
@RequestMapping("/calendar")
public class CalendarController {

    private final CalendarService calendarService;
    private final CalendarRepository calendarRepository;

    @GetMapping("/")
    public String calendar(Model model, Date date) {
        List<CalendarEntity> medicines = new ArrayList<>();

        Date newDate = date;

        medicines = calendarRepository.findAll();
        java.util.Date d = new java.util.Date();
        SimpleDateFormat formatter = new SimpleDateFormat("yyyy-MM-dd");

        model.addAttribute("medicines",medicines);

        return "calendar";
    }

    @GetMapping("/add")
    public String addCalendar(CalendarCreateForm calendarCreateForm) { return "addCalendar"; }

    @PostMapping("/add")
    public String addCalendar(@Valid CalendarCreateForm calendarCreateForm, BindingResult bindingResult) {
        if (bindingResult.hasErrors()) {
            System.out.println("Error : Adding data to calendar");
            return "addCalendar";
        }
        try{
            calendarService.create(calendarCreateForm.getMedicineId(), calendarCreateForm.getId(), calendarCreateForm.getMedicine(), calendarCreateForm.getStartdate(), calendarCreateForm.getFinishdate(), calendarCreateForm.isDetail1(), calendarCreateForm.isDetail2(), calendarCreateForm.isDetail3(), calendarCreateForm.isDetail4(), calendarCreateForm.isDetail5(), calendarCreateForm.getMemo());
        } catch (DataIntegrityViolationException e){
            e.printStackTrace();
            bindingResult.reject("addFailed","This user is already existed");
            return "addCalendar";
        } catch (Exception e){
            e.printStackTrace();
            bindingResult.reject("addFailed",e.getMessage());
            return "addCalendar";
        }
        return "redirect:/calendar/";
    }

    @GetMapping("/show/{medicineId}")
    public String showCalendar(@PathVariable("medicineId")int medicineId, Model model){
        List<CalendarEntity> medicines = new ArrayList<>();
        medicines = calendarRepository.findByMedicineId(medicineId);
        model.addAttribute("data",medicines);
        return "showCalendar";
    }

    @GetMapping("/show/{medicineId}/")
    public String updateCalendar(@PathVariable("medicineId")String medicineId, @RequestParam String name, @RequestParam String medicine, @RequestParam String startdate, @RequestParam String finishdate, @RequestParam String detail1, @RequestParam String detail2, @RequestParam String detail3, @RequestParam String detail4, @RequestParam String detail5, @RequestParam String memo) throws ParseException {
        calendarService.update(name,medicineId,medicine,startdate,finishdate,detail1,detail2,detail3,detail4,detail5,memo);
        return "redirect:/calendar/show/"+medicineId;
    }

    @GetMapping("/delete/{medicineId}")
    public String deleteCalendar(@PathVariable String medicineId) {
        int deleteId = Integer.parseInt(medicineId);
        calendarService.delete(deleteId);
        return "redirect:/calendar/";
    }

}

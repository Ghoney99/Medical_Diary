package com.project.teamproject.controller;

import com.project.teamproject.domain.entity.CalendarEntity;
import com.project.teamproject.domain.entity.NewsEntity;
import com.project.teamproject.domain.entity.UserEntity;
import com.project.teamproject.domain.repository.CalendarRepository;
import com.project.teamproject.domain.repository.UserRepository;
import com.project.teamproject.service.NewsService;
import com.project.teamproject.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Controller
public class MainController {
    private final UserService userService;
    private final UserRepository userRepository;
    private final CalendarRepository calendarRepository;
    private final NewsService newsServiceService;

    @GetMapping("/home")
    public String home(Model model) {
        List<UserEntity> users = new ArrayList<>();
        users = userRepository.findAll();
        List<NewsEntity> newsEntityList = newsServiceService.getNewsList();
        model.addAttribute("newsList", newsEntityList);

        model.addAttribute("users",users);
        return "home";
    }

    @GetMapping("/chat")
    public String chat() { return "chat"; }

    @GetMapping("/pharmacy")
    public String pharmacy() { return "pharmacy"; }

    @GetMapping("/medicineBox")
    public String medicineBox() { return "medicineBox"; }

    @GetMapping("/profile")
    public String profile(Model model) {
        List<UserEntity> users = new ArrayList<>();
        users = userRepository.findAll();

        List<CalendarEntity> medicines = new ArrayList<>();
        medicines = calendarRepository.findAll();

        model.addAttribute("users",users);
        model.addAttribute("medicines",medicines);

        return "profile";
    }

    @GetMapping("/profile/update/")
    public String updateUserName(@RequestParam String id, @RequestParam String name, @RequestParam String newName, Model model){
        userService.update(id,name,newName);
        return "redirect:/profile";
    }
}

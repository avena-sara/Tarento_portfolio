package com.portfolio.demo.controller;

import com.portfolio.demo.model.AboutMe;
import com.portfolio.demo.service.AboutMeService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/about-me")
public class AboutMeController {

    @Autowired
    private AboutMeService aboutMeService;

    @GetMapping
    public List<AboutMe> getAllAboutMeDetails() {
        return aboutMeService.getAllAboutMeDetails();
    }

    @GetMapping("/{id}")
    public AboutMe getAboutMeById(@PathVariable Long id) {
        return aboutMeService.getAboutMeById(id);
    }

    @PostMapping
    public AboutMe createAboutMe(@RequestBody AboutMe aboutMe) {
        return aboutMeService.createAboutMe(aboutMe);
    }

    @PutMapping("/{id}")
    public AboutMe updateAboutMe(@PathVariable Long id, @RequestBody AboutMe aboutMe) {
        return aboutMeService.updateAboutMe(id, aboutMe);
    }

    @DeleteMapping("/{id}")
    public void deleteAboutMe(@PathVariable Long id) {
        aboutMeService.deleteAboutMe(id);
    }
}

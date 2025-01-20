package com.portfolio.demo.controller;

import com.portfolio.demo.model.Education;
import com.portfolio.demo.service.EducationService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/education")
public class EducationController {

    @Autowired
    private EducationService educationService;

    @GetMapping
    public List<Education> getAllEducationDetails() {
        return educationService.getAllEducationDetails();
    }

    @GetMapping("/{id}")
    public Education getEducationById(@PathVariable Long id) {
        return educationService.getEducationById(id);
    }

    @PostMapping
    public Education createEducation(@RequestBody Education education) {
        return educationService.createEducation(education);
    }

    @PutMapping("/{id}")
    public Education updateEducation(@PathVariable Long id, @RequestBody Education education) {
        return educationService.updateEducation(id, education);
    }

    @DeleteMapping("/{id}")
    public void deleteEducation(@PathVariable Long id) {
        educationService.deleteEducation(id);
    }
}

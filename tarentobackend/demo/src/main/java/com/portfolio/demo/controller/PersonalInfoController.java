package com.portfolio.demo.controller;

import com.portfolio.demo.model.PersonalInfo;
import com.portfolio.demo.service.PersonalInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@CrossOrigin(origins = "http://localhost:5173") 
@RestController
@RequestMapping("/api/personal-info")
public class PersonalInfoController {

    @Autowired
    private PersonalInfoService personalInfoService;

    @GetMapping
    public List<PersonalInfo> getAllPersonalInfo() {
        return personalInfoService.getAllPersonalInfo();
    }

    @GetMapping("/{id}")
    public PersonalInfo getPersonalInfoById(@PathVariable Long id) {
        return personalInfoService.getPersonalInfoById(id);
    }

    @PostMapping
    public PersonalInfo createPersonalInfo(@RequestBody PersonalInfo personalInfo) {
        return personalInfoService.createPersonalInfo(personalInfo);
    }

    @PutMapping("/{id}")
    public PersonalInfo updatePersonalInfo(@PathVariable Long id, @RequestBody PersonalInfo personalInfo) {
        return personalInfoService.updatePersonalInfo(id, personalInfo);
    }

    @DeleteMapping("/{id}")
    public void deletePersonalInfo(@PathVariable Long id) {
        personalInfoService.deletePersonalInfo(id);
    }
}

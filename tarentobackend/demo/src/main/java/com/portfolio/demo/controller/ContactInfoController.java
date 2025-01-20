package com.portfolio.demo.controller;

import com.portfolio.demo.model.ContactInfo;
import com.portfolio.demo.service.ContactInfoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/contact-info")
public class ContactInfoController {

    @Autowired
    private ContactInfoService contactInfoService;

    @GetMapping
    public List<ContactInfo> getAllMessages() {
        return contactInfoService.getAllMessages();
    }

    @GetMapping("/{id}")
    public ContactInfo getMessageById(@PathVariable Long id) {
        return contactInfoService.getMessageById(id);
    }

    @PostMapping
    public ContactInfo createMessage(@RequestBody ContactInfo contactInfo) {
        return contactInfoService.createMessage(contactInfo);
    }

    @DeleteMapping("/{id}")
    public void deleteMessage(@PathVariable Long id) {
        contactInfoService.deleteMessage(id);
    }
}

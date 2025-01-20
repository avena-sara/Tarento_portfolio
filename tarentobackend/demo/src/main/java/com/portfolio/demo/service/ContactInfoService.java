package com.portfolio.demo.service;

import com.portfolio.demo.model.ContactInfo;
import com.portfolio.demo.repository.ContactInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ContactInfoService {

    @Autowired
    private ContactInfoRepository contactInfoRepository;

    public List<ContactInfo> getAllMessages() {
        return contactInfoRepository.findAll();
    }

    public ContactInfo getMessageById(Long id) {
        return contactInfoRepository.findById(id).orElse(null);
    }

    public ContactInfo createMessage(ContactInfo contactInfo) {
        return contactInfoRepository.save(contactInfo);
    }

    public void deleteMessage(Long id) {
        contactInfoRepository.deleteById(id);
    }
}

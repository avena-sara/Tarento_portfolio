package com.portfolio.demo.service;

import com.portfolio.demo.model.PersonalInfo;
import com.portfolio.demo.repository.PersonalInfoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;


@Service
public class PersonalInfoService {

    @Autowired
    private PersonalInfoRepository personalInfoRepository;

    public List<PersonalInfo> getAllPersonalInfo() {
        return personalInfoRepository.findAll();
    }

    public PersonalInfo getPersonalInfoById(Long id) {
        return personalInfoRepository.findById(id).orElse(null);
    }

    public PersonalInfo createPersonalInfo(PersonalInfo personalInfo) {
        return personalInfoRepository.save(personalInfo);
    }

    public PersonalInfo updatePersonalInfo(Long id, PersonalInfo personalInfo) {
        if (personalInfoRepository.existsById(id)) {
            personalInfo.setId(id);
            return personalInfoRepository.save(personalInfo);
        }
        return null;
    }

    public void deletePersonalInfo(Long id) {
        personalInfoRepository.deleteById(id);
    }
}

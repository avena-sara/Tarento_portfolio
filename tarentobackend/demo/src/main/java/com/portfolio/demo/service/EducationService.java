package com.portfolio.demo.service;

import com.portfolio.demo.model.Education;
import com.portfolio.demo.repository.EducationRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EducationService {

    @Autowired
    private EducationRepository educationRepository;

    public List<Education> getAllEducationDetails() {
        return educationRepository.findAll();
    }

    public Education getEducationById(Long id) {
        return educationRepository.findById(id).orElse(null);
    }

    public Education createEducation(Education education) {
        return educationRepository.save(education);
    }

    public Education updateEducation(Long id, Education education) {
        if (educationRepository.existsById(id)) {
            education.setId(id);
            return educationRepository.save(education);
        }
        return null;
    }

    public void deleteEducation(Long id) {
        educationRepository.deleteById(id);
    }
}

package com.portfolio.demo.service;

import com.portfolio.demo.model.AboutMe;
import com.portfolio.demo.repository.AboutMeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class AboutMeService {

    @Autowired
    private AboutMeRepository aboutMeRepository;

    public List<AboutMe> getAllAboutMeDetails() {
        return aboutMeRepository.findAll();
    }

    public AboutMe getAboutMeById(Long id) {
        return aboutMeRepository.findById(id).orElse(null);
    }

    public AboutMe createAboutMe(AboutMe aboutMe) {
        return aboutMeRepository.save(aboutMe);
    }

    public AboutMe updateAboutMe(Long id, AboutMe aboutMe) {
        if (aboutMeRepository.existsById(id)) {
            aboutMe.setId(id);
            return aboutMeRepository.save(aboutMe);
        }
        return null;
    }

    public void deleteAboutMe(Long id) {
        aboutMeRepository.deleteById(id);
    }
}

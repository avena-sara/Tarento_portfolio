package com.portfolio.demo.repository;

import com.portfolio.demo.model.PersonalInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PersonalInfoRepository extends JpaRepository<PersonalInfo, Long> {
    // Custom queries can be added here if needed
}

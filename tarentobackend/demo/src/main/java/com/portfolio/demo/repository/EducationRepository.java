package com.portfolio.demo.repository;

import com.portfolio.demo.model.Education;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EducationRepository extends JpaRepository<Education, Long> {
    // Custom queries can be added here if needed
}

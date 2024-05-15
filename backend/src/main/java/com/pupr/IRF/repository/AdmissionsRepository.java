package com.pupr.IRF.repository;
import com.pupr.IRF.model.AdmissionsModel;
import org.springframework.data.jpa.repository.JpaRepository;


public interface AdmissionsRepository extends JpaRepository<AdmissionsModel, Long> {
    // Custom database queries can be defined here
}


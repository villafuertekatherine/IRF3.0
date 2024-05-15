package com.pupr.IRF.repository;

import com.pupr.IRF.model.AdmittedPatientModel;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AdmittedPatientRepository extends JpaRepository<AdmittedPatientModel, Long> {
    // You can add custom database queries here if necessary
}

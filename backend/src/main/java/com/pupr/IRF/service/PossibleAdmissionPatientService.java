package com.pupr.IRF.service;

import com.pupr.IRF.model.PossibleAdmissionPatient;
import com.pupr.IRF.repository.PossibleAdmissionPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PossibleAdmissionPatientService {

    @Autowired
    private PossibleAdmissionPatientRepository repository;

    public PossibleAdmissionPatient savePatient(PossibleAdmissionPatient patient) {
        return repository.save(patient);
    }
}

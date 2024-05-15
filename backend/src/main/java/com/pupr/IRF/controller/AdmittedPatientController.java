package com.pupr.IRF.controller;

import com.pupr.IRF.model.PatientModel;
import com.pupr.IRF.model.AdmittedPatientModel;
import com.pupr.IRF.repository.PatientRepository;
import com.pupr.IRF.repository.AdmittedPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/admitted-patients")
public class AdmittedPatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AdmittedPatientRepository admittedPatientRepository;

    @Transactional
    @PostMapping("/admit/{id}")
    public ResponseEntity<?> admitPatient(@PathVariable Long id) {
        Optional<PatientModel> patientOptional = patientRepository.findById(id);
        if (patientOptional.isPresent()) {
            PatientModel patient = patientOptional.get();

            // Create a new admitted patient model from the existing patient model
            AdmittedPatientModel admittedPatient = new AdmittedPatientModel(patient);
            admittedPatient.setStatus("Admitted"); // Explicitly setting the status to 'Admitted'

            admittedPatientRepository.save(admittedPatient); // Save to admitted patients table
            patientRepository.delete(patient); // Remove from possible patients table

            return ResponseEntity.ok(admittedPatient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

package com.pupr.IRF.controller;

import com.pupr.IRF.model.PossibleAdmissionPatient;
import com.pupr.IRF.service.PossibleAdmissionPatientService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class PossibleAdmissionPatientController {

    @Autowired
    private PossibleAdmissionPatientService patientService;

    @PostMapping("/patients")
    public ResponseEntity<?> addPatient(@RequestBody PossibleAdmissionPatient patient) {
        System.out.println("Received data: " + patient);
        try {
            PossibleAdmissionPatient savedPatient = patientService.savePatient(patient);
            return ResponseEntity.ok(savedPatient);
        } catch (Exception e) {
            return ResponseEntity.status(500).body("Failed to save patient: " + e.getMessage());
        }
    }
}

package com.pupr.IRF.controller;

import com.pupr.IRF.model.PatientModel;
import com.pupr.IRF.model.AdmittedPatientModel;
import com.pupr.IRF.repository.PatientRepository;
import com.pupr.IRF.repository.AdmittedPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api")
public class AdmittedPatientController {

    @Autowired
    private PatientRepository patientRepository;

    @Autowired
    private AdmittedPatientRepository admittedPatientRepository;

    @Transactional
    @PostMapping("/admit-patient/{id}")
    public ResponseEntity<?> admitPatient(@PathVariable Long id, @RequestBody Map<String, String> payload) {
        Optional<PatientModel> patientOptional = patientRepository.findById(id);
        if (patientOptional.isPresent()) {
            PatientModel patient = patientOptional.get();
            AdmittedPatientModel admittedPatient = new AdmittedPatientModel(patient);
            admittedPatient.setStatus("Admitted");

            // Ensure room number is provided
            String roomNumber = payload.get("room_number");
            if (roomNumber == null || roomNumber.isEmpty()) {
                return ResponseEntity.badRequest().body("Room number is required for admission.");
            }
            admittedPatient.setRoomNumber(roomNumber);

            admittedPatientRepository.save(admittedPatient);
            patientRepository.delete(patient);
            return ResponseEntity.ok(admittedPatient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

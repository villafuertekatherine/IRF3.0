package com.pupr.IRF.controller;

import com.pupr.IRF.model.PatientModel;
import com.pupr.IRF.model.AdmittedPatientModel;
import com.pupr.IRF.repository.PatientRepository;
import com.pupr.IRF.repository.AdmittedPatientRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.format.annotation.DateTimeFormat;

import java.time.LocalDate;
import java.util.List;
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

            // Extract room number from payload
            String roomNumber = payload.get("room_number");
            if (roomNumber == null || roomNumber.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Room number is required for admission.");
            }
            admittedPatient.setRoomNumber(roomNumber);

            // Extract admission date from payload, convert it to LocalDate
            String dateString = payload.get("admission_date");
            if (dateString == null || dateString.trim().isEmpty()) {
                return ResponseEntity.badRequest().body("Admission date is required for admission.");
            }
            LocalDate admissionDate = LocalDate.parse(dateString);  // Assumes date is in ISO format (yyyy-MM-dd)
            admittedPatient.setAdmissionDate(admissionDate);

            admittedPatientRepository.save(admittedPatient);
            patientRepository.delete(patient);
            return ResponseEntity.ok(admittedPatient);
        } else {
            return ResponseEntity.notFound().build();
        }
    }
}

package com.pupr.IRF.model;

import jakarta.persistence.*;

@Entity
@Table(name = "possible_patients")  // Specify the table name here
public class PatientModel {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String status;
    private String source;
    private String name;
    private Integer age;
    private String sex;
    private String plan;
    private String dx;
    private String presented;
    private String notes;
    private String mso;
    private String sixtyPercentRule;

    // Standard getters and setters
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }

    public String getSource() {
        return source;
    }

    public void setSource(String source) {
        this.source = source;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public Integer getAge() {  // Getter for age
        return age;
    }

    public void setAge(Integer age) {  // Setter for age
        this.age = age;
    }

    public String getSex() {
        return sex;
    }

    public void setSex(String sex) {
        this.sex = sex;
    }

    public String getPlan() {
        return plan;
    }

    public void setPlan(String plan) {
        this.plan = plan;
    }

    public String getDx() {
        return dx;
    }

    public void setDx(String dx) {
        this.dx = dx;
    }

    public String getPresented() {
        return presented;
    }

    public void setPresented(String presented) {
        this.presented = presented;
    }

    public String getNotes() {
        return notes;
    }

    public void setNotes(String notes) {
        this.notes = notes;
    }

    public String getMso() {
        return mso;
    }

    public void setMso(String mso) {
        this.mso = mso;
    }

    public String getSixtyPercentRule() {
        return sixtyPercentRule;
    }

    public void setSixtyPercentRule(String sixtyPercentRule) {
        this.sixtyPercentRule = sixtyPercentRule;
    }
}


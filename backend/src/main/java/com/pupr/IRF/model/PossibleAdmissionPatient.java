package com.pupr.IRF.model;

import jakarta.persistence.*;

@Entity
@Table(name = "possibleadd_patients")
public class PossibleAdmissionPatient {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "status")
    private String status;

    @Column(name = "source")
    private String source;

    @Column(name = "name")
    private String name;

    @Column(name = "age")
    private int age;

    @Column(name = "sex")
    private char sex;

    @Column(name = "plan")
    private String plan;

    @Column(name = "presented")
    private String presented;

    @Column(name = "notes")
    private String notes;

    @Column(name = "mso")
    private boolean mso;

    @Column(name = "rule60")
    private String rule60;

    @Column(name = "source_other")
    private String sourceOther;

    @Column(name = "plan_other")
    private String planOther;

    // Constructors
    public PossibleAdmissionPatient() {
        // Default constructor required for JPA
    }

    // Getters and setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public String getSource() { return source; }
    public void setSource(String source) { this.source = source; }

    public String getName() { return name; }
    public void setName(String name) { this.name = name; }

    public int getAge() { return age; }
    public void setAge(int age) { this.age = age; }

    public char getSex() { return sex; }
    public void setSex(char sex) { this.sex = sex; }

    public String getPlan() { return plan; }
    public void setPlan(String plan) { this.plan = plan; }

    public String getPresented() { return presented; }
    public void setPresented(String presented) { this.presented = presented; }

    public String getNotes() { return notes; }
    public void setNotes(String notes) { this.notes = notes; }

    public boolean isMso() { return mso; }
    public void setMso(boolean mso) { this.mso = mso; }

    public String getRule60() { return rule60; }
    public void setRule60(String rule60) { this.rule60 = rule60; }

    public String getSourceOther() { return sourceOther; }
    public void setSourceOther(String sourceOther) { this.sourceOther = sourceOther; }

    public String getPlanOther() { return planOther; }
    public void setPlanOther(String planOther) { this.planOther = planOther; }
}

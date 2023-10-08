package com.example.Assignmentbackend.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.index.Indexed;
import org.springframework.data.mongodb.core.mapping.*;

import jakarta.validation.constraints.*;

@Document("students")
public class Student {
	
	@Id
	private String id;
	
	@Indexed(unique = true)
	private String student_id;
	
	@NotNull(message = "Name is mandatory")
	private String name;
	
	@NotNull(message = "Date of birth is mandatory")
	private String dob;
	
	@NotNull(message = "Class is mandatory")
	private String Student_Class;
	
	@NotNull(message = "Division is mandatory")
	private String Division;
	
	@NotNull(message = "Gender is mandatory")
	private String gender;
	
	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getStudent_id() {
		return student_id;
	}

	public void setStudent_id(String student_id) {
		this.student_id = student_id;
	}

	public String getName() {
		return name;
	}

	public void setName(String name) {
		this.name = name;
	}

	public String getDob() {
		return dob;
	}

	public void setDob(String dob) {
		this.dob = dob;
	}


	public String getStudent_Class() {
		return Student_Class;
	}

	public void setStudent_Class(String student_Class) {
		Student_Class = student_Class;
	}

	public String getDivision() {
		return Division;
	}

	public void setDivision(String division) {
		Division = division;
	}

	public String getGender() {
		return gender;
	}

	public void setGender(String gender) {
		this.gender = gender;
	}
	
}

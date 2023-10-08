package com.example.Assignmentbackend.Service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.domain.Sort;
import org.springframework.stereotype.Service;

import com.example.Assignmentbackend.model.Student;
import com.example.Assignmentbackend.repository.StudentRepository;

@Service
public class StudentServiceClass {
	
	@Autowired
	private StudentRepository repo;
	
    public String getLastAdmissionNumber() {
        Sort sort = Sort.by(Sort.Direction.DESC, "admissionNumber");
        List<Student> students = repo.findAll(sort);

        if (!students.isEmpty()) {
            return students.get(0).getStudent_id();
        } else {
            return null; // Handle the case when there are no documents in the collection
        }
    }
}

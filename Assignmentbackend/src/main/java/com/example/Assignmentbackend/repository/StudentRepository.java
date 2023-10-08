package com.example.Assignmentbackend.repository;

import java.util.List;

import org.springframework.data.domain.Sort;
import org.springframework.data.mongodb.repository.MongoRepository;

import com.example.Assignmentbackend.model.Student;

public interface StudentRepository extends MongoRepository<Student,String>{
	Student findByName(String name);
	
	// Find all students and sort them by name in ascending order
    List<Student> findAllBy(Sort sort);
    

}

package com.example.Assignmentbackend.controller;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.stream.Collectors;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.BindingResult;
import org.springframework.validation.FieldError;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import com.example.Assignmentbackend.Service.StudentServiceClass;
import com.example.Assignmentbackend.model.Student;
import com.example.Assignmentbackend.repository.StudentRepository;

@CrossOrigin
@RestController
@RequestMapping("/student")
public class StudentController {
	
	@Autowired
	private StudentRepository stdrepo;
	
	@Autowired
	private StudentServiceClass service;
	
	
    @PostMapping("create")
    public ResponseEntity<Object> create(@RequestBody @Validated Student std,BindingResult bindingResult){
    	if (bindingResult.hasErrors()) {
    		Map<String, Object> errorsMap = new HashMap<>();
            errorsMap.put("message", "Validation error");
            errorsMap.put("status", HttpStatus.BAD_REQUEST.value());

            List<String> errors = bindingResult.getFieldErrors()
                    .stream()
                    .map(FieldError::getDefaultMessage)
                    .collect(Collectors.toList());

            errorsMap.put("errors", errors);
            return new ResponseEntity<>(errorsMap, HttpStatus.BAD_REQUEST);
        }
    	Student existingStudent = stdrepo.findByName(std.getName());
        if (existingStudent != null) {
            Map<String, Object> errorMap = new HashMap<>();
            errorMap.put("message", "Student with the same name already exists");
            errorMap.put("status", HttpStatus.BAD_REQUEST.value());
            return new ResponseEntity<>(errorMap, HttpStatus.BAD_REQUEST);
        }
    	Student newdata = new Student();
    	newdata.setName(std.getName());
    	newdata.setDob(std.getDob());
    	newdata.setStudent_Class(std.getStudent_Class());
    	newdata.setDivision(std.getDivision());
    	newdata.setGender(std.getGender());
    	int id = Integer.parseInt(getLastNumber());
    	newdata.setStudent_id("R-00"+Integer.toString(id+1));
        Student saveddata =  stdrepo.save(newdata);
        return new ResponseEntity<>(saveddata, HttpStatus.CREATED);
    }
    
    @GetMapping("getAllStudents")
    public List<Student> getAllStudents() {
        return stdrepo.findAll();
    }
    
    
    public String getLastNumber() {
    	String num = service.getLastAdmissionNumber();
    	
    	if(num == null) {
    		return "0";
    	}
    	num = num.substring(num.length() - 1);
    	return num;
    }
    
}

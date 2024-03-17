import React, { useState, useEffect } from 'react';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableSortAndSelection from '../../components/tables/SortTable';
import axios from 'axios';
import bcrypt from 'bcryptjs';

const PatientPage = () => {
  const [patients, setPatients] = useState([]); // State to store patient data

  useEffect(() => {
    // Fetch all patients when the component mounts
    const fetchPatients = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/user');
        console.log(response.data, 'response.data');
        setPatients(response.data);
      } catch (error) {
        console.error('Error fetching patients:', error);
      }
    };

    fetchPatients();
  }, []);

  const handleRemove = async (userId) => {
    // Logic to handle removing the patient
    try {
      await axios.delete(`http://localhost:8080/api/user/${userId}`);
      const updatedPatients = patients.filter((patient) => patient.patientId !== userId);
      setPatients(updatedPatients);
      console.log(`Removed patient with ID: ${userId}`);
    } catch (error) {
      console.error('Error removing patient:', error);
    }
  };

  const handleAddPatient = async () => {
    try {
      const password = '********'; 
      const hashedPassword = await bcrypt.hash(password, 10);

      const response = await axios.post('http://localhost:8080/api/user', {
        name: 'John Doe',
        email: 'john.doe@example.com',
        password: hashedPassword, 
        username: 'johndoe',
        mobileNumber: '1234567890',
        createdBy: 'Admin',
        createdDate: new Date().toLocaleDateString(),
      });
      const newPatient = response.data;
      setPatients((prevPatients) => [...prevPatients, newPatient]);
      console.log('Added new patient:', newPatient);
    } catch (error) {
      console.error('Error adding patient:', error);
    }
  };

  const headCells = [
    { id: 'userId', numeric: false, disablePadding: true, label: 'Patient ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'password', numeric: false, disablePadding: false, label: 'Password' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'mobileNumber', numeric: false, disablePadding: false, label: 'Mobile Number' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];

  const rowsPerPageOptions = [5, 10, 25];

  const data = patients.map((patient) => ({
    ...patient,
    actions: (
      <IconButton
        color="secondary"
        onClick={() => handleRemove(patient.patientId)}
      >
        <DeleteIcon />
      </IconButton>
    ),
  }));

  return (
    <div>
      <Button variant="contained" onClick={handleAddPatient} className="addPatientButton">
        Add Patient
      </Button>

      <TableSortAndSelection
        data={data}
        headCells={headCells}
        title="Patient Details"
        initialOrder="asc"
        initialOrderBy="patientId"
        rowsPerPageOptions={rowsPerPageOptions}
        densePadding={true}
      />
    </div>
  );
};

export default PatientPage;

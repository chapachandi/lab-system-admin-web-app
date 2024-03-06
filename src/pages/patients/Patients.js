import React, { useState } from 'react';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableSortAndSelection from '../../components/tables/SortTable';

const PatientPage = () => {
  const [patients, setPatients] = useState([]); // State to store patient data
  const [nextPatientId, setNextPatientId] = useState(1);

  const handleRemove = (patientId) => {
    // Logic to handle removing the patient
    const updatedPatients = patients.filter((patient) => patient.patientId !== patientId);
    setPatients(updatedPatients);

    console.log(`Removed patient with ID: ${patientId}`);
  };

  const headCells = [
    { id: 'patientId', numeric: false, disablePadding: true, label: 'Patient ID' },
    { id: 'name', numeric: false, disablePadding: false, label: 'Name' },
    { id: 'email', numeric: false, disablePadding: false, label: 'Email' },
    { id: 'password', numeric: false, disablePadding: false, label: 'Password' },
    { id: 'username', numeric: false, disablePadding: false, label: 'Username' },
    { id: 'mobileNumber', numeric: false, disablePadding: false, label: 'Mobile Number' },
    { id: 'createdBy', numeric: false, disablePadding: false, label: 'Created By' },
    { id: 'createdDate', numeric: false, disablePadding: false, label: 'Created Date' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];

  const rowsPerPageOptions = [5, 10, 25];

  const handleAddPatient = () => {
    // Logic to handle adding a new patient
    const newPatient = {
      patientId: `Patient${nextPatientId}`,
      name: 'John Doe', // Replace with actual name
      email: 'john.doe@example.com', // Replace with actual email
      password: '********', // Password is not visible to admin
      username: 'johndoe', // Replace with actual username
      mobileNumber: '1234567890', // Replace with actual mobile number
      createdBy: 'Admin', // Replace with actual admin username
      createdDate: new Date().toLocaleDateString(), // Use the current date
    };

    setPatients((prevPatients) => [...prevPatients, newPatient]);
    setNextPatientId(nextPatientId + 1);

    console.log('Added new patient:', newPatient);
  };

  const data = patients.map((patient) => ({
    ...patient,
    actions: (
      <>
        <IconButton
          color="secondary"
          onClick={() => handleRemove(patient.patientId)}
        >
          <DeleteIcon />
        </IconButton>
      </>
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

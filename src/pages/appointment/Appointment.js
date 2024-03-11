import React, { useState } from 'react';
import { Button } from '@mui/material';
import TableSortAndSelection from '../../components/tables/SortTable'

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]); // State to store appointment data
  const [nextAppointmentNumber, setNextAppointmentNumber] = useState(1);

  const handleAccept = () => {
    // Logic to handle accepting the appointment and auto-generate appointment number
    const newAppointment = {
      patientId: 'Patient123', // Replace with actual patient ID
      date: '2024-02-28', // Replace with actual date
      time: '10:00 AM', // Replace with actual time
      appointmentNumber: nextAppointmentNumber,
    };

    setAppointments((prevAppointments) => [...prevAppointments, newAppointment]);
    setNextAppointmentNumber(nextAppointmentNumber + 1);

    console.log('Accepted appointment:', newAppointment);
  };

  const handleReject = (appointmentNumber) => {
    // Logic to handle rejecting the appointment
    console.log(`Rejected appointment ${appointmentNumber}`);
  };

  const headCells = [
    { id: 'patientId', numeric: false, disablePadding: true, label: 'Patient ID' },
    { id: 'date', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'time', numeric: false, disablePadding: false, label: 'Time' },
    { id: 'test', numeric: false, disablePadding: false, label: 'Test' },
    { id: 'appointmentNumber', numeric: false, disablePadding: false, label: 'Appointment Number' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];

  const rowsPerPageOptions = [5, 10, 25];

  const data = appointments.map((appointment) => ({
    ...appointment,
    actions: (
      <>
        <Button
          variant="contained"
          color="primary"
          onClick={() => handleAccept(appointment.appointmentNumber)}
        >
          Accept
        </Button>
        <Button
          variant="contained"
          color="secondary"
          onClick={() => handleReject(appointment.appointmentNumber)}
        >
          Reject
        </Button>
      </>
    ),
  }));

  return (
    <div>
      <TableSortAndSelection
        data={data}
        headCells={headCells}
        title="Appointment Details"
        initialOrder="asc"
        initialOrderBy="dateTime"
        rowsPerPageOptions={rowsPerPageOptions}
        densePadding={true}
      />
    </div>
  );
};

export default AppointmentPage;

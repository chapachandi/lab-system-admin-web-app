import React, { useState, useEffect } from 'react';
import { Button } from '@mui/material';
import TableSortAndSelection from '../../components/tables/SortTable';
import axios from 'axios';

const AppointmentPage = () => {
  const [appointments, setAppointments] = useState([]); // State to store appointment data
  const [tests, setTests] = useState([]); // State to store test data
  const [timeSlots, setTimeSlots] = useState([]); // State to store time slot data

  useEffect(() => {
    // Fetch appointments data when the component mounts
    const fetchAppointments = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservations');
        setAppointments(response.data);
      } catch (error) {
        console.error('Error fetching appointments:', error);
      }
    };

    // Fetch all tests
    const fetchTests = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/test/getAll');
        setTests(response.data);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

  
    const testId = "1";
    const reservingDate = "2024-04-01"; 
  
    const fetchTimeSlots = async () => {
      console.log('Before fetching time slots');
      try {
        const response = await axios.post('http://localhost:8080/api/timeslot/getAvailableTimeSlot', {
          testId,
          reservingDate,
        });
        const data = response.data;
        console.log(data);
        setTimeSlots(data);
      } catch (error) {
        console.error('Error fetching time slots:', error);
      }
      console.log('After fetching time slots');
    };
  
    fetchTimeSlots();
  

    fetchAppointments();
    fetchTests();
    fetchTimeSlots();
  }, []);

  const handleAccept = (appointmentNumber) => {
    // Logic to handle accepting the appointment and auto-generate appointment number
    console.log('Accepted appointment:', appointmentNumber);
  };

  const handleReject = (appointmentNumber) => {
    // Logic to handle rejecting the appointment
    console.log(`Rejected appointment ${appointmentNumber}`);
  };

  const headCells = [
    { id: 'reservationId', numeric: false, disablePadding: true, label: 'Reservation Id' },
    { id: 'reservationDate', numeric: false, disablePadding: false, label: 'Date' },
    { id: 'displayText', numeric: false, disablePadding: false, label: 'Time Slot' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Text' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];

  const transformedAppointments = appointments.map((appointment, index) => {
    const timeSlot = timeSlots.find((slot) => slot.timeSlotId === appointment.timeSlotId);
    const displayText = timeSlot ? timeSlot.displayText : '';
    const test = tests.find((test) => test.testId === appointment.testId);
    const testName = test ? test.testName : '';
    const actions = (
      <>
        <Button
          key={`accept-${index}`}
          variant="contained"
          color="primary"
          onClick={() => handleAccept(appointment.appointmentNumber)}
          style={{ backgroundColor: '#14a3c7', marginRight: '8px', marginBottom: '8px', fontSize: 'small' }}
        >
          Accept
        </Button>
        <Button
          key={`reject-${index}`}
          variant="contained"
          color="secondary"
          style={{ backgroundColor: '#d93535', marginBottom: '8px', fontSize: 'small' }}
          onClick={() => handleReject(appointment.appointmentNumber)}
        >
          Reject
        </Button>
      </>
    );
    return { ...appointment, displayText, testName, actions };
  });
  

  const rowsPerPageOptions = [5, 10, 25];

  // const data = transformedAppointments.map((appointment, index) => ({
  //   ...appointment,
  //   actions: (
  //     <>
  //       <Button
  //         key={`accept-${index}`}
  //         variant="contained"
  //         color="primary"
  //         onClick={() => handleAccept(appointment.appointmentNumber)}
  //       >
  //         Accept
  //       </Button>
  //       <Button
  //         key={`reject-${index}`}
  //         variant="contained"
  //         color="secondary"
  //         onClick={() => handleReject(appointment.appointmentNumber)}
  //       >
  //         Reject
  //       </Button>
  //     </>
  //   ),
  // }));

  return (
    <div>
      <TableSortAndSelection
        data={transformedAppointments}
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

import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import TableSortAndSelection from '../../components/tables/SortTable';
import axios from 'axios';

const ReportPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [nextAppointmentNumber, setNextAppointmentNumber] = useState(1);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [testParameters, setTestParameters] = useState([]);
  const [tableData, setTableData] = useState([]);

  console.log(appointments, 'appointments');

  useEffect(() => {
    fetchAppointments();
  }, []);

  const fetchAppointments = async () => {
    try {
      const response = await axios.get('http://localhost:8080/api/reservations');
      setAppointments(response.data);

      // Create table data with "Add" button
      const newData = response.data.map((appointment) => ({
        ...appointment,
        actions: (
          <Button
            variant="contained"
            color="primary"
            onClick={() => handleAddReport(appointment.appointmentNumber, appointment.testId)}
          >
            Add
          </Button>
        ),
      }));
      setTableData(newData);
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleAddReport = async (appointmentNumber, testId) => {
    const selected = appointments.find((appointment) => appointment.appointmentNumber === appointmentNumber);

    try {
      // Make an API call to get test parameters
      const response = await axios.get(`http://localhost:8080/api/test/testParameter/${testId}`);
      setTestParameters(response.data);
    } catch (error) {
      console.error('Error fetching test parameters:', error);
    }

    setSelectedAppointment(selected);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setSelectedAppointment(null);
    setTestParameters([]);
  };

  const handleSaveReportPopup = async () => {
    try {
      const dataToSend = {
        resultData: 'Your Result Data',
      };

      const response = await axios.post('http://localhost:8080/api/finalResult', dataToSend);
  
      console.log('API Response:', response.data);
  
      
      setPopupOpen(false);
      setSelectedAppointment(null);
      setTestParameters([]);
    } catch (error) {
      console.error('Error saving final result:', error);
    }
  };

  const headCells = [
    { id: 'reservationId', numeric: false, disablePadding: true, label: 'Appointment Number' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'reservationDate', numeric: false, disablePadding: false, label: 'Reservation Date' },
    { id: 'timeSlotId', numeric: false, disablePadding: false, label: 'Time' },
    { id: 'testId', numeric: false, disablePadding: false, label: 'Test' },
    { id: 'report', numeric: false, disablePadding: false, label: 'Fill Report Data' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Actions' },
  ];

  const rowsPerPageOptions = [5, 10, 25];

  return (
    <div>
      <TableSortAndSelection
        data={tableData}
        headCells={headCells}
        title="Patient Report Details"
        initialOrder="asc"
        initialOrderBy="dateTime"
        rowsPerPageOptions={rowsPerPageOptions}
        densePadding={true}
      />

      <Dialog open={isPopupOpen} onClose={handlePopupClose} className="popup">
        <DialogTitle>Add Test Parameters</DialogTitle>
        <DialogContent>
          {testParameters.map((parameter) => (
            <TextField
              margin="normal"
              key={parameter.testParameterId}
              label={parameter.testName}
              variant="outlined"
              fullWidth
              // Add value and onChange props as needed
            />
          ))}
        </DialogContent>
        <DialogActions>
          <Button onClick={handlePopupClose}>Cancel</Button>
          <Button onClick={handleSaveReportPopup} variant="contained" color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default ReportPage;

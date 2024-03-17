import React, { useState, useEffect } from 'react';
import { Button, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import TableSortAndSelection from '../../components/tables/SortTable';
import axios from 'axios';

const ReportPage = () => {
  const [appointments, setAppointments] = useState([]);
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [testParameters, setTestParameters] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [parameterValues, setParameterValues] = useState({});
  const [reservationId, setReservationId] = useState('');

  
  useEffect(() => {
    console.log(appointments, 'appointments444');
  
  }, [appointments]);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8080/api/reservations');
        setAppointments(response.data);
        console.log(appointments,'appointments5555')
        console.log(response.data,'response.data')
  
        // Logging after setting state
        console.log('Appointments after setting state:', appointments);
  
        // Create table data with "Add" button
        const newData = response.data.map((appointment) => ({
          ...appointment,
          actions: (
            <Button
              variant="contained"
              color="primary"
              style={{ backgroundColor: '#14a3c7', marginRight: '8px', marginBottom: '8px', fontSize: 'small' }}
              onClick={() => handleAddReport(appointment.reservationId, appointment.testId)}
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
    console.log(appointments,'appointments/wwww')
    fetchData();
  }, []);
  
  const handleAddReport = async (reservationId, testId) => {
    console.log(appointments,'appointments2');
    setReservationId(reservationId)
    const selected = appointments.map((appointment) => {
      console.log(appointment,'..........................');
    });
    console.log(reservationId, testId,'appointmentNumber, testId')

    try {
      const response = await axios.get(`http://localhost:8080/api/test/testParameter/${testId}`);
      setTestParameters(response.data);
    } catch (error) {
      console.error('Error fetching test parameters:', error);
    }
    console.log(selected,'selected');

    setSelectedAppointment(selected);
    setPopupOpen(true);
  };

  const handlePopupClose = () => {
    setPopupOpen(false);
    setSelectedAppointment(null);
    setTestParameters([]);
    setParameterValues({});
  };

  const handleSaveReportPopup = async () => {
    console.log( parameterValues,'-----')
    try {
      if (!selectedAppointment) {
        console.error('Selected appointment is undefined.');
        return;
      }
      console.log(appointments,'..........................');
      console.log(reservationId,'*************************');
      const parameterDataDTOList = testParameters.map((parameter) => ({
        description: parameterValues[parameter.testParameterId] || '',
        testParameterId: parameter.testParameterId,
      }));
  
      const dataToSend = {
        description: selectedAppointment.description || '',
        reservationId: reservationId || '',
        prameterDataDTOList: parameterDataDTOList,
      };
  
      const response = await axios.post('http://localhost:8080/api/finalResult', dataToSend);
  
      console.log('API Response:', response.data);
  
      setPopupOpen(false);
      setSelectedAppointment(null);
      setTestParameters([]);
      setParameterValues({});
    } catch (error) {
      console.error('Error saving final result:', error);
    }
  };

  const handleParameterValueChange = (testParameterId, value) => {
    setParameterValues((prevValues) => ({
      ...prevValues,
      [testParameterId]: value,
    }));
  };

  const headCells = [
    { id: 'reservationId', numeric: false, disablePadding: true, label: 'Appointment Number' },
    { id: 'description', numeric: false, disablePadding: false, label: 'Description' },
    { id: 'reservationDate', numeric: false, disablePadding: false, label: 'Reservation Date' },
    { id: 'actions', numeric: false, disablePadding: false, label: 'Fill Report Data' },
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
              key={parameter.testParameterId}
              margin="normal"
              label={parameter.testName}
              variant="outlined"
              fullWidth
              value={parameterValues[parameter.testParameterId] || ''}
              onChange={(e) => handleParameterValueChange(parameter.testParameterId, e.target.value)}
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

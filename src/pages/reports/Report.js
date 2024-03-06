import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import './style.css'; // Import the CSS file

const ReportPage = () => {
  const [reportData, setReportData] = useState({
    patientId: '',
    patientName: '',
    testedDate: '',
    appointmentNumber: '',
    reportFile: null,
  });

  const [errors, setErrors] = useState({});

  const handleSave = () => {
    // Validate required fields
    const validationErrors = {};
    const requiredFields = ['patientId', 'patientName', 'testedDate', 'appointmentNumber', 'reportFile'];

    requiredFields.forEach((field) => {
      if (!reportData[field]) {
        validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    // Here you can save the report data
    console.log('Report data saved:', reportData);

    // Reset form after saving
    setReportData({
      patientId: '',
      patientName: '',
      testedDate: '',
      appointmentNumber: '',
      reportFile: null,
    });

    setErrors({});
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];

    // Check if the file is a PDF
    if (file && file.type === 'application/pdf') {
      setReportData({ ...reportData, reportFile: file });
      setErrors({ ...errors, reportFile: null });
    } else {
      setErrors({ ...errors, reportFile: 'Please upload a valid PDF file.' });
    }
  };

  return (
    <div className="">
      <h1>Report Page</h1>

      <div className="user-form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <label>
              Patient ID:
              <input
                type="text"
                value={reportData.patientId}
                onChange={(e) => setReportData({ ...reportData, patientId: e.target.value })}
              />
              {errors.patientId && <span className="error">{errors.patientId}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Patient Name:
              <input
                type="text"
                value={reportData.patientName}
                onChange={(e) => setReportData({ ...reportData, patientName: e.target.value })}
              />
              {errors.patientName && <span className="error">{errors.patientName}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Tested Date:
              <input
                type="date"
                value={reportData.testedDate}
                onChange={(e) => setReportData({ ...reportData, testedDate: e.target.value })}
              />
              {errors.testedDate && <span className="error">{errors.testedDate}</span>}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Appointment Number:
              <input
                type="text"
                value={reportData.appointmentNumber}
                onChange={(e) => setReportData({ ...reportData, appointmentNumber: e.target.value })}
              />
              {errors.appointmentNumber && (
                <span className="error">{errors.appointmentNumber}</span>
              )}
            </label>
          </Grid>

          <Grid item xs={12} sm={4}>
            <label>
              Upload Report (PDF only):
              <input
                type="file"
                accept="application/pdf"
                onChange={handleFileChange}
              />
              {errors.reportFile && <span className="error">{errors.reportFile}</span>}
            </label>
          </Grid>

          <Grid item xs={12}>
            <button onClick={handleSave}>Save</button>
          </Grid>
        </Grid>
      </div>
    </div>
  );
};

export default ReportPage;

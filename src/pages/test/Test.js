import React, { useState } from 'react';
import Grid from '@mui/material/Grid';
import { Button, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import TableSortAndSelection from '../../components/tables/SortTable'; // Make sure to provide the correct path to EnhancedTable
import './style.css'; // Import the CSS file

const TestPage = () => {
    const [testData, setTestData] = useState({
        testName: '',
        price: '',
        testDetails: [], // Initialize testDetails as an empty array
      });
  const [errors, setErrors] = useState({});

  const handleSave = () => {
    // Validate required fields
    const validationErrors = {};
    const requiredFields = ['testName', 'price'];
  
    requiredFields.forEach((field) => {
      if (!testData[field]) {
        validationErrors[field] = `${field.charAt(0).toUpperCase() + field.slice(1)} is required.`;
      }
    });
  
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
  
    // Add the new test detail to the list
    const newTestDetail = { testName: testData.testName, price: testData.price };
  
    setTestData((prevTestData) => ({
      ...prevTestData,
      testDetails: [...prevTestData.testDetails, newTestDetail],
      testName: '', // Reset the input fields
      price: '',   // Reset the input fields
    }));
  };
  
  const removeTestDetail = (index) => {
    const updatedDetails = [...testData.testDetails];
    updatedDetails.splice(index, 1);
    setTestData({ ...testData, testDetails: updatedDetails });
  };

  const headCells = [
    { id: 'testName', numeric: false, disablePadding: false, label: 'Test Name' },
    { id: 'price', numeric: true, disablePadding: false, label: 'Price' },
    { id: 'action', numeric: false, disablePadding: false, label: 'Action' },
  ];

  const rows = testData.testDetails.map((detail, index) => ({
    id: index,
    testName: detail.testName,
    price: detail.price,
    action: (
        <IconButton
            color="primary"
            onClick={() => removeTestDetail(index)}
            style={{ width: "30px", backgroundColor: "white" }}
        >
            <DeleteIcon   color="primary"/>
        </IconButton>
    ),
  }));

  return (
    <div className="">
      <h1>Test Page</h1>

      <div className="user-form">
        <Grid container spacing={2}>
          <Grid item xs={12} sm={4}>
            <label>
              Test Name:
              <input
                type="text"
                value={testData.testName}
                onChange={(e) => setTestData({ ...testData, testName: e.target.value })}
              />
              {errors.testName && <span className="error">{errors.testName}</span>}
            </label>
          </Grid>
          <Grid item xs={12} sm={4}>
            <label>
              Price:
              <input
                type="text"
                value={testData.price}
                onChange={(e) => setTestData({ ...testData, price: e.target.value })}
              />
              {errors.price && <span className="error">{errors.price}</span>}
            </label>
          </Grid>
          <Grid item xs={12} sm={4}></Grid>
        </Grid>
        <Grid item xs={12}>
          <Button  variant="contained" color="primary" onClick={handleSave}>ADD</Button>
        </Grid>
        
         {/* Display the added test details */}
         <Grid item xs={12}>
          <TableSortAndSelection
            data={rows}
            headCells={headCells}
            title="Test Details"
            initialOrderBy="testName"
            rowsPerPageOptions={[5, 10, 25]}
            densePadding={true}
          />
        </Grid>

      </div>
    </div>
  );
};

export default TestPage;

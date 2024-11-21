import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Grid,
  Alert,
  Snackbar,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import axios from "axios";

const CreateTransaction = () => {
  const [amount, setAmount] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("success");
  const transactionType = [
    { _id: 1, name: "DEPOSIT" },
    { _id: 2, name: "WITHDRAWAL" },
  ];
  const [selectedTransactionType, setSelectedTransactionType] = useState("");

  const handleTransactionTypeChange = (e) => {
    setSelectedTransactionType(e.target.value);
  };

  const handleChange = (e) => {
    setAmount(e.target.value);
  };

  const handleMakeTransaction = async () => {
    if (amount === "" || selectedTransactionType === "") {
      setMessage("Please fill all the fields.");
      setAlertType("error");
      setOpenSnackbar(true);
      return;
    }
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        `${process.env.REACT_APP_API_URL}/api/transactions/`,
        {
          amount: parseFloat(amount),
          transaction_type: selectedTransactionType,
          user: parseInt(localStorage.getItem("userId")),
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setMessage(response.data.message);
      setAlertType("success");
      setOpenSnackbar(true);
    } catch (error) {
      console.error("Error fetching jobs:", error);
      setMessage("Transaction creation failed.");
      setAlertType("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <Box
      sx={{
        width: "80%",
        margin: "auto",
        padding: 5,
        borderRadius: 2,
        boxShadow: 3,
        backgroundColor: "#fff",
      }}
    >
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={() => setOpenSnackbar(false)}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setOpenSnackbar(false)}
          severity={alertType}
          sx={{ width: "100%" }}
        >
          {message}
        </Alert>
      </Snackbar>
      <Typography variant="h5" gutterBottom sx={{ marginBottom: "30px" }}>
        Create a Transaction
      </Typography>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Amount"
            name="amount"
            value={amount}
            onChange={handleChange}
            required
          />
        </Grid>
      </Grid>
      <Box alignItems="center" mb={3}>
        <FormControl fullWidth variant="outlined" margin="normal" required>
          <InputLabel id="transactionType-select-label">
            Select transaction type
          </InputLabel>
          <Select
            labelId="transactionType-select-label"
            value={selectedTransactionType}
            onChange={handleTransactionTypeChange}
            label="transactionType"
          >
            {transactionType.map((transaction) => (
              <MenuItem key={transaction._id} value={transaction.name}>
                {transaction.name}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Box sx={{ textAlign: "center" }}>
        <Button variant="contained" onClick={handleMakeTransaction}>
          Make transaction
        </Button>
      </Box>
    </Box>
  );
};

export default CreateTransaction;

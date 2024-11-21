import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  Box,
  Button,
  Typography,
  CircularProgress,
  Modal,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Snackbar,
  Alert,
  Table,
  TableCell,
  TableBody,
  TableRow,
  TableContainer,
  Paper,
  TableHead,
  TablePagination,
} from "@mui/material";
import axios from "axios";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 300,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
  display: "flex",
  flexDirection: "column",
};

const AllTransactions = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [open, setOpen] = React.useState(null);
  const handleClose = () => setOpen(null);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [page, setPage] = useState(0);
  const [selectedTransaction, setSelectedTransaction] = useState([]);
  const statusType = [
    { _id: 1, name: "COMPLETED" },
    { _id: 2, name: "FAILED" },
  ];
  const [selectedStatusType, setSelectedStatusType] = useState("");
  const [message, setMessage] = useState("");
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [alertType, setAlertType] = useState("success");

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleStatusTypeChange = (e) => {
    setSelectedStatusType(e.target.value);
  };

  const handleUpdateClick = (x) => {
    setOpen(true);
    setSelectedTransaction(x);
  };

  const handleUpdateStatus = async (id) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.put(
        `${process.env.REACT_APP_API_URL}/api/transactions/${id}/`,
        {
          status: selectedStatusType,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log("Up", response);
      setOpen(false);
      setMessage(response.data.message);
      setAlertType("success");
      setOpenSnackbar(true);
      setTimeout(() => {
        window.location.reload();
      }, 300);
    } catch (error) {
      console.error("Error updating transaction status:", error);
      setMessage("Error occured while updating transaction status.");
      setAlertType("error");
      setOpenSnackbar(true);
    }
  };

  useEffect(() => {
    const fetchUserTransactions = async () => {
      const id = parseInt(localStorage.getItem("userId"));
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/transactions/?user_id=${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        console.log("YES", response);
        setTransactions(response.data.transactions);
        setMessage(response.data.message);
        setAlertType("success");
        setOpenSnackbar(true);
      } catch (error) {
        console.error("Error fetching jobs:", error);
        setMessage("An error occured while fetching transactions.");
        setAlertType("error");
        setOpenSnackbar(true);
      } finally {
        setLoading(false);
      }
    };

    fetchUserTransactions();
  }, []);

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="100vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      {transactions.length !== 0 && (
        <>
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
          <Modal
            open={open === true}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box sx={style}>
              <Typography
                variant="h6"
                sx={{ textAlign: "center", fontWeight: "600" }}
              >
                Transaction
              </Typography>
              <Typography sx={{ marginTop: "20px" }}>
                <span style={{ fontWeight: "600", fontSize: "18px" }}>
                  Transaction id :
                </span>{" "}
                {selectedTransaction.id}
              </Typography>
              <Typography sx={{ marginTop: "20px" }}>
                <span style={{ fontWeight: "600", fontSize: "18px" }}>
                  Amount :
                </span>{" "}
                {selectedTransaction.amount}
              </Typography>
              <Typography sx={{ marginTop: "20px" }}>
                <span style={{ fontWeight: "600", fontSize: "18px" }}>
                  Transaction type :
                </span>{" "}
                {selectedTransaction.transaction_type}
              </Typography>

              <Box display="flex" alignItems="center" mb={2}>
                <FormControl
                  fullWidth
                  variant="outlined"
                  margin="normal"
                  required
                >
                  <InputLabel id="statusType-select-label">
                    Select transaction status
                  </InputLabel>
                  <Select
                    labelId="statusType-select-label"
                    value={selectedStatusType}
                    onChange={handleStatusTypeChange}
                    label="statusType"
                  >
                    {statusType.map((status) => (
                      <MenuItem key={status._id} value={status.name}>
                        {status.name}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>
              <Button
                variant="contained"
                onClick={() => handleUpdateStatus(selectedTransaction.id)}
              >
                Update Status
              </Button>
            </Box>
          </Modal>
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow sx={{ backgroundColor: "green" }}>
                  <TableCell sx={{ color: "white" }} align="center">
                    Transaction id
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Amount
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Transaction Type
                  </TableCell>
                  <TableCell sx={{ color: "white" }} align="center">
                    Status
                  </TableCell>

                  <TableCell sx={{ color: "white" }} align="center">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>

              <TableBody>
                {transactions
                  .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                  .map((transaction) => (
                    <TableRow key={transaction.id}>
                      <TableCell align="center">{transaction.id}</TableCell>
                      <TableCell align="center">{transaction.amount}</TableCell>
                      <TableCell align="center">
                        {transaction.transaction_type}
                      </TableCell>

                      <TableCell align="center">{transaction.status}</TableCell>

                      <TableCell align="center">
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "center",
                            gap: 1,
                          }}
                        >
                          <Link
                            to={`/user-dashboard/transaction-details/${transaction.id}`}
                            style={{ textDecoration: "none" }}
                          >
                            <Button variant="contained" color="success">
                              View
                            </Button>
                          </Link>
                          <Button
                            variant="contained"
                            color="success"
                            onClick={() => handleUpdateClick(transaction)}
                          >
                            Edit status
                          </Button>
                        </Box>
                      </TableCell>
                    </TableRow>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <TablePagination
              rowsPerPageOptions={[5, 10, 15, 20]}
              component="div"
              count={transactions.length}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </Box>
        </>
      )}
      {transactions.length === 0 && (
        <p style={{ fontSize: "20px", textAlign: "center" }}>
          No transactions are avaliable for this user.
        </p>
      )}
    </>
  );
};

export default AllTransactions;

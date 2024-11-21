import { useParams } from "react-router-dom";
import {useState, useEffect} from 'react'
import axios from "axios";
import { Card, CardContent, Grid, Typography, Box, CircularProgress } from '@mui/material';
const TransactionDetails = ()=>{
    const { id } = useParams();
    const [data, setData] = useState(null)
    const [loading, setLoading] = useState(true)
   
    useEffect(() => {
        const fetchTransactionDetails = async () => {
          try {
            const apiEndpoint = `${process.env.REACT_APP_API_URL}/api/transactions/${parseInt(id)}`;
      const token = localStorage.getItem("token");
      const response = await axios.get(apiEndpoint, 
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      
      console.log("RES",response)
      setData(response.data.transactionDetails)
      setLoading(false)
          } catch (error) {
            console.error("Error fetching jobs:", error);
          } 
        };
    
        fetchTransactionDetails();
      }, [id]);
      
  
    if (loading) {
        return (
          <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
            <CircularProgress />
          </Box>
        );
      }

      return (
        
        <Card variant="outlined" sx={{ width: '80%', margin: '20px auto' }}>
        <CardContent>
          <Typography variant="h5" component="div" sx={{ marginBottom: '30px' }}>
            Transaction Details
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Transaction Type:</strong>
              </Typography>
              <Typography variant="body2">{data.transaction_type}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Status:</strong>
              </Typography>
              <Typography variant="body2">{data.status}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Created At:</strong>
              </Typography>
              <Typography variant="body2">{new Date(data.timestamp).toLocaleString('en-US', {
    // weekday: 'short', // Day of the week (e.g., "Mon")
    year: 'numeric',
    month: 'short', // Month (e.g., "Sep")
    day: 'numeric', // Day of the month (e.g., 21)
    hour: '2-digit', // Hour (e.g., 10)
    minute: '2-digit', // Minute (e.g., 30)
    // second: '2-digit', // Second (e.g., 59)
    hour12: true, // Use AM/PM format
  })}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Transaction ID:</strong>
              </Typography>
              <Typography variant="body2">{data.id}</Typography>
            </Grid>
            <Grid item xs={6}>
              <Typography variant="body1" color="textSecondary">
                <strong>Amount:</strong>
              </Typography>
              <Typography variant="body2">{data.amount}</Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
          
      )
}


export default TransactionDetails
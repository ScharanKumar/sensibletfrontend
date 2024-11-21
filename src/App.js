
import { Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import UserLogin from "./components/User/UserLogin";
import CreateUser from "./components/User/CreateUser";
import HomePage from "./components/User/HomePage"
import UserDashboard from "./components/User/UserDashboard";
import AllTransactions from "./components/User/Transactions/AllTransactions"
import CreateTransaction from "./components/User/Transactions/CreateTransaction"
import TransactionDetails from "./components/User/Transactions/TransactionDetails"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<UserLogin />} />
      <Route path="/user-dashboard" element={
                        <ProtectedRoute allowedRoles={["user"]}>
                            
                            <UserDashboard />
                            
                        </ProtectedRoute>
                    }>
        {/* Nested route for the home page within the Admin Dashboard */}
        <Route index element={<HomePage />} />
        <Route path="createUser" element={<CreateUser />} />
        <Route path="all-transactions" element={<AllTransactions />} />
        <Route path="create-transaction" element={<CreateTransaction />} />
        <Route path="transaction-details/:id" element={<TransactionDetails />} />
      </Route>

    </Routes>
  );
};

export default App;


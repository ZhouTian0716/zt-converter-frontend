import { Container, Typography } from "@mui/material";
import TransactionsTable from "../components/TransactionsTable";
import { useGetTransactionsQuery } from "../redux/api/convertApiSlice";

const Transactions = () => {
  const { data: transactions = [], isLoading, isSuccess, isError, error } = useGetTransactionsQuery();

  return (
    <Container sx={{ height: "600px", width: "800px" }}>
      <Typography sx={{ fontSize: "30px", fontWeight: 700, color: "white", textAlign: "center" }}>
        Transaction Records
      </Typography>
      {isLoading && (
        <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "white", textAlign: "center" }}>
          Loading...
        </Typography>
      )}
      {isError && (
        <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "white", textAlign: "center" }}>
          {JSON.stringify(error)}
        </Typography>
      )}
      {isSuccess && transactions.length === 0 && (
        <Typography sx={{ fontSize: "16px", fontWeight: 700, color: "white", textAlign: "center" }}>
          No records submitted yet.
        </Typography>
      )}
      {isSuccess && transactions.length > 0 && <TransactionsTable rows={transactions} />}
    </Container>
  );
};

export default Transactions;

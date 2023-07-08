import { useEffect } from "react";
import { Box, Container, Typography } from "@mui/material";
import logo from "../assets/converter-icon.png";
import Input from "../components/Input/Input";
import { getConvertFormState, setConvertRates } from "../redux/reducers/convertFormSlice";
import { useAppDispatch, useAppSelector } from "../redux/hooks";
import { useAddTransactionMutation, useGetConvertRatesQuery } from "../redux/api/convertApiSlice";
import SwitchBtn from "../components/SwitchBtn";
import { useNavigate } from "react-router-dom";

const Converter = () => {
  const { convertForm } = useAppSelector(getConvertFormState);
  const { from, srcAmount, to, resAmount, convertFee, convertRates } = convertForm;

  const dispatch = useAppDispatch();

  const { data: rates, isLoading, isSuccess, isError, error } = useGetConvertRatesQuery(from);
  const [addTransaction, { isLoading: isAdding }] = useAddTransactionMutation();

  const navigate= useNavigate();

  useEffect(() => {
    isSuccess && dispatch(setConvertRates(rates));
  }, [isSuccess, dispatch, rates]);

  // calculates
  const handleSubmit = () => {
    const submitPayload = {
      sourceCurrency: from,
      sourceAmount: srcAmount,
      targetCurrency: to,
      targetAmount: resAmount,
      fee: convertFee,
    };
    // console.log("data to submit", submitPayload);
    addTransaction(submitPayload);
    if(!isAdding) {
      navigate("/transactions")
    }
  };

  return (
    <Container
      sx={{
        display: "flex",
        flexDirection: "column",
        gap: "1rem",
        alignItems: "center",
        bgcolor: "#F8F9FB",
        width: "400px",
        p: 2,
        borderRadius: "8px",
      }}
    >
      <Box sx={{ display: "flex", alignItems: "center", gap: 2, marginBottom: "2rem" }}>
        <img src={logo} alt="logo" style={{ width: "80px", height: "80px" }} />
        <Typography sx={{ fontSize: "30px", fontWeight: 700, color: "#012754", textAlign: "center" }}>
          Currency Transfer
        </Typography>
      </Box>
      <Input inputType="From" />
      <SwitchBtn />
      <Input inputType="To" />
      <div className="flex-col gap-1">
        <p>
          <small>Market Rate:</small>
          {isLoading && <span>Loading...</span>}
          {isError && <span>{JSON.stringify(error)}</span>}
          {isSuccess && convertRates && <span>{convertRates[to].toFixed(5)}</span>}
        </p>
        <p>
          <small>Fee:</small>
          <span>{convertFee > 0 && `${convertFee} ${to}`}</span>
        </p>
      </div>

      <button className="btn-submit" type="button" onClick={handleSubmit} disabled={isAdding}>
        {isAdding ? "Sending" : "Submit"}
      </button>
    </Container>
  );
};

export default Converter;

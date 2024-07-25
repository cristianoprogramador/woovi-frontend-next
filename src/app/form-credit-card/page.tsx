"use client";

import { parcelOptions } from "@/utils/mock";
import Image from "next/image";
import { useEffect, useState } from "react";
import {
  Box,
  Button,
  Collapse,
  FormControl,
  IconButton,
  IconButtonProps,
  InputLabel,
  MenuItem,
  Select,
  SelectChangeEvent,
  styled,
  TextField,
} from "@mui/material";
import { CreditCard, ExpandMore } from "@mui/icons-material";
import VerticalLinearFinalStepper from "@/components/verticalLinearFinalStepper";
import CpfInput from "@/components/cpfInput";
import ExpiryDateInput from "@/components/expiryDateInput";
import CvvInput from "@/components/cvvInput";
import CreditCardInput from "@/components/creditcard";

interface ExpandMoreProps extends IconButtonProps {
  expand: boolean;
}

const ExpandMoreIcon = styled((props: ExpandMoreProps) => {
  const { expand, ...other } = props;
  return <IconButton {...other} />;
})(({ theme, expand }) => ({
  transform: !expand ? "rotate(0deg)" : "rotate(180deg)",
  marginLeft: "auto",
  transition: theme.transitions.create("transform", {
    duration: theme.transitions.duration.shortest,
  }),
}));

const FormCreditCardPage = () => {
  const [id, setId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [parcela, setParcela] = useState("");
  const [nome, setNome] = useState("");
  const [cpf, setCpf] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  const handleChangeParcela = (
    event: SelectChangeEvent<string>
  ) => {
    setParcela(event.target.value);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    setId(id);
  }, []);

  if (!id) {
    return (
      <div className="flex flex-col min-h-screen w-full justify-center items-center">
        Carregando...
      </div>
    );
  }

  const option = parcelOptions.find((option) => option.id === id);

  if (!option) {
    return (
      <div className="flex flex-col min-h-screen w-full justify-center items-center">
        Opção não encontrada
      </div>
    );
  }

  const handleSubmit = () => {
    console.log({
      nome,
      cpf,
      cardNumber,
      expiryDate,
      cvv,
      parcela,
    });
    alert("Informações enviadas com sucesso!");
  };

  return (
    <div className="flex flex-col min-h-screen w-full justify-start items-center">
      <div className="w-full flex flex-col justify-center items-center">
        <div className="mt-9">
          <Image alt="logo" src="/logo-woovi.png" width={124} height={37} />
        </div>
        <div className="mt-10 font-extrabold text-2xl text-center px-4">
          João, pague o restante em {option.installments}x no cartão
        </div>
        <div className="w-[90%] max-w-[430px] flex flex-col justify-center items-center">
          <div className="mt-6 w-full flex flex-col gap-5">
            <FormControl className="flex w-full" variant="outlined">
              <TextField
                id="nome-completo"
                label="Nome completo"
                variant="outlined"
                fullWidth
              />
            </FormControl>
            <CpfInput value={cpf} onChange={setCpf} />
            <CreditCardInput value={cardNumber} onChange={setCardNumber} />
            <div className="flex flex-row gap-5 w-full">
              <ExpiryDateInput value={expiryDate} onChange={setExpiryDate} />
              <CvvInput value={cvv} onChange={setCvv} />
            </div>
            <FormControl className="flex w-full" variant="outlined">
              <InputLabel id="parcelas-label">Parcelas</InputLabel>
              <Select
                id="parcelas"
                labelId="parcelas-label"
                value={parcela}
                onChange={handleChangeParcela}
                label="Parcelas"
                fullWidth
              >
                {parcelOptions.slice(1).map((option) => (
                  <MenuItem key={option.id} value={option.id}>
                    {option.installments}x de {option.installmentAmount}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </div>

          <Button
            onClick={handleSubmit}
            sx={{
              textTransform: "none",
              backgroundColor: "#133A6F",
              "&:hover": { backgroundColor: "#133A6F" },
            }}
            className="bg-[#133A6F] px-5 py-1 mt-4 font-semibold text-lg flex flex-row gap-3 text-white rounded-md w-full"
          >
            <div>Pagar</div>
          </Button>

          <div className="mt-4">
            <div className="text-[#B2B2B2]">Prazo de pagamento:</div>
            <div className="text-[#4D4D4D] font-extrabold">
              15/12/2021 - 08:17
            </div>
          </div>

          <div className="flex w-full mt-4">
            <VerticalLinearFinalStepper
              installments={option.installments}
              installmentAmount={option.installmentAmount}
            />
          </div>

          <div className="w-full h-[2px] bg-gray-300 my-5" />

          <div className="flex flex-row w-full justify-between items-center font-semibold">
            <div>CET: 0,5%</div>
            <div className="text-lg">Total: {option.total}</div>
          </div>

          <div className="w-full h-[2px] bg-gray-300 my-3" />

          <div className="w-full">
            <div
              onClick={handleExpandClick}
              className="flex flex-row justify-between w-full items-center"
            >
              <div className="font-extrabold">Como Funciona?</div>
              <ExpandMoreIcon expand={expanded}>
                <ExpandMore />
              </ExpandMoreIcon>
            </div>
            <Collapse in={expanded} timeout="auto" unmountOnExit>
              <Box sx={{ marginTop: 1 }}>
                <div className="text-sm text-justify">
                  Para concluir o pagamento, primeiro pague a entrada de R${" "}
                  {option.installmentAmount} pelo Pix. Após a confirmação do
                  pagamento, o restante será parcelado no seu cartão de crédito
                  em {option.installments} vezes de R${" "}
                  {option.installmentAmount} cada.
                </div>
              </Box>
            </Collapse>
          </div>

          <div className="w-full h-[2px] bg-gray-300 my-3" />

          <div className="flex flex-col justify-center items-center">
            <div className="text-[#B2B2B2] text-sm">Identificador:</div>
            <div className="font-extrabold">{option.id}</div>
          </div>

          <div className="flex flex-row justify-center gap-1 my-6 text-[#B2B2B2] text-sm">
            <div>
              <Image src={"/shield.png"} alt="" width={16} height={16} />
            </div>
            <div className="text-center flex mt-[1px]">
              Pagamento 100% seguro via:
            </div>
            <div>
              <Image
                src={"/logo-woovi-gray.png"}
                alt=""
                width={57}
                height={17}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormCreditCardPage;

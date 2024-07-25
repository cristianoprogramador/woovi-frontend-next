"use client";

import { useRouter } from "next/navigation";
import { parcelOptions } from "@/utils/mock";
import Image from "next/image";
import { useEffect, useState } from "react";
import VerticalLinearStepper from "@/components/verticalLinearStepper";
import {
  Box,
  Button,
  Collapse,
  Fade,
  IconButton,
  IconButtonProps,
  styled,
} from "@mui/material";
import { ExpandMore } from "@mui/icons-material";

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

const PixCreditCardPage = () => {
  const router = useRouter();
  const [id, setId] = useState<string | null>(null);
  const [expanded, setExpanded] = useState(false);
  const [buttonText, setButtonText] = useState("Clique para copiar QR CODE");
  const [loaded, setLoaded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  useEffect(() => {
    const query = new URLSearchParams(window.location.search);
    const id = query.get("id");
    setId(id);
  }, []);

  useEffect(() => {
    setTimeout(() => {
      setLoaded(true);
    }, 100);
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

  const handleCopyClick = () => {
    const url = "https://cristianosilvadev.com";
    navigator.clipboard.writeText(url).then(() => {
      setButtonText("QR CODE copiado!");
    });
  };

  const handleNextPage = () => {
    if (buttonText == "QR CODE copiado!") {
      router.push(`/form-credit-card?id=${option.id}`);
    }
  };

  return (
    <Fade in={loaded} timeout={500}>
      <div className="flex flex-col min-h-screen w-full justify-start items-center">
        <div className="w-full flex flex-col justify-center items-center">
          <div className="mt-9">
            <Image alt="logo" src="/logo-woovi.png" width={124} height={37} />
          </div>
          <div className="mt-10 font-extrabold text-2xl text-center px-14">
            João, pague a entrada de {option.installmentAmount} pelo Pix
          </div>
          <div className="w-[90%] max-w-[430px] flex flex-col justify-center items-center">
            <div className="mt-5 py-2 px-2 border-2  border-[#03D69D] rounded-xl flex justify-center items-center">
              <Image
                src={"/qrcode.png"}
                alt="QRCode"
                width={320}
                height={310}
              />
            </div>

            <Button
              onClick={handleCopyClick}
              sx={{
                textTransform: "none",
                backgroundColor: "#133A6F",
                "&:hover": { backgroundColor: "#133A6F" },
              }}
              endIcon={
                <Image src={"/copy.svg"} alt="QRCode" width={20} height={19} />
              }
              className="bg-[#133A6F] px-5 py-2 mt-4 font-semibold text-lg flex flex-row gap-3 text-white rounded-md"
            >
              <div>{buttonText}</div>
            </Button>

            <div className="mt-4">
              <div className="text-[#B2B2B2]">Prazo de pagamento:</div>
              <div className="text-[#4D4D4D] font-extrabold">
                15/12/2021 - 08:17
              </div>
            </div>

            <div className="flex w-full mt-4">
              <VerticalLinearStepper
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
                    pagamento, o restante será parcelado no seu cartão de
                    crédito em {option.installments} vezes de R${" "}
                    {option.installmentAmount} cada.
                  </div>
                </Box>
              </Collapse>
            </div>

            <div className="w-full h-[2px] bg-gray-300 my-3" />

            {buttonText === "QR CODE copiado!" && option.installments > 1 ? (
              <div className="flex justify-center items-center w-full my-3">
                <Button
                  onClick={handleNextPage}
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    backgroundColor: "#133A6F",
                    "&:hover": { backgroundColor: "#133A6F" },
                  }}
                  className="bg-[#133A6F] px-5 py-2 font-semibold text-lg flex flex-row gap-3 text-white rounded-md"
                >
                  <div>Continuar</div>
                </Button>
              </div>
            ) : null}

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
    </Fade>
  );
};

export default PixCreditCardPage;

import * as React from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import { styled } from "@mui/material/styles";
import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";

const CustomUncheckedIcon = () => {
  return (
    <div className="w-4 h-4 rounded-full flex items-center justify-center border-2 border-[#03D69D] transition duration-150 ease-in-out" />
  );
};

const CustomCheckedIcon = () => {
  return (
    <div className="w-4 h-4 rounded-full flex items-center justify-center border-2 bg-[#03D69D] border-[#03D69D] transition duration-150 ease-in-out">
      <svg
        className="w-4 h-4 text-white"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="3"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path d="M5 13l4 4L19 7" />
      </svg>
    </div>
  );
};

const StepIcon = ({
  active,
  completed,
}: {
  active: boolean;
  completed: boolean;
}) => {
  return (
    <div>{completed ? <CustomCheckedIcon /> : <CustomUncheckedIcon />}</div>
  );
};

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`& .${stepConnectorClasses.line}`]: {
    width: 2,
    border: 0,
    backgroundColor: "#eaeaf0",
    transform: "translateX(-5px)",
    minHeight: "24px",
    marginTop: "-4px",
    marginBottom: "-4px",
  },
}));

interface VerticalLinearStepperProps {
  installments: number;
  installmentAmount: string;
}

export default function VerticalLinearFinalStepper({
  installments,
  installmentAmount,
}: VerticalLinearStepperProps) {
  const [activeStep, setActiveStep] = React.useState(1);

  const steps = [
    {
      label: "1ª entrada no Pix",
      value: installmentAmount,
    },
    ...Array.from({ length: installments - 1 }, (_, i) => ({
      label: `${i + 2}ª no cartão`,
      value: installmentAmount,
    })),
  ];

  return (
    <Box sx={{ width: "100%" }}>
      <Stepper
        activeStep={activeStep}
        orientation="vertical"
        connector={<ColorlibConnector />}
      >
        {steps.map((step, index) => (
          <Step key={step.label}>
            <StepLabel
              sx={{ padding: 0 }}
              StepIconComponent={(props) => (
                <StepIcon
                  {...(props as { active: boolean; completed: boolean })}
                />
              )}
            >
              <div
                className="flex flex-row w-full justify-between text-base text-[#4D4D4D]"
                style={{ fontFamily: "Nunito, sans-serif" }}
              >
                <div className="font-semibold">{step.label}</div>
                <div className="font-extrabold ">{step.value}</div>
              </div>
            </StepLabel>
          </Step>
        ))}
      </Stepper>
    </Box>
  );
}

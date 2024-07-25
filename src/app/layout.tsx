import type { Metadata } from "next";
import "./globals.css";
import { CssBaseline, ThemeProvider } from "@mui/material";
import theme from "@/themes/themes";

export const metadata: Metadata = {
  title: "Woovi - Frontend",
  description: "Youtube",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          {children}
        </ThemeProvider>
      </body>
    </html>
  );
}

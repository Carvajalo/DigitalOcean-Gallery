import Navbar from "./assets/components/navbar/Navbar";
import ListImage from "./assets/components/image/ListImage";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

const theme = createTheme({
  palette: {
    primary: {
      main: "#0d47a1",
    },
    secondary: {
      main: "#2196f3",
    },
    mode: "dark",
  },
});
function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Navbar></Navbar>
        <ListImage></ListImage>
      </ThemeProvider>
    </>
  );
}

export default App;

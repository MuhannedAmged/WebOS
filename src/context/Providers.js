import { ThemeProvider } from "@/components/theme-provider";
import { AppsOpenContextProvider } from "./AppsOpenContext";

const AppProviders = ({ children }) => {
  return (
    <AppsOpenContextProvider>
      <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
        {children}
      </ThemeProvider>
    </AppsOpenContextProvider>
  );
};

export default AppProviders;

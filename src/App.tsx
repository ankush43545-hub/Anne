import { ThemeProvider } from "./context/ThemeContext";
import { ChatInterface } from "./components/Chat/ChatInterface";

export function App() {
  return (
    <ThemeProvider>
      <ChatInterface />
    </ThemeProvider>
  );
}

import { ThemeProvider } from "./context/ThemeContext";
import { ChatInterface } from "./components/chat/ChatInterface";

export function App() {
  return (
    <ThemeProvider>
      <ChatInterface />
    </ThemeProvider>
  );
}

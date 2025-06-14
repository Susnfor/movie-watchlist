'use client'
import { SnackbarProvider } from 'notistack';


export default function ClientProviders({ children }) {
  return (
      <SnackbarProvider 
        maxSnack={3} 
        autoHideDuration={1000}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
      >
        {children}
      </SnackbarProvider>
  );
}

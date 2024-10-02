import { ThemeProvider } from './theme/ThemeProvider'
import { MapScreen } from "MapScreen";
import React from 'react'
import { LocationPermissionsService } from "services/LocationPermissionService";
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { UserLocationStateContextProvider } from 'context/UserLocationContext';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export const App = () => {
  return (
    <SafeAreaProvider>
      <GestureHandlerRootView style={{flex: 1}}>
        <ThemeProvider>
          <UserLocationStateContextProvider>
            <MapScreen />
            <LocationPermissionsService />
          </UserLocationStateContextProvider>
        </ThemeProvider>
      </GestureHandlerRootView>
    </SafeAreaProvider>
  )
}

export default App;
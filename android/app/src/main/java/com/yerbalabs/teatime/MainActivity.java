package com.yerbalabs.teatime;

import android.os.Bundle;
import androidx.core.splashscreen.SplashScreen;
import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    @Override
    protected void onCreate(Bundle savedInstanceState) {
        // Android 12+ requiere androidx.core.splashscreen.SplashScreen para que
        // las propiedades windowSplashScreen* del tema AppTheme.NoActionBarLaunch
        // se apliquen. Después de este splash inicial (~400ms, controlado por
        // el SO), el plugin @capacitor/splash-screen superpone el PNG completo
        // por launchShowDuration antes de entregar la UI a React.
        SplashScreen.installSplashScreen(this);
        super.onCreate(savedInstanceState);
    }
}

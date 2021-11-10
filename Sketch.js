let AirProperties = new FlowStream();
let WaterProperties = {
    Pressure : 0,
    Temperature : 0,
    DensityLiquid : 0,
    DensityVapor : 0,
    EnthalpyLiquid : 0,
    EnthalpyVapor : 0,
    EnthalpyVaporization : 0,
    EntropyLiquid : 0,
    EntropyVapor : 0,
    EntropyVaporization : 0,
    VolumeLiquid : 0,
    VolumeVapor : 0
};
let Screen = {
    X: 800,
    Y: 600,
    densMin: 0,       //kg/m3
    densMax: 0.03,    //kg/m3
    tempMin: 273.15-10,  //°K
    tempMax: 273.15+55,  //°K
    SelectedHumidity : 0
}
function setup() {
    createCanvas(Screen.X, Screen.Y);
    SetupFlowStreamSimulator();
    AirProperties.addNitrogen(0.78);
    AirProperties.addOxygen(.21);
    AirProperties.addArgon(0.01);
}
function draw() {
    background(220);
    // Draw Saturated
    let Old = {
        Temperature: 0,
        TemperatureScreen: map(0, Screen.tempMin, Screen.tempMax, 0, Screen.X),
        Density: 0,
        DensityScreen: map(0, Screen.densMin, Screen.densMax, 0, Screen.Y)
    }
    let New = {
        TemperatureScreen: map(0, Screen.tempMin, Screen.tempMax, 0, Screen.X),
        DensityScreen: map(0, Screen.densMin, Screen.densMax, 0, Screen.Y),
    }
    let Resolution = 100;
    for (let i = 0; i < Resolution; i++) {
        WaterProperties.Temperature = map(i, 0, Resolution - 1, Screen.tempMin, Screen.tempMax);
        WaterProperties.Pressure = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.Pressure);
        WaterProperties.DensityLiquid = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.DensityLiquid);
        WaterProperties.DensityVapor = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.DensityVapor);
        WaterProperties.EnthalpyLiquid = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.EnthalpyLiquid);
        WaterProperties.EnthalpyVapor = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.EnthalpyVapor);
        WaterProperties.EnthalpyVaporization = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.EnthalpyVaporization);
        // Draw
        New.TemperatureScreen = map(WaterProperties.Temperature, Screen.tempMin, Screen.tempMax, 0, Screen.X);
        New.DensityScreen = map(WaterProperties.DensityVapor, Screen.densMin, Screen.densMax, Screen.Y, 0);
        // line(Old.TemperatureScreen, Old.DensityScreen, New.TemperatureScreen, New.DensityScreen);
        let OldD = 0;
        let NewD = 0;
        line(Old.TemperatureScreen, Old.DensityScreen, New.TemperatureScreen, New.DensityScreen);
        OldD = map( 0.1, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.1, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.2, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.2, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.3, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.3, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.4, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.4, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.5, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.5, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.6, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.6, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.7, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.7, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.8, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.8, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.9, 0, 1, Old.DensityScreen, Screen.Y);
        NewD = map( 0.9, 0, 1, New.DensityScreen, Screen.Y);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        //
        Old.TemperatureScreen = New.TemperatureScreen;
        Old.DensityScreen = New.DensityScreen;
    }
    if (mouseX > 0 && mouseX < Screen.X && mouseY > 0 && mouseY < Screen.Y ){
        WaterProperties.Temperature = map(mouseX, 0, Screen.X, Screen.tempMin, Screen.tempMax);
        WaterProperties.DensityVapor =map(mouseY, 0, Screen.Y, Screen.densMax, Screen.densMin);
        let PontedDensity = WaterProperties.DensityVapor;
        WaterProperties.Pressure = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.Pressure);
        WaterProperties.DensityVapor = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.DensityVapor);
        let SaturationDensity = WaterProperties.DensityVapor;
        Screen.SelectedHumidity = (PontedDensity / SaturationDensity);
        let SelectedEnthalpy = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.EnthalpyVaporization).toFixed(3);
        AirProperties.Pressure = 100;
        AirProperties.Temperature = WaterProperties.Temperature;
        AirProperties.CalculateDensity(1);
        // Screen.SelectedHumidity kg/m3  AirProperties.Density kmol/m3 AirProperties.MolarMass kg/kmol
        // Kg H2O / Kg Aire = kg H2O/m3 / (kmol/m3 * kg/kmol) = kg H2O/m3 / kg Aire/m3
        // Kg H2O / Kg Aire = Screen.SelectedHumidity / (AirProperties.Density * AirProperties.MolarMass)
        if(Screen.SelectedHumidity < 1.01){
            text(Screen.SelectedHumidity.toFixed(3) + ' %', 10, 15);
            text((PontedDensity / (AirProperties.Density * AirProperties.MolarMass)).toFixed(3) + ' kg Agua / kg Aire', 10, 35);
            text((SelectedEnthalpy * PontedDensity / (AirProperties.Density * AirProperties.MolarMass)).toFixed(2) + ' kJ/kg', 10, 55); // KJ/kg H2O * kg H2O/m3 / kg Aire/m3
            text((WaterProperties.Temperature-273.15).toFixed(2) + ' °C', 10, 75);
            text(mouseY.toFixed(0), 10, 95);
            text(PontedDensity.toFixed(3), 10, 115);
            text((AirProperties.Density * AirProperties.MolarMass).toFixed(3) + ' kg/m3', 10, 135);
        }
    }
}
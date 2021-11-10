let AirProperties = new FlowStream();
let MassDensityAir = 0;
let GasType = '';
let Background;
let IsCircleIncreasing = false;
let SizeOfCircle = 0;
let WaterProperties = {
    Pressure : 0,
    Temperature : 0,
    DensityLiquid : 0,
    DensityVapor : 0,
    EnthalpyVaporization : 0,
    EntropyVaporization : 0,
    VolumeLiquid : 0,
    VolumeVapor : 0
};
let Screen = {
    XCanvas: 1360,
    YCanvas: 768,
    Xmin: 0,
    Xmax: 1360,
    Ymin: 92,
    Ymax: 768,
    densMin: 0,       //kg/m3
    densMax: 0.03,    //kg/m3
    tempMin: 273.15-10,  //°K
    tempMax: 273.15+55,  //°K
    SelectedHumidity : 0
}
function preload(){
    Background = loadImage('Background.png');
}
function setup() {
    createCanvas(Screen.XCanvas, Screen.YCanvas);
    SetupFlowStreamSimulator();
    //// Air
    //AirProperties.addNitrogen(0.78);
    //AirProperties.addOxygen(.21);
    //AirProperties.addArgon(0.01);
    //GasType = 'Aire';
    //// Landfill Gas
    AirProperties.addMethane(0.5);
    AirProperties.addCarbonDioxide(0.48);
    AirProperties.addNitrogen(0.02);
    GasType = 'Gas de relleno sanitario';
}
function draw() {
    image(Background,0,0);
    // Draw iso relative humidity
    let Old = {
        Temperature: 0,
        Density: 0,
        TemperatureScreen: map(Screen.tempMin, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax),
        DensityScreen: map(Screen.densMax, Screen.densMin, Screen.densMax, Screen.Ymin, Screen.Ymax)
    }
    let New = {
        TemperatureScreen: map(Screen.tempMin, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax),
        DensityScreen: map(Screen.densMin, Screen.densMin, Screen.densMax, Screen.Ymin, Screen.Ymax),
    }
    let Resolution = 100;
    for (let i = 0; i < Resolution; i++){
        WaterProperties.Temperature = map(i, 0, Resolution-1, Screen.tempMin, Screen.tempMax);
        WaterProperties.Pressure = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.Pressure);
        WaterProperties.DensityLiquid = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.DensityLiquid);
        WaterProperties.DensityVapor = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.DensityVapor);
        WaterProperties.EnthalpyVaporization = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.EnthalpyVaporization);
        // Draw
        New.TemperatureScreen = map(WaterProperties.Temperature, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax);
        New.DensityScreen = map(WaterProperties.DensityVapor, Screen.densMin, Screen.densMax, Screen.Ymax, Screen.Ymin);
        let OldD = 0;
        let NewD = 0;
        line(Old.TemperatureScreen, Old.DensityScreen, New.TemperatureScreen, New.DensityScreen);
        OldD = map( 0.1, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.1, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.2, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.2, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.3, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.3, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.4, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.4, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.5, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.5, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.6, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.6, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.7, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.7, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.8, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.8, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        OldD = map( 0.9, 0, 1, Old.DensityScreen, Screen.Ymax);
        NewD = map( 0.9, 0, 1, New.DensityScreen, Screen.Ymax);
        line(Old.TemperatureScreen, OldD, New.TemperatureScreen, NewD);
        //
        Old.TemperatureScreen = New.TemperatureScreen;
        Old.DensityScreen = New.DensityScreen;
    }
    if (mouseX > Screen.Xmin && mouseX < Screen.Xmax && mouseY > Screen.Ymin && mouseY < Screen.Ymax){
        WaterProperties.Temperature = map(mouseX, Screen.Xmin, Screen.Xmax, Screen.tempMin, Screen.tempMax);
        WaterProperties.DensityVapor =map(mouseY, Screen.Ymin, Screen.Ymax, Screen.densMax, Screen.densMin);
        let PointedDensity = WaterProperties.DensityVapor;
        WaterProperties.Pressure = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.Pressure);
        WaterProperties.DensityVapor = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.DensityVapor);
        let SaturationDensity = WaterProperties.DensityVapor;
        Screen.SelectedHumidity = (PointedDensity / SaturationDensity);
        let SelectedEnthalpy = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.EnthalpyVaporization).toFixed(3);
        let SelectedEntropy = RegretionByPoints(WaterProperties.Temperature, Vapor.Temperature, Vapor.EntropyVaporization).toFixed(3);
        AirProperties.Pressure = 111;
        AirProperties.Temperature = WaterProperties.Temperature;
        AirProperties.CalculateDensity(1);
        // Screen.SelectedHumidity kg/m3  AirProperties.Density kmol/m3 AirProperties.MolarMass kg/kmol
        // Kg H2O / Kg Aire = kg H2O/m3 / (kmol/m3 * kg/kmol) = kg H2O/m3 / kg Aire/m3
        // Kg H2O / Kg Aire = Screen.SelectedHumidity / (AirProperties.Density * AirProperties.MolarMass)
        if(Screen.SelectedHumidity < 1.01){
            MassDensityAir = AirProperties.Density * AirProperties.MolarMass;
            text('Humedad Relativa: ' + (Screen.SelectedHumidity*100).toFixed(1) + ' %', 10, 115);
            text('Humedad Absoluta: ' + (PointedDensity / MassDensityAir).toFixed(3) + ' kg agua / kg gas seco', 10, 135);
            text('Humedad Absoluta Volumetrica: ' + PointedDensity.toFixed(3) + ' kg Agua/m3', 10, 155);
            text('Entalpia de Vaporización: ' + (SelectedEnthalpy * PointedDensity / MassDensityAir).toFixed(2) + ' kJ/kg', 10, 175); // KJ/kg H2O * kg H2O/m3 / kg Aire/m3
            text('Entropia de Vaporización: ' + (SelectedEntropy * PointedDensity / MassDensityAir).toFixed(2) + ' kJ/[kg K]', 10, 195); // KJ/kg H2O * kg H2O/m3 / kg Aire/m3
            text('Temperatura: ' + (WaterProperties.Temperature-273.15).toFixed(2) + ' °C', 10, 215);
            text('Presión: ' + AirProperties.Pressure.toFixed(1) + ' kPa', 10, 235);
            text('Densidad: ' + MassDensityAir.toFixed(3) + ' kg/m3', 10, 255);
            text(GasType, 10, 275);
            line(mouseX, mouseY,mouseX, Screen.YCanvas);
            line(Screen.XCanvas, mouseY,mouseX, mouseY);
            if(IsCircleIncreasing){
                SizeOfCircle = SizeOfCircle + 0.1;
            }else{
                SizeOfCircle = SizeOfCircle - 0.1;
            }
            if(SizeOfCircle > 8){IsCircleIncreasing = false}
            if(SizeOfCircle < 0){IsCircleIncreasing = true}
            circle(mouseX, mouseY, 13 + SizeOfCircle);
        }
    }
}
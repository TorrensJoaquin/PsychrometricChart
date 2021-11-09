let MouseValue = new FlowStream();
let Screen = {
    X: 800,
    Y: 600,
    densMin: 0,       //mol/l
    densMax: 0.000075,//mol/l
    //mol/l * Mm gr/mol * 1000 l / m3 = gr/m3
    massMin:0,        //gr/m3
    massMax:0,        //gr/m3
    //gr/m3 / Mm gr/mol * m3 / 1000 l = mol/l
    tempMin: 273.15,  //°C
    tempMax: 333.15,  //°C
    SelectedHumidity : 0
}
function setup() {
    createCanvas(Screen.X, Screen.Y);
    SetupFlowStreamSimulator();
    MouseValue.addWater(1);
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
    for (let i = 0; i < 100; i++) {
        MouseValue.Temperature = map(i, 0, 99, Screen.tempMin, Screen.tempMax);
        //Saturation Pressure
        MouseValue.Pressure = RegretionByPoints(MouseValue.Temperature - 273.15, VaporTemperature, VaporPressure);
        //Calculate Gas
        MouseValue.CalculateDensity(1);
        //Draw
        New.TemperatureScreen = map(MouseValue.Temperature, Screen.tempMin, Screen.tempMax, 0, Screen.X);
        New.DensityScreen = map(MouseValue.Density, Screen.densMin, Screen.densMax, Screen.Y, 0);
        //line(Old.TemperatureScreen, Old.DensityScreen, New.TemperatureScreen, New.DensityScreen);
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
        MouseValue.Temperature = map(mouseX, 0, Screen.X, Screen.tempMin, Screen.tempMax);
        MouseValue.Density = map(mouseY, 0, Screen.Y, Screen.densMax, Screen.densMin);
        MouseValue.CalculateProperties();
        let Density1 = MouseValue.Density;
        MouseValue.Pressure = RegretionByPoints(MouseValue.Temperature - 273.15, VaporTemperature, VaporPressure);
        MouseValue.CalculateDensity(1);
        let Density2 = MouseValue.Density;
        Screen.SelectedHumidity = (Density1 / Density2).toFixed(3);
        if(Screen.SelectedHumidity < 1.01){
            text(Screen.SelectedHumidity , 10, 15);
        }
    }
    // Calculate Mass Density
    Screen.massMin = Screen.densMin * MouseValue.MolarMass * 1000;
    Screen.massMax = Screen.densMin * MouseValue.MolarMass * 1000;
}
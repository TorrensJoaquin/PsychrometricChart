let Air = new FlowStream();
let MassDensityAir = 0;
let aux;
let Background = [];
let webButtons = [];
let IsCircleIncreasing = false;
let SizeOfCircle = 0;
let WaterOverMouse = new WaterProperties();
let WaterSaturation =  new WaterProperties();
let Screen = {
    XCanvas: 1360,
    YCanvas: 768,
    Xmin: 0,
    Xmax: 1360,
    Ymin: 92,
    Ymax: 768,
    densMin: 0,       //kg/m3
    densMax: 0.03,    //kg/m3
    densMinSP: 0,       //kg/m3
    densMaxSP: 0.03,    //kg/m3
    densVelMax : 0.0003,
    tempMin: 273.15-10,  //°K
    tempMax: 273.15+55,  //°K
    tempMinSP: -10,  //°C
    tempMaxSP: 55,  //°C
    tempVelMax: 0.3,
    SelectedHumidity : 0
}
function MoveToTheRequestedRange(){
    if(isNumber(Screen.densMinSP)){
        if(Screen.densMin > Screen.densMinSP + Screen.densVelMax){
            Screen.densMin = Screen.densMin - Screen.densVelMax;
        }else if(Screen.densMin < Screen.densMinSP - Screen.densVelMax){
            Screen.densMin = Screen.densMin + Screen.densVelMax;
        }else{
            Screen.densMin = Screen.densMinSP;
        }
    }
    if(isNumber(Screen.densMaxSP)){
        if(Screen.densMax > Screen.densMaxSP + Screen.densVelMax){
            Screen.densMax = Screen.densMax - Screen.densVelMax;
        }else if(Screen.densMax < Screen.densMaxSP - Screen.densVelMax){
            Screen.densMax = Screen.densMax + Screen.densVelMax;
        }else{
            Screen.densMax = Screen.densMaxSP;
        }
    }
    if(isNumber(Screen.tempMinSP)){
        if(Screen.tempMin > Screen.tempMinSP + 273.15 + Screen.tempVelMax){
            Screen.tempMin = Screen.tempMin - Screen.tempVelMax;
        }else if(Screen.tempMin < Screen.tempMinSP + 273.15 - Screen.tempVelMax){
            Screen.tempMin = Screen.tempMin + Screen.tempVelMax;
        }else{
            Screen.tempMin = Screen.tempMinSP + 273.15;
        }
    }
    if(isNumber(Screen.tempMaxSP)){
        if(Screen.tempMax > Screen.tempMaxSP + 273.15 + Screen.tempVelMax){
            Screen.tempMax = Screen.tempMax - Screen.tempVelMax;
        }else if(Screen.tempMax < Screen.tempMaxSP + 273.15 - Screen.tempVelMax){
            Screen.tempMax = Screen.tempMax + Screen.tempVelMax;
        }else{
            Screen.tempMax = Screen.tempMaxSP + 273.15;
        }
    }
    function isNumber(val) {
        return (val >=0 || val < 0);
    }
}
function preload(){
    Background[0] = loadImage('Images/Background.png');
    Background[1] = loadImage('Images/Background_x.png');
    webButtons[0] = new WebButton([1050,0],loadImage('Images/ChangeGasComposition_A.jpg'),loadImage('Images/ChangeGasComposition_B.jpg'),loadImage('Images/ChangeGasComposition_C.jpg'));
    webButtons[1] = new WebButton([380,620],loadImage('Images/Clear_A.jpg'),loadImage('Images/Clear_B.jpg'),loadImage('Images/Clear_C.jpg'));
    webButtons[2] = new WebButton([430,230],loadImage('Images/Update_Gas_Composition_A.jpg'),loadImage('Images/Update_Gas_Composition_B.jpg'),loadImage('Images/Update_Gas_Composition_C.jpg'));
}
function setup(){
    createCanvas(Screen.XCanvas, Screen.YCanvas);
    SetupFlowStreamSimulator();
    ButtonsConfiguration();
    CreateTheXInputs();
    // DOM Inputs
    inpPressure=createInput(Air.Pressure.toString());
    inpPressure.size(40,30);
    inpPressure.position(805,33);
    inpMinTemperarure=createInput(Screen.tempMinSP.toString());
    inpMinTemperarure.size(30,15);
    inpMinTemperarure.position(21,751);
    inpMaxTemperarure=createInput(Screen.tempMaxSP.toString());
    inpMaxTemperarure.size(30,15);
    inpMaxTemperarure.position(1277,751);
    inpMinDensity=createInput(Screen.densMinSP.toString());
    inpMinDensity.size(33,15);
    inpMinDensity.position(1303,716);
    inpMaxDensity=createInput(Screen.densMax.toString());
    inpMaxDensity.size(33,15);
    inpMaxDensity.position(1303,109);
    //// Air
    Air.addNitrogen(0.78);
    Air.addOxygen(.21);
    Air.addArgon(0.01);
    disappearTheDOMs(true);
    FromXToDOMs();
}
function draw(){
    MoveToTheRequestedRange();
    if(webButtons[0].activated){
        image(Background[1],0,0);
    }else{
        image(Background[0],0,0);
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
            WaterSaturation.Temperature = map(i, 0, Resolution-1, Screen.tempMin, Screen.tempMax);
            WaterSaturation.Pressure = RegretionByPoints(WaterSaturation.Temperature, Vapor.Temperature, Vapor.Pressure);
            WaterSaturation.DensityLiquid = RegretionByPoints(WaterSaturation.Temperature, Vapor.Temperature, Vapor.DensityLiquid);
            WaterSaturation.DensityVapor = RegretionByPoints(WaterSaturation.Temperature, Vapor.Temperature, Vapor.DensityVapor);
            WaterSaturation.EnthalpyVaporization = RegretionByPoints(WaterSaturation.Temperature, Vapor.Temperature, Vapor.EnthalpyVaporization);
            // Draw
            New.TemperatureScreen = map(WaterSaturation.Temperature, Screen.tempMin, Screen.tempMax, Screen.Xmin, Screen.Xmax);
            New.DensityScreen = map(WaterSaturation.DensityVapor, Screen.densMin, Screen.densMax, Screen.Ymax, Screen.Ymin);
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
            WaterOverMouse.Temperature = map(mouseX, Screen.Xmin, Screen.Xmax, Screen.tempMin, Screen.tempMax);
            WaterOverMouse.DensityVapor =map(mouseY, Screen.Ymin, Screen.Ymax, Screen.densMax, Screen.densMin);
            WaterOverMouse.molDensityVapor = RegretionByPoints(WaterOverMouse.Temperature, Vapor.Temperature, Vapor.molDensityVapor);
            WaterOverMouse.EnthalpyVaporization = RegretionByPoints(WaterOverMouse.Temperature, Vapor.Temperature, Vapor.EnthalpyVaporization);
            WaterOverMouse.EntropyVaporization = RegretionByPoints(WaterOverMouse.Temperature, Vapor.Temperature, Vapor.EntropyVaporization);
            WaterSaturation.Temperature=WaterOverMouse.Temperature;
            WaterSaturation.Pressure = RegretionByPoints(WaterSaturation.Temperature, Vapor.Temperature, Vapor.Pressure);
            WaterSaturation.DensityVapor = RegretionByPoints(WaterSaturation.Temperature, Vapor.Temperature, Vapor.DensityVapor);
            Screen.SelectedHumidity = (WaterOverMouse.DensityVapor / WaterSaturation.DensityVapor);
            Air.Temperature = WaterOverMouse.Temperature;
            Air.CalculateDensity(1);
            // Screen.SelectedHumidity kg/m3  Air.Density kmol/m3 Air.MolarMass kg/kmol
            // Kg H2O / Kg Aire = kg H2O/m3 / (kmol/m3 * kg/kmol) = kg H2O/m3 / kg Aire/m3
            // Kg H2O / Kg Aire = Screen.SelectedHumidity / (Air.Density * Air.MolarMass)
            if(Screen.SelectedHumidity < 1.01){
                MassDensityAir = Air.Density * Air.MolarMass;
                aux=115;
                text('Humedad Relativa: ' + (Screen.SelectedHumidity*100).toFixed(1) + ' %', 10, aux);
                aux += 20;
                text('Humedad Absoluta: ' + (1000 * WaterOverMouse.DensityVapor / MassDensityAir).toFixed(3) + ' g agua / kg gas seco', 10, aux);
                aux += 20;
                text('Humedad Absoluta Volumetrica: ' + WaterOverMouse.DensityVapor.toFixed(3) + ' kg Agua/m3', 10, aux);
                aux += 20;
                text('Humedad Absoluta Molar: ' + (WaterOverMouse.DensityVapor / MassDensityAir * WaterOverMouse.MolarMass / Air.MolarMass * 100).toFixed(3) + '% mol agua / mol gas seco', 10, aux);
                aux += 20;
                text('Entalpia de Vaporización: ' + (WaterOverMouse.EnthalpyVaporization * WaterOverMouse.DensityVapor / MassDensityAir).toFixed(2) + ' kJ/kg', 10, aux); // KJ/kg H2O * kg H2O/m3 / kg Aire/m3
                aux += 20;
                text('Entropia de Vaporización: ' + (WaterOverMouse.EntropyVaporization * WaterOverMouse.DensityVapor / MassDensityAir).toFixed(2) + ' kJ/[kg K]', 10, aux); // KJ/kg H2O * kg H2O/m3 / kg Aire/m3
                aux += 20;
                text('Temperatura: ' + (WaterOverMouse.Temperature-273.15).toFixed(2) + ' °C', 10, aux);
                aux += 20;
                text('Presión: ' + Air.Pressure.toFixed(1) + ' kPa', 10, aux);
                aux += 20;
                text('Densidad: ' + MassDensityAir.toFixed(3) + ' kg/m3', 10, aux);
                aux += 20;
                text('Composición: ', 10, aux);
                aux += 20;
                WriteElementIfExist('Metano', 1);
                WriteElementIfExist('Nitrogeno', 2);
                WriteElementIfExist('Dioxido de carbono', 3);
                WriteElementIfExist('Etano', 4);
                WriteElementIfExist('Propano', 5);
                WriteElementIfExist('Isobutano', 6);
                WriteElementIfExist('n-Butano', 7);
                WriteElementIfExist('Isopentano', 8);
                WriteElementIfExist('n-Pentano', 9);
                WriteElementIfExist('Hexano', 10);
                WriteElementIfExist('Heptano', 11);
                WriteElementIfExist('Octano', 12);
                WriteElementIfExist('Nonano', 13);
                WriteElementIfExist('Decano', 14);
                WriteElementIfExist('Hidrogeno', 15);
                WriteElementIfExist('Oxígeno', 16);
                WriteElementIfExist('Monoxido de carbono', 17);
                WriteElementIfExist('Sulfuro de hidrogeno', 19);
                WriteElementIfExist('Helio', 20);
                WriteElementIfExist('Argón', 21);
                AnimationsOverTheMouse();
            }
        }
    }
    UploadTheInputs();
    webButtons[0].drawMe();
    webButtons[1].drawMe();
    webButtons[2].drawMe();
}
function UploadTheInputs(){
    Air.Pressure = UpdateComponent(inpPressure);
    Screen.tempMinSP = UpdateComponent(inpMinTemperarure);
    Screen.tempMaxSP = UpdateComponent(inpMaxTemperarure);
    Screen.densMinSP = UpdateComponent(inpMinDensity);
    Screen.densMaxSP = UpdateComponent(inpMaxDensity);
}
function AnimationsOverTheMouse(){
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
    text((Screen.SelectedHumidity*100).toFixed(1) + ' %', mouseX + 10, mouseY - 10);
    text((WaterOverMouse.Temperature-273.15).toFixed(2) + ' °C', mouseX + 10, Screen.YCanvas - 10);
    text(WaterOverMouse.DensityVapor.toFixed(3) + ' kg Agua/m3', Screen.XCanvas-108, mouseY - 10);
}
function UpdateComponent(ComponentOfDOM){
    if(ComponentOfDOM.value()==''){
        return 0;
    }
        return parseFloat(ComponentOfDOM.value());
}
function WriteElementIfExist(Name, Position){
    if (Air.x[Position]>0){
        text(Name + ': ' + (Air.x[Position]*100).toFixed(2) + ' %', 20, aux);
        aux += 20;
    }
}
function mousePressed(){
    webButtons[0].checkIfThisClickIsForMe();
    webButtons[1].checkIfThisClickIsForMe();
    webButtons[2].checkIfThisClickIsForMe();
}
class WebButton {
    constructor(position, picture_standby, picture_mouseover, picture_pressed){
        this.position=position;
        this.height = 0;
        this.width = 0;
        this.picture_standby = picture_standby;
        this.picture_mouseover = picture_mouseover;
        this.picture_pressed = picture_pressed;
        this.visible = true;
        this.activated = false;
        this.brothers = null;
        this.father = null;
        this.pressAndHold = false;
        this.favoriteSon = null;
        this.WhatShouldIDoAfterYouCallMe = null;
        this.AvoidDoubleClickProblemsOnMobiles = 0;
    }
    shouldIBeVisible(){
        if(this.father != null){
            if(this.father.activated && this.father.visible){
                this.visible=true;
                return;
            }
            this.visible=false;
        }
    }
    checkIfThisClickIsForMe(){
        if(this.AvoidDoubleClickProblemsOnMobiles == 0){
            if(mouseX > this.position[0] && mouseX < this.position[0] + this.width){
                if(mouseY > this.position[1] && mouseY < this.position[1] + this.height){
                    this.activateMe();
                }
            }
        }
    }
    activateMe(){
        if (Array.isArray(this.brothers)){
            for(let i = 0; i < this.brothers.length; i++){
                this.brothers[i].activated=false;
            }
        }else if(this.brothers != null){this.brothers.activated=false;}
        this.activated = !this.activated;
        this.activateMyFavoriteSon();
        if(this.WhatShouldIDoAfterYouCallMe != null){this.WhatShouldIDoAfterYouCallMe()}
        this.AvoidDoubleClickProblemsOnMobiles = 15;
    }
    activateMyFavoriteSon(){
        if (this.favoriteSon != null && this.activated == true){
            this.favoriteSon.activated=true;
            this.ShutUpMyNonFavoriteBrothers();
        }
    }
    ShutUpMyNonFavoriteBrothers(){
        if (Array.isArray(this.favoriteSon.brothers)){
            for(let i = 0; i < this.favoriteSon.brothers.length; i++){
                this.favoriteSon.brothers[i].activated=false;
            }
        return;
        }
        if(this.favoriteSon.brothers != null){
            this.favoriteSon.brothers.activated=false;
            return;
        }
    }
    drawMe(){
        if(this.pressAndHold){this.activated=false}
        if(this.AvoidDoubleClickProblemsOnMobiles>0){this.AvoidDoubleClickProblemsOnMobiles=this.AvoidDoubleClickProblemsOnMobiles-1}
        this.shouldIBeVisible();
        if (this.visible){
            this.height = this.picture_standby.height;
            this.width = this.picture_standby.width;
            if (this.activated==true){image(this.picture_pressed, this.position[0], this.position[1]);return}
            if(mouseX > this.position[0] && mouseX < this.position[0] + this.width){
                if(mouseY > this.position[1] && mouseY < this.position[1] + this.height){
                    if (mouseIsPressed){
                        image(this.picture_pressed, this.position[0], this.position[1]);return;                        
                    }
                    image(this.picture_mouseover, this.position[0], this.position[1]);return;
                }
            }
            image(this.picture_standby, this.position[0], this.position[1]);
        }
    }
}
function ButtonsConfiguration(){
    webButtons[0].pressAndHold = false; 
    webButtons[1].brothers = [webButtons[2]];
    webButtons[1].pressAndHold = true;
    webButtons[1].father = webButtons[0];
    webButtons[2].brothers = [webButtons[1]];
    webButtons[2].pressAndHold = true;
    webButtons[2].father = webButtons[0];
    webButtons[0].WhatShouldIDoAfterYouCallMe = function(){
        if(webButtons[0].activated){
            disappearTheDOMs(false);
        }else{
            disappearTheDOMs(true);
        }
        
    }
    webButtons[1].WhatShouldIDoAfterYouCallMe = function(){
        Air.x=Array(22).fill(0);
        FromXToDOMs();
    }
    webButtons[2].WhatShouldIDoAfterYouCallMe = function(){
        FromDOMsToX();
        FromXToDOMs();
    }
}

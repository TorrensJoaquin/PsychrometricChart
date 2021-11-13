function CreateTheXInputs(){
    let InitialX=240;
    let InitialY=225;
    let SeparationX=0;
    let SeparationY=23.75;
    let SizeOfInput=[31,13];
    let aux1=[InitialX,InitialY];

    inpMethane=createInput((x[1]*100).toString());          //1 - Methane
    inpMethane.size(SizeOfInput[0],SizeOfInput[1]);
    inpMethane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;

    inpNitrogen=createInput((x[2]*100).toString());         //2 - Nitrogen
    inpNitrogen.size(SizeOfInput[0],SizeOfInput[1]);
    inpNitrogen.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;   

    inpCarbonDioxide=createInput((x[3]*100).toString());    //3 - CarbonDioxide
    inpCarbonDioxide.size(SizeOfInput[0],SizeOfInput[1]);
    inpCarbonDioxide.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;

    inpEthane=createInput((x[4]*100).toString());           //4 - Ethane
    inpEthane.size(SizeOfInput[0],SizeOfInput[1]);
    inpEthane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;

    inpPropane=createInput((x[5]*100).toString());          //5 - Propane
    inpPropane.size(SizeOfInput[0],SizeOfInput[1]);
    inpPropane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;

    inpIsoButane=createInput((x[6]*100).toString());        //6 - IsoButane
    inpIsoButane.size(SizeOfInput[0],SizeOfInput[1]);
    inpIsoButane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;

    inpnButane=createInput((x[7]*100).toString());          //7 - nButane
    inpnButane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnButane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;

    inpIsopentane=createInput((x[8]*100).toString());       //8 - Isopentane
    inpIsopentane.size(SizeOfInput[0],SizeOfInput[1]);
    inpIsopentane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpnPentane=createInput((x[9]*100).toString());         //9 - nPentane
    inpnPentane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnPentane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpnHexane=createInput((x[10]*100).toString());         //10 - nHexane
    inpnHexane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnHexane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpnHeptane=createInput((x[11]*100).toString());        //11 - nHeptane
    inpnHeptane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnHeptane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpnOctane=createInput((x[12]*100).toString());         //12 - nOctane
    inpnOctane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnOctane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpnNonane=createInput((x[13]*100).toString());         //13 - nNonane
    inpnNonane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnNonane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpnDecane=createInput((x[14]*100).toString());         //14 - nDecane
    inpnDecane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnDecane.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpHydrogen=createInput((x[15]*100).toString());        //15 - Hydrogen
    inpHydrogen.size(SizeOfInput[0],SizeOfInput[1]);
    inpHydrogen.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpOxygen=createInput((x[16]*100).toString());          //16 - Oxygen
    inpOxygen.size(SizeOfInput[0],SizeOfInput[1]);
    inpOxygen.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpCarbonMonoxide=createInput((x[17]*100).toString());  //17 - CarbonMonoxide
    inpCarbonMonoxide.size(SizeOfInput[0],SizeOfInput[1]);
    inpCarbonMonoxide.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpHydrogenSulfide=createInput((x[19]*100).toString()); //19 - HydrogenSulfide
    inpHydrogenSulfide.size(SizeOfInput[0],SizeOfInput[1]);
    inpHydrogenSulfide.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpHelium=createInput((x[20]*100).toString());          //20 - Helium
    inpHelium.size(SizeOfInput[0],SizeOfInput[1]);
    inpHelium.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
    
    inpArgon=createInput((x[21]*100).toString());           //21 - Argon
    inpArgon.size(SizeOfInput[0],SizeOfInput[1]);
    inpArgon.position(aux1[0],aux1[1]);
    aux1[0]=aux1[0]+SeparationX;
    aux1[1]=aux1[1]+SeparationY;
}
function FromXToDOMs(){
    inpMethane.value((DryGas.x[1]*100).toString());
    inpNitrogen.value((DryGas.x[2]*100).toString());
    inpCarbonDioxide.value((DryGas.x[3]*100).toString());
    inpEthane.value((DryGas.x[4]*100).toString());
    inpPropane.value((DryGas.x[5]*100).toString());
    inpIsoButane.value((DryGas.x[6]*100).toString());
    inpnButane.value((DryGas.x[7]*100).toString());
    inpIsopentane.value((DryGas.x[8]*100).toString());    
    inpnPentane.value((DryGas.x[9]*100).toString());
    inpnHexane.value((DryGas.x[10]*100).toString());
    inpnHeptane.value((DryGas.x[11]*100).toString());
    inpnOctane.value((DryGas.x[12]*100).toString());
    inpnNonane.value((DryGas.x[13]*100).toString());
    inpnDecane.value((DryGas.x[14]*100).toString());
    inpHydrogen.value((DryGas.x[15]*100).toString());
    inpOxygen.value((DryGas.x[16]*100).toString());
    inpCarbonMonoxide.value((DryGas.x[17]*100).toString());
    inpHydrogenSulfide.value((DryGas.x[19]*100).toString());
    inpHelium.value((DryGas.x[20]*100).toString());
    inpArgon.value((DryGas.x[21]*100).toString());
}
function disappearTheDOMs(trueforyes){
    if (trueforyes){
        inpMethane.elt.style.visibility='hidden';
        inpNitrogen.elt.style.visibility='hidden';
        inpCarbonDioxide.elt.style.visibility='hidden';
        inpEthane.elt.style.visibility='hidden';
        inpPropane.elt.style.visibility='hidden';
        inpIsoButane.elt.style.visibility='hidden';
        inpnButane.elt.style.visibility='hidden';
        inpIsopentane.elt.style.visibility='hidden';    
        inpnPentane.elt.style.visibility='hidden';
        inpnHexane.elt.style.visibility='hidden';
        inpnHeptane.elt.style.visibility='hidden';
        inpnOctane.elt.style.visibility='hidden';
        inpnNonane.elt.style.visibility='hidden';
        inpnDecane.elt.style.visibility='hidden';
        inpHydrogen.elt.style.visibility='hidden';
        inpOxygen.elt.style.visibility='hidden';
        inpCarbonMonoxide.elt.style.visibility='hidden';
        inpHydrogenSulfide.elt.style.visibility='hidden';
        inpHelium.elt.style.visibility='hidden';
        inpArgon.elt.style.visibility='hidden';
        inpPressure.elt.style.visibility='visible';
        inpMinTemperarure.elt.style.visibility='visible';
        inpMaxTemperarure.elt.style.visibility='visible';
        inpMinDensity.elt.style.visibility='visible';
        inpMaxDensity.elt.style.visibility='visible';
    }else{
        inpMethane.elt.style.visibility='visible';
        inpNitrogen.elt.style.visibility='visible';
        inpCarbonDioxide.elt.style.visibility='visible';
        inpEthane.elt.style.visibility='visible';
        inpPropane.elt.style.visibility='visible';
        inpIsoButane.elt.style.visibility='visible';
        inpnButane.elt.style.visibility='visible';
        inpIsopentane.elt.style.visibility='visible';    
        inpnPentane.elt.style.visibility='visible';
        inpnHexane.elt.style.visibility='visible';
        inpnHeptane.elt.style.visibility='visible';
        inpnOctane.elt.style.visibility='visible';
        inpnNonane.elt.style.visibility='visible';
        inpnDecane.elt.style.visibility='visible';
        inpHydrogen.elt.style.visibility='visible';
        inpOxygen.elt.style.visibility='visible';
        inpCarbonMonoxide.elt.style.visibility='visible';
        inpHydrogenSulfide.elt.style.visibility='visible';
        inpHelium.elt.style.visibility='visible';
        inpArgon.elt.style.visibility='visible';
        inpPressure.elt.style.visibility='hidden';
        inpMinTemperarure.elt.style.visibility='hidden';
        inpMaxTemperarure.elt.style.visibility='hidden';
        inpMinDensity.elt.style.visibility='hidden';
        inpMaxDensity.elt.style.visibility='hidden';
    }
}
function FromDOMsToX(){
    DryGas.x[1]=UpdateComponent(inpMethane);
    DryGas.x[2]=UpdateComponent(inpNitrogen);
    DryGas.x[3]=UpdateComponent(inpCarbonDioxide);
    DryGas.x[4]=UpdateComponent(inpEthane);
    DryGas.x[5]=UpdateComponent(inpPropane);
    DryGas.x[6]=UpdateComponent(inpIsoButane);
    DryGas.x[7]=UpdateComponent(inpnButane);
    DryGas.x[8]=UpdateComponent(inpIsopentane);
    DryGas.x[9]=UpdateComponent(inpnPentane);
    DryGas.x[10]=UpdateComponent(inpnHexane);
    DryGas.x[11]=UpdateComponent(inpnHeptane);
    DryGas.x[12]=UpdateComponent(inpnOctane);
    DryGas.x[13]=UpdateComponent(inpnNonane);
    DryGas.x[14]=UpdateComponent(inpnDecane);
    DryGas.x[15]=UpdateComponent(inpHydrogen);
    DryGas.x[16]=UpdateComponent(inpOxygen);
    DryGas.x[17]=UpdateComponent(inpCarbonMonoxide);
    DryGas.x[19]=UpdateComponent(inpHydrogenSulfide);
    DryGas.x[20]=UpdateComponent(inpHelium);
    DryGas.x[21]=UpdateComponent(inpArgon);
    //Normalization
    let SumOfComponents=0;
    for(let i=1; i <= 21; i++){
        SumOfComponents=SumOfComponents+DryGas.x[i];
    }
    for(let i=1; i <= 21; i++){
        DryGas.x[i]=DryGas.x[i]/SumOfComponents;
    }
}
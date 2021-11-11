function CreateTheXInputs(){
    let InitialX=240;
    let InitialY=225;
    let SeparationX=0;
    let SeparationY=23.75;
    let SizeOfInput=[31,13];
    let aux=[InitialX,InitialY];

    inpMethane=createInput((x[1]*100).toString());          //1 - Methane
    inpMethane.size(SizeOfInput[0],SizeOfInput[1]);
    inpMethane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpNitrogen=createInput((x[2]*100).toString());         //2 - Nitrogen
    inpNitrogen.size(SizeOfInput[0],SizeOfInput[1]);
    inpNitrogen.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;   

    inpCarbonDioxide=createInput((x[3]*100).toString());    //3 - CarbonDioxide
    inpCarbonDioxide.size(SizeOfInput[0],SizeOfInput[1]);
    inpCarbonDioxide.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpEthane=createInput((x[4]*100).toString());           //4 - Ethane
    inpEthane.size(SizeOfInput[0],SizeOfInput[1]);
    inpEthane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpPropane=createInput((x[5]*100).toString());          //5 - Propane
    inpPropane.size(SizeOfInput[0],SizeOfInput[1]);
    inpPropane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpIsoButane=createInput((x[6]*100).toString());        //6 - IsoButane
    inpIsoButane.size(SizeOfInput[0],SizeOfInput[1]);
    inpIsoButane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpnButane=createInput((x[7]*100).toString());          //7 - nButane
    inpnButane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnButane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;

    inpIsopentane=createInput((x[8]*100).toString());       //8 - Isopentane
    inpIsopentane.size(SizeOfInput[0],SizeOfInput[1]);
    inpIsopentane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnPentane=createInput((x[9]*100).toString());         //9 - nPentane
    inpnPentane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnPentane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnHexane=createInput((x[10]*100).toString());         //10 - nHexane
    inpnHexane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnHexane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnHeptane=createInput((x[11]*100).toString());        //11 - nHeptane
    inpnHeptane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnHeptane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnOctane=createInput((x[12]*100).toString());         //12 - nOctane
    inpnOctane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnOctane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnNonane=createInput((x[13]*100).toString());         //13 - nNonane
    inpnNonane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnNonane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpnDecane=createInput((x[14]*100).toString());         //14 - nDecane
    inpnDecane.size(SizeOfInput[0],SizeOfInput[1]);
    inpnDecane.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHydrogen=createInput((x[15]*100).toString());        //15 - Hydrogen
    inpHydrogen.size(SizeOfInput[0],SizeOfInput[1]);
    inpHydrogen.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpOxygen=createInput((x[16]*100).toString());          //16 - Oxygen
    inpOxygen.size(SizeOfInput[0],SizeOfInput[1]);
    inpOxygen.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpCarbonMonoxide=createInput((x[17]*100).toString());  //17 - CarbonMonoxide
    inpCarbonMonoxide.size(SizeOfInput[0],SizeOfInput[1]);
    inpCarbonMonoxide.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHydrogenSulfide=createInput((x[19]*100).toString()); //19 - HydrogenSulfide
    inpHydrogenSulfide.size(SizeOfInput[0],SizeOfInput[1]);
    inpHydrogenSulfide.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpHelium=createInput((x[20]*100).toString());          //20 - Helium
    inpHelium.size(SizeOfInput[0],SizeOfInput[1]);
    inpHelium.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
    
    inpArgon=createInput((x[21]*100).toString());           //21 - Argon
    inpArgon.size(SizeOfInput[0],SizeOfInput[1]);
    inpArgon.position(aux[0],aux[1]);
    aux[0]=aux[0]+SeparationX;
    aux[1]=aux[1]+SeparationY;
}
function FromXToDOMs(){
    inpMethane.value((x[1]*100).toString());
    inpNitrogen.value((x[2]*100).toString());
    inpCarbonDioxide.value((x[3]*100).toString());
    inpEthane.value((x[4]*100).toString());
    inpPropane.value((x[5]*100).toString());
    inpIsoButane.value((x[6]*100).toString());
    inpnButane.value((x[7]*100).toString());
    inpIsopentane.value((x[8]*100).toString());    
    inpnPentane.value((x[9]*100).toString());
    inpnHexane.value((x[10]*100).toString());
    inpnHeptane.value((x[11]*100).toString());
    inpnOctane.value((x[12]*100).toString());
    inpnNonane.value((x[13]*100).toString());
    inpnDecane.value((x[14]*100).toString());
    inpHydrogen.value((x[15]*100).toString());
    inpOxygen.value((x[16]*100).toString());
    inpCarbonMonoxide.value((x[17]*100).toString());
    inpWater.value((x[18]*100).toString());
    inpHydrogenSulfide.value((x[19]*100).toString());
    inpHelium.value((x[20]*100).toString());
    inpArgon.value((x[21]*100).toString());
}
function disappearTheDOMs(trueforyes){
    let aux;
    if (trueforyes){aux='hidden'}else{aux='visible'}
    inpMethane.elt.style.visibility=aux;
    inpNitrogen.elt.style.visibility=aux;
    inpCarbonDioxide.elt.style.visibility=aux;
    inpEthane.elt.style.visibility=aux;
    inpPropane.elt.style.visibility=aux;
    inpIsoButane.elt.style.visibility=aux;
    inpnButane.elt.style.visibility=aux;
    inpIsopentane.elt.style.visibility=aux;    
    inpnPentane.elt.style.visibility=aux;
    inpnHexane.elt.style.visibility=aux;
    inpnHeptane.elt.style.visibility=aux;
    inpnOctane.elt.style.visibility=aux;
    inpnNonane.elt.style.visibility=aux;
    inpnDecane.elt.style.visibility=aux;
    inpHydrogen.elt.style.visibility=aux;
    inpOxygen.elt.style.visibility=aux;
    inpCarbonMonoxide.elt.style.visibility=aux;
    inpWater.elt.style.visibility=aux;
    inpHydrogenSulfide.elt.style.visibility=aux;
    inpHelium.elt.style.visibility=aux;
    inpArgon.elt.style.visibility=aux;
}
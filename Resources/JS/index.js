
// Demographics Card Creator

const patientLastname = document.getElementById('patientlastname');
const patientFirstname = document.getElementById('patientfirstname');
const patientDOB = document.getElementById('DOB');
const patientRAMQ = document.getElementById('RAMQ');
const patientLocalID = document.getElementById('LocalID');
const patientsexmale = document.getElementById('sexmale'); 
const patientsexfemale = document.getElementById('sexfemale'); 
const patientAge = document.getElementById('patientage');

const demoSubmitButton = document.getElementById('democardformsubmit');

const democardDiv = document.getElementById('democard');

const democardForm = document.getElementById('patientid');


demoSubmitButton.addEventListener('click', createDemoCard);

//Age calculator

// function calculate_age(DOB) {
//     const totalmsLived = Date.now() - DOB.getTime();
//     const age_dt = new Date(totalmsLived);
//     const age = Math.abs(age_dt.getUTCFullYear-1970);
//     return age;
// }


function createDemoCard(e) {
    e.preventDefault();
    const newChild = democardDiv.appendChild(document.createElement('li'));
    newChild.innerHTML = `Nom: ${patientLastname.value}`;
    const newChildTwo = democardDiv.appendChild(document.createElement('li'));
    newChildTwo.innerHTML = `Prénom: ${patientFirstname.value}`;
    const newChildThree = democardDiv.appendChild(document.createElement('li'));
    newChildThree.innerHTML = `DDN: ${patientDOB.value}`;
    const newChildThreepFive = democardDiv.appendChild(document.createElement('li'));
    newChildThreepFive.innerHTML = `Sexe: ${patientsexmale.checked ? "M" : "F"}`;
    const newChildThreepSix= democardDiv.appendChild(document.createElement('li'));
    newChildThreepSix.innerHTML = `Age: ${patientAge.value}`;
    const newChildFour = democardDiv.appendChild(document.createElement('li'));
    newChildFour.innerHTML = `RAMQ: ${patientRAMQ.value}`;
    const newChildFive = democardDiv.appendChild(document.createElement('li'));
    newChildFive.innerHTML = `No. Dossier: ${patientLocalID.value}`;
    democardForm.style.display = "none";
};


//Checkbox emphasis function

const unselectedOption = document.getElementsByClassName('unselectedoption');

for (i=0; i<unselectedOption.length; i++) {
    unselectedOption[i].addEventListener('click', emphasizeCheckedOption)
}

function emphasizeCheckedOption(e) {
    e.target.classList.toggle('emphasize');
}



// RCRI calculator

const RCRIcheckbox = document.getElementsByClassName('RCRIcheck');
const RCRISpan = document.getElementById('RCRIspan');
const RCRISpanTwo = document.getElementById('RCRIspanTwo');

for (i=0; i<RCRIcheckbox.length; i++) {
    RCRIcheckbox[i].addEventListener('click', calculateRCRI);
};

const hauterisqueCheckbox = document.getElementById('hauterisque');
const AVCCheckbox = document.getElementById('AVCcheckbox');
const MCASStentCheckbox = document.getElementById('plusque5ans');
const MCASPACCheckbox = document.getElementById('plusque10ans');
const ICCheckbox = document.getElementById('insuffisancecardiaque');
const DBITCheckbox = document.getElementById('dbit');
const CreatCheckbox = document.getElementById('creatRCRI');
const RCRIInterpretation = document.getElementById('RCRIInterpretation');

let RCRIscore = 0;
let highRiskPt = 0;
let AVCpt = 0;
let MCASpt = 0;
let ICpt = 0;
let DBITpt = 0;
let IRCpt = 0;

function calculateRCRI(e) {
    if (hauterisqueCheckbox.checked ==  true) {
        highRiskPt = 1; 
    } else { 
        highRiskPt = 0;
    }
    if (AVCCheckbox.checked == true) {
    AVCpt = 1;
    } else {
    AVCpt = 0;
    }
    
    if (MCASStentCheckbox.checked == true || MCASPACCheckbox.checked == true ) {
        MCASpt = 1;
    } else {
        MCASpt = 0;
    }
    
    if (ICCheckbox.checked == true) {
        ICpt = 1;
    } else {
        ICpt = 0;
    }
    
    if (DBITCheckbox.checked == true) {
        DBITpt = 1
    } else {
        DBITpt = 0;
    }
    
    if (CreatCheckbox.checked == true) {
        IRCpt = 1
    } else {
        IRCpt = 0;
    }
    RCRIscore = highRiskPt + AVCpt + MCASpt + ICpt + DBITpt + IRCpt;
    RCRISpan.innerHTML = ` ${RCRIscore}`;
    RCRISpanTwo.innerHTML = ` ${RCRIscore}`;
    
    switch (RCRIscore) {
        case 0:
            RCRIInterpretation.innerHTML = 'Risque éstimé de mortalité ou infarctus cardiaque dans les 30 jours après chirurgie = 3.9%'
          break;
        case 1:
            RCRIInterpretation.innerHTML = 'Risque éstimé de mortalité ou infarctus cardiaque dans les 30 jours après chirurgie = 6.0%'
        break;
        case 2:
            RCRIInterpretation.innerHTML = 'Risque éstimé de mortalité ou infarctus cardiaque dans les 30 jours après chirurgie = 10.1%'
        break;
        default:
            RCRIInterpretation.innerHTML = 'Risque éstimé de mortalité ou infarctus cardiaque dans les 30 jours après chirurgie = 15.0%'
        break;
      }
    return RCRIscore;
};

// CKD Epi 2021 GFR calculator

const DFGinput = document.getElementById('baselineGFR');
const creatInput = document.getElementById('baselinecreatinine');
const labDFGInput = document.getElementById("DFG");

creatInput.addEventListener('keypress', translateToDFG);

function translateToDFG(e) {
    let A;
    let B;
    let age = patientAge.value;
    let Scr = creatInput.value;
    let ScrNonSI = Scr/88.4;

    if (e.key === 'Enter') {
        if (patientsexmale.checked && ScrNonSI <= 0.9) {
            A = 0.9;
            B = -0.302;
        } else if (patientsexmale.checked && ScrNonSI > 0.9) {
            A = 0.9;
            B = -1.2;
        } else if (patientsexfemale.checked && ScrNonSI <= 0.7) {
            A = 0.7;
            B =  -0.241;
        } else if (patientsexfemale.checked && ScrNonSI > 0.7) {
            A = 0.7;
            B = -1.2;
        }
    }
    let GFR = patientsexfemale.checked ? 142 * (ScrNonSI/A)**B * 0.9938**age * 1.012 : 142 * (ScrNonSI/A)**B * 0.9938**age ; 
    console.log(`The patient's age = ${age}`);
    console.log(`Scr = ${Scr} and its value in non SI is ${Scr/88.4} (Should equal ${ScrNonSI})`)
    console.log(`A = ${A} and B = ${B} and the patient's sex is recorded here as ${patientsexmale.checked ? "M" : "F" }`);
    console.log(`The patient's GFR is = ${GFR.toFixed(2)}`);
    DFGinput.value = GFR.toFixed(2);
    labDFGInput.value = GFR.toFixed(2);

    if (creatInput.value >= 177) {
        CreatCheckbox.checked = true;
        calculateRCRI();
    } else {
        CreatCheckbox.checked = false;
        calculateRCRI();
    }
        
    return GFR;
}






// The Add Notes Function


    //PMH

const pmhul=document.getElementById("pmhul");
const submitatcdmed = document.getElementById('submitatcdmed');

submitatcdmed.addEventListener('click', addLiPMH);

function addLiPMH() { 
  const inp=document.getElementById("atcdmed");
  if(inp.value=="") alert("SVP ajouter des renseignements");
  else {
   pmhul.innerHTML+=`<li class="pmhli">${inp.value}<span class="removeli">\u00D7</span></li>`
   inp.value=""
  }
};

const atcdmed = document.getElementById("atcdmed");

atcdmed.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'  && atcdmed.value !=='' ) {
        pmhul.innerHTML += `<li class="pmhli">${atcdmed.value}<span class="removeli">\u00D7</span></li>`
        atcdmed.value ='';
    }});

pmhul.onclick=ev=>
  ev.target.tagName=="SPAN" 
  && ev.target.parentNode.tagName=="LI"
  && ev.target.parentNode.remove();


    //Valvulopathie subsection

const valvuloul=document.getElementById("valvuloul");
const submitvalvulo = document.getElementById('valvulosubmit');
const valvuloInput = document.getElementById('valvulotext');

submitvalvulo.addEventListener('click', addLiValvulo);

valvuloInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'  && valvuloInput.value !=='' ) {
        valvuloul.innerHTML += `<li class="valvuloli">${valvuloInput.value}<span class="removeli">\u00D7</span></li>`
        valvuloInput.value ='';
    }});

valvuloul.onclick=ev=>
  ev.target.tagName=="SPAN" 
  && ev.target.parentNode.tagName=="LI"
  && ev.target.parentNode.remove();


function addLiValvulo() { 
  const inp= valvuloInput;
  if(inp.value=="") alert("SVP ajouter des renseignements");
  else {
    valvuloul.innerHTML+=`<li class="vavuloli">${inp.value}<span class="removeli">\u00D7</span></li>`
   inp.value=""
  }

valvuloul.onclick=ev=>
  ev.target.tagName=="SPAN" 
  && ev.target.parentNode.tagName=="LI"
  && ev.target.parentNode.remove();
}

    // For the HPI section

const autressympt = document.getElementById('symptomespertinentesinput');
const submitautressympt = document.getElementById('symptomespertinentessubmit');
const autressymptdiv = document.getElementById('etatgenerale');


submitautressympt.addEventListener('click', addChildElementEG);

function addChildElementEG(e) {
    e.preventDefault();
    const newChild = autressymptdiv.appendChild(document.createElement('p'));
    newChild.innerHTML = autressympt.value;
}

//For allergy and intolerance section



const allul=document.getElementById("allul");
const allergiespertinentessubmit = document.getElementById('allergiespertinentessubmit');
const allergiesetintolerancespertinentes = document.getElementById('allergiesetintolerancespertinentes');

allergiespertinentessubmit.addEventListener('click', addLiAll);

function addLiAll() { 
  const inp=document.getElementById("allergiesetintolerancespertinentes");
  if(inp.value=="") alert("SVP ajouter des renseignements");
  else {
   allul.innerHTML+=`<li class="allli">${inp.value}<span class="removeli">\u00D7</span></li>`
   inp.value=""
  }
}

allergiesetintolerancespertinentes.addEventListener('keydown', (event) => {
    if (event.key === 'Enter'  && allergiesetintolerancespertinentes.value !=='' ) {
        allul.innerHTML += `<li class="allli">${allergiesetintolerancespertinentes.value}<span class="removeli">\u00D7</span></li>`
        allergiesetintolerancespertinentes.value ='';
    }});

allul.onclick=ev=>
  ev.target.tagName=="SPAN" 
  && ev.target.parentNode.tagName=="LI"
  && ev.target.parentNode.remove();

//Various dropdowns-upon-checkbox click


const highriskSurgDropdown = document.getElementById('surghauterisquedropdown');
const highriskSurgCheckbox = document.getElementById('hauterisque');

highriskSurgCheckbox.addEventListener('click', displayHRSurgDropdown);


function displayHRSurgDropdown(e) {
    highriskSurgDropdown.classList.toggle("hidden");
};

//Antiplaquettaires

const aplaqDropdown = document.getElementById('aplaqdropdowncontent');
const aplaqCheckbox = document.getElementById('antiplaq');

aplaqCheckbox.addEventListener('click', displayAplaqDropdown);


function displayAplaqDropdown(e) {
    aplaqDropdown.classList.toggle("hidden");
};

//Antiicoagulants

const anticoagDropdown = document.getElementById('anticoagdropdowncontent');
const anticoagCheckbox = document.getElementById('anticoag');

anticoagCheckbox.addEventListener('click', displayAnticoagDropdown);


function displayAnticoagDropdown(e) {
    anticoagDropdown.classList.toggle('hidden');
};

// IECA

const IECADropDown = document.getElementById('aceidropdowncontent');
const IECACheckbox = document.getElementById('acei');

IECACheckbox.addEventListener('click', displayIECADropdown );

function displayIECADropdown(e) {
    IECADropDown.classList.toggle('hidden');
}


// ARA

const ARBDropDown = document.getElementById('arbdropdowncontent');
const ARBCheckbox = document.getElementById('arb');

ARBCheckbox.addEventListener('click', displayARBDropdown );

function displayARBDropdown(e) {
    ARBDropDown.classList.toggle('hidden');
}

//DB Meds


const SGLTDropDown = document.getElementById('sgltdropdowncontent');
const SGLTCheckbox = document.getElementById('SGLT2');

SGLTCheckbox.addEventListener('click', displaySGLTDropdown );

function displaySGLTDropdown(e) {
    SGLTDropDown.classList.toggle('hidden');
}


// DB PMH


const DBDropDown = document.getElementById('dbdropdowncontent');
const DBCheckbox = document.getElementById('DBcheckbox');

DBCheckbox.addEventListener('click', displayDBDropdown );

function displayDBDropdown(e) {
    DBDropDown.classList.toggle('hidden');
}

// IRC PMH

const IRCDropDown = document.getElementById('IRCdropdowncontent');
const IRCCheckbox = document.getElementById('IRC');

IRCCheckbox.addEventListener('click', displayIRCDropdown );

function displayIRCDropdown(e) {
    IRCDropDown.classList.toggle('hidden');
}



// Arrythmie cardiaque

const arrythmieDropdown = document.getElementById('arrythmiecontentdiv');
const arrythmieCheckbox = document.getElementById('arrythmiecheckbox');

arrythmieCheckbox.addEventListener('click', displayArrythmieDropdown);


function displayArrythmieDropdown(e) {
    arrythmieDropdown.classList.toggle("hidden");
};


//MCAS and sublists

    //MCAS
const MCASDropdown = document.getElementById('MCASdropdowncontent');
const MCASCheckbox = document.getElementById('MCAScheckbox');

MCASCheckbox.addEventListener('click', displayMCASDropdown);


function displayMCASDropdown(e) {
    MCASDropdown.classList.toggle("hidden");
};

        //Stent

        const stentDropdown = document.getElementById('Stentdropdowncontent');
        const stentCheckbox = document.getElementById('Stent');

        stentCheckbox.addEventListener('click', displayStentDropDown);

        function displayStentDropDown(e) {
            stentDropdown.classList.toggle("hidden");
        }

        //PAC

        const PACDropdown = document.getElementById('PACdropdowncontent');
        const PACCheckbox = document.getElementById('PAC');

        PACCheckbox.addEventListener('click', displayPACDropDown);

        function displayPACDropDown(e) {
            PACDropdown.classList.toggle("hidden");
        }

// IC dropdown

const ICdropdown = document.getElementById('ICdropdowncontent');
// const ICCheckbox = document.getElementById('insuffisancecardiaque'); --- already exists above

ICCheckbox.addEventListener('click', displayICDropdown )

function displayICDropdown(e) {
    ICdropdown.classList.toggle("hidden");
};

// Valvulopathie Dropdown
 const valvuloCheckbox = document.getElementById('valvulocardiaque');
 const valvuloDropdown = document.getElementById('valvulodropdowncontent');

 valvuloCheckbox.addEventListener('click', displayValveDropdown );

 function displayValveDropdown(e) {
    valvuloDropdown.classList.toggle("hidden");
 };

//TEV dropdown


const TEVCheckbox = document.getElementById('TEV');
const TEVDropdown = document.getElementById('TEVDropdowncontent');

TEVCheckbox.addEventListener('click', displayTEVDropdown );

function displayTEVDropdown(e) {
    TEVDropdown.classList.toggle("hidden");
};

// SAHS dropdown

const SAHSDropdown = document.getElementById('SAHSdropdowncontent');
const SAHSCheckbox = document.getElementById('SAHScheckbox');

SAHSCheckbox.addEventListener('click', displaySAHSDropdown);


function displaySAHSDropdown(e) {
    SAHSDropdown.classList.toggle("hidden");
};


// Automating the medical order set logic

    //Epilepsie
const epilepsieCheckbox = document.getElementById('Épilepsie');
const epilepsieOrder = document.getElementById('epilepsieorder');

epilepsieCheckbox.addEventListener('click', displayLogicEpilepsie)

function displayLogicEpilepsie (e) {
    if (epilepsieCheckbox.checked == true) {
        epilepsieOrder.style.display = 'block';
    }   else {
        epilepsieOrder.style.display = 'none';
    }
};

    //Cardiology Section
    //PMP
const PMPCheckbox = document.getElementById('pacemaker');
const PMPOrder = document.getElementById('pmporder');

PMPCheckbox.addEventListener('click', displayLogicPMP)

function displayLogicPMP (e) {
    if (PMPCheckbox.checked == true) {
        PMPOrder.style.display = 'block';
    }   else {
        PMPOrder.style.display = 'none';
    }
};
    //Defib
const defibCheckbox = document.getElementById('defib');
const defibOrder = document.getElementById('defiborder');

defibCheckbox.addEventListener('click', displayLogicDefib)

function displayLogicDefib (e) {
    if (defibCheckbox.checked == true) {
        defibOrder.style.display = 'block';
    }   else {
        defibOrder.style.display = 'none';
    }
};

    //FA

const FACheckbox = document.getElementById('FA');
const FAOrder = document.getElementById('FAorder');
    
    FACheckbox.addEventListener('click', displayLogicFA)
    
    function displayLogicFA (e) {
        if (FACheckbox.checked == true) {
            FAOrder.style.display = 'block';
        }   else {
            FAOrder.style.display = 'none';
        }
    };
    //MPOC
    
const MPOCCheckbox = document.getElementById('MPOCcheckbox');
const MPOCOrder = document.getElementById('MPOCorder');

MPOCCheckbox.addEventListener('click', displayLogicMPOC)

function displayLogicMPOC (e) {
    if (MPOCCheckbox.checked == true) {
        MPOCOrder.style.display = 'block';
    }   else {
        MPOCOrder.style.display = 'none';
    }
};

//TEV

const TEVThreeMonthCheckbox = document.getElementById('TEVthreemonths');
const TEVThreeToTwelveMonthCheckBox = document.getElementById('TEVoneyear');

const TEV3monthOrder = document.getElementById('TEV3monthorder');
const TEV3to12MonthOrder = document.getElementById('TEV3to12MonthOrder');
const TEV3to12Coumadin = document.getElementById('TEVcoumadin');
const TEV3to12CoumadinAlt = document.getElementById('TEVcoumadinAlt');
const TEV3to12Naco = document.getElementById('TEVNaco');
const CoumadinRx = document.getElementById('Coumadin');
const RivaroxabanRx = document.getElementById('Rivaroxaban');
const ApixabanRx = document.getElementById('Apixaban');
const EdoxabanRx = document.getElementById('Edoxaban');
const DabigatranRx = document.getElementById('Dabigatran');

const TEVCheckBox = document.getElementsByClassName('TEVcheckbox');
for (i=0; i<TEVCheckBox.length; i++) {
    TEVCheckBox[i].addEventListener('click', displayLogicTEV );
}

function displayLogicTEV (e) {
    if (TEVThreeMonthCheckbox.checked === true) {
        TEV3monthOrder.style.display = 'block';
    }   else {
        TEV3monthOrder.style.display = 'none';
    }
    if (TEVThreeToTwelveMonthCheckBox.checked === true) {
        TEV3to12MonthOrder.style.display = "block";
        if (CoumadinRx.checked === true) {
                console.log('Couma checked')
                TEV3to12Coumadin.style.display = 'block';
                TEV3to12Coumadin.classList.toggle('emphasize');
                TEV3to12CoumadinAlt.style.display = "block";
                } 
            else if (RivaroxabanRx.checked === true) {
                    console.log('Riva checked')
                    TEV3to12Naco.style.display = 'block';
                    RivaroxabanRx.classList.toggle("emphasize");
                } 
            else if (ApixabanRx.checked === true) {
                console.log('Apix checked')
                TEV3to12Naco.style.display = 'block';
                ApixabanRx.classList.toggle('hidden');
                } 
            else if (EdoxabanRx.checked === true) {
                console.log('Edox checked')
                TEV3to12Naco.style.display = 'block';
                EdoxabanRx.classList.toggle('hidden');
                } 
            else if (DabigatranRx.checked === true) {
                console.log('Dabig checked')
                TEV3to12Naco.style.display = 'block';
                DabigatranRx.classList.toggle('hidden');
            } else {
                console.log('No antocoag');
            }
    }
}
    //SAHS appareille

    const SAHSAppCheckbox = document.getElementById('Apparéillé');
    const SAHSOrder = document.getElementById('SAHSorder');
    
    SAHSAppCheckbox.addEventListener('click', displayLogicSAHS )
    
    function displayLogicSAHS (e) {
        if (SAHSAppCheckbox.checked == true) {
            SAHSOrder.style.display = 'block';
        }   else {
            SAHSOrder.style.display = 'none';
        }
    };

    //Antiplatelet Logic
    

    const antiplateletCheckBox = document.getElementById('antiplaq');
    const antiplateletOrderSet = document.getElementById('AntiplateletRx');
    
    const AASCheckBox = document.getElementById('aas');
    const DAPT3MonthsCheckbox = document.getElementById('moinsque3mois');
    
    const AASOrderSetOne = document.getElementById('AAS1');
    const AASOrderSetTwo = document.getElementById('AAS2');
    const DAPT3MonthsOrderSet = document.getElementById('DAPT3Months');

    const minorSurgRiskCheckBox = document.getElementById('surgfaiblerisque');
    const stentThreetoTwelveMonths = document.getElementById('moinsque12mois');
    
    antiplateletCheckBox.addEventListener('click', displayLogicAntiplatelet);

    function displayLogicAntiplatelet(e) {
        if (antiplateletCheckBox.checked) {
            antiplateletOrderSet.style.display ='block';
        } else {
            antiplateletOrderSet.style.display ='none';
        };

        if (DAPT3MonthsCheckbox.checked) {
            DAPT3MonthsOrderSet.style.display = 'block';
            DAPT3MonthsOrderSet.classList.toggle('emphasize');
        } else {
            DAPT3MonthsOrderSet.style.display = 'none';
        }

        minorSurgRiskCheckBox.checked ? AASOrderSetTwo.style.display = 'block' : AASOrderSetTwo.style.display = 'none';
        minorSurgRiskCheckBox.checked ? AASOrderSetTwo.classList.toggle('emphasize') : null ;

        PeriphVascOption.selected ? AASOrderSetTwo.style.display = 'block' : AASOrderSetTwo.style.display = 'none';
        PeriphVascOption.selected ? AASOrderSetTwo.classList.toggle('emphasize') : null ;

        stentThreetoTwelveMonths.checked ? AASOrderSetTwo.style.display = 'block' : AASOrderSetTwo.style.display = 'none';
        stentThreetoTwelveMonths.checked ? AASOrderSetTwo.classList.toggle('emphasize') : null ;
 
}



//Arozullah Index Calculator


const ArozullahCheckbox = document.getElementById('arozullah');
const ArozullahCheckBoxTwo = document.getElementById('arozullahtwo');
const ArozullahIndexCalc = document.getElementById('arozullahdiv');

ArozullahCheckbox.addEventListener('click', displayTableArozullah );
ArozullahCheckbox.addEventListener('click', calculateArozullahScore );
ArozullahCheckBoxTwo.addEventListener('click', displayTableArozullah );

const OpenAAAOption = document.getElementById('RAAA');
const PeriphVascOption = document.getElementById('periphvasc');
const thoracicOption = document.getElementById('thoracic');

function displayTableArozullah (e) {
    if (ArozullahCheckbox.checked == true) {
        ArozullahIndexCalc.classList.toggle('hidden');
    } else if (arozullahtwo.checked == true) {
        ArozullahIndexCalc.classList.toggle('hidden');
    }
    MPOCCheckbox.checked ? ArozullahMPOCButton.checked = true : false;
    OpenAAAOption.selected ? ArozullahsurgRAAA.selected = true : false;
    PeriphVascOption.selected ? ArozullahsurgNeuro.selected = true : false;
    thoracicOption.selected ? ArozullahsurgThor.selected = true : false;
    if (patientAge.value < 60 && patientAge.value > 0) {
        Arozullahage59option.selected = true;
    } else if (patientAge.value > 70) {
        Arozullahage70option.selected = true;
    } else if (patientAge.value >= 60 && patientAge.value <= 70) {
        Arozullahage69option.selected = true;
    }
    calculateArozullahScore();
};


//Surg type option selector value display

//Option DOM selectors
const Arozullahsurgautre = document.getElementById('arozullahautre');
const ArozullahsurgORL = document.getElementById('arozullahORL');
const ArozullahsurgNeuro = document.getElementById('arozullahNeuro');
const ArozullahsurgThor = document.getElementById('arozullahThor');
const ArozullahsurgRAAA = document.getElementById('arozullahRAAA');

const ArozullahSurgValue = document.getElementById('arozullahsurgvalue');
const ArozullahAgeValue = document.getElementById('arozullaagepts');

const Arozullahoption = document.getElementsByClassName('arozullahoption');
const ArozullahAgeOption = document.getElementsByClassName('Arozullahageoption');

for (i=0; i<Arozullahoption.length; i++) {
    Arozullahoption[i].addEventListener('click', displayArozullahSurgValue)
    Arozullahoption[i].addEventListener('click', calculateArozullahScore)
};

for (i=0; i<ArozullahAgeOption.length; i++) {
    ArozullahAgeOption[i].addEventListener('click', displayArozullahAgeValue)
    ArozullahAgeOption[i].addEventListener('click', calculateArozullahScore)
};



function displayArozullahSurgValue(e) {
    e.preventDefault();
    if (Arozullahsurgautre.selected) {
        ArozullahSurgValue.innerHTML = 0;
    } else if (ArozullahsurgORL.selected) {
        ArozullahSurgValue.innerHTML = 11;
    } else if (ArozullahsurgNeuro.selected) {
        ArozullahSurgValue.innerHTML = 14;
    } else if (ArozullahsurgThor.selected) {
        ArozullahSurgValue.innerHTML = 21;
    } else if (ArozullahsurgRAAA.selected) {
        ArozullahSurgValue.innerHTML = 27; 
    }
}

function displayArozullahAgeValue(e) {
    e.preventDefault();
    if (Arozullahage69option.selected === true) {
        AroAge = 4;
    } else if (Arozullahage70option.selected === true) {
        AroAge = 6;
    } else if (Arozullahage59option.selected === true) {
        AroAge = 0;
    } else { 
        AroAge = 0;
    }
    ArozullahAgeValue.innerHTML = `${AroAge}`
};
// Arozullah External Button Linkages

const surgUrgent = document.getElementById('surgUrgent');
surgUrgent.addEventListener('click', linkUrgButton);

function linkUrgButton(e) {
    if (surgUrgent.checked = true) {
        ArozullahUrgButton.checked = true;
    } else {
        ArozullahUrgButton.checked = false;
    }
} 



//Arozullah Point Calculator

const Arozullahage59option = document.getElementById('arozullahage59');
const Arozullahage69option = document.getElementById('arozullahage69');
const Arozullahage70option = document.getElementById('arozullahage70');
const ArozullahMPOCButton = document.getElementById('arozullahmpoc');
const ArozullahAVQButton = document.getElementById('arozullahavq');
const ArozullahBunButton = document.getElementById('arozullahbun');
const ArozullahAlbButton = document.getElementById('arozullahalb');
const ArozullahUrgButton = document.getElementById('arozullahurg');

const ArozullahPtTot = document.getElementById('Arozullahpttot');

const ArozullahClassElem = document.getElementById('Arozullahclass');
const ArozullahRiskElem = document.getElementById('Arozullahrespperc');

const ArozullahButton = document.getElementsByClassName('arozullahbutton');
for (i=0; i<ArozullahButton.length; i++) {
    ArozullahButton[i].addEventListener('click', calculateArozullahScore)
};

function calculateArozullahScore() {
    let ArozullahScore = 0;
    let AroAge;
    let AroMPOC;
    let AroAVQ;
    let AroBUN;
    let AroAlb;
    let AroUrg;
    let AroSurg;

    if (Arozullahage69option.selected === true) {
        AroAge = 4;
    } else if (Arozullahage70option.selected === true) {
        AroAge = 6;
    } else if (Arozullahage59option.selected === true) {
        AroAge = 0;
    } else {
        AroAge = 0;
    }

    if (ArozullahMPOCButton.checked === true) {
        AroMPOC = 6;
    } else {
        AroMPOC = 0;
    }

    if (ArozullahAVQButton.checked === true) {
        AroAVQ = 7;
    } else {
        AroAVQ = 0;
    }

    if (ArozullahBunButton.checked === true) {
        AroBUN = 8;
    } else {
        AroBUN = 0;
    }

    if (ArozullahAlbButton.checked === true) {
        AroAlb = 8;
    } else {
        AroAlb = 0;
    }

    if (ArozullahUrgButton.checked === true) {
        AroUrg = 11;
    } else {
        AroUrg = 0;
    }

    if (Arozullahsurgautre.selected === true) {
        AroSurg = 0;
    } else if (ArozullahsurgORL.selected === true) {
        AroSurg = 11;
    } else if (ArozullahsurgNeuro.selected === true) {
        AroSurg = 14;
    } else if (ArozullahsurgThor.selected === true) {
        AroSurg = 21;
    } else if (ArozullahsurgRAAA.selected === true) {
        AroSurg = 27;
    };

    ArozullahScore = AroAge + AroMPOC + AroAVQ + AroBUN + AroAlb + AroUrg + AroSurg;
    let ArozullahClass = 1;

    if (ArozullahScore < 11) {
        ArozullahClass = 1;
        ArosullahRiskPerc ="0.5%"
    } else if (ArozullahScore >= 11 && ArozullahScore < 20) {
        ArozullahClass = 2;
        ArosullahRiskPerc = "1.8%"
    } else if (ArozullahScore >= 20 && ArozullahScore < 28) {
        ArozullahClass = 3;
        ArosullahRiskPerc ="4.2%"
    } else if (ArozullahScore >= 28 && ArozullahScore < 40) {
        ArozullahClass = 4;
        ArosullahRiskPerc = "10.1%"
    } else {
        ArozullahClass = 5;
        ArosullahRiskPerc ="26.6%"
    };


    
    ArozullahClassElem.innerHTML= `${ArozullahClass}`
    ArozullahPtTot.innerHTML = `${ArozullahScore}`;
    ArozullahRiskElem.innerHTML = `${ArosullahRiskPerc}`
    return ArozullahScore, ArozullahClass;
}



// Automating the display of the current date at bottom

const datediv = document.getElementById('currentdate');
currentDate = new Date();

datediv.innerHTML = `Date: ${currentDate}`;


//Print Order Set -

const printOrderPtID = document.getElementById("democard").childNodes;
const printOrderContents = document.getElementById("printorder").innerHTML; 
const modTherapContents = document.getElementById('modtherap').childNodes;
const signatureDateContents = document.getElementById('signaturedate').childNodes;

const printOrderButton = document.getElementById('printorderbutton');
printOrderButton.addEventListener('click', printOrder);

function printOrder() { 
    let a = window.open('', '', 'height=500, width=500'); 
    a.document.write('<!DOCTYPE html><html>'); 
    a.document.write('<body > <h1>Ordonnance Médicale </h1> <br>'); 
    for (i=0; i<printOrderPtID.length; i++) {
        a.document.write(printOrderPtID[i].innerHTML); 
        a.document.write('<br>');
    };
    a.document.write(printOrderContents)
    // for (i=0; i<modTherapContents.length; i++) {
    //     if (modTherapContents[i].style.display = "block")   {
    //         a.document.write(modTherapContents[i].innerHTML); 
    //         a.document.write('<br>');
    // };
    a.document.write('<p>Signature:  </p><br>')
    a.document.write(`${datediv.innerHTML}`);
    a.document.write('</body></html>'); 
    a.document.close(); 
    a.print(); 
};
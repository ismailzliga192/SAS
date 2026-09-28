const prompt= require('prompt-sync')();
const candidates=[ { id: "AB123456", lastName: "Boushaba", firstName: "Soufiane", politicalParty: "Independent", age: 40,
    voters: [] },
  { id: "CD234567", lastName: "El Amrani", firstName: "Fatima Zahra", politicalParty: "PJD", age: 35,
    voters: ["AB123456", "GH456789", "KL678901"] },
  { id: "EF345678", lastName: "Chraibi", firstName: "Younes", politicalParty: "RNI", age: 45,
    voters: [] },
  { id: "GH456789", lastName: "Bennani", firstName: "Salma", politicalParty: "PAM", age: 29,
    voters: ["IJ567890"] },
  { id: "IJ567890", lastName: "Ouahbi", firstName: "Karim", politicalParty: "Istiqlal", age: 52,
    voters: [] },
  { id: "KL678901", lastName: "Ziani", firstName: "Nadia", politicalParty: "Independent", age: 33,
    voters: [] },
  { id: "MN789012", lastName: "Tazi", firstName: "Hamza", politicalParty: "USFP", age: 60,
    voters: ["QR901234"] },
  { id: "OP890123", lastName: "Idrissi", firstName: "Meryem", politicalParty: "PJD", age: 27,
    voters: [] },
  { id: "QR901234", lastName: "Berrada", firstName: "Omar", politicalParty: "RNI", age: 38,
    voters: ["CD234567", "EF345678", "MN789012"] },
  { id: "ST012345", lastName: "Fassi", firstName: "Khadija", politicalParty: "PAM", age: 31,
    voters: [] }]

//Menu
console.log("===========MENU==========")
let menu=""
//Call Function
while(true){
    console.log("0.Exit")
    console.log("1.Display")
    console.log("2.Add")
    console.log("3.VotersNumber")
    console.log("4.Edit")
    console.log("5.Search")
    console.log("6.Delete")
    console.log("7.ElectionStatus")
    let n=Number(prompt("Choice"))
switch(n){
    case 1:
        Display(candidates)
        continue
    case 2:
        AddNewCandidate(candidates)
        continue
    case 3:
        VotersNumber(candidates)
        continue
    case 4:
         EditCandidateInfo(candidates)
         continue
    case 5:
         SearchofCandidate(candidates)
         continue
    case 6:
        DeleteofCandidate(candidates)
        continue
    case 7:
        ElectionStatistiques(candidates)
        continue
    case 0:
        process.exit(0)

    default:
    console.log("invalid choice")
     }
    
}

// Add a Number of candidates
function AddNewCandidate(candidateArr){
    let candidate_n=Number(prompt("Candidate Number:"))
    for(let i=0;i<candidate_n;i++){
        Candidateinfo(candidateArr)
    }
}
//candidate info
 function Candidateinfo(candidateArr){
  let id = prompt("id:")
  let lastName = prompt("lastName:")
  let firstName = prompt("firstName:")
  let politicalParty=prompt("politicalParty:")
  if(politicalParty.trim()==""){
    politicalParty ="independent"
  }
  let age=Number(prompt("age:"))
 
  let c={
    id:id,
    lastName:lastName,
    firstName:firstName,
    politicalParty:politicalParty,
    age:age,
    voters:[]
  }
  candidateArr.push(c)
 } 

 //Type d'affichage
function Display(candidateArr) {

    console.log("\n===== DISPLAY TYPE =====");
    console.log("1. Normal list");
    console.log("2. By Political Party");

    let aff = prompt("Choose the display type: ");

    if (aff == 1) {

        DisplayListOfCandidates(candidateArr);

    } else if (aff == 2) {

        DisplayListbypoliticalParty(candidateArr);

    } else {

        console.log("Invalid display type.");
    }
}


// Display the list of candidates
function DisplayListOfCandidates(candidateArr) {

    let sort = SortbyHVoters(candidateArr);

    for (let i = 0; i < sort.length; i++) {

        let cand = sort[i];

        console.log("* Candidate", i + 1);
        console.log("id:", cand.id);
        console.log("lastname:", cand.lastName);
        console.log("firstName:", cand.firstName);
        console.log("politicalParty:", cand.politicalParty);
        console.log("age:", cand.age);
        console.log("voters:", cand.voters.length);
        console.log("---------------------------");
    }
}


// Display the list of candidates by Political Party
function DisplayListbypoliticalParty(candidateArr) {

    let PP = prompt("Political Party:");

    let PFilter = candidateArr.filter(
        C => C.politicalParty.toLowerCase() === PP.toLowerCase()
    );

    // Sort candidates from highest to lowest voters
    let sort = SortbyHVoters(PFilter);

    for (let i = 0; i < sort.length; i++) {

        let cand = sort[i];

        console.log("* Candidate", i + 1);
        console.log("id:", cand.id);
        console.log("lastname:", cand.lastName);
        console.log("firstName:", cand.firstName);
        console.log("politicalParty:", cand.politicalParty);
        console.log("age:", cand.age);
        console.log("voters:", cand.voters.length);
        console.log("---------------------------");
    }
}


// Bubble sort: highest number of voters first
function SortbyHVoters(candidateArr) {

    // Make a copy so the original array is not changed
    let Copy = [...candidateArr];

    for (let i = 0; i < Copy.length - 1; i++) {

        for (let j = 0; j < Copy.length - 1 - i; j++) {

            if (Copy[j].voters.length < Copy[j + 1].voters.length) {

                let high = Copy[j];

                Copy[j] = Copy[j + 1];

                Copy[j + 1] = high;
            }
        }
    }

    return Copy;
}

//Number of Voters
function VotersNumber(candidateArr){
    let Vn=Number(prompt("Voters Number:"))
    for(let j=0;j<Vn;j++){
        VotersInfo(candidateArr)
    }
}
//Voters info
function VotersInfo(candidateArr) {
    let v = prompt("Vid:");

    let alreadyVoted = candidateArr.some(C => C.voters.includes(v));

    if (!alreadyVoted) {
        let Cid = prompt("Candidateid:");

        for (let C of candidateArr) {
            if (C.id == Cid) {
                C.voters.push(v);
                break;
            }
        }
    } else {
        console.log("This voter has already voted.");
    }
}
//Edit candidate info
function EditCandidateInfo(candidateArr){
 let id=prompt("candidateID:")
 for(let cand of candidateArr){
    if(cand.id==id){
 console.log("======EDIT CANDIDATE:======")
 console.log("1.Edit By PoliticalParty.")
 console.log("2.Edit By Age.")
 let ED=prompt("Choose:")
 if(ED==1){
    let newP=prompt("Enter a new Political Party:")
    cand.politicalPart=newP
    console.log("PoliticalParty has been updated.")
    }else if(ED==2){
        let newAge=prompt("Enter a new Age:")
        cand.age=newAge
        console.log("The Age has been updated.")
        console.log(cand)
    }else{
        console.log("invalid Choice.")
    }
}
}

}
//Delete a candidate
function DeleteofCandidate(candidateArr){
    let id=prompt("candidateID:")
    for(let cand of candidateArr){
    if(cand.id==id){
       index=candidateArr.indexOf(cand)
       candidateArr.splice(index, 1)
       console.log("done")
      }
    }
}
//Search for candidate
function SearchofCandidate(candidateArr){
    let search=prompt("candidate lastname:")
    for(let candidate of candidateArr){
        if(candidate.lastName.toLowerCase()==search.toLowerCase()){
            console.log(candidate)
        }
    }
}
//Display Of Statistiques
function ElectionStatistiques(candidateArr){
     console.log("==========Total============")
    let can_sum=candidateArr.length
     console.log("The Total Number Of Candidates is: ",can_sum)
     let voters_count=0
     for(let i of candidateArr){
        voters_count+=i.voters.length
        
     }
     console.log("The total number of votes cast in the entire election is:",voters_count)
    console.log("===========3Top============")
     let  highest=[]
     highest= SortbyHVoters(candidateArr)
     console.log("First :", highest[0])
     console.log( "Second :",highest[1])
     console.log( "Third :",highest[2])
     
     
     console.log("===========THE NUMBER OF CONDIDATE PER POLITICAL PARTY============")
     
     let Cparty={}
     for(let candidate of candidateArr){
    let P=candidate.politicalParty
    if(Cparty[P]){
        Cparty[P]++
    }else{
        Cparty[P] =1
    }
     }
     for(let P in Cparty){
        console.log(`${P}: ${Cparty[P]}`)
     }
    
}


    




// TODO: Modify this function
/*

Logic of encrypting and decrypting of docket was reducing extensive information such as e.g time and compressing it into smaller length of strings and
different characters. The docket is made up of a string of 9 characters:
.   1 character for year 
.   3 characters for date 
.   5 characters for transactionID
This is made up of lowercase and uppercase letters and unicode of UTF-16. 

*/
function generateShortCode(storeId, transactionId) {
    // Logic goes here
    //get date
    let date=new Date();
    /*
    Format date to localDateString for a simpleification of when the transaction was made
    */
    // format date to 01/01/21
    let formatDate=date.toLocaleDateString().toString();
    //encode information
    let store=encodeStore(storeId);
    let encodeDay=encodeDate(formatDate);
    let encodeRecp=encodeTrans(transactionId);
   
    return store+encodeDay+encodeRecp;

}
/*
Encode storeID in 1 character through unicode UTF-16 from a range of 512-712
*/
function encodeStore(id){
    id=id+512;
    let result=id.toString();
    let encodeId="";
 //   console.log(result);
     encodeId=String.fromCharCode(result);
   // console.log(encodeId.charCodeAt(0));
   return encodeId;
}
/*
Encode date into a 3 character string 
day-unicode from 64-95. 1-31
month-undercase letter from a-l
year-unicode from a start range of 512
*/
function encodeDate(date){
    // turn date into string and split into array
    let strDate=date.toString();
    let split=strDate.split("/");
    if(split.length<2||split.length>2){
    split[0]=dayEncode(split[0]);
    split[1]=monthEncode(split[1]);
    split[2]=encodeYear(split[2]);
    }
    let result =split.join('');
 
    return result;
}
   //encode day by unicode 
   function dayEncode(day){
    let convert=Number(day);
    let sum=convert+64;
    return String.fromCharCode(sum.toString());
}

// encode month
function monthEncode(month){
let monthEncode =['a','b','c','d','e','f','g','h','i','j','k','l'];
// minus month for accurate index position of monthEncode
month=month-1;
for(var i=0; i<monthEncode.length; i++){
    if(month==i){
        return monthEncode[i];
    }
}
}
// Encode year 
function encodeYear(year){
let convert=year.substr(2).valueOf();
convert=Number(convert)+512;
//let encode=String.fromCharCode(convert);
return String.fromCharCode(convert);;
}
/*
transactionID encoded is made up of a length of 5
Upper-case letters is used for ID
Lower-case letters is used for fill if the length is less than 5
*/
function encodeTrans(recpId){
    let usedEncode=['A','B','C','D','E','F','G','H','I','J'];
    let fakeEncode=['a','b','c','d','e','f','g','h','i','j'];
    // Encoded ID output
    var encodedId=[];
    // turns input into array 
    recpId=recpId.toString();
    let transaction=recpId.split("");

    //encrypt transactionID
    for(var x=0; x<transaction.length; x++){
        // get value and deduct by 1
        var value=Number(transaction[x])-1;
        //if value is less than 0 change to 0
        if(value<0){
            value=0;
        }
        // point to usedEncode array index and adds to encodedId array
     for(var i=0; i<usedEncode.length; i++){
         if(value==i){
             encodedId.push(usedEncode[i]);
         }
     }
    }

    // if the transactionID encrypted less than 5 in length it fills up the rest with random lower-case letters
     if(encodedId.length<5){
        for(var b=0; b<encodedId.length; b++){
            if(encodedId.length!=5){
                // get index of random letter from fakeEncode and push into encoded
                var randomFakeIndex=Math.floor(Math.random()*fakeEncode.length);
                var element=fakeEncode[randomFakeIndex];
                encodedId.push(element);
            }
        }
     }
        return encodedId.join('');
        
}


// TODO: Modify this function
function decodeShortCode(shortCode) {
    // Logic goes here
   
    // decode information of shortcode string
    let getStoreID=decodeStore(shortCode.substr(0,1));
    let getDate=decodeDate(shortCode.substr(1,3));
    let getTransaction=decodeTransaction(shortCode.substr(4));
    // get current date and check if they match and return the current date if they match
    var currentDate=new Date();
    var year=currentDate.getFullYear().toString();
    year=year.substr(2);
    var matchDate=currentDate.getDate()+"/"+currentDate.getMonth()+"/"+year;
    let checkDate=matchDates(getDate,matchDate)
   
    
    return {
        storeId: getStoreID, // store id goes here,
        shopDate: checkDate, // the date the customer shopped,
        transactionId: Number(getTransaction), // transaction id goes here
    };

    // check if the current date and retrieve decoded date matches 
    function matchDates(retrieved,current){
        if(retrieved.toString()==current.toString()){
            return currentDate;
        }
        return retrieved;
    }
}
// decode storeID
function decodeStore(store){
    let decode=store.charCodeAt(0);
    decode=decode-512;
    return decode;
}
// decode date
function decodeDate(date){
    if(date.length==3){
    let split=date.split('');
    let day=decodeDay(split[0]);
    let month=monthDecode(split[1]);
    let year=decodeYear(split[2]);
    return day+ "/"+month+"/"+year;
    }
    
}

function decodeDay(day){
    let decode=day.charCodeAt(0);
    let convert=Number(decode);
    var sum=convert-64;
    return sum;
}
function monthDecode(month){
    let monthEncode =['a','b','c','d','e','f','g','h','i','j','k','l'];
    var count=0;
    for(var i=0; i<monthEncode.length; i++){
        if(month==monthEncode[i]){
            return count;
        }
        count++;
    }
    }
    function decodeYear(year){
        let decode=year.charCodeAt(0);
        convert=decode-512;
      
        return convert;
        }
        // deocode transactionID
        function decodeTransaction(transaction){
            var split=transaction.split('');
            var decrypted=[];
            //remove fake encode
            for(var a=0; a<split.length; a++){
                if(checkLetter(split[a])){
                    split.splice(a,1);
                    a=a-1;
                }
             
            }
       
       // decrypt transactionID
            for(var b=0; b<split.length; b++){
                var number=getPosition(split[b]);
                number=Number(number)+1;
                decrypted.push(number);
           
            }
                return decrypted.join('');
        }

        // check if it's undercase letter
        function checkLetter(letter){
            let fakeEncode=['a','b','c','d','e','f','g','h','i','j'];
            for(var i=0; i<fakeEncode.length; i++){
                if(fakeEncode[i]==letter){
                    return true;
                }
            }
            return false;
        }
        // return index position of usedeEncode array 
        function getPosition(letter){
            let usedEncode=['A','B','C','D','E','F','G','H','I','J'];
                return usedEncode.indexOf(letter);
                
        }

// ------------------------------------------------------------------------------//
// --------------- Don't touch this area, all tests have to pass --------------- //
// ------------------------------------------------------------------------------//
function RunTests() {

    var storeIds = [175, 42, 0, 9]
    var transactionIds = [9675, 23, 123, 7]

    storeIds.forEach(function (storeId) {
        transactionIds.forEach(function (transactionId) {
            var shortCode = generateShortCode(storeId, transactionId);
            var decodeResult = decodeShortCode(shortCode);
            $("#test-results").append("<div>" + storeId + " - " + transactionId + ": " + shortCode + "</div>");
            AddTestResult("Length <= 9", shortCode.length <= 9);
            AddTestResult("Is String", (typeof shortCode === 'string'));
            AddTestResult("Is Today", IsToday(decodeResult.shopDate));
            AddTestResult("StoreId", storeId === decodeResult.storeId);
            AddTestResult("TransId", transactionId === decodeResult.transactionId);
        })
    })
}

function IsToday(inputDate) {
    // Get today's date
    var todaysDate = new Date();
    // call setHours to take the time out of the comparison
    return (inputDate.setHours(0, 0, 0, 0) == todaysDate.setHours(0, 0, 0, 0));
}

function AddTestResult(testName, testResult) {
    var div = $("#test-results").append("<div class='" + (testResult ? "pass" : "fail") + "'><span class='tname'>- " + testName + "</span><span class='tresult'>" + testResult + "</span></div>");
}
// List of acceptable characters
//let set = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789.,?!- '\"~@#$%^&*(){}[];:<>/\\";

// Scrambled list of acceptable characters
let set = "1adQqD@(~'jk0s6L5!bvc,?2TViOKPyz[>^:]lR3EnpUS.tGCY-x9w&};%\"huZWIfgMm4HFBrJeNAX78o*<{\\/)$`Ø";

// Decode funtion
function decode(data) {
  let shift=data.time.replace(':','');
  let index=-1;
  let decoded="";
  for(let i=0;i<data.message.length;i++){
    for(let j=0;j<set.length;j++){
      if(data.message[i]==set[j]){
        index++;
        if(index==4)index=0;
        let newIndex=(j-parseInt(shift[index]));
        if(newIndex<0)newIndex=newIndex+set.length;
        decoded=decoded+set[newIndex];
      }
    }
  }
  decoded=decoded.replace(/Ø/g,' ');
  return {message:decoded,date:data.date,time:data.time};
}

// Encode Function
function encode(message) {
  message=message.toLocaleString();
  message=message.replace(/ /g,'Ø');
  let date=new Date();
  let hour=date.toLocaleString('en-US',{hour:'numeric',hour12:false});
  let minute=date.toLocaleString('en-US',{minute:'numeric'});
  if(hour<10)hour='0'+hour;
  if(minute<10)minute='0'+minute;
  let shift=hour+minute;
  let index=-1;
  let encoded="";
  for(let i=0;i<message.length;i++){
    for(let j=0;j<set.length;j++){
      if(message[i]==set[j]){
        index++;
        if(index==4)index=0;
        let newIndex=(j+parseInt(shift[index]));
        if(newIndex>set.length-1)newIndex=newIndex-set.length;
        encoded=encoded+set[newIndex];
      }
    }
  }
  let dd=date.getDate();
  let mm=date.getMonth()+1; 
  let yyyy=date.getFullYear();
  if(dd<10)dd='0'+dd;
  if(mm<10)mm='0'+mm;
  let today=yyyy+'-'+mm+'-'+dd;
  return {message:encoded,date:today,time:`${hour}:${minute}`};
}

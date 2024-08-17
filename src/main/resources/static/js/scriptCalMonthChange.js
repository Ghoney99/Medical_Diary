window.onload= function() { buildCalendar(); }

let nowMonth= new Date();
let today= new Date();
today.setHours(0,0,0,0);

function buildCalendar(){
    let firstDate= new Date(nowMonth.getFullYear(), nowMonth.getMonth(), 1);
    let lastDate= new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1, 0)

    let tbodyCal= document.querySelector("#tableCalendar > tbody");
    document.getElementById("calYear").innerText= nowMonth.getFullYear();
    document.getElementById("calMonth").innerText= leftPad(nowMonth.getMonth()+1);

    while(tbodyCal.rows.length>0){
        tbodyCal.deleteRow(tbodyCal.rows.length - 1);
    }

    let nowRow= tbodyCal.insertRow();

    for(let i=0; i<firstDate.getDay(); i++){
        let nowCol= nowRow.insertCell();
    }

    for(let nowDay=firstDate; nowDay<=lastDate; nowDay.setDate(nowDay.getDate()+1)){
        let nowCol= nowRow.insertCell();

        let newDiv= document.createElement("span");
        newDiv.innerHTML= leftPad(nowDay.getDate());
        nowCol.appendChild(newDiv);
        if(nowDay.getDay()==0){
            newDiv.classList.add('sunday')
        }
        if(nowDay.getDay()==6){
            newDiv.classList.add('saturday');
            nowRow= tbodyCal.insertRow();
        }
        if (nowDay.getFullYear() == today.getFullYear() && nowDay.getMonth() == today.getMonth() && nowDay.getDate() == today.getDate()) {
            newDiv.className= "today";
            newDiv.onclick= function(){
                choiceDate(this);
            }
        }
        else {
            newDiv.className = "otherDay";
            newDiv.onclick = function () { choiceDate(this); }
        }
    }

    let printMsg = "NO DATE SELECTED";
    document.getElementById('divCalendarInfoYear').innerHTML = printMsg;
}

/*================================*/
/*Month, Date 두 자리수로 표현*/
/*================================*/
function leftPad(n){
    if (n<10){
        n= "0"+n;
        return n;
    }
    return n;
}

/*================================*/
/*Date 선택시*/
/*---1.선택한 날짜 출력*/
/*---2.선택한 날짜를 포함한 값의 행에 show 클래스 부여*/
/*================================*/
function choiceDate(newDiv) {
    if (document.getElementsByClassName("choiceDay")[0]) {
        document.getElementsByClassName("choiceDay")[0].classList.remove("choiceDay");
    }
    newDiv.classList.add("choiceDay");

    let printYear = document.getElementById("calYear").innerText
    document.getElementById('divCalendarInfoYear').innerHTML = printYear;
    let printDate = document.getElementById("calMonth").innerText + " . " +newDiv.innerHTML
    document.getElementById('divCalendarInfoDate').innerHTML = printDate;

    let temp = document.getElementById("calYear").innerText + "-" +document.getElementById("calMonth").innerText + "-" +newDiv.innerHTML
    document.getElementById("pCalendarTempDate").innerText = temp

    let countTr = Number(document.getElementById("pCalendarTempNumber").innerText)
    var table = document.getElementById("tableCalendarInfo")

    for(let i=0; i<countTr; i++){
        let trId = "tr"+i
        document.getElementById(trId).classList.remove("show")

        let tr_startDate = document.getElementById(trId).cells[1].innerText
        let tr_finishDate = document.getElementById(trId).cells[2].innerText

        let compareDate = document.getElementById("pCalendarTempDate").innerText

        if(compareDate >= tr_startDate && compareDate <= tr_finishDate){
            document.getElementById(trId).classList.add("show")
            console.log("yes!")
        }
    }
}

function calPrev(){
    nowMonth= new Date(nowMonth.getFullYear(), nowMonth.getMonth()-1,nowMonth.getDate())
    buildCalendar();
}

function calNext(){
    nowMonth= new Date(nowMonth.getFullYear(), nowMonth.getMonth()+1,nowMonth.getDate())
    buildCalendar();
}
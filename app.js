var massBooks = [];
var massVisitors = [];

addBookBtn.onclick = function(){
    if((bookName.value != "") && (bookYear.value != "")){
        var objBook = {};
        
            if(!massBooks.length){
                objBook.ID = 1;
            }
            else{
                objBook.ID = massBooks[massBooks.length-1].ID + 1;
            }
        
            objBook.Name = bookName.value;
            objBook.Year = bookYear.value;
            objBook.Booking = false;
        
            massBooks.push(objBook);
            document.getElementById("bookList").innerHTML += "<input type='checkbox' name='bookBox'><span>"+objBook.ID+". "+
                objBook.Name+" - "+objBook.Year+" - Не забронировано</span><br/>";
        
            document.getElementById("bookName").value = "";
            document.getElementById("bookYear").value = "";
    }
}

delBookBtn.onclick = function(){
    var checkedBooks = document.getElementsByName('bookBox');
    for(var i = 0; i < checkedBooks.length; ++i){
    }
    updateBookList();
}

function updateBookList(){
    document.getElementById("bookList").innerHTML = "";
    
        for(var i = 0; i < massBooks.length; ++i){
            document.getElementById("bookList").innerHTML += "<input type='checkbox' name='bookBox'><span>"+massBooks[i].ID+". "+
            massBooks[i].Name+" - "+massBooks[i].Year+" - </span>";
    
            if(!massBooks[i].Booking){
                document.getElementById("bookList").innerHTML += "<span>Не забронировано</span><br/>";
            }
            else{
                document.getElementById("bookList").innerHTML += "<span>Забронировано</span><br/>";
            }
        }
}

addVisitorBtn.onclick = function(){
    var objVisitor = {};
    var genderTemp = document.getElementsByName('gender');
    for(var i = 0; i < genderTemp.length; ++i){
        if (genderTemp[i].checked)
            objVisitor.Gender = genderTemp[i].value;
    }

    if((objVisitor.Gender != "") && (visitorFIO.value != "")){
        if(!massVisitors.length){
            objVisitor.ID = 1;
        }
        else{
            objVisitor.ID = massVisitors[massVisitors.length-1].ID + 1;
        }
    
        objVisitor.FIO = visitorFIO.value;
        var massiv = [];
        objVisitor.bookedBooks = massiv;
    
        massVisitors.push(objVisitor);
        document.getElementById("visitList").innerHTML += "<input type='radio' name='visitRadio' onclick=visitor_booking()><span>"+
        objVisitor.ID+". "+objVisitor.FIO+" - "+objVisitor.Gender+"</span><br/>";

        document.getElementById("visitorFIO").value = "";
    }      
}

delVisitorBtn.onclick = function(){
    var checkedVisitor = document.getElementsByName('visitRadio');
    for(var i = 0; i < checkedVisitor.length; ++i){
        if(checkedVisitor[i].checked){
            for (var j = 0; j < massVisitors[i].bookedBooks.length; ++j){
                massVisitors[i].bookedBooks[j].Booking = false;
            }
            massVisitors.splice(i, 1);
        }
    }

    document.getElementById("visitList").innerHTML = "";

    for(var i = 0; i < massVisitors.length; ++i){
        document.getElementById("visitList").innerHTML += "<input type='radio' name='visitRadio' onclick=visitor_booking()><span>"+
        massVisitors[i].ID+". "+massVisitors[i].FIO+" - "+massVisitors[i].Gender+"</span><br/>";
    }

    updateBookList();
}

function currentVisitor(){
    var checkedVisitor = document.getElementsByName('visitRadio');
    var currentVisitor;
    
    for(var i = 0; i < checkedVisitor.length; ++i){
        if(checkedVisitor[i].checked){
            currentVisitor = massVisitors[i].ID;
        }
    }

    return currentVisitor;
}

function visitor_booking(){
    document.getElementById("Booking").innerHTML = "";

    for (var i = 0; i < massVisitors.length; ++i){
        if(massVisitors[i].ID == currentVisitor() && massVisitors[i].bookedBooks.length){
            for(var j = 0; j < massVisitors[i].bookedBooks.length; ++j){
                document.getElementById("Booking").innerHTML += "<input type='checkbox' name='bookingBox'><span>"
                +massVisitors[i].bookedBooks[j].Name+"</span><br/>";
            }
        }
    }
}

addBookingBtn.onclick = function(){
    var checkedBooks = document.getElementsByName('bookBox');
    for(var i = 0; i < checkedBooks.length; ++i){
        if(checkedBooks[i].checked && !massBooks[i].Booking){
            massBooks[i].Booking = true;
            for(var j = 0; j < massVisitors.length; ++j){
                if (massVisitors[j].ID == currentVisitor()){
                    massVisitors[j].bookedBooks.push(massBooks[i]);
                }
            }
        }
    }

    updateBookList();
    visitor_booking();
}

delBookingBtn.onclick = function(){
    var checkedBooking = document.getElementsByName('bookingBox');

    for(var i = 0; i < checkedBooking.length; ++i){
        if(checkedBooking[i].checked){
            for(var j = 0; j < massVisitors.length; ++j){
                if(massVisitors[j].ID == currentVisitor()){
                    massVisitors[j].bookedBooks[i].Booking = false;
                    massVisitors[j].bookedBooks.splice(i, 1);
                }
            }
        }
    }

    visitor_booking();
    updateBookList();
}





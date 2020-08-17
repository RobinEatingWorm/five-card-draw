document.querySelector("#deal").onclick = function() {
    
    // Stage 1
    if (stage === 1) {
        
        // If the user has just started, display the cards
        if (document.querySelector("table").style.visibility === "hidden") {
            document.querySelector("table").style.visibility = "visible";
        }
        
        // Reset the hand rank
        document.querySelector("#rank").innerHTML = null;
        
        // Reset the hands
        hn1 = [];
        hs1 = [];
        holdcards = [0, 0, 0, 0, 0];
        hn2 = [];
        hs2 = [];
        
        // Deal the first hand
        dh();
        
        // Display the first hand
        dth(hn1, hs1);
        
        // Rank the first hand
        rank(hn1, hs1);
        
        // Update the stats
        totalbet += bet;
        document.querySelector("#totalbet").innerHTML = "Total Amount Bet: " + totalbet.toString();
        document.querySelector("#score").innerHTML = "Score: " + (totalwin - totalbet).toString();
        
        // Get ready for Stage 2
        document.querySelector("#changebet").style.visibility = "hidden";
        document.querySelector("#hb").style.visibility = "visible";
        for (var k = 0; k < 5; k++) {
            document.querySelector("#h".concat(k.toString())).style.backgroundColor = "whitesmoke";
            document.querySelector("#h".concat(k.toString())).style.color = "black";
        }
        document.querySelector("#deal").innerHTML = "DEAL";
        document.querySelector("#inst").innerHTML = "HOLD any cards you want to keep. Select DEAL to continue.";
        stage = 2;
        
    }
    
    // Stage 2
    else if (stage === 2) {
        
        // Deal the second hand
        dh();
        
        // Display the second hand
        dth(hn2, hs2);
        
        // Rank the second hand
        rank(hn2, hs2);
        
        // Update the stats
        totalwin += win;
        document.querySelector("#totalwin").innerHTML = "Total Amount Won: " + totalwin.toString();
        document.querySelector("#score").innerHTML = "Score: " + (totalwin - totalbet).toString();
        
        // Get ready for Stage 1
        document.querySelector("#hb").style.visibility = "hidden";
        document.querySelector("#changebet").style.visibility = "visible";
        document.querySelector("#deal").innerHTML = "DEAL NEW";
        document.querySelector("#inst").innerHTML = "Select DEAL NEW to continue.";
        stage = 1;
        
    }
    
};

// Set the bet
function setbet() {
    if (document.querySelector("#bet").value !== "") {
        bet = parseInt(document.querySelector("#bet").value, 10);
        document.querySelector("#currentbet").innerHTML = "Current Bet: " + bet.toString();
        
        // Change the pay table
        for (var i = 0; i < 10; i++) {
            rankdisp(i, "#pt" + i.toString());
        }
        
    }
}

// Deal the hand
function dh() {
    for (var i = 0; i < 5; i++) {
        
        // Add cards held to second hand
        if (stage === 2 && holdcards[i] === 1) {
            hn2.push(hn1[i]);
            hs2.push(hs1[i]);
        }
        
        // Make a random card
        else {
            var initi = i;
            
            // Make a new card
            var number = (Math.floor(Math.random() * 13) + 2).toString();
            var suitee = (Math.floor(Math.random() * 4) + 1).toString();
            
            // Check first hand for duplicates
            for (var j = 0; j < 5; j++) {
                if (hn1[j] === number & hs1[j] === suitee) {
                    i--;
                    break;
                }
                
                // Check new cards in second hand for duplicates after last iteration
                if (j === 4 && stage === 2) {
                    for (var k = 0; k < hn2.length; k++) {
                        if (holdcards[k] === 0) {
                            if (hn2[k] === number & hs2[k] === suitee) {
                                i--;
                                break;
                            }
                        }
                    }
                }
                
            }
            
            // Add the card if it isn't a duplicate
            if (initi === i) {
                
                // First hand
                if (stage === 1) {
                    hn1.push(number);
                    hs1.push(suitee);
                }
                
                // Second hand
                else if (stage === 2) {
                    hn2.push(number);
                    hs2.push(suitee);
                }
                
            }
            
        }
        
    }
}

// Display the hand
function dth(hn, hs) {
    for (var i = 0; i < 5; i++) {
        
        // Rank
        switch (hn[i]) {
            case "11":
                document.querySelector("#n".concat(i.toString())).innerHTML = "J";
                break;
            case "12":
                document.querySelector("#n".concat(i.toString())).innerHTML = "Q";
                break;
            case "13":
                document.querySelector("#n".concat(i.toString())).innerHTML = "K";
                break;
            case "14":
                document.querySelector("#n".concat(i.toString())).innerHTML = "A";
                break;
            default:
                document.querySelector("#n".concat(i.toString())).innerHTML = hn[i];
        }
        
        // Suite and color
        switch (hs[i]) {
            case "1":
                document.querySelector("#s".concat(i.toString())).innerHTML = "♠";
                document.querySelector("#n".concat(i.toString())).style.color = "black";
                document.querySelector("#s".concat(i.toString())).style.color = "black";
                break;
            case "2":
                document.querySelector("#s".concat(i.toString())).innerHTML = "♥";
                document.querySelector("#n".concat(i.toString())).style.color = "red";
                document.querySelector("#s".concat(i.toString())).style.color = "red";
                break;
            case "3":
                document.querySelector("#s".concat(i.toString())).innerHTML = "♣";
                document.querySelector("#n".concat(i.toString())).style.color = "black";
                document.querySelector("#s".concat(i.toString())).style.color = "black";
                break;
            case "4":
                document.querySelector("#s".concat(i.toString())).innerHTML = "♦";
                document.querySelector("#n".concat(i.toString())).style.color = "red";
                document.querySelector("#s".concat(i.toString())).style.color = "red";
                break;
        }
        
    }
}

// Hold cards
function hold(n) {
    if (holdcards[n] === 0) {
        document.querySelector("#h".concat(n.toString())).style.backgroundColor = "black";
        document.querySelector("#h".concat(n.toString())).style.color = "white";
        holdcards[n] = 1;
    }
    else {
        document.querySelector("#h".concat(n.toString())).style.backgroundColor = "whitesmoke";
        document.querySelector("#h".concat(n.toString())).style.color = "black";
        holdcards[n] = 0;
    }
}

// Rank the hand
function rank(hn, hs) {
    
    /* Hand array numbers:
    0 = High Card
    1 = Pair
    2 = Two Pair
    3 = Three of a Kind
    4 = Straight
    5 = Flush
    6 = Full House
    7 = Four of a Kind
    8 = Straight Flush
    9 = Royal Flush */
    
    // Repeated numbers
    var repnum = [];
    for (var i = 0; i < 5; i++) {
        var j = 1;
        for (var k = 0; k < 5; k++) {
            if (hn[k] === hn[i] && k !== i) {
                j++;
            }
        }
        if (j > 1) {
            repnum.push(j.toString());
        }
    }
    
    // Four of a Kind
    if (repnum.indexOf("4") !== -1) {
        rankdisp(7, "#rank");
        return;
    }
    
    // Three of a Kinds
    else if (repnum.indexOf("3") !== -1) {
        
        // Full House
        if (repnum.indexOf("2") !== -1) {
            rankdisp(6, "#rank");
            return;
        }
        
        // Three of a Kind
        else {
            rankdisp(3, "#rank");
            return;
        }
        
    }
    
    // Pairs
    else if (repnum.indexOf("2") !== -1) {
        
        // Two Pair
        if (repnum.length === 4) {
            rankdisp(2, "#rank");
            return;
        }
        
        // Pair
        else {
            rankdisp(1, "#rank");
            return;
        }
        
    }
    
    // Straights
    var straight = 0;
    for (var l = 2; l < 15; l++) {
        var m = 0;
        for (var n = 0; n < 5; n++) {
            if (hn.indexOf((l + n).toString()) !== -1) {
                m++;
            }
            if (m === 5) {
                straight = 1;
            }
        }
    }
    
    // Flushes
    var flush = 0;
    var o = 1;
    for (var p = 1; p < 5; p++) {
        if (hs[0] === hs[p]) {
            o++;
        }
        if (o === 5) {
            flush = 1;
        }
    }
    
    // Straights and Flushs
    if (straight === 1 && flush === 1) {
        
        // Royal Flush
        if (hn.indexOf("14") !== -1) {
            rankdisp(9, "#rank");
            return;
        }
        
        // Straight Flush
        else {
            rankdisp(8, "#rank");
            return;
        }
        
    }
    
    // Flush
    else if (flush === 1) {
        rankdisp(5, "#rank");
        return;
        
    }
    
    // Straight
    else if (straight === 1) {
        rankdisp(4, "#rank");
        return;
    }
    
    // High Card
    rankdisp(0, "#rank");
    return;
    
}

// Display the rank
function rankdisp(n, id) {
    
    // Display the rank and color
    document.querySelector(id).innerHTML = hrank[n];
    document.querySelector(id).style.color = hcolor[n];
    
    // Display the win if not for the first hand
    if (stage === 2 || id.indexOf("#pt") !== -1) {
        
        // Add plus sign if not High Card
        if (n !== 0) {
            document.querySelector(id).innerHTML += ": +" + (bet * hmultiplier[n]).toString();
        }
        
        // Keep existing sign and round up for High Card
        else {
            document.querySelector(id).innerHTML += ": " + Math.ceil(bet * hmultiplier[n]).toString();
        }
        
    }
    
    // End the sentence if displaying for #rank
    if (id === "#rank") {
        document.querySelector(id).innerHTML += ".";
        
        // Update the win during Stage 2
        if (stage === 2) {
            win = Math.ceil(bet * hmultiplier[n]);
        }
        
    }
    
}
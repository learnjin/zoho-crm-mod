// ==UserScript==
// @name       Zoho new call layout
// @namespace  http://www.doxter.de
// @version    0.6
// @description  improves zoho layout on adding call popup
// @match      https://crm.zoho.com/*
// @copyright  2013, Kai Rubarth
// ==/UserScript==

// check for call popup
function hasOldPanel(){
    if(document.querySelector('div#rightPanel')===null){
        return false;
    }
    var labels=document.querySelectorAll('div.qalink a');
    for(var i=0; i<labels.length; i++){
        if(labels[i].textContent.trim() === "Neue(n) anruf hinzufügen"){
            return true;
        }
    }
    return false;
}

function modifyPanel(){
    Array.prototype.map.call(document.querySelectorAll('div.qalink a'), function(e){
        var linkText = e.textContent.trim();
        
        if(linkText === "Neue(n) anruf hinzufügen"){
            e.textContent = "Neues Telefongespräch hinzufügen";                   
            e.classList.add("addCall");
            
            var js  = e.getAttribute('onclick');
            
            e.setAttribute('onclick', "var l=document.querySelector('a.lastclick');if(l!==null) l.classList.remove('lastclick');this.classList.add('lastclick');" + js);
            
            // add link for field sales
            var div = document.createElement('div');
            div.className = "qalink";
            
            var a = document.createElement('a');
            a.classList.add("addVisit");
            a.setAttribute('href', "javascript:;");
            a.setAttribute('onclick', "var l=document.querySelector('a.lastclick');if(l!==null) l.classList.remove('lastclick');this.classList.add('lastclick');" + js);
            a.innerHTML = "Neues Vorortgespräch hinzufügen";
            
            div.appendChild(a);
            e.parentNode.parentNode.insertBefore(div, e.parentNode.nextSibling);
        }       
        
    });    
}

document.querySelector('div#show.bodycontainer').addEventListener('DOMSubtreeModified', function(){    
    if(hasOldPanel()) modifyPanel();
});


// if popup is a call window
function isCallWindow(){
    var labels=document.querySelectorAll('label.qmandatory');
    for(var i=0; i<labels.length; i++){
        if(labels[i].textContent.trim() == "Art des Anrufs:"){
            return true;
        }
    }
    return false;    
}

document.querySelector('div#qCreate').addEventListener('DOMSubtreeModified', function(){        
    
    if(isCallWindow()){
        
        Array.prototype.map.call(document.querySelectorAll('div.newfield'), function(e){       
            
            var label = (e.querySelector('label')||e.querySelector('span')).textContent.trim();
            
            var fieldSale = document.querySelector("a.lastclick").classList.contains("addVisit");
            
            if(label == "Besitzer:"){
                e.style.display = "none";
            }
            if(label == "Betreff:"){
                e.querySelector('label').textContent = "Kurznotiz:";
            }
            if(label == "Kontaktname:"){
                e.style.display = "none";
            }
            
            if(fieldSale){
                if(label == "Anrufergebnis:"){
                    e.querySelector('input').setAttribute('value', 'VISIT');
                    e.style.display = "none";
                }                
                if(label == "Art des Anrufs:"){
                    e.style.display = "none";
                }                
                if(label == "Zweck des Anrufs:"){
                    e.querySelector('label').textContent = "Ergebnis des Besuchs";                
                }
            }
            else{
                if(label == "Anrufergebnis:"){
                    e.querySelector('input').setAttribute('value', 'CALL');
                    e.style.display = "none";
                }                                
                if(label == "Art des Anrufs:"){
                    e.querySelector('select').selectedIndex = 1;
                }                
                if(label == "Zweck des Anrufs:"){
                    e.querySelector('label').textContent = "Ergebnis des Anrufs";                
                }
            }
        });
    }
});

alert('hi there');

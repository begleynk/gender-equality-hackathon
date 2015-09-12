/**
 * ** Meatcheckr **
 * An autocomplete script that returns
 * when it's safe to eat meat you just opened.
 * Essential, clearly. Made to practice my
 * Object Oriented JavaScript
 */

// Constructor function
// @param {String} - Input element
// @param {Object} - Config options
function meatcheckr (input,options) {

    // Set some vars, bro
    _self = this;
    _self.input = document.querySelector(input);
    _self.placeholderText = _self.input.getAttribute('placeholder');
    _self.menuLocation = _self.input.parentNode;
    _self.options = options || {
        data : [
            {
                meat : 'sample',
                daysLeft : 1,
                message : 'Sample message'
            }
        ],
        appendMenuToElement : false,
        limit : false
    }
    _self.match = false;
    _self.matchList = [];

    // Initialise the meat
    _self.init();

}

// Kick things off
meatcheckr.prototype.init = function() {

    // Before checking for matches, append the suggestions container
    // If appendMenuToElement has been specified,
    // then override the default menuLocation option
    if( _self.options.appendMenuToElement ){
        _self.menuLocation = document.querySelector(_self.options.appendMenuToElement);
    }
    _self.suggestionsElem = _self.suggestionsContainer( _self.menuLocation );

    // On focus, clear placeholder text
    _self.input.addEventListener('focus',function(){
        _self.clearPlaceholder();
    });

    // On blur, reinstate placeholder text
    _self.input.addEventListener('blur',function(){
        _self.reinstatePlaceholder();
    });

    // On keyup, check for matches
    _self.input.addEventListener('keyup',function(){

        _self.checkMatch();

        // If checkMatch returns true,
        // populate dropdown markup
        // else clear it
        if( _self.checkMatch() ){
            _self.suggestionsItem( _self.options.limit );
        }else{
            _self.clearSuggestionsContainer();
        }

    });
};

// Clear placeholder text
meatcheckr.prototype.clearPlaceholder = function() {
    _self.input.setAttribute('placeholder','');
};

// Reinstate placeholder test
meatcheckr.prototype.reinstatePlaceholder = function() {
    _self.input.setAttribute('placeholder',_self.placeholderText);
};

// Check if the value of the 'input' element matches
// any of the words in the 'list' array
meatcheckr.prototype.checkMatch = function() {

    // Record the character that has been typed
    var inputVal = _self.input.value;
    var inputLen = inputVal.length;
    var matchStr;
    var matchItem;
    var matchWord;

    // Empty matchList array
    _self.matchList.length = 0;

    // If typed string matches
    // one of the match words,
    // push matching words to matchList
    for(var i=0 ; i<_self.options.data.length ; i++){
        matchItem = _self.options.data[i];
        matchWord = matchItem.meat;
        matchStr = matchWord.slice(0,inputLen);
        if ( inputVal === matchStr && inputVal !== '' ) {
            _self.matchList.push(matchItem);
        }
    }

    // If matchList is not empty
    // flag a true match
    if ( _self.matchList.length !== 0 ){
        _self.match = true;
    } else{
        _self.match = false;
    }

    // Return match boolean
    return _self.match;

};

// Define autocomplete menu container
meatcheckr.prototype.suggestionsContainer = function( location ) {
    var markup = document.createElement('ul');
    markup.className = 'meatcheckr-suggestions';
    location.appendChild(markup);
    return markup;
};

// Populate autocomplete menu
meatcheckr.prototype.suggestionsItem = function( limit ) {
    var suggestionsContent = '';
    var limit = limit || _self.matchList.length;
    for ( var i=0;i<limit;i++) {
        suggestionsContent += '<li class="meatcheckr-suggestions-item"';
        suggestionsContent += ' data-suggestion="' + _self.matchList[i].meat + '">';
        suggestionsContent += '<h2 class="meatcheckr-suggestions-item-heading">' + _self.matchList[i].meat + '</h2>';
        suggestionsContent += '<p>';
        suggestionsContent += '<span>' + _self.matchList[i].daysLeft;
        suggestionsContent += ' days left! </span>';
        suggestionsContent += _self.matchList[i].message;
        suggestionsContent += '</p>';
        suggestionsContent += '</li>';
    }
    _self.suggestionsElem.innerHTML = suggestionsContent;
};

// Clear autocomplete menu
meatcheckr.prototype.clearSuggestionsContainer = function() {
    _self.suggestionsElem.innerHTML = '';
};

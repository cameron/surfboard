'use strict';

(function main (
  debounce,
  isElementInViewport,
  doesElTextStartWithCode,
  qsa,
  flatten
) {
  var selectedLinkCharSet = [];

  function surfLink (a) {
    var index = selectedLinkCharSet.length % 26;
    (selectedLinkCharSet[index] = selectedLinkCharSet[index] || []).push(a);
    var savedText = a.innerText;
    a.surfReset = (a.surfReset || function () {
      this.innerText = savedText;
    });
    a.surfReset(); //
  }


  function markLinkCharSet (set, setIdx) {
    var setChar = String.fromCharCode(setIdx + 97);

    set.map(function (a) {
      a.innerText = setChar + a.innerText.substr(1);
    });
  }


  function bail () {
    selectedLinkCharSet.map(function (set) {
      set.map(function (a){
        a.surfReset();
        delete a.surfReset;
      });
    });

    selectedLinkCharSet = [];
  }


  function surf (evt) {
    if ('input textarea select'.indexOf(
      document.activeElement.tagName.toLowerCase()) != -1) return;

    if (evt.keyCode == 27) {
      return bail();
    }

    evt.stopPropagation(); // TODO re-consider capture/stopProp

    var links = flatten(selectedLinkCharSet);
    selectedLinkCharSet = [];
    (links.length ? links : qsa('a'))
      .filter(doesElTextStartWithCode.bind(null, evt.keyCode))
      .filter(isElementInViewport)
      .map(surfLink);

    links.map(function (a){ a.surfReset(); });

    if (selectedLinkCharSet.length == 1) {
      selectedLinkCharSet[0][0].click();
      return bail();
    }

    selectedLinkCharSet.map(markLinkCharSet);

  };

  document.body.addEventListener('keyup', surf, true);
})(


  function debounce (fn, delay) {

    var debounceTimeoutId;

    return function(){

      if (debounceTimeoutId) {
        clearTimeout(debounceTimeoutId);
      }

      debounceTimeoutId = setTimeout(fn, delay);
    }
  },


  function isElementInViewport (el) {

    var rect = el.getBoundingClientRect();

    return (
      rect.top >= 0 &&
      rect.left >= 0 &&
      rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      rect.right <= (window.innerWidth || document.documentElement.clientWidth)
    );
  },

  function doesElTextStartWithCode (code, el) {
    if (el.innerText == undefined) debugger;
    return el.innerText.toUpperCase().charCodeAt(0) == code;
  },

  function qsa (selector) {
    return Array.from(document.querySelectorAll(selector));
  },

  function flatten (arr) {
    return arr.reduce(function (flattened, el) {
      flattened = flattened.concat(el);
      return flattened;
    }, []);
  }
);

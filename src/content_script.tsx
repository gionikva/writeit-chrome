import { getSuggestions } from './backend';
import { saveSelection, restoreSelection } from './utils';


const isFocused = (elem: HTMLElement) => document.activeElement == elem;

chrome.runtime.onMessage.addListener(function (msg, sender, sendResponse) {
  if (msg.showSuggestions) {
    console.log("Received suggestions = " + msg.suggestions);
  }
});

setInterval(() => console.log("H"), 100);

const updateInputContent = (input: InputElement) => {
  if (input.element.textContent == null) {
    throw new Error("form.textContent is null");
  }
  if (input.element.textContent != input.currentText) {
    console.log(input.element.textContent, input.currentText);
    input.currentText = input.element.textContent;
    const suggestions = getSuggestions(input.currentText);
    
    // I need this to save the current cusor selection for the input element
    const selection = saveSelection();

    let html = input.element.innerHTML;
    for (const s of suggestions) {
      const suggestion = s as unknown as Suggestion;
      console.log(`suggestion: ${suggestion.toString()}`);
      html = html.split(suggestion.initial).join(`<span class="writeIt-mistake">${suggestion.initial}</span>`);
    }
    input.element.innerHTML = html;

    // And for this to restore it after innerHTML is set
    restoreSelection(input.element, selection);
 
  }
}



let intervals: Array<NodeJS.Timeout> = [];
let elements: Array<InputElement> = [];
function startInputUpdates() {
  intervals.forEach((interval) => clearInterval(interval));
  elements.forEach((element, key, parent) => {
    updateInputContent(element);
    intervals.push(setInterval(() => updateInputContent(element)
      , 3000));
  })
}

function updateInputElemenentList() {
  console.log("called updateInputElemenentList");
  const newElements = document.querySelectorAll(".editable") as NodeListOf<HTMLElement>;
  if (newElements.length != elements.length) {
    elements = Array.from(newElements.values()).map((el) => ({ element: el, currentText: el.textContent! }));
    startInputUpdates();
  }
}

setInterval(updateInputElemenentList, 3000)
export function speak(text){
  const utter = new SpeechSynthesisUtterance(text);
  window.speechSynthesis.speak(utter);
}

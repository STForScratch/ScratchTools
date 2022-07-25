ScratchTools.console = {}
ScratchTools.console.log = function(text) {
    var styleArray= [
        'padding: 0.1rem',
      'border : 0.1rem solid lime',
        'border-radius: 0.2rem'
    ];
    console.log('%cScratchTools', styleArray.join(';'), text);
}
ScratchTools.console.warn = function(text) {
  var styleArray= [
      'padding: 0.1rem',
    'border : 0.1rem solid yellow',
      'border-radius: 0.2rem'
  ];
  console.log('%cScratchTools', styleArray.join(';'), text);
}
ScratchTools.console.error = function(text) {
  var styleArray= [
      'padding: 0.1rem',
    'border : 0.1rem solid #ff9f00',
      'border-radius: 0.2rem'
  ];
  console.log('%cScratchTools', styleArray.join(';'), text);
}

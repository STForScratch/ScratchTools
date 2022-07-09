function logTool(text) {
    var styleArray= [
        'padding: 0.1rem',
      'border : 0.1rem solid lime',
        'border-radius: 0.2rem'
    ];
    console.log('%cScratchTools', styleArray.join(';'), text);
}
function warnTool(text) {
  var styleArray= [
      'padding: 0.1rem',
    'border : 0.1rem solid yellow',
      'border-radius: 0.2rem'
  ];
  console.log('%cScratchTools', styleArray.join(';'), text);
}
function errorTool(text) {
  var styleArray= [
      'padding: 0.1rem',
    'border : 0.1rem solid #ff9f00',
      'border-radius: 0.2rem'
  ];
  console.log('%cScratchTools', styleArray.join(';'), text);
}

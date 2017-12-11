var MyDropContext, drop;

drop = new Drop({
  target: document.querySelector('.drop-target'),
  content: 'Welcome to the future!',
  position: 'bottom left',
  openOn: 'click'
});

MyDropContext = Drop.createContext({
  classPrefix: 'my-drop'
});

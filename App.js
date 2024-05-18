import React, { useState } from 'react';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';
import { v4 as uuidv4 } from 'uuid';
import AddModule from './components/AddModule';
import Module from './components/Module';
import './styles.css';

const App = () => {
  const [modules, setModules] = useState([]);

  const addModule = (name) => {
    const newModule = { id: uuidv4(), name, resources: [] };
    setModules([...modules, newModule]);
  };

  const updateModules = (newModules) => {
    setModules(newModules);
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (source.droppableId === destination.droppableId && source.index === destination.index) return;

    const newModules = Array.from(modules);
    const sourceModule = newModules.find(mod => mod.id === source.droppableId);
    const destinationModule = newModules.find(mod => mod.id === destination.droppableId);

    const [movedResource] = sourceModule.resources.splice(source.index, 1);
    destinationModule.resources.splice(destination.index, 0, movedResource);

    setModules(newModules);
  };

  return (
    <div className="app">
      <h1>Course Builder</h1>
      <AddModule addModule={addModule} />
      <DragDropContext onDragEnd={onDragEnd}>
        {modules.map((module, index) => (
          <Droppable key={module.id} droppableId={module.id} type="RESOURCE">
            {(provided) => (
              <div ref={provided.innerRef} {...provided.droppableProps}>
                <Module
                  module={module}
                  modules={modules}
                  updateModules={updateModules}
                />
                {provided.placeholder}
              </div>
            )}
          </Droppable>
        ))}
      </DragDropContext>
    </div>
  );
};

export default App;

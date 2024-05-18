import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';
import AddResource from './AddResource';
import Resource from './Resource';

const Module = ({ module, modules, updateModules }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [moduleName, setModuleName] = useState(module.name);

  const addResource = (type, content) => {
    const newResource = { id: uuidv4(), type, content };
    const newModules = modules.map(mod => mod.id === module.id ? { ...mod, resources: [...mod.resources, newResource] } : mod);
    updateModules(newModules);
  };

  const renameModule = () => {
    const newModules = modules.map(mod => mod.id === module.id ? { ...mod, name: moduleName } : mod);
    updateModules(newModules);
    setIsEditing(false);
  };

  const deleteModule = () => {
    const newModules = modules.filter(mod => mod.id !== module.id);
    updateModules(newModules);
  };

  return (
    <div className="module">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={moduleName}
            onChange={(e) => setModuleName(e.target.value)}
          />
          <button onClick={renameModule}>Save</button>
        </div>
      ) : (
        <div>
          <h2>{module.name}</h2>
          <button onClick={() => setIsEditing(true)}>Rename</button>
        </div>
      )}
      <button onClick={deleteModule}>Delete</button>
      <AddResource addResource={addResource} />
      {module.resources.map((resource, index) => (
        <Draggable key={resource.id} draggableId={resource.id} index={index}>
          {(provided) => (
            <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
              <Resource resource={resource} moduleId={module.id} modules={modules} updateModules={updateModules} />
            </div>
          )}
        </Draggable>
      ))}
    </div>
  );
};

export default Module;

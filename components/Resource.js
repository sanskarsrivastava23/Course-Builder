import React, { useState } from 'react';

const Resource = ({ resource, moduleId, modules, updateModules }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [resourceContent, setResourceContent] = useState(resource.content);

  const renameResource = () => {
    const newModules = modules.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          resources: mod.resources.map(res => res.id === resource.id ? { ...res, content: resourceContent } : res)
        };
      }
      return mod;
    });
    updateModules(newModules);
    setIsEditing(false);
  };

  const deleteResource = () => {
    const newModules = modules.map(mod => {
      if (mod.id === moduleId) {
        return {
          ...mod,
          resources: mod.resources.filter(res => res.id !== resource.id)
        };
      }
      return mod;
    });
    updateModules(newModules);
  };

  return (
    <div className="resource">
      {isEditing ? (
        <div>
          <input
            type="text"
            value={resourceContent}
            onChange={(e) => setResourceContent(e.target.value)}
          />
          <button onClick={renameResource}>Save</button>
        </div>
      ) : (
        <div>
          {resource.type === 'link' ? (
            <a href={resource.content} target="_blank" rel="noopener noreferrer">{resource.content}</a>
          ) : (
            <span>{resource.content}</span>
          )}
          <button onClick={() => setIsEditing(true)}>Rename</button>
        </div>
      )}
      <button onClick={deleteResource}>Delete</button>
    </div>
  );
};

export default Resource;

import React, { useState } from 'react';

const AddResource = ({ addResource }) => {
  const [resourceType, setResourceType] = useState('link');
  const [resourceContent, setResourceContent] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (resourceContent) {
      addResource(resourceType, resourceContent);
      setResourceContent('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <select value={resourceType} onChange={(e) => setResourceType(e.target.value)}>
        <option value="link">Link</option>
        <option value="file">File</option>
      </select>
      <input
        type="text"
        value={resourceContent}
        onChange={(e) => setResourceContent(e.target.value)}
        placeholder="Resource Content"
        required
      />
      <button type="submit">Add Resource</button>
    </form>
  );
};

export default AddResource;

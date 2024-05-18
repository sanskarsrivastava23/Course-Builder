import React, { useState } from 'react';

const AddModule = ({ addModule }) => {
  const [moduleName, setModuleName] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (moduleName) {
      addModule(moduleName);
      setModuleName('');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        value={moduleName}
        onChange={(e) => setModuleName(e.target.value)}
        placeholder="New Module Name"
        required
      />
      <button type="submit">Add Module</button>
    </form>
  );
};

export default AddModule;

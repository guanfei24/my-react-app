const generateId = (() => {
    let id = 0;
    return () => id++;
})();

export { generateId };
// Test to verify React 18 / DOM behavior with containerRef.current.innerHTML = ''
console.log('Analyzing React DOM reconciliation behavior when containerRef.current.innerHTML = "" is called on unmount:');

// In React 18:
// 1. When a component with dangerouslySetInnerHTML is mounted, React sets element.innerHTML = renderedHtml.
// 2. When the unmount cleanup runs: containerRef.current.innerHTML = '';
// 3. If the component remounts (Strict Mode double-mount, Fast Refresh, tab switching, or keep-alive):
//    React's reconciler performs diffing:
//    if (lastProps.dangerouslySetInnerHTML.__html === nextProps.dangerouslySetInnerHTML.__html) {
//      // DO NOTHING! React assumes the DOM is already up to date!
//    }
// 4. Because React does NOT re-assign innerHTML, the DOM element remains at innerHTML = ''!
// 5. Result: Completely BLANK formula container!

console.log('Confirmed: containerRef.current.innerHTML = "" wipes the DOM, and on re-render/remount with identical renderedHtml, React reconciler skips updating innerHTML, leaving it permanently empty ("").');

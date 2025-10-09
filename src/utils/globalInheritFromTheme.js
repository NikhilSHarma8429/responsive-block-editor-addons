const { select, dispatch } = wp.data;
console.log('coming here in global file');
// Get all buttons-child blocks
const getButtonsChildBlocks = () => {
	const blocks = select('core/block-editor').getBlocks();
	const buttonsChildBlocks = [];
	
	const findButtonsChild = (blocks) => {
		blocks.forEach((block) => {
			if (block.name === 'responsive-block-editor-addons/buttons-child') {
				buttonsChildBlocks.push(block);
			}
			if (block.innerBlocks && block.innerBlocks.length > 0) {
				findButtonsChild(block.innerBlocks);
			}
		});
	};
	
	findButtonsChild(blocks);
	return buttonsChildBlocks;
};

// Apply global inherit from theme setting when editor loads
const applyGlobalInheritFromThemeSetting = () => {
	const globalOn = responsive_globals && responsive_globals.global_inherit_from_theme === '1';
	const globalTs = responsive_globals && responsive_globals.global_inherit_from_theme_last_changed 
		? responsive_globals.global_inherit_from_theme_last_changed 
		: '';
	setTimeout(() => {
		const buttonsChildBlocks = getButtonsChildBlocks();
		console.log(buttonsChildBlocks);
		if (buttonsChildBlocks.length > 0) {
			buttonsChildBlocks.forEach((block) => {
				const { inheritFromThemesaved: inheritFromThemesaved } = block.attributes; 
				console.log('saved value -> ', inheritFromThemesaved);
				const localTs = block.attributes.inheritFromThemeLocalTimestamp || '';
				console.log('coming here -> 1 -> ', block);
				console.log(Date.parse(globalTs), Date.parse(localTs));
				// Apply global if no local timestamp OR global is newer
				if (globalTs && (!localTs || Date.parse(globalTs) > Date.parse(localTs))) {
					if(globalOn){
						console.log('coming here -> 2');
						dispatch('core/block-editor').updateBlockAttributes(block.clientId, {
							inheritFromTheme: true
						});
					}
					else{
						console.log('goind back to default -> ');
						dispatch('core/block-editor').updateBlockAttributes(block.clientId, {
							inheritFromTheme: inheritFromThemesaved
						});
					}
				}
			});
		}
	}, 100);
};

// Initialize global inherit from theme functionality
const initGlobalInheritFromTheme = () => {
	console.log('🚀 Initializing Global Inherit From Theme system...');
	applyGlobalInheritFromThemeSetting();
};

export default initGlobalInheritFromTheme;

// import { select, dispatch } from '@wordpress/data';

// // Get all buttons-child blocks specifically
// const getButtonsChildBlocks = () => {
// 	const allBlocks = select('core/block-editor').getBlocks();
// 	const buttonsChildBlocks = [];
	
// 	console.log('🔍 Searching for buttons-child blocks...');
// 	console.log('📋 All blocks in editor:', allBlocks.map(b => ({ name: b.name, clientId: b.clientId })));
	
// 	const findButtonsChildBlocks = (blocks) => {
// 		blocks.forEach(block => {
// 			console.log('🔎 Checking block:', block.name, block.clientId);
			
// 			// Check if this is a buttons-child block
// 			if (block.name === 'responsive-block-editor-addons/buttons-child') {
// 				console.log('✅ Found buttons-child block:', block.clientId);
// 				buttonsChildBlocks.push(block);
// 			}
			
// 			// Recursively check inner blocks
// 			if (block.innerBlocks && block.innerBlocks.length > 0) {
// 				console.log('🔍 Checking inner blocks of:', block.name);
// 				findButtonsChildBlocks(block.innerBlocks);
// 			}
// 		});
// 	};
	
// 	findButtonsChildBlocks(allBlocks);
// 	console.log('📊 Total buttons-child blocks found:', buttonsChildBlocks.length);
// 	return buttonsChildBlocks;
// };

// // Update all buttons-child blocks with inheritFromTheme attribute
// const updateAllButtonsChildBlocks = (inheritFromTheme) => {
// 	const buttonsChildBlocks = getButtonsChildBlocks();
	
// 	buttonsChildBlocks.forEach(block => {
// 		dispatch('core/block-editor').updateBlockAttributes(
// 			block.clientId,
// 			{ inheritFromTheme: inheritFromTheme }
// 		);
// 	});
	
// 	return buttonsChildBlocks.length;
// };

// // Global inherit from theme toggle with auto-save
// const toggleGlobalInheritFromTheme = (enabled) => {
// 	console.log('🔧 Global Inherit From Theme Toggle Called:', enabled);
	
// 	// Get all blocks first to debug
// 	const allBlocks = select('core/block-editor').getBlocks();
// 	console.log('📋 All blocks found:', allBlocks.length);
	
// 	// Update all buttons-child blocks
// 	const updatedBlocksCount = updateAllButtonsChildBlocks(enabled);
	
// 	console.log('✅ Updated blocks count:', updatedBlocksCount);
	
// 	// Auto-save the post
// 	dispatch('core/editor').savePost();
	
// 	// Show success message
// 	console.log(
// 		`%cResponsive Block Editor Addons: Global Inherit From Theme - ${enabled ? 'Enabled' : 'Disabled'} for ${updatedBlocksCount} buttons-child blocks and saved!`,
// 		'border-radius: 6px; width: 100%; margin: 16px 0; padding: 16px; background-color: #007CBA; color: #fff; font-weight: bold; text-shadow: 2px 2px 2px #0063A1;'
// 	);
	
// 	return updatedBlocksCount;
// };

// // Apply global inherit from theme setting when editor loads
// const applyGlobalInheritFromThemeSetting = () => {
// 	// Check if global inherit from theme is enabled
// 	const isGlobalInheritFromThemeEnabled = responsive_globals && responsive_globals.global_inherit_from_theme === '1';
	
// 	if (isGlobalInheritFromThemeEnabled) {
// 		console.log('🎯 Global Inherit From Theme is enabled, applying to all buttons-child blocks...');
		
// 		// Add a small delay to ensure blocks are fully loaded
// 		setTimeout(() => {
// 			// Apply to all existing buttons-child blocks
// 			const updatedBlocksCount = updateAllButtonsChildBlocks(true);
			
// 			if (updatedBlocksCount > 0) {
// 				console.log(`✅ Applied global inherit from theme to ${updatedBlocksCount} buttons-child blocks`);
// 			} else {
// 				console.log('ℹ️ No buttons-child blocks found to update');
// 			}
// 		}, 100);
// 	}
// };

// // Initialize global inherit from theme functionality
// const initGlobalInheritFromTheme = () => {
// 	console.log('🚀 Initializing Global Inherit From Theme system...');
	
// 	// Apply global setting if enabled
// 	applyGlobalInheritFromThemeSetting();
	
// 	// Listen for new blocks being added
// 	const { subscribe } = wp.data;
// 	let unsubscribe;
	
// 	unsubscribe = subscribe(() => {
// 		const { getBlocks } = wp.data.select('core/block-editor');
// 		const blocks = getBlocks();
		
// 		// Check if any new buttons-child blocks were added
// 		const buttonsChildBlocks = blocks.filter(block => 
// 			block.name === 'responsive-block-editor-addons/buttons-child' && 
// 			!block.attributes.inheritFromTheme
// 		);
		
// 		if (buttonsChildBlocks.length > 0) {
// 			console.log('🆕 New buttons-child blocks detected, applying global setting...');
// 			buttonsChildBlocks.forEach(block => {
// 				wp.data.dispatch('core/block-editor').updateBlockAttributes(
// 					block.clientId,
// 					{ inheritFromTheme: true }
// 				);
// 			});
// 		}
// 	});
	
// 	// Export the toggle function for use in admin (if needed)
// 	window.rbeaGlobalInheritFromTheme = {
// 		toggle: toggleGlobalInheritFromTheme,
// 		updateAllButtonsChildBlocks: updateAllButtonsChildBlocks,
// 		getButtonsChildBlocks: getButtonsChildBlocks
// 	};
	
// 	console.log('✅ Global Inherit From Theme system initialized and exported to window.rbeaGlobalInheritFromTheme');
// };

// export default initGlobalInheritFromTheme;

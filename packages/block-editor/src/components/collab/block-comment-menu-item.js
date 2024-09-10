/**
 * WordPress dependencies
 */
import { _x } from '@wordpress/i18n';
import { MenuItem } from '@wordpress/components';
import { comment as commentIcon } from '@wordpress/icons';
import { useSelect, useDispatch } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { store as blockEditorStore } from '../../store';

export default function BlockCommentMenuItem( { onClose } ) {
	// eslint-disable-next-line @wordpress/data-no-store-string-literals
	const { openGeneralSidebar } = useDispatch( 'core/edit-post' );

	const { updateBlockAttributes } = useDispatch( blockEditorStore );

	const clientId = useSelect( ( select ) => {
		const { getSelectedBlockClientId } = select( blockEditorStore );
		return getSelectedBlockClientId();
	}, [] );

	const openCollabBoard = () => {
		onClose();
		updateBlockAttributes( clientId, {
			showCommentBoard: true,
		} );
		openGeneralSidebar( 'edit-post/collab-sidebar' );
	};

	return (
		<MenuItem
			icon={ commentIcon }
			onClick={ openCollabBoard }
			aria-haspopup="dialog"
		>
			{ _x( 'Comment', 'Add comment button' ) }
		</MenuItem>
	);
}

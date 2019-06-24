import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import MentionLinkCommand from './mentionlinkcommand'; 
import { createLinkElement } from './util';

export default class MentionLinkEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }
    init() {
        const editor = this.editor;
        console.log( 'MentionLinkEditing#init() got called' );        
        // Allow link attribute on all inline nodes.
		editor.model.schema.extend( '$text', { allowAttributes: 'linkHref' } );

		editor.conversion.for( 'dataDowncast' )
            .attributeToElement( { model: 'linkHref', view: createLinkElement } );
            
        this.editor.commands.add( 'mentionlink', new MentionLinkCommand( this.editor ) );        
    }
}
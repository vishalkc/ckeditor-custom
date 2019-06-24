import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import MentionTabCommand from './mentiontabcommand'; 

export default class MentionTabEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }
    init() {
        console.log( 'MentionTabEditing#init() got called' );        
        this.editor.commands.add( 'keypress', new MentionTabCommand( this.editor ) );        
    }
}
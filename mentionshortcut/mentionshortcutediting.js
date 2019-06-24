import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import MentionShortcutCommand from './mentionshortcutcommand'; 

export default class MentionShortcutEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [ Widget ];
    }
    init() {
        console.log( 'MentionShortcutEditing#init() got called' );        
        this.editor.commands.add( 'mentionshortcut', new MentionShortcutCommand( this.editor ) );        
    }
}
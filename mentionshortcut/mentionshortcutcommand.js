import Command from '@ckeditor/ckeditor5-core/src/command';

export default class MentionShortcutCommand extends Command {
    
    execute({key, marker}) {
        const editor = this.editor;
        editor.keystrokes.set( key, ( data, stop ) => {               
            editor.model.change( writer =>{
                //new MentionCustomization(editor);
            let root = editor.model.document.getRoot();
            let child = editor.model.document.getRoot().getChild(0);
            writer.appendText( marker, child );
            writer.append( child, root );
            });
            stop(); // Works like data.preventDefault() + evt.stop()
        } );
    }
    refresh() {
        const model = this.editor.model;
        //const selection = model.document.selection;

        const isAllowed = true;//model.schema.checkChild( selection.focus.parent, 'mentiontab' );

        this.isEnabled = isAllowed;
    }
}
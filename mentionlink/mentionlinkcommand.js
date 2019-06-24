import Command from '@ckeditor/ckeditor5-core/src/command';
import { toMap } from "@ckeditor/ckeditor5-utils/src/tomap";
export default class MentionLinkCommand extends Command {
    
    execute({linkData, linkurl, linkAttribute}) {
        const editor = this.editor;
        editor.model.document.registerPostFixer( writer => {
            const changes = editor.model.document.differ.getChanges();
            let model = editor.model;
            let selection = model.document.selection;
            if(changes[0]!==undefined && changes[0].position!==undefined) {
                let item = changes[0].position.textNode;
                if(changes[0].position.textNode===null)
                    item = changes[0].position.getShiftedBy(-1).textNode;
                console.log(changes[0].position.textNode);
                
                if(changes[0]!==undefined && item!==null)
                {
                    //let position = changes[0].position;
                    let length = item.data.length;
                    let data = item.data.slice( 1, length );
                    //const attributes = toMap(selection.getAttributes());
                    console.log(item.hasAttribute(linkAttribute));
                    if(item!== null && data === linkData)
                    {                    
                        writer.setAttribute(linkAttribute, linkurl, item);
                    }
                    else if(item!== null && item.hasAttribute(linkAttribute)){
                        writer.removeAttribute(linkAttribute, item);
                    }
                }
            }
            //writer.insertElement( 'paragraph', changes[0].position.anchor.textNode, 0 );
            // Check if the changes lead to an empty root in the editor.
            // for ( const entry of changes ) {
            //     if ( entry.type === 'insert' && entry.name === '$text' ) {
            //         //writer.insertElement( 'paragraph', entry.position.root, 0 );
        
            //         // It is fine to return early, even if multiple roots would need to be fixed.
            //         // All post-fixers will be fired again, so if there are more empty roots, those will be fixed, too.
            //         return true;
            //     }
            //     return true;
            // }
           
        } );
    }
    refresh() {
        const model = this.editor.model;
        //const selection = model.document.selection;

        const isAllowed = true;//model.schema.checkChild( selection.focus.parent, 'mentiontab' );

        this.isEnabled = isAllowed;
    }
}
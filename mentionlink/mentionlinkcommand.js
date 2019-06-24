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
                //console.log(changes[0].position.textNode);
                
                if(changes[0]!==undefined && item!==null)
                {
                    //let position = changes[0].position;
                    let length = item.data.length;
                    let data = item.data.slice( 1, length );
                    //const attributes = toMap(selection.getAttributes());
                    ///console.log(item.hasAttribute(linkAttribute));
                    if(item!== null && data === linkData)
                    {  
                        const start = model.createPositionBefore(item).getShiftedBy(1);
                        const end = model.createPositionAfter(item)                 
                        const linkRange = writer.createRange( start, end );  
                        console.log(linkRange);
                        writer.setAttribute( linkAttribute, linkurl, linkRange );  
                        //writer.setAttribute(linkAttribute, linkurl, item);
                    }
                    else if(item!== null && item.hasAttribute(linkAttribute)){
                        if(changes[0].type == 'remove') {
                            writer.remove(item);
                        }
                        
                        else {
                            writer.removeAttribute(linkAttribute, item);
                        }                       
                    }
                }
            }           
        } );
    }
    refresh() {
        const model = this.editor.model;
        //const selection = model.document.selection;

        const isAllowed = true;//model.schema.checkChild( selection.focus.parent, 'mentiontab' );

        this.isEnabled = isAllowed;
    }
}
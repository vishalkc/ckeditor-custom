import Command from '@ckeditor/ckeditor5-core/src/command';

export default class MentionTabCommand extends Command {
    
    execute({value}) {
        const editor = this.editor;

        editor.keystrokes.set( value, ( data, stop ) => {
            stop();
            let view = editor.data.processor.toView(editor.model.document.getRoot());
            
            //console.log(view);
            editor.model.change( writer =>{
                var startPosition = editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]);
                let nextTextNode = startPosition.getShiftedBy(1).textNode.nextSibling;
                if(nextTextNode === null)
                return;
                let isAtEnd = editor.model.document.selection.anchor.isAtEnd;
                //console.log(editor.model.document.selection.anchor.getShiftedBy(1).textNode);
                // while(!isAtEnd){
                //     //get the next textNode
                //     if(editor.model.document.selection.anchor.textNode === null){
                //         nextTextNode = editor.model.document.selection.anchor.getShiftedBy(1).textNode;
                //     }                
                //     else {
                //         nextTextNode = editor.model.document.selection.anchor.textNode.nextSibling;
                //     }
                    
                //     if( nextTextNode!==null){
                        
                //         //if the element is a subfield
                //         if(nextTextNode.hasAttribute("mention"))
                //         {
                //             var start = nextTextNode.startOffset;
                //             var end = nextTextNode.endOffset;
                //             var path = nextTextNode.getPath();
            
                //             writer.setSelection(nextTextNode,'after')
                //             break;
                //         }
                //         console.log(editor.model.createPositionAt(editor.model.document.selection.anchor.editableElement,'after'));
                //         //if the element is a not a subfield change the position to end of the subfield
                //         let pos = editor.model.createPositionAt(editor.model.document.selection.anchor.editableElement,'after');
                //         isAtEnd = pos.isAtEnd;
                //         //isAtEnd = editor.model.createPositionFromPath(editor.model.document.selection.getSelectedElement(),[1])
                //     }
                // }
                // if(isAtEnd)
                // {
                //     var startPosition = editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]);
                //     nextTextNode = startPosition.getShiftedBy(1).textNode.nextSibling;
                //     console.log(nextTextNode);
                //     writer.setSelection(nextTextNode,'after')
                // }
                
                if(editor.model.document.selection.anchor.textNode!==null){
                    nextTextNode = editor.model.document.selection.anchor.textNode.nextSibling;
                    if( nextTextNode!==null){
                        
                        if(nextTextNode.hasAttribute("mention"))
                        {
                            var start = nextTextNode.startOffset;
                            var end = nextTextNode.endOffset;
                            var path = nextTextNode.getPath();
                        //console.log(`${start}-${end}-${path}`);
            
                        writer.setSelection(nextTextNode,'after')
                        }
                    }
                    else{
                        //console.log(editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]));
                                var startPosition = editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]);
                                let nextTextNode = startPosition.getShiftedBy(1).textNode.nextSibling;
                                //console.log(nextTextNode);
                                writer.setSelection(nextTextNode,'after')
                    }
                }
                else{
                    //let rootLastOffset = editor.model.document.getRoot().lastOffset;
                    
                    //var result = currentPosition.compareWith(lastPosition);
                    //console.log(`result:::: ${isAtEnd}`);    
                    let nextTextNode = null;
                    
                    if(!isAtEnd)
                        nextTextNode = editor.model.document.selection.anchor.getShiftedBy(1).textNode;
                    
    
                    if( nextTextNode!==null){
                        
                        if(nextTextNode.hasAttribute("mention"))
                        {
                            var start = nextTextNode.startOffset;
                        var end = nextTextNode.endOffset;
                        var path = nextTextNode.getPath();
                        //console.log(`${start}-${end}-${path}`);
            
                        writer.setSelection(nextTextNode,'after')
                        }
                        else{
                            nextTextNode = editor.model.document.selection.anchor.getShiftedBy(1).textNode.nextSibling;
                            if( nextTextNode!==null){
                            
                                if(nextTextNode.hasAttribute("mention"))
                                {
                                    var start = nextTextNode.startOffset;
                                    var end = nextTextNode.endOffset;
                                    var path = nextTextNode.getPath();
                                    //console.log(`${start}-${end}-${path}`);
                    
                                    writer.setSelection(nextTextNode,'after')
                                }
                            }
                            else{
                                //console.log(editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]));
                                var startPosition = editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]);
                                let nextTextNode = startPosition.getShiftedBy(1).textNode.nextSibling;
                                //console.log(nextTextNode);
                                writer.setSelection(nextTextNode,'after')
                            }
                        }
                    }
                    else{
                         //console.log(editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]));
                                var startPosition = editor.model.createPositionFromPath(editor.model.document.getRoot().getChild(0),[0]);
                                let nextTextNode = startPosition.getShiftedBy(1).textNode.nextSibling;
                                //console.log(nextTextNode);
                                writer.setSelection(nextTextNode,'after')
                    }
                }
            });   
        });       
    }

    refresh() {
        const model = this.editor.model;
        const selection = model.document.selection;

        const isAllowed = true;//model.schema.checkChild( selection.focus.parent, 'mentiontab' );

        this.isEnabled = isAllowed;
    }
}
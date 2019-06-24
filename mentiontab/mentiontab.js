import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import MentionTabEditing from './mentiontabediting';

export default class MentionTab extends Plugin{
    
    static get requires() {
        return [MentionTabEditing];
    }
}
import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import MentionLinkEditing from './mentionlinkediting';

export default class MentionLink extends Plugin{
    
    static get requires() {
        return [MentionLinkEditing];
    }
}
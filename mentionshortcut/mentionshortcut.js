import Plugin from '@ckeditor/ckeditor5-core/src/plugin';

import MentionShortcutEditing from './mentionshortcutediting';

export default class MentionShortcut extends Plugin{
    
    static get requires() {
        return [MentionShortcutEditing];
    }
}
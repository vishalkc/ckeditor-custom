import Plugin from '@ckeditor/ckeditor5-core/src/plugin';
import Widget from '@ckeditor/ckeditor5-widget/src/widget';
import MentionLinkCommand from './mentionlinkcommand';
import { createLinkElement, ensureSafeUrl } from './util';
import bindTwoStepCaretToAttribute from '@ckeditor/ckeditor5-engine/src/utils/bindtwostepcarettoattribute';
import findLinkRange from './findlinkrange';

export default class MentionLinkEditing extends Plugin {
    static get requires() {                                                    // ADDED
        return [Widget];
    }
    init() {
        const editor = this.editor;
        console.log('MentionLinkEditing#init() got called');
        this._defineSchema();
        this._defineConverters();

        editor.commands.add('mentionlink', new MentionLinkCommand(this.editor));
        
        // Enable two-step caret movement for `linkHref` attribute.
		bindTwoStepCaretToAttribute( editor.editing.view, editor.model, this, 'mentionlink' );
        this._setupLinkHighlight();
    }

     _defineSchema() {  
        const editor = this.editor;                                                        // ADDED
        const schema = editor.model.schema;

        schema.register('mentionlink', {
            // Behaves like a self-contained object (e.g. an image).
            isLimit: true,
            isObject: true,

            // Allow content which is allowed in blocks (i.e. text with attributes)
            allowContentOf: '$block',
            allowWhere: '$text',
        });
    }

    _defineConverters() {    
        const editor = this.editor;                                                  // MODIFIED
        const conversion = editor.conversion;

        editor.model.schema.extend('$text', { allowAttributes: 'mentionlink' });

        editor.conversion.for('dataDowncast')
            .attributeToElement({ model: 'mentionlink', view: createLinkElement });

        editor.conversion.for('editingDowncast')
            .attributeToElement({
                model: 'mentionlink', view: (href, writer) => {
                    return createLinkElement(ensureSafeUrl(href), writer);
                }
            });

        editor.conversion.for('upcast')
            .elementToAttribute({
                view: {
                    name: 'a',
                    attributes: {
                        href: true
                    }
                },
                model: {
                    key: 'mentionlink',
                    value: viewElement => viewElement.getAttribute('href')
                }
            });        
    }
    _setupLinkHighlight() {
        const editor = this.editor;
        const view = editor.editing.view;
        const highlightedLinks = new Set();

        // Adding the class.
        view.document.registerPostFixer(writer => {
            const selection = editor.model.document.selection;

            if (selection.hasAttribute('mentionlink')) {
                const modelRange = findLinkRange(selection.getFirstPosition(), selection.getAttribute('mentionlink'), editor.model);
                const viewRange = editor.editing.mapper.toViewRange(modelRange);

                // There might be multiple `a` elements in the `viewRange`, for example, when the `a` element is
                // broken by a UIElement.
                for (const item of viewRange.getItems()) {
                    if (item.is('a')) {
                        writer.addClass(HIGHLIGHT_CLASS, item);
                        highlightedLinks.add(item);
                    }
                }
            }
        });

        // Removing the class.
        editor.conversion.for('editingDowncast').add(dispatcher => {
            // Make sure the highlight is removed on every possible event, before conversion is started.
            dispatcher.on('insert', removeHighlight, { priority: 'highest' });
            dispatcher.on('remove', removeHighlight, { priority: 'highest' });
            dispatcher.on('attribute', removeHighlight, { priority: 'highest' });
            dispatcher.on('selection', removeHighlight, { priority: 'highest' });

            function removeHighlight() {
                view.change(writer => {
                    for (const item of highlightedLinks.values()) {
                        writer.removeClass(HIGHLIGHT_CLASS, item);
                        highlightedLinks.delete(item);
                    }
                });
            }
        });
    }
}
